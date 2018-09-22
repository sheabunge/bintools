(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twoscomp = void 0;

/**
 * Find the two's complement of a binary number
 * @param {string} bin The original decimal number
 * @returns {string} The two's complement
 */
var twoscomp = function twoscomp(bin) {
  var orig = bin.split('').reverse();
  var bits = orig.length;
  var comp = [];
  var i = 0;

  while (i < bits && orig[i] !== '1') {
    comp[i] = orig[i];
    ++i;
  }

  if (i >= bits) {
    return comp.reverse().join('');
  }

  comp[i] = '1';
  ++i;

  while (i < bits) {
    if (orig[i] === '1') {
      comp[i] = '0';
    } else if (orig[i] === '0') {
      comp[i] = '1';
    } else {
      comp[i] = orig[i];
    }

    ++i;
  }

  return comp.reverse().join('');
};

exports.twoscomp = twoscomp;

},{}],4:[function(require,module,exports){
"use strict";

var _format = require("./lib/format");

var _conv = require("./lib/conv");

var _twoscomp = require("./lib/twoscomp");

var orig_bin = document.getElementById('orig_binary');
var orig_dec = document.getElementById('orig_decimal');
var comp_bin = document.getElementById('comp_binary');
var comp_dec = document.getElementById('comp_decimal');
orig_bin.addEventListener('input', function () {
  var binary = (0, _format.format_bin)(this.value);
  var decimal = (0, _conv.bin2dec)(binary);
  var comp = (0, _twoscomp.twoscomp)(binary);
  orig_bin.value = binary;
  comp_bin.value = comp;
  orig_dec.value = decimal;
  comp_dec.value = decimal * -1;
});
comp_bin.addEventListener('input', function () {
  var comp = (0, _format.format_bin)(this.value);
  var binary = (0, _twoscomp.twoscomp)(comp);
  var decimal = (0, _conv.bin2dec)(binary);
  orig_bin.value = binary;
  comp_bin.value = comp;
  orig_dec.value = decimal;
  comp_dec.value = decimal * -1;
});
orig_dec.addEventListener('input', function () {
  var decimal = this.value * 1;
  if (isNaN(decimal)) return;
  var binary = (0, _format.format_bin)((0, _conv.dec2bin)(decimal));
  var comp = (0, _twoscomp.twoscomp)(binary);
  orig_bin.value = binary;
  comp_bin.value = comp;
  comp_dec.value = decimal * -1;
});
comp_dec.addEventListener('input', function () {
  var decimal = this.value * -1;
  if (isNaN(decimal)) return;
  var binary = (0, _format.format_bin)((0, _conv.dec2bin)(decimal));
  var comp = (0, _twoscomp.twoscomp)(binary);
  orig_bin.value = binary;
  comp_bin.value = comp;
  orig_dec.value = decimal;
});

},{"./lib/conv":1,"./lib/format":2,"./lib/twoscomp":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9saWIvY29udi5qcyIsImpzL2xpYi9mb3JtYXQuanMiLCJqcy9saWIvdHdvc2NvbXAuanMiLCJqcy90d29zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0NBOzs7OztBQUtPLElBQU0sT0FBTyxHQUFHLFNBQVYsT0FBVSxDQUFDLEdBQUQsRUFBUztBQUMvQixNQUFJLEdBQUcsR0FBRyxDQUFWO0FBQ0EsRUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxLQUFaLEVBQW1CLEVBQW5CLENBQU4sQ0FGK0IsQ0FJL0I7O0FBQ0EsTUFBSSxHQUFHLENBQUMsT0FBSixDQUFZLEdBQVosTUFBcUIsQ0FBQyxDQUExQixFQUE2QjtBQUM1QixRQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSixDQUFVLEdBQVYsQ0FBWjtBQUNBLFFBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFELENBQWhCO0FBQ0EsSUFBQSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUQsQ0FBWDs7QUFFQSxTQUFLLElBQUksQ0FBQyxHQUFHLENBQWIsRUFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUF6QixFQUFpQyxFQUFFLENBQW5DLEVBQXNDO0FBQ3JDLFVBQUksSUFBSSxDQUFDLENBQUQsQ0FBSixLQUFZLEdBQWhCLEVBQXFCO0FBQ3BCLFFBQUEsR0FBRyxJQUFJLElBQUUsSUFBSSxDQUFDLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBQyxHQUFDLENBQWQsQ0FBVDtBQUNBO0FBQ0Q7QUFDRDs7QUFFRCxFQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSixDQUFVLEVBQVYsRUFBYyxPQUFkLEdBQXdCLElBQXhCLENBQTZCLEVBQTdCLENBQU47O0FBRUEsT0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBSixHQUFhLENBQTFCLEVBQTZCLENBQUMsSUFBSSxDQUFsQyxF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QVk7QUFDOUMsTUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFMLEdBQWEsQ0FBQyxDQUE1QjtBQUNBLE1BQUksS0FBSyxDQUFDLE9BQUQsQ0FBVCxFQUFvQjtBQUVwQixNQUFJLE1BQU0sR0FBRyx3QkFBVyxtQkFBUSxPQUFSLENBQVgsQ0FBYjtBQUNBLE1BQUksSUFBSSxHQUFHLHdCQUFTLE1BQVQsQ0FBWDtBQUVBLEVBQUEsUUFBUSxDQUFDLEtBQVQsR0FBaUIsTUFBakI7QUFDQSxFQUFBLFFBQVEsQ0FBQyxLQUFULEdBQWlCLElBQWpCO0FBQ0EsRUFBQSxRQUFRLENBQUMsS0FBVCxHQUFpQixPQUFqQjtBQUNBLENBVkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbi8qKlxuICogQ29udmVydCBhIGJpbmFyeSBzdHJpbmcgaW50byBpdHMgYmFzZSAxMCBlcXVpdmFsZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gYmluIFRoZSBudW1iZXIgaW4gYmFzZSAyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgbnVtYmVyIGluIGJhc2UgMTBcbiAqL1xuZXhwb3J0IGNvbnN0IGJpbjJkZWMgPSAoYmluKSA9PiB7XG5cdGxldCBkZWMgPSAwO1xuXHRiaW4gPSBiaW4ucmVwbGFjZSgvXFxzL2csICcnKTtcblxuXHQvLyBDb252ZXJ0IHRoZSBmcmFjdGlvbmFsIHBhcnQgZmlyc3Rcblx0aWYgKGJpbi5pbmRleE9mKCcuJykgIT09IC0xKSB7XG5cdFx0bGV0IHBhcnRzID0gYmluLnNwbGl0KCcuJyk7XG5cdFx0bGV0IG1hbnQgPSBwYXJ0c1sxXTtcblx0XHRiaW4gPSBwYXJ0c1swXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgbWFudC5sZW5ndGg7ICsraikge1xuXHRcdFx0aWYgKG1hbnRbal0gPT09ICcxJykge1xuXHRcdFx0XHRkZWMgKz0gMS9NYXRoLnBvdygyLCBqKzEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGJpbiA9IGJpbi5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuXG5cdGZvciAobGV0IGkgPSBiaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcblxuXHRcdGlmIChiaW5baV0gPT09ICcxJykge1xuXHRcdFx0ZGVjICs9IE1hdGgucG93KDIsIGkpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkZWM7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgYSBkZWNpbWFsIG51bWJlciBpbnRvIGl0cyBiaW5hcnkgZXF1aXZhbGVudFxuICogQHBhcmFtIHtudW1iZXJ9IGRlYyBUaGUgbnVtYmVyIGluIGJhc2UgMlxuICogQHBhcmFtIHtudW1iZXJ9IFttYW50X2xpbWl0XSBUaGUgbWF4aW11bSBudW1iZXIgb2YgYml0cyB0byB1c2UgaW4gdGhlIG1hbnRpc3NhXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbnVtYmVyIGluIGJhc2UgMTBcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYzJiaW4gPSAoZGVjLCBtYW50X2xpbWl0KSA9PiB7XG5cdGxldCBiaW4gPSBbXTtcblx0ZGVjICo9IDE7XG5cblx0aWYgKGlzTmFOKGRlYykgfHwgZGVjID09PSAwKSB7XG5cdFx0cmV0dXJuICcwJztcblx0fVxuXG5cdC8vIENvbnZlcnQgdGhlIGZyYWN0aW9uYWwgcGFydCBmaXJzdFxuXHRpZiAoTWF0aC5mbG9vcihkZWMpICE9PSBkZWMpIHtcblx0XHRsZXQgYmluX21hbnQgPSAnLic7XG5cdFx0bGV0IG1hbnQgPSBkZWMgJSAxO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IG1hbnQgIT09IDAgJiYgKCFtYW50X2xpbWl0IHx8IGogPCBtYW50X2xpbWl0KTsgKytqKSB7XG5cdFx0XHRtYW50ICo9IDI7XG5cdFx0XHRiaW5fbWFudCArPSBNYXRoLmZsb29yKG1hbnQpO1xuXHRcdFx0bWFudCAlPSAxO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWMyYmluKE1hdGguZmxvb3IoZGVjKSkgKyBiaW5fbWFudDtcblx0fVxuXG5cdC8vIGZpbmQgYmlnZ2VzdCBzaWduaWZpY2FudCBmaWd1cmVcblx0bGV0IHBvdyA9IE1hdGguZmxvb3IoTWF0aC5sb2coZGVjKS9NYXRoLmxvZygyKSk7XG5cblx0d2hpbGUgKHBvdyA+PSAwKSB7XG5cdFx0aWYgKGRlYyAtIE1hdGgucG93KDIsIHBvdykgPj0gMCkge1xuXHRcdFx0ZGVjIC09IE1hdGgucG93KDIsIHBvdyk7XG5cdFx0XHRiaW5bcG93XSA9ICcxJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmluW3Bvd10gPSAnMCc7XG5cdFx0fVxuXG5cdFx0LS1wb3c7XG5cdH1cblxuXHRyZXR1cm4gYmluLnJldmVyc2UoKS5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIGRlY2ltYWwgbnVtYmVyIGludG8gaXRzIGhleGFkZWNpbWFsIGVxdWl2YWxlbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWMgVGhlIG51bWJlciBpbiBiYXNlIDEwXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgbnVtYmVyIGluIGJhc2UgMTZcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYzJoZXggPSAoZGVjKSA9PiB7XG5cdGNvbnN0IGFscGhhID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuXHRsZXQgaGV4ID0gW107XG5cdGRlYyA9IE1hdGguZmxvb3IoZGVjKTtcblxuXHRpZiAoZGVjID09PSAwKSB7XG5cdFx0cmV0dXJuICcwJztcblx0fVxuXG5cdC8vIGZpbmQgYmlnZ2VzdCBzaWduaWZpY2FudCBmaWd1cmVcblx0bGV0IHBvdyA9IE1hdGguZmxvb3IoTWF0aC5sb2coZGVjKS9NYXRoLmxvZygxNikpO1xuXG5cdHdoaWxlIChwb3cgPj0gMCkge1xuXHRcdGhleFtwb3ddID0gTWF0aC5mbG9vcihkZWMgLyBNYXRoLnBvdygxNiwgcG93KSk7XG5cdFx0aGV4W3Bvd10gPSBhbHBoYS5jaGFyQXQoaGV4W3Bvd10pO1xuXHRcdGRlYyAlPSBNYXRoLnBvdygxNiwgcG93KTtcblx0XHQtLXBvdztcblx0fVxuXG5cdHJldHVybiBoZXgucmV2ZXJzZSgpLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgaGV4YWRlY2ltYWwgbnVtYmVyIGludG8gaXRzIGRlY2ltYWwgZXF1aXZhbGVudFxuICogQHBhcmFtIHtzdHJpbmd9IGhleCBUaGUgbnVtYmVyIGluIGJhc2UgMTZcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBudW1iZXIgaW4gYmFzZSAxMFxuICovXG5leHBvcnQgY29uc3QgaGV4MmRlYyA9IChoZXgpID0+IHtcblx0Y29uc3QgYWxwaGEgPSAnMDEyMzQ1Njc4OUFCQ0RFRic7XG5cdGxldCBkZWMgPSAwO1xuXHRoZXggPSBoZXgudG9VcHBlckNhc2UoKTtcblx0aGV4ID0gaGV4LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG5cblx0Zm9yIChsZXQgaSA9IGhleC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuXHRcdGxldCBkaWdpdCA9IGFscGhhLmluZGV4T2YoaGV4W2ldKTtcblx0XHRkZWMgKz0gTWF0aC5wb3coMTYsIGkpICogZGlnaXQ7XG5cdH1cblxuXHRyZXR1cm4gZGVjO1xufTtcbiIsIlxuLyoqXG4gKiBGb3JtYXQgYSBkZWNpbWFsIG51bWJlciBmb3IgZGlzcGxheS5cbiAqIEFkZHMgY29sdW1uIHNlcGFyYXRvcnMgYW5kIHJlbW92ZXMgbGVhZGluZyB6ZXJvcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVjIFRoZSB1bmZvcm1hdHRlZCBkZWNpbWFsIG51bWJlclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdF9kZWMgPSAoZGVjKSA9PiB7XG5cdGxldCBtYW50aXNzYSA9ICcnO1xuXG5cdC8vIGNvbnZlcnQgdG8gc3RyaW5nXG5cdGRlYyArPSAnJztcblxuXHQvLyByZW1vdmUgY29sdW1uc1xuXHRkZWMgPSBkZWMucmVwbGFjZSgvXFxzL2csICcnKTtcblxuXHQvLyByZW1vdmUgbWFudGlzc2Fcblx0aWYgKGRlYy5pbmRleE9mKCcuJykgIT09IC0xKSB7XG5cdFx0bGV0IHBhcnRzID0gZGVjLnNwbGl0KCcuJyk7XG5cdFx0bWFudGlzc2EgKz0gJy4nICsgcGFydHNbMV07XG5cdFx0ZGVjID0gcGFydHNbMF07XG5cdH1cblxuXHQvLyByZW1vdmUgbGVhZGluZyB6ZXJvc1xuXHRkZWMgPSBkZWMucmVwbGFjZSgvXjArKFsxLTldKS8sICckMScpO1xuXG5cdC8vIGFkZCBjb2x1bW5zXG5cdGxldCBwYWRkaW5nID0gMyAtIGRlYy5sZW5ndGggJSAzO1xuXHRpZiAocGFkZGluZyA9PT0gMykgcGFkZGluZyA9IDA7XG5cdGRlYyA9ICcgJy5yZXBlYXQocGFkZGluZykgKyBkZWM7XG5cdGRlYyA9IGRlYy5yZXBsYWNlKC8oLnszfSkvZywgJyQxICcpLnRyaW0oKTtcblxuXHRyZXR1cm4gZGVjICsgbWFudGlzc2E7XG59O1xuXG4vKipcbiAqIEZvcm1hdCBhIGJpbmFyeSBudW1iZXIgYnkgcGFkZGluZyBpdCBvdXQgd2l0aCB6ZXJvcyBhbmQgYWRkaW5nIGNvbHVtbiBzZXBhcmF0b3JzXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluIFRoZSB1bmZvcm1hdHRlZCBiaW5hcnkgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gW2JpdHNdIEZvcmNlIG51bWJlciB0byBvY2N1cHkgYSBzZXQgbnVtYmVyIG9mIGJpdHNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgYmluYXJ5IG51bWJlclxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0X2JpbiA9IChiaW4sIGJpdHMpID0+IHtcblx0bGV0IG1hbnRpc3NhID0gJyc7XG5cdGJpbiArPSAnJztcblxuXHQvLyByZW1vdmUgY29sdW1uc1xuXHRiaW4gPSBiaW4ucmVwbGFjZSgvXFxzL2csICcnKTtcblxuXHQvLyByZW1vdmUgbWFudGlzc2Fcblx0aWYgKGJpbi5pbmRleE9mKCcuJykgIT09IC0xKSB7XG5cdFx0bGV0IHBhcnRzID0gYmluLnNwbGl0KCcuJyk7XG5cdFx0Y29uc29sZS5sb2cocGFydHMpO1xuXHRcdG1hbnRpc3NhID0gJy4nICsgcGFydHNbMV07XG5cdFx0YmluID0gcGFydHNbMF07XG5cdH1cblxuXHQvLyByZW1vdmUgbGVhZGluZyB6ZXJvc1xuXHRiaW4gPSBiaW4ucmVwbGFjZSgvXjArKFteMF0pLywgJyQxJyk7XG5cblx0bGV0IHBhZGRpbmcgPSAwO1xuXG5cdGlmIChiaXRzKSB7XG5cdFx0cGFkZGluZyA9IGJpdHMgLSBiaW4ubGVuZ3RoO1xuXHR9IGVsc2Uge1xuXHRcdHBhZGRpbmcgPSA0IC0gYmluLmxlbmd0aCAlIDQ7XG5cdFx0aWYgKHBhZGRpbmcgPT09IDQpIHBhZGRpbmcgPSAwO1xuXHR9XG5cblx0YmluID0gJzAnLnJlcGVhdChwYWRkaW5nKSArIGJpbjtcblx0YmluID0gYmluLnJlcGxhY2UoLyguezR9KS9nLCAnJDEgJykudHJpbSgpO1xuXG5cdHJldHVybiBiaW4gKyBtYW50aXNzYTtcbn07XG4iLCIvKipcbiAqIEZpbmQgdGhlIHR3bydzIGNvbXBsZW1lbnQgb2YgYSBiaW5hcnkgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluIFRoZSBvcmlnaW5hbCBkZWNpbWFsIG51bWJlclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHR3bydzIGNvbXBsZW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IHR3b3Njb21wID0gKGJpbikgPT4ge1xuXHRjb25zdCBvcmlnID0gYmluLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG5cdGNvbnN0IGJpdHMgPSBvcmlnLmxlbmd0aDtcblx0bGV0IGNvbXAgPSBbXTtcblxuXHRsZXQgaSA9IDA7XG5cblx0d2hpbGUgKGkgPCBiaXRzICYmIG9yaWdbaV0gIT09ICcxJykge1xuXHRcdGNvbXBbaV0gPSBvcmlnW2ldO1xuXHRcdCsraTtcblx0fVxuXG5cdGlmIChpID49IGJpdHMpIHtcblx0XHRyZXR1cm4gY29tcC5yZXZlcnNlKCkuam9pbignJyk7XG5cdH1cblxuXHRjb21wW2ldID0gJzEnO1xuXHQrK2k7XG5cblx0d2hpbGUgKGkgPCBiaXRzKSB7XG5cdFx0aWYgKG9yaWdbaV0gPT09ICcxJykge1xuXHRcdFx0Y29tcFtpXSA9ICcwJztcblx0XHR9IGVsc2UgaWYgKG9yaWdbaV0gPT09ICcwJykge1xuXHRcdFx0Y29tcFtpXSA9ICcxJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29tcFtpXSA9IG9yaWdbaV07XG5cdFx0fVxuXG5cdFx0KytpO1xuXHR9XG5cblx0cmV0dXJuIGNvbXAucmV2ZXJzZSgpLmpvaW4oJycpO1xufTtcbiIsImltcG9ydCB7Zm9ybWF0X2Jpbn0gZnJvbSAnLi9saWIvZm9ybWF0JztcbmltcG9ydCB7YmluMmRlYywgZGVjMmJpbn0gZnJvbSAnLi9saWIvY29udic7XG5pbXBvcnQge3R3b3Njb21wfSBmcm9tICcuL2xpYi90d29zY29tcCc7XG5cbmNvbnN0IG9yaWdfYmluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29yaWdfYmluYXJ5Jyk7XG5jb25zdCBvcmlnX2RlYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmlnX2RlY2ltYWwnKTtcbmNvbnN0IGNvbXBfYmluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXBfYmluYXJ5Jyk7XG5jb25zdCBjb21wX2RlYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wX2RlY2ltYWwnKTtcblxub3JpZ19iaW4uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG5cdGxldCBiaW5hcnkgPSBmb3JtYXRfYmluKHRoaXMudmFsdWUpO1xuXHRsZXQgZGVjaW1hbCA9IGJpbjJkZWMoYmluYXJ5KTtcblx0bGV0IGNvbXAgPSB0d29zY29tcChiaW5hcnkpO1xuXG5cdG9yaWdfYmluLnZhbHVlID0gYmluYXJ5O1xuXHRjb21wX2Jpbi52YWx1ZSA9IGNvbXA7XG5cblx0b3JpZ19kZWMudmFsdWUgPSBkZWNpbWFsO1xuXHRjb21wX2RlYy52YWx1ZSA9IGRlY2ltYWwgKiAtMTtcbn0pO1xuXG5jb21wX2Jpbi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcblx0bGV0IGNvbXAgPSBmb3JtYXRfYmluKHRoaXMudmFsdWUpO1xuXHRsZXQgYmluYXJ5ID0gdHdvc2NvbXAoY29tcCk7XG5cdGxldCBkZWNpbWFsID0gYmluMmRlYyhiaW5hcnkpO1xuXG5cdG9yaWdfYmluLnZhbHVlID0gYmluYXJ5O1xuXHRjb21wX2Jpbi52YWx1ZSA9IGNvbXA7XG5cblx0b3JpZ19kZWMudmFsdWUgPSBkZWNpbWFsO1xuXHRjb21wX2RlYy52YWx1ZSA9IGRlY2ltYWwgKiAtMTtcbn0pO1xuXG5vcmlnX2RlYy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcblx0bGV0IGRlY2ltYWwgPSB0aGlzLnZhbHVlICogMTtcblx0aWYgKGlzTmFOKGRlY2ltYWwpKSByZXR1cm47XG5cblx0bGV0IGJpbmFyeSA9IGZvcm1hdF9iaW4oZGVjMmJpbihkZWNpbWFsKSk7XG5cdGxldCBjb21wID0gdHdvc2NvbXAoYmluYXJ5KTtcblxuXHRvcmlnX2Jpbi52YWx1ZSA9IGJpbmFyeTtcblx0Y29tcF9iaW4udmFsdWUgPSBjb21wO1xuXHRjb21wX2RlYy52YWx1ZSA9IGRlY2ltYWwgKiAtMTtcbn0pO1xuXG5cbmNvbXBfZGVjLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuXHRsZXQgZGVjaW1hbCA9IHRoaXMudmFsdWUgKiAtMTtcblx0aWYgKGlzTmFOKGRlY2ltYWwpKSByZXR1cm47XG5cblx0bGV0IGJpbmFyeSA9IGZvcm1hdF9iaW4oZGVjMmJpbihkZWNpbWFsKSk7XG5cdGxldCBjb21wID0gdHdvc2NvbXAoYmluYXJ5KTtcblxuXHRvcmlnX2Jpbi52YWx1ZSA9IGJpbmFyeTtcblx0Y29tcF9iaW4udmFsdWUgPSBjb21wO1xuXHRvcmlnX2RlYy52YWx1ZSA9IGRlY2ltYWw7XG59KTtcbiJdfQ==

//# sourceMappingURL=twos.js.map
