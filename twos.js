var input_bin_a = document.querySelector('[name=bin_one]');
var input_bin_b = document.querySelector('[name=bin_two]');
var input_dec_a = document.querySelector('[name=dec_one]');
var input_dec_b = document.querySelector('[name=dec_two]');

var columnize = function (num, col) {
	num = num.toString();
	var before = num.split('').reverse();
	var after = [];

	for (var i = 0; i < before.length; i++) {
		after.push(before[i]);

		if ((i+1) % col == 0) {
			after.push(' ');
		}
	}

	return after.reverse().join('').trim();
};

var twoscomp = function (orig) {
	orig = orig.split('').reverse();
	var comp = [];
	var bits = orig.length;

	var i = 0;

	while (i < bits && orig[i] != '1') {
		comp[i] = orig[i];
		++i;
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
	dec = parseInt(dec);

	if (dec == 0) {
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


input_bin_a.oninput = function () {
	var bin_a = this.value.replace(/\s/g, '');
	var bin_b = twoscomp(bin_a);

	input_bin_a.value = columnize(bin_a, 4);
	input_bin_b.value = columnize(bin_b, 4);

	input_dec_a.value = bin2dec(bin_a);
	input_dec_b.value = bin2dec(bin_a) * -1;
};


input_dec_a.oninput = function () {
	var dec_a = parseInt(this.value);
	var bin_a = dec2bin(dec_a);

	input_bin_a.value = columnize(bin_a, 4);
	input_bin_b.value = columnize(twoscomp(bin_a), 4);

	input_dec_b.value = dec_a * -1;
};
