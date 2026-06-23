import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-my-events',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="max-w-3xl mx-auto px-4 py-10">
      <a routerLink="/dashboard" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline">
        <span class="material-icons-outlined text-base">arrow_back</span> Dashboard
      </a>
      <h1 class="font-display font-bold text-gray-900 text-xl mb-6">My Event Registrations</h1>
      @if (registrations().length === 0 && !loading()) {
        <div class="esic-card p-10 text-center text-gray-400">
          <span class="material-icons-outlined text-5xl block mb-3">event_busy</span>
          <p class="mb-4">You haven't registered for any events yet.</p>
          <a routerLink="/events" class="text-primary-600 font-semibold text-sm hover:underline">Browse Events</a>
        </div>
      } @else {
        <div class="space-y-4">
          @for (reg of registrations(); track reg.id) {
            <div class="esic-card p-5 flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-900">{{ reg.event.title }}</h3>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>{{ reg.event.startDate | date:'MMM d, y' }}</span>
                  @if (reg.event.location) { <span>· {{ reg.event.location }}</span> }
                </div>
              </div>
              <a [routerLink]="['/events', reg.event.slug]" class="text-primary-600 text-xs font-semibold hover:underline">View</a>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class MyEventsComponent implements OnInit {
  private api = inject(ApiService);
  registrations = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.get<any[]>('/users/me/events').subscribe({
      next: data => { this.registrations.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}