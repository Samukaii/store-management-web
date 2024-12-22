import { getCurrentComponentFixture } from "./current-component-fixture";

export const detectChanges = () => {
	getCurrentComponentFixture().detectChanges();
}
