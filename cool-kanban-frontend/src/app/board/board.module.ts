import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardRoutingModule } from './board-routing.module';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { StoreModule } from '@ngrx/store';
import { bAppReducers } from './store/reducers/b.reducers';
import { EffectsModule } from '@ngrx/effects';
import { BEffects } from './store/effects';

@NgModule({
  declarations: [MasterLayoutComponent, BoardsComponent, BoardCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    BoardRoutingModule,
    StoreModule.forFeature('b', bAppReducers),
    EffectsModule.forFeature(BEffects),
  ],
})
export class BoardModule {}
