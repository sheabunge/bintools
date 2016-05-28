(function () {
    'use strict';

    var App = function (elements) {
        this.el = elements;

        this.el.bits = {};
        this.bits = {};

        var parts = ['sign', 'exp', 'mantissa'];
        for (var i = 0; i < 3; i++) {
            var p = parts[i];

            this[p] = '0';

            this.el.bits[p] = this.el[p].querySelector('.bits');
            this.bits[p] = this.el.bits[p].childElementCount;
        }
    };

    App.prototype.get_word_len = function () {
        return this.bits.sign + this.bits.exp + this.bits.mantissa;
    };

    App.prototype.set_word_len = function (new_len) {
        var old_len = this.get_word_len();
        this.bits.mantissa += new_len - old_len;
    };

    App.prototype.enable_sign = function () {
        this.bits.sign = 1;
        this.el.sign.style.display = 'block';
    };

    App.prototype.disable_sign = function () {
        this.bits.sign = 0;
        this.el.sign.style.display = 'none';
    };

    App.prototype.pad = function (s, length, char) {
        s += '';
        char = char || '0';

        while (s.length < length) {
            s = char + s;
        }

        return s;
    };

    App.prototype.get_exp_format = function () {
        return document.querySelector('input[name=exp_format]:checked').value;
    };

    App.prototype.output_binary = function () {
        console.log(this.sign + ' ' + this.exp + ' ' + this.mantissa);
        this.el.bits.sign.innerHTML = '<span class="bit">' + this.sign + '</span>';

        var bit;
        var exp_html = '';

        for (var i = 0; i < this.bits.exp; ++i) {
            bit = i < this.exp.length ? this.exp[i] : '0';
            exp_html += '<span class="bit">' + bit + '</span>';
        }
        this.el.bits.exp.innerHTML = exp_html;
        this.el.exp.style.display = exp_html === '' ? 'none' : 'block';

        var mantissa_html = '';

        for (i = 0; i < this.bits.mantissa; ++i) {
            bit = i < this.mantissa.length ? this.mantissa[i] : '0';
            mantissa_html += '<span class="bit">' + bit + '</span>';
        }
        this.el.bits.mantissa.innerHTML = mantissa_html;
        this.el.mantissa.style.display = mantissa_html === '' ? 'none' : 'block';
    };

    App.prototype.update = function () {
        this.output_binary();

        this.el.config.sign_bit.checked = this.bits.sign;
        this.el.config.exp_len.value = this.bits.exp;
        this.el.config.mantissa_len.value = this.bits.mantissa;
        this.el.config.word_len.value = this.get_word_len();
    };

    App.prototype.set_decimal = function (dec) {
        // calculate sign
        this.sign = dec < 0 ? '1' : '0';
        dec = Math.abs(dec);

        // convert to binary
        var exp = 0;
        var mantissa = dec2bin(dec);

        // normalise mantissa
        if (mantissa < 1) {
            mantissa = mantissa.replace(/^0./, '');
            for (var i = 0; mantissa[i] == '0'; ++i, --exp) {
            }
            mantissa = mantissa.substr(i);
        } else {
            // calculate exponent
            var int = (Math.floor(mantissa * 1) + '');
            exp = '0' == int ? 0 : int.length;
            mantissa = mantissa.replace(/^0+|0+$|\./g, '');
        }

        // convert to required size
        if (mantissa.length > this.mantissa.bits) {
            mantissa = mantissa.substr(0, this.bits.mantissa);
        }

        this.mantissa = mantissa;

        var negative_exp = exp < 0;
        exp = dec2bin(Math.abs(exp));

        if (this.get_exp_format() == 'signed') {
            // convert exponent to signed magnitude
            exp = (negative_exp ? '1' : '0') + exp;
            exp = this.pad(exp, this.bits.exp);
        } else {
            // convert exponent to two's complement

            if (negative_exp) {
                exp = twoscomp(this.pad(exp, this.bits.exp));
            } else {
                exp = this.pad(exp, this.bits.exp);
            }
        }

        this.exp = exp;
    };

    App.prototype.set_binary = function (sign, exp, mantissa) {
        this.sign = sign;
        this.exp = exp;
        this.mantissa = mantissa;
    };

    var elements = {
        dec: document.getElementById('decimal'),
        sign: document.querySelector('.sign'),
        exp: document.querySelector('.exp'),
        mantissa: document.querySelector('.mantissa'),
        config: {
            sign_bit: document.getElementById('sign_bit'),
            exp_len: document.getElementById('exp_length'),
            mantissa_len: document.getElementById('mantissa_length'),
            word_len: document.getElementById('word_length')
        }
    };

    var app = new App(elements);
    app.update();

    app.el.dec.oninput = function () {
        var dec = this.value.trim();

        if (!dec.match(/-?\d+/)) {
            console.log(dec + ' is not a valid number');
            app.set_binary('0', '0', '0');
            app.output_binary();
            return;
        }

        app.set_decimal(dec);
        app.output_binary();
    };

    app.el.config.sign_bit.onchange = function () {
        if (this.checked) {
            app.enable_sign();
            app.bits.mantissa += 1;
        } else {
            app.disable_sign();
            app.bits.mantissa -= 1;
        }

        app.update();
    };

    app.el.config.exp_len.oninput = function () {
        app.bits.exp = parseInt(this.value);
        app.update();
    };

    app.el.config.mantissa_len.oninput = function () {
        app.bits.mantissa = parseInt(this.value);
        app.update();
    };

    app.el.config.word_len.oninput = function () {
        app.set_word_len(parseInt(this.value));
        app.update();
    };

    window.app = app;
})();
