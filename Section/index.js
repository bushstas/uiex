'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Section = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _proptypes = require('./proptypes');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['borderWidth', 'borderColor', 'borderStyle', 'borderRadius', 'bgColor', 'padding'];

var SectionComponent = function (_UIEXComponent) {
	_inherits(SectionComponent, _UIEXComponent);

	function SectionComponent() {
		_classCallCheck(this, SectionComponent);

		return _possibleConstructorReturn(this, (SectionComponent.__proto__ || Object.getPrototypeOf(SectionComponent)).apply(this, arguments));
	}

	_createClass(SectionComponent, [{
		key: 'getCustomStyle',
		value: function getCustomStyle() {
			return this.state.customStyle;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props = this.props,
			    children = _props.children,
			    caption = _props.caption,
			    note = _props.note;

			var TagName = this.getTagName();

			return _react2.default.createElement(
				TagName,
				this.getProps(),
				(caption || note) && _react2.default.createElement(
					'div',
					{ className: 'uiex-section-caption', style: this.getStyle('caption') },
					caption,
					note && _react2.default.createElement(
						'div',
						{ className: 'uiex-section-note', style: this.getStyle('note') },
						note
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-section-content', style: this.getStyle('content') },
					children
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref) {
			var add = _ref.add,
			    nextProps = _ref.nextProps,
			    isChangedAny = _ref.isChangedAny;

			if (isChangedAny()) {
				var customStyle = {};
				var borderColor = nextProps.borderColor,
				    borderWidth = nextProps.borderWidth,
				    borderStyle = nextProps.borderStyle,
				    borderRadius = nextProps.borderRadius,
				    backgroundColor = nextProps.bgColor,
				    padding = nextProps.padding;

				borderWidth = (0, _utils.getNumberInPxOrPercent)(borderWidth);
				padding = (0, _utils.getNumberInPxOrPercent)(padding);
				borderRadius = (0, _utils.getNumberInPxOrPercent)(borderRadius);
				if (padding) {
					customStyle.padding = padding;
				}
				if (borderWidth) {
					customStyle.borderWidth = borderWidth;
				}
				if (borderColor) {
					customStyle.borderColor = borderColor;
				}
				if (borderStyle) {
					customStyle.borderStyle = borderStyle;
				}
				if (borderRadius) {
					customStyle.borderRadius = borderRadius;
				}
				if (backgroundColor) {
					customStyle.backgroundColor = backgroundColor;
				}
				add('customStyle', customStyle);
			}
		}
	}]);

	return SectionComponent;
}(_UIEXComponent2.UIEXComponent);

SectionComponent.propTypes = _proptypes.SectionPropTypes;
SectionComponent.styleNames = ['caption', 'note', 'content'];
SectionComponent.displayName = 'Section';
var Section = exports.Section = (0, _stateMaster.withStateMaster)(SectionComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);