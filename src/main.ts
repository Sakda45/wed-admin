// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // เพิ่ม provideHttpClient
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // เพิ่ม provideHttpClient เพื่อให้ HttpClient ทำงานได้
  ]
}).catch(err => console.error(err));
