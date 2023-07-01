const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// leftTop => 0,0
//ctx.beginPath()
//setTimeout(()=>{ctx.fill();},5000)

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff",
  ];

ctx.lineWidth = 2;
let x_coord = 0;
let y_coord = 0;

function onMove(event) {
    console.log(event);
    ctx.beginPath();
    ctx.moveTo(x_coord, y_coord);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

function onCursorMoveClick(event) {
    x_coord = event.offsetX; //마지막으로 찍힌 마우스 x좌표 값
    y_coord = event.offsetY;
    console.log(event);
    ctx.beginPath();
    ctx.arc(x_coord, y_coord, 5, 0, 2*Math.PI);
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
    //ctx.lineTo(event.offsetX, event.offsetY);
    //ctx.stroke();
}
canvas.addEventListener("mousemove", onMove); //마우스가 움직일 때 마다 선이 생겨남 
canvas.addEventListener("click", onCursorMoveClick); //마우스가 움직인 마지막 시점 부터 선이 이어짐
