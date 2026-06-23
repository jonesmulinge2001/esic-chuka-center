import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';
@Component({ selector: 'app-admin-users', imports: [RouterLink, DatePipe], template: `
  <div class="p-8">
    <a routerLink="/admin" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline"><span class="material-icons-outlined text-base">arrow_back</span> Admin</a>
    <h1 class="font-display font-bold text-gray-900 text-xl mb-6">Users</h1>
    <div class="esic-card overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Name</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Email</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Role</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-gray-500">Joined</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          @for (user of users(); track user.id) {
            <tr class="hover:bg-gray-50">
              <td class="px-5 py-4 font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</td>
              <td class="px-5 py-4 text-gray-500">{{ user.email }}</td>
              <td class="px-5 py-4"><span class="text-xs px-2.5 py-1 rounded-full font-medium" [class]="user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'">{{ user.role }}</span></td>
              <td class="px-5 py-4 text-gray-400 text-xs">{{ user.createdAt | date:'MMM d, y' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
`})
export class AdminUsersComponent implements OnInit {
  private api = inject(ApiService);
  users = signal<any[]>([]);
  ngOnInit() { this.api.get<PaginatedResult<any>>('/users').subscribe({ next: res => this.users.set(res.data), error: () => {} }); }
}