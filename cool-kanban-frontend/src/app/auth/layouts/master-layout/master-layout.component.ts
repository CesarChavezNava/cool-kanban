import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-layout',
  template: `
    <div class="content-fluid">
      <app-simple-toolbar></app-simple-toolbar>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./master-layout.component.scss'],
})
export class MasterLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
