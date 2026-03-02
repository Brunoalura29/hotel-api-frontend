import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../core/services/reserva.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css',
  template: `
    <h2>Confirmar Check-in</h2>
    <button (click)="realizarCheckin()">Confirmar</button>
  `
})
export class CheckinComponent implements OnInit{

  id!: number;
  reservaId!: number;

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private router: Router,
    private location: Location
  ) {}

    ngOnInit() {
    this.reservaId = Number(this.route.snapshot.paramMap.get('id'));
  }

   realizarCheckin() {
  this.reservaService.checkin(this.reservaId)
    .subscribe({
      next: () => {
        alert('Check-in realizado com sucesso!');
        this.router.navigate(['/reservas']);
      },
      error: (err) => {
        alert(err.error?.message || 'Erro ao realizar check-in');
      }
    });

  }
  voltar() {
  this.location.back();
}
}