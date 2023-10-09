import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocComponent } from './components/poc/poc.component';
import { PocAsyncComponent } from './components/poc-async/poc-async.component';
import { PocTakeUntilComponent } from './components/poc-take-until/poc-take-until.component';
import { PocTakeComponent } from './components/poc-take/poc-take.component';
import { PocUnsubscribeComponent } from './components/poc-unsubscribe/poc-unsubscribe.component';

@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocBaseComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubscribeComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }
