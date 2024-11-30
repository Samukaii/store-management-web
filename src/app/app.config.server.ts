import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideServerRoutesConfig } from "@angular/ssr";
import { appRoutesServer } from "./app.routes.server";

const serverConfig: ApplicationConfig = {
	providers: [
		provideServerRendering(),
		provideServerRoutesConfig(appRoutesServer)
	]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
