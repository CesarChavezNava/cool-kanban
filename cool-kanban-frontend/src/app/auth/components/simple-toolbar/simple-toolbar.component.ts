import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-toolbar',
  template: `
    <mat-toolbar>
      <mat-icon color="primary">dashboard</mat-icon>
      <span>{{ appName }}</span>
    </mat-toolbar>
  `,
  styleUrls: ['./simple-toolbar.component.scss'],
})
export class SimpleToolbarComponent implements OnInit {
  appName: string = 'Cool Kanban';

  constructor() {}

  ngOnInit(): void {}
}
