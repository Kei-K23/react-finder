export type Node = {
    name: string;
    nodes?: Node[];
};

export type FinderMinimizePrevStateType = {
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