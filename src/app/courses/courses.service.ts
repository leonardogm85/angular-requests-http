import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, delay, take, tap } from 'rxjs';

import { Course } from './course.model';
import { environment } from 'src/environments/environment';
import { Service } from '../shared/service';

// Using Json-Server

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends Service<Course> {

  // With inheritance

  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient, `${environment.api}/courses`);
  }


  // Without inheritance

  // private readonly API: string = `${environment.api}/courses`;

  // constructor(
  //   private _httpClient: HttpClient
  // ) { }

  //   list(): Observable<Course[]> {
  //     return this._httpClient.get<Course[]>(this.API).pipe(
  //       delay(1000),
  //       tap(console.log)
  //     );
  //   }

  //   loadById(id: number): Observable<Course> {
  //     return this._httpClient.get<Course>(`${this.API}/${id}`).pipe(
  //       take(1)
  //     );
  //   }

  //   save(course: Course): Observable<Course> {
  //     return course.id
  //       ? this.update(course)
  //       : this.create(course);
  //   }

  //   private create(course: Course): Observable<Course> {
  //     return this._httpClient.post<Course>(this.API, course).pipe(
  //       take(1)
  //     );
  //   }

  //   private update(course: Course): Observable<Course> {
  //     return this._httpClient.put<Course>(`${this.API}/${course.id}`, course).pipe(
  //       take(1)
  //     );
  //   }

  //   remove(id: number): Observable<Course> {
  //     return this._httpClient.delete<any>(`${this.API}/${id}`).pipe(
  //       take(1)
  //     );
  //   }

}
