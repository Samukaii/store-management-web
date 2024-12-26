import { TestBed } from "@angular/core/testing";
import { DialogService } from "src/app/shared/services/dialog/dialog.service";
import { MatDialog } from "@angular/material/dialog";
import { Component, input, output } from "@angular/core";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { mockDialogRef } from "src/app/testing/mocks/mock-dialog-ref";
import { mockMatDialog } from "src/app/testing/mocks/mock-mat-dialog";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [mockMatDialog()]
	})

	const service = TestBed.inject(DialogService);

	return {service};
}

fdescribe(DialogService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('open', () => {
		it('must call dialog open with component and correct options', () => {
			@Component({template: ''})
			class DialogComponent {}

			const {service} = setup();

			const open = spyDependency(MatDialog, 'open');

			service.open({
				component: DialogComponent,
				config: {
					id: "123",
					maxHeight: "60vh"
				}
			});

			expect(open).toHaveBeenCalledExactlyOnceWith(DialogComponent, {
				id: "123",
				height: "fit-content",
				minWidth: "800px",
				width: "fit-content",
				maxHeight: "60vh",
				closeOnNavigation: true,
				data: {},
			});
		});

		it('must call component ref set inputs with inputs passed as data', () => {
			@Component({template: ''})
			class DialogComponent {
				name = input("");
				cpf = input("");
			}

			const {service} = setup();

			const dialogRef = mockDialogRef(DialogComponent);

			const setInput = jest.spyOn(dialogRef.componentRef!, 'setInput');

			spyDependency(MatDialog, 'open').mockReturnValue(dialogRef);

			service.open({
				component: DialogComponent,
				data: {
					name: "Teste",
					cpf: "342.456.223-43"
				}
			});

			expect(setInput).toHaveBeenCalledWith("name", "Teste");
			expect(setInput).toHaveBeenCalledWith("cpf", "342.456.223-43");
			expect(setInput).toHaveBeenCalledTimes(2);
		});

		it('must watch whenever component output changes and call callback passed as data', () => {
			@Component({template: ''})
			class DialogComponent {
				submit = output<string>();
				closed = output<boolean>();
				clear = output();
			}

			const {service} = setup();

			const dialogRef = mockDialogRef(DialogComponent);
			const {instance} = dialogRef.componentRef!;

			spyDependency(MatDialog, 'open').mockReturnValue(dialogRef);

			const submit = jest.fn();
			const closed = jest.fn();
			const clear = jest.fn();

			service.open({
				component: DialogComponent,
				data: {
					submit,
					closed,
					clear
				}
			});

			instance.submit.emit("Text");
			instance.submit.emit("Other value");
			instance.submit.emit("More other value");

			expect(submit).toHaveBeenNthCalledWith(1, "Text");
			expect(submit).toHaveBeenNthCalledWith(2, "Other value");
			expect(submit).toHaveBeenNthCalledWith(3, "More other value");
			expect(submit).toHaveBeenCalledTimes(3);

			instance.closed.emit(false);
			instance.closed.emit(true);
			instance.closed.emit(false);

			expect(closed).toHaveBeenNthCalledWith(1, false);
			expect(closed).toHaveBeenNthCalledWith(2, true);
			expect(closed).toHaveBeenNthCalledWith(3, false);
			expect(closed).toHaveBeenCalledTimes(3);

			instance.clear.emit();
			instance.clear.emit();
			instance.clear.emit();

			expect(clear).toHaveBeenNthCalledWith(1, undefined);
			expect(clear).toHaveBeenNthCalledWith(2, undefined);
			expect(clear).toHaveBeenNthCalledWith(3, undefined);
			expect(clear).toHaveBeenCalledTimes(3);
		});

		describe('After component destroyed', () => {
			it('must stop watch outputs', () => {
				@Component({template: ''})
				class DialogComponent {
					submit = output<string>();
					closed = output<boolean>();
					clear = output();
				}

				const {service} = setup();

				const dialogRef = mockDialogRef(DialogComponent);
				const {destroy, instance} = dialogRef.componentRef!;

				spyDependency(MatDialog, 'open').mockReturnValue(dialogRef);

				const submit = jest.fn();
				const closed = jest.fn();
				const clear = jest.fn();

				service.open({
					component: DialogComponent,
					data: {
						submit,
						closed,
						clear
					}
				});

				destroy();

				instance.submit.emit("Text");
				instance.submit.emit("Other value");
				instance.submit.emit("More other value");

				instance.closed.emit(false);
				instance.closed.emit(true);
				instance.closed.emit(false);

				instance.clear.emit();
				instance.clear.emit();
				instance.clear.emit();

				expect(submit).toHaveBeenCalledTimes(0);
				expect(closed).toHaveBeenCalledTimes(0);
				expect(clear).toHaveBeenCalledTimes(0);
			});
		});
	});

	describe('close', () => {
		it('must close specific component and lose reference for it, allowing close only once', () => {
			@Component({template: '', selector: 'first-component'})
			class FirstComponent {}

			@Component({template: '', selector: 'second-component'})
			class SecondComponent {}

			const {service} = setup();

			const firstDialogRef = mockDialogRef(FirstComponent);
			const secondDialogRef = mockDialogRef(SecondComponent);

			jest.spyOn(firstDialogRef, 'close');
			jest.spyOn(secondDialogRef, 'close');

			spyDependency(MatDialog, 'open')
				.mockReturnValueOnce(firstDialogRef)
				.mockReturnValueOnce(secondDialogRef);

			service.open({component: FirstComponent});
			service.open({component: SecondComponent});

			service.close(FirstComponent);
			service.close(FirstComponent);
			service.close(FirstComponent);

			expect(firstDialogRef.close).toHaveBeenCalledExactlyOnceWith();

			service.close(SecondComponent);
			service.close(SecondComponent);

			expect(secondDialogRef.close).toHaveBeenCalledExactlyOnceWith();
		});
	});

	describe('Close all', () => {
		it('must call dialog closeAll method', () => {
			const {service} = setup();

			const closeAll = spyDependency(MatDialog, 'closeAll');

			service.closeAll();

			expect(closeAll).toHaveBeenCalledExactlyOnceWith();
		});
	});

	describe('Edge cases', () => {
		it('must do nothing when trying to close a component not opened', () => {
			@Component({template: '', selector: 'fake-component'})
			class FakeComponent {}

			const {service} = setup();

			expect(() => service.close(FakeComponent)).not.toThrow();
		});
	});
});
