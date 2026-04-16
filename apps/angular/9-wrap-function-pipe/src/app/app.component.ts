import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFunction',
  pure: true,
})
export class WrapFunctionPipe implements PipeTransform {
  transform<R>(fn: (...args: unknown[]) => R, ...args: unknown[]): R | null {
    return fn(...args);
  }
}
@Component({
  selector: 'app-root',
  imports: [WrapFunctionPipe],
  template: `
    @for (person of persons; track person.name) {
      {{ showName | wrapFunction: person.name : $index }}
      {{ isAllowed | wrapFunction: person.age : $first }}
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
