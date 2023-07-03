const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidthBar = document.getElementById("line_width");
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color_option'));
const modeBtn = document.getElementById('mode_btn');
const destroyBtn = document.getElementById('destroy_btn');
const eraserBtn = document.getElementById('eraser_btn');
const fileInput = document.getElementById('file');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidthBar.value;
let isPainting = false; //마우스의 현재 상태
let isMode = false; //선-채우기 모드
let isDestroy = false; //초기화 상태 
 

function onMove(event){
    //마우스가 클릭 된 상태라면 브러시의 움직임을 따라 라인을 그린다 <-> false라면 브러시 위치만 움직인다
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
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
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

//그리기,채우기 버튼
function onModeClick(event){
    if(isMode){
        const eraserValue = event.target.dataset.color;
        isMode = false;
        modeBtn.innerText = "Fill";
        eraserColor = eraserValue;
    }else{
        isMode = true;
        modeBtn.innerText = "Draw";
    }
}

//캔버스 채우기 Fill
let filledColor = "white"; //기본 지우개 컬러 
function onCanvasClick(){
    if(isMode){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        filledColor = ctx.fillStyle;
    }
};

//캔버스 초기화
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.strokeStyle = "white";
    isDestroy = true;
}

//지우개
function onEraserClick(){
    if(isDestroy){ //초기화 했을 땐 지우개 컬러 화이트로 설정
        ctx.strokeStyle = "white";
    }else{
        ctx.strokeStyle = filledColor; //초기화 하지 않았을 땐 캔버스에 채웠던 색으로 지정
    }
    isMode = false; //채우기 모드 off

    
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file); //브라우저를 위한 URL (현실의 인터넷에선 존재하지 않음)
    console.log(url);
    const image = new Image()
    image.src = url; // image.src == HTML에서 <img src""/> 라고 쓰는 것과 동일
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

canvas.addEventListener("mousemove", onMove); //마우스가 움직일 때 마다 선이 생겨남 
canvas.addEventListener("mousedown", startPainting); 
canvas.addEventListener("mouseup", cancelPainting); 
canvas.addEventListener("mouseleave", cancelPainting); //마우스가 그림판 밖으로 나가면 마우스다운 해제
canvas.addEventListener("click", onCanvasClick); //캔버스 채우기

lineWidthBar.addEventListener("change", onLineWidthChange); //브러시 굵기 변경
color.addEventListener("change", onColorChange); //컬러변경
colorOptions.forEach(color => color.addEventListener("click", onColorClick)); //각 컬러를 클릭할 때 마다 호출되는 함수
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);