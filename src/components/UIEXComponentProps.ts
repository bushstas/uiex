/**
 * Common properties of components.
 *
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of uiex native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 
 * @prop {string | number} [width] Component main element width.
 * @prop {string | number} [height] Component main element height.
 * @prop {IStyle} [style] Component main element style.
 
 * @prop {boolean} [disabled] Disability flag.
 * @prop {EAlign} [align] Content align (left|center|right).
 * @prop {EValign} [valign] Content vertical flex align (top|center|bottom).
 * @prop {boolean} [block] Displayed as block.
 * @prop {EFloat} [float] Adds style float (left|right).
 * @prop {boolean} [hidden] Component won't be rendered if true.
 */
export interface ICommonProps {
	title?: string;
	classes?: string | string[];	
	className?: string;
	children?: string | JSX.Element | JSX.Element[];
	
	width?: string | number;
	height?: string | number;
	style?: IStyle;
	
	disabled?: boolean;
	align?: EAlign;
	valign?: EValign;
	block?: boolean;
	float?: EFloat;
	hidden?: boolean;
}

/**
 * Common properties of button group components.
 *
 * @prop {EColor} [buttonColor] Buttons' color.
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {string | number} [buttonHeight] Buttons' height.
 * @prop {IStyle} [buttonStyle] Buttons' style.
 * @prop {string | number} [iconSize] Buttons' icon size.
 * @prop {EIconType} [iconType] Buttons' icon type (material|awesome).
 * @prop {boolean} [iconAtRight] Buttons' icons are placed at right.
 * @prop {boolean} [vertical] Buttons are displayed vertically as blocks.
 */
export interface IButtonsProps extends ICommonProps {
	buttonColor?: EColor;
	buttonWidth?: string | number;
	buttonHeight?: string | number;
	buttonStyle?: IStyle;
	iconSize?: string | number;
	iconType?: EIconType;
	iconAtRight?: boolean;
	vertical?: boolean;
}


export enum EAlign {
	LEFT = <any>'left',
    CENTER = <any>'center',
    RIGHT = <any>'right'
}

export enum EValign {
	TOP = <any>'top',
    CENTER = <any>'center',
    BOTTOM = <any>'bottom'
}

export enum EFloat {
	LEFT = <any>'left',
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

export interface EIconType {
	MATERIAL = <any>'material',
	AWESOME = <any>'awesome'
}

export interface IStyle {}