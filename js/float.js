
var binary_input = document.getElementById('binary');
var decimal_input = document.getElementById('decimal');

var bits = {
    sign: 1,
    exp: 3,
    mantissa: 5
};

binary_input.oninput = function () {
    var bin = this.value.replace(/[^01]/g, '');

    if (bin.length > bits.sign + bits.exp + bits.mantissa) {
        decimal_input.value = 'too many bits';
        return;
    }

    if (bin.length < bits.sign + bits.exp + bits.mantissa) {
        decimal_input.value = 'not enough bits';
        return;
    }

    var sign = bin.substr(0, bits.sign);
    var exp = bin.substr(bits.sign, bits.exp);
    var mantissa = bin.substr(bits.sign + bits.exp, bits.mantissa);

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
    var dec = mantissa * Math.pow(2, exp*1);

    if (sign === '1') {
        dec *= -1;
    }

    decimal_input.value = dec;
    console.log();
};

decimal_input.oninput = function () {
    var dec = this.value.replace(/[^\d.]/g, '');

};
