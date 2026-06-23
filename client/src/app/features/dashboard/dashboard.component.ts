import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="max-w-5xl mx-auto px-4 py-10">
      <div class="mb-8">
        <h1 class="text-2xl font-display font-bold text-gray-900">
          Welcome, {{ auth.user()?.firstName }} 👋
        </h1>
        <p class="text-gray-500 text-sm mt-1">Manage your ESIC STEM LAB activities</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        @for (card of actions; track card.title) {
          <a [routerLink]="card.route" class="esic-card p-6 hover:shadow-md hover:border-primary-200 transition-all group">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4" [style.background]="card.bg">
              <span class="material-icons-outlined text-xl" [style.color]="card.color">{{ card.icon }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{{ card.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ card.desc }}</p>
          </a>
        }
      </div>

      <!-- Recent submissions -->
      <div class="mt-10">
        <h2 class="font-display font-bold text-gray-900 mb-4">My Project Submissions</h2>
        @if (submissions().length === 0) {
          <div class="esic-card p-8 text-center text-gray-400">
            <span class="material-icons-outlined text-4xl block mb-2">science</span>
            <p class="text-sm">No submissions yet. <a routerLink="submit-project" class="text-primary-600 font-semibold">Submit your first project</a></p>
          </div>
        } @else {
          <div class="space-y-3">
            @for (sub of submissions(); track sub.id) {
              <div class="esic-card p-4 flex items-center justify-between">
                <div>
                  <div class="font-medium text-gray-900 text-sm">{{ sub.title }}</div>
                  <div class="text-xs text-gray-400 mt-0.5">{{ sub.category }} · Submitted {{ sub.submittedAt | date }}</div>
                </div>
                <span class="text-xs px-2.5 py-1 rounded-full font-medium"
                      [class]="statusClass(sub.status)">{{ sub.status }}</span>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  private api = inject(ApiService);
  submissions = signal<any[]>([]);

  actions = [
    { title: 'Submit a Project', desc: 'Share your innovation or research', route: 'submit-project', icon: 'upload_file', bg: '#dbeafe', color: '#2563eb' },
    { title: 'My Events', desc: 'View your event registrations', route: 'my-events', icon: 'event', bg: '#d1fae5', color: '#059669' },
    { title: 'Browse Resources', desc: 'Access STEM learning materials', route: '/resources', icon: 'menu_book', bg: '#ede9fe', color: '#7c3aed' },
  ];

  ngOnInit() {
    this.api.get<any[]>('/submissions/mine').subscribe({
      next: data => this.submissions.set(data),
      error: () => {},
    });
  }

  statusClass(s: string) {
    const m: Record<string, string> = { SUBMITTED: 'bg-blue-100 text-blue-700', UNDER_REVIEW: 'bg-yellow-100 text-yellow-700', APPROVED: 'bg-green-100 text-green-700', REJECTED: 'bg-red-100 text-red-700', PUBLISHED: 'bg-primary-100 text-primary-700' };
    return m[s] ?? 'bg-gray-100 text-gray-600';
  }
}