import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  template: `
    <!-- Hero -->
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">About ESIC STEM LAB</h1>
        <p class="text-blue-200 text-lg">Electronics & Software Innovation Center at Chuka University</p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      <div class="esic-card p-8">
        <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
          <span class="material-icons-outlined text-primary-600">visibility</span>
        </div>
        <h2 class="text-xl font-display font-bold text-gray-900 mb-3">Our Vision</h2>
        <p class="text-gray-600 leading-relaxed">To be the leading center for STEM innovation and technology education in the Mount Kenya region, producing world-class engineers and innovators who solve Africa's challenges.</p>
      </div>
      <div class="esic-card p-8">
        <div class="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4">
          <span class="material-icons-outlined text-accent-500">flag</span>
        </div>
        <h2 class="text-xl font-display font-bold text-gray-900 mb-3">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed">To provide accessible, high-quality STEM education and innovation opportunities that empower students, educators, and communities across Kenya and beyond.</p>
      </div>
    </section>

    <!-- Objectives -->
    <section class="bg-gray-50 py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Our Objectives</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          @for (obj of objectives; track obj) {
            <div class="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
              <span class="material-icons-outlined text-primary-600 mt-0.5">check_circle</span>
              <span class="text-gray-700 text-sm">{{ obj }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="max-w-7xl mx-auto px-4 py-16">
      <h2 class="text-2xl font-display font-bold text-gray-900 mb-8 text-center">Our Team</h2>
      @if (team().length > 0) {
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (member of team(); track member.id) {
            <div class="esic-card p-6 text-center">
              <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4 text-2xl">
                @if (member.avatarUrl) {
                  <img [src]="member.avatarUrl" [alt]="member.name" class="w-full h-full rounded-full object-cover">
                } @else {
                  <span class="material-icons-outlined text-primary-600 text-3xl">person</span>
                }
              </div>
              <h3 class="font-semibold text-gray-900 text-sm">{{ member.name }}</h3>
              <p class="text-xs text-primary-600 font-medium mt-1">{{ member.title }}</p>
              <p class="text-xs text-gray-500 mt-2 line-clamp-2">{{ member.bio }}</p>
            </div>
          }
        </div>
      } @else {
        <p class="text-center text-gray-400 py-8">Team information coming soon.</p>
      }
    </section>
  `,
})
export class AboutComponent implements OnInit {
  private api = inject(ApiService);
  team = signal<any[]>([]);

  objectives = [
    'Deliver high-quality STEM education from early childhood to advanced university level',
    'Foster a culture of innovation, research, and entrepreneurship',
    'Build strategic partnerships with industry and academic institutions',
    'Provide hands-on laboratory and industrial training experiences',
    'Promote gender equality and inclusivity in STEM fields',
    'Support student project development and innovation showcases',
    'Develop STEM resources and curriculum materials for educators',
    'Engage communities through outreach and STEM awareness programs',
  ];

  ngOnInit() {
    this.api.get<any[]>('/team').subscribe({
      next: data => this.team.set(data),
      error: () => this.team.set([]),
    });
  }
}