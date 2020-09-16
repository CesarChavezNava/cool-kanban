import { Component, Input, OnInit } from '@angular/core';
import { List } from '@shared/models/list';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() list: List;

  constructor() {}

  ngOnInit(): void {}

  openCardDialog(): void {}
}
