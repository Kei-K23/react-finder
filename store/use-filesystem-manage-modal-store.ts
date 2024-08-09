import { Node } from '@/type';
import { create } from 'zustand';

export enum FilesystemCreateType {
    FOLDER,
    FILE
}

export enum FilesystemActions {
    CREATE,
    UPDATE,
    DELETE
}

type UseFilesystemManageModalStoreType = {
    node: Node | null;
    type: FilesystemCreateType;
    action: FilesystemActions;
    isOpen: boolean;
    onOpen: (type: FilesystemCreateType, node?: Node) => void;
    setNode: (node: Node) => void;
    setAction: (action: FilesystemActions) => void;
    onClose: () => void;
}

export const useFilesystemManageModalStore = create<UseFilesystemManageModalStoreType>((set) => ({
    node: null,
    type: FilesystemCreateType.FOLDER,
    action: FilesystemActions.CREATE,
    isOpen: false,
    onOpen: (type: FilesystemCreateType, node?: Node) => set({ isOpen: true, node, type }),
    setNode: (node: Node) => set({ node: node }),
    setAction: (action: FilesystemActions) => set({ action }),
    onClose: () => set({ isOpen: false, node: null }),
}));