import { FieldErrorComponent } from "src/app/shared/components/field-error/field-error.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { FormControl } from "@angular/forms";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { detectChanges } from "src/app/testing/utils/detect-changes";


interface SetupConfig {
	control?: FormControl
}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(FieldErrorComponent, {
		inputs: {
			control: config?.control ?? new FormControl(),
		}
	});

	return fixtureUtils();
}


fdescribe(FieldErrorComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must not show error if control has no error', () => {
		const control = new FormControl();

		const {text} = setup({control});

		expect(text()).toBe("");
	});

	it('must not show error if control receives unknown error', () => {
		const control = new FormControl();

		const {text} = setup({control});

		control.setErrors({
			min: true
		});
		detectChanges();

		expect(text()).toBe("");
	});

	it('must show required error if control receives required error', () => {
		const control = new FormControl();

		const {text} = setup({control});

		control.setErrors({required: true});
		detectChanges();

		expect(text()).toBe("Campo obrigatório");
	});

	it('must show custom error if control receives a custom error', () => {
		const control = new FormControl();

		const {text} = setup({control});

		control.setErrors({customError: "Some custom error"});
		detectChanges();

		expect(text()).toBe("Some custom error");
	});
});
