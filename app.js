

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidthBar = document.getElementById("line_width");
const color = document.getElementById('color');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidthBar.value;
let isPainting = false; //마우스의 현재 상태

function onMove(event){
    //마우스가 클릭 된 상태라면 브러시의 움직임을 따라 라인을 그린다 <-> false라면 브러시 위치만 움직인다
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return; //함수 종료
    }
    ctx.beginPath(); //새로운 선이 시작하면 새로운 path로 그리게 해야 이전의 내용이 겹쳐지지 않음
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true; //마우스가 클릭 된 상태 
}

function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){

    ctx.lineWidth = event.target.value;
    //console.log(event.target.value);
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    console.log(event.target.value);
}
canvas.addEventListener("mousemove", onMove); //마우스가 움직일 때 마다 선이 생겨남 
canvas.addEventListener("mousedown", startPainting); 
canvas.addEventListener("mouseup", cancelPainting); 
canvas.addEventListener("mouseleave", cancelPainting); //마우스가 그림판 밖으로 나가면 마우스다운 해제
lineWidthBar.addEventListener("change", onLineWidthChange); //브러시 굵기 변경
color.addEventListener("change", onColorChange); //컬러변경