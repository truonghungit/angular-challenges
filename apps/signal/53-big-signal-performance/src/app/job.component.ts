import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'job',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Job:
      <div>title: {{ job().title }}</div>
      <div>salary: {{ job().salary }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class JobComponent {
  private readonly userService = inject(UserStore);

  job = computed(
    () => ({
      title: this.userService.user().title,
      salary: this.userService.user().salary,
    }),
    {
      equal: (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
    },
  );
}
