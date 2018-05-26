import {IButtonsProps, EColor} from '../UIEXComponentProps';

/**
 * Properties of component Tabs.
 *
 * @prop {string | number} [activeTab] Value of the active tab.
 * @prop {EColor} [activeColor] Color of an active tab. 
 * @prop {boolean} [simple] Tabs with no content if true.
 * @prop {boolean} [multiple] You can select few tabs if true.
 * @prop {boolean} [optional] None of tabs can be selected if true (multiple is always optional).
 * @prop {Function} [onSelect] Mouse click handler on enabled tab button.
 */
interface ITabsProps extends IButtonsProps {
	activeTab?: string | number;
	activeColor?: EColor;
	simple?: boolean;
	multiple?: boolean;
	optional?: boolean;
	onSelect?: (value?: any) => void;
}