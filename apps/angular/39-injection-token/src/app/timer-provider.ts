import { InjectionToken } from '@angular/core';
import { DEFAULT_TIMER } from './data';

export const TIMER = new InjectionToken<number>('timer', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
