var randomArraySizeRange = [10, 500] // [min, max]
var randomArrayIntRange = [-999, 999] // [min, max]
var arrayCount = 0;

function fillArray() {
    var inputString = document.getElementById('arrayInput').value;
    var inputArray = inputString.match(/-?\d+(?:\.\d+)?/g);

    if (inputArray != null) {
        document.getElementById('array-data').style.display = 'block';
        turnOffTimer();
        var array = getConverArray(inputArray);
        arrayCount = array.length;
        clearHistory();
        printArray(array, 'sourceArray');
        printArray(quickSort(array), 'currentArray');

        setTimer(startAnimation('slider', arrayCount));
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

function play() {
    turnOffTimer();
    setTimer(startAnimation('slider', arrayCount));
}

function pause() {
    turnOffTimer();
}

function sliderChange() {
    var slider = document.getElementById('slider');
    var input = document.getElementById('sliderInput');

    if (slider.value != 0) {
        input.value = slider.value;
    } else {
        input.value = 'auto';
    }
}

function sliderInputChange() {
    var input = document.getElementById('sliderInput');    
    if (+input.value != NaN && input.value != '' && input.value >= 0 && input.value <= 2000) {
        document.getElementById('slider').value = input.value;
        if (input.value == 0) {
            input.value = 'auto';
        }
    }
}