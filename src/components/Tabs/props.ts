import {IButtonsProps, EColor, IStyle} from '../UIEXComponentProps';

/**
 * Properties of component Tabs.
 *
 * @prop {string | number} [activeTab] Value of the active tab.
 * @prop {EColor} [activeColor] Color of an active tab. 
 * @prop {IStyle} [activeStyle] Style of active tab button. 
 * @prop {boolean} [simple] Tabs with no content if true.
 * @prop {boolean} [multiple] You can select few tabs if true.
 * @prop {boolean} [optional] None of tabs can be selected if true (multiple is always optional).
 * @prop {boolean} [dynamic] Has "add" tab button, closable tabs.
 * @prop {string} [emptyTabName] Default name of a new added tab plus next tab index.
 * @prop {Function} [onSelect] Mouse click handler on enabled tab button.
 * @prop {Function} [onAddTab] Add tab handler (only for dynamic tabs).
 * @prop {Function} [onRemoveTab] Remove tab handler (only for dynamic tabs).
 */
interface ITabsProps extends IButtonsProps {
	activeTab?: string | number;
	activeColor?: EColor;
	activeStyle?: IStyle;
	simple?: boolean;
	multiple?: boolean;
	optional?: boolean;
	dynamic?: boolean;
	emptyTabName?: string;
	onSelect?: (value: any) => void;
	onAddTab?: (newTabCaption: string) => void;
	onRemoveTab?: (index: number, value: any) => void;
}