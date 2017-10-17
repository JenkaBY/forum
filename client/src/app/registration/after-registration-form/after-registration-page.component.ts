import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-after-registration-page',
  templateUrl: './after-registration-page.component.html',
  styleUrls: ['./after-registration-page.component.css']
})
export class AfterRegistrationPageComponent {

  constructor(private router: Router) {
  }

  onRead(): void {
    this.router.navigate(['/']);
  }
}
