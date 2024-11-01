import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  users: any[] = [];
  confirmedBookings: any[] = [];
  viewMode: 'bookings' | 'users' | 'confirmed' = 'bookings';

  selectedBookingId: number | null = null;
  selectedUserId: number | null = null;

  private bookingsApiUrl = 'https://wag19.bowlab.net/get_pending_payment_users.php';
  private usersApiUrl = 'https://wag19.bowlab.net/get_pending_users.php';
  private confirmedBookingsApiUrl = 'https://wag19.bowlab.net/get_confirm.php';
  private confirmBookingApiUrl = 'https://wag19.bowlab.net/update_payment_status.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadUsers();
    this.loadConfirmedBookings();
  }

  loadBookings(): void {
    this.http.get<any>(this.bookingsApiUrl).subscribe({
      next: (data) => {
        this.bookings = data.pending_bookings || [];
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    });
  }

  loadUsers(): void {
    this.http.get<any>(this.usersApiUrl).subscribe({
      next: (data) => {
        this.users = data.pending_bookings || [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  loadConfirmedBookings(): void {
    this.http.get<any>(this.confirmedBookingsApiUrl).subscribe({
      next: (data) => {
        this.confirmedBookings = data.bookings || [];
      },
      error: (error) => {
        console.error('Error fetching confirmed bookings:', error);
      }
    });
  }

  toggleView(mode: 'bookings' | 'users' | 'confirmed'): void {
    this.viewMode = mode;
    this.selectedBookingId = null;
    this.selectedUserId = null;
  }

  toggleBookingDetails(bookingId: number): void {
    this.selectedBookingId = this.selectedBookingId === bookingId ? null : bookingId;
  }

  toggleUserDetails(userId: number): void {
    this.selectedUserId = this.selectedUserId === userId ? null : userId;
  }

  confirmBooking(bookingId: number, event: Event): void {
    event.stopPropagation(); // ป้องกันการ toggle เมื่อคลิกปุ่มยืนยัน
  
    // แสดงการยืนยันก่อนดำเนินการ
    if (confirm("Are you sure you want to confirm this booking?")) {
      const body = { booking_id: bookingId };
  
      this.http.post(this.confirmBookingApiUrl, body).subscribe({
        next: (response) => {
          console.log('Booking confirmed:', response);
          
          // อัปเดต bookings list โดยการลบ booking ที่ถูกยืนยันออกจากรายการ
          this.bookings = this.bookings.filter(b => b.booking_id !== bookingId);
          
          // รีเฟรชข้อมูลจากเซิร์ฟเวอร์หลังจากยืนยันแล้ว
          this.loadBookings(); // โหลดข้อมูล bookings ใหม่อีกครั้ง
        },
        error: (error) => {
          console.error('Error confirming booking:', error);
        }
      });
    }
  }
  
}
