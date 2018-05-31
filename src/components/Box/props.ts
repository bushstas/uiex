import {ICommonProps, EAnimationEffect} from '../UIEXComponentProps';

/**
 * Properties of component Box.
 *
 * @prop {boolean} isOpen Flag that box is open.
 * @prop {boolean} inverted Flag that direction of animation is inverted.
 * @prop {boolean} fading Flag that animation has additional fading effect.
 * @prop {string | number} speed Animation speed from 1 to 10. (1 - fastest).
 * @prop {EAnimationEffect} effect Animation effect (linear|ease|ease-in|ease-out|ease-in-out).
 * @prop {string} button Text of button for open and close actions (for example Open/Close).
 * @prop {boolean} buttonUnder Flag shows that the button is under the box.
 * @prop {Function} onToggle Toggle box handler.
 */
interface IBoxProps extends ICommonProps {
	isOpen: boolean;
	inverted?: boolean;
	fading?: boolean;
	speed?: string | number;
	effect?: EAnimationEffect;
	button?: string;
	buttonUnder?: boolean;
	onToggle?: () => void;
}