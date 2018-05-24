import {ICommonProps} from '../props';

/**
 * Properties of component ButtonGroup.
 * @prop {boolean} [vertical] Buttons are displayed vertically as blocks.
 * @prop {EButtonGroupAlign} [align] Buttons position (left|center|right).
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 */
interface IButtonGroupProps extends ICommonProps {
	vertical?: boolean;
	align?: EButtonGroupAlign;
	buttonWidth?: string | number;
	onClick?: (value?: any) => void;
}

enum EButtonGroupAlign {
	LEFT = <any>'left',
    CENTER = <any>'center',
    RIGHT = <any>'right'
}