// render logic, entry file
import Prims from './prims';

const floor10 = function (n) {
  return (Math.floor(n / 10) * 10);
};

document.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("maze-canvas");
  let ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = "rgba(0,0,0,0)";

  canvas.addEventListener("click", function() {
    let rect = canvas.getBoundingClientRect();
    ctx.fillStyle = "green";
    ctx.fillRect(floor10(event.clientX) - rect.left,
                  floor10(event.clientY) - rect.top, 10 , 10);
    let maze = new Prims([floor10(event.clientX) - rect.left,
                    floor10(event.clientY) - rect.top], ctx);
  });
});
