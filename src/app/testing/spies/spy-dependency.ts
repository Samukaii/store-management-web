import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Generic } from "../../shared/models/generic";
import { ExtendedSpy } from "../models/extended-spy";
import { JestSpyKey } from "../models/jest-spy-key";
import { createExtendedSpy } from "../extenders/create-extended-spy";

export const spyDependency = <T extends Generic, K extends JestSpyKey<T>>(type: Type<T>, key: K) => {
	const dependency = TestBed.inject(type);

	const spy = jest.spyOn(dependency, key) as ExtendedSpy<T, K>;

	return createExtendedSpy(spy);
};
