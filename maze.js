import Prims from './prims';
import jquery from "jquery";

const floor10 = function (n) {
  return (Math.floor(n / 10) * 10);
};

document.addEventListener("DOMContentLoaded", function() {

  Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
  };

  let today = new Date();
  today.addHours(1);
  let UTCstring = today.toUTCString();
  if (!document.cookie.includes("seen=true")) {
    document.cookie = `seen=true; expires=${UTCstring}`;
    document.getElementById("onLoad").click();
  }

  let canvas = document.getElementById("maze-canvas");
  let ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  // function startMaze(start) {
    let maze = new Prims(ctx);
    // maze.procedure(start);
  // }

  function makeMaze(e) {
    e.target.removeEventListener(e.type, makeMaze);
    randStartButton.removeEventListener("click", randStart);
    let rect = canvas.getBoundingClientRect();
    let start = [floor10(e.clientX) - rect.left - 10,
                  floor10(e.clientY) - rect.top - 10];
    // startMaze(start);
    maze.procedure(start);
  }

  function randStart(e) {
    let x;
    x = floor10(Math.random()*610);
    let y = floor10(Math.random()*810);
    let start = [x,y];
    canvas.removeEventListener("click", makeMaze);
    e.target.removeEventListener(e.type, randStart);
    // startMaze(start);
    maze.procedure(start);

  }

  function resetMaze(e) {
    ctx.fillStyle = "#000000";
    let rect = canvas.getBoundingClientRect();

    ctx.fillRect(0,
                  0, 810,810 );
    randStartButton.addEventListener("click", randStart);
    canvas.addEventListener("click", makeMaze);
    maze.reset();
    randStartButton.addEventListener("click", randStart);
  }

  let randStartButton = document.getElementById("randStart");
  let mazeReset = document.getElementById("resetMaze");
  mazeReset.addEventListener("click", resetMaze);
  randStartButton.addEventListener("click", randStart);
  canvas.addEventListener("click", makeMaze);
});
