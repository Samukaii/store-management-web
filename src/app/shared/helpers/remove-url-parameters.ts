export const removeUrlParameters = (url: string) => {
	return url.replace(/\?.+/g, '');
}
