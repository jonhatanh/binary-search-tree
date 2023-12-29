export default class Node {
  #value = null;
  left = null;
  right = null;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  toString() {
    return `
Node value: ${this.#value}
Left value: ${this.left?.value ?? null}
Right value: ${this.right?.value ?? null}
        `;
  }
}
