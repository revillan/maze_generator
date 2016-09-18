class MinHeap {
  constructor() {
    this.array = [null];
    this.heapsize = 0;
    this.heap = {};
  }

  extractMin() {
    if (this.heapsize < 1 ) {
      throw "heap is empty";
    }
    const min = this.array[1];
    this.array[1] = this.array[this.heapsize];
    this.heapsize--;
    this.minHeapify(1);
    return this.heap[min];
  }

  heapInsert(key, value) {
    this.heapsize++;
    this.array[this.heapsize] = 25; //basically infinity
    this.heapDecreaseKey(this.heapsize, key);
    this.heap[key] = value;
  }

  heapDecreaseKey(i, key) {
    if (key > this.array[i]) {
      throw "new key is bigger than old key";
    }
    this.array[i] = key;
    while (i > 1 && this.array[this.parent(i)] > this.array[i]) {
      let temp = this.array[i];
      this.array[i] = this.array[this.parent(i)];
      this.array[this.parent(i)] = temp;
      i = this.parent(i);
    }

  }

  minHeapify(i) {
    const left = this.left(i);
    const right = this.right(i);
    let smallest;
    if (left <= this.heapsize && this.array[left] < this.array[i]) {
      smallest = left;
    } else {
      smallest = i;
    }
    if (right <= this.heapsize && this.array[right] < this.array[smallest]) {
      smallest = right;
    }
    if (smallest !== i) {
      let temp = this.array[i];
      this.array[i] = this.array[smallest];
      this.array[smallest] = temp;
      this.minHeapify(smallest);
    }
  }

  left(i) {
    return (2*i);
  }

  right(i) {
    return (2*i + 1);
  }

  parent(i) {
    return Math.floor(i/2);
  }
}

export default MinHeap;
