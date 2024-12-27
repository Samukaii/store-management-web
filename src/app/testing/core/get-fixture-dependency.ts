import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { ProviderToken } from "@angular/core";

export const getFixtureDependency = <T>(token: ProviderToken<T>) => {
	return getCurrentComponentFixture().debugElement.injector.get(token);
}
