import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil, tap } from 'rxjs';

import { EmitValueService } from '../../emit-value.service';

@Component({
  selector: 'app-poc-take-until',
  template: `
    <app-poc-base
      [name]="name"
      [value]="value"
      color="text-bg-primary">
    </app-poc-base>
  `
})
export class PocTakeUntilComponent implements OnInit, OnDestroy {

  name: string = 'Component with TakeUntil';
  value?: string;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  ngOnInit(): void {
    this._emitValueService.getValue().pipe(
      tap(newValue => console.log(this.name, newValue)),
      takeUntil(this.unsubscribe$)
    ).subscribe(newValue => this.value = newValue);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log(`${this.name} was destroyed`)
  }

}
