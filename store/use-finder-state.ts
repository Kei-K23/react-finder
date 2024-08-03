import { create } from 'zustand';

type UseFinderStateType = {
    isFinderOpen: boolean;
    isFinderClose: boolean;
    onOpen: () => void;
    onClose: () => void;
    finderOpen: () => void
    finderClose: () => void
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isFinderOpen: true,
    isFinderClose: true,
    onOpen: () => set({ isFinderOpen: true }),
    onClose: () => set({ isFinderOpen: false }),
    finderOpen: () => set({ isFinderClose: false }),
    finderClose: () => set({ isFinderClose: true })
}));