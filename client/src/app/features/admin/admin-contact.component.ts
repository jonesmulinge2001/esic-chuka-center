import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-contact',
  imports: [RouterLink, DatePipe],
  template: `
    <div class="p-8">
      <a routerLink="/admin" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline">
        <span class="material-icons-outlined text-base">arrow_back</span> Admin
      </a>
      <h1 class="font-display font-bold text-gray-900 text-xl mb-6">Contact Messages</h1>
      <div class="space-y-4">
        @for (msg of messages(); track msg.id) {
          <div class="esic-card p-5" [class.opacity-60]="msg.isRead">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold text-gray-900 text-sm">{{ msg.name }}</span>
                  <span class="text-gray-400 text-xs">{{ msg.email }}</span>
                  @if (!msg.isRead) { <span class="w-2 h-2 bg-primary-500 rounded-full"></span> }
                </div>
                <div class="font-medium text-gray-700 text-sm mb-1">{{ msg.subject }}</div>
                <p class="text-sm text-gray-500 leading-relaxed">{{ msg.message }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-xs text-gray-400">{{ msg.createdAt | date:'MMM d' }}</div>
                @if (!msg.isRead) {
                  <button (click)="markRead(msg.id)" class="text-xs text-primary-600 font-semibold hover:underline mt-2 block">Mark read</button>
                }
              </div>
            </div>
          </div>
        }
        @if (messages().length === 0) {
          <div class="esic-card p-10 text-center text-gray-400">
            <span class="material-icons-outlined text-5xl block mb-3">inbox</span>
            <p>No messages yet.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class AdminContactComponent implements OnInit {
  private api = inject(ApiService);
  messages = signal<any[]>([]);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/contact').subscribe({ next: res => this.messages.set(res.data), error: () => {} });
  }

  markRead(id: string) {
    this.api.patch(`/contact/${id}/read`).subscribe({
      next: () => this.messages.update(m => m.map(x => x.id === id ? { ...x, isRead: true } : x)),
      error: () => {},
    });
  }
}