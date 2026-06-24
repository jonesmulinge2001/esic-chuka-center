import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-[#001e5c] text-blue-200">

      <!-- Top strip -->
      <div class="border-b border-blue-900/60 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow">
                <span class="text-[#003399] font-extrabold text-base">ES</span>
              </div>
              <div>
                <div class="text-white font-display font-extrabold text-sm tracking-wide">ESIC STEM LAB</div>
                <div class="text-blue-400 text-xs">Electronics &amp; Software Innovation Center</div>
              </div>
            </div>
            <p class="text-sm text-blue-300 leading-relaxed max-w-sm mb-5">
              Advancing STEM education and innovation at Chuka University. Empowering the next generation of engineers, innovators, and problem-solvers.
            </p>
            <!-- Social icons -->
            <div class="flex gap-2">
              @for (s of socials; track s.label) {
                <a [href]="s.url" target="_blank"
                   class="w-9 h-9 bg-[#003399] rounded-lg flex items-center justify-center hover:bg-[#0044cc] transition-colors text-[10px] font-extrabold text-white">
                  {{ s.icon }}
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-bold text-sm mb-4 uppercase tracking-wider">Programs</h4>
            <ul class="space-y-2">
              @for (l of programLinks; track l.path) {
                <li>
                  <a [routerLink]="l.path"
                     class="text-sm text-blue-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span class="material-icons-outlined text-[#f5c518] text-xs">arrow_right</span>
                    {{ l.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-2 text-blue-300">
                <span class="material-icons-outlined text-[#f5c518] text-base flex-shrink-0 mt-0.5">location_on</span>
                <span>Chuka University, P.O Box 109-60400, Tharaka-Nithi, Kenya</span>
              </li>
              <li class="flex items-center gap-2 text-blue-300">
                <span class="material-icons-outlined text-[#f5c518] text-base">email</span>
                <a href="mailto:esic@chuka.ac.ke" class="hover:text-white transition-colors">esic&#64;chuka.ac.ke</a>
              </li>
              <li class="flex items-center gap-2 text-blue-300">
                <span class="material-icons-outlined text-[#f5c518] text-base">language</span>
                <a href="https://www.chuka.ac.ke" target="_blank" class="hover:text-white transition-colors">chuka.ac.ke</a>
              </li>
            </ul>

            <!-- CTA button -->
            <a routerLink="/contact"
               class="mt-5 inline-flex items-center gap-2 bg-[#f5c518] text-[#001e5c] font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#ffd94d] transition-colors shadow">
              <span class="material-icons-outlined text-sm">mail</span>
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>© {{ year }} ESIC STEM LAB, Chuka University. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <a routerLink="/about" class="hover:text-white transition-colors">About</a>
            <a routerLink="/contact" class="hover:text-white transition-colors">Contact</a>
            <span class="text-blue-600">|</span>
            <span>Built with Angular &amp; NestJS</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    { label: 'Twitter/X', icon: 'X',  url: '#' },
    { label: 'LinkedIn',  icon: 'in', url: '#' },
    { label: 'YouTube',   icon: 'YT', url: '#' },
    { label: 'Facebook',  icon: 'f',  url: '#' },
  ];

  programLinks = [
    { label: 'Early STEM (Ages 6–12)',        path: '/programs/early-stem' },
    { label: 'Junior Secondary STEM',         path: '/programs/junior-stem' },
    { label: 'Advanced Engineering',          path: '/programs/advanced-engineering' },
    { label: 'Laboratory & Industrial',       path: '/programs/lab-industrial-training' },
    { label: 'Learning Resources',            path: '/resources' },
    { label: 'Projects & Research',           path: '/projects' },
    { label: 'Events & Workshops',            path: '/events' },
    { label: 'Gallery',                       path: '/gallery' },
  ];
}