'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LineAwesomeIcon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent = require('../../UIEXComponent');

var _proptypes = require('../proptypes');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineAwesomeIcon = exports.LineAwesomeIcon = function (_UIEXIcon) {
	_inherits(LineAwesomeIcon, _UIEXIcon);

	function LineAwesomeIcon() {
		_classCallCheck(this, LineAwesomeIcon);

		return _possibleConstructorReturn(this, (LineAwesomeIcon.__proto__ || Object.getPrototypeOf(LineAwesomeIcon)).apply(this, arguments));
	}

	_createClass(LineAwesomeIcon, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('la');
			add('la-' + this.props.name);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			return _react2.default.createElement('i', this.getProps());
		}
	}]);

	return LineAwesomeIcon;
}(_UIEXComponent.UIEXIcon);

LineAwesomeIcon.propTypes = _proptypes.IconPropTypes;
LineAwesomeIcon.className = 'icon';