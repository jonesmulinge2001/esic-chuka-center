import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-gallery',
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">Gallery</h1>
        <p class="text-blue-200">Photos and videos from our activities, workshops, and events</p>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-12">
      @if (items().length === 0 && !loading()) {
        <div class="text-center py-20 text-gray-400">
          <span class="material-icons-outlined text-6xl block mb-4">photo_library</span>
          <p>Gallery coming soon!</p>
        </div>
      } @else {
        <div class="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          @for (item of items(); track item.id) {
            <div class="break-inside-avoid esic-card overflow-hidden hover:shadow-md transition-shadow">
              <div class="relative">
                @if (item.mediaType === 'VIDEO') {
                  <div class="h-40 bg-gray-900 flex items-center justify-center">
                    <span class="material-icons-outlined text-white text-5xl">play_circle</span>
                  </div>
                } @else {
                  <div class="h-40 bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                    @if (item.url) {
                      <img [src]="item.url" [alt]="item.title" class="w-full h-full object-cover">
                    } @else {
                      <span class="material-icons-outlined text-primary-300 text-4xl">image</span>
                    }
                  </div>
                }
                @if (item.mediaType === 'VIDEO') {
                  <span class="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">VIDEO</span>
                }
              </div>
              <div class="p-3">
                <p class="text-xs font-medium text-gray-800 truncate">{{ item.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ item.category }}</p>
              </div>
            </div>
          }
        </div>
      }
    </section>
  `,
})
export class GalleryComponent implements OnInit {
  private api = inject(ApiService);
  items = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/gallery', { limit: 24 }).subscribe({
      next: res => { this.items.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}