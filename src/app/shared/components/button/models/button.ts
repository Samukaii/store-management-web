import { ButtonType } from "./button-type";
import { AppColor } from "./app-color";
import {
	ButtonLoadingFinishStatus
} from "../../../directives/button-request-loading/models/button-loading-finish.status";

export interface Button<ClickArgs extends any[] = []> {
	iconColor?: AppColor;
	tooltip?: string;
	label?: string;
	icon?: string;
	type?: ButtonType;
	relativeRoute?: string;
	route?: string;
	disabled?: boolean;
	afterLoadingSuccess?: (status: ButtonLoadingFinishStatus) => void;
	afterLoadingError?: () => void;
	afterLoading?: (status: ButtonLoadingFinishStatus) => void;
	click?: (...args: ClickArgs) => void;
}
