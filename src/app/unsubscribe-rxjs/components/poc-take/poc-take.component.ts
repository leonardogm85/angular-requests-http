import { Component, OnDestroy, OnInit } from '@angular/core';

import { take, tap } from 'rxjs';

import { EmitValueService } from '../../emit-value.service';

@Component({
  selector: 'app-poc-take',
  template: `
    <app-poc-base
      [name]="name"
      [value]="value"
      color="text-bg-info">
    </app-poc-base>
  `
})
export class PocTakeComponent implements OnInit, OnDestroy {

  name: string = 'Component without Take';
  value?: string;

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  ngOnInit(): void {
    this._emitValueService.getValue().pipe(
      tap(newValue => console.log(this.name, newValue)),
      take(1)
    ).subscribe(newValue => this.value = newValue);
  }

  ngOnDestroy(): void {
    console.log(`${this.name} was destroyed`)
  }

}
