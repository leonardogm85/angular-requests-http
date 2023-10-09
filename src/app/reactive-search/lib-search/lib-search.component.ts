import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';

interface LibraryItem {
  name: string;
  description: string;
  version: string;
  homepage: string;
}

interface LibraryList {
  results: LibraryItem[];
  total: number;
}

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  queryField: FormControl = new FormControl();

  readonly SEARCH_URL: string = 'https://api.cdnjs.com/libraries';

  results$?: Observable<LibraryItem[]>;

  total: number = 0;

  readonly FIELDS: string = 'filename,description,version,homepage';

  constructor(
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value: string) => value.trim()),
      // filter((value: string) => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap(value => this._httpClient.get<LibraryList>(this.SEARCH_URL, {
      //   params: {
      //     fields: this.FIELDS,
      //     search: value
      //   }
      // })),
      switchMap(value => value.length < 2
        ? of<LibraryList>({ total: 0, results: [] })
        : this._httpClient.get<LibraryList>(this.SEARCH_URL, {
          params: {
            fields: this.FIELDS,
            search: value
          }
        })),
      tap((value: LibraryList) => this.total = value.total),
      map((value: LibraryList) => value.results),
      tap(console.log)
    );
  }

  onSearch(): void {
    const value: string = (this.queryField.value as string ?? '').trim();

    if (!value) {
      return;
    }

    const params: HttpParams = new HttpParams()
      .set('fields', this.FIELDS)
      .set('search', value);

    this.results$ = this._httpClient.get<LibraryList>(this.SEARCH_URL, { params }).pipe(
      tap((value: LibraryList) => this.total = value.total),
      map((value: LibraryList) => value.results),
      tap(console.log)
    );
  }

}
