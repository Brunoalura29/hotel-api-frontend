import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  loading = false;
  reserva: any;
  resultado: any;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private location: Location
  ) {}

 ngOnInit() {
  this.route.paramMap.subscribe(params => {

    const param = params.get('id');
    this.id = Number(param);

    this.reservaService.buscarPorId(this.id)
      .subscribe(dados => {
        this.reserva = dados;
        this.cd.detectChanges(); 
      });

  });
} 

confirmarCheckout() {

  this.loading = true; 
  this.reservaService.checkout(this.id)
    .subscribe({
      next: (res) => {
        this.resultado = res;
        this.reserva.status = 'CHECKED_OUT';
        this.loading = false; 
        this.cd.detectChanges();
      },
      error: (err) => {
        this.loading = false; 
        console.error(err);
      }
    });
  }
  voltar() {
  this.location.back();
}
}