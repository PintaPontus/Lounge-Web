import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Server
    },
    {
        path: 'chat/**',
        renderMode: RenderMode.Client
    },
    {
        path: '**',
        renderMode: RenderMode.Server
    }
];
