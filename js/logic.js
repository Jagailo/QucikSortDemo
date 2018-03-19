var sortHistory = [];

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getConverArray(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = +array[i];
    }
    return array;
}

function printArray(array, TagID) {
    var str = '';
    for (var i = 0; i < array.length; i++) {
        str += '<span class="array-elem-cell">' + array[i] + '</span>';
    }
    document.getElementById(TagID).innerHTML = str;
}

function getWidthWithoutCanvas() {
    var canvas = document.getElementById('canvas');
    var sourceArray = document.getElementById('sourceArray');
    var currentArray = document.getElementById('currentArray');

    canvas.style.display = 'none';
    sourceArray.style.display = 'none';
    currentArray.style.display = 'none';
    var width = document.getElementById('content').offsetWidth;
    canvas.style.display = 'block';
    sourceArray.style.display = 'block';
    currentArray.style.display = 'block';

    return width;
}

function addLoop(array) {
    sortHistory.push(JSON.parse(JSON.stringify(array)));
}

function startAnimation(ms) {
    var wwc = getWidthWithoutCanvas();
    return setInterval(drawArray, ms, JSON.parse(JSON.stringify(sortHistory)), 'canvas', wwc);
}

function clearHistory() {
    sortHistory.length = 0
}