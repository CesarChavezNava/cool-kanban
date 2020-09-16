import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../app.reducers';

import * as SignUpActions from '../../store/actions/sign-up.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpSubs: Subscription;

  hide: boolean = true;
  loading: boolean = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signUpSubs = this.store.select('signUp').subscribe((state) => {
      this.loading = state.loading;

      if (state.success) {
        this.openSnackBar(state.message, 'success-snackbar');
        this.router.navigate(['b/boards']);
      }

      if (state.error) {
        this.openSnackBar(state.message, 'error-snackbar');
      }
    });
  }

  ngOnDestroy(): void {
    this.signUpSubs.unsubscribe();
  }

  signUp(): void {
    if (this.formGroup.invalid) return;

    this.store.dispatch(
      SignUpActions.SignUp({
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value,
      })
    );
  }

  openSnackBar(message: string, clazz: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
