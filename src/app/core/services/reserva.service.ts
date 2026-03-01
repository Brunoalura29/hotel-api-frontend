import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}

  checkin(reservaId: number) {
  return this.http.put(`http://localhost:8080/api/ops/checkin/${reservaId}`, {});
}

  criar(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.api, reserva);
  }

  buscarPorStatus(status: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.api}/status/${status}`);
  }
}