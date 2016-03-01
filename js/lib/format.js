
var columnize = function (num, col) {
	num = num + '';
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

/**
 * Formats a binary string by padding out with extra 0s
 * and adding columns
 * @param  {string} bin The binary string to format
 * @return {string}     The formatted binary string
 */
var format_bin = function (bin, bits) {
	bin = bin.replace(/\s/g, '');
	bin = bin.replace(/^0+/, '');
	var padding = 0;

	if (bits) {
		padding = bits - bin.length;
	} else {
		padding = 4 - bin.length % 4;
		if (padding == 4) padding = 0;
	}

	bin = '0'.repeat(padding) + bin;
	return bin.replace(/(\d{4})/g, '$1 ').trim();
};
