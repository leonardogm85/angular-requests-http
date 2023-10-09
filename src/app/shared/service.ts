import { HttpClient } from "@angular/common/http";

import { Observable, delay, take, tap } from "rxjs";

import { Model } from "./model";

export class Service<TModel extends Model> {

  constructor(
    protected httpClient: HttpClient,
    private _api: string
  ) { }

    list(): Observable<TModel[]> {
      return this.httpClient.get<TModel[]>(this._api).pipe(
        delay(1000),
        tap(console.log)
      );
    }

    loadById(id: number): Observable<TModel> {
      return this.httpClient.get<TModel>(`${this._api}/${id}`).pipe(
        take(1)
      );
    }

    save(model: TModel): Observable<TModel> {
      return model.id
        ? this.update(model)
        : this.create(model);
    }

    private create(model: TModel): Observable<TModel> {
      return this.httpClient.post<TModel>(this._api, model).pipe(
        take(1)
      );
    }

    private update(model: TModel): Observable<TModel> {
      return this.httpClient.put<TModel>(`${this._api}/${model.id}`, model).pipe(
        take(1)
      );
    }

    remove(id: number): Observable<TModel> {
      return this.httpClient.delete<any>(`${this._api}/${id}`).pipe(
        take(1)
      );
    }

}
