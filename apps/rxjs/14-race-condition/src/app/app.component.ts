import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { TopicModalComponent, TopicModalData } from './topic-dialog.component';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openTopicModal()">Open Topic</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  dialog = inject(MatDialog);
  topicService = inject(TopicService);

  ngOnInit(): void {}

  openTopicModal() {
    const topics$ = this.topicService.fakeGetHttpTopic().pipe(take(1));
    this.dialog.open<TopicModalComponent, TopicModalData>(TopicModalComponent, {
      data: { topics$ },
    });
  }
}
