import { createInput } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { Bin, LatLng } from '../bin.model';
import {
  DEFAULT_TILE_LAYER,
  getRouteStyle,
  eqAddress,
  createMarker,
  getMapColor,
  START_COLOR,
  END_COLOR,
  addBinToMap,
  popupText,
} from '../maps.utils';
import {
  test_data,
  GraphHopperRouteOptim,
  Solution,
} from '../overview/test-data';
import { RoutePlannerService } from './route-planner.service';

@Component({
  selector: 'app-routes-planning',
  templateUrl: './routes-planning.component.html',
  styleUrls: ['./routes-planning.component.scss'],
  providers: [RoutePlannerService],
})
export class RoutesPlanningComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private pathsLayer!: L.GeoJSON;

  fullnessThresholdInput!: FormControl;
  isCircularRoute: boolean = false;

  private startLocation: LatLng | undefined;
  private endLocation: LatLng | undefined;

  private startMarker: L.Marker | undefined;
  private endMarker: L.Marker | undefined;

  choosingStart: boolean = false;
  choosingEnd: boolean = false;
  @ViewChild('map') mapElement!: ElementRef;

  private allBins!: Bin[];
  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private _snackbar: MatSnackBar,
    private _routePlannerService: RoutePlannerService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fullnessThresholdInput = new FormControl(50);
    this.allBins = this._activatedRoute.snapshot.data.bins;
  }

  ngOnDestroy(): void {
    if (!!this.map) {
      this.map.off();
      this.map.remove();
    }
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
  }
  createRoute() {
    let error: string | null = null;
    if (!this.startLocation) {
      error = 'You must include a start location';
    } else if (!this.isCircularRoute && !this.endLocation) {
      error = 'Must include end of route or set to circular route';
    }

    if (!!error) {
      this._snackbar.open(error, undefined, { duration: 1000 });
      return;
    }

    this._routePlannerService
      .createRoutes(
        this.allBins.filter(bin => bin.fullness >= parseInt(this.fullnessThresholdInput.value)),
        [{ _id: 'test', username: 'Hello', password: 'asd' }, { _id: 'test2', username: 'Hello', password: 'asd' }],
        this.isCircularRoute,
        this.startLocation!,
        this.endLocation!
      )
      .subscribe((result) => {
        this.pathsLayer.clearLayers();
        this.createRoutes(result);
      });
  }

  private initMap(): void {
    const tiles = DEFAULT_TILE_LAYER;

    this.map = L.map(this.mapElement.nativeElement).addLayer(tiles);

    
    this.pathsLayer = L.geoJSON().addTo(this.map);
    this.pathsLayer.options = {
      // use style provided by the 'properties' entry of the geojson added by addDataToRoutingLayer
      style: function (feature) {
        return feature?.properties && feature?.properties.style;
      },
    };

    if (this.allBins.length > 0) {
      const firstBin: Bin = this.allBins[0];
      this.map.setView(
        [firstBin.location.latitude, firstBin.location.longitude],
        13
      );
      this.allBins.forEach((bin) => addBinToMap(this.pathsLayer, bin));
    }

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const loc: LatLng = {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      };
      if (this.choosingStart) {
        this.startLocation = loc;
        this.choosingStart = false;
        this.removeStartMarker();
        this.startMarker = new L.Marker([loc.latitude, loc.longitude], {
          icon: createMarker('Start', START_COLOR),
        }).addTo(this.map);
        this.cd.detectChanges();
      } else if (this.choosingEnd) {
        this.endLocation = loc;
        this.choosingEnd = false;
        this.removeEndMarker();
        this.endMarker = new L.Marker([loc.latitude, loc.longitude], {
          icon: createMarker('End', END_COLOR),
        }).addTo(this.map);

        this.cd.detectChanges();
      }
    });
  }

  private removeEndMarker(): void {
    if (!!this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }
  }

  private removeStartMarker(): void {
    if (!!this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
  }
  chooseEndLocation() {
    if (this.choosingStart) return;
    this.choosingEnd = !this.choosingEnd;
  }

  chooseStartLocation() {
    if (this.choosingEnd) return;

    this.choosingStart = !this.choosingStart;
  }

  isCiruclarChanged($event: MatCheckboxChange): void {
    this.isCircularRoute = $event.checked;
    if (this.isCircularRoute) {
      this.removeEndMarker();
    } else {
      if (!!this.map && !!this.endLocation) {
        this.endMarker = new L.Marker(
          [this.endLocation.latitude, this.endLocation.longitude],
          {
            icon: createMarker('End', END_COLOR),
          }
        ).addTo(this.map);
      }
    }
  }
  private createRoutes(json: GraphHopperRouteOptim): void {
    var sol = json.solution;
    if (!sol) return;


    this.printOptStats(sol);
    this.pathsLayer.clearLayers();
    
    const setMarkers: string[] = [];
    for (var routeIndex = 0; routeIndex < sol.routes.length; routeIndex++) {
      var route = sol.routes[routeIndex];

      const style = getRouteStyle(routeIndex);
      var firstAdd;

      // Add markers
      for (var actIndex = 0; actIndex < route.activities.length; actIndex++) {
        const id = route.activities[actIndex].id;
        var add = route.activities[actIndex].address;

        if (actIndex !== 0) setMarkers.push(id ?? "");

        if (!eqAddress(firstAdd, add)){
          const bin = this.allBins.find(b => b._id === id)
          if(!!bin){
            this.addPointToMap(
              bin,
              actIndex,
              routeIndex
            );
          }
          
        }
          

        if (actIndex === 0) firstAdd = add;
      }


      // Add paths
      for (var pathIndex = 0; pathIndex < route.points.length; pathIndex++) {
        var path = route.points[pathIndex];
        this.pathsLayer.addData({
          type: 'Feature',
          geometry: path,
          properties: {
            style,
          },
        } as any);
      }
    }

    this.allBins.filter(bin => !setMarkers.includes(bin._id)).forEach(bin =>{
      new L.Marker([bin.location.latitude, bin.location.longitude], {
        icon: createMarker(`${bin.fullness}%`, "#555555"),
      }).bindPopup(popupText(bin)).addTo(this.pathsLayer);
    });
  }

  private addPointToMap(
    bin: Bin,
    index: number,
    style: number
  ) {
    let marker: L.Marker;
    if (index === 0) {
      marker = new L.Marker([bin.location.latitude, bin.location.longitude], {
        icon: createMarker('Start', getMapColor(style)),
      });
    } else {
      marker = new L.Marker([bin.location.latitude, bin.location.longitude], {
        icon: createMarker(`${index + 1}`, getMapColor(style)),
      });
    }

    marker.bindPopup(popupText(bin));
    marker.addTo(this.pathsLayer);
  }

  private printOptStats(sol: Solution) {
    let message =
      'Solution found for ' +
      sol.routes.length +
      ' vehicle(s)! ' +
      'Distance: ' +
      Math.floor(sol.distance / 1000) +
      'km ' +
      ', time: ' +
      Math.floor(sol.time / 60) +
      'min ' +
      ', costs: ' +
      sol.costs;

    var no_unassigned =
      sol.unassigned.services.length + sol.unassigned.shipments.length;
    if (no_unassigned > 0) message += ', unassigned jobs: ' + no_unassigned;

    this._snackbar.open(message, undefined, { duration: 500 });
  }
}
