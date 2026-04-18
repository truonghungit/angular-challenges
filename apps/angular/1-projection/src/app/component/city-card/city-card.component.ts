import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import {
  CardActions,
  CardComponent,
  CardContent,
  CardImage,
} from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card customClass="bg-light-yellow">
      <img
        app-card-image
        ngSrc="assets/img/city.png"
        width="200"
        height="200"
        alt="" />

      <app-card-content>
        @for (item of cities(); track item) {
          <app-list-item
            [name]="item.name"
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
      ::ng-deep .bg-light-yellow {
        background-color: rgba(244, 246, 104, 0.1);
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
export class CityCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  deleteItem(id: number) {
    this.store.deleteOne(id);
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }
}
