import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { UserStore } from './user.service';

@Component({
  selector: 'address-user',
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Address:
      <div>Street: {{ address().street }}</div>
      <div>ZipCode: {{ address().zipCode }}</div>
      <div>City: {{ address().city }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class AddressComponent {
  private readonly userService = inject(UserStore);

  address = computed(
    () => {
      const user = this.userService.user();

      return {
        street: user.address.street,
        zipCode: user.address.zipCode,
        city: user.address.city,
      };
    },
    {
      equal: (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
    },
  );
}
