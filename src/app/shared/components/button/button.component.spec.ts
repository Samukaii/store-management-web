import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { changeInput as untypedChangeInput } from "src/app/testing/core/change-input";
import { MockProvider } from "ng-mocks";
import { UuidService } from "src/app/shared/services/uuid/uuid.service";
import {
	ButtonRequestLoadingDirective
} from "src/app/shared/directives/button-request-loading/button-request-loading.directive";
import {
	ButtonRequestLoadingService
} from "src/app/shared/directives/button-request-loading/button-request-loading.service";
import { beforeComponentCreate } from "src/app/testing/core/before-component-create";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { ExtendedSpy } from "src/app/testing/models/extended-spy";
import { fakeAsync, flush } from "@angular/core/testing";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { detectChanges } from "src/app/testing/utils/detect-changes";

const changeInput = untypedChangeInput<ButtonComponent>;

interface SetupConfig {
	inputs?: Partial<ComponentInputs<ButtonComponent>>;
}

const validateLabel = (setup: () => void) => {
	it('button must show [label] input', () => {
		setup();

		const button = getByTestId('button');

		changeInput("label", "Some label");

		expect(button.text()).toBe("Some label");

		changeInput("label", "Some other label");

		expect(button.text()).toBe("Some other label");
	});
}

const validateButtonDirective = (setup: () => void, directives: string[]) => {
	const text = () => {
		const copy = [...directives].map(directive => `"${directive}"`);

		const last = copy.pop() ?? "";

		if (copy.length < 1) return last;

		return `${copy.join(", ")} and ${last}`;
	}

	it(`must render a button with directive ${text()}`, () => {
		setup();

		const button = getByTestId('button');

		directives.forEach(directive => {
			expect(button.getProperty(directive)).toBe("");
		})
	});
}


const validateLoading = (setup: () => void) => {
	it('button [loading] must match with [loading] input', () => {
		setup();

		const button = getByTestId('button');

		changeInput("loading", true);

		expect(button.getProperty("loading")).toBe(true);

		changeInput("loading", false);

		expect(button.getProperty("loading")).toBe(false);
	});

	it('button [loading] must be true when ButtonRequestLoadingDirective starts loading ' +
		'even if [loading] input changes and turn back to component [loading] input after ' +
		'ButtonRequestLoadingDirective finishLoading', fakeAsync(() => {
		setup();

		const button = getByTestId('button');
		const directive = getCurrentComponentFixture().debugElement.injector.get(ButtonRequestLoadingDirective);

		directive.startRequestLoading();
		detectChanges();

		expect(button.getProperty("loading")).toBe(true);

		changeInput("loading", false);

		expect(button.getProperty("loading")).toBe(true);

		directive.finalizeLoading('success');
		flush();
		detectChanges();

		expect(button.getProperty("loading")).toBe(false);

		changeInput("loading", true);

		expect(button.getProperty("loading")).toBe(true);
	}));
}
const validateDisabling = (setup: () => void) => {
	it('button [disabled] must match with [disabled] input', () => {
		setup();

		const button = getByTestId('button');

		changeInput("disabled", true);

		expect(button.getProperty("disabled")).toBe(true);

		changeInput("disabled", false);

		expect(button.getProperty("disabled")).toBe(false);
	});
}


const validateExtendedButtonDirective = (setup: () => void) => {
	it('button must have the "appButtonExtended" directive', () => {
		setup();

		const button = getByTestId('button');

		expect(button.getProperty("appButtonExtended")).toBe("");
	});
}

const validateTooltip = (setup: () => void) => {
	it('button [matTooltip] must match with [tooltip] input', () => {
		setup();

		const button = getByTestId('button');

		changeInput("tooltip", "Some tooltip");

		expect(button.getProperty("matTooltip")).toBe("Some tooltip");
	});
}

