var hex_input = document.querySelector('[name=hex]');
var dec_input = document.querySelector('[name=dec]');
var bin_input = document.querySelector('[name=bin]');

var columnize = function (n, col) {
	if (!isNaN(n)) n = n.toString();

	var re = new RegExp('^(\\d{' + n.length % col + '})(\\d{' + col + '})', 'g');
	n = n.replace(re, '$1 $2');
	n = n.replace(new RegExp('(\\d{' + col + '})+?', 'gi'), '$1 ');
	
	return n.trim();
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

