import {ICommonProps, IChildren} from '../UIEXComponentProps';

/**
 * Properties of component FormControl.
 *
 * @prop {IChildren} [caption] Form control caption title.
 * @prop {string | number} [size] Size of control depends on FormControlsGroup columns.
 * @prop {string | number} [shift] Left margin of control depends on FormControlsGroup columns.
 * @prop {Function} onChange Change handler when FormControl changed.
 */
interface IFormControlProps extends ICommonProps {
	caption?: IChildren;
	size?: string | number;
	shift?: string | number;
	onChange: (name: string, value: string, checked?: boolean) => void;
}