import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Course } from '../course.model';
import { CoursesService } from '../courses.service';

export const coursesResolver: ResolveFn<Observable<Course | null>> = (route, state) => {

  if (route.params && route.params['id']) {
    return inject(CoursesService).loadById(route.params['id'] as number);
  }

  return of(null);

};
