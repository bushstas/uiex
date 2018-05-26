/**
 * Common properties of components.
 *
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 
 * @prop {string | number} [width] Component main element width.
 * @prop {string | number} [height] Component main element height.
 * @prop {string | number} [fontSize] Component main element fontSize. 
 * @prop {string | number} [radius] Component main element borderRadius. 
 * @prop {string | number} [borderWidth] Component main element borderWidth.
 
 * @prop {boolean} [disabled] Disability flag.
 * @prop {EAlign} [align] Content align (left|center|right).
 * @prop {EAlign} [valign] Content vertical flex align (left|center|right).
 * @prop {boolean} [block] Displayed as block.
 * @prop {string} [float] Adds style float (left|right).
 * @prop {boolean} [hidden] Component won't be rendered if true.
 */
export interface ICommonProps {
	title?: string;
	classes?: string | string[];	
	className?: string;
	children?: string | JSX.Element | JSX.Element[];
	
	width?: string | number;
	height?: string | number;
	fontSize?: string | number;
	radius?: string | number;
	borderWidth?: string | number;
	
	disabled?: boolean;
	align?: EAlign;
	valign?: EAlign;
	block?: boolean;
	float?: string;
	hidden?: boolean;
}

/**
 * Common properties of button group components.
 *
 * @prop {EColor} [buttonColor] Buttons' color.
 * @prop {string | number} [buttonWidth] Tab buttons' width.
 * @prop {string | number} [buttonHeight] Tab buttons' height. 
 * @prop {string | number} [iconSize] Buttons' icon size.
 * @prop {EIconType} [iconType] Buttons' icon type (material|awesome).
 * @prop {boolean} [iconAtRight] Buttons' icons are placed at right.
 * @prop {boolean} [vertical] Buttons are displayed vertically as blocks.
 */
export interface IButtonsProps extends ICommonProps {
	buttonColor?: EColor;
	buttonWidth?: string | number;
	buttonHeight?: string | number;
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