import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EMPTY, Observable, Subject, catchError, switchMap } from 'rxjs';

// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CoursesService } from '../courses.service';
import { Course } from '../course.model';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ConfirmModalService } from 'src/app/shared/confirm-modal.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  // preserveWhitespaces: true
})
export class CoursesListComponent implements OnInit {

  // removeModalRef?: NgbModalRef;

  // @ViewChild('removeModal') removeElementRef?: ElementRef;

  // courseSelected?: Course;

  // Without observable
  // courses?: Course[];

  // With observable
  courses$?: Observable<Course[]>;

  // error$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _coursesService: CoursesService,
    private _alertModalService: AlertModalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmModalService: ConfirmModalService
    // private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // Without observable
    // this._coursesService.list().subscribe(data => this.courses = data);

    // With observable
    this.onRefresh();
  }

  onRefresh(): void {
    this.courses$ = this._coursesService.list().pipe(
      catchError(e => {
        console.error(e);

        // Show message inside Template
        // this.error$.next(true);

        // Show message inside Modal
        this._alertModalService.show(
          'Error',
          'Error loading. Please try again later.');

        return EMPTY;
      })
    );

    // Option 1: catchError()
    // this._coursesService.list().pipe(
    //   catchError(err => {
    //     console.log(err);
    //     return EMPTY;
    //   })
    // ).subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    //   complete() {
    //     console.log('Complete');
    //   }
    // });

    // Option 2: error()
    // this._coursesService.list().subscribe({
    //   next(value) {
    //     console.log(value);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    //   complete() {
    //     console.log('Complete');
    //   }
    // });
  }

  onUpdate(id: number): void {
    this._router.navigate(['update', id], { relativeTo: this._activatedRoute });
  }

  onRemove(id: number): void {
    // this.courseSelected = course;

    // Using ViewChild
    // this.removeModalRef = this._modalService.open(this.removeElementRef);

    // Using Component
    const result$ = this._confirmModalService.show(
      'Warning',
      'Are you sure you want to delete the course?',
      'Yes',
      'No').pipe(
        switchMap(value => value ? this._coursesService.remove(id) : EMPTY)
      ).subscribe({
        next: (value) => this.onRefresh(),
        error: (err) => {
          this._alertModalService.show(
            'Error',
            'Error removing course. Please try again later.');
        }
      });
  }

  onConfirmRemove(): void {
    // Using ViewChild
    // this.removeModalRef?.dismiss();
    // this._coursesService.remove(this.courseSelected!.id).subscribe({
    //   next: (value) => this.onRefresh(),
    //   error: (err) => {
    //     this._alertModalService.show(
    //       'Error',
    //       'Error removing course. Please try again later.');
    //   }
    // });
  }

  onDeclineRemove(): void {
    // Using ViewChild
    // this.removeModalRef?.dismiss();
  }

}
