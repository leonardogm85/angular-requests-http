import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  constructor(
    private _modalService: NgbModal
  ) { }

  show(title: string, message: string, confirm?: string, decline?: string): Observable<boolean> {
    const modalRef = this._modalService.open(ConfirmModalComponent, {
      backdrop: 'static',
      keyboard: false
    });

    const component = modalRef.componentInstance as ConfirmModalComponent;

    component.title = title;
    component.message = message;

    if (confirm) {
      component.confirm = confirm;
    }

    if (decline) {
      component.decline = decline;
    }

    return component.result.asObservable().pipe(
      take(1)
    );
  }

}
