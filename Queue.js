export default class Queue {
  #items = [];
  add(item) {
    if (item) this.#items.push(item);
  }
  remove() {
    return this.#items.shift();
  }
  element() {
    return this.#items[0];
  }
  empty() {
    return this.#items.length === 0;
  }
}
