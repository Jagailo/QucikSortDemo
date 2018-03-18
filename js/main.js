var randomArraySizeRange = [10, 40] // [min, max]
var randomArrayIntRange = [-99, 99] // [min, max]

function fillArray() {
    var inputString = document.getElementById('arrayInput').value;
    var inputArray = inputString.match(/-?\d+(?:\.\d+)?/g);

    if (inputArray != null) {
        document.getElementById('array-data').style.display = 'block';
        var array = getConverArray(inputArray);
        printArray(array, 'sourceArray');
        drawArray(JSON.parse(JSON.stringify(array)), 'canvas', getWidthWithoutCanvas());
        setTimeout(printArray, 1000, quickSort(array), 'currentArray');
        setTimeout(drawArray, 1000, JSON.parse(JSON.stringify(array)), 'canvas', getWidthWithoutCanvas());
    }
}

function randomFill() {
    var string = '';
    var arraySize = randomInteger(randomArraySizeRange[0], randomArraySizeRange[1]);

    for (var i = 0; i < arraySize; i++) {
        string += randomInteger(randomArrayIntRange[0], randomArrayIntRange[1]) + ' ';
    }

    document.getElementById('arrayInput').value = string;
    fillArray();
}