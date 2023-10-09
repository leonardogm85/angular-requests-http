import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";

import { filter, map, pipe, tap } from "rxjs";

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((respose: HttpEvent<T>) => (respose as HttpResponse<T>).body)
  );
};

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      const progress = event.total
        ? Math.round((event.loaded * 100) / event.total)
        : 0;
        cb(progress);
    }
  });
}
