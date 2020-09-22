import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { pAppReducers } from './store/reducers/p.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PEffects } from './store/effects';

@NgModule({
  declarations: [MasterLayoutComponent, ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('p', pAppReducers),
    EffectsModule.forFeature(PEffects),
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
