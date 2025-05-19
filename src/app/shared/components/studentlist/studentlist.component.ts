import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Istudent } from '../../models/student';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss'],
})
export class StudentlistComponent implements OnInit {
  studentData!: Array<Istudent>;
  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this.studentData = this._studentService.fetchAllStudent();
  }
  onEdit(student: Istudent) {
    this._studentService.studentSubject$.next(student);
  }

  onRemove(student: Istudent) {
    this._studentService.removeStudent(student);
  }
}
