(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _format = require("./lib/format");

var _conv = require("./lib/conv");

var hex_input = document.getElementById('hex');
var dec_input = document.getElementById('dec');
var bin_input = document.getElementById('bin');

var update = function update(dec) {
  dec_input.value = (0, _format.format_dec)(dec);
  hex_input.value = (0, _conv.dec2hex)(dec);
  bin_input.value = (0, _format.format_bin)((0, _conv.dec2bin)(dec));
};

update('0');
hex_input.addEventListener('input', function () {
  var hex = this.value.replace(/[^0-9a-fA-F]/g, '');
  var dec = (0, _conv.hex2dec)(hex);
  update(dec);
});
dec_input.addEventListener('input', function () {
  var dec = this.value.replace(/[^\d.]/g, '');
  update(dec);
});
bin_input.addEventListener('input', function () {
  var bin = this.value.replace(/[^01.]/, '');
  var dec = (0, _conv.bin2dec)(bin);
  update(dec);
});

},{"./lib/conv":2,"./lib/format":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hex2dec = exports.dec2hex = exports.dec2bin = exports.bin2dec = void 0;

/**
 * Convert a binary string into its base 10 equivalent
 * @param {string} bin The number in base 2
 * @returns {number} The number in base 10
 */
var bin2dec = function bin2dec(bin) {
  var dec = 0;
  bin = bin.replace(/\s/g, ''); // Convert the fractional part first

  if (bin.indexOf('.') !== -1) {
    var parts = bin.split('.');
    var mant = parts[1];
    bin = parts[0];

    for (var j = 0; j < mant.length; ++j) {
      if (mant[j] === '1') {
        dec += 1 / Math.pow(2, j + 1);
      }
    }
  }

  bin = bin.split('').reverse().join('');

  for (var i = bin.length - 1; i >= 0; --i) {
    if (bin[i] === '1') {
      dec += Math.pow(2, i);
    }
  }

  return dec;
};
/**
 * Convert a decimal number into its binary equivalent
 * @param {number} dec The number in base 2
 * @param {number} [mant_limit] The maximum number of bits to use in the mantissa
 * @returns {string} The number in base 10
 */


exports.bin2dec = bin2dec;

var dec2bin = function dec2bin(dec, mant_limit) {
  var bin = [];
  dec *= 1;

  if (isNaN(dec) || dec === 0) {
    return '0';
  } // Convert the fractional part first


  if (Math.floor(dec) !== dec) {
    var bin_mant = '.';
    var mant = dec % 1;

    for (var j = 0; mant !== 0 && (!mant_limit || j < mant_limit); ++j) {
      mant *= 2;
      bin_mant += Math.floor(mant);
      mant %= 1;
    }

    return dec2bin(Math.floor(dec)) + bin_mant;
  } // find biggest significant figure


  var pow = Math.floor(Math.log(dec) / Math.log(2));

  while (pow >= 0) {
    if (dec - Math.pow(2, pow) >= 0) {
      dec -= Math.pow(2, pow);
      bin[pow] = '1';
    } else {
      bin[pow] = '0';
    }

    --pow;
  }

  return bin.reverse().join('');
};
/**
 * Convert a decimal number into its hexadecimal equivalent
 * @param {number} dec The number in base 10
 * @returns {string} The number in base 16
 */


exports.dec2bin = dec2bin;

var dec2hex = function dec2hex(dec) {
  var alpha = '0123456789ABCDEF';
  var hex = [];
  dec = Math.floor(dec);

  if (dec === 0) {
    return '0';
  } // find biggest significant figure


  var pow = Math.floor(Math.log(dec) / Math.log(16));

  while (pow >= 0) {
    hex[pow] = Math.floor(dec / Math.pow(16, pow));
    hex[pow] = alpha.charAt(hex[pow]);
    dec %= Math.pow(16, pow);
    --pow;
  }

  return hex.reverse().join('');
};
/**
 * Convert a hexadecimal number into its decimal equivalent
 * @param {string} hex The number in base 16
 * @returns {number} The number in base 10
 */


exports.dec2hex = dec2hex;

var hex2dec = function hex2dec(hex) {
  var alpha = '0123456789ABCDEF';
  var dec = 0;
  hex = hex.toUpperCase();
  hex = hex.split('').reverse().join('');

  for (var i = hex.length - 1; i >= 0; --i) {
    var digit = alpha.indexOf(hex[i]);
    dec += Math.pow(16, i) * digit;
  }

  return dec;
};

exports.hex2dec = hex2dec;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format_bin = exports.format_dec = void 0;

/**
 * Format a decimal number for display.
 * Adds column separators and removes leading zeros.
 *
 * @param {string} dec The unformatted decimal number
 * @returns {string} The formatted number
 */
var format_dec = function format_dec(dec) {
  var mantissa = ''; // convert to string

  dec += ''; // remove columns

  dec = dec.replace(/\s/g, ''); // remove mantissa

  if (dec.indexOf('.') !== -1) {
    var parts = dec.split('.');
    mantissa += '.' + parts[1];
    dec = parts[0];
  } // remove leading zeros


  dec = dec.replace(/^0+([1-9])/, '$1'); // add columns

  var padding = 3 - dec.length % 3;
  if (padding === 3) padding = 0;
  dec = ' '.repeat(padding) + dec;
  dec = dec.replace(/(.{3})/g, '$1 ').trim();
  return dec + mantissa;
};
/**
 * Format a binary number by padding it out with zeros and adding column separators
 * @param {string} bin The unformatted binary number
 * @param {number} [bits] Force number to occupy a set number of bits
 * @returns {string} The formatted binary number
 */


exports.format_dec = format_dec;

var format_bin = function format_bin(bin, bits) {
  var mantissa = '';
  bin += ''; // remove columns

  bin = bin.replace(/\s/g, ''); // remove mantissa

  if (bin.indexOf('.') !== -1) {
    var parts = bin.split('.');
    console.log(parts);
    mantissa = '.' + parts[1];
    bin = parts[0];
  } // remove leading zeros


  bin = bin.replace(/^0+([^0])/, '$1');
  var padding = 0;

  if (bits) {
    padding = bits - bin.length;
  } else {
    padding = 4 - bin.length % 4;
    if (padding === 4) padding = 0;
  }

  bin = '0'.repeat(padding) + bin;
  bin = bin.replace(/(.{4})/g, '$1 ').trim();
  return bin + mantissa;
};

exports.format_bin = format_bin;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9oZXhjb252LmpzIiwianMvbGliL2NvbnYuanMiLCJqcy9saWIvZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFFQSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixLQUF4QixDQUFsQjtBQUNBLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLEtBQXhCLENBQWxCO0FBQ0EsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBbEI7O0FBRUEsSUFBTSxNQUFNLEdBQUcsU0FBVCxNQUFTLENBQUMsR0FBRCxFQUFTO0FBQ3ZCLEVBQUEsU0FBUyxDQUFDLEtBQVYsR0FBa0Isd0JBQVcsR0FBWCxDQUFsQjtBQUNBLEVBQUEsU0FBUyxDQUFDLEtBQVYsR0FBa0IsbUJBQVEsR0FBUixDQUFsQjtBQUNBLEVBQUEsU0FBUyxDQUFDLEtBQVYsR0FBa0Isd0JBQVcsbUJBQVEsR0FBUixDQUFYLENBQWxCO0FBQ0EsQ0FKRDs7QUFNQSxNQUFNLENBQUMsR0FBRCxDQUFOO0FBRUEsU0FBUyxDQUFDLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQVk7QUFDL0MsTUFBSSxHQUFHLEdBQUcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixlQUFuQixFQUFvQyxFQUFwQyxDQUFWO0FBQ0EsTUFBSSxHQUFHLEdBQUcsbUJBQVEsR0FBUixDQUFWO0FBQ0EsRUFBQSxNQUFNLENBQUMsR0FBRCxDQUFOO0FBQ0EsQ0FKRDtBQU1BLFNBQVMsQ0FBQyxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxZQUFZO0FBQy9DLE1BQUksR0FBRyxHQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsU0FBbkIsRUFBOEIsRUFBOUIsQ0FBVjtBQUNBLEVBQUEsTUFBTSxDQUFDLEdBQUQsQ0FBTjtBQUNBLENBSEQ7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LE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWjtBQUNBLElBQUEsUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUQsQ0FBdEI7QUFDQSxJQUFBLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBRCxDQUFYO0FBQ0EsR0FidUMsQ0FleEM7OztBQUNBLEVBQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksV0FBWixFQUF5QixJQUF6QixDQUFOO0FBRUEsTUFBSSxPQUFPLEdBQUcsQ0FBZDs7QUFFQSxNQUFJLElBQUosRUFBVTtBQUNULElBQUEsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsTUFBckI7QUFDQSxHQUZELE1BRU87QUFDTixJQUFBLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFKLEdBQWEsQ0FBM0I7QUFDQSxRQUFJLE9BQU8sS0FBSyxDQUFoQixFQUFtQixPQUFPLEdBQUcsQ0FBVjtBQUNuQjs7QUFFRCxFQUFBLEdBQUcsR0FBRyxJQUFJLE1BQUosQ0FBVyxPQUFYLElBQXNCLEdBQTVCO0FBQ0EsRUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxTQUFaLEVBQXVCLEtBQXZCLEVBQThCLElBQTlCLEVBQU47QUFFQSxTQUFPLEdBQUcsR0FBRyxRQUFiO0FBQ0EsQ0EvQk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge2Zvcm1hdF9iaW4sIGZvcm1hdF9kZWN9IGZyb20gJy4vbGliL2Zvcm1hdCc7XG5pbXBvcnQge2RlYzJoZXgsIGhleDJkZWMsIGRlYzJiaW4sIGJpbjJkZWN9IGZyb20gJy4vbGliL2NvbnYnO1xuXG5jb25zdCBoZXhfaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGV4Jyk7XG5jb25zdCBkZWNfaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVjJyk7XG5jb25zdCBiaW5faW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmluJyk7XG5cbmNvbnN0IHVwZGF0ZSA9IChkZWMpID0+IHtcblx0ZGVjX2lucHV0LnZhbHVlID0gZm9ybWF0X2RlYyhkZWMpO1xuXHRoZXhfaW5wdXQudmFsdWUgPSBkZWMyaGV4KGRlYyk7XG5cdGJpbl9pbnB1dC52YWx1ZSA9IGZvcm1hdF9iaW4oZGVjMmJpbihkZWMpKTtcbn07XG5cbnVwZGF0ZSgnMCcpO1xuXG5oZXhfaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG5cdGxldCBoZXggPSB0aGlzLnZhbHVlLnJlcGxhY2UoL1teMC05YS1mQS1GXS9nLCAnJyk7XG5cdGxldCBkZWMgPSBoZXgyZGVjKGhleCk7XG5cdHVwZGF0ZShkZWMpO1xufSk7XG5cbmRlY19pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcblx0bGV0IGRlYyA9IHRoaXMudmFsdWUucmVwbGFjZSgvW15cXGQuXS9nLCAnJyk7XG5cdHVwZGF0ZShkZWMpO1xufSk7XG5cbmJpbl9pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcblx0bGV0IGJpbiA9IHRoaXMudmFsdWUucmVwbGFjZSgvW14wMS5dLywgJycpO1xuXHRsZXQgZGVjID0gYmluMmRlYyhiaW4pO1xuXHR1cGRhdGUoZGVjKTtcbn0pO1xuIiwiXG4vKipcbiAqIENvbnZlcnQgYSBiaW5hcnkgc3RyaW5nIGludG8gaXRzIGJhc2UgMTAgZXF1aXZhbGVudFxuICogQHBhcmFtIHtzdHJpbmd9IGJpbiBUaGUgbnVtYmVyIGluIGJhc2UgMlxuICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBpbiBiYXNlIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBiaW4yZGVjID0gKGJpbikgPT4ge1xuXHRsZXQgZGVjID0gMDtcblx0YmluID0gYmluLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cblx0Ly8gQ29udmVydCB0aGUgZnJhY3Rpb25hbCBwYXJ0IGZpcnN0XG5cdGlmIChiaW4uaW5kZXhPZignLicpICE9PSAtMSkge1xuXHRcdGxldCBwYXJ0cyA9IGJpbi5zcGxpdCgnLicpO1xuXHRcdGxldCBtYW50ID0gcGFydHNbMV07XG5cdFx0YmluID0gcGFydHNbMF07XG5cblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IG1hbnQubGVuZ3RoOyArK2opIHtcblx0XHRcdGlmIChtYW50W2pdID09PSAnMScpIHtcblx0XHRcdFx0ZGVjICs9IDEvTWF0aC5wb3coMiwgaisxKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRiaW4gPSBiaW4uc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcblxuXHRmb3IgKGxldCBpID0gYmluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG5cblx0XHRpZiAoYmluW2ldID09PSAnMScpIHtcblx0XHRcdGRlYyArPSBNYXRoLnBvdygyLCBpKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVjO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGVjaW1hbCBudW1iZXIgaW50byBpdHMgYmluYXJ5IGVxdWl2YWxlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWMgVGhlIG51bWJlciBpbiBiYXNlIDJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWFudF9saW1pdF0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGJpdHMgdG8gdXNlIGluIHRoZSBtYW50aXNzYVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIG51bWJlciBpbiBiYXNlIDEwXG4gKi9cbmV4cG9ydCBjb25zdCBkZWMyYmluID0gKGRlYywgbWFudF9saW1pdCkgPT4ge1xuXHRsZXQgYmluID0gW107XG5cdGRlYyAqPSAxO1xuXG5cdGlmIChpc05hTihkZWMpIHx8IGRlYyA9PT0gMCkge1xuXHRcdHJldHVybiAnMCc7XG5cdH1cblxuXHQvLyBDb252ZXJ0IHRoZSBmcmFjdGlvbmFsIHBhcnQgZmlyc3Rcblx0aWYgKE1hdGguZmxvb3IoZGVjKSAhPT0gZGVjKSB7XG5cdFx0bGV0IGJpbl9tYW50ID0gJy4nO1xuXHRcdGxldCBtYW50ID0gZGVjICUgMTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBtYW50ICE9PSAwICYmICghbWFudF9saW1pdCB8fCBqIDwgbWFudF9saW1pdCk7ICsraikge1xuXHRcdFx0bWFudCAqPSAyO1xuXHRcdFx0YmluX21hbnQgKz0gTWF0aC5mbG9vcihtYW50KTtcblx0XHRcdG1hbnQgJT0gMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVjMmJpbihNYXRoLmZsb29yKGRlYykpICsgYmluX21hbnQ7XG5cdH1cblxuXHQvLyBmaW5kIGJpZ2dlc3Qgc2lnbmlmaWNhbnQgZmlndXJlXG5cdGxldCBwb3cgPSBNYXRoLmZsb29yKE1hdGgubG9nKGRlYykvTWF0aC5sb2coMikpO1xuXG5cdHdoaWxlIChwb3cgPj0gMCkge1xuXHRcdGlmIChkZWMgLSBNYXRoLnBvdygyLCBwb3cpID49IDApIHtcblx0XHRcdGRlYyAtPSBNYXRoLnBvdygyLCBwb3cpO1xuXHRcdFx0YmluW3Bvd10gPSAnMSc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbltwb3ddID0gJzAnO1xuXHRcdH1cblxuXHRcdC0tcG93O1xuXHR9XG5cblx0cmV0dXJuIGJpbi5yZXZlcnNlKCkuam9pbignJyk7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgYSBkZWNpbWFsIG51bWJlciBpbnRvIGl0cyBoZXhhZGVjaW1hbCBlcXVpdmFsZW50XG4gKiBAcGFyYW0ge251bWJlcn0gZGVjIFRoZSBudW1iZXIgaW4gYmFzZSAxMFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIG51bWJlciBpbiBiYXNlIDE2XG4gKi9cbmV4cG9ydCBjb25zdCBkZWMyaGV4ID0gKGRlYykgPT4ge1xuXHRjb25zdCBhbHBoYSA9ICcwMTIzNDU2Nzg5QUJDREVGJztcblx0bGV0IGhleCA9IFtdO1xuXHRkZWMgPSBNYXRoLmZsb29yKGRlYyk7XG5cblx0aWYgKGRlYyA9PT0gMCkge1xuXHRcdHJldHVybiAnMCc7XG5cdH1cblxuXHQvLyBmaW5kIGJpZ2dlc3Qgc2lnbmlmaWNhbnQgZmlndXJlXG5cdGxldCBwb3cgPSBNYXRoLmZsb29yKE1hdGgubG9nKGRlYykvTWF0aC5sb2coMTYpKTtcblxuXHR3aGlsZSAocG93ID49IDApIHtcblx0XHRoZXhbcG93XSA9IE1hdGguZmxvb3IoZGVjIC8gTWF0aC5wb3coMTYsIHBvdykpO1xuXHRcdGhleFtwb3ddID0gYWxwaGEuY2hhckF0KGhleFtwb3ddKTtcblx0XHRkZWMgJT0gTWF0aC5wb3coMTYsIHBvdyk7XG5cdFx0LS1wb3c7XG5cdH1cblxuXHRyZXR1cm4gaGV4LnJldmVyc2UoKS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIGhleGFkZWNpbWFsIG51bWJlciBpbnRvIGl0cyBkZWNpbWFsIGVxdWl2YWxlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBoZXggVGhlIG51bWJlciBpbiBiYXNlIDE2XG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIGluIGJhc2UgMTBcbiAqL1xuZXhwb3J0IGNvbnN0IGhleDJkZWMgPSAoaGV4KSA9PiB7XG5cdGNvbnN0IGFscGhhID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuXHRsZXQgZGVjID0gMDtcblx0aGV4ID0gaGV4LnRvVXBwZXJDYXNlKCk7XG5cdGhleCA9IGhleC5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuXG5cdGZvciAobGV0IGkgPSBoZXgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcblx0XHRsZXQgZGlnaXQgPSBhbHBoYS5pbmRleE9mKGhleFtpXSk7XG5cdFx0ZGVjICs9IE1hdGgucG93KDE2LCBpKSAqIGRpZ2l0O1xuXHR9XG5cblx0cmV0dXJuIGRlYztcbn07XG4iLCJcbi8qKlxuICogRm9ybWF0IGEgZGVjaW1hbCBudW1iZXIgZm9yIGRpc3BsYXkuXG4gKiBBZGRzIGNvbHVtbiBzZXBhcmF0b3JzIGFuZCByZW1vdmVzIGxlYWRpbmcgemVyb3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGRlYyBUaGUgdW5mb3JtYXR0ZWQgZGVjaW1hbCBudW1iZXJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRfZGVjID0gKGRlYykgPT4ge1xuXHRsZXQgbWFudGlzc2EgPSAnJztcblxuXHQvLyBjb252ZXJ0IHRvIHN0cmluZ1xuXHRkZWMgKz0gJyc7XG5cblx0Ly8gcmVtb3ZlIGNvbHVtbnNcblx0ZGVjID0gZGVjLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cblx0Ly8gcmVtb3ZlIG1hbnRpc3NhXG5cdGlmIChkZWMuaW5kZXhPZignLicpICE9PSAtMSkge1xuXHRcdGxldCBwYXJ0cyA9IGRlYy5zcGxpdCgnLicpO1xuXHRcdG1hbnRpc3NhICs9ICcuJyArIHBhcnRzWzFdO1xuXHRcdGRlYyA9IHBhcnRzWzBdO1xuXHR9XG5cblx0Ly8gcmVtb3ZlIGxlYWRpbmcgemVyb3Ncblx0ZGVjID0gZGVjLnJlcGxhY2UoL14wKyhbMS05XSkvLCAnJDEnKTtcblxuXHQvLyBhZGQgY29sdW1uc1xuXHRsZXQgcGFkZGluZyA9IDMgLSBkZWMubGVuZ3RoICUgMztcblx0aWYgKHBhZGRpbmcgPT09IDMpIHBhZGRpbmcgPSAwO1xuXHRkZWMgPSAnICcucmVwZWF0KHBhZGRpbmcpICsgZGVjO1xuXHRkZWMgPSBkZWMucmVwbGFjZSgvKC57M30pL2csICckMSAnKS50cmltKCk7XG5cblx0cmV0dXJuIGRlYyArIG1hbnRpc3NhO1xufTtcblxuLyoqXG4gKiBGb3JtYXQgYSBiaW5hcnkgbnVtYmVyIGJ5IHBhZGRpbmcgaXQgb3V0IHdpdGggemVyb3MgYW5kIGFkZGluZyBjb2x1bW4gc2VwYXJhdG9yc1xuICogQHBhcmFtIHtzdHJpbmd9IGJpbiBUaGUgdW5mb3JtYXR0ZWQgYmluYXJ5IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IFtiaXRzXSBGb3JjZSBudW1iZXIgdG8gb2NjdXB5IGEgc2V0IG51bWJlciBvZiBiaXRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGJpbmFyeSBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdF9iaW4gPSAoYmluLCBiaXRzKSA9PiB7XG5cdGxldCBtYW50aXNzYSA9ICcnO1xuXHRiaW4gKz0gJyc7XG5cblx0Ly8gcmVtb3ZlIGNvbHVtbnNcblx0YmluID0gYmluLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cblx0Ly8gcmVtb3ZlIG1hbnRpc3NhXG5cdGlmIChiaW4uaW5kZXhPZignLicpICE9PSAtMSkge1xuXHRcdGxldCBwYXJ0cyA9IGJpbi5zcGxpdCgnLicpO1xuXHRcdGNvbnNvbGUubG9nKHBhcnRzKTtcblx0XHRtYW50aXNzYSA9ICcuJyArIHBhcnRzWzFdO1xuXHRcdGJpbiA9IHBhcnRzWzBdO1xuXHR9XG5cblx0Ly8gcmVtb3ZlIGxlYWRpbmcgemVyb3Ncblx0YmluID0gYmluLnJlcGxhY2UoL14wKyhbXjBdKS8sICckMScpO1xuXG5cdGxldCBwYWRkaW5nID0gMDtcblxuXHRpZiAoYml0cykge1xuXHRcdHBhZGRpbmcgPSBiaXRzIC0gYmluLmxlbmd0aDtcblx0fSBlbHNlIHtcblx0XHRwYWRkaW5nID0gNCAtIGJpbi5sZW5ndGggJSA0O1xuXHRcdGlmIChwYWRkaW5nID09PSA0KSBwYWRkaW5nID0gMDtcblx0fVxuXG5cdGJpbiA9ICcwJy5yZXBlYXQocGFkZGluZykgKyBiaW47XG5cdGJpbiA9IGJpbi5yZXBsYWNlKC8oLns0fSkvZywgJyQxICcpLnRyaW0oKTtcblxuXHRyZXR1cm4gYmluICsgbWFudGlzc2E7XG59O1xuIl19

//# sourceMappingURL=hexconv.js.map
