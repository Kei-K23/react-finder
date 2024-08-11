import { Node } from "@/type";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const calculateRightPanelDefaultSize = (width: number) => {
  if (width <= 800) {
    return 20;
  } else if (width > 800) {
    return 10;
  } else {
    return 20;
  }
}

// Utility function to find and add a node if it doesn't already exist
export const addNode = (nodes: Node[], parentNodeName: string, newNode: Node): Node[] => {
  return nodes.map(node => {
    // Node is not folder then return
    if (!node.nodes) {
      return node;
    }

    if (node.name === parentNodeName) {
      // Check if a node with the same name already exists in the current node's children
      const nodeExists = node.nodes.some(childNode => childNode.name === newNode.name);

      if (nodeExists) {
        console.log(`Node with name "${newNode.name}" already exists.`);
        return node; // Return the original node without changes
      }

      // Add the new node if it doesn't exist
      return { ...node, nodes: [...node.nodes, newNode] };

    } else if (node?.nodes.length > 0) {
      // Recursively search and add the node to nested nodes
      return { ...node, nodes: addNode(node.nodes, parentNodeName, newNode) };
    }

    return node; // Return the node unchanged if the parentNodeName is not found
  });
};


// Utility function to find and update a node 
export const updateNode = (nodes: Node[], nodeName: string, updatedNode: Partial<Node>): Node[] => {
  return nodes.map(node => {
    if (node.name === nodeName) {
      // Check if a node with the same name already exists in the current node's children
      //@ts-ignore
      const nodeExists = node.nodes.some(childNode => childNode.name === updatedNode.name);

      if (!nodeExists) {
        console.log(`Node with name "${updatedNode.name}" is not exist to update.`);
        return node; // Return the original node without changes
      }

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
  console.log(nodeName);
  return nodes
    .map(node => {
      if (node.name === nodeName) {
        return null;
        //@ts-ignore
      } else if (node?.nodes?.length > 0) {
        //@ts-ignore
        return { ...node, nodes: deleteNode(node.nodes, nodeName) };
      }
      return node;
    })
    .filter(node => node !== null) as Node[];
};

export const getFileExtension = (filename: string) => {
  // Split the filename by the dot character
  const parts = filename.split('.');

  // If there's no dot in the filename, return an empty string
  if (parts.length === 1) {
    return '';
  }

  // Return the last part after the last dot
  return `${parts.pop()}`;
};

// Function to recursively sort nodes by 'order'
export const sortNodes = (nodes: Node[]) => {
  // Sort the current level by 'order'
  nodes.sort((a, b) => a.order - b.order);

  // Recursively sort nested nodes
  nodes.forEach(node => {
    if (node.nodes && node.nodes.length > 0) {
      sortNodes(node.nodes);
    }
  });

  return nodes
}

// Helper function to get the next order number within a specific node
export const getNextOrderNumber = (nodes: Node[], parentNodeName: string): number => {
  for (let node of nodes) {
    if (node.name === parentNodeName) {
      if (node.nodes && node.nodes.length > 0) {
        const maxOrder = Math.max(...node.nodes.map(childNode => childNode.order));
        return maxOrder + 1;
      } else {
        return 0; // If no nodes exist, the next order number should be 0
      }
    } else if (node.nodes && node.nodes.length > 0) {
      const orderNumber = getNextOrderNumber(node.nodes, parentNodeName);
      if (orderNumber !== -1) {
        return orderNumber;
      }
    }
  }
  return -1; // Return -1 if the parentNodeName is not found
};


// Helper function to get the next order number at the top level (same level as "Recents", "Home", etc.)
export const getNextOrderNumberAtTopLevel = (nodes: Node[]): number => {
  if (nodes && nodes.length > 0) {
    const maxOrder = Math.max(...nodes.map(node => node.order));
    return maxOrder + 1;
  } else {
    return 0; // If no nodes exist at the top level, the next order number should be 0
  }
};

export const findTopNodeById = (nodes: Node[], id: number): Node | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;
  }
  return undefined;
}

export const reorderTopNodes = (nodes: Node[], activeId: number, overId: number): Node[] => {
  const activeNode = findTopNodeById(nodes, activeId);
  const overNode = findTopNodeById(nodes, overId);

  if (!activeNode || !overNode) return nodes;

  // Swap the order values between the activeNode and overNode
  const tempOrder = activeNode.order;
  activeNode.order = overNode.order;
  overNode.order = tempOrder;

  // Sort the nodes based on the new order
  return nodes.sort((a, b) => a.order - b.order);
}

function findParentNode(nodes: Node[], childId: number): Node | undefined {
  for (const node of nodes) {
    if (node.nodes && node.nodes.some(child => child.id === childId)) {
      return node;
    }
    if (node.nodes) {
      const found = findParentNode(node.nodes, childId);
      if (found) return found;
    }
  }
  return undefined;
}