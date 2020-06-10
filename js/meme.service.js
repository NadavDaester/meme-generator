'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }


var gX = 200;
var gY = 50;
var gElCanvas = document.getElementById('meme-canvas');
var gCtx = gElCanvas.getContext('2d');
var gImgs = [
    { id: 1, url: 'meme-imgs (square)/2.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs (square)/3.jpg', keywords: ['happy'] }
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I never eat Falafel' },
        { txt: 'I eat Falafel' }
    ]
}


function drawImg() {
    var elImg = new Image();
    elImg.src = gImgs[0].url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        if (gMeme.lines[0].txt !== '') {
            drawText(gMeme.lines[0].txt, gX, gY);
        }
    }

}



function drawText(txt, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(txt, gX, gY);
    gCtx.strokeText(txt, gX, gY);
}

function onAddText() {
    var inputText = document.querySelector('.text-input');
    gMeme.lines[0].txt = inputText.value;
    drawImg()
    inputText.value = '';
}
function onDownText() {
    gY++
    gCtx.fillText(gMeme.lines[0].txt, gX, gY);
    gCtx.strokeText(gMeme.lines[0].txt, gX, gY);
}
function onUpText() {
    gY--
    gCtx.fillText(gMeme.lines[0].txt, gX, gY);
    gCtx.strokeText(gMeme.lines[0].txt, gX, gY);
}

function onChangeImg(elImg) {
    var imgSrc = elImg.src
    gImgs[0].url = imgSrc
    drawImg()
}


function onIncreaseFont() {

    var txt = gMeme.lines[0].txt
    var fontArgs = gCtx.font.split('px');
    var size = +fontArgs[0];
    var newSize = size + 1 + 'px';
    gCtx.font = newSize + ' Impact';
    gCtx.fillText(txt, gX, gY);
    gCtx.strokeText(txt, gX, gY);


}
function onDecreaseFont() {
    var txt = gMeme.lines[0].txt
    var fontArgs = gCtx.font.split('px');
    var size = +fontArgs[0];
    if (size === 25) return;
    var newSize = size - 1 + 'px';
    gCtx.font = newSize + ' Impact';
    gCtx.fillText(txt, gX, gY);
    gCtx.strokeText(txt, gX, gY);
}

// function updateCanvas(){
//     clearCanvas();
//     gCtx.drawImage(gCtx, 0, 0, gElCanvas.width, gElCanvas.height);
// }

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}