/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _prims = __webpack_require__(1);
	
	var _prims2 = _interopRequireDefault(_prims);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var floor10 = function floor10(n) {
	  return Math.floor(n / 10) * 10;
	}; // render logic, entry file
	
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("maze-canvas");
	  var ctx = canvas.getContext("2d");
	  canvas.style.backgroundColor = "rgba(0,0,0,0)";
	
	  canvas.addEventListener("click", function () {
	    var rect = canvas.getBoundingClientRect();
	    ctx.fillStyle = "green";
	    ctx.fillRect(floor10(event.clientX) - rect.left, floor10(event.clientY) - rect.top, 10, 10);
	    var maze = new _prims2.default([floor10(event.clientX) - rect.left, floor10(event.clientY) - rect.top], ctx);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // prims algo implementation
	
	
	var _queue = __webpack_require__(2);
	
	var _queue2 = _interopRequireDefault(_queue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DIRECTIONS = [[0, -10], // N
	[0, 10], // S
	[10, 0], // E
	[-10, 0] // W
	];
	
	var DIR_NAMES = {
	  0: "N",
	  1: "S",
	  2: "E",
	  3: "W"
	};
	
	var WIDTH = 600;
	
	var HEIGHT = 800;
	
	var Prims = function () {
	  function Prims(start, ctx) {
	    _classCallCheck(this, Prims);
	
	    this.maze = {};
	    this.ctx = ctx;
	    this.procedure(start);
	  }
	
	  _createClass(Prims, [{
	    key: "neighbors",
	    value: function neighbors(location) {
	      var neighbors = [];
	      var dx = void 0,
	          dy = void 0;
	      for (var i = 0; i < 4; i++) {
	        dx = DIRECTIONS[i][0];
	        dy = DIRECTIONS[i][1];
	        if (location[0] + dx > 0 && location[0] + dx < HEIGHT && location[1] + dy > 0 && location[1] + dy < WIDTH && this.maze[(location[0] + dx, location[1] + dy)] === undefined && (this.maze[(location[0] + 2 * dx, location[1] + 2 * dy)] === "WALL" || this.maze[(location[0] + 2 * dx, location[1] + 2 * dy)] === undefined)) {
	          neighbors.push({
	            source: location,
	            target: [location[0] + dx, location[1] + dy],
	            opposite: [location[0] + 2 * dx, location[1] + 2 * dy],
	            weight: Math.random()
	          });
	          // console.log([(location[0] + dx), (location[1] + dy)]);
	        }
	      }
	      // console.log(neighbors.length);
	      return neighbors;
	    }
	  }, {
	    key: "procedure",
	    value: function procedure(start) {
	      var _this = this;
	
	      var queue = new _queue2.default();
	      this.addToMaze(start);
	      var neigh = this.neighbors(start);
	      neigh.forEach(function (neighbor) {
	        return queue.heapInsert(neighbor.weight, neighbor);
	      });
	      var current = void 0;
	      var count = 0;
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
	          (function () {
	            _this.addToMaze(current.target);
	            // console.log(current.target);
	            neigh = _this.neighbors(current.target);
	            // console.log(neigh);
	            var that = _this;
	            neigh.forEach(function (neighbor) {
	              queue.heapInsert(neighbor.weight, neighbor);
	              that.addToQueue(neighbor.target);
	            });
	          })();
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
	
	  }, {
	    key: "addToMaze",
	    value: function addToMaze(location) {
	      this.maze[location] = "PASSAGE";
	      this.ctx.fillStyle = "white";
	      this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "addToQueue",
	    value: function addToQueue(location) {
	      // this.ctx.fillStyle = "pink";
	      // this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "makeWall",
	    value: function makeWall(location) {
	      this.ctx.fillStyle = "black";
	      this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "makeInvisible",
	    value: function makeInvisible(location) {
	      this.ctx.fillStyle = "transparent";
	      this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "justNeighbors",
	    value: function justNeighbors(location) {
	      var neighbors = [];
	      var dx = void 0,
	          dy = void 0;
	      for (var i = 0; i < 4; i++) {
	        dx = DIRECTIONS[i][0];
	        dy = DIRECTIONS[i][1];
	        if (location[0] + dx > 0 && location[0] + dx < HEIGHT && location[1] + dy > 0 && location[1] + dy < WIDTH) {
	
	          neighbors.push([location[0] + dx, location[1] + dy]);
	        }
	      }
	      var count = 0;
	      for (var j = 0; j < neighbors.length; j++) {
	        if (this.maze[neighbors[j]] === "PASSAGE") {
	          count++;
	        }
	      }
	      return count <= 1;
	    }
	  }]);
	
	  return Prims;
	}();
	
	exports.default = Prims;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// min-heap logic for edge cells
	
	var MinHeap = function () {
	  function MinHeap() {
	    _classCallCheck(this, MinHeap);
	
	    this.array = [null];
	    this.heapsize = 0;
	    this.heap = {};
	  }
	
	  _createClass(MinHeap, [{
	    key: "extractMin",
	    value: function extractMin() {
	      if (this.heapsize < 1) {
	        throw "heap is empty";
	      }
	      var min = this.array[1];
	      this.array[1] = this.array[this.heapsize];
	      this.heapsize--;
	      this.minHeapify(1);
	      return this.heap[min];
	    }
	  }, {
	    key: "heapInsert",
	    value: function heapInsert(key, value) {
	      this.heapsize++;
	      this.array[this.heapsize] = 25; //basically infinitely
	      this.heapDecreaseKey(this.heapsize, key);
	      this.heap[key] = value;
	    }
	  }, {
	    key: "heapDecreaseKey",
	    value: function heapDecreaseKey(i, key) {
	      if (key > this.array[i]) {
	        throw "new key is bigger than old key";
	      }
	      this.array[i] = key;
	      while (i > 1 && this.array[this.parent(i)] > this.array[i]) {
	        var temp = this.array[i];
	        this.array[i] = this.array[this.parent(i)];
	        this.array[this.parent(i)] = temp;
	        i = this.parent(i);
	      }
	    }
	  }, {
	    key: "minHeapify",
	    value: function minHeapify(i) {
	      var left = this.left(i);
	      var right = this.right(i);
	      var smallest = void 0;
	      if (left <= this.heapsize && this.array[left] < this.array[i]) {
	        smallest = left;
	      } else {
	        smallest = i;
	      }
	      if (right <= this.heapsize && this.array[right] < this.array[smallest]) {
	        smallest = right;
	      }
	      if (smallest !== i) {
	        var temp = this.array[i];
	        this.array[i] = this.array[smallest];
	        this.array[smallest] = temp;
	        this.minHeapify(smallest);
	      }
	    }
	  }, {
	    key: "left",
	    value: function left(i) {
	      return 2 * i;
	    }
	  }, {
	    key: "right",
	    value: function right(i) {
	      return 2 * i + 1;
	    }
	  }, {
	    key: "parent",
	    value: function parent(i) {
	      return Math.floor(i / 2);
	    }
	  }]);
	
	  return MinHeap;
	}();
	
	exports.default = MinHeap;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map