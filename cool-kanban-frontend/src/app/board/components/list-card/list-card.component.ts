import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@shared/models/card';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() cards: Card[];

  constructor() {}

  ngOnInit(): void {}

  openCardDialog(): void {}
}
