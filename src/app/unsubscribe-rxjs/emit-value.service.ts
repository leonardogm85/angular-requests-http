import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitValueService {

  private _emitter$: Subject<string> = new Subject<string>();

  emitValue(value: string): void {
    this._emitter$.next(value);
  }

  getValue(): Observable<string> {
    return this._emitter$.asObservable();
  }

}
