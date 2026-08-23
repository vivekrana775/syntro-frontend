import type { BomFolder, BomsData, BomSummary } from '@/types';

/** Library page state: folders and BOMs live locally until the API is wired. */
export interface LibraryState {
  folders: BomFolder[];
  boms: BomSummary[];
  /** Next local folder id suffix; never reused so ids stay unique across deletes. */
  seq: number;
}

export type LibraryAction =
  | { type: 'folder/create'; folder: BomFolder }
  | { type: 'folder/rename'; id: string; name: string }
  | { type: 'folder/delete'; id: string }
  | { type: 'bom/rename'; id: string; name: string }
  | { type: 'bom/move'; id: string; folderId: string | null }
  | { type: 'bom/delete'; id: string };

export const initialLibraryState = (data: BomsData): LibraryState => ({
  folders: [...data.folders],
  boms: [...data.boms],
  seq: data.folders.length + 1,
});

/** Id for the folder that `folder/create` will add next. */
export const nextFolderId = (state: LibraryState) => `folder-${String(state.seq)}`;

export function bomLibraryReducer(state: LibraryState, action: LibraryAction): LibraryState {
  switch (action.type) {
    case 'folder/create':
      return { ...state, folders: [...state.folders, action.folder], seq: state.seq + 1 };
    case 'folder/rename':
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.id ? { ...folder, name: action.name } : folder,
        ),
      };
    case 'folder/delete':
      // "This will permanently delete the folder and all its contents." (1:24881)
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== action.id),
        boms: state.boms.filter((bom) => bom.folderId !== action.id),
      };
    case 'bom/rename':
      return {
        ...state,
        boms: state.boms.map((bom) => (bom.id === action.id ? { ...bom, name: action.name } : bom)),
      };
    case 'bom/move':
      return {
        ...state,
        boms: state.boms.map((bom) =>
          bom.id === action.id ? { ...bom, folderId: action.folderId } : bom,
        ),
      };
    case 'bom/delete':
      return { ...state, boms: state.boms.filter((bom) => bom.id !== action.id) };
  }
}
