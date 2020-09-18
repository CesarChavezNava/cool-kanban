import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Board } from '@shared/models/board';
import { BAppState } from '../../store/reducers/b.reducers';

import * as BoardActions from '../../store/actions/board.actions';
import { Privacy } from '@core/types/privacy.type';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
  @Input() board: Board;
  formGroup: FormGroup;
  privacyFormControl: FormControl;
  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<BAppState>
  ) {}

  ngOnInit(): void {
    this.privacyFormControl = new FormControl(this.board.privacy === 'PRIVATE');
    this.formGroup = this.formBuilder.group({
      name: [this.board.name ?? '', [Validators.required]],
      privacy: this.privacyFormControl,
    });
  }

  editBoard(): void {
    this.edit = true;
  }

  updateBoard(): void {
    if (this.formGroup.invalid) return;

    const name: string = this.formGroup.get('name').value;
    const isPrivate: boolean = this.privacyFormControl.value ? false : true;
    const privacy: Privacy = isPrivate ? 'PRIVATE' : 'PUBLIC';

    console.log(name, isPrivate, privacy);

    this.board = { ...this.board, name: name, privacy: privacy };
    this.store.dispatch(BoardActions.UpdateBoard({ board: this.board }));

    this.edit = false;
  }
}
