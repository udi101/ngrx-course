import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {finalize, take, tap} from 'rxjs/operators';

import {AppState} from '../reducers';
import {CourseActions} from './actions-types';

@Injectable({providedIn: 'root'})
export class CoursesResolver implements Resolve<AppState> {
  isLoading = false;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.isLoading) {
          this.isLoading = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      take(1),
      finalize(() => this.isLoading = false)
    );
  }

  constructor(private store: Store<AppState>) {
  }

}


/*
import { loadAllCourses } from './course.actions';
import { finalize, take, tap } from 'rxjs/operators';
import { AppState } from './../reducers/index';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable({ providedIn: 'root' })
export class CoursesResolver implements Resolve<any>{

  loading = false;
  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      take(1),
      finalize(() => this.loading = false)
    );
  }
}
*/


