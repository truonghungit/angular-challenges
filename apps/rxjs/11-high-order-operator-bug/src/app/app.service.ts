import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);

    if (!infoByType?.length) {
      return of(true);
    }

    const requests$ = infoByType.map((t) =>
      this.dbService.deleteOneTopic(t.id).pipe(
        tap((result) => {
          if (result) {
            console.log(`${type} with id ${t.id} deleted successfully.`);
          } else {
            console.error(`Failed to delete ${type} with id ${t.id}.`);
          }
        }),
        catchError((error) => {
          console.error(
            `There was an error while deleting ${type} with id ${t.id}.`,
            error,
          );
          return of(false);
        }),
      ),
    );

    return forkJoin(requests$).pipe(
      tap((results) =>
        console.log(
          `All deletion requests for ${type} completed with results:`,
          results,
        ),
      ),
      map((results) => results.every((r) => r)),
    );
  }
}
