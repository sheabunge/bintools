import {format_bin} from './lib/format';
import {bin2dec, dec2bin} from './lib/conv';
import {twoscomp} from './lib/twoscomp';

const orig_bin = document.getElementById('orig_binary');
const orig_dec = document.getElementById('orig_decimal');
const comp_bin = document.getElementById('comp_binary');
const comp_dec = document.getElementById('comp_decimal');

orig_bin.addEventListener('input', function () {
	let binary = format_bin(this.value);
	let decimal = bin2dec(binary);
	let comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;

	orig_dec.value = decimal;
	comp_dec.value = decimal * -1;
});

comp_bin.addEventListener('input', function () {
	let comp = format_bin(this.value);
	let binary = twoscomp(comp);
	let decimal = bin2dec(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;

	orig_dec.value = decimal;
	comp_dec.value = decimal * -1;
});

orig_dec.addEventListener('input', function () {
	let decimal = this.value * 1;
	if (isNaN(decimal)) return;

	let binary = format_bin(dec2bin(decimal));
	let comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;
	comp_dec.value = decimal * -1;
});


comp_dec.addEventListener('input', function () {
	let decimal = this.value * -1;
	if (isNaN(decimal)) return;

	let binary = format_bin(dec2bin(decimal));
	let comp = twoscomp(binary);

	orig_bin.value = binary;
	comp_bin.value = comp;
	orig_dec.value = decimal;
});
