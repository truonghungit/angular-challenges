import { TableComponent } from '@angular-challenges/shared/ui';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  input,
} from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[product]',
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Directive({
  selector: 'tr[product]',
})
export class TableRowDirective {
  private readonly currencyService = inject(CurrencyService);

  product = input<Product>();

  ngOnInit() {
    const product = this.product();
    if (product) {
      this.currencyService.patchState({ code: product.currencyCode });
    }
  }
}

@Component({
  imports: [
    TableComponent,
    CurrencyPipe,
    AsyncPipe,
    ProductDirective,
    TableRowDirective,
  ],
  providers: [CurrencyService],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          @for (col of displayedColumns; track $index) {
            <th>
              {{ col }}
            </th>
          }
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr [product]="product">
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
