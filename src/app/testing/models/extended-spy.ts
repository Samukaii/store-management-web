import { Generic } from "../../shared/models/generic";

export type ExtendedSpy<T extends Generic, K extends keyof T> = jasmine.Spy<T[K]> & {
	asObservableOf: (value?: any) => jasmine.Spy<T[K]>;
};
