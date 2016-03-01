
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


var format_dec = function (dec) {
	// convert to string
	dec += '';

	// remove columns
	dec = dec.replace(/\s/g, '');

	// remove leading zeros
	dec = dec.replace(/^0+([1-9])/, '$1');

	// seperate into columns
	var padding = 3 - dec.length % 3;
	if (padding == 3) padding = 0;
	console.log(padding);
	dec = ' '.repeat(padding) + dec;
	dec = dec.replace(/(.{3})/g, '$1 ').trim();

	return dec;
};

/**
 * Formats a binary string by padding out with extra 0s
 * and adding columns
 * @param  {string} bin The binary string to format
 * @return {string}     The formatted binary string
 */
var format_bin = function (bin, bits) {
	bin += '';

	// remove columns
	bin = bin.replace(/\s/g, '');

	// remove leading zeros
	bin = bin.replace(/^0+([^0])/, '$1');

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
