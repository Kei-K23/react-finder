import { create } from 'zustand';

type UseFinderStateType = {
    isfinderResizeOpen: boolean;
    isFinderResizeClose: boolean;
    onOpen: () => void;
    onClose: () => void;
    finderResizeOpen: () => void
    finderResizeClose: () => void
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isfinderResizeOpen: true,
    isFinderResizeClose: true,
    onOpen: () => set({ isfinderResizeOpen: true }),
    onClose: () => set({ isfinderResizeOpen: false }),
    finderResizeOpen: () => set({ isFinderResizeClose: false }),
    finderResizeClose: () => set({ isFinderResizeClose: true })
}));