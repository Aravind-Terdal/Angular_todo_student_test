import { Injectable } from '@angular/core';
import { Istudent } from '../models/student';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentArray: Array<Istudent> = localStorage.getItem('stdObj')
    ? JSON.parse(localStorage.getItem('stdObj')!)
    : [];
  studentSubject$: Subject<Istudent> = new Subject<Istudent>();
  constructor() {}

  createStudent(stdObj: Istudent) {
    this.studentArray.push(stdObj);
    localStorage.setItem('stdObj', JSON.stringify(this.studentArray));
  }

  fetchAllStudent() {
    return this.studentArray;
  }

  upDateStudent(stdObj: Istudent) {
    let getIndex = this.studentArray.findIndex(
      (f) => f.studentId === stdObj.studentId
    );
    this.studentArray[getIndex] = stdObj;
    localStorage.setItem('stdObj', JSON.stringify(this.studentArray));
  }

  removeStudent(stdObj: Istudent) {
    let getIndex = this.studentArray.findIndex(
      (f) => f.studentId === stdObj.studentId
    );
    this.studentArray.splice(getIndex, 1);
    localStorage.setItem('stdObj', JSON.stringify(this.studentArray));
  }
}
