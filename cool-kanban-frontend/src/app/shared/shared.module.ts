import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';

@NgModule({
  declarations: [ToolbarComponent, ProfileDialogComponent],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}
