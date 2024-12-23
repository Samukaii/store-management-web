import { Generic } from "../../shared/models/generic";

export const applySorting = <T>(list: T[], params: Generic = {}) => {
	const direction = params['sortDirection'] as 'asc' | 'desc';
	const sortProperty = params['sortProperty'] as keyof T;

	if (params?.['sortProperty'] && params?.['sortDirection']) {
		return list.sort((previous, current) => {
			if (previous[sortProperty]===current[sortProperty])
				return 0;

			if (direction==='asc')
				return previous[sortProperty] > current[sortProperty] ? 1:-1;

			if (direction==='desc')
				return previous[sortProperty] < current[sortProperty] ? 1:-1;

			return 0;
		});
	}

	return list;
};
