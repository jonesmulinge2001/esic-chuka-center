import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({ selector: 'app-admin-events', imports: [RouterLink], template: `
  <div class="p-8">
    <a routerLink="/admin" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline"><span class="material-icons-outlined text-base">arrow_back</span> Admin</a>
    <h1 class="font-display font-bold text-gray-900 text-xl mb-6">Events Management</h1>
    <p class="text-gray-500 text-sm">Use the API or Swagger UI at <a href="http://localhost:3000/api/docs" target="_blank" class="text-primary-600 underline">/api/docs</a> to create and manage events.</p>
  </div>
`})
export class AdminEventsComponent {}