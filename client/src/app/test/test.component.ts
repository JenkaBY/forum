import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
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
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get('api/hello', this.headers)
      .map(res => {
        this.publicMsg = res.text();
        this.publicStatus = res.status;
      }).catch(err => {
      if (err === 'Unauthorized') {
        console.log(err);
      }
      console.log(err);
      return Observable.throw(err)
    }).subscribe();

    this.http.get('api/private', this.headers)
      .map((res: Response) => {
        console.log(res.statusText);
        this.privateMsg = res.text();
        this.privateStatus = res.status;
      }).catch(err => {
      if (err.status == 401) {
        console.log("catch 401");
        this.privateMsg = JSON.stringify(err).slice(0, 121);
        console.log(JSON.stringify(err));

        this.privateStatus = err.status;
      }
      console.log(err);
      return Observable.throw(err)
    })
      .subscribe();
  }
}
