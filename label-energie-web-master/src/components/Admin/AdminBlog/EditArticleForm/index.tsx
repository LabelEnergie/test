"use client";

import AppPage from "@/components/shared/AppPage";
import Button from "@/components/shared/Button";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from "@/components/shared/form/Input";
import { InputFile } from "@/components/shared/form/InputFile";
import { Form, useZodForm } from "@/components/shared/form/form";
import { useModals } from "@/hooks/useModals";
import {
  useCreateArticle,
  useDeleteArticle,
  useUpdateArticle,
} from "@/services/blog.service";
import { uploadFiles } from "@/services/file.service";
import { TArticle, TArticleBody, TArticleForm } from "@/types/article.type";
import { getFileNameByUrl, getFileNamesByUrls } from "@/utils/file";
import { articleImageSchema, noEmptyStringSchema } from "@/utils/schemas";
import { schemaError } from "@/utils/schemas/formErrors";
import { toPlural } from "@/utils/string";
import {
  Box,
  Divider,
  Text,
  Toast,
  VStack,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

interface EditArticleFormProps {
  article?: TArticle;
}

const schema = z.object({
  code: noEmptyStringSchema.refine(
    (v) => {
      const regex = /^[a-z0-9-]+$/;
      return regex.test(v);
    },
    { message: "Lettres minucules, chiffres ou - acceptés" }
  ),
  title: noEmptyStringSchema,
  seo: z.object({
    title: noEmptyStringSchema,
    description: noEmptyStringSchema,
  }),
  image: articleImageSchema(false),
  images: z.array(articleImageSchema()),
  mdFile: z.any().refine((v) => v != null, { message: schemaError }),
});

const DEFAULT_VALUES: TArticleForm = {
  code: "",
  seo: {
    description: "",
    title: "",
  },
  title: "",
  image: {
    file: null,
    legend: "",
  },
  images: [],
  mdFile: null,
};

export default function EditArticleForm(props: EditArticleFormProps) {
  const { article } = props;

  const router = useRouter();

  const { mutate: createArticle, isPending: isCreatingArticle } =
    useCreateArticle();
  const { mutate: updateArticle, isPending: isUpdatingArticle } =
    useUpdateArticle();
  const { mutate: deleteArticle, isPending: isDeletingArticle } =
    useDeleteArticle();

  const modals = useModals();
  const toast = useToast();

  const form = useZodForm({
    schema,
    defaultValues: {
      ...DEFAULT_VALUES,
      ...(article && {
        ...article,
        image: {
          legend: article.image.legend,
          file: article.image.src,
        },
        mdFile: article.mdFileUrl,
        images:
          article.images?.map((i) => ({
            legend: i.legend,
            file: i.src,
          })) ?? [],
      }),
    },
  });

  const [estimatedNbImages, setEstimatedNbImages] = useState<number>(
    article?.images?.length ?? 0
  );

  async function updateEstimateNbImages(mdFile?: File) {
    if (!mdFile) {
      setEstimatedNbImages(0);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target && event.target.result) {
        const content: string = event.target.result.toString();

        const regex = /!\[\[(.*?)\]\]/g;
        let match;
        let imageCount = 0;

        while ((match = regex.exec(content)) !== null) {
          imageCount++;
        }

        setEstimatedNbImages(imageCount);
        form.setValue(
          "images",
          Array.from({ length: imageCount }).map(() => ({
            file: null,
            legend: "",
          }))
        );
      }
    };
    reader.readAsText(mdFile);
  }

  async function onDeleteArticle() {
    if (!article) return;

    const result = await modals.deletion(
      "Suppression de l'article",
      `Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ?`
    );

    if (result) {
      deleteArticle(
        { id: article.id },
        {
          onSuccess() {
            router.back();
            toast({
              title: "Article supprimé avec succès",
              status: "success",
              position: "top",
            });
          },
        }
      );
    }
  }

  return (
    <AppPage
      title={article ? `Modifier article ${article.code}` : "Créer un article"}
      headerRight={
        article ? (
          <Button
            variant="delete"
            onClick={onDeleteArticle}
            isLoading={isDeletingArticle}
            isDisabled={isUpdatingArticle}
          >
            Supprimer
          </Button>
        ) : null
      }
      canGoBack
    >
      <Form
        form={form}
        onSubmit={async ({ code, image, images, seo, title, mdFile }) => {
          let body: TArticleBody = {
            code,
            title,
            imageName: getFileNameByUrl(image.file),
            seo,
            mdFileName: getFileNameByUrl(mdFile),
            images: images?.map((i) => ({
              name: getFileNameByUrl(i.file),
              legend: i.legend,
            })),
          };

          // Upload new files
          const filesUploadedIdentity: (string | number)[] = [];

          const filesToUpload = [
            image.file,
            mdFile,
            ...images.map((i) => i.file),
          ].filter((i, index) => {
            if (i && typeof i != "string") {
              switch (index) {
                case 0:
                  filesUploadedIdentity.push("image");
                  break;
                case 1:
                  filesUploadedIdentity.push("mdFile");
                  break;
                default:
                  filesUploadedIdentity.push(index - 2);
              }
              return true;
            }
            return false;
          });

          if (filesToUpload.length > 0) {
            const newFilesNames = getFileNamesByUrls(
              await uploadFiles(filesToUpload, {
                blogArticleCode: code,
              })
            );
            newFilesNames.forEach((newFileName, index) => {
              const identity = filesUploadedIdentity[index];
              switch (identity) {
                case "image":
                  body.imageName = newFileName;
                  break;
                case "mdFile":
                  body.mdFileName = newFileName;
                  break;
                default:
                  body.images![identity as number].name = newFileName;
              }
            });
          }

          if (article) {
            updateArticle(
              { id: article.id, body },
              {
                onSuccess() {
                  router.back();
                },
              }
            );
          } else {
            createArticle(body, {
              onSuccess() {
                router.back();
              },
            });
          }
        }}
      >
        <VStack spacing={5} align="stretch">
          <Input
            label="Code"
            isDisabled={article != undefined}
            {...form.register("code")}
          />
          <Input label="Titre de l'article" {...form.register("title")} />
          <Input label="Titre meta" {...form.register("seo.title")} />
          <Input
            label="Description meta"
            multiLine
            {...form.register("seo.description")}
          />
          <InputFile
            label="Image principale"
            w="full"
            accept={[".png", ".jpg", ".jpeg"]}
            displayPreview
            maxW="400px"
            {...form.register("image.file")}
          />
          <InputFile
            label="Article .md"
            onChangeFiles={(file) => {
              updateEstimateNbImages(file);
            }}
            w="full"
            accept={[".md"]}
            maxW="400px"
            {...form.register("mdFile")}
          />
          {estimatedNbImages > 0 && (
            <Box w="full">
              <Text fontWeight={600} fontSize={20} mb={3}>
                {estimatedNbImages} {toPlural("image", estimatedNbImages)} dans
                cet article
              </Text>
              <VStack spacing={10} divider={<Divider />}>
                {Array.from({ length: estimatedNbImages }).map((_, i) => (
                  <VStack key={i} w="full" spacing={2}>
                    <InputFile
                      label={`Image ${i + 1}`}
                      {...form.register(`images.${i}.file`)}
                      w="full"
                      displayPreview
                      multi={false}
                      accept={[".png", ".jpg", ".jpeg"]}
                    />
                    <Input
                      label={`Légende image ${i + 1}`}
                      {...form.register(`images.${i}.legend`)}
                    />
                  </VStack>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
        <SubmitButton
          mt={10}
          isLoading={isCreatingArticle || isUpdatingArticle}
          isDisabled={isDeletingArticle}
        >
          {article ? "Modifier" : "Créer l'article"}
        </SubmitButton>
      </Form>
    </AppPage>
  );
}
