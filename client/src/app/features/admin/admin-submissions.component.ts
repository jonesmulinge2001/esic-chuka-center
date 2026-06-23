import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-submissions',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="p-8">
      <a routerLink="/admin" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline">
        <span class="material-icons-outlined text-base">arrow_back</span> Admin
      </a>
      <h1 class="font-display font-bold text-gray-900 text-xl mb-6">Project Submissions</h1>
      @if (subs().length === 0) {
        <div class="esic-card p-10 text-center text-gray-400">
          <span class="material-icons-outlined text-5xl block mb-3">inbox</span>
          <p>No submissions yet.</p>
        </div>
      } @else {
        <div class="esic-card overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Project</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Submitted By</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Category</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Date</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              @for (sub of subs(); track sub.id) {
                <tr class="hover:bg-gray-50">
                  <td class="px-5 py-4 font-medium text-gray-900">{{ sub.title }}</td>
                  <td class="px-5 py-4 text-gray-500">{{ sub.user.firstName }} {{ sub.user.lastName }}</td>
                  <td class="px-5 py-4 text-gray-500">{{ sub.category }}</td>
                  <td class="px-5 py-4 text-gray-400 text-xs">{{ sub.submittedAt | date:'MMM d, y' }}</td>
                  <td class="px-5 py-4">
                    <span class="text-xs px-2.5 py-1 rounded-full font-medium" [class]="statusClass(sub.status)">{{ sub.status }}</span>
                  </td>
                  <td class="px-5 py-4">
                    @if (sub.status === 'SUBMITTED') {
                      <div class="flex items-center gap-2">
                        <button (click)="review(sub.id, 'APPROVED')" class="text-xs text-green-600 font-semibold hover:underline">Approve</button>
                        <button (click)="review(sub.id, 'REJECTED')" class="text-xs text-red-500 font-semibold hover:underline">Reject</button>
                      </div>
                    } @else {
                      <span class="text-xs text-gray-400">Reviewed</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
})
export class AdminSubmissionsComponent implements OnInit {
  private api = inject(ApiService);
  subs = signal<any[]>([]);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/submissions').subscribe({ next: res => this.subs.set(res.data), error: () => {} });
  }

  review(id: string, status: string) {
    this.api.patch(`/submissions/${id}/review`, { status }).subscribe({
      next: (updated: any) => this.subs.update(s => s.map(x => x.id === id ? { ...x, status: updated.status } : x)),
      error: () => {},
    });
  }

  statusClass(s: string) {
    const m: Record<string, string> = { SUBMITTED: 'bg-blue-100 text-blue-700', UNDER_REVIEW: 'bg-yellow-100 text-yellow-700', APPROVED: 'bg-green-100 text-green-700', REJECTED: 'bg-red-100 text-red-700' };
    return m[s] ?? 'bg-gray-100 text-gray-600';
  }
}