import {IInputProps} from '../Input/props';

interface IInputMeasure {
	id: string | number;
	name: string;
}

/**
 * Properties of component NumberInput.
 *
 * @prop {number} [minValue] Input numeric min value.
 * @prop {number} [maxValue] Input numeric max value.
 * @prop {string | number} [measure] Input value measure name or id of measure (from measures) displayed at right.
 * @prop {IInputMeasure[]} [measures] List of measures to change.
 * @prop {Function} [onChangeMeasure] Mouse click handler on measure.
 */
interface INumberInputProps extends IInputProps {
	minValue?: number;
	maxValue?: number;
	measure?: string | string[];
	measures?: IInputMeasure[];
	onChangeMeasure?: (measureId: string | number, measureIndex: number, inputName: string) => void;
}