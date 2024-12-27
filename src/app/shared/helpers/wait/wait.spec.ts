import { wait } from './wait';
import { fakeAsync, tick } from '@angular/core/testing';

describe(wait.name, () => {
	it('must resolve after the specified time', fakeAsync(() => {
		const time = 1000;

		let isResolved = false;
		wait(time).then(() => {
			isResolved = true;
		});

		tick(time);

		expect(isResolved).toBeTrue();
	}));

	it('must not resolve before the specified time', fakeAsync(() => {
		const time = 500;

		let isResolved = false;
		wait(time).then(() => {
			isResolved = true;
		});

		tick(200);
		expect(isResolved).toBeFalse();

		tick(300);

		expect(isResolved).toBeTrue();
	}));
});
