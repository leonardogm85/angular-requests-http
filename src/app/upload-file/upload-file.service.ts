import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// NodeJs App

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  upload(files: Set<File>, url: string): Observable<any> {
    const formData = new FormData();

    files.forEach(
      file => formData.append('file', file, file.name)
    );

    // Using request
    // const request = new HttpRequest('POST', url, formData);
    // return this._httpClient.request(request);

    // Using post
    return this._httpClient.post(url, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  download(url: string): any {
    return this._httpClient.get(url, {
      responseType: 'blob' as 'json'

      // Using progress
      // reportProgress
      // contentLength

    });
  }

  handleDownload(response: any, fileName: string): void {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should.
    const file = new Blob([response], {
      type: response.type
    });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob.
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(file);
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const blob = window.URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = blob;
    link.download = fileName;

    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }

}
