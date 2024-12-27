import { TestBed } from "@angular/core/testing";
import { SnackbarService } from "src/app/shared/services/snackbar/snackbar.service";
import { SnackBarOptions } from "src/app/shared/services/models/snack-bar-options";
import { MockProvider } from "ng-mocks";
import { MatSnackBar } from "@angular/material/snack-bar";
import { spyDependency } from "src/app/testing/spies/spy-dependency";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [MockProvider(MatSnackBar)],
	})

	const service = TestBed.inject(SnackbarService);

	return {service};
}

describe(SnackbarService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('When no config or action provided', () => {
		const levels: SnackBarOptions['level'][] = [
			'success',
			'error'
		];

		levels.forEach(level => {
			it(`must call snackbar open method adding panelClass "snackbar-${level}" with default action "Fechar" and duration as 5000 ms`, () => {
				const {service} = setup();

				const open = spyDependency(MatSnackBar, 'open');

				service.open({
					level,
					message: "Some message"
				});

				expect(open).toHaveBeenCalledExactlyOnceWith("Some message", "Fechar", {
					panelClass: `snackbar-${level}`,
					duration: 5000,
				});
			});
		})
	});

	describe('When config and action is provided', () => {
		const levels: SnackBarOptions['level'][] = [
			'success',
			'error'
		];

		levels.forEach(level => {
			it(`must call snackbar open method adding panelClass "snackbar-${level}" with action provided and options overriding default`, () => {
				const {service} = setup();

				const open = spyDependency(MatSnackBar, 'open');

				service.open({
					level,
					message: "Some other message",
					action: "Some action",
					config: {
						duration: 2331,
						direction: "ltr",
						verticalPosition: "top",
						horizontalPosition: "center"
					}
				});

				expect(open).toHaveBeenCalledExactlyOnceWith("Some other message", "Some action", {
					panelClass: `snackbar-${level}`,
					duration: 2331,
					direction: "ltr",
					verticalPosition: "top",
					horizontalPosition: "center"
				});
			});
		})
	});
});
