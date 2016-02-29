
var columnize = function (num, col) {
	num = num.toString();
	var before = num.split('').reverse();
	var after = [];

	for (var i = 0; i < before.length; i++) {
		after.push(before[i]);

		if ((i+1) % col === 0) {
			after.push(' ');
		}
	}

	return after.reverse().join('').trim();
};
