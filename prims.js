// prims algo implementation
import MinHeap from './queue';

const DIRECTIONS = [
  [0, -1], // N
  [0, 1], // S
  [1, 0], // E
  [-1, 0] // W
];

const DIR_NAMES = {
  0: "N",
  1: "S",
  2: "E",
  3: "W"
};

const WIDTH = 800;

const HEIGHT = 600;

class Prims {
  constructor(start, ctx) {
    this.maze = {};
    this.ctx = ctx;
  }

  neighbors(location){
    let neighbors = [];
    let dx, dy;
    for (let i = 0; i < 4; i++) {
      dx = DIRECTIONS[i][0];
      dy = DIRECTIONS[i][1];
      if (location[0] + dx > 0 &&
        location[0] + dx < HEIGHT &&
        location[1] + dy > 0 &&
        location[1] + dy < WIDTH) {
          neighbors.push( [(location[0] + dx), (location[1] + dy)] );
        }
    }
    return neighbors;
  }

  procedure(start) {
    this.addToMaze(start);
    let queue = new MinHeap;
    let rand;
    this.neighbors(start).forEach(neighbor => {
      // rand = Math.random();2
      // queue.heapInsert(rand, {weight: rand, location: neighbor, direction: })
      // add neighbor to queue
    });
    let min;
    while (queue.heapsize > 0) {
      min = queue.extractMin();
      this.neighbors(min).forEach(neighbor => {
        // check if neighbor in maze
      });
      // if neighbors not in maze (except one)
        // add min to maze
        // add neighbors to queue
    }
  }

  addToMaze(location) {
    this.maze[location] = true;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }



}
