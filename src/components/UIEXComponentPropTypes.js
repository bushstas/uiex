import PropTypes from 'prop-types';
import {PROPTYPE} from './consts';

export const UIEXComponentPropTypes = {
    children: PROPTYPE.REACT_NODES,
    title: PropTypes.string,
    className: PropTypes.string,
    width: PROPTYPE.STRNUM,
    height: PROPTYPE.STRNUM,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    align: PROPTYPE.ALIGN,
    valign: PROPTYPE.VALIGN,
    float: PROPTYPE.FLOAT,
    block: PropTypes.bool,
    hidden: PropTypes.bool,
    vertical: PropTypes.bool
}

export const ButtonsPropsTypes = {
    ...UIEXComponentPropTypes,
    buttonColor: PROPTYPE.COLORS,
    buttonWidth: PROPTYPE.STRNUM,
    buttonHeight: PROPTYPE.STRNUM,
    buttonStyle: PropTypes.object,
    iconSize: PROPTYPE.STRNUM,
    iconType: PROPTYPE.ICON_TYPES,
    iconAtRight: PropTypes.bool,
    view: PROPTYPE.BUTTONS_VIEWS
}