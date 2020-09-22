import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { BoardDialogComponent } from './components/board-dialog/board-dialog.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';
import { ListConnectToPipe } from './pipes/list-connect-to.pipe';
import { ImageSearchEngineDialogComponent } from './components/image-search-engine-dialog/image-search-engine-dialog.component';

@NgModule({
  declarations: [
    MasterLayoutComponent,
    BoardsComponent,
    BoardCardComponent,
    BoardDialogComponent,
    BoardComponent,
    BoardHeaderComponent,
    BoardListComponent,
    ListCardComponent,
    CardDialogComponent,
    ListConnectToPipe,
    ImageSearchEngineDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    BoardRoutingModule,
    StoreModule.forFeature('b', bAppReducers),
    EffectsModule.forFeature(BEffects),
  ],
})
export class BoardModule {}
