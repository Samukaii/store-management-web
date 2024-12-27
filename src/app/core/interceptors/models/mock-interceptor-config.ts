import { RandomSchema } from "src/app/shared/models/random-schema";

export interface MockInterceptorConfig {
	baseUrl: string;
	schema: RandomSchema;
	persist?: boolean;
	delay?: number;
	count?: number;
}
