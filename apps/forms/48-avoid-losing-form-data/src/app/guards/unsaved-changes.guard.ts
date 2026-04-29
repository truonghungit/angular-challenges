import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component,
) => {
  if (
    component.canDeactivate &&
    typeof component.canDeactivate === 'function'
  ) {
    return component.canDeactivate();
  }

  return true;
};
