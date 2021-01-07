import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  addBinToMap,
  DEFAULT_TILE_LAYER,
} from '../maps.utils';
import { Bin } from '../bin.model';
import { ActivatedRoute } from '@angular/router';

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
