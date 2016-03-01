var hex_input = document.querySelector('[name=hex]');
var dec_input = document.querySelector('[name=dec]');
var bin_input = document.querySelector('[name=bin]');

var update = function (dec) {
	dec_input.value = format_dec(dec);
	hex_input.value = (dec * 1).toString(16);
	bin_input.value = format_bin(dec2bin(dec));
};

update('0');

hex_input.oninput = function () {
	update(parseInt(this.value, 16));
};

dec_input.oninput = function () {
	update(this.value.replace(/\D/g, ''));
};

bin_input.oninput = function () {
	update(bin2dec(this.value));
};
