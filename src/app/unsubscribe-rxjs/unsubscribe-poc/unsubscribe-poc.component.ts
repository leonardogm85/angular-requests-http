import { Component } from '@angular/core';

import { EmitValueService } from '../emit-value.service';

@Component({
  selector: 'app-unsubscribe-poc',
  templateUrl: './unsubscribe-poc.component.html',
  styleUrls: ['./unsubscribe-poc.component.css']
})
export class UnsubscribePocComponent {

  showComponents: boolean = true;

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  emitValue(value: string): void {
    this._emitValueService.emitValue(value);
  }

  destroyComponents(): void {
    this.showComponents = !this.showComponents;
  }

}
