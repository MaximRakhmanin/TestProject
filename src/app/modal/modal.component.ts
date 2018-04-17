import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title = this.data.title;
  content = this.data.content;
  constructor(private modalService: ModalService,
              private dialog: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  close() {
    this.modalService.status$.next(false);
    this.dialog.close();
  }
  del() {
    if (this.data.id) {
      this.dialog.close(this.data.id);
    } else {
      this.modalService.status$.next(true);
      this.dialog.close();
    }
  }
}
