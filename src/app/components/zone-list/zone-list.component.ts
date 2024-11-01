import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ZoneListComponent implements OnInit {
  zoneData: any[] = [];           
  showForm: boolean = false;       
  editingZone: any = null;        
  newZone = {                     
    zone_name: '',
    zone_description: '',
    num_booths: 0,
    event_id: null
  };
  events: any[] = []; // เก็บข้อมูลอีเวนท์สำหรับ Dropdown

  private apiUrl = 'https://wag19.bowlab.net/get_zone.php';
  private addZoneUrl = 'https://wag19.bowlab.net/add_zone.php';
  private deleteZoneUrl = 'https://wag19.bowlab.net/delete_zone.php';
  private updateZoneUrl = 'https://wag19.bowlab.net/update_zone.php';
  private eventsApiUrl = 'https://wag19.bowlab.net/get_events.php';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadZones();
    this.loadEvents(); // เรียกฟังก์ชันโหลดข้อมูลอีเวนท์
  }

  loadZones(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.zoneData = data.zones;
      },
      error: (error) => {
        console.error('Error fetching zone data:', error);
      }
    });
  }

  loadEvents(): void {
    // ดึงข้อมูล Event จาก API และเก็บใน `events` สำหรับ Dropdown
    this.http.get<any>(this.eventsApiUrl).subscribe({
      next: (data) => {
        this.events = data.events || [];
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addZone(): void {
    this.http.post<any>(this.addZoneUrl, this.newZone, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          alert('Zone added successfully!');
          this.loadZones();
          this.newZone = { zone_name: '', zone_description: '', num_booths: 0, event_id: null };
          this.showForm = false;
        } else {
          alert('Failed to add zone: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Error adding zone:', error);
        alert('Error adding zone.');
      }
    });
  }

  deleteZone(zone_name: string): void {
    if (confirm(`Are you sure you want to delete the zone "${zone_name}"?`)) {
      this.http.post<any>(this.deleteZoneUrl, { zone_name }).subscribe({
        next: () => {
          alert('Zone deleted successfully!');
          this.zoneData = this.zoneData.filter(zone => zone.zone_name !== zone_name);
        },
        error: (error) => {
          console.error('Error deleting zone:', error);
        }
      });
    }
  }

  startEdit(zone: any): void {
    this.editingZone = { ...zone };
  }

  saveEdit(zone: any): void {
    const updatedZone = {
      id: zone.id,
      zone_name: zone.zone_name,
      zone_description: zone.zone_description,
      num_booths: zone.num_booths
    };

    this.http.put<any>(this.updateZoneUrl, updatedZone).subscribe({
      next: () => {
        alert('Zone updated successfully!');
        this.editingZone = null;
        this.loadZones();
      },
      error: (error) => {
        console.error('Error updating zone:', error);
      }
    });
  }
  
  goToBoothList(zoneId: string , zoneName: string): void {
    this.router.navigate(['/booth-list', zoneId , zoneName]);
  }
  
  cancelEdit(): void {
    this.editingZone = null;
  }

  isEditing(zoneId: number): boolean {
    return this.editingZone && this.editingZone.id === zoneId;
  }
}
