import { Type } from "@angular/core";
import { beforeComponentCreate } from "../core/before-component-create";
import { Generic } from "../../shared/models/generic";
import { spyDependency } from "./spy-dependency";
import { JestSpyKey } from "../models/jest-spy-key";
import { ExtendedSpy } from "../models/extended-spy";

export const spyDependencyBeforeCreation = <T extends Generic, K extends JestSpyKey<T>>(type: Type<T>, key: K) => {
	let spy: ExtendedSpy<T, K>;

	beforeComponentCreate(() => {
		spy = spyDependency(type, key);
	});

	return {resolve: () => spy}
};
