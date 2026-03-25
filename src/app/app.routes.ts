import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () =>
    import('./features/figures/figures.routes').then(m => m.FIGURES_ROUTES) },
];
