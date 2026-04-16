import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from './currency.service';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  currencyService = inject(CurrencyService);

  transform(price: number, currencyCode: string): string {
    const symbol = this.currencyService.getSymbol(currencyCode);

    return `${price}${symbol}`;
  }
}
