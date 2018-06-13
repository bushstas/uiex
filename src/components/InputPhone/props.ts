import {IInputProps} from '../Input/props';

/**
 * Properties of component PhoneInput.
 *
 * @prop {string | number} [code] Country code text.
 * @prop {string} [mask] Input value mask with X (XXX-XX-XX).
 * @prop {boolean} [numeric] Returns numeric value on change else masked.
 * @prop {boolean} [withCode] Returns value width code added if it's given.
 */
interface IPhoneInputProps extends IInputProps {
	code?: string | string[];
	mask?: string;
	numeric?: boolean;
	withCode?: boolean;
}