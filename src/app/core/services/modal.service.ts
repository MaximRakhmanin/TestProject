import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Injectable()
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) {}

  openModal(title, content) {
   return this.dialog.open(ModalComponent, {
       width: '300px',
       data: {
         title: title,
         content: content,
       }})
      .afterClosed();
  }
}


