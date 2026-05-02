import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable.directive';

@Component({
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          class="cursor-pointer rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700"
          holdable
          [duration]="2000"
          (complete)="onSend()"
          (progressUpdated)="progress.set($event)">
          Hold me
        </button>

        <progress [value]="progress()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = signal(0);

  onSend() {
    console.log('Save it!');
  }
}
