import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../../auth-service/auth.service';
import { AuthRoutes } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private auth: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    const user = this.auth.userValue();
    if (user) {
      return true;
    } else {
      const returnUrl = segments.map((s: UrlSegment) => s.path).join('/')
      this.router.navigate([AuthRoutes.REGISTER], { queryParams: { returnUrl } })
      return false
    }
  }
}
