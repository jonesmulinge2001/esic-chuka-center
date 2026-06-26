import {
    Component,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChildren,
    QueryList,
  } from '@angular/core';
  import { RouterLink } from '@angular/router';
  
  @Component({
    selector: 'app-junior-stem',
    imports: [RouterLink],
    styles: [
      `
        /* ── Keyframes (can't be done with Tailwind) ── */
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-3deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4); }
          50% { box-shadow: 0 0 0 14px rgba(250, 204, 21, 0); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes gridFade {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(250, 204, 21, 0.3); }
          50% { border-color: rgba(250, 204, 21, 0.7); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes starSpin {
          to { transform: rotate(360deg); }
        }
  
        /* ── Utility classes (where Tailwind falls short) ── */
        .animate-float1 { animation: float1 3.5s ease-in-out infinite 0.3s; }
        .animate-float2 { animation: float2 4s ease-in-out infinite 0.6s; }
        .animate-float3 { animation: float3 3.2s ease-in-out infinite 0.9s; }
        .animate-float1-alt { animation: float1 3.8s ease-in-out infinite 1.2s; }
        .animate-float2-alt { animation: float2 4.2s ease-in-out infinite; }
        .animate-float1-img { animation: float1 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; background-size: 200%; }
        .animate-hero-pulse { animation: heroPulse 2.5s ease-in-out infinite; }
        .animate-dot-pulse { animation: dotPulse 1.5s ease-in-out infinite; }
        .animate-scan-line { animation: scanLine 8s linear infinite; }
        .animate-grid-fade { animation: gridFade 6s ease-in-out infinite; }
        .animate-border-glow { animation: borderGlow 4s ease-in-out infinite; }
        .animate-star-spin { animation: starSpin 6s linear infinite; }
  
        .bg-hero-gradient {
          background: linear-gradient(135deg, #0d1b6e 0%, #1a3fbf 45%, #2563eb 100%);
        }
        .bg-cta-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0ea5e9 100%);
        }
        .bg-roadmap-gradient {
          background: linear-gradient(135deg, #001e5c 0%, #0d2b7a 100%);
        }
        .bg-kit-gradient {
          background: linear-gradient(135deg, rgba(250, 204, 21, 0.08), rgba(37, 99, 235, 0.08));
        }
        .bg-kit-strip-gradient {
          background: linear-gradient(90deg, rgba(250, 204, 21, 0.15), rgba(37, 99, 235, 0.15));
        }
        .bg-heading-accent {
          background: linear-gradient(90deg, #facc15, #fb923c, #facc15);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .bg-grid-overlay {
          background-image: 
            linear-gradient(rgba(250, 204, 21, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 204, 21, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .bg-roadmap-grid {
          background-image: 
            linear-gradient(rgba(250, 204, 21, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 204, 21, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .bg-scan-gradient {
          background: linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.4), transparent);
        }
        .bg-connector-gradient {
          background: linear-gradient(180deg, rgba(250, 204, 21, 0.4), rgba(250, 204, 21, 0.1));
        }
        .bg-level-line {
          background: linear-gradient(180deg, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.05));
        }
  
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(250, 204, 21, 0.3);
        }
  
        .visible {
          opacity: 1 !important;
        }
  
        /* ── Card hover & transition overrides ── */
        .card-hover {
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s, opacity 0.4s;
        }
        .card-hover-visible {
          opacity: 0;
        }
        .card-hover-visible.visible {
          opacity: 1;
        }
  
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `,
    ],
    template: `
      <!-- ══ HERO ══ -->
      <section class="bg-hero-gradient min-h-[600px] relative overflow-hidden flex items-center py-12 lg:py-16">
        <!-- Background decorations -->
        <div class="absolute inset-0 bg-grid-overlay animate-grid-fade"></div>
        <div class="absolute left-0 right-0 h-[2px] bg-scan-gradient animate-scan-line pointer-events-none"></div>
        <div class="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none bg-yellow-400/8 -top-24 right-[10%]"></div>
        <div class="absolute w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none bg-blue-600/10 -bottom-20 left-[5%]"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div class="grid lg:grid-cols-2 gap-10 items-center">
            <!-- Left -->
            <div>
              
              <h1 class="text-[clamp(38px,5.5vw,66px)] font-black text-white leading-[1] mb-4 tracking-[-0.02em]">
                Innovate.<br />Build.<br />
                <span class="bg-heading-accent animate-shimmer">Lead.</span>
              </h1>
              <p class="text-white/75 text-[15px] leading-relaxed mb-7 max-w-[480px]">
                Gain hands-on experience in coding, robotics, electronics, engineering design,
                and emerging technologies — then build real-world projects that matter.
              </p>
              <div class="flex gap-3 flex-wrap mb-8">
                <a routerLink="/auth/register" class="inline-flex items-center gap-2 bg-yellow-400 text-[#1a1a2e] font-extrabold text-[13px] px-6 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(250,204,21,0.35)] animate-hero-pulse transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_28px_rgba(250,204,21,0.5)] tracking-[0.02em]">
                  <span class="material-icons text-base">rocket_launch</span>
                  Join the Program
                </a>
                <a routerLink="/junior-stem#tracks" class="inline-flex items-center gap-2 bg-white/6 text-white/90 font-bold text-[13px] px-6 py-3.5 rounded-full no-underline border-2 border-white/30 transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5">
                  <span class="material-icons text-base">explore</span>
                  Explore Courses
                </a>
              </div>
              <div class="grid grid-cols-2 auto-cols-max gap-3 gap-x-6">
                <div class="flex flex-col">
                  <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">500+</span>
                  <span class="text-[11px] text-white/45 font-medium mt-0.5">Students Trained</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">20+</span>
                  <span class="text-[11px] text-white/45 font-medium mt-0.5">Hands-on Projects</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">10+</span>
                  <span class="text-[11px] text-white/45 font-medium mt-0.5">STEM Disciplines</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">∞</span>
                  <span class="text-[11px] text-white/45 font-medium mt-0.5">Industry Mentors</span>
                </div>
              </div>
            </div>
            
            <!-- Right visual -->
            <div class="relative flex justify-center items-center hidden lg:flex">
              <div class="relative">
                <div class="absolute top-[-10px] left-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float1">
                  <span class="material-icons text-xl">terminal</span>
                </div>
                <div class="absolute top-[-10px] right-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float2">
                  <span class="material-icons text-xl">smart_toy</span>
                </div>
                <div class="absolute bottom-[-10px] left-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float3">
                  <span class="material-icons text-xl">memory</span>
                </div>
                <div class="absolute bottom-[-10px] right-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float1-alt">
                  <span class="material-icons text-xl">psychology</span>
                </div>
                <div class="absolute top-1/2 left-[-26px] -translate-y-1/2 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float2-alt">
                  <span class="material-icons text-xl">wifi</span>
                </div>
                <div class="bg-white/3 border border-yellow-400/25 rounded-3xl p-5 backdrop-blur-xl max-w-[340px] w-full animate-border-glow">
                  <div class="bg-kit-gradient rounded-2xl h-[200px] flex items-center justify-center mb-3.5 overflow-hidden relative">
                    <img
                      src="/images/esic-b4.jpeg"
                      alt="Junior STEM Students"
                      class="max-h-[170px] w-auto object-contain relative z-10 animate-float1-img"
                      (error)="heroImgError = true"
                    />
                    @if (heroImgError) {
                      <span class="material-icons text-[90px] text-yellow-400/30 animate-float1-img">precision_manufacturing</span>
                    }
                    <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent"></div>
                  </div>
                  <div class="bg-gradient-to-r from-[#facc15] to-[#facc15] border border-yellow-400/25 text-black rounded-xl px-3.5 py-2 text-center text-[11px] font-black tracking-[0.06em] flex items-center justify-center gap-1.5">
                    <span class="material-icons text-sm text-black">bolt</span>
                    JUNIOR STEM PROGRAM — AGES 13–17
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- ══ WHY JUNIOR STEM ══ -->
      <section class=" py-16 lg:py-18">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-green-100 text-green-800 mb-2.5">Why It Matters</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Develop Skills for the Future</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-lg">Not just theory — real, transferable skills that employers and universities look for</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (card of whyCards; track card.title; let i = $index) {
              <div class="bg-white rounded-2xl p-6 border border-[#e8edf8] text-center opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,30,92,0.1)] hover:border-[#b4ccf7] card-hover" #whyRef [attr.data-index]="i">
                <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-8" [style.background]="card.iconBg">
                  <span class="material-icons text-[30px]" [style.color]="card.iconColor">{{ card.icon }}</span>
                </div>
                <div class="text-[14px] font-extrabold text-[#001e5c] mb-1.5 flex items-center justify-center gap-1.5">
                  <span class="material-icons text-base" [style.color]="card.iconColor">{{ card.icon }}</span>
                  {{ card.title }}
                </div>
                <div class="text-[12px] text-[#64748b] leading-relaxed">{{ card.desc }}</div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ LEARNING TRACKS ══ -->
      <section id="tracks" class=" py-16 lg:py-18">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 mb-2.5">Program Curriculum</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Choose Your STEM Path</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-lg">Six specialised tracks — pick the one that excites you most or explore them all</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (track of tracks; track track.name; let i = $index) {
              <div class="bg-white rounded-2xl p-[22px] border border-[#e8edf8] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,30,92,0.1)] card-hover" #trackRef [attr.data-index]="i">
                <div class="flex items-center gap-3 mb-3.5">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" [style.background]="track.iconBg">
                    <span class="material-icons" [style.color]="track.iconColor">{{ track.icon }}</span>
                  </div>
                  <div>
                    <div class="text-[14px] font-extrabold text-[#001e5c]">{{ track.name }}</div>
                    <span class="text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm mt-0.5 inline-block" [style.background]="track.tagBg" [style.color]="track.tagColor" [style.borderColor]="track.tagBorder" style="border:1px solid">{{ track.label }}</span>
                  </div>
                </div>
                <div class="flex flex-col gap-1.5">
                  @for (item of track.items; track item) {
                    <div class="flex items-center gap-2 text-[12px] text-[#64748b]">
                      <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" [style.background]="track.iconColor"></div>
                      {{ item }}
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ PROJECT SHOWCASE ══ -->
      <section class=" py-16 lg:py-18">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 mb-2.5">Student Work</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Projects Students Build</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-lg">Real innovation by real students — from concept to working prototype</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (proj of projects; track proj.title; let i = $index) {
              <div class="bg-white rounded-2xl p-[22px] border border-[#e8edf8] opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(0,30,92,0.12)] card-hover" #projRef [attr.data-index]="i">
                <div class="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-5" [style.background]="proj.iconBg">
                  <span class="material-icons" [style.color]="proj.iconColor">{{ proj.icon }}</span>
                </div>
                <div class="text-[14px] font-extrabold text-[#001e5c] mb-1">{{ proj.title }}</div>
                <div class="text-[12px] text-[#64748b] leading-relaxed">{{ proj.desc }}</div>
                <div class="flex flex-wrap gap-1 mt-2.5">
                  @for (tag of proj.tags; track tag) {
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-sm border border-[#e8edf8] text-[#4b5563] bg-[#f8faff]">{{ tag }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ CAREER PATHWAY ══ -->
      <section class="bg-roadmap-gradient py-16 lg:py-18 relative overflow-hidden">
        <div class="absolute inset-0 bg-roadmap-grid pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <div class="text-center mb-0">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-800 mb-2.5">Career Vision</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-white mb-2 tracking-[-0.02em]">Where Can STEM Take You?</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-lg">Every step in your STEM journey opens the next door — here's the full path</p>
          </div>
          <div class="flex flex-col items-center gap-0 max-w-[560px] mx-auto mt-10 px-6 relative z-10">
            @for (step of roadmapSteps; track step.label; let i = $index; let last = $last) {
              <div class="flex items-center gap-4 w-full opacity-0 transition-opacity duration-400" #roadmapRef [attr.data-index]="i">
                <div class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 border-2 border-yellow-400/30 font-black text-[13px] transition-transform duration-300 text-yellow-400 hover:scale-108" [style.background]="step.bg">
                  <span class="material-icons text-lg">{{ step.icon }}</span>
                </div>
                <div class="flex-1">
                  <div class="text-[15px] font-extrabold text-white mb-0.5">{{ step.label }}</div>
                  <div class="text-[12px] text-white/50">{{ step.sub }}</div>
                </div>
              </div>
              @if (!last) {
                <div class="w-[2px] h-8 ml-7 bg-connector-gradient"></div>
              }
            }
          </div>
          <div class="grid grid-cols-2 gap-1.5 mt-4 max-w-[560px] mx-auto px-6 relative z-10">
            @for (career of careers; track career) {
              <div class="flex items-center gap-2 bg-white/3 border border-white/7 rounded-lg px-3.5 py-2.5 text-[12px] font-semibold text-white/65 transition-all duration-200 hover:border-yellow-400/30 hover:bg-yellow-400/6 hover:text-white/85">
                <div class="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></div>
                {{ career }}
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ COMPETITIONS ══ -->
      <section class="py-16 lg:py-18">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 mb-2.5">Competitions & Challenges</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Prove What You've Built</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-lg">Real competition experience that looks great on university applications</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            @for (comp of competitions; track comp.title; let i = $index) {
              <div class="bg-white rounded-2xl p-[22px] border border-[#e8edf8] text-center opacity-0 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(0,30,92,0.12)] card-hover" #compRef [attr.data-index]="i">
                <div class="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-4" [style.background]="comp.iconBg">
                  <span class="material-icons text-[30px]" [style.color]="comp.iconColor">{{ comp.icon }}</span>
                </div>
                <div class="text-[14px] font-extrabold text-[#001e5c] text-center">{{ comp.title }}</div>
                <div class="text-[11px] text-[#64748b] text-center mt-1">{{ comp.desc }}</div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ SKILLS GAINED ══ -->
      <section class=" py-16 lg:py-18">
        <div class="max-w-3xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-green-100 text-green-800 mb-2.5">What You'll Gain</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Skills That Set You Apart</h2>
            <p class="text-white/40 text-[14px] leading-relaxed mx-auto max-w-md">Technical mastery plus the professional edge that makes the difference</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="rounded-2xl p-6 border border-[#bfdbfe] bg-[#eff6ff]">
              <div class="text-[15px] font-extrabold text-[#1d4ed8] mb-4 flex items-center gap-2">
                <span class="material-icons text-lg text-[#2563eb]">terminal</span>
                Technical Skills
              </div>
              @for (skill of technicalSkills; track skill) {
                <div class="flex items-center gap-2.5 py-2 border-b border-[#f1f5f9] text-[13px] text-[#374151] last:border-b-0">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0"></div>
                  {{ skill }}
                </div>
              }
            </div>
            <div class="rounded-2xl p-6 border border-[#d8b4fe] bg-[#faf5ff]">
              <div class="text-[15px] font-extrabold text-[#6d28d9] mb-4 flex items-center gap-2">
                <span class="material-icons text-lg text-[#7c3aed]">psychology</span>
                Professional Skills
              </div>
              @for (skill of professionalSkills; track skill) {
                <div class="flex items-center gap-2.5 py-2 border-b border-[#f1f5f9] text-[13px] text-[#374151] last:border-b-0">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#7c3aed] flex-shrink-0"></div>
                  {{ skill }}
                </div>
              }
            </div>
          </div>
        </div>
      </section>
  
      <!-- ══ SUCCESS STORIES ══ -->
      <section class="bg-[#0d2b7a] py-16 lg:py-18">
        <div class="max-w-5xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 mb-2.5">Student Spotlight</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-white mb-2 tracking-[-0.02em]">Success Stories</h2>
            <p class="text-white/40 text-[14px] leading-relaxed">Real students. Real projects. Real impact.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (story of successStories; track story.name; let i = $index) {
              <div class="bg-white rounded-2xl p-6 border border-[#e8edf8] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,30,92,0.1)] card-hover" #storyRef [attr.data-index]="i">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-16 h-16 rounded-full flex items-center justify-center font-black text-[22px] text-white flex-shrink-0" [style.background]="story.avatarColor">{{ story.initials }}</div>
                  <div>
                    <div class="text-[14px] font-extrabold text-[#001e5c]">{{ story.name }}</div>
                    <div class="text-[11px] text-[#64748b]">{{ story.role }}</div>
                  </div>
                </div>
                <div class="mb-3">
                  <span class="inline-block text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm bg-amber-50 border border-amber-400 text-amber-800"> {{ story.track }}</span>
                </div>
                <p class="text-[13px] text-[#374151] leading-relaxed italic border-l-2 border-yellow-400 pl-3.5">{{ story.quote }}</p>
                <div class="mt-3 flex flex-wrap gap-1">
                  @for (tech of story.techs; track tech) {
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-sm border border-[#e8edf8] text-[#4b5563] bg-[#f8faff]">{{ tech }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ PROGRAM LEVELS ══ -->
      <section class="bg-[#f8faff] py-16 lg:py-18">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-4">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 mb-2.5">Program Structure</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-[#001e5c] mb-2 tracking-[-0.02em]">Three Levels of Mastery</h2>
            <p class="text-[#64748b] text-[14px] leading-relaxed mx-auto max-w-md">Progress at your pace — each level builds on the last</p>
          </div>
          <div class="flex flex-col gap-0 max-w-[680px] mx-auto mt-10 px-6">
            @for (level of levels; track level.name; let i = $index; let last = $last) {
              <div class="flex gap-5 opacity-0 transition-opacity duration-400" #levelRef [attr.data-index]="i">
                <div class="flex flex-col items-center flex-shrink-0">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-[18px] text-white border-2 border-yellow-400/30 flex-shrink-0 z-10" [style.background]="level.bg">{{ i + 1 }}</div>
                  @if (!last) {
                    <div class="w-[2px] flex-1 min-h-[32px] bg-level-line my-1"></div>
                  }
                </div>
                <div class="pb-7 flex-1">
                  <span class="text-[10px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm mb-2 inline-block" [style.background]="level.badgeBg" [style.color]="level.badgeColor" [style.borderColor]="level.badgeBorder" style="border:1px solid">{{ level.badge }}</span>
                  <div class="text-[16px] font-extrabold text-[#001e5c] mb-1">{{ level.name }}</div>
                  <div class="text-[13px] text-[#64748b] leading-relaxed">{{ level.desc }}</div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ FAQ ══ -->
      <section class="bg-[#001e5c] py-16 lg:py-18">
        <div class="max-w-2xl mx-auto px-4">
          <div class="text-center mb-10">
            <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-green-100 text-green-800 mb-2.5">Got Questions?</span>
            <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-white mb-2 tracking-[-0.02em]">Frequently Asked</h2>
          </div>
          <div class="flex flex-col gap-3">
            @for (faq of faqs; track faq.q; let i = $index) {
              <div class="border border-[#e8edf8] rounded-xl overflow-hidden transition-colors duration-200 bg-white" [class.open]="openFaq === i" [style.border-color]="openFaq === i ? '#bfdbfe' : '#e8edf8'">
                <div class="flex items-center justify-between px-5 py-4 cursor-pointer gap-3 transition-colors duration-200 select-none" [style.background]="openFaq === i ? '#eff6ff' : '#fff'" (click)="toggleFaq(i)">
                  <span class="text-[14px] font-bold text-[#001e5c]">{{ faq.q }}</span>
                  <span class="material-icons text-[#2563eb] transition-transform duration-300 flex-shrink-0" [style.transform]="openFaq === i ? 'rotate(180deg)' : 'rotate(0)'">expand_more</span>
                </div>
                <div class="max-h-0 overflow-hidden transition-[max-height,padding] duration-300 ease-in-out" [style.max-height]="openFaq === i ? '160px' : '0'" [style.padding]="openFaq === i ? '0 20px 16px' : '0 20px'">
                  <p class="text-[13px] text-[#475569] leading-relaxed">{{ faq.a }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
  
      <!-- ══ CTA ══ -->
      <section class="bg-cta-gradient py-20 text-center relative overflow-hidden">
        <div class="absolute w-[300px] h-[300px] rounded-full blur-[60px] pointer-events-none bg-yellow-400/10 -top-20 right-[10%]"></div>
        <div class="absolute w-[250px] h-[250px] rounded-full blur-[60px] pointer-events-none bg-white/7 -bottom-14 left-[10%]"></div>
        <div class="max-w-xl mx-auto px-4 relative z-10">
          <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/15 text-yellow-200 mb-4">Ready to start?</span>
          <h2 class="text-[clamp(26px,4vw,46px)] font-black text-white leading-[1.05] mb-3 tracking-[-0.02em] relative z-10">Build Tomorrow's<br />Technology Today</h2>
          <p class="text-white/70 text-[14px] leading-relaxed mb-7 relative z-10">Join a community of young innovators, creators, and problem-solvers at ESIC, Chuka University — and build the future.</p>
          <div class="flex justify-center gap-3.5 flex-wrap relative z-10">
            <a routerLink="/auth/register" class="inline-flex items-center gap-2 bg-yellow-400 text-[#1a1a2e] font-extrabold text-[14px] px-9 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(250,204,21,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(250,204,21,0.5)] tracking-[0.02em]">
              <span class="material-icons text-base">rocket_launch</span>
              Apply Now
            </a>
            <a routerLink="/contact" class="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold text-[14px] px-9 py-3.5 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5">
              <span class="material-icons text-base">contact_mail</span>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    `,
  })
  export class JuniorStemComponent implements OnInit, AfterViewInit {
    @ViewChildren('whyRef') whyEls!: QueryList<ElementRef>;
    @ViewChildren('trackRef') trackEls!: QueryList<ElementRef>;
    @ViewChildren('projRef') projEls!: QueryList<ElementRef>;
    @ViewChildren('roadmapRef') roadmapEls!: QueryList<ElementRef>;
    @ViewChildren('compRef') compEls!: QueryList<ElementRef>;
    @ViewChildren('storyRef') storyEls!: QueryList<ElementRef>;
    @ViewChildren('levelRef') levelEls!: QueryList<ElementRef>;
  
    heroImgError = false;
    openFaq = 0;
  
    whyCards = [
      {
        title: 'Coding & Software',
        icon: 'code',
        iconColor: '#2563eb',
        iconBg: '#eff6ff',
        desc: 'Learn programming fundamentals and create applications that solve real problems.',
      },
      {
        title: 'Robotics & Automation',
        icon: 'smart_toy',
        iconColor: '#16a34a',
        iconBg: '#f0fdf4',
        desc: 'Design and program intelligent systems that interact with the physical world.',
      },
      {
        title: 'Electronics & Embedded',
        icon: 'memory',
        iconColor: '#ea580c',
        iconBg: '#fff7ed',
        desc: 'Build practical electronic projects using Arduino, sensors, and IoT platforms.',
      },
      {
        title: 'Innovation & Entrepreneurship',
        icon: 'rocket_launch',
        iconColor: '#7c3aed',
        iconBg: '#faf5ff',
        desc: 'Turn ideas into real solutions — and learn how to pitch them to the world.',
      },
    ];
  
    tracks = [
      {
        name: 'Software Development',
        icon: 'terminal',
        iconColor: '#2563eb',
        iconBg: '#eff6ff',
        label: 'Beginner → Advanced',
        tagBg: '#dbeafe',
        tagColor: '#1d4ed8',
        tagBorder: '#bfdbfe',
        items: [
          'HTML & CSS',
          'JavaScript & Python',
          'Mobile App Development',
          'Git & Version Control',
        ],
      },
      {
        name: 'Robotics',
        icon: 'smart_toy',
        iconColor: '#16a34a',
        iconBg: '#f0fdf4',
        label: 'Design to Deployment',
        tagBg: '#dcfce7',
        tagColor: '#15803d',
        tagBorder: '#bbf7d0',
        items: [
          'Robot Design & Build',
          'Sensors & Actuators',
          'Automation Logic',
          'Programming Robots',
        ],
      },
      {
        name: 'Electronics',
        icon: 'memory',
        iconColor: '#ea580c',
        iconBg: '#fff7ed',
        label: 'Hardware Fundamentals',
        tagBg: '#ffedd5',
        tagColor: '#c2410c',
        tagBorder: '#fed7aa',
        items: [
          'Circuit Design',
          'Arduino Projects',
          'Raspberry Pi',
          'IoT Fundamentals',
        ],
      },
      {
        name: 'Artificial Intelligence',
        icon: 'psychology',
        iconColor: '#7c3aed',
        iconBg: '#faf5ff',
        label: 'AI & ML Basics',
        tagBg: '#ede9fe',
        tagColor: '#6d28d9',
        tagBorder: '#d8b4fe',
        items: [
          'Machine Learning Basics',
          'AI Tools & APIs',
          'Computer Vision',
          'Smart Systems',
        ],
      },
      {
        name: 'Engineering Design',
        icon: 'architecture',
        iconColor: '#0e7490',
        iconBg: '#cffafe',
        label: 'Concept to Prototype',
        tagBg: '#cffafe',
        tagColor: '#0e7490',
        tagBorder: '#a5f3fc',
        items: [
          'CAD Concepts',
          'Product Design Process',
          'Prototyping',
          'Problem Solving',
        ],
      },
      {
        name: 'Cybersecurity',
        icon: 'shield',
        iconColor: '#be123c',
        iconBg: '#ffe4e6',
        label: 'Digital Defence',
        tagBg: '#ffe4e6',
        tagColor: '#be123c',
        tagBorder: '#fecdd3',
        items: [
          'Internet Safety',
          'Ethical Hacking Concepts',
          'Digital Security',
          'Network Basics',
        ],
      },
    ];
  
    projects = [
      {
        title: 'Smart Home System',
        icon: 'home_iot_device',
        iconColor: '#2563eb',
        iconBg: '#eff6ff',
        desc: 'Control lights and appliances using sensors, automation, and a mobile interface.',
        tags: ['Arduino', 'IoT', 'Mobile App'],
      },
      {
        title: 'Line Following Robot',
        icon: 'smart_toy',
        iconColor: '#16a34a',
        iconBg: '#f0fdf4',
        desc: 'Build an autonomous robot that navigates a track using infrared sensors.',
        tags: ['Robotics', 'Sensors', 'Python'],
      },
      {
        title: 'Portfolio Website',
        icon: 'web',
        iconColor: '#ea580c',
        iconBg: '#fff7ed',
        desc: 'Create a professional online presence to showcase your projects and skills.',
        tags: ['HTML/CSS', 'JavaScript', 'Design'],
      },
      {
        title: 'AI Chat Assistant',
        icon: 'chat',
        iconColor: '#7c3aed',
        iconBg: '#faf5ff',
        desc: 'Build and deploy an AI-powered assistant that understands natural language.',
        tags: ['AI/ML', 'Python', 'APIs'],
      },
      {
        title: 'IoT Weather Station',
        icon: 'cloud',
        iconColor: '#0e7490',
        iconBg: '#cffafe',
        desc: 'Collect and visualise real-time environmental data from multiple sensors.',
        tags: ['Raspberry Pi', 'IoT', 'Data Viz'],
      },
      {
        title: 'Mobile Application',
        icon: 'phone_android',
        iconColor: '#be123c',
        iconBg: '#ffe4e6',
        desc: 'Develop a useful app for an everyday challenge faced by your community.',
        tags: ['Flutter', 'UI/UX', 'Backend'],
      },
    ];
  
    roadmapSteps = [
      {
        label: 'Junior STEM',
        sub: 'Ages 13–17 · ESIC, Chuka University',
        icon: 'school',
        bg: 'rgba(250,204,21,0.08)',
      },
      {
        label: 'Advanced STEM Training',
        sub: 'Specialised tracks & industry projects',
        icon: 'engineering',
        bg: 'rgba(250,204,21,0.12)',
      },
      {
        label: 'University Programs',
        sub: 'CS, Engineering, AI & related degrees',
        icon: 'account_balance',
        bg: 'rgba(250,204,21,0.08)',
      },
      {
        label: 'Career Opportunities',
        sub: 'Top-tier tech roles in Kenya and globally',
        icon: 'work',
        bg: 'rgba(250,204,21,0.12)',
      },
    ];
  
    careers = [
      'Software Engineer',
      'Robotics Engineer',
      'Data Scientist',
      'AI Specialist',
      'Electronics Engineer',
      'Cybersecurity Analyst',
      'Web Developer',
      'Product Designer',
    ];
  
    competitions = [
      {
        title: 'Robotics Competitions',
        desc: 'Battle-test your robot builds',
        icon: 'smart_toy',
        iconColor: '#2563eb',
        iconBg: '#eff6ff',
      },
      {
        title: 'Coding Challenges',
        desc: 'Solve real problems under time pressure',
        icon: 'code',
        iconColor: '#16a34a',
        iconBg: '#f0fdf4',
      },
      {
        title: 'Hackathons',
        desc: '24-hour innovation sprints',
        icon: 'bolt',
        iconColor: '#ea580c',
        iconBg: '#fff7ed',
      },
      {
        title: 'Innovation Fairs',
        desc: 'Pitch your ideas to industry judges',
        icon: 'emoji_events',
        iconColor: '#7c3aed',
        iconBg: '#faf5ff',
      },
      {
        title: 'STEM Olympiads',
        desc: 'National and international recognition',
        icon: 'workspace_premium',
        iconColor: '#0e7490',
        iconBg: '#cffafe',
      },
      {
        title: 'Science Exhibitions',
        desc: 'Showcase research to the public',
        icon: 'science',
        iconColor: '#be123c',
        iconBg: '#ffe4e6',
      },
    ];
  
    technicalSkills = [
      'Programming in Python, JavaScript & more',
      'Robotics design and programming',
      'Electronics & embedded systems',
      'AI & machine learning foundations',
      'Engineering concepts & CAD basics',
    ];
  
    professionalSkills = [
      'Leadership & initiative',
      'Teamwork & collaboration',
      'Communication & presentation',
      'Problem solving & critical thinking',
      'Creativity & project management',
    ];
  
    successStories = [
      {
        name: 'Brian Mwangi',
        initials: 'BM',
        role: 'Age 16 · Software Track',
        avatarColor: '#2563eb',
        track: 'Software Development',
        quote:
          'Built a smart irrigation app that helps smallholder farmers conserve water. Now pitching it at county level.',
        techs: ['Python', 'Raspberry Pi', 'Mobile App'],
      },
      {
        name: 'Amina Wanjiku',
        initials: 'AW',
        role: 'Age 15 · AI Track',
        avatarColor: '#7c3aed',
        track: 'Artificial Intelligence',
        quote:
          'Created a Swahili speech recognition model as my final project. Won the ESIC innovation fair.',
        techs: ['Machine Learning', 'Python', 'AI/NLP'],
      },
      {
        name: 'Kevin Ochieng',
        initials: 'KO',
        role: 'Age 17 · Robotics Track',
        avatarColor: '#16a34a',
        track: 'Robotics',
        quote:
          'My line-following robot placed 2nd nationally. ESIC gave me the confidence to apply for engineering.',
        techs: ['Arduino', 'Sensors', 'C++'],
      },
    ];
  
    levels = [
      {
        name: 'Beginner Level',
        badge: 'Weeks 1–4',
        badgeBg: '#dcfce7',
        badgeColor: '#15803d',
        badgeBorder: '#bbf7d0',
        bg: 'linear-gradient(135deg, #16a34a, #15803d)',
        desc: 'Introduction to STEM foundations. Core concepts, tools, and your first hands-on mini-project. No prior experience needed.',
      },
      {
        name: 'Intermediate Level',
        badge: 'Weeks 5–8',
        badgeBg: '#dbeafe',
        badgeColor: '#1d4ed8',
        badgeBorder: '#bfdbfe',
        bg: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        desc: 'Build practical, working projects. You will integrate skills across disciplines and collaborate in teams.',
      },
      {
        name: 'Advanced Level',
        badge: 'Weeks 9–12',
        badgeBg: '#ede9fe',
        badgeColor: '#6d28d9',
        badgeBorder: '#d8b4fe',
        bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        desc: 'Innovation and real-world problem solving. Final project showcased at ESIC Demo Day with industry mentors.',
      },
    ];
  
    faqs = [
      {
        q: 'Is prior STEM experience required?',
        a: 'No prior experience is needed. We accept students from all backgrounds and begin with foundations before progressing to complex topics. Curiosity and commitment are the only requirements.',
      },
      {
        q: 'What equipment is provided?',
        a: 'ESIC provides all hardware — laptops, Arduino kits, Raspberry Pi units, sensors, robotics components, and more. Students keep their project source code and documentation at the end.',
      },
      {
        q: 'Are projects individual or team-based?',
        a: 'Both. Beginner and intermediate projects may be individual or in pairs. Advanced-level projects are always team-based to simulate real industry collaboration.',
      },
      {
        q: 'How long does the program run?',
        a: 'The standard Junior STEM cohort runs 12 weeks with two sessions per week. Each session is approximately 2 hours. Holiday intensives and weekend workshops are also available.',
      },
      {
        q: 'Are certificates awarded?',
        a: 'Yes. Graduates receive an ESIC Junior STEM Certificate endorsed by Chuka University. Advanced-level students also receive a project portfolio documentation to support university applications.',
      },
    ];
  
    toggleFaq(index: number) {
      this.openFaq = this.openFaq === index ? -1 : index;
    }
  
    ngOnInit() {}
  
    ngAfterViewInit() {
      if (typeof IntersectionObserver === 'undefined') return;
  
      const makeObserver = (delay = 80) =>
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                const idx = parseInt(el.getAttribute('data-index') || '0');
                setTimeout(() => el.classList.add('visible'), idx * delay);
              }
            });
          },
          { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );
  
      const observe = (list: QueryList<ElementRef>, delayMs = 80) => {
        const obs = makeObserver(delayMs);
        list.forEach((r) => obs.observe(r.nativeElement));
      };
  
      observe(this.whyEls, 100);
      observe(this.trackEls, 80);
      observe(this.projEls, 90);
      observe(this.roadmapEls, 120);
      observe(this.compEls, 80);
      observe(this.storyEls, 110);
      observe(this.levelEls, 140);
    }
  }