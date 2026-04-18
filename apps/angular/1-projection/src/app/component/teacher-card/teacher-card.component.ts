import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  CardActions,
  CardComponent,
  CardContent,
  CardImage,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card customClass="bg-light-red">
      <img
        app-card-image
        ngSrc="assets/img/teacher.png"
        width="200"
        height="200"
        alt="" />

      <app-card-content>
        @for (item of teachers(); track item) {
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
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
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
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randTeacher());
  }
}
