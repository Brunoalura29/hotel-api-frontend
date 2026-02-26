import { Routes } from '@angular/router';
import { HospedesComponent } from './features/hospedes/hospedes.component';
import { ReservaComponent } from './features/reservas/reservas.component';


export const routes: Routes = [
  { path: '', redirectTo: 'hospedes', pathMatch: 'full' },
  { path: 'hospedes', component: HospedesComponent },
  { path: 'reservas', component: ReservaComponent },
];