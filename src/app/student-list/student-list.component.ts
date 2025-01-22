import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // นำเข้า FormsModule
import { EditStudentDialogComponent } from '../edit-student-dialog/edit-student-dialog.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule,FormsModule,MatPaginatorModule, MatTableModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  students  :any[] =[]
  students1 : any[] =[];
  dataSource = new MatTableDataSource(this.students);
  displayedColumns: string[] = ['id', 'name', 'address', 'marks', 'action'];
  searchTerm: string = ''; // เก็บค่าจาก input
  filteredStudents: any[] = [...this.students];
  constructor(public dialog: MatDialog,
    private modalService: NgbModal,
  ) { }
  page = 1; // หน้าปัจจุบัน
  pageSize = 5; // จำนวนรายการต่อหน้า

  get totalPages(): number {
    return Math.ceil(this.students.length / this.pageSize);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
  searchStudents(): void {
    if(this.students.length > 0 && this.students1.length === 0){
      this.students1 =this.students
    }
    const term = this.searchTerm.toLowerCase();
    if(term === ""){
      this.students = this.students1
    }
    this.filteredStudents = this.students.filter((student) =>
      student.name.toLowerCase().includes(term)
    );
    this.students = this.filteredStudents

  }
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
    }
  }
  addStudent(): void {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '500px',
      data: {} // ส่งข้อมูลนักเรียนไปยัง Popup
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        // อัปเดตข้อมูลนักเรียน
        result.id = this.students.length + 1; // สร้าง ID ใหม่
        this.students.push(result);
        this.students1 =this.students
        this.page = this.totalPages;
      }
    });
  }
  editStudent(student: any): void {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '500px',
      data: { ...student } // ส่งข้อมูลนักเรียนไปยัง Popup
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) {
        // อัปเดตข้อมูลนักเรียน
        const index = this.students.findIndex(s => s.id === result.id);
        if (index !== -1) {
          this.students[index] = result;
        }
      }
    });
  }

  deleteStudent(student: any): void {
    console.log('Delete student:', student);
    // เพิ่มลอจิกสำหรับการลบนักเรียน
    // เช่น ยืนยันการลบ และอัปเดตรายการนักเรียน
    this.students = this.students.filter(s => s.id !== student.id);
  }
  ngOnInit(): void {
  }
}
