import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { WorkersComponent } from './workers/workers.component';
import { RoutesPlanningComponent } from './routes-planning/routes-planning.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BinsResolverService } from './bins-resolver.service';
import {MatSliderModule} from '@angular/material/slider';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent, resolve: {bins: BinsResolverService} },
  {path: 'route-planner', component: RoutesPlanningComponent, resolve: {bins: BinsResolverService}},
  {path: 'workers', component: WorkersComponent},
  {
    path: '**',
    redirectTo: 'overview',
  },
];
@NgModule({
  declarations: [OverviewComponent, WorkersComponent, RoutesPlanningComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [
    BinsResolverService
  ]
})
export class OverviewModule {}
