import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { UuidService } from '../../services/uuid.service';
import { Istudent } from '../../models/student';
import { validationsPatterns } from '../../validators/validators';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  studentForm!: FormGroup;
  isInEditMode: boolean = false;
  editId!: string;
  constructor(
    private _studentService: StudentService,
    private _uuidService: UuidService,
    private _snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createStudentForm();
    this.onSubmit();
    this.editStudent();
  }

  createStudentForm() {
    this.studentForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.onlyText),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.onlyText),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.email),
      ]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.pattern(validationsPatterns.onlyNumber),
      ]),
    });
  }

  get formControls() {
    return this.studentForm.controls;
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (!this.isInEditMode) {
        let stdObj: Istudent = {
          ...this.studentForm.value,
          studentId: this._uuidService.generateUuid(),
        };
        this._studentService.createStudent(stdObj);
        this._snackBar.openSnackBar(
          `New Student ${stdObj.fullName} created successfully`
        );
      } else {
        let upDateStudent: Istudent = {
          ...this.studentForm.value,
          studentId: this.editId,
        };
        this._studentService.upDateStudent(upDateStudent);
        this._snackBar.openSnackBar(
          `New Student ${upDateStudent.fullName} updated successfully`
        );

        this.studentForm.reset();
        this.isInEditMode = false;
      }
      this.studentForm.reset();
    }
  }

  editStudent() {
    this._studentService.studentSubject$.subscribe((res) => {
      this.studentForm.patchValue(res);
      this.editId = res.studentId;
      this.isInEditMode = true;
    });
  }
}
