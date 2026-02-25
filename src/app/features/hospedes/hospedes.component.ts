import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospedeService } from '../../core/services/hospede.service';
import { Hospede } from '../../core/models/hospede.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospedes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hospedes.component.html',
  styleUrls: ['./hospedes.component.css']
})
export class HospedesComponent implements OnInit {

  hospedes: Hospede[] = [];
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hospedeService: HospedeService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.listarHospedes();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      temCarro: [false]
    });
  }

  listarHospedes() {
    this.hospedeService.listar().subscribe(dados => {
      this.hospedes = dados;
    });
  }

  cadastrar() {
    if (this.formulario.valid) {
      this.hospedeService.criar(this.formulario.value)
        .subscribe({
          next: () => {
            alert('Hóspede cadastrado com sucesso!');
            this.formulario.reset({
            temCarro: false
            });     
            this.listarHospedes(); // 🔥 Atualiza lista automaticamente
          },
          error: () => {
            alert('Erro ao cadastrar.');
          }
        });
    }
  }
}