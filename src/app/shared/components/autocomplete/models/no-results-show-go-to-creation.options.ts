import { FormKeyOptions } from "../src/app/core/services/form-persistence/models/form-key-options";
import { Generic } from "../../../models/generic";

export interface NoResultsShowGoToCreationOptions {
	noResultsIcon: string;
	source: {
		message: string;
		icon: string;
		persistForm?: {
			key: FormKeyOptions;
			value: Generic;
		}
	},
	destination: {
		url: string;
		persistForm?: {
			key: FormKeyOptions;
			value: Generic
		}
	}
}
