import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-programs',
  imports: [RouterLink],
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">STEM Programs</h1>
        <p class="text-blue-200 text-lg">Structured learning paths for every stage</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 py-16">
      @if (loading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1,2,3,4]; track i) {
            <div class="esic-card p-6 animate-pulse">
              <div class="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
              <div class="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div class="h-4 bg-gray-100 rounded mb-2"></div>
              <div class="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          }
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (prog of programs(); track prog.id) {
            <a [routerLink]="['/programs', prog.slug]"
               class="esic-card p-6 hover:shadow-md hover:border-primary-200 transition-all group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span class="material-icons-outlined text-primary-600">science</span>
                </div>
                <span class="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{{ prog.level }}</span>
              </div>
              <h3 class="font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{{ prog.title }}</h3>
              <p class="text-sm text-gray-500 line-clamp-3 mb-4">{{ prog.overview }}</p>
              <div class="text-primary-600 text-sm font-semibold flex items-center gap-1">
                Learn more <span class="material-icons-outlined text-base">arrow_forward</span>
              </div>
            </a>
          }
        </div>
      }
    </section>
  `,
})
export class ProgramsComponent implements OnInit {
  private api = inject(ApiService);
  programs = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/programs').subscribe({
      next: res => { this.programs.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}