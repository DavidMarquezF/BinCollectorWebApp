import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  onAuth$: Observable<boolean>;
  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService, private _router: Router) {
    this.onAuth$ = this._authService.onLoggedInOut$
  }


  logout() {
    this._authService.logout();
    this._router.navigate(["/auth/login"]);
  }
}
