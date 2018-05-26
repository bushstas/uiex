import {ICommonProps, EIconType} from '../UIEXComponentProps';

/**
 * Properties of component Icon.
 *
 * @prop {string} name Icon name.
 * @prop {EIconType} [type] Icon type (material|awesome).
 */
interface IIconProps extends ICommonProps {
	name: string;
	type?: EIconType;
}