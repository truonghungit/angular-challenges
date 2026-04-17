import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(appRoutes),
    provideToken('main-shell-token'),
  ],
};
