import {ICommonProps} from '../UIEXComponentProps';

/**
 * Properties of component Select.
 *
 * @prop {string} name Input name.
 * @prop {string} value Input value.
 * @prop {string} [placeholder] Select empty value placeholder.
 * @prop {Function} onChange Select value change handler.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled select.
 */
interface ISelectProps extends ICommonProps {
	name: string;
	value: string;
	placeholder?: string;
	onChange: (value: string, name: string) => void;
	onFocus: (value: string, name: string) => void;
	onBlur: (value: string, name: string) => void;
	onDisabledClick?: (name: string) => void;
}