import { FinderMinimizePrevStateType } from '@/type';
import { create } from 'zustand';

type UseFinderStateType = {
    isFinderOpen: boolean;
    isFinderResizeClose: boolean;
    finderMinimizeState: FinderMinimizePrevStateType | null,
    setFinderMinimizeState: (finderMinimizeState: FinderMinimizePrevStateType | null) => void,
    onOpen: () => void;
    onClose: () => void;
    finderResizeOpen: () => void
    finderResizeClose: () => void
}

export const useFinderState = create<UseFinderStateType>((set) => ({
    isFinderOpen: true,
    isFinderResizeClose: true,
    finderMinimizeState: null,
    onOpen: () => set({ isFinderOpen: true }),
    setFinderMinimizeState: (finderMinimizeState: FinderMinimizePrevStateType | null) => set({ finderMinimizeState }),
    onClose: () => set({ isFinderOpen: false }),
    finderResizeOpen: () => set({ isFinderResizeClose: false }),
    finderResizeClose: () => set({ isFinderResizeClose: true })
}));