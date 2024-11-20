import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";

export const injectIsAtBrowser = () => isPlatformBrowser(inject(PLATFORM_ID));

