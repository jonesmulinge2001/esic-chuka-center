import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, PaginatedResult } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resources',
  imports: [RouterLink],
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">Learning Resources</h1>
        <p class="text-blue-200">Manuals, guides, workbooks, and STEM experiment documentation</p>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-12">
      @if (!auth.isAuthenticated()) {
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span class="material-icons-outlined text-blue-500 mt-0.5">info</span>
          <p class="text-sm text-blue-700">Some resources require a free account.
            <a routerLink="/auth/register" class="font-semibold underline">Register</a> or
            <a routerLink="/auth/login" class="font-semibold underline">login</a> to access all materials.
          </p>
        </div>
      }
      @if (resources().length === 0 && !loading()) {
        <div class="text-center py-20 text-gray-400">
          <span class="material-icons-outlined text-6xl block mb-4">menu_book</span>
          <p>No resources available yet.</p>
        </div>
      } @else {
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (res of resources(); track res.id) {
            <div class="esic-card p-5 hover:shadow-md transition-shadow">
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                     [class]="typeColor(res.type)">
                  <span class="material-icons-outlined text-lg">{{ typeIcon(res.type) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 text-sm truncate">{{ res.title }}</h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{{ res.category }}</span>
                    <span class="text-xs px-2 py-0.5 rounded" [class]="res.visibility === 'PUBLIC' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'">
                      {{ res.visibility === 'PUBLIC' ? 'Public' : 'Members only' }}
                    </span>
                  </div>
                </div>
              </div>
              @if (res.description) {
                <p class="text-xs text-gray-500 line-clamp-2 mb-3">{{ res.description }}</p>
              }
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ res.downloadCount }} downloads</span>
                @if (res.visibility === 'PUBLIC' || auth.isAuthenticated()) {
                  <a [href]="res.url" target="_blank"
                     class="text-primary-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                    <span class="material-icons-outlined text-sm">download</span> Download
                  </a>
                } @else {
                  <a routerLink="/auth/login" class="text-gray-400 text-xs flex items-center gap-1">
                    <span class="material-icons-outlined text-sm">lock</span> Login to access
                  </a>
                }
              </div>
            </div>
          }
        </div>
      }
    </section>
  `,
})
export class ResourcesComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  resources = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/resources').subscribe({
      next: res => { this.resources.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  typeIcon(type: string): string {
    const m: Record<string, string> = { PDF: 'picture_as_pdf', VIDEO: 'play_circle', LINK: 'link', DOCUMENT: 'description', IMAGE: 'image' };
    return m[type] ?? 'insert_drive_file';
  }

  typeColor(type: string): string {
    const m: Record<string, string> = { PDF: 'bg-red-100 text-red-600', VIDEO: 'bg-blue-100 text-blue-600', LINK: 'bg-green-100 text-green-600', DOCUMENT: 'bg-purple-100 text-purple-600', IMAGE: 'bg-yellow-100 text-yellow-600' };
    return m[type] ?? 'bg-gray-100 text-gray-600';
  }
}