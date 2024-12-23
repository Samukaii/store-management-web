import { getCurrentComponentFixture } from "../core/current-component-fixture";

export const detectChanges = () => {
	getCurrentComponentFixture().detectChanges();
}
