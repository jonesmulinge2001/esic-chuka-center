import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-program-detail',
  imports: [RouterLink],
  template: `
    @if (program()) {
      <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
        <div class="max-w-4xl mx-auto">
          <a routerLink="/programs" class="text-blue-200 text-sm flex items-center gap-1 mb-6 hover:text-white">
            <span class="material-icons-outlined text-base">arrow_back</span> All Programs
          </a>
          <span class="text-sm bg-white/20 px-3 py-1 rounded-full">{{ program().level }}</span>
          <h1 class="text-4xl font-display font-extrabold mt-4 mb-4">{{ program().title }}</h1>
          <p class="text-blue-100 text-lg">{{ program().overview }}</p>
        </div>
      </section>
      <section class="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div class="esic-card p-6">
          <h2 class="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons-outlined text-primary-600">flag</span> Objectives
          </h2>
          <ul class="space-y-2">
            @for (obj of program().objectives; track obj) {
              <li class="flex items-start gap-2 text-sm text-gray-600">
                <span class="material-icons-outlined text-accent-500 text-base mt-0.5">check</span>{{ obj }}
              </li>
            }
          </ul>
        </div>
        <div class="esic-card p-6">
          <h2 class="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span class="material-icons-outlined text-primary-600">build</span> Activities
          </h2>
          <ul class="space-y-2">
            @for (act of program().activities; track act) {
              <li class="flex items-start gap-2 text-sm text-gray-600">
                <span class="material-icons-outlined text-indigo-500 text-base mt-0.5">play_arrow</span>{{ act }}
              </li>
            }
          </ul>
        </div>
      </section>
    }
  `,
})
export class ProgramDetailComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  program = signal<any>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.api.get<any>(`/programs/${slug}`).subscribe(data => this.program.set(data));
  }
}