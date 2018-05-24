/**
 * Common properties of components.
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 * @prop {boolean} [disabled] Disability flag.
 * @prop {string | number} [width] Component main element width.
 * @prop {boolean} [block] Displayed as block.
 * @prop {string} [float] Adds style float (left|right).
 */
export interface ICommonProps {
	title?: string;
	classes?: string | string[];	
	className?: string;
	children?: string | JSX.Element | JSX.Element[];
	disabled?: boolean;
	width?: string | number;
	block?: boolean;
	float?: string;
}