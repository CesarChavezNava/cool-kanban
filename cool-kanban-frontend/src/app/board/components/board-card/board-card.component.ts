import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '@shared/models/board';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {
  @Input() board: Board;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToBoard(id: string): void {
    this.router.navigate([`board/${id}`]);
  }
}