const validateIcon = (setup: () => void) => {
	it('must show icon provided by [icon] input', () => {
		setup();

		const button = getByTestId('button');
		const icon = button.getByTestId("icon");

		changeInput("icon", "some-icon");
		expect(icon.text()).toBe("some-icon");

		changeInput("icon", "some-other-icon");
		expect(icon.text()).toBe("some-other-icon");
	});
}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(ButtonComponent, {
		inputs: config?.inputs,
		providers: [
			MockProvider(UuidService),
			MockProvider(ButtonRequestLoadingService),
		]
	});
}

describe(ButtonComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('On start', () => {
		it('must call ButtonRequestLoadingService registerButton method with identifier generated by uuidService', () => {
			let registerButton!: ExtendedSpy<any, any>;

			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue("generated-uuid");
				registerButton = spyDependency(ButtonRequestLoadingService, 'registerButton') as any;
			});

			setup();

			const directive = getCurrentComponentFixture().debugElement.injector.get(ButtonRequestLoadingDirective);

			expect(registerButton).toHaveBeenCalledExactlyOnceWith('generated-uuid', directive);
		});
	});

	describe('When identifier changes', () => {
		it('must call ButtonRequestLoadingService unregisterButton method with last identifier and call registerButton with new identifier', () => {
			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue("generated-uuid");
			});

			setup();

			const unregisterButton = spyDependency(ButtonRequestLoadingService, 'unregisterButton');
			const registerButton = spyDependency(ButtonRequestLoadingService, 'registerButton') as any;

			const directive = getCurrentComponentFixture().debugElement.injector.get(ButtonRequestLoadingDirective);

			changeInput('identifier' as any, 'some-identifier');
			changeInput('identifier' as any, 'other-identifier');

			expect(unregisterButton).toHaveBeenNthCalledWith(1, 'generated-uuid');
			expect(registerButton).toHaveBeenNthCalledWith(1, 'some-identifier', directive);

			expect(unregisterButton).toHaveBeenNthCalledWith(2, 'some-identifier');
			expect(registerButton).toHaveBeenNthCalledWith(2, 'other-identifier', directive);

			expect(unregisterButton).toHaveBeenCalledTimes(2);
			expect(registerButton).toHaveBeenCalledTimes(2);
		});
	});

	describe('When [type] is not provided', () => {
		const config = () => {
			setup();
		}

		validateButtonDirective(config, ["mat-raised-button"])
		validateExtendedButtonDirective(config);
		validateLabel(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "raised"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "raised",
				}
			});
		}

		validateButtonDirective(config, ["mat-raised-button"])
		validateExtendedButtonDirective(config);
		validateLabel(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "stroked"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "stroked",
				}
			});
		}

		validateButtonDirective(config, ["mat-stroked-button"])
		validateExtendedButtonDirective(config);
		validateLabel(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "flat"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "flat",
				}
			});
		}

		validateButtonDirective(config, ["mat-flat-button"])
		validateExtendedButtonDirective(config);
		validateLabel(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "icon"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "icon",
				}
			});
		}

		validateButtonDirective(config, ["mat-icon-button"])
		validateExtendedButtonDirective(config);
		validateIcon(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "fab"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "fab",
				}
			});
		}

		validateButtonDirective(config, ["mat-fab"])
		validateExtendedButtonDirective(config);
		validateIcon(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "mini-fab"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "mini-fab",
				}
			});
		}

		validateButtonDirective(config, ["mat-mini-fab"])
		validateExtendedButtonDirective(config);
		validateIcon(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});

	describe('When [type] is "extended-fab"', () => {
		const config = () => {
			setup({
				inputs: {
					type: "extended-fab",
				}
			});
		}

		validateButtonDirective(config, ["mat-fab", "extended"])
		validateExtendedButtonDirective(config);
		validateIcon(config);
		validateLabel(config);
		validateDisabling(config);
		validateLoading(config);
		validateTooltip(config);
	});
});

