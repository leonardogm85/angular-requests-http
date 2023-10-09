import { Component } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { UploadFileService } from '../upload-file.service';
import { environment } from 'src/environments/environment';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs.operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  files?: Set<File>;

  progress: number = 0;

  constructor(
    private _uploadFileService: UploadFileService
  ) { }

  onChange(event: any): void {
    this.files = [...event.target.files].reduce(
      (previous, current) => previous.add(current),
      new Set<File>()
    );
    this.progress = 0;
  }

  onUpload(): void {
    if ((this.files?.size ?? 0) > 0) {
      // Using CORS
      // this._uploadFileService
      //   .upload(this.files!, 'http://localhost:8000/upload')
      //   .subscribe(response => console.log('Files were uploaded'));

      // Using Proxy: proxy.conf.js or proxy.conf.json
      // this._uploadFileService
      //   .upload(this.files!, '/api/upload')
      //   .subscribe(response => console.log('Files were uploaded'));

      // Using custom RxJS operators
      this._uploadFileService
        .upload(this.files!, `${environment.proxy}/upload`).pipe(
          uploadProgress(progress => {
            this.progress = progress;
            console.log('Progress', this.progress);
          }),
          filterResponse()
        ).subscribe(response => console.log('Files were uploaded'));

        // Using subscribe
        // .subscribe((event: HttpEvent<object>) => {
        //   console.log(event);
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Files were uploaded');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //     this.progress = event.total
        //       ? Math.round((event.loaded * 100) / event.total)
        //       : 0;
        //     console.log('Progress', this.progress);
        //   }
        // });
    }
  }

  // The DOCX and PDF files must be in the SERVER/UPLOAD folder.

  onDownloadWord(): void {
    this._uploadFileService
      .download(`${environment.proxy}/download-word`)
      .subscribe((res: any) => {
        this._uploadFileService.handleDownload(res, 'report.docx');
      });
  }

  onDownloadPdf(): void {
    this._uploadFileService
      .download(`${environment.proxy}/download-pdf`)
      .subscribe((res: any) => {
        this._uploadFileService.handleDownload(res, 'report.pdf');
      });
  }

}
