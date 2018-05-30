import {ICommonProps, EColor, IChildren} from '../UIEXComponentProps';
import {IButtonProps} from '../Button/props';

/**
 * Properties of component Tab.
 *
 * @prop {string} caption Text of a tab button.
 * @prop {boolean} [single] If Tabs component has multiple values, single tab will reset the values to just one value.
 */
interface ITabProps extends IButtonProps {
	caption: IChildren;
	single?: boolean;
}