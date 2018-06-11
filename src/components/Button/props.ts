import {ICommonProps, EColor} from '../UIEXComponentProps';

/**
 * Properties of component Button.
 *
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will be returned on mouse click.
 * @prop {EColor} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {boolean} [gradient] Gradient used if it is true.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
export interface IButtonProps extends ICommonProps {
	href?: string;
	target?: string;
	value?: any;	
	color?: EColor;
	gradient?: boolean;
	onClick?: (value?: any) => void;
	onDisabledClick?: (value?: any) => void;
}