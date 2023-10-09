import { Component, Input } from '@angular/core';

import { Subject } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input() title?: string;
  @Input() message?: string;
  @Input() confirm?: string = 'Cancel';
  @Input() decline?: string = 'Confirm';

  result: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _modal: NgbActiveModal
  ) { }

  onConfirm(): void {
    this.result.next(true);
    this._modal.close();
  }

  onDecline(): void {
    this.result.next(false);
    this._modal.dismiss();
  }

}
