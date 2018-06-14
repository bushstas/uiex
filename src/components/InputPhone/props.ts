import {IInputProps} from '../Input/props';

/**
 * Properties of component PhoneInput.
 *
 * @prop {string | number} [code] Country code text to display in input.
 * @prop {string | number} [numericCode] Country code number to add to value in numeric mode.
 * @prop {string} mask Input value mask with X (XXX-XX-XX).
 * @prop {boolean} [numeric] (Numeric mode) Returns numeric value on change else masked.
 * @prop {boolean} [withCode] Returns value width code added if it's given.
 */
interface IPhoneInputProps extends IInputProps {
	code?: string | number;
	numericCode?: string | number;
	mask?: string;
	numeric?: boolean;
	withCode?: boolean;
}