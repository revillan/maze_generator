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
  if (document.cookie === "") {
    document.cookie = `seen=true;expires=${today};path=/`;
    document.getElementById("onLoad").click();
  }
  let canvas = document.getElementById("maze-canvas");
  let ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = "rgba(0,0,0,1)";

  function makeMaze(e) {
    e.target.removeEventListener(e.type, makeMaze);
    let rect = canvas.getBoundingClientRect();
    let start = [floor10(event.clientX) - rect.left,
                  floor10(event.clientY) - rect.top];
    let maze = new Prims(ctx);
    maze.procedure(start);
  }

  canvas.addEventListener("click", makeMaze);
});
