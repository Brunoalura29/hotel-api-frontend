import { Routes } from '@angular/router';
import { HospedesComponent } from './features/hospedes/hospedes.component';
import { ReservaComponent } from './features/reservas/reservas.component';
import { CheckinComponent } from './features/checkin/checkin.component';
import { CheckoutComponent } from './features/checkout/checkout.component';



export const routes: Routes = [
  { path: '', redirectTo: 'hospedes', pathMatch: 'full' },
  { path: 'hospedes', component: HospedesComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: 'checkin/:id', component: CheckinComponent },
  { path: 'checkout/:id', component: CheckoutComponent }
];