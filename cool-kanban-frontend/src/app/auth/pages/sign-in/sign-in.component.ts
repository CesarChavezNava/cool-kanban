import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../app.reducers';

import * as SignInActions from '../../store/actions/sign-in.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInSubs: Subscription;
  hide: boolean = true;
  loading: boolean = false;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.signInSubs = this.store.select('signIn').subscribe((state) => {
      this.loading = state.loading;

      if (state.success) {
        this.router.navigate(['b/boards']);
      }

      if (state.error) {
        this.openSnackBar(state.message, 'error-snackbar');
      }
    });
  }

  signIn(): void {
    if (this.formGroup.invalid) return;

    this.store.dispatch(
      SignInActions.SignIn({
        email: this.formGroup.get('email').value,
        password: this.formGroup.get('password').value,
      })
    );
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['b/boards']);
    } catch (error) {
      this.openSnackBar(error.message, 'error-snackbar');
    }
  }

  async signInWithFacebook(): Promise<void> {
    try {
      await this.authService.signInWithFacebook();
      this.router.navigate(['b/boards']);
    } catch (error) {
      this.openSnackBar(error.message, 'error-snackbar');
    }
  }

  openSnackBar(message: string, clazz: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
