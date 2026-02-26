import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../core/services/reserva.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HospedeService } from '../../core/services/hospede.service';
import { Hospede } from '../../core/models/hospede.model';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservaComponent {

  formulario!: FormGroup;
  hospedes: Hospede[] = [];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private hospedeService: HospedeService
  ) {}

   ngOnInit(): void {

    this.formulario = this.fb.group({
      hospedeId: ['', Validators.required],
      dataEntradaPrevista: ['', Validators.required],
      dataSaidaPrevista: ['', Validators.required],
      usaVaga: [false]
    });

    this.carregarHospedes(); 
  }
    carregarHospedes() {
  this.hospedeService.listar().subscribe((dados) => {
    this.hospedes = dados;
  });

  }

  cadastrar() {
    if (this.formulario.valid) {
      this.reservaService.criar(this.formulario.value)
        .subscribe({
          next: () => {
            alert('Reserva criada com sucesso!');
            this.formulario.reset();
          },
          error: (err: any) => {
            alert(err.error.message || 'Erro ao criar reserva');
          }
        });
    }
  }
  
}