import {ICommonProps, IFormData, IChildren} from '../UIEXComponentProps';

/**
 * Properties of component Form.
 *
 * @prop {IChildren} [caption] Form caption title.
 * @prop {Function} onChange Change handler when FormControl changed.
 * @prop {Function} [onSubmit] Submit handler when FormSubmit clicked.
 * @prop {Function} [onAction] Action handler when FormAction clicked.
 */
interface ICheckboxProps extends ICommonProps {
	caption?: IChildren;
	onChange: (name: string, value: string, checked?: boolean) => void;
	onSubmit?: () => void;
	onAction?: (action: string) => void;
}