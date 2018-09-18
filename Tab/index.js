'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Tab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button2 = require('../Button');

var _Icon = require('../Icon');

var _proptypes = require('./proptypes');

require('../style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = exports.Tab = function (_Button) {
	_inherits(Tab, _Button);

	function Tab() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Tab);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    value = _this$props.value,
			    disabled = _this$props.disabled,
			    onSelect = _this$props.onSelect,
			    onDisabledSelect = _this$props.onDisabledSelect,
			    single = _this$props.single;


			if (!disabled) {
				if (typeof onSelect == 'function') {
					onSelect(value, single);
				}
			} else if (typeof onDisabledSelect == 'function') {
				onDisabledSelect(value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tab, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), 'addClassNames', this).call(this, add);
			add('button');
			add('after-active', this.props.afterActive);
		}
	}, {
		key: 'renderInternalChildren',
		value: function renderInternalChildren() {
			return this.props.caption;
		}
	}]);

	return Tab;
}(_Button2.Button);

Tab.propTypes = _proptypes.TabPropTypes;
Tab.displayName = 'Tab';