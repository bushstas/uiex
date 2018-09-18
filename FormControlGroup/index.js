'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormControlGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CellGroup2 = require('../CellGroup');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormControlGroup = exports.FormControlGroup = function (_CellGroup) {
	_inherits(FormControlGroup, _CellGroup);

	function FormControlGroup() {
		_classCallCheck(this, FormControlGroup);

		return _possibleConstructorReturn(this, (FormControlGroup.__proto__ || Object.getPrototypeOf(FormControlGroup)).apply(this, arguments));
	}

	_createClass(FormControlGroup, [{
		key: 'addChildProps',
		value: function addChildProps(child, props, idx) {
			_get(FormControlGroup.prototype.__proto__ || Object.getPrototypeOf(FormControlGroup.prototype), 'addChildProps', this).call(this, child, props, idx);
			var _child$props = child.props,
			    onChange = _child$props.onChange,
			    className = _child$props.className;

			props.className = (0, _utils.addToClassName)(className, props.className);
			props.className = (0, _utils.addToClassName)('uiex-cell', props.className);
			if (typeof onChange != 'function') {
				props.onChange = this.props.onChange;
			}
		}
	}]);

	return FormControlGroup;
}(_CellGroup2.CellGroup);

FormControlGroup.propTypes = _proptypes.FormControlGroupPropTypes;
FormControlGroup.properChildren = 'FormControl';
FormControlGroup.className = 'form-control-group';
FormControlGroup.additionalClassName = 'cell-group';
FormControlGroup.onlyProperChildren = true;
FormControlGroup.defaultColumns = 10;
FormControlGroup.defaultCellMargin = 12;
FormControlGroup.defaultCellSize = 2;
FormControlGroup.displayName = 'FormControlGroup';