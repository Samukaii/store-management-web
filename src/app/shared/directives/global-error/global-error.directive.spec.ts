import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { Component, ElementRef, inject, signal } from "@angular/core";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { GlobalErrorDirective } from "src/app/shared/directives/global-error/global-error.directive";
import { FormBuilder, FormControl } from "@angular/forms";
import { MockProvider } from "ng-mocks";
import { ErrorsService } from "src/app/core/error-handling/errors.service";
import { injectDep } from "src/app/testing/utils/inject-dep";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { Generic } from "src/app/shared/models/generic";
import { BehaviorSubject, map } from "rxjs";
import { fakeAsync, flush } from "@angular/core/testing";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { spyDependency } from "src/app/testing/spies/spy-dependency";

const mockElementRef = (selector: string) => {
	const field = getByTestId(selector).read(GlobalErrorDirective);

	const nativeElement = {
		scrollIntoView: jest.fn()
	}

	field!['elementRef'].nativeElement = nativeElement;

	return nativeElement;
}

const setup = () => {
	@Component({
		template: `
			@if (control1()) {
				<div
					data-test-id="control1"
					[control]="control1()!"
					appGlobalError>
				</div>
			}
			@if (control2()) {
				<div
					data-test-id="control2"
					[control]="control2()!"
					appGlobalError>
				</div>
			}
		`,
		imports: [
			GlobalErrorDirective
		],
		selector: "app-root-test",
	})
	class HostComponent {
		control1 = signal<FormControl | null>(null);
		control2 = signal<FormControl | null>(null);
	}

	const errors$ = new BehaviorSubject<Generic>({});

	setupComponentTesting(HostComponent, {
		imports: [
			GlobalErrorDirective
		],
		providers: [
			MockProvider(ErrorsService, {
				watchFieldError: (fieldName: string) => {
					return errors$.pipe(
						map(errors => errors[fieldName]),
					);
				},
				setErrors: (errors: Generic) => {
					errors$.next(errors);
				}
			})
		]
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}

describe(GlobalErrorDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When global error change', () => {
		it('must update controls errors', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
				cpf: ""
			});

			component.control1.set(form.controls.name);
			component.control2.set(form.controls.cpf);

			detectChanges();

			mockElementRef('control1');
			mockElementRef('control2');

			const service = injectDep(ErrorsService);

			service.setErrors({
				name: "Name must be unique",
				cpf: "Cpf is not valid"
			});

			expect(form.controls.name.errors).toEqual({
				customError: "Name must be unique"
			});

			expect(form.controls.cpf.errors).toEqual({
				customError: "Cpf is not valid"
			});
		});

		it('must call element scroll to current element', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
				cpf: ""
			});

			component.control1.set(form.controls.name);
			component.control2.set(form.controls.cpf);

			detectChanges();

			const nameElement = mockElementRef('control1');
			const cpfElement = mockElementRef('control2');

			const service = injectDep(ErrorsService);

			service.setErrors({
				name: "Name must be unique",
				cpf: "Cpf is not valid"
			});

			expect(nameElement.scrollIntoView).toHaveBeenCalledExactlyOnceWith({
				behavior: "smooth",
				block: "center"
			});

			expect(cpfElement.scrollIntoView).toHaveBeenCalledExactlyOnceWith({
				behavior: "smooth",
				block: "center"
			});
		});
	});

	describe('When control change', () => {
		it('must stop applying error to last control and stop scrolling it', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
				cpf: "",
			});

			component.control1.set(form.controls.name);
			detectChanges();

			component.control1.set(form.controls.cpf);
			detectChanges();

			const element = mockElementRef('control1');
			const service = injectDep(ErrorsService);

			service.setErrors({
				name: "Name must be unique",
			});

			expect(form.controls.name.errors).toBe(null);
			expect(element.scrollIntoView).not.toHaveBeenCalled();
		});

		it('must apply error to new control and scroll it', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
				cpf: "",
			});

			component.control1.set(form.controls.name);
			detectChanges();

			component.control1.set(form.controls.cpf);
			detectChanges();

			const element = mockElementRef('control1');
			const service = injectDep(ErrorsService);

			service.setErrors({
				cpf: "CPF is required",
			});

			expect(form.controls.cpf.errors).toEqual({
				customError: "CPF is required"
			});

			expect(element.scrollIntoView).toHaveBeenCalledExactlyOnceWith({
				behavior: "smooth",
				block: "center"
			});
		});
	});

	describe('When component is destroyed', () => {
		it('must stop applying error to control and stop scrolling it', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
			});

			component.control1.set(form.controls.name);
			detectChanges();

			const nameElement = mockElementRef('control1');

			getCurrentComponentFixture().destroy();

			const service = injectDep(ErrorsService);

			service.setErrors({
				name: "Name must be unique",
			});

			expect(form.controls.name.errors).toBe(null);
			expect(nameElement.scrollIntoView).not.toHaveBeenCalled();
		});

		it('must call clearFieldError with control name', () => {
			const {component} = setup();

			const form = new FormBuilder().group({
				name: "",
			});

			component.control1.set(form.controls.name);
			detectChanges();

			const clearFieldError = spyDependency(ErrorsService, 'clearFieldError');

			getCurrentComponentFixture().destroy();

			expect(clearFieldError).toHaveBeenCalledExactlyOnceWith('name');
		});
	});
});
