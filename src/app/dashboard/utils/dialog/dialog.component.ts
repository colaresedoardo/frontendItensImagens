import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  messagem: string = "Tem Certeza que Deseja Excluir?"
  confimar = "Sim"
  cancelar = "Cancel"
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DialogComponent>) {

    if(data){
      this.messagem = data.message || this.messagem;
      if (data.buttonText) {
        this.confimar = data.buttonText.ok || this.confimar;
        this.cancelar = data.buttonText.cancel || this.cancelar;
      }

   }
  }
  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
