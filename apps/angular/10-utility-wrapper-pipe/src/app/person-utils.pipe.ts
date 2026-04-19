import { Pipe, PipeTransform } from '@angular/core';

import { PersonUtils } from './person.utils';

type PersonUtilFunctionName = keyof typeof PersonUtils;

type PersonUtilFunctionParams<T extends PersonUtilFunctionName> = Parameters<
  (typeof PersonUtils)[T]
>;

type FirstParam<T> = T extends [infer First, ...unknown[]] ? First : never;

type RestParams<T> = T extends [unknown, ...infer Rest] ? Rest : never;

@Pipe({
  name: 'personUtil',
})
export class PersonUtilFunctionPipe implements PipeTransform {
  transform<T extends PersonUtilFunctionName>(
    value: FirstParam<PersonUtilFunctionParams<T>>,
    functionName: T,
    ...args: RestParams<PersonUtilFunctionParams<T>>
  ): ReturnType<(typeof PersonUtils)[T]> {
    /*
    TODO: This is a bit of a hack to call the correct function
    from PersonUtils based on the functionName argument.
    We need to assert that the function exists and is callable,
    but we also want to maintain type safety as much as possible.
    The type assertions here are necessary to satisfy TypeScript's type system,
    but they should be safe as long as the functionName argument is valid.
    */
    return (PersonUtils[functionName] as Function)(value, ...args);
  }
}
