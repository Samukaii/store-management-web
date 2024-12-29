import { Component, NO_ERRORS_SCHEMA, reflectComponentType, Type } from "@angular/core";
import { MetadataOverride, TestBed, TestModuleMetadata } from "@angular/core/testing";
import { setCurrentComponentFixture } from "../core/current-component-fixture";
import { runBeforeComponentCreateActions } from "../core/before-component-create";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { runBeforeFirstChangeDetectionActions } from "src/app/testing/core/before-first-change-detection";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { Generic } from "src/app/shared/models/generic";

interface SetupComponentTestingConfig<T> extends TestModuleMetadata{
	overrideImports?: boolean;
	inputs?: Partial<ComponentInputs<T>>;
}

export const setupComponentTesting = <T extends Generic>(component: Type<T>, config: SetupComponentTestingConfig<T>) => {
	const configCopy = {...config};

	const mirror = reflectComponentType(component);

	if(mirror?.isStandalone) {
		const componentOverride: MetadataOverride<Component> = {
			set: {
				schemas: [NO_ERRORS_SCHEMA]
			}
		};

		if(config?.overrideImports !== false)
			componentOverride.set!.imports = config?.imports ?? [];

		TestBed.overrideComponent(component, componentOverride);

		delete configCopy.imports;
	}

	TestBed.configureTestingModule({
		schemas: [NO_ERRORS_SCHEMA],
		...configCopy
	});

	runBeforeComponentCreateActions();

	const fixture = TestBed.createComponent(component);

	Object.entries(config?.inputs ?? {}).forEach(([key, value]) => {
		fixture.componentRef.setInput(key, value);
	});

	setCurrentComponentFixture(fixture);

	runBeforeFirstChangeDetectionActions();

	fixture.detectChanges();

	return fixtureUtils<T>();
};
