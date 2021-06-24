class LocalStorageMock {
  constructor() {
    this.store = [{ id: "15997" }, { id: "17222" }];
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export default LocalStorageMock;