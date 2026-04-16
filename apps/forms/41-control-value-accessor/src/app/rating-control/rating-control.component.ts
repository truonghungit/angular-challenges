import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RatingControlComponent),
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  protected value: number | null = null;
  protected disabled = false;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  setRating(index: number): void {
    if (this.disabled) {
      return;
    }

    this.value = index + 1;

    if (this.onTouched && typeof this.onTouched === 'function') {
      this.onTouched();
    }

    if (this.onChange && typeof this.onChange === 'function') {
      this.onChange(`${this.value}`);
    }
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
