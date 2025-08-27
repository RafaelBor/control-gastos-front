import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /**
   * Muestra un mensaje de éxito
   * @param message Mensaje a mostrar
   * @param title Título del mensaje (opcional)
   */
  success(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      background: '#b089d8'
    });
  }

  /**
   * Muestra un mensaje de error
   * @param message Mensaje a mostrar
   * @param title Título del mensaje (opcional)
   */
  error(message: string, title: string = 'Error') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      background: '#b089d8'
    });
  }

  /**
   * Muestra un mensaje de advertencia
   * @param message Mensaje a mostrar
   * @param title Título del mensaje (opcional)
   */
  warning(message: string, title: string = 'Advertencia') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
      background: '#b089d8'
    });
  }

  /**
   * Muestra una alerta de confirmación
   * @param message Mensaje a mostrar
   * @param title Título del mensaje (opcional)
   * @returns Una promesa con el resultado (true si el usuario confirmó)
   */
  async confirm(message: string, title: string = 'Confirmación'): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      background: '#b089d8'
    });

    return result.isConfirmed;
  }
}
