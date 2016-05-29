
var pad = function (s, length, char) {
    s += '';
    char = char || '0';

    if (s.length > length) {
        return s.substr(0, length);
    }

    while (s.length < length) {
        s = char + s;
    }

    return s;
};

var app = angular.module('FloatConverter', ['ngSanitize']);

app.filter('format_bits', function () {
    return function (input) {
        var output = '';
        for (var i = 0; i < input.length; ++i) {
            output += '<span class="bit">' + input[i] + '</span>\n';
        }
        return output;
    };
});

app.controller('Converter', ['$scope', function ( $scope ) {
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

    var convert_decimal = function (dec) {

        // calculate sign
        $scope.sign = dec < 0 ? '1' : '0';
        dec = Math.abs(dec);

        // convert to binary
        var exp = 0;
        var mantissa = dec2bin(dec);
        $scope.initial_mantissa = mantissa;

        // normalise mantissa
        if (mantissa < 1) {
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
        if (mantissa.length > $scope.bits.mantissa) {
        	mantissa = mantissa.substr(0, $scope.bits.mantissa);
        } else if (mantissa.length < $scope.bits.mantissa) {
            mantissa += '0'.repeat($scope.bits.mantissa - mantissa.length);
        }
        $scope.mantissa = mantissa;
        $scope.exp_decimal = exp;

        var negative_exp = exp < 0;
        exp = dec2bin(Math.abs(exp));

        // convert exponent to signed magnitude
        if ($scope.exp_format == 'signed') {
        	exp = (negative_exp ? '1' : '0') + exp;
        }

        exp = pad(exp, $scope.bits.exp);

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
