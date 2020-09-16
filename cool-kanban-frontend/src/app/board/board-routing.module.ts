import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { BoardsComponent } from './pages/boards/boards.component';

const routes: Routes = [
  {
    path: 'b',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'b',
        redirectTo: '/boards',
        pathMatch: 'full',
      },
      {
        path: 'boards',
        component: BoardsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
