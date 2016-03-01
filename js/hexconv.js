var hex_input = document.querySelector('[name=hex]');
var dec_input = document.querySelector('[name=dec]');
var bin_input = document.querySelector('[name=bin]');

var update = function (dec) {
	dec_input.value = format_dec(dec);
	hex_input.value = dec2hex(dec);
	bin_input.value = format_bin(dec2bin(dec));
};

update('0');

hex_input.onInput = function () {
	update(hex2dec(this.value));
};

dec_input.onInput = function () {
	update(this.value.replace(/\D/g, ''));
};

bin_input.onInput = function () {
	update(bin2dec(this.value));
};
