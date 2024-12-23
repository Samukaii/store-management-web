import { Generic } from "../../shared/models/generic";
import { JestSpy } from "./jest-spy";
import { JestSpyKey } from "./jest-spy-key";

export type ExtendedSpy<T extends Generic, K extends JestSpyKey<T>> = JestSpy<T, K> & {
	asObservableOf: (value?: any) => JestSpy<T, K>;
};
