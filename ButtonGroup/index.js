'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ButtonGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent = require('../UIEXComponent');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = exports.ButtonGroup = function (_UIEXButtons) {
	_inherits(ButtonGroup, _UIEXButtons);

	function ButtonGroup() {
		_classCallCheck(this, ButtonGroup);

		return _possibleConstructorReturn(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
	}

	_createClass(ButtonGroup, [{
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			this.addCommonButtonsProps(child, props);
			if (typeof child.props.onClick != 'function') {
				props.onClick = this.props.onClick;
			}
			if (typeof child.props.onDisabledClick != 'function') {
				props.onDisabledClick = this.props.onDisabledClick;
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
					{ className: 'uiex-button-group-inner' },
					this.renderChildren()
				)
			);
		}
	}]);

	return ButtonGroup;
}(_UIEXComponent.UIEXButtons);

ButtonGroup.propTypes = _proptypes.ButtonGroupPropTypes;
ButtonGroup.className = 'button-group';
ButtonGroup.properChildren = 'Button';
ButtonGroup.displayName = 'ButtonGroup';