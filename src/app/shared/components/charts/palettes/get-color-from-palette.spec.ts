import { getColorFromPalette } from "src/app/shared/components/charts/palettes/get-color-from-palette";
import { bluePalette } from "src/app/shared/components/charts/palettes/blue-palette";


describe(getColorFromPalette.name, () => {
	it('should return the correct color based on the index within the palette range', () => {
		const palette = ['#FF5733', '#33FF57', '#3357FF'];
		expect(getColorFromPalette(0, palette)).toBe('#FF5733');
		expect(getColorFromPalette(1, palette)).toBe('#33FF57');
		expect(getColorFromPalette(2, palette)).toBe('#3357FF');
	});

	it('must loop through the palette when the index exceeds its length', () => {
		const palette = ['#FF5733', '#33FF57', '#3357FF'];
		expect(getColorFromPalette(3, palette)).toBe('#FF5733');
		expect(getColorFromPalette(4, palette)).toBe('#33FF57');
		expect(getColorFromPalette(5, palette)).toBe('#3357FF');
	});

	it('must use the default palette if none is provided', () => {
		bluePalette.forEach((color, index) => {
			expect(getColorFromPalette(index)).toBe(color);
		});

		bluePalette.forEach((color, index) => {
			expect(getColorFromPalette(index + bluePalette.length)).toBe(color);
		});
	});

	it('must throw an error if the provided palette is empty', () => {
		expect(() => getColorFromPalette(0, [])).toThrow('Palette provided is empty');
	});
});
