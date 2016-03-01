
/**
 * Convert a binary string into its base 10 equivalent
 * @param {string} bin The number in base 2
 * @returns {number} The number in base 10
 */
var bin2dec = function (bin) {
	var dec = 0;
	bin = bin.replace(/\s/g, '');
	bin = bin.split('').reverse().join('');

	for (var i = bin.length - 1; i >= 0; --i) {

		if (bin[i] == '1') {
			dec += Math.pow(2, i);
		}
	}

	return dec;
};

/**
 * Convert a decimal number into its binary equivalent
 * @param {number} dec The number in base 2
 * @returns {string} The number in base 10
 */
var dec2bin = function (dec) {
	var bin = [];
	dec *= 1;

	if (dec === 0) {
		return 0;
	}

	// find biggest significant figure
	var pow = Math.floor(Math.log(dec)/Math.log(2));

	while (pow >= 0) {
		if (dec - Math.pow(2, pow) >= 0) {
			dec -= Math.pow(2, pow);
			bin[pow] = '1';
		} else {
			bin[pow] = '0';
		}

		--pow;
	}

	return bin.reverse().join('');
};

/**
 * Convert a decimal number into its hexadecimal equivalent
 * @param {number} dec The number in base 10
 * @returns {string} The number in base 16
 */
var dec2hex = function (dec) {
	var alpha = '0123456789ABCDEF';
	var hex = [];
	dec *= 1;

	if (dec === 0) {
		return 0;
	}

	// find biggest significant figure
	var pow = Math.floor(Math.log(dec)/Math.log(16));

	while (pow >= 0) {
		hex[pow] = Math.floor(dec / Math.pow(16, pow));
		hex[pow] = alpha.charAt(hex[pow]);
		dec %= Math.pow(16, pow);
		--pow;
	}

	return hex.reverse().join('');
};

/**
 * Convert a hexadecimal number into its decimal equivalent
 * @param {string} hex The number in base 16
 * @returns {number} The number in base 10
 */
var hex2dec = function (hex) {
	var alpha = '0123456789ABCDEF';
	var dec = 0;
	hex = hex.toUpperCase();
	hex = hex.split('').reverse().join('');

	for (var i = hex.length - 1; i >= 0; --i) {
		var digit = alpha.indexOf(hex[i]);
		dec += Math.pow(16, i) * digit;
	}

	return dec;
};
