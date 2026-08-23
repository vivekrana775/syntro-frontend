import { useId, useReducer, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  BomEmptyState,
  BomGroup,
  BomLibraryToolbar,
  BomTable,
  DeleteDialog,
  FolderMenu,
  MoveBomDialog,
  NameDialog,
  UploadBomDialog,
  type UploadResult,
} from '@/components/bom';
import { NewOrderModal } from '@/components/dashboard';
import { AppLayout, PageHeading } from '@/components/layout';
import { SectionHeader } from '@/components/purchase-orders';
import { Button, Card, Icon } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { bomPath } from '@/lib/constants';
import { bomLibrary, currentUser, navigation, uploadPreview } from '@/mocks';
import { SYNTRO_FIELDS, type BomFolder, type NewOrderKind } from '@/types';

import { bomLibraryReducer, initialLibraryState, nextFolderId } from './bomLibraryReducer';

type Target = { kind: 'folder' | 'bom'; id: string } | null;

const UNGROUPED = 'Ungrouped';
const EMPTY_FOLDER = 'Empty - move BOMs here from their menu.';

/**
 * BOM library (1:19147 empty, 1:18704 flat, 1:18915 grouped) with its folder, move, delete and
 * upload dialogs. Folders and BOMs are local state until the API is wired.
 */
