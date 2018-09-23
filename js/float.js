import {bin2dec, dec2bin} from './lib/conv';
import {twoscomp} from './lib/twoscomp';

/**
 * Pad a string so it is a fixed length
 * @param {String} s - The string to pad
 * @param {Number} length - The desired length
 * @param {String} [char=0] - The character used for padding
 * @param {Boolean} [append=false] - Whether to prepend or append padding
 * @returns {String} The string at the desired length
 */
const pad = function (s, length, char, append) {
	s += '';
	char = char || '0';

	if (s.length > length) {
		return s.substr(0, length);
	}

	while (s.length < length) {
		s = append ? s + char : char + s;
	}

	return s;
};

/**
 * The main app module
 * @type {angular.Module}
 */
const app = angular.module('app', ['ngSanitize']);

/**
 * Angular filter to format a string of bits as blocks
 */
app.filter('format_bits', function () {
	return function (input) {
		let output = '';
		for (let i = 0; i < input.length; ++i) {
			output += '<span class="bit">' + input[i] + '</span>';
		}
		return output;
	};
});

/**
 * The main controller
 */
app.controller('FloatConverter', ['$scope', function ($scope) {
	$scope.bits = {sign: true, exp: 3, mantissa: 5};
	$scope.decimal = 0;
	$scope.exp_format = 'twos';

	$scope.word_len = function (length) {
		if (arguments.length) {
			$scope.bits.mantissa += length - $scope.word_len();

			if ($scope.bits.mantissa < 1) {
				$scope.bits.exp += $scope.bits.mantissa;
				$scope.bits.mantissa = 1;
			}

			return length;
		}

		return ($scope.bits.sign ? 1 : 0) + $scope.bits.exp + $scope.bits.mantissa;
	};

	const float2dec = function (sign, exp, mantissa) {
		console.log(sign + ' ' + exp + ' ' + mantissa);

		// Convert exponent to two's complement decimal
		if (exp[0] === '1') {
			exp = bin2dec(twoscomp(exp)) * -1;
		} else {
			exp = bin2dec(exp);
		}

		// Convert mantissa to decimal
		mantissa /= Math.pow(10, mantissa.length);
		mantissa = bin2dec(mantissa + '');

		// Calculate decimal number
		let dec = mantissa * Math.pow(2, exp * 1);

		if (sign === '1') {
			dec *= -1;
		}

		return dec;
	};

	/**
	 * Converts a decimal to floating point binary
	 * @param dec
	 */
	const convert_decimal = function (dec) {

		// calculate sign
		$scope.sign = dec < 0 ? '1' : '0';
		dec = Math.abs(dec);

		// convert to binary
		let exp = 0;
		let mantissa = dec2bin(dec, $scope.bits.mantissa);
		$scope.initial_mantissa = mantissa;

		// normalise mantissa
		if (mantissa === '0') {

		} else if (mantissa < 1) {
			mantissa = mantissa.replace(/^0./, '');
			for (let i = 0; mantissa[i] === '0'; ++i, --exp) {
			}
			mantissa = mantissa.substr(i);
		} else {
			// calculate exponent
			let int = (Math.floor(mantissa * 1) + '');
			exp = '0' === int ? 0 : int.length;
			mantissa = mantissa.replace(/^0+|0+$|\./g, '');
		}

		// convert to required size
		mantissa = pad(mantissa, $scope.bits.mantissa, '0', true);
		$scope.mantissa = mantissa;
		$scope.mantissa_decimal = bin2dec('0.' + mantissa);
		$scope.exp_decimal = exp;

		let negative_exp = exp < 0;
		exp = dec2bin(Math.abs(exp));

		// convert exponent to signed magnitude
		if ($scope.exp_format === 'signed') {
			exp = (negative_exp ? '1' : '0') + exp;
		}

		exp = pad(exp, $scope.bits.exp, '0');

		// convert exponent to two's complement
		if (negative_exp && $scope.exp_format === 'twos') {
			exp = twoscomp(exp);
		}
		$scope.exp = exp;

		// convert the result back to decimal
		$scope.converted_result = float2dec($scope.sign, $scope.exp, $scope.mantissa);

	};

	convert_decimal(0);

	$scope.$watch(function () {
		let dec = $scope.decimal;
		dec = parseFloat(dec);

		if (isNaN(dec)) {
			console.log(dec + ' is not a valid number');
			dec = 0;
		}

		convert_decimal(dec);
	});
}]);
