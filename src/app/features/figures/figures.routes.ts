import { Routes } from '@angular/router';
import {SquarePage} from './pages/square-page/square-page';
import {TrianglePage} from './pages/triangle-page/triangle-page';

export const FIGURES_ROUTES: Routes = [
  { path: 'square', component: SquarePage },
  { path: 'triangle', component: TrianglePage },
  { path: '', redirectTo: '/square', pathMatch: 'full' },
];
