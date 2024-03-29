import readlineSync from "readline-sync";
import chalk from "chalk";
import Tree from "./Tree.js";

const log = console.log;
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const getMenu = () => {
  let treeInOrder = "";
  tree.inOrder()?.forEach((node) => {
    treeInOrder += `${node.value} `;
  });
  return `
${chalk.white.bgBlue("-- BST Options --")}
${chalk.bold("BST inOrder")}: ${chalk.blue(treeInOrder)}
1.- insert.
2.- delete.
3.- find.
4.- levelOrder.
5.- inOrder.
6.- preOrder.
7.- postOrder.
8.- height.
9.- depth.
10.- isBalanced.
11.- rebalance.
12.- prettyPrint.
13.- clear.
0.- exit.
`;
};

let exit = false;
const optionsMap = {
  0() {
    exit = true;
    console.log("Bye!");
  },
  1() {
    const value = toNumber(readlineSync.question("Value: "));
    if (value === null) {
      log(chalk.red("Wrong input, please enter a valid number"));
      return;
    }
    if (tree.insert(value)) log(chalk.yellow("Node Added"));
    else log(chalk.yellow("Error adding node"));
  },
  2() {
    const value = toNumber(readlineSync.question("Value: "));
    if (value === null) {
      log(chalk.red("Wrong input, please enter a valid number"));
      return;
    }
    const deleted = tree.delete(value);
    deleted
      ? log(chalk.yellow("Item Deleted"))
      : log(chalk.red("Item not found"));
  },
  3() {
    const value = toNumber(readlineSync.question("Value: "));
    if (value === null) {
      log(chalk.red("Wrong input, please enter a valid number"));
      return;
    }
    const node = tree.find(value);
    node === null ? log(chalk.red("Node not found")) : log(chalk.yellow(node));
  },
  4() {
    const nodes = tree.levelOrder();
    nodes.forEach((node) => {
      process.stdout.write(chalk.yellow(node.value + " "));
    });
  },
  5() {
    const nodes = tree.inOrder();
    nodes?.forEach((node) => {
      process.stdout.write(chalk.yellow(node.value + " "));
    });
  },
  6() {
    const nodes = tree.preOrder();
    nodes?.forEach((node) => {
      process.stdout.write(chalk.yellow(node.value + " "));
    });
  },
  7() {
    const nodes = tree.postOrder();
    nodes?.forEach((node) => {
      process.stdout.write(chalk.yellow(node.value + " "));
    });
  },
  8() {
    const value = toNumber(readlineSync.question("Node value: "));
    if (value === null) {
      log(chalk.red("Wrong input, please enter a valid number"));
      return;
    }
    const height = tree.height(value);
    if (height === null) {
      log(chalk.red("Item not found"));
      return;
    }
    log(chalk.yellow(`The item height is: ${height}`));
  },
  9() {
    const value = toNumber(readlineSync.question("Node value: "));
    if (value === null) {
      log(chalk.red("Wrong input, please enter a valid number"));
      return;
    }
    const depth = tree.depth(value);
    if (depth === null) {
      log(chalk.red("Item not found"));
      return;
    }
    log(chalk.yellow(`The item depth is: ${depth}`));
  },
  10() {
    const isBalanced = tree.isBalanced();
    log(chalk.yellow(isBalanced[0]));
  },
  11() {
    const rebalanced = tree.rebalance();
    rebalanced
      ? log(chalk.magenta("Rebalanced!"))
      : log(chalk.red("The tree is balanced"));
  },
  12() {
    Tree.prettyPrint(tree.root);
  },
  13() {
    tree.clear();
    log(chalk.red.bgMagenta("Done!"));
  },
};

while (exit === false) {
  log(getMenu());
  const option = readlineSync.question("Option: ");
  if (!optionsMap[option]) {
    log(chalk.red("Invalid option"));
    continue;
  }
  optionsMap[option]();
}

function toNumber(value) {
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}
