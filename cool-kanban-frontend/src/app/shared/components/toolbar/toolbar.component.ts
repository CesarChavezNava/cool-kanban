import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { Profile } from '@shared/models/profile';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

import * as ProfileActions from '../../store/actions/profile.actions';
import { stat } from 'fs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  profileSubs: Subscription;
  profile: Profile;
  btnText: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.GetProfile());
    this.profileSubs = this.store.select('profile').subscribe((state) => {
      if (state.loadSuccess) {
        this.profile = state.profile;
        this.btnText = this.profile.username.substr(0, 2).toUpperCase();
      }

      if (state.error) {
        this.openSnakBar(state.message, 'X', 'error-snackbar');
        this.store.dispatch(ProfileActions.ResetProfileState());
      }

      if (state.success) {
        this.openSnakBar(state.message, 'X', 'success-snackbar');
        this.store.dispatch(ProfileActions.ResetProfileState());
      }
    });
  }

  ngOnDestroy(): void {
    this.profileSubs.unsubscribe();
  }

  async signOut(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error.message);
    }
  }

  goToBoards() {
    this.router.navigate(['b/boards']);
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '50rem',
      height: '25rem',
      data: this.profile,
    });

    dialogRef.afterClosed().subscribe((_profile) => {
      if (_profile) {
        this.profile = { ..._profile };
        this.store.dispatch(
          ProfileActions.UpdateProfile({ profile: this.profile })
        );
      }
    });
  }

  openSnakBar(message: string, action: string, clazz: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [clazz],
    });
  }
}
