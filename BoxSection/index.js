'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BoxSection = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Box = require('../Box');

var _Icon = require('../Icon');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = 'isOpen';

var BoxSectionComponent = function (_UIEXComponent) {
	_inherits(BoxSectionComponent, _UIEXComponent);

	function BoxSectionComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, BoxSectionComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BoxSectionComponent.__proto__ || Object.getPrototypeOf(BoxSectionComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			var disabled = _this.props.disabled;

			if (!disabled) {
				var isOpen = _this.state.isOpen;

				_this.setState({ isOpen: !isOpen });
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(BoxSectionComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('icon-at-right', this.props.iconAtRight);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props = this.props,
			    caption = _props.caption,
			    children = _props.children,
			    iconAtRight = _props.iconAtRight,
			    className = _props.className,
			    note = _props.note,
			    boxProps = _objectWithoutProperties(_props, ['caption', 'children', 'iconAtRight', 'className', 'note']);

			var isOpen = this.state.isOpen;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-box-section-caption', onClick: this.handleClick },
					_react2.default.createElement(_Icon.Icon, { name: isOpen ? 'expand_less' : 'expand_more' }),
					_react2.default.createElement(
						'span',
						null,
						caption
					)
				),
				note && _react2.default.createElement(
					'div',
					{ className: 'uiex-box-section-note', onClick: this.handleClick },
					note
				),
				_react2.default.createElement(
					_Box.Box,
					_extends({}, boxProps, { isOpen: isOpen }),
					children
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var addIfChanged = _ref2.addIfChanged;

			addIfChanged('isOpen');
		}
	}]);

	return BoxSectionComponent;
}(_UIEXComponent2.UIEXComponent);

BoxSectionComponent.propTypes = _proptypes.BoxSectionPropTypes;
BoxSectionComponent.className = 'box-section';
BoxSectionComponent.displayName = 'BoxSection';
var BoxSection = exports.BoxSection = (0, _stateMaster.withStateMaster)(BoxSectionComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);