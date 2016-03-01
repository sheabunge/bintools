
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
