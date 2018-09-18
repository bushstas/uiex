'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UIEXFormPropTypes = exports.ButtonsPropTypes = exports.UIEXComponentPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _consts = require('./consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UIEXComponentPropTypes = exports.UIEXComponentPropTypes = {
    title: _propTypes2.default.string,
    className: _propTypes2.default.string,
    tagName: _propTypes2.default.string,
    width: _consts.PROPTYPE.STRNUM,
    height: _consts.PROPTYPE.STRNUM,
    style: _propTypes2.default.object,
    disabled: _propTypes2.default.bool,
    align: _consts.PROPTYPE.ALIGN,
    valign: _consts.PROPTYPE.VALIGN,
    float: _consts.PROPTYPE.FLOAT,
    block: _propTypes2.default.bool,
    hidden: _propTypes2.default.bool,
    vertical: _propTypes2.default.bool
};

var ButtonsPropTypes = exports.ButtonsPropTypes = _extends({}, UIEXComponentPropTypes, {
    buttonColor: _consts.PROPTYPE.COLORS,
    buttonWidth: _consts.PROPTYPE.STRNUM,
    buttonHeight: _consts.PROPTYPE.STRNUM,
    buttonStyle: _propTypes2.default.object,
    iconSize: _consts.PROPTYPE.STRNUM,
    iconType: _consts.PROPTYPE.ICON_TYPES,
    iconAtRight: _propTypes2.default.bool,
    view: _consts.PROPTYPE.BUTTONS_VIEWS
});

var UIEXFormPropTypes = exports.UIEXFormPropTypes = _extends({}, UIEXComponentPropTypes, {
    value: _consts.PROPTYPE.STRNUM,
    caption: _consts.PROPTYPE.REACT_NODES,
    captionInside: _propTypes2.default.bool,
    contentBefore: _consts.PROPTYPE.REACT_NODES,
    buttonDisplay: _consts.PROPTYPE.FORM_BUTTON_DISPLAY,
    buttonColor: _consts.PROPTYPE.COLORS,
    buttonWidth: _consts.PROPTYPE.STRNUM,
    buttonHeight: _consts.PROPTYPE.STRNUM,
    noBorder: _propTypes2.default.bool,
    onSubmit: _propTypes2.default.func,
    onChange: _propTypes2.default.func
});