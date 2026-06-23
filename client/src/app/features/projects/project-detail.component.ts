import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  template: `
    @if (project()) {
      <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <a routerLink="/projects" class="text-blue-200 text-sm flex items-center gap-1 mb-6 hover:text-white">
            <span class="material-icons-outlined text-base">arrow_back</span> All Projects
          </a>
          <span class="text-sm bg-white/20 px-3 py-1 rounded-full">{{ project().category }}</span>
          <h1 class="text-4xl font-display font-extrabold mt-4 mb-4">{{ project().title }}</h1>
        </div>
      </section>
      <section class="max-w-4xl mx-auto px-4 py-12">
        <div class="esic-card p-6 mb-6">
          <p class="text-gray-600 leading-relaxed">{{ project().description }}</p>
        </div>
        @if (project().teamMembers?.length) {
          <div class="esic-card p-6 mb-6">
            <h2 class="font-display font-bold text-gray-900 mb-3">Team Members</h2>
            <div class="flex flex-wrap gap-2">
              @for (member of project().teamMembers; track member) {
                <span class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">{{ member }}</span>
              }
            </div>
          </div>
        }
        @if (project().tags?.length) {
          <div class="flex flex-wrap gap-2">
            @for (tag of project().tags; track tag) {
              <span class="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs">#{{ tag }}</span>
            }
          </div>
        }
      </section>
    }
  `,
})
export class ProjectDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  project = signal<any>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.get<any>(`/projects/${slug}`).subscribe(data => this.project.set(data));
  }
}