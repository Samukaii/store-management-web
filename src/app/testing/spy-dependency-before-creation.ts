import { Type } from "@angular/core";
import { beforeComponentCreate } from "./before-component-create";
import { Generic } from "../shared/models/generic";
import { spyDependency } from "./spy-dependency";
import { ExtendedSpy } from "./models/extended-spy";

export const spyDependencyBeforeCreation = <T extends Generic, K extends keyof T>(type: Type<T>, key: T[K] extends Function ? K : never) => {
	let spy: ExtendedSpy<T, K>;

	beforeComponentCreate(() => {
		spy = spyDependency(type, key);
	});

	return {resolve: () => spy}
};
