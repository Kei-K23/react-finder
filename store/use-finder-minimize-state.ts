import { Node } from '@/type';
import { create } from 'zustand';

type FinderMinimizePrevStateType = {
    position: {
        top: number,
        left: number,
    },
    size: {
        width: number,
        height: number,
    },
    backHistory: Node[],
    forwardHistory: Node[],
    selectedNode: Node | null,
}

type UseFinderStateMinimizeType = {
    isFinderMinimize: boolean;
    prevState: FinderMinimizePrevStateType | null,
    finderMinimizeOpen: (prevState: FinderMinimizePrevStateType) => void
    finderMinimizeClose: () => void
}

export const useFinderStateMinimize = create<UseFinderStateMinimizeType>((set) => ({
    isFinderMinimize: false,
    prevState: null,
    finderMinimizeOpen: (prevState: FinderMinimizePrevStateType) => set({
        isFinderMinimize: true,
        prevState
    }),
    finderMinimizeClose: () => set({ isFinderMinimize: false, prevState: null }),
}));