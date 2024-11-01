import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule ] // เพิ่ม CommonModule ตรงนี้
})
export class PendingUsersComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number | null = null;

  private apiUrl = 'https://wag19.bowlab.net/get_pending_users.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = (data.pending_bookings || []).map((user: any) => ({
          ...user,
          showDetails: false // เพิ่ม showDetails เพื่อเก็บสถานะแต่ละผู้ใช้
        }));
        console.log('Users after loading:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  toggleUserDetails(user: any): void {
    user.showDetails = !user.showDetails; // สลับการแสดงผลเฉพาะผู้ใช้ที่กด
  }
  
}
