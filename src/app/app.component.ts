import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import * as AuthSelectors from './auth/auth.selectors';
import { logout } from './auth/auth.actions';
import { AuthActions } from './auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {

  }

  ngOnInit() {

    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    if (user) { this.store.dispatch(AuthActions.login({ user })) }

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.isLoggedIn$ = this.store.select(AuthSelectors.isLoggedIn);

    this.isLoggedOut$ = this.store.select(AuthSelectors.isLoggedOut);
  }

  logout() {
    console.log('Logging out');
    this.store.dispatch(logout());
  }

}
