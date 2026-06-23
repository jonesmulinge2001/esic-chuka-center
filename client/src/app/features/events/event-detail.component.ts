import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink, DatePipe],
  template: `
    @if (event()) {
      <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <a routerLink="/events" class="text-blue-200 text-sm flex items-center gap-1 mb-6 hover:text-white">
            <span class="material-icons-outlined text-base">arrow_back</span> All Events
          </a>
          <span class="text-sm bg-white/20 px-3 py-1 rounded-full">{{ event().type }}</span>
          <h1 class="text-4xl font-display font-extrabold mt-4 mb-4">{{ event().title }}</h1>
        </div>
      </section>
      <section class="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <div class="esic-card p-6 mb-6">
            <h2 class="font-display font-bold text-gray-900 mb-3">About this Event</h2>
            <p class="text-gray-600 leading-relaxed">{{ event().description }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div class="esic-card p-5">
            <h3 class="font-semibold text-gray-900 mb-4 text-sm">Event Details</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-2 text-gray-600">
                <span class="material-icons-outlined text-primary-600 text-base mt-0.5">calendar_today</span>
                <div>
                  <div class="font-medium">{{ event().startDate | date:'EEEE, MMMM d, y' }}</div>
                  <div class="text-gray-400 text-xs">to {{ event().endDate | date:'MMMM d, y' }}</div>
                </div>
              </div>
              @if (event().location) {
                <div class="flex items-center gap-2 text-gray-600">
                  <span class="material-icons-outlined text-primary-600 text-base">location_on</span>
                  {{ event().location }}
                </div>
              }
              @if (event().maxCapacity) {
                <div class="flex items-center gap-2 text-gray-600">
                  <span class="material-icons-outlined text-primary-600 text-base">group</span>
                  {{ event().maxCapacity }} spots available
                </div>
              }
              @if (event().registrationDeadline) {
                <div class="flex items-center gap-2 text-gray-600">
                  <span class="material-icons-outlined text-primary-600 text-base">schedule</span>
                  Deadline: {{ event().registrationDeadline | date:'MMM d, y' }}
                </div>
              }
            </div>
            <div class="mt-5">
              @if (auth.isAuthenticated()) {
                <button (click)="register()" [disabled]="registering()"
                  class="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm">
                  {{ registering() ? 'Registering...' : registered() ? '✓ Registered' : 'Register Now' }}
                </button>
              } @else {
                <a routerLink="/auth/login" class="block w-full text-center bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  Login to Register
                </a>
              }
              @if (message()) {
                <p class="text-xs mt-2 text-center" [class]="messageType() === 'success' ? 'text-green-600' : 'text-red-500'">{{ message() }}</p>
              }
            </div>
          </div>
        </div>
      </section>
    }
  `,
})
export class EventDetailComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  event = signal<any>(null);
  registering = signal(false);
  registered = signal(false);
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.get<any>(`/events/${slug}`).subscribe(data => this.event.set(data));
  }

  register() {
    if (!this.event()) return;
    this.registering.set(true);
    this.api.post(`/events/${this.event().id}/register`, {}).subscribe({
      next: () => { this.registered.set(true); this.message.set('Successfully registered!'); this.messageType.set('success'); this.registering.set(false); },
      error: (e) => { this.message.set(e.error?.message ?? 'Registration failed'); this.messageType.set('error'); this.registering.set(false); },
    });
  }
}