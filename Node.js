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
}