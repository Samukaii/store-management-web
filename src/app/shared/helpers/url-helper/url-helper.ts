import { Generic } from "../../models/generic";

export class UrlHelper {
	static joinParams(url: string, params: Generic) {
		const slices = url.split('/').map(slice => {
			if (!slice.startsWith(':')) return slice;

			const key = slice.replace(':', '');

			const result = params?.[key];

			return result ?? slice;
		});

		return slices.join('/');
	}
}
