
/**
 * Pad a string so it is a fixed length
 * @param {String} s - The string to pad
 * @param {Number} length - The desired length
 * @param {String} [char=0] - The character used for padding
 * @param {Boolean} [append=false] - Whether to prepend or append padding
 * @returns {String} The string at the desired length
 */
var pad = function (s, length, char, append) {
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
var app = angular.module('app', ['ngSanitize']);

/**
 * Angular filter to format a string of bits as blocks
 */
app.filter('format_bits', function () {
    return function (input) {
        var output = '';
        for (var i = 0; i < input.length; ++i) {
            output += '<span class="bit">' + input[i] + '</span>\n';
        }
        return output;
    };
});

/**
 * The main controller
 */
app.controller('FloatConverter', ['$scope', function ( $scope ) {
    $scope.bits = { sign: true, exp: 3, mantissa: 5 };
    $scope.decimal = 0;
    $scope.exp_format = 'twos';

    $scope.word_len = function (length) {
        if (arguments.length) {
            $scope.bits.mantissa += length - $scope.word_len();
            return length;
        }

        return ($scope.bits.sign ? 1 : 0) + $scope.bits.exp + $scope.bits.mantissa;
    };

    /**
     * Converts a decimal to floating point binary
     * @param dec
     */
    var convert_decimal = function (dec) {

        // calculate sign
        $scope.sign = dec < 0 ? '1' : '0';
        dec = Math.abs(dec);

        // convert to binary
        var exp = 0;
        var mantissa = dec2bin(dec);
        $scope.initial_mantissa = pad(mantissa,
            $scope.bits.mantissa + ( mantissa.indexOf('.') === -1 ? 0 : 1 )
        );

        // normalise mantissa
        if (mantissa == '0') {

        } else if (mantissa < 1) {
        	mantissa = mantissa.replace(/^0./, '');
        	for (var i = 0; mantissa[i] == '0'; ++i, --exp) {}
        	mantissa = mantissa.substr(i);
        } else {
        	// calculate exponent
        	var int = (Math.floor(mantissa * 1) + '');
        	exp = '0' == int ? 0 : int.length;
        	mantissa = mantissa.replace(/^0+|0+$|\./g, '');
        }

        // convert to required size
        mantissa = pad(mantissa, $scope.bits.mantissa, '0', true);
        $scope.mantissa = mantissa;
        $scope.exp_decimal = exp;

        var negative_exp = exp < 0;
        exp = dec2bin(Math.abs(exp));

        // convert exponent to signed magnitude
        if ($scope.exp_format == 'signed') {
        	exp = (negative_exp ? '1' : '0') + exp;
        }

        exp = pad(exp, $scope.bits.exp, '0');

        // convert exponent to two's complement
        if (negative_exp && $scope.exp_format == 'twos') {
        	exp = twoscomp(exp);
        }
        $scope.exp = exp;
    };

    convert_decimal(0);

    $scope.$watch(function () {
        var dec = $scope.decimal;
        dec = parseFloat(dec);

        if (isNaN(dec)) {
            console.log(dec + ' is not a valid number');
            dec = 0;
        }

        convert_decimal(dec);
    });
}]);
