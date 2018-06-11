import {ICommonProps, IFormData, IChildren} from '../UIEXComponentProps';

/**
 * Properties of component Form.
 *
 * @prop {IChildren} [caption] Form caption title.
 * @prop {string | number} [columns] Quantity of columns for control groups.
 * @prop {string | number} [controlSize] Default size of controls.
 * @prop {string | number} [lineMargin] Vertical space between control groups in pixels (default = 15).
 * @prop {string} [submit] Submit button title.
 * @prop {string} [clear] Clear button title.
 * @prop {Function} onChange Change handler when FormControl changed.
 */
interface IFormProps extends ICommonProps {
	caption?: IChildren;
	columns?: string | number;
	controlSize?: string | number;
	lineMargin?: string | number;
	submit?: string;
	clear?: string;
	onChange: (name: string, value: string, checked?: boolean) => void;
}