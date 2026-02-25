import { Routes } from '@angular/router';
import { HospedesComponent } from './features/hospedes/hospedes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hospedes', pathMatch: 'full' },
  { path: 'hospedes', component: HospedesComponent }
];