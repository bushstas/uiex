import {ICommonProps, EAnimationEffect, IChildren} from '../UIEXComponentProps';
import {IBoxProps} from '../Box/props';

/**
 * Properties of component Box.
 *
 * @prop {IChildren} caption Title of a section.
 */
interface IBoxProps extends IBoxProps {
	caption: IChildren;
}