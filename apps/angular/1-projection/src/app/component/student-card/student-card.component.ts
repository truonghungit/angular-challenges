import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  CardActions,
  CardComponent,
  CardContent,
  CardImage,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card customClass="bg-light-green">
      <img
        app-card-image
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        alt="" />

      <app-card-content>
        @for (item of students(); track item) {
          <app-list-item
            [name]="item.firstName"
            [id]="item.id"
            (delete)="deleteItem($event)" />
        }
      </app-card-content>

      <app-card-actions>
        <button
          class="w-full rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewItem()">
          Add
        </button>
      </app-card-actions>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    NgOptimizedImage,
    CardComponent,
    CardImage,
    CardContent,
    CardActions,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }
}
