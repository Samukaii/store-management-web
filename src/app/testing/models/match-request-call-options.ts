import { Generic } from "../../shared/models/generic";

interface BaseRequestOptions {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	queryParams?: Generic;
	body?: Generic;
}

export type MatchRequestCallOptions = BaseRequestOptions &
	({
		responseType: 'success',
		response: any;
	} | {
		responseType: 'error',
		response: {
			error: string | Generic;
			status: number;
			statusText: string;
		}
	});
