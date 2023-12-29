import Node from "./Node.js";

export default class Tree {
  #root = null;

  constructor(array) {
    this.#root = this.#buildTree(array);
    Tree.prettyPrint(this.#root);
  }

  get root() {
    return this.#root;
  }

  insert(value) {
    if(this.find(value) !== null) return false;
    if(this.#root === null) {
      this.#root = new Node(value);
      return true;
    }

    let auxNode = this.#root;
    const newNode = new Node(value);
    while(auxNode != null) {
      if(value < auxNode.value) {
        if(auxNode.left === null) {
          auxNode.left = newNode;
          break;
        }
        auxNode = auxNode.left;
      } else {
        if(auxNode.right === null) {
          auxNode.right = newNode;
          break;
        }
        auxNode = auxNode.right;
      }
    }
    return auxNode !== null
  }

  find(value) {
    return this.#recursiveFind(this.#root, value);
  }
  #recursiveFind(root, value) {
    if(root === null) return null;
    if(root.value === value) return root;
    if(value < root.value) {
        return this.#recursiveFind(root.left, value);
    } else {
        return this.#recursiveFind(root.right, value);
    }
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

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
