import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booth-bookings',
  templateUrl: './booth-bookings.component.html',
  styleUrls: ['./booth-bookings.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BoothBookingsComponent implements OnInit {
  boothBookings: any[] = [];  // เก็บข้อมูลบูธที่ถูกจอง
  private apiUrl = 'https://wag19.bowlab.net/booth_bookings.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBoothBookings();
  }

  loadBoothBookings(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Data received:', data); // ดูข้อมูลที่ได้รับใน Console
        this.boothBookings = data.booth_bookings || [];  // ตั้งค่า data ที่ได้รับให้กับ boothBookings
      },
      error: (error) => {
        console.error('Error fetching booth bookings:', error);
      }
    });
  }
}
