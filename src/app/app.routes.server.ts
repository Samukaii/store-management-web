import { RenderMode, ServerRoute } from "@angular/ssr";

export const appRoutesServer: Array<ServerRoute> = [
	{
		path: '**',
		renderMode: RenderMode.Server,
	},
];
