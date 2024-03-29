import Node from "./Node.js";
import Queue from "./Queue.js";
export default class Tree {
  #root = null;

  constructor(array) {
    this.#root = this.#buildTree(array);
    Tree.prettyPrint(this.#root);
  }

  rebalance() {
    if(this.isBalanced()[0]) return false;
    const treeNodes = this.inOrder();
    this.#root = this.#buildTree(treeNodes.map(node => node.value));
    Tree.prettyPrint(this.#root);
    return true;
  }

  clear() {
    this.#root = null;
  }

  get root() {
    return this.#root;
  }

  insert(value) {
    if (this.find(value) !== null) return false;
    if (this.#root === null) {
      this.#root = new Node(value);
      return true;
    }

    let auxNode = this.#root;
    const newNode = new Node(value);
    while (auxNode != null) {
      if (value < auxNode.value) {
        if (auxNode.left === null) {
          auxNode.left = newNode;
          break;
        }
        auxNode = auxNode.left;
      } else {
        if (auxNode.right === null) {
          auxNode.right = newNode;
          break;
        }
        auxNode = auxNode.right;
      }
    }
    return auxNode !== null;
  }

  delete(value) {
    const parentFound = this.findParent(value);
    if (!parentFound) return false;
    const [parent, position] = parentFound;

    if (position === "root") return this.#deleteRoot();

    const child = parent[position];

    if (this.#isLeaf(child)) {
      parent[position] = null;
      return true;
    } else if (this.#onlyLeftChild(child)) {
      parent[position] = child.left;
      return true;
    } else if (this.#onlyRightChild(child)) {
      parent[position] = child.right;
    } else {
      //both childs
      const nextBiggest = this.#findBiggest(child);
      this.delete(nextBiggest.value);
      child.value = nextBiggest.value;
      return true;
    }
  }
  #deleteRoot() {
    const newRoot =
      this.#findBiggest(this.#root) ?? this.#findBiggest(this.#root, false);
    if (newRoot) {
      this.delete(newRoot.value);
      this.#root.value = newRoot.value;
    } else {
      this.#root = null;
    }
    return true;
  }

  #isLeaf = (node) => node.left === null && node.right === null;
  #onlyLeftChild = (node) => node.left && node.right === null;
  #onlyRightChild = (node) => node.left === null && node.right;

  findParent(value) {
    if (this.#root === null) return false;
    if (value === this.#root.value) return [this.#root, "root"];
    let auxNode = this.#root;
    while (auxNode !== null) {
      if (auxNode.left?.value === value) {
        return [auxNode, "left"];
      }
      if (auxNode.right?.value === value) {
        return [auxNode, "right"];
      }
      auxNode = value < auxNode.value ? auxNode.left : auxNode.right;
    }
    return false;
  }

  #findBiggest(node, toRight = true) {
    let nextBiggest = node[toRight ? "right" : "left"];
    if (nextBiggest === null) return null;
    const contraryDirection = toRight ? "left" : "right";
    while (nextBiggest[contraryDirection] !== null) {
      nextBiggest = nextBiggest[contraryDirection];
    }
    return nextBiggest;
  }
  // #findNextBiggest(node) {
  //   let nextBiggest = node.right;
  //   if (nextBiggest === null) return null;
  //   while (nextBiggest.left !== null) {
  //     nextBiggest = nextBiggest.left;
  //   }
  //   return nextBiggest;
  // }
  // #findPrevBiggest(node) {
  //   let prevBiggest = node.left;
  //   if (prevBiggest === null) return null;
  //   while (prevBiggest.right !== null) {
  //     prevBiggest = prevBiggest.right;
  //   }
  //   return prevBiggest;
  // }

  find(value) {
    return this.#recursiveFind(this.#root, value);
  }
  #recursiveFind(root, value) {
    if (root === null) return null;
    if (root.value === value) return root;
    if (value < root.value) {
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

  levelOrder() {
    if (!this.#root) return [];
    const nodes = [this.#root];
    const nodesQueue = new Queue();
    nodesQueue.add(this.#root.left);
    nodesQueue.add(this.#root.right);
    while (!nodesQueue.empty()) {
      const currentNode = nodesQueue.remove();
      nodesQueue.add(currentNode.left);
      nodesQueue.add(currentNode.right);
      nodes.push(currentNode);
    }
    return nodes;
  }

  recursiveLevelOrder() {
    if (!this.#root) return [];
    const nodesQueue = new Queue();
    nodesQueue.add(this.#root);
    return this.#recursiveLvlOrder(nodesQueue);
  }

  #recursiveLvlOrder(queue, nodes = []) {
    if (queue.empty()) return nodes;
    const currentNode = queue.remove();
    queue.add(currentNode.left);
    queue.add(currentNode.right);
    nodes.push(currentNode);
    return this.#recursiveLvlOrder(queue, nodes);
  }

  preOrder(node = this.#root, nodes = []) {
    if (node === null) return;
    nodes.push(node);
    this.preOrder(node.left, nodes);
    this.preOrder(node.right, nodes);
    return nodes;
  }
  inOrder(node = this.#root, nodes = []) {
    if (node === null) return;
    this.inOrder(node.left, nodes);
    nodes.push(node);
    this.inOrder(node.right, nodes);
    return nodes;
  }
  postOrder(node = this.#root, nodes = []) {
    if (node === null) return;
    this.postOrder(node.left, nodes);
    this.postOrder(node.right, nodes);
    nodes.push(node);
    return nodes;
  }

  height(value) {
    const node = this.find(value)
    if(!node) return null;
    return this.#recursiveHeight(node);
  }
  #recursiveHeight(node) {
    if(node === null) return 0;
    if(this.#isLeaf(node)) return 0;

    const leftChildHeight = this.#recursiveHeight(node.left);
    const rightChildHeight = this.#recursiveHeight(node.right);
    return Math.max(leftChildHeight, rightChildHeight) + 1;
  }
  depth(value) {
    if(!this.find(value)) return null;
    let auxNode = this.#root;
    let depth = 0;
    while(auxNode !== null && auxNode.value !== value) {
      auxNode = value < auxNode.value ? auxNode.left : auxNode.right;
      depth++;
    }
    return depth;
  }

  isBalanced(root = this.#root) {
    if(root === null) {
      return [true, -1];
    }

    const [leftIsBalanced, leftHeight] = this.isBalanced(root.left);
    const [rightIsBalanced, rightHeight] = this.isBalanced(root.right);
    const currentNodeHeight = Math.max(leftHeight, rightHeight) + 1;
    if(!leftIsBalanced || !rightIsBalanced) return [false, currentNodeHeight];
    const nodeIsBalanced = !(Math.abs(leftHeight - rightHeight) > 1);
    return [nodeIsBalanced, currentNodeHeight];
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
