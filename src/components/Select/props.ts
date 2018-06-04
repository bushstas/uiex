import {ICommonProps} from '../UIEXComponentProps';

interface ISelectOptions {
 title: string;
 value: string | number;
}

/**
 * Properties of component Select.
 *
 * @prop {string} name Input name.
 * @prop {string} value Input value.
 * @prop {string} [placeholder] Select empty value placeholder.
 * @prop {ISelectOptions[] | (string | number)[]} [options] Array of options data.
 * @prop {boolean} [animated] With animation if is is true.
 * @prop {Function} onChange Select value change handler.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled select.
 */
interface ISelectProps extends ICommonProps {
	name: string;
	value: string | number;
	placeholder?: string;
	options?: ISelectOptions[] | (string | number)[];
	animated?: boolean;
	onChange: (value: string | number, name: string) => void;
	onFocus: (value: string | number, name: string) => void;
	onBlur: (value: string | number, name: string) => void;
	onDisabledClick?: (name: string) => void;
}