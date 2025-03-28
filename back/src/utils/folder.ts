import { FolderType } from 'src/folders/folders.type';
import { getStaticFilePath } from './image';

export function getDataFolderStatus(type: FolderType) {
  switch (type) {
    case FolderType.Done:
      return { id: type, color: 'king', label: 'Terminé' };
    case FolderType.Pending:
      return { id: type, color: '#f69709', label: 'En cours' };
    case FolderType.Completed:
      return { id: type, color: 'secondary', label: 'Complété' };
    case FolderType.Canceled:
      return { id: type, color: 'red', label: 'Annulé' };
    default:
      return { id: type, color: 'black', label: '...' };
  }
}

export function getDocumentIcon(name: string) {
  const splitted = name.split('.');
  if (splitted.length <= 1) {
    return getStaticFilePath('pdf.png');
  }
  switch (splitted[1]) {
    case 'pdf':
      return getStaticFilePath('pdf.png');
    case 'jpg':
    case 'jpeg':
    case 'png':
      return getStaticFilePath('pdf.png');
    default:
      return getStaticFilePath('pdf.png');
  }
}
