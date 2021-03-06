import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { readdir } from 'fs';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:"overview",
    loadChildren: () => import("./overview/overview.module").then(m => m.OverviewModule),
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: "overview"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
