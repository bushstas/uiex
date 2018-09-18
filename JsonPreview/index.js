'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.JsonPreview = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TAB = {
	1: "\t",
	2: "\t\t",
	3: "\t\t\t",
	4: "\t\t\t\t",
	5: "\t\t\t\t\t",
	6: "\t\t\t\t\t\t",
	7: "\t\t\t\t\t\t\t",
	8: "\t\t\t\t\t\t\t\t",
	9: "\t\t\t\t\t\t\t\t\t",
	10: "\t\t\t\t\t\t\t\t\t\t"
};

var JsonPreview = exports.JsonPreview = function (_UIEXComponent) {
	_inherits(JsonPreview, _UIEXComponent);

	function JsonPreview() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, JsonPreview);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JsonPreview.__proto__ || Object.getPrototypeOf(JsonPreview)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			var _this$props = _this.props,
			    data = _this$props.data,
			    onClick = _this$props.onClick;

			if (data instanceof Object && data.jsonPreviewInfo) {
				data = data.value;
			}
			if (typeof onClick == 'function') {
				onClick(data);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(JsonPreview, [{
		key: 'initRendering',
		value: function initRendering() {
			this.tab = 0;
			this.content = '';
			this.info = null;
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.handleClick
			};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var data = this.props.data;

			this.renderData(data);
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement('pre', { dangerouslySetInnerHTML: { __html: this.content } }),
				this.renderInfo()
			);
		}
	}, {
		key: 'renderInfo',
		value: function renderInfo() {
			if (this.info) {
				return _react2.default.createElement(
					'div',
					{ className: this.getClassName('info') },
					this.info
				);
			}
		}
	}, {
		key: 'renderData',
		value: function renderData(data) {
			var isObject = data instanceof Object;
			var isArray = data instanceof Array;
			var isElement = data instanceof Element;
			var isRegExp = data instanceof RegExp;
			var isFunction = data instanceof Function;
			var isPromise = data instanceof Promise;

			if (isObject && !isElement && !isRegExp && !isFunction && !isPromise) {
				if (isArray) {
					return this.renderArray(data);
				} else {
					if (data.jsonPreviewInfo) {
						this.info = data.jsonPreviewInfo;
						data = data.value;
						return this.renderData(data);
					}
					return this.renderObject(data);
				}
			}
			var item = this.getItem(data);
			this.renderLine(item);
		}
	}, {
		key: 'renderArray',
		value: function renderArray(arr) {
			var isComma = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var isValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			this.renderLine(this.wrapWithTag('[', 'sign'), false, isValue);
			this.addTab();
			for (var i = 0; i < arr.length; i++) {
				var _isComma = i < arr.length - 1;
				var item = this.getItem(arr[i], _isComma);
				if (item) {
					this.renderLine(item, _isComma);
				}
			}
			this.addTab(-1);
			this.renderLine(this.wrapWithTag(']', 'sign') + (isComma ? ',' : ''));
		}
	}, {
		key: 'renderObject',
		value: function renderObject(obj) {
			var isComma = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var isValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			this.renderLine(this.wrapWithTag('{', 'sign'), false, isValue);
			this.addTab();
			var keys = Object.keys(obj);
			var lastKey = keys[keys.length - 1];
			for (var k in obj) {
				var key = this.getKey(k);
				var _isComma2 = k != lastKey;
				this.renderLineStart(key + ': ');
				var item = this.getItem(obj[k], _isComma2, true);
				if (item) {
					this.renderLineEnd(item, _isComma2);
				}
			}
			this.addTab(-1);
			this.renderLine(this.wrapWithTag('}', 'sign') + (isComma ? ',' : ''));
		}
	}, {
		key: 'getItem',
		value: function getItem(item, isComma) {
			var isValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
				case 'symbol':
					return this.wrapWithTag(item.toString(), 'symbol');

				case 'string':
					return this.wrapWithTag('"' + item + '"', 'string');

				case 'number':
					return this.wrapWithTag(item, 'number');

				case 'boolean':
					return this.wrapWithTag(item.toString(), 'boolean');

				case 'undefined':
					return this.wrapWithTag('undefined', 'undefined');

				case 'function':
					return this.wrapWithTag('Function', 'function');

				case 'object':
					if (item === null) {
						return this.wrapWithTag('null', 'null');
					}
					if (item instanceof Element) {
						return this.wrapWithTag('Element', 'element');
					}
					if (item instanceof RegExp) {
						return this.wrapWithTag(item.toString(), 'regexp');
					}
					if (item instanceof Array) {
						return this.renderArray(item, isComma, isValue);
					}
					if (item instanceof Promise) {
						return this.wrapWithTag('Promise', 'promise');
					}
					return this.renderObject(item, isComma, isValue);

			}
		}
	}, {
		key: 'renderLine',
		value: function renderLine(line) {
			var addComma = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var isWithoutTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			this.content += (!isWithoutTab ? this.getTab() : '') + line + this.getComma(addComma) + "\n";
		}
	}, {
		key: 'renderLineStart',
		value: function renderLineStart(start) {
			this.content += this.getTab() + start;
		}
	}, {
		key: 'renderLineEnd',
		value: function renderLineEnd(end) {
			var addComma = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			this.content += end + this.getComma(addComma) + "\n";
		}
	}, {
		key: 'addTab',
		value: function addTab() {
			var add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			this.tab += add;
		}
	}, {
		key: 'getTab',
		value: function getTab() {
			var quantity = this.tab;
			if (!quantity) {
				return '';
			}
			if (TAB[quantity]) {
				return TAB[quantity];
			}
			var tab = '';
			for (var i = 0; i < quantity; i++) {
				tab += "\t";
			}
			return tab;
		}
	}, {
		key: 'getComma',
		value: function getComma(isComma) {
			return isComma ? this.wrapWithTag(',', 'sign') : '';
		}
	}, {
		key: 'wrapWithTag',
		value: function wrapWithTag(item, className) {
			var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'span';

			return '<' + tagName + ' class="' + this.getClassName(className) + '">' + item + '</' + tagName + '>';
		}
	}, {
		key: 'getKey',
		value: function getKey(key) {
			return this.wrapWithTag(key, 'key');
		}
	}]);

	return JsonPreview;
}(_UIEXComponent2.UIEXComponent);

JsonPreview.propTypes = _proptypes.JsonPreviewPropTypes;
JsonPreview.className = 'json-preview';
JsonPreview.displayName = 'JsonPreview';