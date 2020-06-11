'use strict'

function init() {
    renderCanvas()
    renderGallery()
}

function toggleMenu(){ 
    document.body.classList.toggle('menu-open');
}

function backToGallery(){
    document.querySelector('.about').style.display = 'none';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'block';
}
function goToAbout(){
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('.gallery').style.display = 'none';
    document.querySelector('.about').style.display = 'block';
}
function downloadImg(elLink) {
    let isExported = true;
    renderCanvas(isExported);
    var imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}
