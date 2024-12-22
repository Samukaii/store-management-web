import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Generic } from "../shared/models/generic";
import { ExtendedSpy } from "./models/extended-spy";

export const spyDependency = <T extends Generic, K extends keyof T = keyof T>(type: Type<T>, key: T[K] extends Function ? K:never) => {
	const dependency = TestBed.inject(type);

	const spy = spyOn(dependency, key) as ExtendedSpy<T, K>;

	spy.asObservableOf = (value = {}) => {
		return spy.and.returnValues(of(value) as any)
	};

	return spy;
};
