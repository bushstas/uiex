import {ICommonProps} from '../UIEXComponentProps';

/**
 * Properties of component FormControlsGroup.
 *
 * @prop {string | number} columns Quantity of columns for flex container.
 * @prop {string | number} sideMargin Space between controls in pixels.
 * @prop {Function} onChange Change handler when FormControl changed.
 */
interface IFormControlsGroupProps extends ICommonProps {
	columns?: string | number;
	sideMargin?: string | number;
	onChange: (name: string, value: string, checked?: boolean) => void;
}