"use client";

import FolderModal, { FolderModalRef } from "@/components/Folders/FolderModal";
import AppPage from "@/components/shared/AppPage";
import Button from "@/components/shared/Button";
import FoldersTable from "@/components/shared/Tables/FoldersTable";
import {
  useChangeFolderStatusAdmin,
  useFolders,
} from "@/services/folder.service";
import { FolderType, TFolder } from "@/types/folder.type";
import { useRef } from "react";

interface AdminFoldersProps {}

export default function AdminFolders(props: AdminFoldersProps) {
  const {} = props;

  const { data: folders, isLoading } = useFolders();
  const { mutate: changeFolderStatus, isPending: isLoadingButton } =
    useChangeFolderStatusAdmin();
  const modalRef = useRef<FolderModalRef>(null);

  function onFolderClick(f: TFolder) {
    modalRef.current?.onOpen(f);
  }

  function onFolderDone(folder: TFolder) {
    changeFolderStatus(
      { id: folder.id, status: FolderType.Done },
      {
        onSuccess() {
          modalRef.current?.onClose();
        },
      }
    );
  }

  return (
    <AppPage title="Dossiers en cours">
      <FoldersTable
        onFolderClick={(f) => onFolderClick(f)}
        folders={folders}
        isLoading={isLoading}
      />
      <FolderModal
        ref={modalRef}
        folders={folders}
        isAdmin
        buttons={({ folder }) =>
          folder.status.id == FolderType.Completed ? (
            <Button
              onClick={() => onFolderDone(folder)}
              isLoading={isLoadingButton}
            >
              TERMINER LE DOSSIER
            </Button>
          ) : (
            <></>
          )
        }
      />
    </AppPage>
  );
}
