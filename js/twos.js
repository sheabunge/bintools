var orig_bin = document.querySelector('[name=orig_binary]');
var orig_dec = document.querySelector('[name=orig_decimal]');
var comp_bin = document.querySelector('[name=comp_binary]');
var comp_dec = document.querySelector('[name=comp_decimal]');

orig_bin.onInput = function () {
	var binary = format_bin(this.value);
	var decimal = bin2dec(binary);
	var comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = format_bin(comp, comp.length);

	orig_dec.value = decimal;
	comp_dec.value = decimal * -1;
};

orig_dec.onInput = function () {
	var decimal = this.value * 1;
	var binary = format_bin(dec2bin(decimal));
	var comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = format_bin(comp, comp.length);

	comp_dec.value = decimal * -1;
};
