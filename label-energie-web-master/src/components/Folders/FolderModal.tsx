import {
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Modal from "../shared/Modal";
import { FolderDocumentType, FolderType, TFolder } from "@/types/folder.type";
import { toPlural } from "@/utils/string";
import Status from "../shared/Status";
import { formatDate } from "@/utils/date";
import Button from "../shared/Button";
import Link from "next/link";
import { useModals } from "@/hooks/useModals";
import {
  useAddDocumentsToFolder,
  useChangeFolderNumMPRAdmin,
  useCompleteFolder,
  useDeleteFolder,
} from "@/services/folder.service";
import { InputFile } from "../shared/form/InputFile";
import { Form, useZodForm } from "../shared/form/form";
import { z } from "zod";
import { SubmitButton } from "../shared/SubmitButton";
import { uploadFiles } from "@/services/file.service";
import { getFileNameByUrl, getFileNamesByUrls } from "@/utils/file";
import TextHighlighter from "../shared/TextHighlighter";
import { Input } from "../shared/form/Input";
import { downloadFolderPdf } from "@/services/folder.service"; // Add this import

export interface FolderModalRef {
  onOpen(folder: TFolder): void;
  onClose(): void;
}

const schema = z.object({
  file1: z.any(), // Identity
  file2: z.any(), // Taxes
  file3: z.any(), // PropertyTax
  file4: z.any(), // Home
  file5: z.any(), // Other
});

const schemaMPR = z.object({ numMPR: z.string() });

const DEFAULT_FILES_SCHEMA = (folder?: TFolder) => ({
  file1: folder?.documents?.find((f) => f.type == FolderDocumentType.Identity)
    ?.url,
  file2: folder?.documents?.find((f) => f.type == FolderDocumentType.Taxes)
    ?.url,
  file3: folder?.documents?.find(
    (f) => f.type == FolderDocumentType.PropertyTax
  )?.url,
  file4: folder?.documents?.find((f) => f.type == FolderDocumentType.Home)?.url,
  file5: folder?.documents?.find((f) => f.type == FolderDocumentType.Other)
    ?.url,
});

interface FolderModalProps {
  folders?: TFolder[]; // Used to refresh modal when cache is updated
  isAdmin?: boolean;
  buttons?(props: { folder: TFolder }): JSX.Element;
}

export default forwardRef<FolderModalRef, FolderModalProps>((props, ref) => {
  const { folders, isAdmin, buttons: Buttons } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [folder, setFolder] = useState<TFolder>();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Ajout des logs pour suivre l'état du modal
  useEffect(() => {
    console.log('FolderModal state:', {
      isOpen,
      hasFolder: !!folder,
      folderDetails: folder ? {
        id: folder.id,
        name: folder.name,
        status: folder.status.id,
        documentsCount: folder.documents?.length
      } : null,
      timestamp: new Date().toISOString()
    });
  }, [isOpen, folder]);

  // Log pour le cache des dossiers
  useEffect(() => {
    console.log('Folders cache update:', {
      hasFolders: !!folders,
      foldersCount: folders?.length,
      timestamp: new Date().toISOString()
    });
  }, [folders]);

  useImperativeHandle(ref, () => ({
    onOpen: (f) => {
      console.log('Opening folder modal:', {
        folderId: f.id,
        folderName: f.name,
        timestamp: new Date().toISOString()
      });
      setFolder(f);
      form.reset(DEFAULT_FILES_SCHEMA(f));
      formNumMPR.setValue("numMPR", f.numMPR ?? "");
      onOpen();
      setNewFiles([]);
    },
    onClose() {
      console.log('Closing folder modal');
      onClose();
    },
  }));

  const { mutate: deleteFolder, isPending } = useDeleteFolder();
  const { mutate: addDocumentsToFolder } = useAddDocumentsToFolder();
  const { mutate: updateFolderNum, isPending: isChangingNumMPR } =
    useChangeFolderNumMPRAdmin();
  const { mutate: completeFolder, isPending: isCompletingFolder } =
    useCompleteFolder();

  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const { deletion } = useModals();

  const [newFiles, setNewFiles] = useState<
    { file: File; type: FolderDocumentType }[]
  >([]);

  const form = useZodForm({
    schema,
    defaultValues: DEFAULT_FILES_SCHEMA(folder),
  });

  const formNumMPR = useZodForm({
    schema: schemaMPR,
    defaultValues: {
      numMPR: "",
    },
  });

  const inputsFileDisabled = isAdmin
    ? true
    : folder
    ? [FolderType.Completed, FolderType.Cancel, FolderType.Done].includes(
        folder?.status.id
      )
    : true;

  useEffect(() => {
    // If folders cache is updated, update state
    if (folder && folders) {
      const freshFolder = folders.find((f) => f.id == folder.id);
      if (
        freshFolder &&
        JSON.stringify(freshFolder) != JSON.stringify(folder)
      ) {
        setFolder(freshFolder);
        form.reset(DEFAULT_FILES_SCHEMA(freshFolder));
      }
    }
  }, [folder, folders]);

  const isFolderCompleted = useMemo(() => {
    const { file1, file2, file3, file4 } = form.getValues();

    return (
      folder?.documents?.filter((f) => f.type != FolderDocumentType.Other)
        .length == 4 &&
      file1 &&
      file2 &&
      file3 &&
      file4
    );
  }, [folder, form.watch()]);

  useImperativeHandle(ref, () => ({
    onOpen: (f) => {
      setFolder(f);
      form.reset(DEFAULT_FILES_SCHEMA(f));
      formNumMPR.setValue("numMPR", f.numMPR ?? "");
      onOpen();
      setNewFiles([]);
    },
    onClose() {
      onClose();
    },
  }));

  function onSendCompletedFolder() {
    if (!folder) return;

    completeFolder(
      { id: folder.id },
      {
        onSuccess() {},
      }
    );
  }

  async function submitNewDocuments() {
    if (newFiles.length == 0 || !folder) return;

    setIsUploadingFiles(true);
    const newFilesNames = await uploadFiles(newFiles.map((f) => f.file));

    addDocumentsToFolder(
      {
        id: folder.id,
        files: newFiles.map(({ type }, index) => ({
          name: getFileNameByUrl(newFilesNames[index]),
          type,
        })),
      },
      {
        onSuccess() {
          form.reset(DEFAULT_FILES_SCHEMA(folder));
          setNewFiles([]);
        },
        onSettled() {
          setIsUploadingFiles(false);
        },
      }
    );
  }

  function updateNumMPR() {
    if (!folder) return;

    const numMPR = formNumMPR.getValues("numMPR");
    updateFolderNum({ id: folder.id, numMPR });
  }

  function onAddFile(file: File | null = null, type: FolderDocumentType) {
    if (file) {
      setNewFiles((f) => [...f, { file, type }]);
    } else {
      setNewFiles((f) => f.filter(({ type: t }) => type != t));
    }
  }

  async function onCancelFolder() {
    const response = await deletion(
      `Annuler le dossier ${folder!.name}`,
      "Êtes-vous sûr de vouloir annuler ce dossier ?",
      "Oui",
      "Non"
    );

    if (response) {
      deleteFolder(
        { id: folder!.id },
        {
          onSuccess() {
            onClose();
          },
        }
      );
    }
  }

  if (!folder) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      contentStyle={{ pb: 0 }}
    >
      <Stack
        flexDir={{ base: "column", md: "row" }}
        spacing={{ base: 7, md: "unset" }}
        pr={{ base: 3, md: "unset" }}
      >
        <Flex flexDir="column" justifyContent="space-between" flex={1}>
          <Section title={toPlural("Projet", folder.products)}>
            <VStack align="stretch" fontSize={20}>
              {folder.products.map((p) => (
                <Text key={p.id}>{p.title}</Text>
              ))}
            </VStack>
          </Section>
        </Flex>
        <Flex flexDir="column" justifyContent="space-between" flex={1}>
          <Section title="Statut">
            <Status {...folder.status} id="" w="full" />
          </Section>
          <Stack
            flexDir={{ base: "column", sm: "row" }}
            spacing={{ base: 0, sm: 20 }}
          >
            <Section title="N° Dossier">
              <Text fontSize={25} color="king" mt={-3}>
                {folder.name}
              </Text>
            </Section>
            {isAdmin && (
              <Box mb={8}>
                <Form form={formNumMPR} onSubmit={updateNumMPR}>
                  <Input
                    label="N° MPR"
                    rightIcon={
                      isChangingNumMPR ? (
                        <Spinner color="primary" />
                      ) : (
                        formNumMPR.watch("numMPR") != (folder.numMPR ?? "") && (
                          <Image
                            src="/icons/check.svg"
                            cursor="pointer"
                            onClick={updateNumMPR}
                          />
                        )
                      )
                    }
                    {...formNumMPR.register("numMPR")}
                  />
                </Form>
              </Box>
            )}
            {!isAdmin && folder.numMPR && (
              <Section title="N° MPR">
                <Text fontSize={25} color="king" mt={-3}>
                  {folder.numMPR}
                </Text>
              </Section>
            )}
          </Stack>

          {/* <Section title="Date de la demande">
            <Text fontSize={25} color="king" mt={-3}>
              {formatDate(folder.date)}
            </Text>
          </Section> */}
        </Flex>
      </Stack>

      <Section title="Documents">
        <Text>
          Afin de finaliser votre dossier, merci de nous fournir les documents
          suivants
        </Text>
        <Form form={form} onSubmit={() => submitNewDocuments()}>
          <Grid
            gridTemplateColumns={{ md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}
            gap={10}
            mt={5}
          >
            <InputFile
              {...form.register("file1")}
              accept={[".png", ".jpg", ".jpeg", ".pdf"]}
              label="Pièce d'identité"
              onChangeFiles={(f) => onAddFile(f, FolderDocumentType.Identity)}
              isDisabled={inputsFileDisabled}
            />
            <InputFile
              {...form.register("file2")}
              accept={[".png", ".jpg", ".jpeg", ".pdf"]}
              label="Avis d'impôt"
              onChangeFiles={(f) => onAddFile(f, FolderDocumentType.Taxes)}
              isDisabled={inputsFileDisabled}
            />
            <InputFile
              {...form.register("file3")}
              accept={[".png", ".jpg", ".jpeg", ".pdf"]}
              label="Taxe foncière"
              onChangeFiles={(f) =>
                onAddFile(f, FolderDocumentType.PropertyTax)
              }
              isDisabled={inputsFileDisabled}
            />
            <InputFile
              {...form.register("file4")}
              accept={[".png", ".jpg", ".jpeg", ".pdf"]}
              label="Justificatif de domicile"
              onChangeFiles={(f) => onAddFile(f, FolderDocumentType.Home)}
              isDisabled={inputsFileDisabled}
            />
            {(!isAdmin || form.getValues("file5")) && (
              <InputFile
                {...form.register("file5")}
                accept={[".png", ".jpg", ".jpeg", ".pdf"]}
                label="Autres"
                onChangeFiles={(f) => onAddFile(f, FolderDocumentType.Other)}
                isDisabled={inputsFileDisabled}
              />
            )}
            <VStack m="auto">
              {isFolderCompleted &&
                folder.status.id == FolderType.Pending &&
                !isAdmin && (
                  <Button
                    fontSize={16}
                    onClick={onSendCompletedFolder}
                    isLoading={isCompletingFolder}
                    w="full"
                  >
                    ENVOYER MON DOSSIER
                  </Button>
              )}
              <Button
                fontSize={16}
                variant="outline"
                w="full"
                isLoading={isGeneratingPdf}
                onClick={async (e) => {
                  e.preventDefault();
                  if (isGeneratingPdf) return;
                  
                  setIsGeneratingPdf(true);
                  try {
                    await downloadFolderPdf(folder.id);
                  } catch (error) {
                    console.error('Failed to download PDF:', error);
                  } finally {
                    setIsGeneratingPdf(false);
                  }
                }}
              >
                {isGeneratingPdf ? 'GÉNÉRATION EN COURS...' : 'VOIR LA SYNTHÈSE'}
              </Button>
            </VStack>
          </Grid>
          {newFiles.length > 0 && (
            <SubmitButton isLoading={isUploadingFiles} mt={5}>
              Envoyer {newFiles.length}{" "}
              {newFiles.length == 1 ? "nouveau" : "nouveaux"}{" "}
              {toPlural("document", newFiles)}
            </SubmitButton>
          )}
        </Form>
      </Section>
      <VStack align="stretch" w="fit-content" pb={3}>
        {Buttons && <Buttons folder={folder} />}
        {![FolderType.Done, FolderType.Cancel].includes(folder.status.id) &&
          isAdmin && (
            <Button
              onClick={onCancelFolder}
              variant="delete"
              isLoading={isPending}
            >
              ANNULER LE DOSSIER
            </Button>
          )}
      </VStack>
    </Modal>
  );
});

interface SectionProps extends BoxProps {
  title: string;
}
function Section({ title, children, ...rest }: SectionProps) {
  return (
    <Box mb={10} {...rest}>
      <Text fontSize={25} fontWeight={600} color="king" mb={3}>
        {title}
      </Text>
      {children}
    </Box>
  );
}


