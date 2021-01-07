import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { View, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import Projection from 'ol/proj/Projection';
import * as proj4x from 'proj4';
let proj4 = (proj4x as any).default;
import { register } from 'ol/proj/proj4';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import { get as GetProjection } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as L from 'leaflet';
var GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
var GraphHopperOptimization = require('graphhopper-js-api-client/src/GraphHopperOptimization');
var GHInput = require('graphhopper-js-api-client/src/GHInput');
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphHopperRouteOptim, Point, Solution, test_data } from './test-data';
import { environment } from 'src/environments/environment';
import {
  addBinToMap,
  createMarker,
  DEFAULT_TILE_LAYER,
  eqAddress,
  getMapColor,
  getRouteStyle,
} from '../maps.utils';
import { Bin } from '../bin.model';
import { ActivatedRoute } from '@angular/router';
/*/// <reference path="../../../../node_modules/@types/leaflet/index.d.ts" />
namespace L {

}*/

//inspired by https://github.com/graphhopper/directions-api-js-client/blob/master/js/demo.js

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  @ViewChild('map') mapElement!: ElementRef;

  bins!: Bin[];

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private _snackbar: MatSnackBar,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bins = this._activateRoute.snapshot.data.bins ?? [];
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
  }

  ngOnDestroy(): void {
    if (!!this.map) {
      this.map.off();
      this.map.remove();
    }
  }
  private initMap(): void {
    const tiles = DEFAULT_TILE_LAYER;

    this.map = L.map(this.mapElement.nativeElement).addLayer(tiles);

    if(this.bins.length > 0){
      const firstBin: Bin = this.bins[0];
      this.map.setView([firstBin.location.latitude, firstBin.location.longitude], 13);
      this.createMarkers(this.bins);
    }

  }

  private createMarkers(bins: Bin[]) {
    bins.forEach((bin) => addBinToMap(this.map, bin));
  }

}
