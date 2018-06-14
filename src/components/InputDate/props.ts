import {IInputProps} from '../Input/props';

/**
 * Properties of component DateInput.
 *
 * @prop {string} [delimiter] Year/month/day delimiter (Point by default).
 * @prop {boolean} [yearFirst] Year is in the beginning (Day in the beginning by default).
 * @prop {boolean} [withTime] Time included in XX:XX format.
 * @prop {string | number} [minYear] Minimal available year.
 * @prop {string | number} [maxYear] Maximal available year.
 * @prop {boolean} [past] Only past date. (Middle priority)
 * @prop {boolean} [future] Only future date. (Lower priority)
 * @prop {string} [periodFrom] Minimal available date. (Higher priority)
 * @prop {string} [periodTo] Maximal available date. (Higher priority)
 */
interface IDateInputProps extends IInputProps {
	delimiter?: string;
	yearFirst?: boolean;
	withTime?: boolean;
	minYear?: string | number;
	maxYear?: string | number;
	past?: boolean;
	future?: boolean;
	periodFrom?: string;
	periodTo?: string;
}