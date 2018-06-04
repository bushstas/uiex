import {EIconType} from '../UIEXComponentProps';

/**
 * Properties of component Icon.
 *
 * @prop {string} name Icon name.
 * @prop {EIconType} [type] Icon type (material|awesome).
 */
interface IIconProps {
	name: string;
	type?: EIconType;
}