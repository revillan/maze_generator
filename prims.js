import MinHeap from './queue';

const DIRECTIONS = [
  [0, -10],
  [0, 10],
  [10, 0],
  [-10, 0]
];

const WIDTH = 600;

const HEIGHT = 800;

class Prims {
  constructor(ctx) {
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
        location[1] + dy < WIDTH &&
        this.maze[[(location[0] + dx), (location[1] + dy)]] === undefined &&
        (
          this.maze[[(location[0] + 2*dx), (location[1] + 2*dy)]] === "WALL" ||
          this.maze[[(location[0] + 2*dx), (location[1] + 2*dy)]] === undefined
        )
            ){
          neighbors.push( {
            source: location,
            target: [(location[0] + dx), (location[1] + dy)],
            opposite: [(location[0] + 2*dx), (location[1] + 2*dy)],
            weight: Math.random()
          });
        }
    }

    return neighbors;
  }

  procedure(start) {
    let queue = new MinHeap;
    this.addToMaze(start);
    this.maze[start] = "PASSAGE";
    let neigh = this.neighbors(start);
    let that = this;
    neigh.forEach(neighbor => {
      queue.heapInsert(neighbor.weight, neighbor);
      that.addToQueue(neighbor.target);
    });
    let current;
    this.animate = window.setInterval( function() {
      if (queue.heapsize === 1) {
        clearTimeout(this.animate);
      }
      current = queue.extractMin();
      if ( this.maze[current.opposite] === "PASSAGE" ||
            this.justNeighbors(current.target)["passages"] >= 2 ||
            this.justNeighbors(current.target)["walls"] >= 2  ) {
        this.maze[current.target] = "WALL";
        this.makeWall(current.target);
      } else {
        this.maze[current.target] = "PASSAGE";
        this.addToMaze(current.target);
        neigh = this.neighbors(current.target);

        neigh.forEach(neighbor => {
          queue.heapInsert(neighbor.weight, neighbor);
          that.addToQueue(neighbor.target);
        });

      }
    }.bind(this) , 1);
  }

  reset() {
    clearTimeout(this.animate);
    this.maze = {};
  }


  addToMaze(location) {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  addToQueue(location) {
    this.ctx.fillStyle = "#7BE0AD";
    this.ctx.fillRect(location[0], location[1], 10, 10);
  }

  makeWall(location){
    this.ctx.fillStyle = "#000000";
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
    let passage = 0;
    let wall = 0;
    for (var j = 0; j < neighbors.length; j++) {
      if (this.maze[  neighbors[j]  ] === "PASSAGE") {
        passage++;
      } else if ( this.maze[  neighbors[j]  ] === "WALL") {
        wall++;
      }
    }
    let counts = {};
    counts["passages"] = passage;
    counts["walls"] = wall;

    return counts;
  }

}

export default Prims;
