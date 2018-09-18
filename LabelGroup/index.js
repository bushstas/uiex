'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LabelGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var LabelGroup = exports.LabelGroup = function (_UIEXComponent) {
	_inherits(LabelGroup, _UIEXComponent);

	function LabelGroup() {
		_classCallCheck(this, LabelGroup);

		return _possibleConstructorReturn(this, (LabelGroup.__proto__ || Object.getPrototypeOf(LabelGroup)).apply(this, arguments));
	}

	_createClass(LabelGroup, [{
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var _props = this.props,
			    labelColor = _props.labelColor,
			    labelWidth = _props.labelWidth,
			    labelHeight = _props.labelHeight,
			    labelStyle = _props.labelStyle,
			    gradient = _props.gradient,
			    removable = _props.removable;


			if (gradient && typeof child.props.gradient == 'undefined') {
				props.gradient = true;
			}
			if (removable && typeof child.props.removable == 'undefined') {
				props.removable = true;
			}
			if (labelColor && !child.props.color) {
				props.color = labelColor;
			}
			if (labelWidth && !child.props.width) {
				props.width = labelWidth;
			}
			if (labelHeight && !child.props.height) {
				props.height = labelHeight;
			}
			if (labelStyle instanceof Object) {
				if (child.props.style instanceof Object) {
					props.style = _extends({}, labelStyle, child.props.style);
				} else {
					props.style = labelStyle;
				}
			}
			if (typeof child.props.onClick != 'function') {
				props.onClick = this.props.onClickLabel;
			}
			if (typeof child.props.onDisabledClick != 'function') {
				props.onDisabledClick = this.props.onDisabledClick;
			}
			if (removable || child.props.removable) {
				props.onRemove = this.props.onRemoveLabel;
			}
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-label-group-inner' },
					this.renderChildren()
				)
			);
		}
	}]);

	return LabelGroup;
}(_UIEXComponent2.UIEXComponent);

LabelGroup.propTypes = _proptypes.LabelGroupPropTypes;
LabelGroup.className = 'label-group';
LabelGroup.properChildren = 'Label';
LabelGroup.onlyProperChildren = true;
LabelGroup.displayName = 'LabelGroup';