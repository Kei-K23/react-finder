import { Node } from '@/type';
import { create } from 'zustand';

export enum FilesystemCreateType {
    FOLDER,
    FILE
}

type UseFilesystemManageModalStoreType = {
    node: Node | null;
    type: FilesystemCreateType;
    isOpen: boolean;
    onOpen: (type: FilesystemCreateType, node?: Node) => void;
    onClose: () => void;
}

export const useFilesystemManageModalStore = create<UseFilesystemManageModalStoreType>((set) => ({
    node: null,
    type: FilesystemCreateType.FOLDER,
    isOpen: false,
    onOpen: (type: FilesystemCreateType, node?: Node) => set({ isOpen: true, node, type }),
    onClose: () => set({ isOpen: false, node: null }),
}));