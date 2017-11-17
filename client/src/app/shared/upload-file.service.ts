import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConst } from './constants/routes.constants';
import { HeaderConst } from './constants/constants';
import IUploadFileService from './iupload-file.service';
import { FileLink } from './entity/file-link';

@Injectable()
export class UploadFileService implements IUploadFileService {
  private headers = new HttpHeaders().set(HeaderConst.contentType, HeaderConst.multipartFormData);

  constructor(private http: HttpClient) {
  }

  uploadUserPhoto(formData: FormData) {
    return this.http.post<FileLink[]>(ApiConst.UPLOAD_USER_IMAGE, formData);
  }
}
