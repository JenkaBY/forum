import { Injectable } from "@angular/core";

interface IUploadFileService {
  uploadUserPhoto(formData, options, id);
}

export default IUploadFileService;

@Injectable()
export class UploadFileService implements IUploadFileService {
  uploadUserPhoto(formData: FormData, options: any, id) {

  }
}
