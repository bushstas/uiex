import {ICommonProps, EIconType, IStyle} from '../UIEXComponentProps';

/**
 * Properties of component Checkbox.
 *
 * @prop {string} name Control name.
 * @prop {boolean} checked Control checked status. Undetermined if null.
 * @prop {any} [value] Control value.
 * @prop {string | boolean} [icon] Control marker icon. Check icon if true.
 * @prop {EIconType} [iconType] Control marker icon type (material|awesome).
 * @prop {IStyle} [controlStyle] Style of control element.
 * @prop {IStyle} [markerStyle] Style of control marker element.
 * @prop {IStyle} [labelStyle] Style of label element.
 * @prop {Function} [onChange] Change handler on enabled checkbox.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled checkbox.
 */
interface ICheckboxProps extends ICommonProps {
	name: string;
	checked: boolean;
	value?: any;
	icon?: string | boolean;
	iconType?: EIconType;
	controlStyle?: IStyle;
	markerStyle?: IStyle;
	labelStyle?: IStyle;
	onChange?: (checked: boolean, name: string, value: any) => void;
	onDisabledClick?: (name: string) => void;
}