import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(private dialog: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  close() {
    this.dialog.close();
  }
  del() {
    this.dialog.close(this.data.id);
  }

}
