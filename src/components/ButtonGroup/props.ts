import {IButtonsProps} from '../UIEXComponentProps';

/**
 * Properties of component ButtonGroup.
 *
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 */
interface IButtonGroupProps extends IButtonsProps {
	onClick?: (value?: any) => void;
}