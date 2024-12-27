import { extendedDate } from "src/app/shared/helpers/extended-date/extended-date";

describe(extendedDate.name, () => {
	describe('Instance creation', () => {
		it('must correctly create an ExtendedDate from a Date object', () => {
			const baseDate = new Date('2024-01-15T00:00:00.000Z');
			const extDate = extendedDate(baseDate);

			expect((extDate as unknown) instanceof Date).toBeTrue();
			expect(extDate.toISOString()).toBe(baseDate.toISOString());
		});

		it('must correctly create an ExtendedDate from a string', () => {
			const baseDate = '2024-01-15T00:00:00.000Z';
			const extDate = extendedDate(baseDate);

			expect((extDate as unknown) instanceof Date).toBeTrue();
			expect(extDate.toISOString()).toBe(new Date(baseDate).toISOString());
		});

		it('must handle default date parameter', () => {
			const now = new Date();
			const extDate = extendedDate();

			expect(extDate.toDateString()).toBe(now.toDateString());
		});
	});

	describe('lastDayOf', () => {
		it('must calculate the last day of the month', () => {
			const extDate = extendedDate(new Date('2024-02-10T00:00:00.000Z'));
			const lastDayOfMonth = extDate.lastDayOf('month');

			expect(lastDayOfMonth.getDate()).toBe(29); // Leap year
			expect(lastDayOfMonth.getMonth()).toBe(1); // February
		});

		it('must calculate the last day of the year', () => {
			const extDate = extendedDate(new Date('2024-05-10T00:00:00.000Z'));
			const lastDayOfYear = extDate.lastDayOf('year');

			expect(lastDayOfYear.getDate()).toBe(31);
			expect(lastDayOfYear.getMonth()).toBe(11); // December
		});

		it('must calculate the last day of the week', () => {
			const extDate = extendedDate(new Date('2024-01-10T00:00:00.000Z')); // Wednesday
			const lastDayOfWeek = extDate.lastDayOf('week');

			expect(lastDayOfWeek.getDay()).toBe(0); // Sunday
			expect(lastDayOfWeek.getDate()).toBe(14); // End of that week
		});
	});

	describe('firstDayOf', () => {
		it('must calculate the first day of the month', () => {
			const extDate = extendedDate(new Date('2024-05-15T00:00:00.000Z'));
			const firstDayOfMonth = extDate.firstDayOf('month');

			expect(firstDayOfMonth.getDate()).toBe(1);
			expect(firstDayOfMonth.getMonth()).toBe(4); // May
		});

		it('must calculate the first day of the year', () => {
			const extDate = extendedDate(new Date('2024-11-15T00:00:00.000Z'));
			const firstDayOfYear = extDate.firstDayOf('year');

			expect(firstDayOfYear.getDate()).toBe(1);
			expect(firstDayOfYear.getMonth()).toBe(0); // January
		});

		it('must calculate the first day of the week', () => {
			const extDate = extendedDate(new Date('2024-01-10T00:00:00.000Z')); // Wednesday
			const firstDayOfWeek = extDate.firstDayOf('week');

			expect(firstDayOfWeek.getDay()).toBe(0); // Sunday
			expect(firstDayOfWeek.getDate()).toBe(7); // Start of that week
		});
	});

	describe('minus', () => {
		it('must subtract days correctly', () => {
			const extDate = extendedDate(new Date('2024-01-15T00:00:00.000Z'));

			const result = extDate.minus(5, 'day');

			expect(result.getUTCDate()).toBe(10);
			expect(result.getUTCMonth()).toBe(0); // January
		});

		it('must subtract weeks correctly', () => {
			const extDate = extendedDate(new Date('2024-01-15T00:00:00.000Z'));
			const result = extDate.minus(2, 'week');

			expect(result.getUTCDate()).toBe(1);
			expect(result.getUTCMonth()).toBe(0); // January
		});

		it('must subtract months correctly', () => {
			const extDate = extendedDate(new Date('2024-05-15T00:00:00.000Z'));
			const result = extDate.minus(2, 'month');

			expect(result.getUTCMonth()).toBe(2); // March
			expect(result.getUTCDate()).toBe(15);
		});

		it('must subtract years correctly', () => {
			const extDate = extendedDate(new Date('2024-05-15T00:00:00.000Z'));
			const result = extDate.minus(1, 'year');

			expect(result.getUTCFullYear()).toBe(2023);
			expect(result.getUTCMonth()).toBe(4); // May
			expect(result.getUTCDate()).toBe(15);
		});
	});

	describe('plus', () => {
		it('must add days correctly', () => {
			const extDate = extendedDate(new Date('2024-01-15T00:00:00.000Z'));
			const result = extDate.plus(5, 'day');

			expect(result.getUTCDate()).toBe(20);
			expect(result.getUTCMonth()).toBe(0); // January
		});

		it('must add weeks correctly', () => {
			const extDate = extendedDate(new Date('2024-01-15T00:00:00.000Z'));
			const result = extDate.plus(2, 'week');

			expect(result.getUTCDate()).toBe(29);
			expect(result.getUTCMonth()).toBe(0); // January
		});

		it('must add months correctly', () => {
			const extDate = extendedDate(new Date('2024-05-15T00:00:00.000Z'));
			const result = extDate.plus(2, 'month');

			expect(result.getUTCMonth()).toBe(6); // July
			expect(result.getUTCDate()).toBe(15);
		});

		it('must add years correctly', () => {
			const extDate = extendedDate(new Date('2024-05-15T00:00:00.000Z'));
			const result = extDate.plus(1, 'year');

			expect(result.getUTCFullYear()).toBe(2025);
			expect(result.getUTCMonth()).toBe(4); // May
			expect(result.getUTCDate()).toBe(15);
		});
	});
});
