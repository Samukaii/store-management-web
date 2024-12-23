import { Component, input, reflectComponentType, Type } from "@angular/core";
import { ComponentMockConfig } from "../models/component-mock-config";

export const mockComponent = <T>(component: Type<T>, config?: ComponentMockConfig<T>) => {
	const mirror = reflectComponentType(component);

	@Component({
		template: config?.template ?? `<div>asdasdasd</div>`,
		selector: config?.selector ?? mirror?.selector,
		providers: [
			{provide: component, useExisting: MockedComponent},
		],
	})
	class MockedComponent {
		[key: string]: any;

		constructor() {
			Object.entries(config?.properties ?? {}).forEach(([key, value]) => {
				this[key] = value;
			});
		}
	}

	return MockedComponent;
};
