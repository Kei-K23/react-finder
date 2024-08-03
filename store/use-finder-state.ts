import { create } from 'zustand';

type UseFinderStateType = {
    isFinderOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isFinderOpen: true,
    onOpen: () => set({ isFinderOpen: true }),
    onClose: () => set({ isFinderOpen: false }),
}));