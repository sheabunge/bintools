var hex_input = document.querySelector('[name=hex]');
var dec_input = document.querySelector('[name=dec]');
var bin_input = document.querySelector('[name=bin]');

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

var update_dec = function (dec) {
	dec_input.value = columnize(dec, 3);
};
var update_hex = function (dec) {
	hex_input.value = dec.toString(16);
};
var update_bin = function (dec) {
	bin_input.value = columnize(dec.toString(2), 4);
};

update_dec(0);
update_hex(0);
update_bin(0);

hex_input.oninput = function () {
	var dec = parseInt(this.value, 16);
	update_dec(dec);
	update_bin(dec);
};

dec_input.oninput = function () {
	var dec = parseFloat(this.value);
	update_hex(dec);
	update_bin(dec);
};

bin_input.oninput = function () {
	var dec = parseInt(this.value, 2);
	update_hex(dec);
	update_dec(dec);
};
