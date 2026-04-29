import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { CanDeactivateComponent } from '../guards/unsaved-changes.guard';
import { AlertDialogComponent } from '../ui/dialog.component';
import { FormComponent } from '../ui/form.component';

@Component({
  imports: [FormComponent],
  template: `
    <section class="mx-auto max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form #form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements CanDeactivateComponent {
  dialog = inject(Dialog);
  formComponentRef = viewChild(FormComponent);

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    const form = this.formComponentRef()?.form;
    if (form && form.dirty) {
      event.preventDefault();
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    const form = this.formComponentRef()?.form;
    if (!form || !form.dirty) {
      return true;
    }

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      role: 'alertdialog',
      ariaDescribedBy: 'dialog-description',
      ariaLabelledBy: 'dialog-title',
      ariaModal: true,
    });

    return dialogRef.closed.pipe(
      map((canLeave) => {
        return canLeave === true;
      }),
    );
  }
}
