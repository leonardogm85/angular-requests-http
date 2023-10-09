import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs';

import { CoursesService } from '../courses.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private _coursesService: CoursesService,
    private _alertModalService: AlertModalService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Using params
    // this._activatedRoute.params.pipe(
    //   map(params => params['id'] as number),
    //   switchMap(id => this._coursesService.loadById(id))
    // ).subscribe({
    //   next: course => this.update(course)
    // })
    // concatMap, mergeMap, and exhaustMap

    // Using resolver
    const course = this._activatedRoute.snapshot.data['course'];

    this.form = this._formBuilder.group({
      id: [course?.id],
      name: [course?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {

      const successMessage = this.form.value.id
        ? 'Course updated successfully.'
        : 'Course created successfully.';

      const errorMessage = this.form.value.id
        ? 'Error updating course. Please try again later.'
        : 'Error creating course. Please try again later.';

      this._coursesService.save(this.form.value).subscribe({
        next: (value) => {
          this._alertModalService.show('Success', successMessage);
          this._location.back();
        },
        error: (err) => {
          this._alertModalService.show('Error', errorMessage);
        }
      });

      // if (this.form.value.id) {
      //   this._coursesService.update(this.form.value).subscribe({
      //     next: (value) => {
      //       this._alertModalService.show('Success', 'Course updated successfully.');
      //       this._location.back();
      //     },
      //     error: (err) => {
      //       this._alertModalService.show('Error', 'Error updating course. Please try again later.');
      //     },
      //     complete: () => {
      //       console.log('Complete');
      //     },
      //   });
      // } else {
      //   this._coursesService.create(this.form.value).subscribe({
      //     next: (value) => {
      //       this._alertModalService.show('Success', 'Course created successfully.');
      //       this._location.back();
      //     },
      //     error: (err) => {
      //       this._alertModalService.show('Error', 'Error creating course. Please try again later.');
      //     },
      //     complete: () => {
      //       console.log('Complete');
      //     },
      //   });
      // }
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
  }

  isInvalid(controlName: string): boolean {
    return (this.form.get(controlName)?.invalid
      &&
      this.form.get(controlName)?.touched) ?? false;
  }

  getControl(controlName: string): AbstractControl | null {
    return this.form.get(controlName);
  }

  // update(course: Course): void {
  //   this.form.patchValue({
  //     id: course.id,
  //     name: course.name
  //   });
  // }

}
