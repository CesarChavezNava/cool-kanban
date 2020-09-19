import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '@shared/models/card';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss'],
})
export class CardDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public card: Card
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }
}
