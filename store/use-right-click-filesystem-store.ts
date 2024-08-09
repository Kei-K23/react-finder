import { Node } from '@/type';
import { create } from 'zustand';

type UseRightClickFilesystemStoreType = {
    rightClickState: Node | null;
    tempRightClickState: Node | null;
    setRightClickState: (node: Node | null) => void;
    setTempRightClickState: (node: Node | null) => void;
}

export const useRightClickFilesystemStore = create<UseRightClickFilesystemStoreType>((set) => ({
    rightClickState: null,
    tempRightClickState: null,
    setRightClickState: (node: Node | null) => set({ rightClickState: node }),
    setTempRightClickState: (node: Node | null) => set({ tempRightClickState: node }),
}));