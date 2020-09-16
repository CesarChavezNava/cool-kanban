import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../app.reducers';

import * as ForgotPasswordActions from '../../store/actions/forgot-password.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordSubs: Subscription;
  formGroup: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ForgotPasswordActions.ResetForgotPasswordState());

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.forgotPasswordSubs = this.store
      .select('forgotPassword')
      .subscribe((state) => {
        this.loading = state.loading;

        if (state.success) {
          this.formGroup.setValue({ email: '' });
          this.openSnakBar(state.message, 'X', 'success-snackbar');
        }

        if (state.error) {
          this.openSnakBar(state.message, 'X', 'error-snackbar');
        }
      });
  }

  ngOnDestroy(): void {
    this.forgotPasswordSubs.unsubscribe();
  }

  sendPasswordResetEmail(): void {
    if (this.formGroup.invalid) return;

    this.store.dispatch(
      ForgotPasswordActions.SendPasswordResetEmail({
        email: this.formGroup.get('email').value,
      })
    );
  }

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
