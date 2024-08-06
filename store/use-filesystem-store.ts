import { NODES } from '@/constant';
import { addNode, deleteNode, updateNode } from '@/lib/utils';
import { Node } from '@/type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the state
type UseFilesystemStoreType = {
    nodes: Node[];
    addNewNode: (parentNodeName: string, newNode: Node) => void;
    updateNode: (nodeName: string, updatedNode: Partial<Node>) => void;
    deleteNode: (nodeName: string) => void;
}

// Correctly type the persisted state creator
export const useFilesystemStore = create<UseFilesystemStoreType>()(
    persist(
        (set) => ({
            nodes: NODES,
            addNewNode: (parentNodeName: string, newNode: Node) => set((state) => ({
                nodes: addNode(state.nodes, parentNodeName, newNode)
            })),
            updateNode: (nodeName: string, updatedNode: Partial<Node>) => set((state) => ({
                nodes: updateNode(state.nodes, nodeName, updatedNode)
            })),
            deleteNode: (nodeName: string) => set((state) => ({
                nodes: deleteNode(state.nodes, nodeName)
            })),
        }),
        {
            name: 'react-finder-filesystems-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
);
