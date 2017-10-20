import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  publicMsg: any;
  publicStatus: any;
  privateMsg: any;
  privateStatus: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('api/hello', {observe: 'response', responseType: 'text'})
      .subscribe(res => {
          console.log('next from public request', res);
          this.publicMsg = res.body;
          this.publicStatus = res.status;
        },
        err => {
          console.log('error from public request', err);
        });

    this.http.get('api/private',
      {headers: this.getHeaders(), observe: 'response', responseType: 'text'}
    )
      .subscribe(
        res => {
          console.log('next from private request', res);
          this.privateMsg = res.body;
          this.privateStatus = res.status;
        },
        err => {
          console.log('error from private request', err);
          this.privateMsg = JSON.stringify(err.error);
          this.privateStatus = err.status;
        })
  }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    console.log("Authorize Headers " + headers.get('Accept'));
    return headers;
  }
}
