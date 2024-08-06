import { Node } from "@/type";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRightPanelDefaultSize(width: number) {
  if (width <= 800) {
    return 20;
  } else if (width > 800) {
    return 10;
  } else {
    return 20;
  }
}

// Utility function to find and add a node
export const addNode = (nodes: Node[], parentNodeName: string, newNode: Node): Node[] => {
  return nodes.map(node => {
    if (node.name === parentNodeName) {
      //@ts-ignore
      return { ...node, nodes: [...node?.nodes, newNode] };
      //@ts-ignore
    } else if (node?.nodes?.length > 0) {
      //@ts-ignore
      return { ...node, nodes: addNode(node?.nodes, parentNodeName, newNode) };
    }

    return node;
  });
};

// Utility function to find and update a node 
export const updateNode = (nodes: Node[], nodeName: string, updatedNode: Partial<Node>): Node[] => {
  return nodes.map(node => {
    if (node.name === nodeName) {
      return { ...node, ...updatedNode };
      //@ts-ignore
    } else if (node?.nodes?.length > 0) {
      //@ts-ignore
      return { ...node, nodes: updateNode(node?.nodes, nodeName, updatedNode) };
    }
    return node;
  });
};

// Utility function to find and delete a node
export const deleteNode = (nodes: Node[], nodeName: string): Node[] => {
  return nodes
    .map(node => {
      if (node.name === nodeName) {
        return null;
        //@ts-ignore
      } else if (node.nodes.length > 0) {
        //@ts-ignore
        return { ...node, nodes: deleteNode(node.nodes, nodeName) };
      }
      return node;
    })
    .filter(node => node !== null) as Node[];
};
