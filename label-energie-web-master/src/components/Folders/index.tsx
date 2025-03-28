"use client";

import { Box, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import AppPage from "../shared/AppPage";
import Button from "../shared/Button";
import FolderModal, { FolderModalRef } from "./FolderModal";
import { useRef, useEffect } from "react";
import { useFolders } from "@/services/folder.service";
import { TFolder } from "@/types/folder.type";
import FoldersTable from "../shared/Tables/FoldersTable";
import { useAppContext } from "@/app/providers";
import { useRouter } from "next/navigation";

export default function Folders() {
  const modalRef = useRef<FolderModalRef>(null);
  const { data: folders, isLoading, error } = useFolders();
  const { user } = useAppContext(); // Ajouter cette ligne

  useEffect(() => {
    if (error) {
      console.error('Erreur détaillée des dossiers:', {
        error,
        userId: user?.id,
        timestamp: new Date().toISOString()
      });
    }
  }, [error, user]);

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">
          Erreur d'accès aux dossiers. Veuillez vérifier vos permissions ou vous reconnecter.
        </Text>
      </Box>
    );
  }

  function onOpenFolder(folder: TFolder) {
    console.log('Ouverture du dossier:', folder);
    modalRef.current?.onOpen(folder);
  }

  // Gestion de l'erreur
  if (error) {
    console.error('Erreur lors du chargement des dossiers:', error);
    return <Box>Erreur lors du chargement des dossiers</Box>;
  }

  return (
    <>
      <AppPage
        title="Mes dossiers"
        headerRight={
          <Button leftIcon={<Text>+</Text>} href="/simulateur">
            NOUVEAU DOSSIER
          </Button>
        }
        px={0}
      >
        <FoldersTable
          onFolderClick={(f) => onOpenFolder(f)}
          folders={folders || []} // Évite l'erreur si folders est undefined
          isLoading={isLoading}
        />
      </AppPage>
      <FolderModal ref={modalRef} folders={folders} />
    </>
  );
}
