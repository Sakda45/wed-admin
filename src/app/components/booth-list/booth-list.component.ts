import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booth-list',
  templateUrl: './booth-list.component.html',
  styleUrls: ['./booth-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BoothListComponent implements OnInit {
cancelEdit() {
throw new Error('Method not implemented.');
}
  booths: any[] = [];
  zoneId: string = '';
  zoneName: string = ''; 
  expandedBoothId: number | null = null;
  showAddBoothForm: boolean = false;
  editingBooth: any | null = null;

  newBooth = {
    booth_name: '',
    booth_size: '',
    status: 'available',
    price: '',
    image_url: '',
    zone_id: ''
  };

  private apiUrl = 'https://wag19.bowlab.net/s_booth_by_zone_id.php';
  private addBoothUrl = 'https://wag19.bowlab.net/insert_booth.php';
  private deleteBoothUrl = 'https://wag19.bowlab.net/delete_booth.php';
  private updateBoothUrl = 'https://wag19.bowlab.net/update_booth.php';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.zoneId = this.route.snapshot.paramMap.get('zone_id') || '';
    this.zoneName = this.route.snapshot.paramMap.get('zone_name') || '';
    this.newBooth.zone_id = this.zoneId;
    this.loadBooths();
  }

  loadBooths(): void {
    this.http.post<any>(this.apiUrl, { zone_id: this.zoneId }).subscribe({
      next: (data) => {
        this.booths = data.booths || [];
      },
      error: (error) => {
        console.error('Error fetching booth data:', error);
      }
    });
  }

  toggleAddBoothForm(): void {
    this.showAddBoothForm = !this.showAddBoothForm;
  }

  addBooth(): void {
    this.http.post<any>(this.addBoothUrl, this.newBooth).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          alert('Booth added successfully!');
          this.loadBooths();
          this.showAddBoothForm = false;
          this.newBooth = {
            booth_name: '',
            booth_size: '',
            status: 'available',
            price: '',
            image_url: '',
            zone_id: this.zoneId
          };
        }
      },
      error: (error) => {
        console.error('Error adding booth:', error);
      }
    });
  }

  deleteBooth(boothName: string): void {
    if (confirm(`Are you sure you want to delete booth "${boothName}"?`)) {
      this.http.post<any>(this.deleteBoothUrl, { booth_name: boothName }).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            alert('Booth deleted successfully!');
            this.booths = this.booths.filter(booth => booth.booth_name !== boothName);
          } else {
            alert('Failed to delete booth: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Error deleting booth:', error);
          alert('Error deleting booth');
        }
      });
    }
  }

  startEdit(booth: any): void {
    this.editingBooth = { ...booth };
  }

  updateBooth(): void {
    const updatedBoothData = {
      id: this.editingBooth.id,
      booth_name: this.editingBooth.booth_name,
      booth_size: this.editingBooth.booth_size,
      status: this.editingBooth.status,
      price: this.editingBooth.price,
      image_url: this.editingBooth.image_url,
      zone_id: this.zoneId
    };
  
    this.http.put<any>(this.updateBoothUrl, updatedBoothData).subscribe({
      next: (response) => {
        alert(response.message || 'Booth updated successfully!');
        this.loadBooths();  // รีเฟรชข้อมูลบูธหลังจากอัปเดต
        this.editingBooth = null; // ปิดฟอร์มการแก้ไข
      },
      error: (error) => {
        console.error('Error updating booth:', error);
        alert('Error updating booth');
      }
    });
  }
  

  toggleBoothDetails(boothId: number): void {
    this.expandedBoothId = this.expandedBoothId === boothId ? null : boothId;
  }

  goBack(): void {
    window.history.back();
  }
}
