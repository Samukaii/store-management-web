import { getCurrentComponentFixture } from "../core/current-component-fixture";

export const hasCreatedComponent = () => {
	return !!getCurrentComponentFixture()?.componentInstance;
};
