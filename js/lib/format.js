
/**
 * Format a decimal number for display.
 * Adds column separators and removes leading zeros.
 *
 * @param {string} dec The unformatted decimal number
 * @returns {string} The formatted number
 */
var format_dec = function (dec) {
	// convert to string
	dec += '';

	// remove columns
	dec = dec.replace(/\s/g, '');

	// remove leading zeros
	dec = dec.replace(/^0+([1-9])/, '$1');

	// add columns
	var padding = 3 - dec.length % 3;
	if (padding == 3) padding = 0;
	dec = ' '.repeat(padding) + dec;
	return dec.replace(/(\d{3}[^.])/g, '$1 ').trim();
};

/**
 * Format a binary number by padding it out with zeros and adding column separators
 * @param {string} bin The unformatted binary number
 * @param {number} [bits] Force number to occupy a set number of bits
 * @returns {string} The formatted binary number
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


/**
 * Separate a number into columns using spaces
 * @param {string} num The original number
 * @param {number} col The amount of digits per column
 * @returns {string} The formatted number
 */
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
