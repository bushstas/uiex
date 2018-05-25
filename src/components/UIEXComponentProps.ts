/**
 * Common properties of components.
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 * @prop {boolean} [disabled] Disability flag.
 * @prop {string | number} [width] Component main element width.
 * @prop {string | number} [fontSize] Component main element font size.
 * @prop {boolean} [block] Displayed as block.
 * @prop {string} [float] Adds style float (left|right).
 * @prop {boolean} [hidden] Component won't be rendered if true.
 */
export interface ICommonProps {
	title?: string;
	classes?: string | string[];	
	className?: string;
	children?: string | JSX.Element | JSX.Element[];
	disabled?: boolean;
	width?: string | number;
	fontSize?: string | number;
	block?: boolean;
	float?: string;
	hidden?: boolean;
}

export enum EAlign {
	LEFT = <any>'left',
    CENTER = <any>'center',
    RIGHT = <any>'right'
}

export enum EColor {
	BLACK = <any>'black',
    GRAY = <any>'gray',
    WHITE = <any>'white',
    RED = <any>'red',
    BLUE = <any>'blue',
    YELLOW = <any>'yellow',
    ORANGE = <any>'orange'
}

export enum ESize {
	SMALL = <any>'small',
    MEDIUM = <any>'medium',
    LARGE = <any>'large',
    HUGE = <any>'huge'
}