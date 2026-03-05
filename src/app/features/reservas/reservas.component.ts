import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../core/services/reserva.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HospedeService } from '../../core/services/hospede.service';
import { Hospede } from '../../core/models/hospede.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservaComponent implements OnInit{

  formulario!: FormGroup;
  hospedes: Hospede[] = [];
  reservados: any[] = [];
  hospedados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private hospedeService: HospedeService,
    private router: Router
  ) {}

   ngOnInit(): void {

    this.formulario = this.fb.group({
      hospedeId: ['', Validators.required],
      dataEntradaPrevista: ['', Validators.required],
      dataSaidaPrevista: ['', Validators.required],
      usaVaga: [false],
    });

    this.carregarHospedes(); 
    this.carregarReservas();
  }

   carregarHospedes() {
  this.hospedeService.listar().subscribe((dados) => {

    this.hospedes = dados.sort((a, b) =>
      a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
    );

  });

  }

  carregarReservas() {

  this.reservaService.buscarPorStatus('RESERVADO')
    .subscribe((dados: any[]) => {
      this.reservados = dados;
    });

  this.reservaService.buscarPorStatus('CHECKED_IN')
    .subscribe((dados: any[]) => {
      this.hospedados = dados;
    });
}

  cadastrar() {
    if (this.formulario.valid) {
     
      const formValue = this.formulario.value;
    const reserva = {
      ...formValue,
      dataEntradaPrevista: formValue.dataEntradaPrevista + 'T14:00:00',
      dataSaidaPrevista: formValue.dataSaidaPrevista + 'T12:00:00'
    };

      this.reservaService.criar(reserva)
        .subscribe({
          next: () => {
            alert('Reserva criada com sucesso!');
            this.formulario.reset();
            this.carregarReservas();
          },
          error: (err: any) => {
            alert(err.error.message || 'Erro ao criar reserva');
          }
        });
    }
  }
  irParaCheckin(id: number) {
  this.router.navigate(['/checkin', id]);
}

voltar() {
  this.router.navigate(['/hospedes']);
}

irParaCheckout(id: number) {
  this.router.navigate(['/checkout', id]);
}
  
}