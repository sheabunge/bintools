var input_bin_a = document.querySelector('[name=bin_one]');
var input_bin_b = document.querySelector('[name=bin_two]');
var input_dec_a = document.querySelector('[name=dec_one]');
var input_dec_b = document.querySelector('[name=dec_two]');

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
