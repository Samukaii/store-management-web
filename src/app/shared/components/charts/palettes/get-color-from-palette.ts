import { bluePalette } from "src/app/shared/components/charts/palettes/blue-palette";

export const getColorFromPalette = (index: number, palette = bluePalette): string => {
	if(!palette.length)
		throw new Error("Palette provided is empty")

	return palette[index % palette.length];
}
