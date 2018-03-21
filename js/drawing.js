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

function drawArray(array, canvasId, columnOnly) {
    var canvas = document.getElementById(canvasId);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var width = canvas.offsetWidth;
        ctx.canvas.width = width;
        var height = 300;
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

            var color = '#262626';
            if (!columnOnly) {
                if (array[arrayIndex][1] == array[arrayIndex][2]) {
                    color = '#262626';
                }
                if (i == array[arrayIndex][5]) {
                    color = '#FF0000';
                }
                if (i == array[arrayIndex][1]) {
                    color = '#5659C9';
                } else if (i == array[arrayIndex][2]) {
                    color = '#2CC990';
                }
            }

            drawSingleColoredColumn(ctx, x, height - columnHeightPixels, columnWidth, columnHeightPixels, color);
        }

        if (!columnOnly) {
            var left = (columnWidth + spacingWidth * 2) * array[arrayIndex][3] + spacingWidth;
            var right = (columnWidth + spacingWidth * 2) * (array[arrayIndex][4] + 1) - spacingWidth;
            var pivotHeightPixels = Math.round(array[arrayIndex][0][array[arrayIndex][5]] * 100 / max * height / 100);
            drawPivot(ctx, height - pivotHeightPixels, left, right, '#FF0000');

            if (arrayIndex < array.length - 1) {
                arrayIndex++;
            } else {
                turnOffTimer(true);
                drawFinalLoop();
            }
        }
    }
}

function drawSingleColoredColumn(ctx, x, y, width, height, color) {
    ctx.fillStyle=color;
    ctx.fillRect(x, y, width, height);
}

function drawPivot(ctx, height, left, right, color) {
    ctx.moveTo(left, height);
    ctx.lineTo(right, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}