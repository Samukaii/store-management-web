import { of } from "rxjs";
import { Generic } from "../../shared/models/generic";
import { ExtendedSpy } from "../models/extended-spy";
import { JestSpyKey } from "../models/jest-spy-key";
import { JestSpy } from "../models/jest-spy";

export const createExtendedSpy = <T extends Generic, K extends JestSpyKey<T>>(spy: JestSpy<T, K>) => {
	const extended = spy as ExtendedSpy<T, K>;

	extended.asObservableOf = (value = {}) => {
		return spy.mockReturnValue(of(value) as any)
	};

	return extended;
};
