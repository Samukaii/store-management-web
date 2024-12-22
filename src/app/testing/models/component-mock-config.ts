import { DeepPartial } from "../../shared/models/deep-partial";

type ComponentStyles = Record<string, string>;

export interface ComponentMockConfig<T> {
	selector?: string;
	template?: string;
	styles?: ComponentStyles;
	properties?: DeepPartial<T>;
}
