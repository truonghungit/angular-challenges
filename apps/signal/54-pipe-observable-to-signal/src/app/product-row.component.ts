import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product } from './product.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[product-row]',
  template: `
    <td>{{ product().name }}</td>
    <td>{{ product().priceA | currency: currencyCode() }}</td>
    <td>{{ product().priceB | currency: currencyCode() }}</td>
    <td>{{ product().priceC | currency: currencyCode() }}</td>
  `,
  imports: [CurrencyPipe],
  providers: [CurrencyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent {
  product = input.required<Product>();

  currencyCode = computed(() => this.product().currencyCode);
}
