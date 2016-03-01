/**
 * Find the two's complement of a binary number
 * @param {string} bin The original decimal number
 * @returns {string} The two's complement
 */
var twoscomp = function (bin) {
	var orig = bin.split('').reverse();
	var comp = [];
	var bits = orig.length;

	var i = 0;

	while (i < bits && orig[i] != '1') {
		comp[i] = orig[i];
		++i;
	}

	if (bits < i) {
		return comp.reverse().join('');
	}

	comp[i] = '1';
	++i;

	while (i < bits) {
		if (orig[i] == '1') {
			comp[i] = '0';
		} else if (orig[i] == '0') {
			comp[i] = '1';
		} else {
			comp[i] = orig[i];
		}

		++i;
	}

	return comp.reverse().join('');
};
