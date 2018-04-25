import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';

@Injectable()
export class ModalService {
  status$ = new Subject<boolean>();
  constructor(private dialog: MatDialog) {}
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


