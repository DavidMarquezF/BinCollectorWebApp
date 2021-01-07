import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/core/auth/user.model';
import { environment } from 'src/environments/environment';
import { Bin, LatLng } from '../bin.model';
import { GraphHopperRouteOptim } from '../overview/test-data';
import { WorkerGB } from './worker.model';
var GraphHopperOptimization = require('graphhopper-js-api-client/src/GraphHopperOptimization');

@Injectable()
export class RoutePlannerService {
  private ghOptimizer: typeof GraphHopperOptimization;
  constructor(private _httpClient: HttpClient) {
    this.ghOptimizer = new GraphHopperOptimization({key: environment.green_hopper_key, profile: "truck"});
  }

  public getUsers(): Observable<WorkerGB[]>{
    return this._httpClient.get<WorkerGB[]>(environment.appUrl + "user");
  }

  public createRoutes(
    bins: Bin[],
    users: WorkerGB[],
    cirular: boolean,
    startLocation: LatLng,
    endLocation: LatLng
  ): Observable<GraphHopperRouteOptim> {
    const vehicles = users.map((u) => ({
      vehicle_id: u._id,
      type_id: 'garbadge_truck',
      start_address: {
        location_id: 'gb_loc',
        lat: startLocation.latitude,
        lon: startLocation.longitude,
      },
      ...cirular ? {} : {end_address: {
        location_id: "end_loc",
        lat: endLocation.latitude,
        lon: endLocation.longitude
      }}}));

    const vehicle_types = [
      {
        type_id: 'garbadge_truck',
        profile: 'truck',
      },
    ];

    const services = bins.map((bin) => ({
      id: bin._id,
      name: 'Pick GB',
      address: {
        location_id: `${bin.location.longitude}_${bin.location.latitude}`,
        lon: parseFloat(bin.location.longitude as any),
        lat: parseFloat(bin.location.latitude as any),
      }
    }));

    const objectives = [
      {
        "type": "min-max",
        "value": "completion_time"
     },
     {
        "type": "min-max",
        "value": "activities"
     }
    ];

    const configuration = {
      routing: {
        calc_points: true,
        snap_preventions: ['motorway', 'trunk', 'tunnel', 'bridge', 'ferry'],
      },
    };

    

    //TODO: I don't like this, i just use it because it works and the normal call to the service gives CORS error
  //  this.ghOptimizer.clear();
   //this.ghOptimizer.addPoint({lat: startLocation.latitude, lng: startLocation.longitude})
    //bins.forEach(bin =>this.ghOptimizer.addPoint({lat: bin.location.latitude, lng: bin.location.longitude}))
    
    return from<Observable<GraphHopperRouteOptim>>(this.ghOptimizer.doRawRequest( {vehicles, objectives,configuration,services,vehicle_types}));

    //Gives CORS error. I don't know if I'm missing a header or what
    let headers  = new HttpHeaders()
    .append("content-type", "application/json")
    .append("accept", "application/json; charset=utf-8")
    .append("accept-encoding", "gzip, deflate, br")
   // .append(":authority:", "graphhopper.com")
    .append("sec-fetch-dest", "empty")
    .append("sec-fetch-mode", "cors")
    .append("sec-fetch-site", "cross-site")

    return this._httpClient.post<GraphHopperRouteOptim>(`https://graphhopper.com/api/1/vrp/optimize?key=${environment.green_hopper_key}`, {vehicles, objectives,configuration,services,vehicle_types}, {headers});
  }
}
