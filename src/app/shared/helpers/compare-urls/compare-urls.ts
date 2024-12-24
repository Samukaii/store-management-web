export const compareUrls = (schema: string, url: string): Record<string, string> | undefined => {
	const schemaParts = schema.split('/');
	const urlParts = url.split('/');

	if (schemaParts.length !== urlParts.length) {
		return undefined;
	}

	const params: Record<string, string> = {};

	for (let i = 0; i < schemaParts.length; i++) {
		const schemaPart = schemaParts[i];
		const urlPart = urlParts[i];

		if (schemaPart.startsWith(':')) {
			const paramName = schemaPart.slice(1);
			params[paramName] = urlPart;

		} else if (schemaPart !== urlPart) {
			return undefined;
		}
	}

	return params;
};
