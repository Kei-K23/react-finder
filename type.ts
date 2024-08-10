export type Node = {
    id: number;
    name: string;
    nodes?: Node[];
    order: number
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