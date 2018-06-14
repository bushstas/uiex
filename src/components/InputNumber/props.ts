import {IInputProps} from '../Input/props';

interface IInputMeasure {
	id: string | number;
	name: string;
}

/**
 * Properties of component NumberInput.
 *
 * @prop {boolean} [positive] Value can be only positive.
 * @prop {boolean} [negative] Value can be only negative.
 * @prop {boolean} [decimal] Value can be decimal.
 * @prop {string | number} [toFixed] Quantity of digits after decimal point.
 * @prop {string | number} [minValue] Input numeric min value.
 * @prop {string | number} [maxValue] Input numeric max value.
 * @prop {string | string[]} [measure] Input value measure name or id of measure (from measures) displayed at right.
 * @prop {IInputMeasure[]} [measures] List of measures to change.
 * @prop {Function} [onChangeMeasure] Mouse click handler on measure.
 */
interface INumberInputProps extends IInputProps {
	positive?: boolean;
	negative?: boolean;
	decimal?: boolean;
	toFixed?: string | number;
	minValue?: string | number;
	maxValue?: string | number;
	measure?: string | string[];
	measures?: IInputMeasure[];
	onChangeMeasure?: (measureId: string | number, measureIndex: number, inputName: string) => void;
}