import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventListComponent implements OnInit {
  events: any[] = [];                  // ข้อมูลอีเวนต์ที่มีอยู่
  showAddEventForm: boolean = false;    // ควบคุมการแสดงฟอร์มเพิ่มอีเวนต์
  editingEventId: number | null = null; // เก็บ ID ของอีเวนต์ที่กำลังแก้ไข
  newEvent = {                          // โครงสร้างข้อมูลอีเวนต์ใหม่
    event_id: null,                     // เพิ่ม event_id ใน newEvent
    event_name: '',
    event_start_date: '',
    event_end_date: ''
  };

  private apiUrl = 'https://wag19.bowlab.net/get_events.php';
  private addEventUrl = 'https://wag19.bowlab.net/add_event.php';
  private updateEventUrl = 'https://wag19.bowlab.net/update_event.php';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // โหลดข้อมูลอีเวนต์
  loadEvents(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.events = data.events || [];
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  // แสดงหรือซ่อนฟอร์มเพิ่มอีเวนต์
  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm;
    if (this.showAddEventForm) this.editingEventId = null; // ล้างค่าการแก้ไข
  }

  // ฟังก์ชันเพิ่มอีเวนต์
  addEvent(): void {
    this.http.post<any>(this.addEventUrl, this.newEvent).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          alert('Event added successfully!');
          this.loadEvents();
          this.newEvent = { event_id: null, event_name: '', event_start_date: '', event_end_date: '' };
          this.showAddEventForm = false;
        } else {
          alert('Failed to add event: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error adding event:', error);
      }
    });
  }

  // เริ่มการแก้ไขอีเวนต์
  startEdit(event: any): void {
    this.editingEventId = event.event_id;   // เก็บ ID ของอีเวนต์ที่กำลังแก้ไข
    this.newEvent = { ...event };           // เติมข้อมูลลงในฟอร์ม
  }

  // ฟังก์ชันแก้ไขอีเวนต์
  updateEvent(): void {
    const updatedEventData = {
      event_id: this.newEvent.event_id,       // ใช้ newEvent แทน editingEvent
      event_name: this.newEvent.event_name,
      event_start_date: this.newEvent.event_start_date,
      event_end_date: this.newEvent.event_end_date
    };
  
    this.http.put<any>(this.updateEventUrl, updatedEventData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          alert('Event updated successfully!');
          this.loadEvents();
          this.cancelEdit();  // รีเซ็ตค่าหลังจากแก้ไขสำเร็จ
        } else {
          alert('Failed to update event: ' + response.message);
        }
      },
      error: (error) => {
        console.error("Error updating event:", error);
        alert('Error updating event.');
      }
    });
  }

  // ยกเลิกการแก้ไข
  cancelEdit(): void {
    this.editingEventId = null;
    this.newEvent = { event_id: null, event_name: '', event_start_date: '', event_end_date: '' };
  }
}
