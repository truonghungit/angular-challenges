import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  Subscription,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({ selector: '[holdable]' })
export class HoldableDirective implements OnInit, OnDestroy {
  duration = input.required<number>();
  complete = output<void>();
  progressUpdated = output<number>();

  private elementRef = inject(ElementRef);
  private sub: Subscription | null = null;

  ngOnInit() {
    const element = this.elementRef.nativeElement as HTMLElement;
    const resetEvents$ = merge(
      fromEvent(element, 'mouseup'),
      fromEvent(element, 'mouseleave'),
    );

    this.sub = fromEvent(element, 'mousedown')
      .pipe(
        switchMap(() => {
          return interval(10).pipe(
            takeUntil(resetEvents$),
            map((value) => (value + 1) * 10),
            tap((value) => {
              const progress = Math.round((value / this.duration()) * 100);
              this.progressUpdated.emit(progress);
            }),
            filter((value) => value >= this.duration()),
            take(1),
            tap(() => {
              this.complete.emit();
            }),
          );
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
