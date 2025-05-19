import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Istudent } from '../../models/student';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss'],
})
export class StudentlistComponent implements OnInit {
  studentData!: Array<Istudent>;
  constructor(
    private _studentService: StudentService,
    private _matDialog: MatDialog,
    private _snackBar : SnackbarService
  ) {}

  ngOnInit(): void {
    this.studentData = this._studentService.fetchAllStudent();
  }
  onEdit(student: Istudent) {
    this._studentService.studentSubject$.next(student);
  }

  onRemove(student: Istudent) {
    let matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '600px';
    matDialogConfig.disableClose = true;
    let matDialogRef = this._matDialog.open(
      GetConfirmComponent,
      matDialogConfig
    );
    matDialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this._studentService.removeStudent(student);
        this._snackBar.openSnackBar(`${student.fullName} removed successfully`)
      }
    });
  }
}
