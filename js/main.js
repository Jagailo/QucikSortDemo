var randomArraySizeRange = [10, 100] // [min, max]
var randomArrayIntRange = [-999, 999] // [min, max]

function fillArray() {
    var inputString = document.getElementById('arrayInput').value;
    var inputArray = inputString.match(/-?\d+(?:\.\d+)?/g);

    if (inputArray != null) {
        document.getElementById('array-data').style.display = 'block';
        var array = getConverArray(inputArray);
        printArray(array, 'sourceArray');
        printArray(quickSort(array), 'currentArray');

        setTimer(startAnimation(50));
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