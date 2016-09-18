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
	  canvas.style.backgroundColor = "rgba(0,0,0,1)";
	
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
	        if (location[0] + dx > 0 && location[0] + dx < HEIGHT && location[1] + dy > 0 && location[1] + dy < WIDTH && this.maze[[location[0] + dx, location[1] + dy]] === undefined && (this.maze[[location[0] + 2 * dx, location[1] + 2 * dy]] === "WALL" || this.maze[[location[0] + 2 * dx, location[1] + 2 * dy]] === undefined)) {
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
	      var queue = new _queue2.default();
	      this.addToMaze(start);
	      this.maze[start] = "PASSAGE";
	      var neigh = this.neighbors(start);
	      var that = this;
	      neigh.forEach(function (neighbor) {
	        queue.heapInsert(neighbor.weight, neighbor);
	        that.addToQueue(neighbor.target);
	      });
	      var current = void 0;
	      var count = 0;
	      // while (queue.heapsize > 0 && count < 2000) {
	      var animate = window.setInterval(function () {
	        if (queue.heapsize === 0) {
	          clearTimeout(animate);
	        }
	        current = queue.extractMin();
	        if (this.maze[current.opposite] === "PASSAGE" || this.justNeighbors(current.target)["passages"] >= 2 || this.justNeighbors(current.target)["walls"] >= 2) {
	          this.maze[current.target] = "WALL";
	          this.makeWall(current.target);
	        } else {
	          this.maze[current.target] = "PASSAGE";
	          this.addToMaze(current.target);
	          neigh = this.neighbors(current.target);
	          // that = this;
	          neigh.forEach(function (neighbor) {
	            queue.heapInsert(neighbor.weight, neighbor);
	            that.addToQueue(neighbor.target);
	          });
	        }
	      }.bind(this), 1);
	      count++;
	      // }
	    }
	  }, {
	    key: "addToMaze",
	    value: function addToMaze(location) {
	      this.ctx.fillStyle = "#FFFFFF";
	      this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "addToQueue",
	    value: function addToQueue(location) {
	      this.ctx.fillStyle = "#7BE0AD";
	      this.ctx.fillRect(location[0], location[1], 10, 10);
	    }
	  }, {
	    key: "makeWall",
	    value: function makeWall(location) {
	      this.ctx.fillStyle = "#000000";
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
	      var passage = 0;
	      var wall = 0;
	      for (var j = 0; j < neighbors.length; j++) {
	        if (this.maze[neighbors[j]] === "PASSAGE") {
	          passage++;
	        } else if (this.maze[neighbors[j]] === "WALL") {
	          wall++;
	        }
	      }
	      var counts = {};
	      counts["passages"] = passage;
	      counts["walls"] = wall;
	
	      return counts;
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