import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  memberData: any[] = [];  // เก็บ array ของสมาชิก
  selectedMemberId: number | null = null;  // เก็บ ID ของสมาชิกที่ถูกเลือก

  private apiUrl = 'https://wag19.bowlab.net/get_member.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.memberData = data.members;  // ดึงเฉพาะ members array ออกมา
        console.log(this.memberData); // ตรวจสอบข้อมูลใน console
      },
      error: (error) => {
        console.error('Error fetching member data:', error);
      }
    });
  }

  // ฟังก์ชันสำหรับเลือกสมาชิก
  toggleDetails(memberId: number): void {
    this.selectedMemberId = this.selectedMemberId === memberId ? null : memberId;
  }
}
