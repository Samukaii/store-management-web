import { getCurrentComponentFixture } from "./current-component-fixture";

export const hasCreatedComponent = () => {
	return !!getCurrentComponentFixture()?.componentInstance;
};
