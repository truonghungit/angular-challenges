import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TopicType } from './topic.service';

export type TopicModalData = {
  topics$: Observable<TopicType[]>;
};

@Component({
  template: `
    <h1 mat-dialog-title>Show all Topics</h1>
    <div mat-dialog-content>
      <ul>
        @for (topic of data.topics$ | async; track $index) {
          <li>
            {{ topic }}
          </li>
        }
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  imports: [AsyncPipe, MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicModalComponent {
  data: TopicModalData = inject(MAT_DIALOG_DATA);
}
