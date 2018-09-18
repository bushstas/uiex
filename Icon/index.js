'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Icon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _MaterialIcon = require('./MaterialIcon');

var _FontAwesomeIcon = require('./FontAwesomeIcon');

var _LineAwesomeIcon = require('./LineAwesomeIcon');

var _FoundationIcon = require('./FoundationIcon');

var _LigatureSymbolsIcon = require('./LigatureSymbolsIcon');

var _GenericonsIcon = require('./GenericonsIcon');

var _GlyphiconsIcon = require('./GlyphiconsIcon');

var _IoniconsIcon = require('./IoniconsIcon');

var _IcomoonIcon = require('./IcomoonIcon');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = 'style';

var IconComponent = function (_UIEXComponent) {
	_inherits(IconComponent, _UIEXComponent);

	function IconComponent() {
		_classCallCheck(this, IconComponent);

		return _possibleConstructorReturn(this, (IconComponent.__proto__ || Object.getPrototypeOf(IconComponent)).apply(this, arguments));
	}

	_createClass(IconComponent, [{
		key: 'render',
		value: function render() {
			var TypedIcon = _MaterialIcon.MaterialIcon;
			switch (this.props.type) {
				case 'FontAwesome':
					TypedIcon = _FontAwesomeIcon.FontAwesomeIcon;
					break;

				case 'LineAwesome':
					TypedIcon = _LineAwesomeIcon.LineAwesomeIcon;
					break;

				case 'Foundation':
					TypedIcon = _FoundationIcon.FoundationIcon;
					break;

				case 'LigatureSymbols':
					TypedIcon = _LigatureSymbolsIcon.LigatureSymbolsIcon;
					break;

				case 'Genericons':
					TypedIcon = _GenericonsIcon.GenericonsIcon;
					break;

				case 'Glyphicons':
					TypedIcon = _GlyphiconsIcon.GlyphiconsIcon;
					break;

				case 'Ionicons':
					TypedIcon = _IoniconsIcon.IoniconsIcon;
					break;

				case 'IcoMoon':
					TypedIcon = _IcomoonIcon.IcomoonIcon;
					break;
			}
			return _react2.default.createElement(TypedIcon, _extends({}, this.props, { style: this.state.style }));
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref) {
			var add = _ref.add,
			    isChanged = _ref.isChanged,
			    nextProps = _ref.nextProps;

			if (isChanged('style')) {
				if (this.constructor.defaultStyles instanceof Object) {
					add('style', _extends({}, this.constructor.defaultStyles.main, nextProps.style));
				} else {
					add('style');
				}
			}
		}
	}]);

	return IconComponent;
}(_UIEXComponent2.UIEXComponent);

IconComponent.displayName = 'Icon';
var Icon = exports.Icon = (0, _stateMaster.withStateMaster)(IconComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);