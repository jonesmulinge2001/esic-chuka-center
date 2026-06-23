import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-events',
  imports: [RouterLink, DatePipe],
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">Events & Workshops</h1>
        <p class="text-blue-200">Bootcamps, competitions, and outreach programs</p>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-12">
      @if (loading()) {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1,2,3,4,5,6]; track i) {
            <div class="esic-card p-6 animate-pulse">
              <div class="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
              <div class="h-5 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-100 rounded mb-2"></div>
              <div class="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          }
        </div>
      } @else if (events().length === 0) {
        <div class="text-center py-20 text-gray-400">
          <span class="material-icons-outlined text-6xl block mb-4">event_busy</span>
          <p class="text-lg">No upcoming events scheduled.</p>
        </div>
      } @else {
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (event of events(); track event.id) {
            <div class="esic-card overflow-hidden hover:shadow-md transition-shadow">
              <div class="h-1.5" [class]="eventColor(event.type)"></div>
              <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                  <span class="esic-badge text-xs px-2.5 py-1 rounded-full font-medium"
                        [class]="badgeClass(event.type)">{{ event.type }}</span>
                  @if (event.isFeatured) {
                    <span class="esic-badge bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5">Featured</span>
                  }
                </div>
                <h3 class="font-display font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                <p class="text-sm text-gray-500 line-clamp-2 mb-4">{{ event.description }}</p>
                <div class="space-y-1 mb-4">
                  <div class="flex items-center gap-2 text-xs text-gray-400">
                    <span class="material-icons-outlined text-sm">calendar_today</span>
                    {{ event.startDate | date:'EEE, MMM d, y' }}
                  </div>
                  @if (event.location) {
                    <div class="flex items-center gap-2 text-xs text-gray-400">
                      <span class="material-icons-outlined text-sm">location_on</span>{{ event.location }}
                    </div>
                  }
                  @if (event.maxCapacity) {
                    <div class="flex items-center gap-2 text-xs text-gray-400">
                      <span class="material-icons-outlined text-sm">group</span>{{ event.maxCapacity }} spots
                    </div>
                  }
                </div>
                <a [routerLink]="['/events', event.slug]"
                   class="text-primary-600 text-sm font-semibold hover:underline flex items-center gap-1">
                  View details <span class="material-icons-outlined text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          }
        </div>
        <!-- Pagination -->
        @if (meta().totalPages > 1) {
          <div class="flex justify-center gap-2 mt-10">
            @for (p of pages(); track p) {
              <button (click)="loadPage(p)" [class.bg-primary-600]="p === currentPage()" [class.text-white]="p === currentPage()"
                class="w-9 h-9 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">{{ p }}</button>
            }
          </div>
        }
      }
    </section>
  `,
})
export class EventsComponent implements OnInit {
  private api = inject(ApiService);
  events = signal<any[]>([]);
  meta = signal<any>({ total: 0, page: 1, limit: 9, totalPages: 1 });
  loading = signal(true);
  currentPage = signal(1);
  pages = signal<number[]>([]);

  ngOnInit() { this.loadPage(1); }

  loadPage(page: number) {
    this.loading.set(true);
    this.currentPage.set(page);
    this.api.get<PaginatedResult<any>>('/events', { page, limit: 9 }).subscribe({
      next: res => {
        this.events.set(res.data);
        this.meta.set(res.meta);
        this.pages.set(Array.from({ length: res.meta.totalPages }, (_, i) => i + 1));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  eventColor(type: string) {
    const m: Record<string, string> = { WORKSHOP: 'bg-blue-500', COMPETITION: 'bg-yellow-500', BOOTCAMP: 'bg-purple-500', WEBINAR: 'bg-green-500', OUTREACH: 'bg-orange-500', OTHER: 'bg-gray-400' };
    return m[type] ?? 'bg-gray-400';
  }

  badgeClass(type: string) {
    const m: Record<string, string> = { WORKSHOP: 'bg-blue-100 text-blue-700', COMPETITION: 'bg-yellow-100 text-yellow-700', BOOTCAMP: 'bg-purple-100 text-purple-700', WEBINAR: 'bg-green-100 text-green-700', OUTREACH: 'bg-orange-100 text-orange-700', OTHER: 'bg-gray-100 text-gray-700' };
    return m[type] ?? 'bg-gray-100 text-gray-700';
  }
}