import {ICommonProps, EColor} from '../UIEXComponentProps';

/**
 * Properties of component Tab.
 *
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will return on mouse click.
 * @prop {EColor} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {boolean} [single] If Tabs component has multiple values, single tab will reset the values to just one value.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
interface ITabProps extends ICommonProps {
	href?: string;
	target?: string;
	value?: any;	
	color?: EColor;
	single?: boolean;
	onClick?: (value?: any) => void;
	onDisabledClick?: (value?: any) => void;
}