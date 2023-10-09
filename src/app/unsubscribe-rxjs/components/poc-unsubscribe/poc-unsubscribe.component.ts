import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, tap } from 'rxjs';

import { EmitValueService } from '../../emit-value.service';

@Component({
  selector: 'app-poc-unsubscribe',
  template: `
    <app-poc-base
      [name]="name"
      [value]="value"
      color="text-bg-secondary">
    </app-poc-base>
  `
})
export class PocUnsubscribeComponent implements OnInit, OnDestroy {

  name: string = 'Component with Unsubscribe';
  value?: string;
  subscriptions?: Subscription[] = [];

  constructor(
    private _emitValueService: EmitValueService
  ) { }

  ngOnInit(): void {
    this.subscriptions?.push(this._emitValueService.getValue().pipe(
      tap(newValue => console.log(this.name, newValue))
    ).subscribe(newValue => this.value = newValue));
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    console.log(`${this.name} was destroyed`)
  }

}
