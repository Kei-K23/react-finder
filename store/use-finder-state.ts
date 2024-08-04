import { create } from 'zustand';

type UseFinderStateType = {
    isFinderResizeOpen: boolean;
    isFinderResizeClose: boolean;
    onOpen: () => void;
    onClose: () => void;
    finderResizeOpen: () => void
    finderResizeClose: () => void
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isFinderResizeOpen: true,
    isFinderResizeClose: true,
    onOpen: () => set({ isFinderResizeOpen: true }),
    onClose: () => set({ isFinderResizeOpen: false }),
    finderResizeOpen: () => set({ isFinderResizeClose: false }),
    finderResizeClose: () => set({ isFinderResizeClose: true })
}));