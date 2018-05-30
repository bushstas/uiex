import {ICommonProps, IFormData, IChildren} from '../UIEXComponentProps';

/**
 * Properties of component Form.
 *
 * @prop {IChildren} [caption] Form caption title.
 * @prop {Function} onChange Change handler when FormControl changed.
 */
interface ICheckboxProps extends ICommonProps {
	caption?: IChildren;	
	onChange: (name: string, value: string, checked?: boolean) => void;
}