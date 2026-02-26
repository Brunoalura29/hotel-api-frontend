export interface Reserva {
  id?: number;
  hospedeId: number;
  dataEntradaPrevista: string;
  dataSaidaPrevista: string;
  usaVaga: boolean;
}