import { InjectionToken } from "@angular/core";
import { AppRouteConfiguration } from "../../models/app-route-configuration";
import { AppRoutes } from "../../models/app-routes";

export const ALL_ROUTE_CONFIGURATION = new InjectionToken<AppRoutes>('all-route-configuration');
