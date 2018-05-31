import {ICommonProps, IStyle, EInputFilter} from '../UIEXComponentProps';

/**
 * Properties of component Input.
 *
 * @prop {string} [type] Input type.
 * @prop {string} name Input name.
 * @prop {string} value Input value.
 * @prop {string} [placeholder] Input placeholder.
 * @prop {boolean} [readOnly] Input readOnly property.
 * @prop {boolean} [textarea] Textarea flag.
 * @prop {boolean} [clearable] With "clear" button flag.
 * @prop {boolean} [valid] Valid input status flag.
 * @prop {boolean} [invalid] Invalid input status flag.
 * @prop {IStyle} [focusStyle] Focused input style.
 * @prop {IStyle} [clearButtonStyle] Clear button style.
 * @prop {EInputFilter} [filter] Input filter name (number|email|phone|url|key|date|time).
 * @prop {Function} [customFilter] Input custom filter function that returns proper value.
 * @prop {number | string} [maxLength] Input max length.
 * @prop {number} [minValue] Input numeric min value (only for number filter).
 * @prop {number} [maxValue] Input numeric max value (only for number filter).
 * @prop {string | number} [defaultValue] Input value if value is empty (input cannot be empty).
 * @prop {string} [measure] Input value measure at right.
 * @prop {Function} onChange Input value change handler.
 * @prop {Function} [onFocus] Input focus handler.
 * @prop {Function} [onBlur] Input blur handler.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled input.
 */
interface IInputProps extends ICommonProps {
	type?: string;
	name: string;
	value: string;
	placeholder?: string;
	readOnly?: boolean;
	textarea?: boolean;
	clearable?: boolean;
	valid?: boolean;
	invalid?: boolean;
	focusStyle?: IStyle;
	clearButtonStyle?: IStyle;
	filter?: EInputFilter;
	customFilter?: (value: string) => string;
	maxLength?: number | string;
	minValue?: number;
	maxValue?: number;
	defaultValue?: string | number;
	measure?: string;
	onChange: (value: string, name: string) => void;
	onFocus: (value: string, name: string) => void;
	onBlur: (value: string, name: string) => void;
	onDisabledClick?: (name: string) => void;
}