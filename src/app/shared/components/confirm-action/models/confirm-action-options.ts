import { Button } from "../../button/models/button";

export interface ConfirmActionOptions {
	title: string;
	description?: string;
	actions?: {
		primary?: Partial<Button>;
		secondary?: Partial<Button>;
	}
}
