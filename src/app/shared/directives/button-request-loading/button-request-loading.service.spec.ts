import { TestBed } from "@angular/core/testing";
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { ButtonRequestLoadingDirective } from "./button-request-loading.directive";
import { HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";

const setup = () => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(ButtonRequestLoadingService);

	return {service};
}

const createButtonMock = () => ({
	startRequestLoading: jest.fn(),
	finalizeLoading: jest.fn()
} as any as ButtonRequestLoadingDirective);

describe('ButtonRequestLoadingService', () => {
	describe('Button Registration', () => {
		it('must register buttons and associate them with identifiers', () => {
			const {service} = setup();

			const button = createButtonMock();

			service.registerButton('button1', button);

			service.setLastClickedButton('button1');
			const httpRequest = new HttpRequest('GET', '/test-url');
			service.addLoading(httpRequest);

			expect(button.startRequestLoading).toHaveBeenCalled();
		});

		it('must allow re-registering an identifier after button removal', () => {
			const {service} = setup();

			const button1 = createButtonMock();
			const button2 = createButtonMock();

			service.registerButton('button1', button1);
			service.unregisterButton('button1');
			service.registerButton('button1', button2);

			service.setLastClickedButton('button1');
			const httpRequest = new HttpRequest('GET', '/test-url');
			service.addLoading(httpRequest);

			expect(button1.startRequestLoading).not.toHaveBeenCalled();
			expect(button2.startRequestLoading).toHaveBeenCalled();
		});
	});

	describe('Loading State Management', () => {
		describe('addLoading', () => {
			it('must trigger loading state for the last clicked button', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				service.setLastClickedButton('button1');
				const httpRequest = new HttpRequest('GET', '/test-url');
				service.addLoading(httpRequest);

				expect(button.startRequestLoading).toHaveBeenCalled();
			});

			it('must do nothing if no button was clicked', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				const httpRequest = new HttpRequest('GET', '/test-url');
				service.addLoading(httpRequest);

				expect(button.startRequestLoading).not.toHaveBeenCalled();
			});
		});

		describe('finishLoading', () => {
			it('must finalize loading with success status for a successful response', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				service.setLastClickedButton('button1');
				service.addLoading(new HttpRequest('GET', '/test-url'));

				const httpResponse = new HttpResponse({url: '/test-url', status: 200});
				service.finishLoading(httpResponse);

				expect(button.finalizeLoading).toHaveBeenCalledWith('success');
			});

			it('must finalize loading with error status for a failed response', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				service.setLastClickedButton('button1');
				service.addLoading(new HttpRequest('GET', '/test-url'));

				const httpErrorResponse = new HttpErrorResponse({url: '/test-url', status: 400});
				service.finishLoading(httpErrorResponse);

				expect(button.finalizeLoading).toHaveBeenCalledWith('error');
			});
		});

		describe('Handling Multiple Buttons and Requests', () => {
			it('must correctly manage multiple simultaneous requests', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				const button2 = createButtonMock();
				service.registerButton('button2', button2);

				service.setLastClickedButton('button1');
				service.addLoading(new HttpRequest('GET', '/url1'));

				service.setLastClickedButton('button2');
				service.addLoading(new HttpRequest('GET', '/url2'));

				service.finishLoading(new HttpResponse({url: '/url1', status: 200}));
				service.finishLoading(new HttpErrorResponse({url: '/url2', status: 400}));

				expect(button.finalizeLoading).toHaveBeenCalledWith('success');
				expect(button2.finalizeLoading).toHaveBeenCalledWith('error');
			});

			it('must ensure correct association between URLs and buttons', () => {
				const {service} = setup();

				const button = createButtonMock();
				service.registerButton('button1', button);

				const button2 = createButtonMock();
				service.registerButton('button2', button2);

				service.setLastClickedButton('button1');
				service.addLoading(new HttpRequest('GET', '/shared-url'));

				service.setLastClickedButton('button2');
				service.addLoading(new HttpRequest('GET', '/shared-url'));

				service.finishLoading(new HttpResponse({url: '/shared-url', status: 200}));

				expect(button.finalizeLoading).not.toHaveBeenCalled();
				expect(button2.finalizeLoading).toHaveBeenCalledWith('success');
			});
		});
	});
});
