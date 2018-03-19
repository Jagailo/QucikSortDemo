var arrayIndex = 0;
var timer;

function setTimer(newTimer) {
    timer = newTimer;
}

function turnOffTimer(resetIndex) {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    if (resetIndex) {
        arrayIndex = 0;
    }
}

function drawArray(array, canvasId) {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var width = canvas.offsetWidth;
        ctx.canvas.width = width;
        var height = 300;
        ctx.canvas.height = height; 

        var min = Math.min.apply(null, array[arrayIndex]);
        if (min < 0) {
            for (var i = 0; i < array[arrayIndex].length; i++) {
                array[arrayIndex][i] += Math.abs(min) + 1;
            }
            min = Math.min.apply(null, array[arrayIndex]);
        } else if (min == 0) {
            for (var i = 0; i < array[arrayIndex].length; i++) {
                array[arrayIndex][i]++;
            }
        }

        var widthPerColumn = width / array[arrayIndex].length;
        var columnWidth = Math.round(widthPerColumn / 1.5);
        if (columnWidth < 1) {
            columnWidth = 1;
        }

        var spacingWidth = Math.floor((widthPerColumn - columnWidth) / 2);
        if (spacingWidth < 0) {
            spacingWidth = 0;
        }

        ctx.canvas.width = columnWidth * array[arrayIndex].length + spacingWidth * 2 * array[arrayIndex].length + 1;

        var max = Math.max.apply(null, array[arrayIndex]);
        for (var i = 0, x = spacingWidth; i < array[arrayIndex].length; i++, x += columnWidth + spacingWidth * 2) {
            var columnHeightPercents = array[arrayIndex][i] * 100 / max;
            var columnHeightPixels = Math.round(columnHeightPercents * height / 100);
            if (columnHeightPixels < 1) {
                columnHeightPixels = 1;
            }

            //drawDefaultColumn(ctx, x, height - columnHeightPixels, columnWidth, columnHeightPixels);
            drawSingleColoredColumn(ctx, x, height - columnHeightPixels, columnWidth, columnHeightPixels, '#262626');
        }

        if (arrayIndex < array.length - 1) {
            arrayIndex++;
        } else {
            turnOffTimer(true);
        }
    }
}

function drawDefaultColumn(ctx, x, y, width, height) {
    if (height <= width) {
        ctx.fillStyle='#262626';
        ctx.fillRect(x, y, width, height);
    } else {
        ctx.fillStyle='#DBDBDB';
        ctx.fillRect(x, y + width, width, height - width);

        ctx.fillStyle='#262626';
        ctx.fillRect(x, y, width, width);
    }
}

function drawSingleColoredColumn(ctx, x, y, width, height, color) {
    ctx.fillStyle=color;
    ctx.fillRect(x, y, width, height);
}