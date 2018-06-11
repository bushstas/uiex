import {ICommonProps} from '../UIEXComponentProps';

/**
 * Properties of component FormControlsGroup.
 *
 * @prop {string | number} [columns] Quantity of columns for flex container (default = 10).
 * @prop {string | number} [controlSize] Default size of controls.
 * @prop {string | number} [sideMargin] Space between controls in pixels (default = 12).
 * @prop {Function} [onChange] Change handler when FormControl changed.
 */
interface IFormControlsGroupProps extends ICommonProps {
	columns?: string | number;
	controlSize?: string | number;
	sideMargin?: string | number;
	onChange?: (name: string, value: string, checked?: boolean) => void;
}