var arrayIndex = 0;
var timer;

function setTimer(newTimer) {
    timer = newTimer;
}

function drawArray(array, canvasId, realWidth) {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var width = realWidth - 120;
        ctx.canvas.width = width;
        var height = 200;
        ctx.canvas.height = height; 

        var min = Math.min.apply(null, array[arrayIndex][0]);
        if (min < 0) {
            for (var i = 0; i < array[arrayIndex][0].length; i++) {
                array[arrayIndex][0][i] += Math.abs(min) + 1;
            }
            min = Math.min.apply(null, array[arrayIndex][0]);
        } else if (min == 0) {
            for (var i = 0; i < array[arrayIndex][0].length; i++) {
                array[arrayIndex][0][i]++;
            }
        }

        var widthPerColumn = width / array[arrayIndex][0].length;
        var columnWidth = Math.round(widthPerColumn / 1.5);
        if (columnWidth < 1) {
            columnWidth = 1;
        }

        var spacingWidth = Math.floor((widthPerColumn - columnWidth) / 2);
        if (spacingWidth < 0) {
            spacingWidth = 0;
        }

        ctx.canvas.width = columnWidth * array[arrayIndex][0].length + spacingWidth * 2 * array[arrayIndex][0].length + 1;

        var max = Math.max.apply(null, array[arrayIndex][0]);
        for (var i = 0, x = spacingWidth; i < array[arrayIndex][0].length; i++, x += columnWidth + spacingWidth * 2) {
            var columnHeightPercents = array[arrayIndex][0][i] * 100 / max;
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
            arrayIndex = 0;
            clearInterval(timer);
            clearHistory();
        }
    }
}

function drawDefaultColumn(ctx, x, y, width, height) {
    if (height <= width) {
        ctx.fillStyle='#000000';
        ctx.fillRect(x, y, width, height);
    } else {
        ctx.fillStyle='#C8C8C8';
        ctx.fillRect(x, y + width, width, height - width);

        ctx.fillStyle='#000000';
        ctx.fillRect(x, y, width, width);
    }
}

function drawSingleColoredColumn(ctx, x, y, width, height, color) {
    ctx.fillStyle=color;
    ctx.fillRect(x, y, width, height);
}