import { Component } from '@angular/core';
import { PersonUtilFunctionPipe } from './person-utils.pipe';
import { PersonUtils } from './person.utils';

@Component({
  selector: 'app-root',
  imports: [PersonUtilFunctionPipe],
  template: `
    @for (activity of activities; track activity.name) {
      <div>
        {{ activity.name }} :
        @for (
          person of persons;
          track person.name;
          let index = $index;
          let isFirst = $first
        ) {
          <div>
            {{ person.name | personUtil: 'showName' : index }}
            {{
              person.age
                | personUtil: 'isAllowed' : isFirst : activity.minimumAge
            }}
          </div>
        }
      </div>
    }
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];

  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
