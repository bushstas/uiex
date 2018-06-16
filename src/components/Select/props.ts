import {ICommonProps, EIconType} from '../UIEXComponentProps';

interface ISelectOptions {
	title: string;
	value: string | number;
	icon?: string;
	iconType?: string;
}

/**
 * Properties of component Select.
 *
 * @prop {string} name Input name.
 * @prop {string} value Input value.
 * @prop {string} [placeholder] Select empty value placeholder.
 * @prop {string} [empty] Select empty option title (..... if true).
 * @prop {string} [EIconType] Type of options icons.
 * @prop {ISelectOptions[] | (string | number)[]} [options] Array of options data.
 * @prop {Function} onChange Select value change handler.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled select.
 */
interface ISelectProps extends ICommonProps {
	name: string;
	value: string | number;
	placeholder?: string;
	empty?: boolean | string;
	iconType?: EIconType;
	options?: ISelectOptions[] | (string | number)[];
	onChange: (value: string | number, name: string) => void;
	onFocus: (value: string | number, name: string) => void;
	onBlur: (value: string | number, name: string) => void;
	onDisabledClick?: (name: string) => void;
}