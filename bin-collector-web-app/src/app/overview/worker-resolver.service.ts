import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkerGB } from './routes-planning/worker.model';

@Injectable()
export class WorkerResolverService  implements Resolve<WorkerGB[]>{

  constructor(private _httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): WorkerGB[] | Observable<WorkerGB[]> | Promise<WorkerGB[]> {
    return this._httpClient.get<WorkerGB[]>(environment.appUrl + "user");
  }
}
