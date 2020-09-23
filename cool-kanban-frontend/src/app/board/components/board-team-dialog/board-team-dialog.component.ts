import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '@shared/models/profile';

@Component({
  selector: 'app-board-team-dialog',
  templateUrl: './board-team-dialog.component.html',
  styleUrls: ['./board-team-dialog.component.scss'],
})
export class BoardTeamDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BoardTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public users: Profile[]
  ) {}

  ngOnInit(): void {}
}
