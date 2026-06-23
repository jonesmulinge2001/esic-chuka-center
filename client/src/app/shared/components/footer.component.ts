import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-900 text-gray-300 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold text-sm">ES</span>
              </div>
              <div>
                <div class="font-display font-bold text-white">ESIC STEM LAB</div>
                <div class="text-xs text-gray-400">Electronics & Software Innovation Center</div>
              </div>
            </div>
            <p class="text-sm text-gray-400 max-w-xs leading-relaxed">
              Advancing STEM education and innovation at Chuka University. Empowering the next generation of engineers and innovators.
            </p>
            <div class="flex gap-3 mt-4">
              @for (social of socials; track social.label) {
                <a [href]="social.url" target="_blank"
                   class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors text-xs font-bold">
                  {{ social.icon }}
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul class="space-y-2">
              @for (link of quickLinks; track link.path) {
                <li>
                  <a [routerLink]="link.path" class="text-sm text-gray-400 hover:text-white transition-colors">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li class="flex items-start gap-2">
                <span class="material-icons-outlined text-base mt-0.5">location_on</span>
                Chuka University, Tharaka-Nithi, Kenya
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-base">email</span>
                <a href="mailto:esic@chuka.ac.ke" class="hover:text-white">esic&#64;chuka.ac.ke</a>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-base">language</span>
                <a href="https://www.chuka.ac.ke" target="_blank" class="hover:text-white">chuka.ac.ke</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {{ year }} ESIC STEM LAB, Chuka University. All rights reserved.</p>
          <p>Built with Angular & NestJS</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
  socials = [
    { label: 'Twitter', icon: 'X', url: '#' },
    { label: 'LinkedIn', icon: 'in', url: '#' },
    { label: 'YouTube', icon: 'YT', url: '#' },
  ];
  quickLinks = [
    { path: '/programs', label: 'Programs' },
    { path: '/projects', label: 'Projects & Research' },
    { path: '/events', label: 'Events' },
    { path: '/resources', label: 'Learning Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];
}