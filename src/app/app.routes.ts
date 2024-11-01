import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { BoothListComponent } from './components/booth-list/booth-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { BoothBookingsComponent } from './components/booth-bookings/booth-bookings.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'zones', component: ZoneListComponent },
  { path: 'booth-list/:zone_id/:zone_name', component: BoothListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'bookings', component: BookingListComponent },
  { path: 'pending-users', component: PendingUsersComponent },
  { path: 'booth-bookings', component: BoothBookingsComponent },
];
