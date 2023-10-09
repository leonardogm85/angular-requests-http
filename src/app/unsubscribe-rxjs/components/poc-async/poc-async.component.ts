import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { EmitValueService } from '../../emit-value.service';

@Component({
  selector: 'app-poc-async',
  template: `
    <app-poc-base
      [name]="name"
      [value]="(value$ | async) ?? ''"
      color="text-bg-success">
    </app-poc-base>
  `
})
export class PocAsyncComponent implements OnInit, OnDestroy {

  name: string = 'Component with Async';
  value$?: Observable<string>;

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  ngOnInit(): void {
    this.value$ = this._emitValueService.getValue().pipe(
      tap(newValue => console.log(this.name, newValue))
    );
  }

  ngOnDestroy(): void {
    console.log(`${this.name} was destroyed`)
  }

}
