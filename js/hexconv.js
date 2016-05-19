var hex_input = document.getElementById('hex');
var dec_input = document.getElementById('dec');
var bin_input = document.getElementById('bin');

var update = function (dec) {
	dec_input.value = format_dec(dec);
	hex_input.value = dec2hex(dec);
	bin_input.value = format_bin(dec2bin(dec));
};

update('0');

hex_input.oninput = function () {
	var hex = this.value.replace(/[^0-9a-fA-F.]/g, '');
	console.log(hex + ' : ' + this.value);
	var dec = hex2dec(hex);
	update(dec);
};

dec_input.oninput = function () {
	var dec = this.value.replace(/[^\d.]/g, '');
	update(dec);
};

bin_input.oninput = function () {
	var bin = this.value.replace(/[^01.]/, '');
	var dec = bin2dec(bin);
	update(dec);
};
