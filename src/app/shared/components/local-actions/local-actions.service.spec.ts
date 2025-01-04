import { TestBed } from "@angular/core/testing";
import { LocalActionsService } from "src/app/shared/components/local-actions/local-actions.service";

const setup = () => {
	TestBed.configureTestingModule({})

	const service = TestBed.inject(LocalActionsService);

	return {service};
}

describe(LocalActionsService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	it('getActions() must return [] when no action is registered for specific name', () => {
		const {service} = setup();

		const actions = service.getActions('some-location');

		expect(actions()).toEqual([]);

		service.updateActions('other-location', [
			{name: "some-action"},
			{name: "some-other-action"},
		]);

		expect(actions()).toEqual([]);
	});

	it('getActions() must return actions registered for specific name', () => {
		const {service} = setup();

		const topBarActions = service.getActions('top-bar');
		const tabActions = service.getActions('tab');

		service.updateActions('top-bar', [
			{name: "first-top-bar-action"},
			{name: "second-top-bar-action"},
		]);

		service.updateActions('tab', [
			{name: "first-tab-action"},
			{name: "second-tab-action"},
		]);

		expect(topBarActions()).toEqual([
			{name: "first-top-bar-action"},
			{name: "second-top-bar-action"},
		]);

		expect(tabActions()).toEqual([
			{name: "first-tab-action"},
			{name: "second-tab-action"},
		]);


		service.updateActions('top-bar', [
			{name: "third-top-bar-action"},
			{name: "fourth-top-bar-action"},
		]);

		service.updateActions('tab', [
			{name: "third-tab-action"},
			{name: "fourth-tab-action"},
		]);

		expect(topBarActions()).toEqual([
			{name: "third-top-bar-action"},
			{name: "fourth-top-bar-action"},
		]);

		expect(tabActions()).toEqual([
			{name: "third-tab-action"},
			{name: "fourth-tab-action"},
		]);
	});

	it('getActions() must return [] if specific name is deleted', () => {
		const {service} = setup();

		const topBarActions = service.getActions('top-bar');
		const tabActions = service.getActions('tab');

		service.updateActions('top-bar', [
			{name: "first-top-bar-action"},
			{name: "second-top-bar-action"},
		]);

		service.updateActions('tab', [
			{name: "first-tab-action"},
			{name: "second-tab-action"},
		]);

		expect(topBarActions()).toEqual([
			{name: "first-top-bar-action"},
			{name: "second-top-bar-action"},
		]);

		expect(tabActions()).toEqual([
			{name: "first-tab-action"},
			{name: "second-tab-action"},
		]);


		service.deleteActions('top-bar');
		service.deleteActions('tab');

		expect(topBarActions()).toEqual([]);

		expect(tabActions()).toEqual([]);
	});
});
