import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CourseActions} from './actions-types';
import {switchMap, map} from 'rxjs/operators';
import {CoursesHttpService} from './services/courses-http.service';


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      switchMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CourseActions.allCoursesLoaded({courses}))
      )
    );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService) {
  }
}
