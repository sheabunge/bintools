var orig_bin = document.getElementById('orig_binary');
var orig_dec = document.getElementById('orig_decimal');
var comp_bin = document.getElementById('comp_binary');
var comp_dec = document.getElementById('comp_decimal');

orig_bin.oninput = function () {
	var binary = format_bin(this.value);
	var decimal = bin2dec(binary);
	var comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;

	orig_dec.value = decimal;
	comp_dec.value = decimal * -1;
};

comp_bin.oninput = function () {
	var comp = format_bin(this.value);
	var binary = twoscomp(comp);
	var decimal = bin2dec(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;

	orig_dec.value = decimal;
	comp_dec.value = decimal * -1;
};

orig_dec.oninput = function () {
	var decimal = this.value * 1;
	if (isNaN(decimal)) return;

	var binary = format_bin(dec2bin(decimal));
	var comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;
	comp_dec.value = decimal * -1;
};


comp_dec.oninput = function () {
	var decimal = this.value * -1;
	if (isNaN(decimal)) return;

	var binary = format_bin(dec2bin(decimal));
	var comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;
	orig_dec.value = decimal;
};
