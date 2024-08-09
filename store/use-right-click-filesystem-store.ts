import { Node } from '@/type';
import { create } from 'zustand';

type UseRightClickFilesystemStoreType = {
    rightClickState: Node | null;
    tempRightClickState: Node | null;
    leftState: boolean;
    setLeftState: (leftState: boolean) => void;
    setRightClickState: (node: Node | null) => void;
    setTempRightClickState: (node: Node | null) => void;
}

export const useRightClickFilesystemStore = create<UseRightClickFilesystemStoreType>((set) => ({
    rightClickState: null,
    tempRightClickState: null,
    leftState: false,
    setLeftState: (leftState: boolean) => set({ leftState }),
    setRightClickState: (node: Node | null) => set({ rightClickState: node }),
    setTempRightClickState: (node: Node | null) => set({ tempRightClickState: node }),
}));