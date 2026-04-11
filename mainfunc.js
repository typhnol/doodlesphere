const papers = document.querySelectorAll('rect');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

for (let paper in papers){
    console.log(paper);
    papers[paper].innerHTML = ``;
}

const map = document.getElementById('mapsvg');
const panzoom = Panzoom(map, {
    zoomSpeed: 0.1,
    panOnlyWhenZoomed: false,
    contain: 'outside',
    cursor: 'default',
    maxScale: 30,
    minScale: 1
});

var rects = map.querySelectorAll('rect');

for (var i = 0; i < rects.length-2; i++) {
    var rect = rects[i];
    var rectX = rect.getAttribute('x');
    var rectY = rect.getAttribute('y');
    var rectWidth = rect.getAttribute('width');

    var x = parseFloat(rectX);
    var y = parseFloat(rectY);
    var w = parseFloat(rectWidth);

    var centerX = x + w / 2;

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', centerX);
    line.setAttribute('y1', y);
    line.setAttribute('x2', centerX);
    line.setAttribute('y2', 0);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('fill', 'url(#fade)');

    map.prepend(line);
}

const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

zoomInBtn.addEventListener('click', panzoom.zoomIn);
zoomOutBtn.addEventListener('click', panzoom.zoomOut);
map.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);

panzoom.zoom(1);
panzoom.pan(500, 500);

document.getElementById('mapsvg').onclick = function(e) {
    var rect = e.target.getBoundingClientRect();
    var x = Math.round(e.clientX - rect.left);
    var y = Math.round(e.clientY - rect.top);
    console.log('x="' + x + '" y="' + y + '"');
}