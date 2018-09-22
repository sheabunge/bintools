import {bin2dec, dec2bin} from './lib/conv';
import {twoscomp} from './lib/twoscomp';

(function () {
	const binary_input = document.getElementById('binary');
	const decimal_input = document.getElementById('decimal');

	let bits = {
		sign: 1,
		exp: 3,
		mantissa: 5
	};

	/**
	 * Pad a string with a leading character so it
	 * is a fixed length
	 * @param {string|number} s String to pad
	 * @param {number} length Desired length of string
	 * @param {string} [char] Character pad with
	 * @returns {string}
	 */
	const pad = (s, length, char) => {
		s += '';
		char = char || '0';

		while (s.length < length) {
			s = char + s;
		}

		return s;
	};

	binary_input.addEventListener('input', function () {
		let bin = this.value.replace(/[^01]/g, '');

		if (bin.length > bits.sign + bits.exp + bits.mantissa) {
			decimal_input.value = 'too many bits';
			return;
		}

		if (bin.length < bits.sign + bits.exp + bits.mantissa) {
			decimal_input.value = 'not enough bits';
			return;
		}

		let sign = bin.substr(0, bits.sign);
		let exp = bin.substr(bits.sign, bits.exp);
		let mantissa = bin.substr(bits.sign + bits.exp, bits.mantissa);

		console.log('sign: ' + sign);

		// Convert exponent to two's complement decimal
		console.log('exp: ' + exp);
		if (exp[0] === '1') {
			exp = bin2dec(twoscomp(exp)) * -1;
		} else {
			exp = bin2dec(exp);
		}
		console.log('exp: ' + exp);

		// Convert mantissa to decimal
		mantissa /= Math.pow(10, mantissa.length);
		console.log('mantissa: ' + mantissa);
		mantissa = bin2dec(mantissa + '');
		console.log('mantissa: ' + mantissa);

		// Calculate decimal number
		let dec = mantissa * Math.pow(2, exp*1);

		if (sign === '1') {
			dec *= -1;
		}

		decimal_input.value = dec;
		console.log();
	});

	decimal_input.addEventListener('input', function () {
		let dec = this.value.replace(/[^\d.\-+]/g, '') * 1;

		// calculate sign
		let sign = '0';
		if (dec < 0) {
			sign = '1';
			dec *= -1;
		}

		// convert to binary
		let exp = 0;
		let mantissa = dec2bin(dec);

		// normalise mantissa
		if (mantissa < 1) {
			mantissa = mantissa.replace(/^0./, '');
			for (let i = 0; mantissa[i] === '0'; ++i, --exp) {}
			mantissa = mantissa.substr(i);
		} else {
			// calculate exponent
			let int = (Math.floor(mantissa * 1) + '');
			exp = '0' === int ? 0 : int.length;
			mantissa = mantissa.replace(/^0+|0+$|\./g, '');
		}

		// convert to required size
		mantissa = mantissa.substr(0, bits.mantissa);
		mantissa += '0'.repeat(bits.mantissa - mantissa.length);

		// convert exponent to binary
		if (exp < 0) {
			exp = dec2bin(-exp);
			exp = twoscomp(pad(exp, bits.exp));
		} else {
			exp = pad(dec2bin(exp), bits.exp);
		}

		// display result
		binary_input.value = sign + ' ' + exp + ' ' + mantissa;
	});

})();
