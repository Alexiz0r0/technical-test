import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _ocultarModal: boolean = true;

  public updateChanges: EventEmitter<number> = new EventEmitter<number>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  private _ocultarEditModal: boolean = true;

  get ocultarEditModal() {
    return this._ocultarEditModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  openEditModal() {
    this._ocultarEditModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
    this._ocultarEditModal = true;
  }
}
