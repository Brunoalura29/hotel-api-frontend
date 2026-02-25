import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospede } from '../models/hospede.model';


@Injectable({
  providedIn: 'root'
})
export class HospedeService {

  private apiUrl = 'http://localhost:8080/api/hospedes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Hospede[]> {
    return this.http.get<Hospede[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Hospede> {
    return this.http.get<Hospede>(`${this.apiUrl}/${id}`);
  }

  criar(hospede: Hospede): Observable<Hospede> {
    return this.http.post<Hospede>(this.apiUrl, hospede);
  }

  atualizar(id: number, hospede: Hospede): Observable<Hospede> {
    return this.http.put<Hospede>(`${this.apiUrl}/${id}`, hospede);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}