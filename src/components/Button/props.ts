/**
 * Properties of component Button.
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will return on mouse click.
 * @prop {boolean} [disabled] Disability flag.
 * @prop {string | number} [width] Button minimal width.
 * @prop {EButtonSize} [size] Size of button (small|medium|large|huge|giant).
 * @prop {EButtonColor} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {string | number | boolean} [border] Border width (no border if is false).
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
interface IButtonProps {
	title?: string;
	classes?: string | string[];	
	className?: string;
	children?: string | JSX.Element | JSX.Element[];	
	href?: string;
	target?: string;
	value?: any;v
	disabled?: boolean;
	width?: string | number;
	size?: EButtonSize;
	color?: EButtonColor;
	border?: string | number | boolean;
	onClick?: (value?: any) => void;
	onDisabledClick?: (value?: any) => void;
}

enum EButtonColor {
	BLACK = <any>'black',
    GRAY = <any>'gray',
    WHITE = <any>'white',
    RED = <any>'red',
    BLUE = <any>'blue',
    YELLOW = <any>'yellow',
    ORANGE = <any>'orange'
}

enum EButtonSize {
	SMALL = <any>'small',
    MEDIUM = <any>'medium',
    LARGE = <any>'large',
    HUGE = <any>'huge'
}