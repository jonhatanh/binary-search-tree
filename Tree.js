import Node from "./Node.js";

export default class Tree {
  #root = null;

  constructor(array) {
    this.#root = this.#buildTree(array);
    this.prettyPrint(this.#root);
  }

  #buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    const root = this.#recursiveBuildTree(sortedArray);
    return root;
  }

  #recursiveBuildTree(array) {
    if (array.length === 0) {
      return null;
    }
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.#recursiveBuildTree(array.slice(0, mid));
    root.right = this.#recursiveBuildTree(array.slice(mid + 1));
    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
