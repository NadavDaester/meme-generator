'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 }


var gElCanvas = document.getElementById('meme-canvas');
var gCtx = gElCanvas.getContext('2d');
var gImgs = [
    { id: 1, url: 'meme-imgs (square)/2.jpg', keywords: ['happy'] }
];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        { txt: 'I never eat Falafel' }
    ]
}


function drawImg() {
    var elImg = new Image();
    elImg.src = gImgs[0].url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
        if(gMeme.lines[0].txt !== ''){
            drawText(gMeme.lines[0].txt ,150,150);
        }
    }
}



function drawText(txt, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(txt, 200, 50);
    gCtx.strokeText(txt, 200, 50);
}

function onAddText() {
    var inputText = document.querySelector('.text-input');
    gMeme.lines[0].txt = inputText.value;
    drawImg()
    inputText.value = '';
}


function onChangeImg(elImg){
    var imgSrc = elImg.src
    console.log('before', imgSrc);
    gImgs[0].url = imgSrc
    console.log('afther', gMeme.lines[0].url);
    drawImg()
}