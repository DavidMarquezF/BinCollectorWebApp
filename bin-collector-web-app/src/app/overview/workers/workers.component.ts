import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerGB } from '../routes-planning/worker.model';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  displayedColumns = ["name", "type"]
  workers!: WorkerGB[];
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.workers = this._activatedRoute.snapshot.data.workers;
  }

}
