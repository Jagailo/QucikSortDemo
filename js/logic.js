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

function addLoop(array, first, second, left, right, pivot) {
    sortHistory.push([JSON.parse(JSON.stringify(array)), first, second, left, right, pivot]);
}

function startAnimation(sliderId, count) {
    var slider = document.getElementById(sliderId);
    var ms = 1;

    if (slider.value != 0) {
        ms = slider.value;
    } else {
        if (count > 0 && count < 50) {
            ms = 150;
        } else if (count >= 50 && count < 200) {
            ms = 100;
        } else if (count >= 200 && count < 600) {
            ms = 65;
        } else if (count >= 600 && count < 1000) {
            ms = 50;
        } else if (count >= 1000 && count < 3000) {
            ms = 20;
        } else if (count >= 3000) {
            ms = 1;
        }
    }

    return setInterval(drawArray, ms, JSON.parse(JSON.stringify(sortHistory)), 'canvas', false);
}

function drawFinalLoop() {
    var array = [[sortHistory[sortHistory.length - 1][0], 0, 0, 0, 0, 0]];
    drawArray(JSON.parse(JSON.stringify(array)), 'canvas', true);
}

function clearHistory() {
    sortHistory = [];
}