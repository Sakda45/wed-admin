import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]  // import RouterModule ถ้าคุณใช้ <router-outlet>
})
export class AppComponent {
  title = 'wed-admin';
}
