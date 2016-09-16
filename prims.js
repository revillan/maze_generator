// prims algo implementation
import MinHeap from './queue';

const DIRECTIONS = [
  [0, -10], // N
  [0, 10], // S
  [10, 0], // E
  [-10, 0] // W
];

const DIR_NAMES = {
  0: "N",
  1: "S",
  2: "E",
  3: "W"
};

const WIDTH = 600;

const HEIGHT = 800;

class Prims {
  constructor(start, ctx) {
    this.maze = {};
    this.ctx = ctx;
    this.procedure(start);
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
        location[1] + dy < WIDTH &&
        this.maze[(location[0] + dx), (location[1] + dy)] === undefined &&
        (this.maze[(location[0] + 2*dx), (location[1] + 2*dy)] === "WALL" ||
          this.maze[(location[0] + 2*dx), (location[1] + 2*dy)] === undefined
        )
            ){
          neighbors.push( {
            source: location,
            target: [(location[0] + dx), (location[1] + dy)],
            opposite: [(location[0] + 2*dx), (location[1] + 2*dy)],
            weight: Math.random()
          });
          // console.log([(location[0] + dx), (location[1] + dy)]);
        }
    }
    // console.log(neighbors.length);
    return neighbors;
  }

  procedure(start) {
    let queue = new MinHeap;
    this.addToMaze(start);
    let neigh = this.neighbors(start);
    neigh.forEach(neighbor => (
      queue.heapInsert(neighbor.weight, neighbor)
    ));
    let current;
    let count = 0;
    while (queue.heapsize > 0 && count < 20000) {
      // debugger
      current = queue.extractMin();
      // if (this.maze[current.opposite] === "PASSAGE") {
      //   this.maze[current.target] = "WALL";
      // } else {
      if (this.maze[current.target] !== undefined) {
        this.makeInvisible(current.target);
        continue;
      }
        if (this.justNeighbors(current.target)) {
          this.addToMaze(current.target);
          // console.log(current.target);
          neigh = this.neighbors(current.target);
          // console.log(neigh);
          let that = this;
          neigh.forEach(neighbor => {
            queue.heapInsert(neighbor.weight, neighbor);
            that.addToQueue(neighbor.target);
          });
        } else {
          // if (this.maze[current.target] !== undefined) {
            this.makeWall(current.target);
          // }
        }
      // }
      count++;
    }
    console.log(queue.heapsize);


    // this.addToMaze(start);
    // let queue = new MinHeap;
    // let rand;
    // this.neighbors(start).forEach(neighbor => {
    //   rand = Math.random();
    //   queue.heapInsert(rand, {weight: rand, location: neighbor});
    //   // add neighbor to queue
    // });
    // console.log(queue.heapsize);
    // let min;
    // let neigh;
    // min = queue.extractMin();
    // neigh = this.neighbors(min.location);

  }
    // let min;
    // let neighCount;
    // let inn = [];
    // while (queue.heapsize > 0) {
    //   min = queue.extractMin();
    //   // this.addToMaze(min.location);
    //   // console.log(min.location);
    //   neighCount = 0;
    //   this.neighbors(min.location).forEach(neighbor => {
    //     // check if neighbor in maze
    //     if (this.maze[neighbor] === undefined) {
    //       // console.log(neighbor);
    //       rand = Math.random();
    //       queue.heapInsert(rand, {weight: rand, location: neighbor});
    //     } else if (this.maze[neighbor] === 4) {
    //       neighCount++;
    //     }
    //   });
    //   // if neighbors not in maze (except one)
    //     // add min to maze
    //     // add neighbors to queue
    //   // if (neighCount === 0 || neighCount > 2){
    //     // console.log(neighCount);
    //     this.maze[min.location] = true;
    //     inn.push(min.location);
    //     // window.setTimeout(() => {this.addToMaze(min.location)}, 10);
    //   // } else {
    //   //   console.log(neighCount);
    //   //   this.maze[location] = 4;
    //   // }
    // }
    // console.log(inn);
    // for (var i = 0; i < inn.length; i++) {
    //   console.log(inn[i]);
    //   window.setTimeout((i) => {this.addToMaze(inn[i])}, 10);
    // }
  // }

  addToMaze(location) {
    this.maze[location] = "PASSAGE";
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  addToQueue(location) {
    // this.ctx.fillStyle = "pink";
    // this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  makeWall(location){
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  makeInvisible(location) {
    this.ctx.fillStyle = "transparent";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  justNeighbors(location) {
    let neighbors = [];
    let dx, dy;
    for (let i = 0; i < 4; i++) {
      dx = DIRECTIONS[i][0];
      dy = DIRECTIONS[i][1];
      if (location[0] + dx > 0 &&
        location[0] + dx < HEIGHT &&
        location[1] + dy > 0 &&
        location[1] + dy < WIDTH)  {

          neighbors.push( [(location[0] + dx), (location[1] + dy)] );
        }

    }
    let count = 0;
    for (var j = 0; j < neighbors.length; j++) {
      if (this.maze[neighbors[j]] === "PASSAGE") {
        count++;
      }
    }
    return (count <= 1);
  }



}

export default Prims;
