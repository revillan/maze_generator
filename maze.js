// render logic, entry file
import Prims from './prims';
import jquery from "jquery";

const floor10 = function (n) {
  return (Math.floor(n / 10) * 10);
};

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("maze-canvas");
  let ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  function makeMaze(e) {
    e.target.removeEventListener(e.type, makeMaze);
    let rect = canvas.getBoundingClientRect();
    let start = [floor10(event.clientX) - rect.left,
                  floor10(event.clientY) - rect.top];
    let maze = new Prims(start, ctx);
    maze.procedure(start);
  }

  canvas.addEventListener("click", makeMaze);
});
