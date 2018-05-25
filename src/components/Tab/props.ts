import {ICommonProps, EColor, ESize} from '../UIEXComponentProps';

/**
 * Properties of component Button.
 *
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will return on mouse click.
 * @prop {ESize} [size] Size of button (small|medium|large|huge|giant).
 * @prop {EColor} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {string | number | boolean} [border] Border width (no border if is false).
 * @prop {boolean} [single] If Tabs component has multiple values, single tab will reset the values to just one value.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
interface IButtonProps extends ICommonProps {
	href?: string;
	target?: string;
	value?: any;	
	size?: ESize;
	color?: EColor;
	border?: string | number | boolean;	
	single?: boolean;
	onClick?: (value?: any) => void;
	onDisabledClick?: (value?: any) => void;
}