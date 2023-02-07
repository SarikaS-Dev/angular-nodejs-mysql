import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Users } from 'src/app/shared/users';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent  {
  
  user : Users[] = [];
  
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>, public apiService: UserServiceService) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(id:number){
    this.apiService.delete(id).subscribe(res => {
         this.user = this.user.filter(item => item.id !== id);
         alert('User deleted successfully!');
         console.log('User deleted successfully!');
    })
    this.dialogRef.close(true);
  }

}