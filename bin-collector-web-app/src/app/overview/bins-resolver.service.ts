import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bin } from './bin.model';

@Injectable()
export class BinsResolverService implements Resolve<Bin[]> {

  constructor(private _httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Bin[] | Observable<Bin[]> | Promise<Bin[]> {
    return this._httpClient.get<Bin[]>(environment.appUrl + "bin");
  }
}
