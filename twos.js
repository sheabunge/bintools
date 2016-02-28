var input_bin_one = document.querySelector('[name=bin_one]');
var input_bin_two = document.querySelector('[name=bin_two]');
var input_dec_one = document.querySelector('[name=dec_one]');
var input_dec_two = document.querySelector('[name=dec_two]');

var columnize = function (num, col) {
	num = num.toString();
	var before;

	if (num.indexOf('.') !== -1) {
		before = num.split('.');
		var fractional = before[1].split('');

	} else {
		before = num.split('').reverse();
	}

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

input_bin_one.oninput = function () {
	var bin_one = this.value.replace(/\s/g, '');
	var bin_two = twoscomp(bin_one);

	input_bin_one.value = columnize(bin_one, 4);
	input_bin_two.value = columnize(bin_two, 4);

	input_dec_one.value = bin2dec(bin_one);
	input_dec_two.value = bin2dec(bin_one) * -1;
};
