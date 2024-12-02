import { RandomSchema } from "../../../shared/models/random-schema";

export interface MockInterceptorConfig {
	baseUrl: string;
	schema: RandomSchema;
	persist?: boolean;
	delay?: number;
	count?: number;
}
