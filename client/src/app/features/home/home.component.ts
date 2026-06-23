import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
            <span class="material-icons-outlined text-base">science</span>
            Chuka University · ESIC STEM LAB
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
            Innovating the Future<br/>
            <span class="text-accent-500">Through STEM</span>
          </h1>
          <p class="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
            The Electronics & Software Innovation Center empowers students, educators, and communities through world-class STEM education, research, and innovation.
          </p>
          <div class="flex flex-wrap gap-4">
            <a routerLink="/programs" class="bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Explore Programs
            </a>
            <a routerLink="/events" class="border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors backdrop-blur">
              Upcoming Events
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        @for (stat of stats; track stat.label) {
          <div class="text-center">
            <div class="text-3xl font-display font-extrabold text-primary-600">{{ stat.value }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ stat.label }}</div>
          </div>
        }
      </div>
    </section>

    <!-- Programs Section -->
    <section class="esic-section max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-display font-bold text-gray-900">Our Programs</h2>
          <p class="text-gray-500 mt-2">STEM education for every stage of learning</p>
        </div>
        <a routerLink="/programs" class="text-primary-600 font-semibold text-sm hover:underline hidden sm:flex items-center gap-1">
          View all <span class="material-icons-outlined text-base">arrow_forward</span>
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (prog of programCards; track prog.title) {
          <a [routerLink]="['/programs', prog.slug]"
             class="esic-card p-6 hover:shadow-md hover:border-primary-200 transition-all group cursor-pointer">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                 [style.background]="prog.bg">{{ prog.icon }}</div>
            <h3 class="font-display font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{{ prog.title }}</h3>
            <p class="text-sm text-gray-500">{{ prog.desc }}</p>
          </a>
        }
      </div>
    </section>

    <!-- Featured Events -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-3xl font-display font-bold text-gray-900">Upcoming Events</h2>
            <p class="text-gray-500 mt-2">Workshops, bootcamps, and competitions</p>
          </div>
          <a routerLink="/events" class="text-primary-600 font-semibold text-sm hover:underline hidden sm:flex items-center gap-1">
            All events <span class="material-icons-outlined text-base">arrow_forward</span>
          </a>
        </div>

        @if (events().length === 0) {
          <div class="text-center py-16 text-gray-400">
            <span class="material-icons-outlined text-5xl block mb-3">event</span>
            <p>No upcoming events yet. Check back soon!</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (event of events(); track event.id) {
              <div class="esic-card overflow-hidden hover:shadow-md transition-shadow">
                <div class="h-2 bg-primary-600"></div>
                <div class="p-6">
                  <span class="esic-badge bg-primary-100 text-primary-700 mb-3">{{ event.type }}</span>
                  <h3 class="font-display font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ event.description }}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <span class="material-icons-outlined text-sm">calendar_today</span>
                    {{ event.startDate | date:'MMM d, y' }}
                    @if (event.location) {
                      <span class="mx-1">·</span>
                      <span class="material-icons-outlined text-sm">location_on</span>
                      {{ event.location }}
                    }
                  </div>
                  <a [routerLink]="['/events', event.slug]"
                     class="text-primary-600 text-sm font-semibold hover:underline flex items-center gap-1">
                    Learn more <span class="material-icons-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 text-white py-16">
      <div class="max-w-3xl mx-auto text-center px-4">
        <h2 class="text-3xl font-display font-bold mb-4">Ready to Innovate?</h2>
        <p class="text-blue-100 mb-8">Join ESIC STEM LAB and be part of a growing community of STEM innovators at Chuka University.</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/auth/register" class="bg-white text-primary-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow">
            Register Now
          </a>
          <a routerLink="/contact" class="border border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  events = signal<any[]>([]);

  stats = [
    { value: '500+', label: 'Students Trained' },
    { value: '4', label: 'STEM Programs' },
    { value: '50+', label: 'Projects Completed' },
    { value: '10+', label: 'Industry Partners' },
  ];

  programCards = [
    { slug: 'early-stem', title: 'Early STEM', desc: 'Science & tech for ages 6–12', icon: '🔬', bg: '#dbeafe' },
    { slug: 'junior-stem', title: 'Junior STEM', desc: 'Hands-on learning for secondary students', icon: '⚡', bg: '#d1fae5' },
    { slug: 'advanced-engineering', title: 'Advanced Engineering', desc: 'University-level engineering courses', icon: '🛠️', bg: '#ede9fe' },
    { slug: 'lab-industrial-training', title: 'Industrial Training', desc: 'Real-world lab & industry experience', icon: '🏭', bg: '#fef3c7' },
  ];

  ngOnInit() {
    this.api.get<any[]>('/events/featured').subscribe({
      next: data => this.events.set(data),
      error: () => this.events.set([]),
    });
  }
}