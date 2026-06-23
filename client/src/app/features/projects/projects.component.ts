import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">Projects & Research</h1>
        <p class="text-blue-200">Student innovations, research initiatives, and engineering prototypes</p>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-12">
      @if (projects().length === 0 && !loading()) {
        <div class="text-center py-20 text-gray-400">
          <span class="material-icons-outlined text-6xl block mb-4">science</span>
          <p>No projects published yet. Check back soon!</p>
        </div>
      } @else {
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of projects(); track project.id) {
            <a [routerLink]="['/projects', project.slug]" class="esic-card overflow-hidden hover:shadow-md transition-shadow group">
              <div class="h-44 bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center">
                @if (project.imageUrls?.length) {
                  <img [src]="project.imageUrls[0]" [alt]="project.title" class="h-full w-full object-cover">
                } @else {
                  <span class="material-icons-outlined text-primary-300 text-6xl">science</span>
                }
              </div>
              <div class="p-5">
                <span class="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">{{ project.category }}</span>
                <h3 class="font-display font-bold text-gray-900 mt-2 mb-2 group-hover:text-primary-600 transition-colors">{{ project.title }}</h3>
                <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ project.description }}</p>
                @if (project.teamMembers?.length) {
                  <div class="flex items-center gap-1 text-xs text-gray-400">
                    <span class="material-icons-outlined text-sm">group</span>
                    {{ project.teamMembers.join(', ') }}
                  </div>
                }
              </div>
            </a>
          }
        </div>
      }
    </section>
  `,
})
export class ProjectsComponent implements OnInit {
  private api = inject(ApiService);
  projects = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.get<PaginatedResult<any>>('/projects').subscribe({
      next: res => { this.projects.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}