import {format_bin, format_dec} from './lib/format';
import {dec2hex, hex2dec, dec2bin, bin2dec} from './lib/conv';

const hex_input = document.getElementById('hex');
const dec_input = document.getElementById('dec');
const bin_input = document.getElementById('bin');

const update = (dec) => {
	dec_input.value = format_dec(dec);
	hex_input.value = dec2hex(dec);
	bin_input.value = format_bin(dec2bin(dec));
};

update('0');

hex_input.addEventListener('input', function () {
	let hex = this.value.replace(/[^0-9a-fA-F]/g, '');
	let dec = hex2dec(hex);
	update(dec);
});

dec_input.addEventListener('input', function () {
	let dec = this.value.replace(/[^\d.]/g, '');
	update(dec);
});

bin_input.addEventListener('input', function () {
	let bin = this.value.replace(/[^01.]/, '');
	let dec = bin2dec(bin);
	update(dec);
});
