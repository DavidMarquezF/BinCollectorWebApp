import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorkerGB } from '../worker.model';
@Component({
  selector: 'app-users-chooser',
  templateUrl: './users-chooser.component.html',
  styleUrls: ['./users-chooser.component.scss']
})
export class UsersChooserComponent implements OnInit {

  form!: FormArray;
  workers!: WorkerGB[]; 
  constructor(@Inject(MAT_DIALOG_DATA) private _data: {selected: WorkerGB[], workers: WorkerGB[]}, private _dialogRef: MatDialogRef<UsersChooserComponent>) { }

  ngOnInit(): void {
    const selected = this._data.selected.map(s => s._id);
    this.workers = this._data.workers;
    this.form = new FormArray(this._data.workers.map(w => new FormControl(selected.includes(w._id))));
  }

  selectWorkers(): void{
    this._dialogRef.close(this._data.workers.filter((u, i) => this.form.value[i]));

  }
  checkboxControl(i: number): FormControl{
    return this.form.controls[i] as FormControl;
  }

}
