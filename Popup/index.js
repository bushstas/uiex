'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Popup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent = require('../UIEXComponent');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = 'isOpen';

var PopupComponent = function (_UIEXBoxContainer) {
	_inherits(PopupComponent, _UIEXBoxContainer);

	function PopupComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PopupComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PopupComponent.__proto__ || Object.getPrototypeOf(PopupComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (e) {
			e.stopPropagation();
		}, _this.handleBodyClick = function (e) {
			if (!_this.isOwnChild(e.target)) {
				var onCollapse = _this.props.onCollapse;

				if (typeof onCollapse == 'function') {
					onCollapse();
				}
				_this.removeBodyClickHandler();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PopupComponent, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.removeBodyClickHandler();
			_get(PopupComponent.prototype.__proto__ || Object.getPrototypeOf(PopupComponent.prototype), 'componentWillUnmount', this).call(this);
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('open', this.props.isOpen);
		}
	}, {
		key: 'addBodyClickHandler',
		value: function addBodyClickHandler() {
			document.body.addEventListener('mousedown', this.handleBodyClick, false);
		}
	}, {
		key: 'removeBodyClickHandler',
		value: function removeBodyClickHandler() {
			document.body.removeEventListener('mousedown', this.handleBodyClick, false);
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onMouseDown: this.handleMouseDown
			};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var content = this.renderChildren();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ ref: 'inner', className: this.getClassName('inner') },
					content
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var _this2 = this;

			var isChanged = _ref2.isChanged,
			    nextProps = _ref2.nextProps,
			    call = _ref2.call,
			    isInitial = _ref2.isInitial;

			if (isChanged('isOpen')) {
				call(function () {
					if (nextProps.isOpen) {
						_this2.addBodyClickHandler();
					} else if (!isInitial) {
						_this2.removeBodyClickHandler();
					}
				});
			}
		}
	}]);

	return PopupComponent;
}(_UIEXComponent.UIEXBoxContainer);

PopupComponent.propTypes = _proptypes.PopupPropTypes;
PopupComponent.displayName = 'Popup';
var Popup = exports.Popup = (0, _stateMaster.withStateMaster)(PopupComponent, PROPS_LIST, null, _UIEXComponent.UIEXBoxContainer);