import { NODES } from '@/constant';
import { addNode, deleteNode, sortNodes, updateNode } from '@/lib/utils';
import { Node } from '@/type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the state
type UseFilesystemStoreType = {
    nodes: Node[];
    currentSelectedNode: Node | null;
    getNodes: () => Node[];
    setCurrentSelectedNode: (node: Node) => void;
    addNewNode: (parentNodeName: string, newNode: Node) => void;
    addNewNodeForLeft: (newNode: Node) => void;
    updateNode: (nodeName: string, updatedNode: Partial<Node>) => void;
    deleteNode: (nodeName: string) => void;
}

// Correctly type the persisted state creator
export const useFilesystemStore = create<UseFilesystemStoreType>()(
    persist(
        (set, get) => ({
            nodes: NODES,
            currentSelectedNode: null,
            getNodes: () => {
                return sortNodes(get().nodes || [])
            },
            addNewNode: (parentNodeName: string, newNode: Node) => set((state) => ({
                nodes: addNode(state.nodes, parentNodeName, newNode),
            })),
            addNewNodeForLeft: (newNode: Node) => set((state) => ({
                nodes: [...state.nodes, newNode]
            })),
            updateNode: (nodeName: string, updatedNode: Partial<Node>) => set((state) => ({
                nodes: updateNode(state.nodes, nodeName, updatedNode)
            })),
            deleteNode: (nodeName: string) => set((state) => ({
                nodes: deleteNode(state.nodes, nodeName)
            })),
            setCurrentSelectedNode: (node: Node) => set({ currentSelectedNode: node })
        }),
        {
            name: 'react-finder-filesystems-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
);
