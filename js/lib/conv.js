
/**
 * Convert a binary string into its base 10 equivalent
 * @param {string} bin The number in base 2
 * @returns {number} The number in base 10
 */
export const bin2dec = (bin) => {
	let dec = 0;
	bin = bin.replace(/\s/g, '');

	// Convert the fractional part first
	if (bin.indexOf('.') !== -1) {
		let parts = bin.split('.');
		let mant = parts[1];
		bin = parts[0];

		for (let j = 0; j < mant.length; ++j) {
			if (mant[j] === '1') {
				dec += 1/Math.pow(2, j+1);
			}
		}
	}

	bin = bin.split('').reverse().join('');

	for (let i = bin.length - 1; i >= 0; --i) {

		if (bin[i] === '1') {
			dec += Math.pow(2, i);
		}
	}

	return dec;
};

/**
 * Convert a decimal number into its binary equivalent
 * @param {number} dec The number in base 2
 * @param {number} [mant_limit] The maximum number of bits to use in the mantissa
 * @returns {string} The number in base 10
 */
export const dec2bin = (dec, mant_limit) => {
	let bin = [];
	dec *= 1;

	if (isNaN(dec) || dec === 0) {
		return '0';
	}

	// Convert the fractional part first
	if (Math.floor(dec) !== dec) {
		let bin_mant = '.';
		let mant = dec % 1;

		for (let j = 0; mant !== 0 && (!mant_limit || j < mant_limit); ++j) {
			mant *= 2;
			bin_mant += Math.floor(mant);
			mant %= 1;
		}

		return dec2bin(Math.floor(dec)) + bin_mant;
	}

	// find biggest significant figure
	let pow = Math.floor(Math.log(dec)/Math.log(2));

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
export const dec2hex = (dec) => {
	const alpha = '0123456789ABCDEF';
	let hex = [];
	dec = Math.floor(dec);

	if (dec === 0) {
		return '0';
	}

	// find biggest significant figure
	let pow = Math.floor(Math.log(dec)/Math.log(16));

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
export const hex2dec = (hex) => {
	const alpha = '0123456789ABCDEF';
	let dec = 0;
	hex = hex.toUpperCase();
	hex = hex.split('').reverse().join('');

	for (let i = hex.length - 1; i >= 0; --i) {
		let digit = alpha.indexOf(hex[i]);
		dec += Math.pow(16, i) * digit;
	}

	return dec;
};
