import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { coursesResolver } from './guards/courses.resolver';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'create', component: CoursesFormComponent, resolve: { course: coursesResolver } },
  { path: 'update/:id', component: CoursesFormComponent, resolve: { course: coursesResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
