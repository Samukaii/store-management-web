import { NO_ERRORS_SCHEMA, reflectComponentType, Type } from "@angular/core";
import { TestBed, TestModuleMetadata } from "@angular/core/testing";
import { setCurrentComponentFixture } from "../core/current-component-fixture";
import { runBeforeComponentCreateActions } from "../core/before-component-create";

interface SetupComponentTestingConfig extends TestModuleMetadata{
}

export const setupComponentTesting = <T>(component: Type<T>, config: SetupComponentTestingConfig) => {
	const configCopy = {...config};

	const mirror = reflectComponentType(component);

	if(mirror?.isStandalone) {
		TestBed.overrideComponent(component, {
			set: {
				schemas: [NO_ERRORS_SCHEMA],
				imports: configCopy.imports ?? [],
			},
		})

		delete configCopy.imports;
	}

	TestBed.configureTestingModule({
		schemas: [NO_ERRORS_SCHEMA],
		...configCopy
	});

	runBeforeComponentCreateActions();

	const fixture = TestBed.createComponent(component);

	fixture.detectChanges();

	setCurrentComponentFixture(fixture);
};
