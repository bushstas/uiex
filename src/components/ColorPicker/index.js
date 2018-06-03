var ColorPicker = function() {
	ExtendUI(this);
	this.color = 'FFFFFF';
	this.scrollElement = Dom.getElementByClass('page');
	this.rgb = {};
	this.hsv = {};
};
ColorPicker.prototype.decorateInternal = function() {
	Styles.setStyle(this.element, {'backgroundColor': this.getColor()});
	this.container           = Dom.createElement('div'  , {'class': 'color-picker'}, this.element);
	this.colorSelectorDiv    = Dom.createElement('div'  , {'class': 'color-selector'}, this.container);
	this.colorSelectorCloser = Dom.createElement('div'  , {'class': 'color-close'}, this.colorSelectorDiv);
	this.inputBox            = Dom.createElement('input', {'class': 'color-input', 'type': 'text', 'maxlength': '6', 'value': this.color}, this.colorSelectorDiv);
	this.satValDiv           = Dom.createElement('div'  , {'class': 'color-satval'}, this.colorSelectorDiv);
	this.satValImg           = Dom.createElement('div'  , {'class': 'color-satvalimg'}, this.satValDiv);
	this.crossHairs          = Dom.createElement('div'  , {'class': 'color-crosshairs'}, this.satValDiv);
	this.hueDiv              = Dom.createElement('div'  , {'class': 'color-hue'}, this.colorSelectorDiv);
	this.huePos              = Dom.createElement('div'  , {'class': 'color-huepos'}, this.hueDiv);
	this.hueSelectorImg      = Dom.createElement('div'  , {'class': 'color-hueimg'}, this.hueDiv);
	this.addEvent('click',  this.element, this.show);
	this.addEvent('change', this.inputBox, this.inputBoxChanged);
	this.addEvent('blur',   this.inputBox, this.inputBoxChanged);
	this.addEvent('click',  this.colorSelectorCloser, this.hide);
	this.addEvent('click',  this.container, this.stop);
	this.addEvent('mousedown',  this.satValDiv, this.satMouseDown);
	this.addEvent('mousedown',  this.hueDiv, this.hueMouseDown);
	this.inputBoxChanged();
};
ColorPicker.prototype.satMouseDown = function(e) {
	var coords = this.fixCoords(this.satValDiv, e.clientX, e.clientY),
		lastX = coords.x, lastY = coords.y;
	this.satValDragged(coords.x, coords.y);
	var moveHandler = (function(e) {
		var coords = this.fixCoords(this.satValDiv, e.pageX || e.clientX, e.pageY || e.clientY);
		if (coords.x != lastX || coords.y != lastY) {
			lastX = coords.x;
			lastY = coords.y;
			this.satValDragged(coords.x, coords.y);
		}
	}).bind(this);
	var upHandler = (function(e) {
		Events.unlisten(document.body, 'mouseup', upHandler);
		Events.unlisten(document.body, 'mousemove', moveHandler);
	}).bind(this);
	Events.listen(document.body, 'mouseup', upHandler);
	Events.listen(document.body, 'mousemove', moveHandler);
	e.preventDefault();
};
ColorPicker.prototype.hueMouseDown = function(e) {
	var coords = this.fixCoords(this.satValDiv, e.clientX, e.clientY),
		lastX = coords.x, lastY = coords.y;
	this.hueDragged(coords.x, coords.y);
	var moveHandler = (function(e) {
		var coords = this.fixCoords(this.satValDiv, e.pageX || e.clientX, e.pageY || e.clientY);
		if (coords.x != lastX || coords.y != lastY) {
			lastX = coords.x;
			lastY = coords.y;
			this.hueDragged(coords.x, coords.y);
		}
	}).bind(this);
	var upHandler = (function(e) {
		Events.unlisten(document.body, 'mouseup', upHandler);
		Events.unlisten(document.body, 'mousemove', moveHandler);
	}).bind(this);
	Events.listen(document.body, 'mouseup', upHandler);
	Events.listen(document.body, 'mousemove', moveHandler);
	e.preventDefault();
};
ColorPicker.prototype.fixCoords = function(node, x, y) {
	var nodePageCoords = this.pageCoords(node),
		sy = this.scrollElement.scrollTop,
		sx = this.scrollElement.scrollLeft;
	x = x - nodePageCoords.x + sx;
	y = y - nodePageCoords.y + sy; 
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
	if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
	return {x: x, y: y};
};
ColorPicker.prototype.stop = function(e) {
	e.stopPropagation();
};
ColorPicker.prototype.show = function(e) {
	Events.listenOnce(document.body, 'click', this.hide.bind(this));
	e.stopPropagation();
	Styles.fadeIn(this.container);
};
ColorPicker.prototype.hide = function(e) {
	Styles.fadeOut(this.container);
};
ColorPicker.prototype.hexToRgb = function(hexString, default_) {
	if (default_ === undefined) default_ = null;
	if (hexString.substr(0, 1) == '#') {
		hexString = hexString.substr(1); 
	}
	var r, g, b;
	if (hexString.length == 3) {
		r = hexString.substr(0, 1);
		r += r;
		g = hexString.substr(1, 1);
		g += g;
		b = hexString.substr(2, 1);
		b += b;
	} else if (hexString.length == 6) {
		r = hexString.substr(0, 2);
		g = hexString.substr(2, 2);
		b = hexString.substr(4, 2);
	} else {
		return default_;
	}
	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);
	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		return default_;
	} else {
		return {r: r / 255, g: g / 255, b: b / 255};
	}
};
ColorPicker.prototype.rgbToHex = function(r, g, b, includeHash) {
	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);
	if (!Variables.isNone(includeHash)) {
		includeHash = true;
	}
	r = r.toString(16);
	if (r.length == 1) {
		r = '0' + r;
	}
	g = g.toString(16);
	if (g.length == 1) {
		g = '0' + g;
	}
	b = b.toString(16);
	if (b.length == 1) {
		b = '0' + b;
	}
	return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
};
ColorPicker.prototype.hsvToRgb = function(hue, saturation, value) {
	var red, green, blue;
	if (value == 0.0) {
		red = 0;
		green = 0;
		blue = 0;
	} else {
		var i = Math.floor(hue * 6),
			f = (hue * 6) - i,
			p = value * (1 - saturation),
			q = value * (1 - (saturation * f)),
			t = value * (1 - (saturation * (1 - f)));
		switch (i) {
			case 1:
				red = q;
				green = value;
				blue = p;
			break
			case 2:
				red = p;
				green = value;
				blue = t;
			break
			case 3: 
				red = p;
				green = q;
				blue = value;
			break
			case 4: 
				red = t;
				green = p;
				blue = value;
			break
			case 5: 
				red = value;
				green = p;
				blue = q;
			break
			case 6:
			case 0:
				red = value;
				green = t;
				blue = p;
			break
		}
	}
	return {r: red, g: green, b: blue};
};
ColorPicker.prototype.rgbToHsv = function(red, green, blue) {
	var max = Math.max(Math.max(red, green), blue),
		min = Math.min(Math.min(red, green), blue),
		hue, saturation, value = max;
	if (min == max) {
		hue = 0;
		saturation = 0;
	} else {
		var delta = max - min;
		saturation = delta / max;
		if (red == max) {
			hue = (green - blue) / delta;
		} else if (green == max) {
			hue = 2 + ((blue - red) / delta);
		} else { 
			hue = 4 + ((red - green) / delta);
		}
		hue /= 6;
		if (hue < 0) {
			hue += 1;
		}
		if (hue > 1) {
			hue -= 1;
		}
	}
	return {h: hue, s: saturation, v: value};
};
ColorPicker.prototype.inputBoxChanged = function() {
	this.rgb = this.hexToRgb(this.inputBox.value, {r: 0, g: 0, b: 0});
	this.rgbChanged();
};
ColorPicker.prototype.rgbChanged = function() {
	this.hsv = this.rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b);
	this.colorChanged();
};
ColorPicker.prototype.hsvChanged = function() {
	this.rgb = this.hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v);
	this.colorChanged();
};
ColorPicker.prototype.hueDragged = function(x, y) {
	this.hsv.h = y / 199;
	this.hsvChanged();
};
ColorPicker.prototype.satValDragged = function(x, y) {
	this.hsv.s = 1 - (y / 199);
	this.hsv.v = (x / 199);
	this.hsvChanged();
};
ColorPicker.prototype.colorChanged = function() {
	var hex    = this.rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b),
		hueRgb = this.hsvToRgb(this.hsv.h, 1, 1),
		hueHex = this.rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
	this.inputBox.value = hex;
	this.color = hex;
	Styles.setStyle(this.element, {'backgroundColor': '#' + hex});
	Styles.setStyle(this.satValDiv, {'backgroundColor': '#' + hueHex});
	Styles.setStyle(this.crossHairs, {'left': ((this.hsv.v * 199) - 10).toString() + 'px', 'top': (((1 - this.hsv.s) * 199) - 10).toString() + 'px'});
	Styles.setStyle(this.huePos, {'top': ((this.hsv.h * 199) - 5).toString() + 'px'});
};
ColorPicker.prototype.pageCoords = function(node) {
	var x = node.offsetLeft,
		y = node.offsetTop,
		parent = node.offsetParent;
	while (parent !== null) {
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {x: x, y: y};
};
ColorPicker.prototype.setColor = function(color) {
	this.color = color.replace(/#/, '');
	Styles.setStyle(this.element, {'backgroundColor': '#' + color});
	this.inputBox.value = color;
	this.inputBoxChanged();
};
ColorPicker.prototype.getColor = function() {
	return '#' + this.color;
};
ExtendUI(ColorPicker);