import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  styles: [`
    :host { 
      display: block; 
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }

    header {
      animation: slideDown .3s ease;
      background: white;
      border-bottom: 1px solid #e5e8f0;
      box-shadow: 0 1px 3px rgba(0,20,80,.06), 0 1px 8px rgba(0,20,80,.04);
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Dropdown animation */
    .dd-menu {
      transform: translateY(-4px);
      transition: opacity .18s ease, transform .18s ease, visibility .18s;
    }
    .group\/dd:hover .dd-menu {
      transform: translateY(0) !important;
    }

    /* Dropdown item indent-on-hover */
    .dd-item {
      transition: background .12s, color .12s, padding-left .12s;
    }
    .dd-item:hover {
      padding-left: 1.1rem !important;
    }

    /* Chevron spin */
    .chevron {
      transition: transform .2s ease;
    }
    .group\/dd:hover .chevron {
      transform: rotate(180deg);
    }

    /* Logo icon lift */
    .logo-icon {
      transition: box-shadow .2s, transform .2s;
    }
    .group\/logo:hover .logo-icon {
      box-shadow: 0 4px 12px rgba(0,51,153,.3);
      transform: translateY(-1px);
    }

    /* Primary button lift */
    .btn-primary {
      transition: background .15s, box-shadow .15s, transform .15s;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0,51,153,.32) !important;
    }

    /* Icon buttons scale */
    .icon-btn {
      transition: background .15s, color .15s, transform .15s;
    }
    .icon-btn:hover {
      transform: scale(1.08);
    }

    /* Mobile menu slide */
    .mobile-menu {
      animation: mobileSlide .2s ease;
    }
    @keyframes mobileSlide {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      *, header, .dd-menu, .mobile-menu { animation: none !important; transition: none !important; }
    }
  `],
  template: `
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div class="flex items-center justify-between h-14">

          <!-- ── Logo ── -->
          <a routerLink="/" class="group/logo flex items-center gap-2.5 flex-shrink-0">
            <div class="logo-icon w-[34px] h-[34px]
                        bg-gradient-to-br from-[#003399] to-[#1a4fbf]
                        rounded-[9px] flex items-center justify-center
                        shadow-[0_2px_6px_rgba(0,51,153,.25)]">
              <span class="text-white font-black text-[11px] tracking-wide leading-none">ES</span>
            </div>
            <div class="hidden sm:block">
              <div class="font-extrabold text-[11.5px] text-[#001e5c] leading-none tracking-[.06em] uppercase">ESIC</div>
              <div class="text-[9px] text-slate-400 leading-tight mt-0.5">Electronics &amp; Software Innovation Center</div>
            </div>
          </a>

          <!-- ── Desktop Nav ── -->
          <nav class="hidden lg:flex items-center gap-0.5">
            @for (link of navLinks; track link.label) {
              @if (link.children) {
                <div class="relative group/dd">
                  <button class="flex items-center gap-0.5 px-2.5 py-[5px] rounded-[7px]
                                 text-[11.5px] font-semibold text-[#1e3a8a]
                                 hover:text-[#003399] hover:bg-[#eff4ff]
                                 transition-colors duration-150 cursor-pointer border-none bg-transparent">
                    {{ link.label }}
                    <span class="material-icons chevron text-[13px] opacity-70">expand_more</span>
                  </button>
                  <div class="dd-menu absolute top-full left-0 mt-1.5 min-w-[184px]
                              bg-white rounded-[10px] border border-[#e8edf8]
                              shadow-[0_8px_24px_rgba(0,20,80,.10),0_2px_6px_rgba(0,20,80,.06)]
                              p-1 opacity-0 invisible group-hover/dd:opacity-100 group-hover/dd:visible
                              z-50">
                    @for (child of link.children; track child.path) {
                      <a [routerLink]="child.path"
                         class="dd-item block px-3 py-[7px] rounded-[7px]
                                text-[11.5px] font-medium text-[#1e3a8a]
                                hover:bg-[#eff4ff] hover:text-[#003399]">
                        {{ child.label }}
                      </a>
                    }
                  </div>
                </div>
              } @else {
                <a [routerLink]="link.path"
                   routerLinkActive="text-[#003399] bg-[#eff4ff]"
                   [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
                   class="px-2.5 py-[5px] rounded-[7px] text-[11.5px] font-semibold
                          text-[#1e3a8a] hover:text-[#003399] hover:bg-[#eff4ff]
                          transition-colors duration-150">
                  {{ link.label }}
                </a>
              }
            }
          </nav>

          <!-- ── Right Actions ── -->
          <div class="flex items-center gap-1.5">

            <!-- Search -->
            <button class="icon-btn hidden lg:flex w-8 h-8 items-center justify-center
                           rounded-[7px] text-slate-500 hover:bg-slate-100
                           hover:text-[#003399] border-none bg-transparent cursor-pointer">
              <span class="material-icons text-[18px]">search</span>
            </button>

            @if (auth.isAuthenticated()) {
              <!-- User -->
              <a routerLink="/dashboard"
                 class="hidden sm:flex items-center gap-1.5 px-2.5 py-[5px] rounded-[7px]
                        text-[11.5px] font-semibold text-[#1e3a8a]
                        hover:bg-[#eff4ff] hover:text-[#003399] transition-colors duration-150">
                <span class="material-icons text-[15px] text-[#003399]">account_circle</span>
                {{ auth.user()?.firstName }}
              </a>
              @if (auth.isAdmin()) {
                <span class="hidden sm:inline text-[10px] font-bold px-2 py-0.5
                             rounded-full bg-violet-100 text-violet-700 tracking-wide">
                  Admin
                </span>
              }
              <button (click)="auth.logout()"
                class="icon-btn hidden sm:flex w-8 h-8 items-center justify-center
                       rounded-[7px] text-slate-400 hover:bg-red-50 hover:text-red-500
                       border-none bg-transparent cursor-pointer transition-colors duration-150"
                title="Logout">
                <span class="material-icons text-[18px]">logout</span>
              </button>
            } @else {
              <a routerLink="/auth/login"
                 class="hidden sm:flex items-center gap-1.5 px-2.5 py-[5px] rounded-[7px]
                        text-[11.5px] font-semibold text-[#1e3a8a]
                        hover:bg-[#eff4ff] hover:text-[#003399] transition-colors duration-150">
                <span class="material-icons text-[15px]">login</span>
                Login
              </a>
              <a routerLink="/contact"
                 class="btn-primary hidden md:flex items-center gap-1.5
                        bg-[#003399] text-white text-[11.5px] font-bold
                        px-3.5 py-[6px] rounded-[8px]
                        shadow-[0_2px_6px_rgba(0,51,153,.25)]
                        hover:bg-[#0030cc] transition-colors duration-150">
                <span class="material-icons text-[14px]">waving_hand</span>
                Get in Touch
              </a>
            }

            <!-- Mobile burger -->
            <button (click)="menuOpen.set(!menuOpen())"
              class="icon-btn lg:hidden w-8 h-8 flex items-center justify-center
                     rounded-[7px] text-[#001e5c] hover:bg-slate-100
                     border-none bg-transparent cursor-pointer transition-colors duration-150">
              <span class="material-icons text-[20px]">
                {{ menuOpen() ? 'close' : 'menu' }}
              </span>
            </button>
          </div>
        </div>

        <!-- ── Mobile Menu ── -->
        @if (menuOpen()) {
          <nav class="mobile-menu lg:hidden border-t border-slate-100 py-2 pb-3 flex flex-col gap-0.5">
            @for (link of navLinks; track link.label) {
              @if (!link.children) {
                <a [routerLink]="link.path" (click)="menuOpen.set(false)"
                   routerLinkActive="text-[#003399] bg-[#eff4ff]"
                   class="px-3.5 py-2 rounded-[7px] text-[11.5px] font-semibold
                          text-[#1e3a8a] hover:bg-slate-50 transition-colors duration-150">
                  {{ link.label }}
                </a>
              }
              @if (link.children) {
                <div class="px-3.5 pt-3 pb-0.5 text-[9.5px] font-bold
                            text-slate-400 uppercase tracking-[.1em]">
                  {{ link.label }}
                </div>
                @for (child of link.children; track child.path) {
                  <a [routerLink]="child.path" (click)="menuOpen.set(false)"
                     class="pl-6 pr-3.5 py-1.5 rounded-[7px] text-[11.5px]
                            font-medium text-[#1e3a8a] hover:bg-slate-50
                            transition-colors duration-150">
                    {{ child.label }}
                  </a>
                }
              }
            }
            <div class="border-t border-slate-100 mt-2 pt-2.5 flex flex-col gap-1.5 px-3.5">
              @if (auth.isAuthenticated()) {
                <a routerLink="/dashboard" (click)="menuOpen.set(false)"
                   class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#003399]">
                  <span class="material-icons text-[15px]">dashboard</span>
                  Dashboard
                </a>
                <button (click)="auth.logout(); menuOpen.set(false)"
                  class="flex items-center gap-1.5 text-[11.5px] text-red-500
                         font-medium border-none bg-transparent cursor-pointer p-0">
                  <span class="material-icons text-[15px]">logout</span>
                  Logout
                </button>
              } @else {
                <a routerLink="/auth/login" (click)="menuOpen.set(false)"
                   class="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1e3a8a]">
                  <span class="material-icons text-[15px]">login</span>
                  Login
                </a>
                <a routerLink="/auth/register" (click)="menuOpen.set(false)"
                   class="flex items-center justify-center gap-1.5
                          bg-[#003399] text-white text-[11.5px] font-bold
                          px-4 py-2 rounded-[8px]">
                  <span class="material-icons text-[14px]">how_to_reg</span>
                  Join ESIC
                </a>
              }
            </div>
          </nav>
        }
      </div>
    </header>
  `,
})
export class NavbarComponent {
  auth = inject(AuthService);
  menuOpen = signal(false);

  navLinks: Array<{
    label: string; path?: string; exact?: boolean;
    children?: Array<{ label: string; path: string }>;
  }> = [
    { label: 'Home',                path: '/', exact: true },
    { label: 'About ESIC',          path: '/about' },
    {
      label: 'Products',
      children: [
        { label: 'Early STEM',           path: '/programs/early-stem' },
        { label: 'Junior STEM',          path: '/programs/junior-stem' },
        { label: 'Advanced Engineering', path: '/programs/advanced-engineering' },
        { label: 'Industrial Training',  path: '/programs/lab-industrial-training' },
      ],
    },
    {
      label: 'Learning Resources',
      children: [
        { label: 'All Resources', path: '/resources' },
        { label: 'Gallery',       path: '/gallery' },
      ],
    },
    { label: 'ESIC Learn',          path: '/dashboard' },
    { label: 'Projects & Research', path: '/projects' },
    { label: 'Partners',            path: '/about' },
    { label: 'Contact',             path: '/contact' },
  ];
}