import { ButtonType } from "./button-type";

export interface Button {
	tooltip?: string;
	label?: string;
	icon?: string;
	type?: ButtonType;
	relativeRoute?: string;
	route?: string;
	disabled?: boolean;
	click?: () => void;
}
