'use strict'

var gElCanvas = document.getElementById('meme-canvas');
var gTextInput = document.getElementById('text-input');
var gStrokeColorInput = document.getElementById("stoke-color-input");
var gFillColorInput = document.getElementById("fill-color-input");
var gCtx = gElCanvas.getContext('2d');
var gImgs = [];
var gImgKeywords = [
    ['Trump', 'Tie', 'Angry', 'Finger', 'Political'],
    ['Dog', 'Cute', 'Happy', 'Pet'],
    ['Baby', 'Dog', 'Cute', 'Sleep', 'Pet', 'Relaxed'],
    ['Cat', 'Tierd', 'Mac', 'Laptop', 'Pet'],
    ['Angry', 'Green', 'Baby', 'Sea', 'Sand'],
    ['Hair', 'Science', 'Alien', 'Explain'],
    ['Baby', 'Suprise', 'Cute', 'Shocked', 'Eyes'],
    ['Listen', 'Tie', 'Colorful'],
    ['Baby', 'Evil', 'Cute', 'River', 'Happy', 'Grass'],
    ['Smile', 'Obama', 'Political', 'Happy'],
    ['Men', 'Kiss', 'Sport'],
    ['Saint', 'Finger', 'Point'],
    ['Drink', 'Cheers', 'Martini', 'Smile', 'Movie'],
    ['Sunglass', 'Metrix', 'Movie'],
    ['Rings', 'Lord', 'Movie', 'Statement'],
    ['Happy', 'Star', 'Movie', 'Evil'],
    ['Putin', 'Two', 'Political', 'Russia'],
    ['Toy', 'Movie', 'Explain', 'Animated'],
    ['Toy', 'Movie', 'Explain', 'Animated'],
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        { txt: 'line 1', y: 50, fontSize: '40px', textAlign: 'center', textColor: '#ffffff', strokeColor: '#000000', font: 'Impact' },
        { txt: 'line 2', y: 350, fontSize: '40px', textAlign: 'center', textColor: '#ffffff', strokeColor: '#000000', font: 'Impact' }
    ]
}

function loadImages() {
    gImgs = [];
    for (var i = 1; i <= gImgKeywords.length; i++) {
        var url = `meme-imgs (square)/${i}.jpg`;
        gImgs.push(
            { id: (i - 1), url: url, keywords: gImgKeywords[i - 1] },
        )
    }

}

function resetState(imgId) {
    gMeme.selectedLineIdx = 0;
    gMeme.lines = [
        { txt: 'line 1', y: 50, fontSize: '40px', textAlign: 'center', textColor: '#ffffff', strokeColor: '#000000', font: 'Impact' },
        { txt: 'line 2', y: 350, fontSize: '40px', textAlign: 'center', textColor: '#ffffff', strokeColor: '#000000', font: 'Impact' }
    ]
    gStrokeColorInput.value = gMeme.lines[0].strokeColor;
    gFillColorInput.value = gMeme.lines[0].textColor;
    gMeme.selectedImgId = imgId;
}

function renderCanvas(isExported) {
    var elImg = new Image();
    var img = gImgs[gMeme.selectedImgId];
    elImg.src = img.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

        for (var i = 0; i < gMeme.lines.length; i++) {
            if (gMeme.lines[i].txt !== '') {
                var isFocus = !isExported && (i === gMeme.selectedLineIdx)
                drawText(
                    gMeme.lines[i], isFocus);
            }
        }
    }
}

function removeLine() {
    var lineIdx = gMeme.selectedLineIdx;
    gMeme.lines.splice(lineIdx, 1);
    gMeme.selectedLineIdx = 0;
    renderCanvas();
}

function changeTextAlign(direction) {
    var lineIdx = gMeme.selectedLineIdx;
    var line = gMeme.lines[lineIdx];
    line.textAlign = direction;
    renderCanvas();
}

function addLine() {
    var newLine = { txt: 'new line', y: 200, fontSize: '40px', textAlign: 'center', textColor: '#ffffff', strokeColor: '#000000', font: 'Impact' };
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gTextInput.value = newLine.txt;
    renderCanvas();
}

function drawText(line, isFocus) {
    gCtx.maxWidth = '400px';
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.textColor;
    gCtx.font = `${line.fontSize} ${line.font}`;
    gCtx.textAlign = line.textAlign;
    // if(isFocus) {
    //     gCtx.font = `bold  ${gCtx.font}`;
    // }
    var x = line.textAlign == 'center' ? 200 : line.textAlign == 'left' ? 0 : 400;
    gCtx.fillText(line.txt, x, line.y);
    gCtx.strokeText(line.txt, x, line.y);
}

function changeText(element) {
    var inputText = element;
    getCurrentLine().txt = inputText.value;
    renderCanvas();
}

function moveDownText() {
    var line = getCurrentLine();
    line.y++;
    renderCanvas();
}

function moveUpText() {
    var line = getCurrentLine();
    line.y--;
    renderCanvas();
}

function changeImg(imgId) {
    resetState(imgId);
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.about').style.display = 'none';
    renderCanvas()
}

function getCurrentLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function increaseFontSize() {
    var line = getCurrentLine();
    var fontArgs = line.fontSize.split('px');
    line.fontSize = +fontArgs[0] + 1 + 'px';
    renderCanvas()
}

function decreaseFontSize() {
    var line = getCurrentLine();
    var fontArgs = line.fontSize.split('px');
    var currentSize = +fontArgs[0];
    if (currentSize === 25) return;
    line.fontSize = currentSize - 1 + 'px';
    renderCanvas()
}

function updateInputText() {
    var text = gMeme.lines[gMeme.selectedLineIdx].txt
    if (text && text.length > 0) {
        gTextInput.value = text;
    }
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    updateInputText();
    renderCanvas();
}

function renderGallery() {
    var galleryContainerEl = document.querySelector('.gallery');
    for (var i = 0; i < gImgs.length - 1; i++) {
        var img = gImgs[i];
        galleryContainerEl.innerHTML += `<img onclick = changeImg(${img.id}) title="${img.keywords.join(', ')}" src="${img.url}">`
    }
}

function changeFont(fontSelect) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontSelect.value;
    renderCanvas();
}


function changeStrokeColor(colorSelect) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = colorSelect.value;
    renderCanvas();
}

function changeFillColor(colorSelect) {
    gMeme.lines[gMeme.selectedLineIdx].textColor = colorSelect.value;
    renderCanvas();
}


function searchKeyWords(element){
var inputText = element;
console.log(inputText.value);
// gImgs.sort()
}