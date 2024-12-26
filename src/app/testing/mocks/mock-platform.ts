import { PLATFORM_ID } from "@angular/core";
import { PlatformType } from "src/app/shared/models/platform-type";

export const mockPlatform = (id: PlatformType) => {
	return {
		provide: PLATFORM_ID,
		useValue: id
	}
};
