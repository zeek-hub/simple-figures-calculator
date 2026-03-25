import {SquarePage} from './pages/square-page/square-page';
import {TrianglePage} from './pages/triangle-page/triangle-page';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const FIGURES_ROUTES: Routes = [
  { path: 'square', component: SquarePage },
  { path: 'triangle', component: TrianglePage },
  { path: '', redirectTo: '/square', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(FIGURES_ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class FigureRoutingModule {}
