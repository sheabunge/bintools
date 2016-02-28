var hex_input = document.querySelector('[name=hex]');
var dec_input = document.querySelector('[name=dec]');
var bin_input = document.querySelector('[name=bin]');

var columnize = function (num, col) {
	var before = num.toString().split('').reverse();
	var after = [];

	before.forEach(function (d, i) {
		after.push(d);

		if ((i+1) % col == 0) {
			after.push(' ');
		}
	} );

	return after.reverse().join('').trim();
};

var update = function (dec) {
	dec = dec.toString().replace(/[^\d]/g, '');
	dec = parseInt(dec);

	dec_input.value = columnize(dec, 3);
	hex_input.value = dec.toString(16);
	bin_input.value = columnize(dec.toString(2), 4);
}

update(0);

hex_input.oninput = function () {
	update(parseInt(this.value, 16));
};

dec_input.oninput = function () {
	update(this.value);
};

bin_input.oninput = function () {
	update(parseInt(this.value, 2));
};
