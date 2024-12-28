export const camelToKebab = (text: string) => {
	return text
		.replaceAll(/([A-Z])/g, '-$1')
		.replace(/^-/, '')
		.toLowerCase();
};
