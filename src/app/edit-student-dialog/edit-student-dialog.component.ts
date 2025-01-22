  import { Component, Inject } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { MatDialogModule } from '@angular/material/dialog'; // นำเข้า MatDialogModule
  import { FormsModule } from '@angular/forms'; // นำเข้า FormsModule
  import { MatFormFieldModule } from '@angular/material/form-field';
  @Component({
    selector: 'app-edit-student-dialog',
    standalone: true, // ตั้งค่า standalone เป็น true
    imports: [MatDialogModule ,FormsModule,MatFormFieldModule], // เพิ่ม MatDialogModule ใน imports
    templateUrl: './edit-student-dialog.component.html',
    styleUrls: ['./edit-student-dialog.component.css']
  })
  export class EditStudentDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<EditStudentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
