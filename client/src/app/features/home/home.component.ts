import {
  Component, OnInit, signal, inject,
  AfterViewInit, ElementRef, ViewChildren, QueryList
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  styles: [`
    /* ── Keyframes (can't be done with Tailwind) ── */
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes orbPulse {
      0%, 100% { transform: scale(1); opacity: .7; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(32px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardPop {
      from { opacity: 0; transform: translateY(60px) scale(.92); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes rocketFloat {
      0%, 100% { transform: translateY(0) rotate(-30deg); }
      50% { transform: translateY(-18px) rotate(-30deg); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,24,.35); }
      50% { box-shadow: 0 0 0 12px rgba(245,197,24,0); }
    }
    @keyframes starSpin { to { transform: rotate(360deg); } }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .6; transform: scale(1.3); }
    }
    @keyframes feFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    /* ── Utility classes (complex CSS that Tailwind can't handle) ── */
    .bg-hero-gradient {
      background: linear-gradient(135deg, #001e5c 0%, #003399 50%, #0a4fd6 100%);
    }
    .bg-cta-gradient {
      background: #003399;
    }
    .bg-card-gradient {
      background: linear-gradient(160deg, #fff 70%, #f0f6ff);
    }
    .bg-video-overlay {
      background: linear-gradient(135deg, rgba(0,30,92,0.6), rgba(10,79,214,0.5));
    }
    .bg-accent-amber::before { content: ''; background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .bg-accent-blue::before { content: ''; background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .bg-accent-green::before { content: ''; background: linear-gradient(90deg, #10b981, #34d399); }
    .bg-accent-purple::before { content: ''; background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
    .bg-accent-orange::before { content: ''; background: linear-gradient(90deg, #f97316, #fb923c); }
    .bg-accent-indigo::before { content: ''; background: linear-gradient(90deg, #6366f1, #818cf8); }

    .animate-hero-float { animation: heroFloat 3s ease-in-out infinite; }
    .animate-orb-pulse-1 { animation: orbPulse 4s ease-in-out infinite; }
    .animate-orb-pulse-2 { animation: orbPulse 5s ease-in-out infinite .8s; }
    .animate-shimmer { background-size: 200%; animation: shimmer 3s linear infinite; }
    .animate-slide-up-1 { animation: slideUp .6s ease .1s both; }
    .animate-slide-up-2 { animation: slideUp .6s ease .2s both; }
    .animate-slide-up-3 { animation: slideUp .6s ease .3s both; }
    .animate-slide-up-4 { animation: slideUp .6s ease .35s both; }
    .animate-slide-up-5 { animation: slideUp .6s ease .4s both; }
    .animate-slide-up-6 { animation: slideUp .6s ease .5s both; }
    .animate-card-pop { animation: cardPop .6s cubic-bezier(.34,1.56,.64,1) both; }
    .animate-rocket-float { animation: rocketFloat 2.5s ease-in-out infinite; }
    .animate-glow { animation: glow 2.5s ease-in-out infinite; }
    .animate-star-spin { animation: starSpin 6s linear infinite; }
    .animate-dot-pulse { animation: dotPulse 1.5s ease-in-out infinite; }
    .animate-fe-float-1 { animation: feFloat 3.5s ease-in-out infinite .5s; }
    .animate-fe-float-2 { animation: feFloat 4s ease-in-out infinite 1s; }

    .filter-blur-70 { filter: blur(70px); }
    .filter-blur-60 { filter: blur(60px); }

    /* ── Card hover transitions ── */
    .card-hover {
      opacity: 0;
      transform: translateY(60px);
      transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                  box-shadow .3s,
                  border-color .3s;
    }
    .card-hover.visible {
      animation: cardPop .6s cubic-bezier(.34,1.56,.64,1) both;
    }
    .card-hover:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 20px 40px rgba(0,30,92,.12);
      border-color: #b4ccf7;
    }

    .event-card-hover {
      transition: transform .25s, box-shadow .25s;
    }
    .event-card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,30,92,.10);
    }

    .prog-card-strip {
      position: relative;
      overflow: hidden;
    }
    .prog-card-strip::before {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      border-radius: 20px 20px 0 0;
    }

    /* ── What We Do: sector chip hover ── */
    .sector-chip {
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, border-color .25s, background .25s;
    }
    .sector-chip:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0,30,92,.10);
      border-color: #b4ccf7;
      background: #f0f6ff;
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    }
  `],
  template: `
    <!-- ══════════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════════ -->
    <section class="bg-hero-gradient min-h-[540px] relative overflow-hidden flex items-center py-10">
      <!-- Orb decorations -->
      <div class="absolute w-[320px] h-[320px] rounded-full filter-blur-70 pointer-events-none bg-yellow-400/12 -top-20 right-[8%] animate-orb-pulse-1"></div>
      <div class="absolute w-[220px] h-[220px] rounded-full filter-blur-70 pointer-events-none bg-blue-600/28 -bottom-14 left-[5%] animate-orb-pulse-2"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-2 gap-10 items-center">

          <!-- Left copy -->
          <div>
            

            <h1 class="text-[clamp(36px,5vw,60px)] font-black text-white leading-[1.05] mb-4 animate-slide-up-2">
              Building Minds.<br>
              <span class="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-shimmer">Creating Innovators.</span>
            </h1>

            <p class="text-blue-200 text-[15px] leading-relaxed mb-5 animate-slide-up-3">
              We design, develop, and manufacture innovative STEM learning systems that inspire
              curiosity, creativity, and problem-solving. From elementary science kits to
              university engineering trainers, ESIC empowers learners through hands-on,
              experiential education.
            </p>

            <p class="text-yellow-400 text-[18px] font-extrabold mb-7 animate-slide-up-4">
              ✦ Learn by Building. Innovate by Doing.
            </p>

            <div class="flex flex-wrap gap-3 animate-slide-up-5">
              <a routerLink="/programs" class="inline-flex items-center gap-2 bg-yellow-400 text-[#001e5c] font-extrabold text-[13px] px-6 py-3 rounded-xl no-underline shadow-[0_4px_16px_rgba(245,197,24,.35)] animate-glow transition-transform duration-200 hover:scale-103 hover:-translate-y-0.5">
                <span class="material-icons-outlined text-base">science</span>
                Explore STEM Kits
              </a>
              <a routerLink="/contact" class="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold text-[13px] px-6 py-3 rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20">
                <span class="material-icons-outlined text-base">handshake</span>
                Partner With Us
              </a>
            </div>

            <div class="flex flex-wrap gap-5 mt-7 animate-slide-up-6">
              @for (badge of trustBadges; track badge.label) {
                <div class="flex items-center gap-2">
                  <span class="material-icons-outlined text-yellow-400 text-base">{{ badge.icon }}</span>
                  <div>
                    <div class="font-bold text-white text-[11px]">{{ badge.label }}</div>
                    <div class="text-blue-200 text-[10px]">{{ badge.sub }}</div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: hero visual panel -->
          <div class="relative flex justify-center items-center hidden lg:flex animate-slide-up-3">
            <div class="relative w-full max-w-md">

              <!-- Floating chips -->
              <div class="absolute top-[-14px] left-[-18px] bg-white rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#001e5c] flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,30,92,.18)] animate-fe-float-1">
                <span class="material-icons-outlined text-yellow-500 text-base">bolt</span>
                Circuit Kit
              </div>
              <div class="absolute bottom-[-6px] left-[-22px] bg-white rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#001e5c] flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,30,92,.18)] animate-fe-float-2">
                <span class="material-icons-outlined text-[#003399] text-base">smart_toy</span>
                Robotics Ready!
              </div>

              <!-- Rocket decoration -->
              <span class="absolute top-4 right-[-8px] text-[32px] text-yellow-400 rotate-[-30deg] animate-rocket-float material-icons-outlined">rocket_launch</span>

              <!-- Main card -->
              <div class="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl">
                <div class="bg-gradient-to-br from-blue-400/20 to-indigo-400/25 rounded-xl h-[200px] flex items-center justify-center mb-4 relative overflow-hidden">
                  <img
                    src="/images/esic-hero.jpeg"
                    alt="ESIC STEM Learning"
                    loading="lazy"
                    class="max-h-[150px] w-auto object-contain animate-hero-float"
                  />
                  <p class="absolute bottom-2 inset-x-0 text-center text-white/80 text-xs font-medium">
                    Hands-on STEM Learning
                  </p>
                  <div class="absolute top-2.5 right-2.5 bg-[#003399] border-2.5 border-yellow-400 rounded-full w-[62px] h-[62px] flex flex-col items-center justify-center text-center">
                    <span class="text-yellow-400 font-black text-base leading-none">61+</span>
                    <span class="text-white text-[8px] leading-tight px-1 text-center">Experiments Included</span>
                  </div>
                </div>
                <div class="bg-yellow-400 text-[#001e5c] rounded-lg px-3.5 py-2 text-center text-[11px] font-black tracking-[0.08em]">
                  ⚡ STEP BY STEP SCIENCE
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         WHAT WE DO
    ══════════════════════════════════════════════════════ -->
    <section class="bg-[#f8faff] py-14 border-b border-[#e2e8f0]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div class="text-[#003399] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">✦ What We Do</div>
            <h2 class="text-[clamp(24px,3.5vw,34px)] font-black text-[#001e5c] mb-4 leading-tight">
              Transforming STEM Education Through Innovation
            </h2>
            <p class="text-[#475569] text-[14px] leading-relaxed">
              At ESIC, we believe students learn best by doing. Every product we develop combines
              physical learning kits, structured experiment manuals, digital resources, and teacher
              support to create engaging learning experiences.
            </p>
          </div>

          <div>
            <div class="text-[11px] font-bold text-[#94a3b8] tracking-[0.08em] uppercase mb-3">Our Solutions Serve</div>
            <div class="grid grid-cols-2 gap-3">
              @for (sector of sectorsServed; track sector.label) {
                <div class="sector-chip flex items-center gap-2.5 bg-white border border-[#e2e8f7] rounded-xl px-4 py-3">
                  <span class="material-icons-outlined text-[#003399] text-lg">{{ sector.icon }}</span>
                  <span class="text-[13px] font-bold text-[#173b78]">{{ sector.label }}</span>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         PROGRAM CARDS
    ══════════════════════════════════════════════════════ -->
    <section class="bg-white py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-10">
          <div class="text-[#003399] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">✦ Our Programs</div>
          <h2 class="text-[clamp(24px,3.5vw,38px)] font-black text-[#001e5c] mb-1.5">STEM for Every Age &amp; Level</h2>
          <p class="text-[#64748b] text-[14px]">From curious 6-year-olds to university engineers — a kit for every learner.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (prog of programCards; track prog.slug; let i = $index) {
            <a
              [routerLink]="['/programs', prog.slug]"
              #cardRef
              class="rounded-2xl border border-[#dce6f7] bg-card-gradient p-6 prog-card-strip flex flex-col min-h-[440px] no-underline card-hover"
              [class]="'bg-accent-' + prog.accent"
              [attr.data-index]="i"
            >
              <!-- Icon -->
              <div class="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-5" [style.background]="prog.iconBg">
                <span class="material-icons-outlined text-[28px]" [style.color]="prog.iconColor">
                  {{ prog.icon }}
                </span>
              </div>

              <div class="text-[16px] font-extrabold text-[#173b78] mb-0.5">{{ prog.title }}</div>
              <div class="text-[10px] font-bold text-[#94a3b8] tracking-[0.05em] uppercase mb-2.5">{{ prog.age }}</div>

              <!-- Product image -->
              <div class="flex justify-center items-center h-[130px] overflow-hidden rounded-xl bg-[#f8fafc] mb-3.5">
                <img
                  [src]="prog.image"
                  [alt]="prog.title"
                  loading="lazy"
                  class="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  (error)="prog.image = '/images/placeholder.jpg'"
                />
              </div>

              <!-- Features -->
              <ul class="list-none flex-1 mb-4">
                @for (item of prog.items; track item) {
                  <li class="flex items-center gap-1.5 text-[12px] text-[#475569] py-0.5">
                    <span class="material-icons-outlined text-[#003399] text-sm">check_circle</span>
                    {{ item }}
                  </li>
                }
              </ul>

              <!-- CTA -->
              <div class="flex items-center gap-1.5 text-[12px] font-extrabold text-[#003399] transition-all duration-200 group-hover:gap-2.5">
                {{ prog.cta }}
                <span class="material-icons-outlined text-base transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         FEATURED PRODUCT BANNER
    ══════════════════════════════════════════════════════ -->
    <section class="bg-[#001e5c] py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-10 items-center">

          <!-- Product visuals -->
          <div class="flex items-center justify-center lg:justify-start gap-4">
            <div class="w-24 h-24 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-center">
              <span class="material-icons-outlined text-yellow-400 text-5xl">science</span>
            </div>
            <div class="w-20 h-20 bg-white rounded-xl shadow-xl flex items-center justify-center">
              <span class="material-icons-outlined text-[#003399] text-4xl">auto_stories</span>
            </div>
          </div>

          <!-- Program info -->
          <div>
            <span class="inline-block bg-yellow-400 text-[#001e5c] text-[9px] font-black tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-2.5">Explore Our Programs</span>
            <h2 class="text-2xl font-black text-white mb-4">STEM Learning Programs</h2>
            <div class="grid grid-cols-2 gap-1.5 mb-4">
              @for (program of featuredPrograms.slice(0, 6); track program) {
                <div class="flex items-center gap-1.5 text-blue-200 text-[11px]">
                  <span class="material-icons-outlined text-yellow-400 text-sm">check_circle</span>
                  {{ program }}
                </div>
              }
            </div>
            <a routerLink="/programs" class="inline-flex items-center gap-1.5 bg-white text-[#001e5c] font-extrabold text-[12px] px-[22px] py-2.5 rounded-xl no-underline transition-all duration-200 hover:bg-[#eff4ff] hover:-translate-y-0.5">
              View All Programs
              <span class="material-icons-outlined text-base">arrow_forward</span>
            </a>
          </div>

          <!-- Video panel -->
          <div class="relative rounded-2xl overflow-hidden bg-[#0a1a45] aspect-video flex items-center justify-center border border-white/10 cursor-pointer transition-transform duration-200 hover:scale-102 hidden lg:flex">
            <div class="absolute inset-0 bg-video-overlay"></div>
            <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,.3)] relative z-10 transition-transform duration-200 hover:scale-110">
              <span class="material-icons-outlined text-[#003399] text-3xl ml-1">play_arrow</span>
            </div>
            <div class="absolute bottom-3 inset-x-0 text-center text-white text-xs font-bold">
              Watch STEM in Action
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         STATS BAR
    ══════════════════════════════════════════════════════ -->
    <section class="bg-[#002580] py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4">
          @for (stat of stats; track stat.label) {
            <div class="text-center px-6 py-4 border-r border-white/10 last:border-r-0">
              <div class="flex items-center justify-center gap-2 mb-1">
                <span class="material-icons-outlined text-yellow-400 text-2xl">{{ stat.icon }}</span>
                <span class="text-[32px] font-black text-white">{{ stat.value }}</span>
              </div>
              <div class="text-blue-200 text-[11px] font-medium mt-0.5">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         UPCOMING EVENTS
    ══════════════════════════════════════════════════════ -->
    <section class="bg-[#f8faff] py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="text-[#003399] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">✦ What's On</div>
            <h2 class="text-[26px] font-black text-[#001e5c] mb-1.5">Upcoming Events</h2>
            <p class="text-[#64748b] text-[14px] mt-1">Workshops, bootcamps, and competitions</p>
          </div>
          <a routerLink="/events"
             class="hidden sm:flex items-center gap-1 text-[#003399] font-bold text-sm hover:underline">
            All events
            <span class="material-icons-outlined text-base">arrow_forward</span>
          </a>
        </div>

        @if (events().length === 0) {
          <div class="text-center py-16 text-gray-400">
            <span class="material-icons-outlined text-5xl block mb-3">event</span>
            <p class="text-sm">No upcoming events yet. Check back soon!</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            @for (event of events(); track event.id) {
              <a [routerLink]="['/events', event.slug]" class="bg-white rounded-2xl border border-[#e2e8f7] overflow-hidden no-underline event-card-hover">
                <div class="h-1.5 w-full" [class]="eventStripe(event.type)"></div>
                <div class="p-4">
                  <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full" [class]="eventBadge(event.type)">
                      {{ event.type }}
                    </span>
                    @if (event.isFeatured) {
                      <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800">
                        Featured
                      </span>
                    }
                  </div>
                  <div class="font-extrabold text-[#001e5c] text-[14px] mb-1.5 leading-tight">{{ event.title }}</div>
                  <div class="text-[12px] text-[#64748b] leading-relaxed mb-3 line-clamp-2">{{ event.description }}</div>
                  <div class="border-t border-[#f1f5f9] pt-2.5">
                    <div class="flex items-center gap-1.5 text-[11px] text-[#94a3b8] py-0.5">
                      <span class="material-icons-outlined text-[#003399] text-sm">calendar_today</span>
                      {{ event.startDate | date:'EEE, MMM d, y' }}
                    </div>
                    @if (event.location) {
                      <div class="flex items-center gap-1.5 text-[11px] text-[#94a3b8] py-0.5">
                        <span class="material-icons-outlined text-[#003399] text-sm">location_on</span>
                        {{ event.location }}
                      </div>
                    }
                  </div>
                </div>
              </a>
            }
          </div>
        }
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         FEATURED PROJECTS
    ══════════════════════════════════════════════════════ -->
    @if (projects().length > 0) {
      <section class="bg-white py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="flex items-end justify-between mb-8">
            <div>
              <div class="text-[#003399] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">✦ Innovation Showcase</div>
              <h2 class="text-[26px] font-black text-[#001e5c]">Featured Projects &amp; Research</h2>
            </div>
            <a routerLink="/projects"
               class="hidden sm:flex items-center gap-1 text-[#003399] font-bold text-sm hover:underline">
              All projects
              <span class="material-icons-outlined text-base">arrow_forward</span>
            </a>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (proj of projects(); track proj.id) {
              <a [routerLink]="['/projects', proj.slug]"
                 class="bg-white rounded-2xl border border-[#e2e8f7] overflow-hidden no-underline event-card-hover group">
                <div class="h-36 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <span class="material-icons-outlined text-[#003399]/40 text-6xl">biotech</span>
                </div>
                <div class="p-5">
                  <span class="text-xs bg-blue-50 text-[#003399] px-2.5 py-0.5 rounded-full font-semibold">
                    {{ proj.category }}
                  </span>
                  <h3 class="font-black text-[#001e5c] text-sm mt-2 mb-1 group-hover:text-[#003399] transition-colors">
                    {{ proj.title }}
                  </h3>
                  <p class="text-xs text-gray-500 line-clamp-2">{{ proj.description }}</p>
                </div>
              </a>
            }
          </div>

        </div>
      </section>
    }

    <!-- ══════════════════════════════════════════════════════
         PARTNERS
    ══════════════════════════════════════════════════════ -->
    @if (partners().length > 0) {
      <section class="bg-[#f8faff] py-12 border-t border-[#e2e8f0]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-center text-xs font-black uppercase tracking-widest text-gray-400 mb-8">
            Our Partners &amp; Collaborators
          </p>
          <div class="flex flex-wrap items-center justify-center gap-6">
            @for (partner of partners(); track partner.id) {
              <div class="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
                <div class="w-8 h-8 bg-[#003399]/10 rounded-lg flex items-center justify-center">
                  <span class="material-icons-outlined text-[#003399] text-base">business</span>
                </div>
                <span class="text-sm font-black text-[#001e5c]">{{ partner.name }}</span>
              </div>
            }
          </div>
        </div>
      </section>
    }
  `,
})
export class HomeComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);

  @ViewChildren('cardRef') cards!: QueryList<ElementRef>;

  events   = signal<any[]>([]);
  projects = signal<any[]>([]);
  partners = signal<any[]>([]);

  /* ── Static data ── */

  trustBadges = [
    { icon: 'lightbulb',   label: 'Hands-on Learning',    sub: 'Learn by doing'    },
    { icon: 'menu_book',   label: 'Step-by-Step Manuals', sub: 'Clear guidance'    },
    { icon: 'verified',    label: 'Safe & Durable',       sub: 'Quality materials' },
    { icon: 'play_circle', label: 'Video Tutorials',      sub: 'Included free'     },
  ];

  sectorsServed = [
    { icon: 'school',               label: 'Primary Schools'          },
    { icon: 'menu_book',            label: 'Junior Secondary Schools' },
    { icon: 'auto_stories',         label: 'Senior Secondary Schools' },
    { icon: 'engineering',          label: 'TVET Institutions'        },
    { icon: 'account_balance',      label: 'Universities'             },
    { icon: 'biotech',              label: 'Research Laboratories'    },
    { icon: 'lightbulb',            label: 'Innovation Hubs'          },
  ];

  featuredPrograms = [
    'Circuit Learning Kits',
    'Magnetism Kits',
    'Solar Energy Kits',
    'Beginner Coding Kits',
    'Arduino Starter Kits',
    'Robotics Explorer Kits',
    'Sensors & IoT Kits',
    'Coding & AI Kits',
    'Embedded Systems Trainers',
    'PLC Trainers',
    'Control Systems Trainers',
    'AI & ML Trainers',
    'Industrial Automation',
    'Mechatronics Trainers',
    'Electrical Installation',
    'Renewable Energy Labs',
    'Experiment Manuals',
    'Student Workbooks',
    'Teacher Guides',
    'Video Lessons & Quizzes',
    'Interactive Lessons',
    'Assessments & Quizzes',
    'Progress Tracking',
    'Certificates',
  ];

  programCards: Array<{
    slug: string; accent: string; title: string; age: string;
    icon: string; iconColor: string; iconBg: string;
    image: string;
    items: string[]; cta: string;
  }> = [
    {
      slug: 'early-stem', accent: 'amber',
      title: 'Early STEM', age: 'Ages 6–12',
      icon: 'electric_bolt', iconColor: '#d97706', iconBg: '#fef3c7',
      image: '/images/esic-6-12.jpeg',
      items: [
        'Circuit Learning Kits',
        'Magnetism Kits',
        'Solar Energy Kits',
        'Beginner Coding Kits',
      ],
      cta: 'Explore',
    },
    {
      slug: 'junior-stem', accent: 'blue',
      title: 'Junior Secondary STEM', age: 'Grades 7–9',
      icon: 'smart_toy', iconColor: '#1d4ed8', iconBg: '#dbeafe',
      image: '/images/esic-junior.jpeg',
      items: [
        'Arduino Starter Kits',
        'Robotics Explorer Kits',
        'Sensors & IoT Kits',
        'Coding & AI Kits',
      ],
      cta: 'Explore',
    },
    {
      slug: 'advanced-engineering', accent: 'green',
      title: 'Advanced Engineering', age: 'College & University',
      icon: 'memory', iconColor: '#047857', iconBg: '#d1fae5',
      image: '/images/esic-advanced.jpeg',
      items: [
        'Embedded Systems Trainers',
        'PLC Trainers',
        'Control Systems Trainers',
        'AI & ML Trainers',
      ],
      cta: 'Explore',
    },
    {
      slug: 'lab-industrial-training', accent: 'purple',
      title: 'Lab & Industrial Trainers', age: 'Industry Ready',
      icon: 'precision_manufacturing', iconColor: '#7c3aed', iconBg: '#ede9fe',
      image: '/images/esic-lab.jpeg',
      items: [
        'Industrial Automation',
        'Mechatronics Trainers',
        'Electrical Installation',
        'Renewable Energy Labs',
      ],
      cta: 'Explore',
    },
    {
      slug: 'resources', accent: 'orange',
      title: 'Learning Resources', age: 'All Levels',
      icon: 'library_books', iconColor: '#d97706', iconBg: '#fff7ed',
      image: '/images/esic-learn.jpeg',
      items: [
        'Experiment Manuals',
        'Student Workbooks',
        'Teacher Guides',
        'Video Lessons & Quizzes',
      ],
      cta: 'Explore',
    },
    {
      slug: 'learn-portal', accent: 'indigo',
      title: 'ESIC Learn Portal', age: 'Online Platform',
      icon: 'laptop_chromebook', iconColor: '#4f46e5', iconBg: '#eef2ff',
      image: '/images/esic-learn-portal.jpeg',
      items: [
        'Interactive Lessons',
        'Assessments & Quizzes',
        'Progress Tracking',
        'Certificates',
      ],
      cta: 'Login Now',
    },
  ];

  stats = [
    { value: '61+',   label: 'Experiments Available', icon: 'science'          },
    { value: '1000+', label: 'Students Reached',      icon: 'school'           },
    { value: '50+',   label: 'Schools Supported',     icon: 'account_balance'  },
    { value: '10+',   label: 'Learning Systems',      icon: 'settings'         },
  ];

  /* ── Lifecycle ── */

  ngOnInit() {
    this.api.get<any[]>('/events/featured')
      .subscribe({ next: d => this.events.set(d),   error: () => {} });
    this.api.get<any[]>('/projects/featured')
      .subscribe({ next: d => this.projects.set(d), error: () => {} });
    this.api.get<any[]>('/partners')
      .subscribe({ next: d => this.partners.set(d), error: () => {} });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.getAttribute('data-index') ?? '0', 10);
            setTimeout(() => el.classList.add('visible'), idx * 100);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    this.cards.forEach(c => observer.observe(c.nativeElement));
  }

  /* ── Helpers ── */

  eventStripe(type: string): string {
    const map: Record<string, string> = {
      WORKSHOP:    'bg-blue-500',
      COMPETITION: 'bg-yellow-500',
      BOOTCAMP:    'bg-purple-500',
      WEBINAR:     'bg-green-500',
      OUTREACH:    'bg-orange-500',
      OTHER:       'bg-gray-400',
    };
    return map[type] ?? 'bg-gray-400';
  }

  eventBadge(type: string): string {
    const map: Record<string, string> = {
      WORKSHOP:    'bg-blue-100 text-blue-700',
      COMPETITION: 'bg-yellow-100 text-yellow-700',
      BOOTCAMP:    'bg-purple-100 text-purple-700',
      WEBINAR:     'bg-green-100 text-green-700',
      OUTREACH:    'bg-orange-100 text-orange-700',
      OTHER:       'bg-gray-100 text-gray-700',
    };
    return map[type] ?? 'bg-gray-100 text-gray-700';
  }
}