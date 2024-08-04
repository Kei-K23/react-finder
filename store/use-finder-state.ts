import { create } from 'zustand';

type UseFinderStateType = {
    isFinderOpen: boolean;
    isFinderResizeClose: boolean;
    onOpen: () => void;
    onClose: () => void;
    finderResizeOpen: () => void
    finderResizeClose: () => void
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isFinderOpen: true,
    isFinderResizeClose: true,
    onOpen: () => set({ isFinderOpen: true }),
    onClose: () => set({ isFinderOpen: false }),
    finderResizeOpen: () => set({ isFinderResizeClose: false }),
    finderResizeClose: () => set({ isFinderResizeClose: true })
}));