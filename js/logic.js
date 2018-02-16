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

function printArray(array, HTMLIDTag) {
	var str = '';
	for (var i = 0; i < array.length; i++) {
		str += '<span class="array-elem-cell">' + array[i] + '</span>';
	}
	document.getElementById(HTMLIDTag).innerHTML = str;
}