import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toggle-page',
  template: `
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <mat-button-toggle-group name="pages" aria-label="Auth Pages">
            <mat-button-toggle
              [checked]="checkedSignIn"
              value="signin"
              (change)="onChange($event.value)"
              ><span>Sign In</span></mat-button-toggle
            >
            <mat-button-toggle
              [checked]="checkedSignUp"
              value="signup"
              (change)="onChange($event.value)"
              ><span>Sign Up</span></mat-button-toggle
            >
          </mat-button-toggle-group>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./toggle-page.component.scss'],
})
export class TogglePageComponent implements OnInit {
  @Input() page: string;

  checkedSignIn: boolean = false;
  checkedSignUp: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkedSignIn = this.page === 'SIGNIN';
    this.checkedSignUp = this.page === 'SIGNUP';
  }

  onChange(value: any): void {
    this.router.navigate([`${value}`]);
  }
}
