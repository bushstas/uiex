import {ICommonProps, EAlign, EColor} from '../UIEXComponentProps';

/**
 * Properties of component ButtonGroup.
 * @prop {boolean} [vertical] Buttons are displayed vertically as blocks.
 * @prop {EAlign} [align] Buttons position (left|center|right).
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {EColor} [buttonColor] Buttons' color.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 */
interface IButtonGroupProps extends ICommonProps {
	vertical?: boolean;
	align?: EAlign;
	buttonWidth?: string | number;
	buttonColor?: EColor;
	onClick?: (value?: any) => void;
}