import { Component, OnDestroy, OnInit } from '@angular/core';

import { tap } from 'rxjs';

import { EmitValueService } from '../../emit-value.service';

@Component({
  selector: 'app-poc',
  template: `
    <app-poc-base
      [name]="name"
      [value]="value"
      color="text-bg-danger">
    </app-poc-base>
  `
})
export class PocComponent implements OnInit, OnDestroy {

  name: string = 'Component without Unsubscribe';
  value?: string;

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  ngOnInit(): void {
    this._emitValueService.getValue().pipe(
      tap(newValue => console.log(this.name, newValue))
    ).subscribe(newValue => this.value = newValue);
  }

  ngOnDestroy(): void {
    console.log(`${this.name} was destroyed`)
  }

}
