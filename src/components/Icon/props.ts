import {ICommonProps} from '../UIEXComponentProps';

/**
 * Properties of component Icon.
 *
 * @prop {string} name Icon name.
 * @prop {string | number} [size] Icon font size.
 */
interface IIconProps extends ICommonProps {
	name: string;
	size?: string | number;
}