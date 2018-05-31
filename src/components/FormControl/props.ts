import {ICommonProps, IChildren} from '../UIEXComponentProps';

/**
 * Properties of component FormControl.
 *
 * @prop {IChildren} [caption] Form control caption title.
 * @prop {string | number} [size] Quantity of columns of FormControlsGroup.
 * @prop {Function} onChange Change handler when FormControl changed.
 */
interface IFormControlProps extends ICommonProps {
	caption?: IChildren;
	size?: string | number;
	onChange: (name: string, value: string, checked?: boolean) => void;
}