export function BomLibraryPage() {
  const navigate = useNavigate();
  const headingId = useId();
  const [library, dispatch] = useReducer(bomLibraryReducer, bomLibrary, initialLibraryState);
  const [search, setSearch] = useState('');
  const [target, setTarget] = useState<Target>(null);
  const newOrder = useDisclosure();
  const newFolder = useDisclosure();
  const rename = useDisclosure();
  const move = useDisclosure();
  const remove = useDisclosure();
  const upload = useDisclosure();

  const query = search.trim().toLowerCase();
  const visibleBoms = query
    ? library.boms.filter((bom) => bom.name.toLowerCase().includes(query))
    : library.boms;
  const hasFolders = library.folders.length > 0;
  const isEmpty = library.boms.length === 0 && !hasFolders;

  const targetFolder =
    target?.kind === 'folder'
      ? library.folders.find((folder) => folder.id === target.id)
      : undefined;
  const targetBom =
    target?.kind === 'bom' ? library.boms.find((bom) => bom.id === target.id) : undefined;
  const targetName = targetFolder?.name ?? targetBom?.name ?? '';

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleUploadComplete = (result: UploadResult) => {
    // TODO(api): upload the spreadsheet, persist the column mapping and add the BOM to the library.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('upload bom', result);
    upload.onClose();
  };

  const handleView = (id: string) => {
    navigate(bomPath(id));
  };

  const createFolder = (name: string): BomFolder => {
    // TODO(api): the server will assign the folder id.
    const folder = { id: nextFolderId(library), name };
    dispatch({ type: 'folder/create', folder });
    return folder;
  };

  const handleCreateFolder = (name: string) => {
    createFolder(name);
    newFolder.onClose();
  };

  const openRename = (next: Target, opener: HTMLElement | null) => {
    setTarget(next);
    rename.onOpen(opener);
  };

  const openMove = (id: string, opener: HTMLElement | null) => {
    setTarget({ kind: 'bom', id });
    move.onOpen(opener);
  };

  const openDelete = (next: Target, opener: HTMLElement | null) => {
    setTarget(next);
    remove.onOpen(opener);
  };

  const handleRename = (name: string) => {
    if (target?.kind === 'folder') dispatch({ type: 'folder/rename', id: target.id, name });
    if (target?.kind === 'bom') dispatch({ type: 'bom/rename', id: target.id, name });
    rename.onClose();
  };

  const handleMove = (folderId: string) => {
    if (target?.kind === 'bom') dispatch({ type: 'bom/move', id: target.id, folderId });
    move.onClose();
  };

  const handleDelete = () => {
    if (target?.kind === 'folder') dispatch({ type: 'folder/delete', id: target.id });
    if (target?.kind === 'bom') dispatch({ type: 'bom/delete', id: target.id });
    remove.onClose();
  };

  const tableActions = {
    onView: handleView,
    onRename: (id: string, opener: HTMLElement | null) => {
      openRename({ kind: 'bom', id }, opener);
    },
    onMove: openMove,
    onDelete: (id: string, opener: HTMLElement | null) => {
      openDelete({ kind: 'bom', id }, opener);
    },
  };

  return (
    <AppLayout title="BOM" user={currentUser} navigation={navigation} onNewOrder={newOrder.onOpen}>
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading
          title="Bill of materials"
          subtitle="Upload a spreadsheet to explode it into an assembly tree and start sourcing."
        >
          <Button
            variant="paper"
            size="md"
            className="mt-1.5 gap-2"
            leadingIcon={<Icon name="upload" />}
            onClick={upload.onOpen}
          >
            Upload BOM
          </Button>
        </PageHeading>

        <Card className="flex flex-1 flex-col gap-6">
          <section aria-labelledby={headingId} className="flex flex-1 flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionHeader
                id={headingId}
                as="h2"
                title="Your BOMs"
                description="Track the latest procurement updates and order progress across your workspace."
              />
              <BomLibraryToolbar
                search={search}
                onSearchChange={setSearch}
                onNewFolder={newFolder.onOpen}
              />
            </div>

            {isEmpty ? (
              <>
                <BomTable caption="Your BOMs" boms={[]} {...tableActions} />
                <BomEmptyState
                  title="No BOMs Yet"
                  description="Upload your first BOM to organise parts, manage assemblies, and start sourcing components."
                />
              </>
            ) : hasFolders ? (
              <div className="flex flex-col gap-5">
                {library.folders.map((folder) => (
                  <BomGroup
                    key={folder.id}
                    title={folder.name}
                    folder
                    menu={
                      <FolderMenu
                        folderName={folder.name}
                        onRename={(opener) => {
                          openRename({ kind: 'folder', id: folder.id }, opener);
                        }}
                        onDelete={(opener) => {
                          openDelete({ kind: 'folder', id: folder.id }, opener);
                        }}
                      />
                    }
                  >
                    <BomTable
                      caption={`${folder.name} BOMs`}
                      boms={visibleBoms.filter((bom) => bom.folderId === folder.id)}
                      emptyMessage={EMPTY_FOLDER}
                      {...tableActions}
                    />
                  </BomGroup>
                ))}
                <BomGroup title={UNGROUPED} folder={false}>
                  <BomTable
                    caption={`${UNGROUPED} BOMs`}
                    boms={visibleBoms.filter((bom) => bom.folderId === null)}
                    {...tableActions}
                  />
                </BomGroup>
              </div>
            ) : (
              <BomTable caption="Your BOMs" boms={visibleBoms} {...tableActions} />
            )}
          </section>
        </Card>
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <UploadBomDialog
        open={upload.open}
        onOpenChange={upload.onOpenChange}
        onCloseAutoFocus={upload.onCloseAutoFocus}
        preview={uploadPreview}
        fields={SYNTRO_FIELDS}
        onComplete={handleUploadComplete}
      />
      <NameDialog
        open={newFolder.open}
        onOpenChange={newFolder.onOpenChange}
        onCloseAutoFocus={newFolder.onCloseAutoFocus}
        mode="new-folder"
        onSubmit={handleCreateFolder}
      />
      <NameDialog
        open={rename.open}
        onOpenChange={rename.onOpenChange}
        onCloseAutoFocus={rename.onCloseAutoFocus}
        mode={target?.kind === 'folder' ? 'rename-folder' : 'rename-bom'}
        initialName={targetName}
        onSubmit={handleRename}
      />
      <MoveBomDialog
        open={move.open}
        onOpenChange={move.onOpenChange}
        onCloseAutoFocus={move.onCloseAutoFocus}
        bomName={targetName}
        folders={library.folders}
        onMove={handleMove}
        onCreateFolder={createFolder}
      />
      <DeleteDialog
        open={remove.open}
        onOpenChange={remove.onOpenChange}
        onCloseAutoFocus={remove.onCloseAutoFocus}
        kind={target?.kind === 'folder' ? 'folder' : 'bom'}
        onConfirm={handleDelete}
      />
    </AppLayout>
  );
}
