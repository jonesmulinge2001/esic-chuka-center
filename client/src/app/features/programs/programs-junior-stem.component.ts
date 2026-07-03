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
  selector: 'app-lab-trainers',
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
      .bg-kit-gradient {
        background: linear-gradient(135deg, rgba(250, 204, 21, 0.08), rgba(37, 99, 235, 0.08));
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
      .bg-scan-gradient {
        background: linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.4), transparent);
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
    <section class="bg-hero-gradient min-h-[560px] relative overflow-hidden flex items-center py-12 lg:py-16">
      <!-- Background decorations -->
      <div class="absolute inset-0 bg-grid-overlay animate-grid-fade"></div>
      <div class="absolute left-0 right-0 h-[2px] bg-scan-gradient animate-scan-line pointer-events-none"></div>
      <div class="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none bg-yellow-400/8 -top-24 right-[10%]"></div>
      <div class="absolute w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none bg-blue-600/10 -bottom-20 left-[5%]"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <!-- Left -->
          <div>
            <h1 class="text-[clamp(36px,5.2vw,60px)] font-black text-white leading-[1.05] mb-4 tracking-[-0.02em]">
              Engineering<br />Laboratory<br />
              <span class="bg-heading-accent animate-shimmer">Trainers.</span>
            </h1>
            <p class="text-white/75 text-[15px] leading-relaxed mb-7 max-w-[480px]">
              Designed for TVETs and Universities — industry-grade trainers covering electronics,
              automation, control systems, embedded technology, and power engineering.
            </p>
            <div class="flex gap-3 flex-wrap mb-8">
              <a routerLink="/programs" class="inline-flex items-center gap-2 bg-yellow-400 text-[#1a1a2e] font-extrabold text-[13px] px-6 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(250,204,21,0.35)] animate-hero-pulse transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_28px_rgba(250,204,21,0.5)] tracking-[0.02em]">
                <span class="material-icons text-base">precision_manufacturing</span>
                Explore Trainers
              </a>
              <a routerLink="/contact" class="inline-flex items-center gap-2 bg-white/6 text-white/90 font-bold text-[13px] px-6 py-3.5 rounded-full no-underline border-2 border-white/30 transition-all duration-200 hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5">
                <span class="material-icons text-base">handshake</span>
                Partner With Us
              </a>
            </div>
            <div class="grid grid-cols-2 auto-cols-max gap-3 gap-x-6">
              <div class="flex flex-col">
                <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">12+</span>
                <span class="text-[11px] text-white/45 font-medium mt-0.5">Trainer Systems</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">50+</span>
                <span class="text-[11px] text-white/45 font-medium mt-0.5">Schools Supported</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">6+</span>
                <span class="text-[11px] text-white/45 font-medium mt-0.5">Engineering Disciplines</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[22px] font-black text-white tracking-[-0.02em] leading-none">100%</span>
                <span class="text-[11px] text-white/45 font-medium mt-0.5">Curriculum-Aligned</span>
              </div>
            </div>
          </div>
          
          <!-- Right visual -->
          <div class="relative flex justify-center items-center hidden lg:flex">
            <div class="relative">
              <div class="absolute top-[-10px] left-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float1">
                <span class="material-icons text-xl">developer_board</span>
              </div>
              <div class="absolute top-[-10px] right-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float2">
                <span class="material-icons text-xl">precision_manufacturing</span>
              </div>
              <div class="absolute bottom-[-10px] left-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float3">
                <span class="material-icons text-xl">memory</span>
              </div>
              <div class="absolute bottom-[-10px] right-0 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float1-alt">
                <span class="material-icons text-xl">bolt</span>
              </div>
              <div class="absolute top-1/2 left-[-26px] -translate-y-1/2 w-[46px] h-[46px] rounded-xl bg-white/4 border border-yellow-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-yellow-400 backdrop-blur-sm animate-float2-alt">
                <span class="material-icons text-xl">solar_power</span>
              </div>
              <div class="bg-white/3 border border-yellow-400/25 rounded-3xl p-5 backdrop-blur-xl max-w-[340px] w-full animate-border-glow">
                <div class="bg-kit-gradient rounded-2xl h-[200px] flex items-center justify-center mb-3.5 overflow-hidden relative">
                  <img
                    src="/images/esic-lab.jpeg"
                    alt="Engineering Laboratory Trainers"
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
                  BUILT FOR TVETs &amp; UNIVERSITIES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ WHY IT MATTERS ══ -->
    <section class="py-16 lg:py-18">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-green-100 text-green-800 mb-2.5">Why It Matters</span>
          <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Engineering Concepts, Made Practical</h2>
          <p class="text-[#64748b] text-[14px] leading-relaxed mx-auto max-w-lg">Real trainer hardware that bridges classroom theory and industrial practice</p>
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

    <!-- ══ TRAINER CATALOG ══ -->
    <section id="trainers" class="bg-[#f8faff] py-16 lg:py-18">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10">
          <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 mb-2.5">Examples</span>
          <h2 class="text-[clamp(22px,3.5vw,38px)] font-black text-black mb-2 tracking-[-0.02em]">Engineering Laboratory Trainers</h2>
          <p class="text-[#64748b] text-[14px] leading-relaxed mx-auto max-w-lg">A full catalog of laboratory-grade trainer systems for technical and engineering education</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (trainer of trainers; track trainer.name; let i = $index) {
            <div class="bg-white rounded-2xl p-[22px] border border-[#e8edf8] opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,30,92,0.1)] card-hover" #trainerRef [attr.data-index]="i">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" [style.background]="trainer.iconBg">
                  <span class="material-icons" [style.color]="trainer.iconColor">{{ trainer.icon }}</span>
                </div>
                <div class="text-[14px] font-extrabold text-[#001e5c]">{{ trainer.name }}</div>
              </div>
              <div class="text-[12px] text-[#64748b] leading-relaxed">{{ trainer.desc }}</div>
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
            <div class="border border-[#e8edf8] rounded-xl overflow-hidden transition-colors duration-200 bg-white" [style.border-color]="openFaq === i ? '#bfdbfe' : '#e8edf8'">
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
        <span class="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3.5 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/15 text-yellow-200 mb-4">Ready to equip your lab?</span>
        <h2 class="text-[clamp(26px,4vw,46px)] font-black text-white leading-[1.05] mb-3 tracking-[-0.02em] relative z-10">Equip Your Lab With<br />Industry-Grade Trainers</h2>
        <p class="text-white/70 text-[14px] leading-relaxed mb-7 relative z-10">From digital electronics to smart grid systems — give your students hands-on training on equipment built for the real world.</p>
        <div class="flex justify-center gap-3.5 flex-wrap relative z-10">
          <a routerLink="/programs" class="inline-flex items-center gap-2 bg-yellow-400 text-[#1a1a2e] font-extrabold text-[14px] px-9 py-3.5 rounded-full no-underline shadow-[0_4px_20px_rgba(250,204,21,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(250,204,21,0.5)] tracking-[0.02em]">
            <span class="material-icons text-base">precision_manufacturing</span>
            Explore All Trainers
          </a>
          <a routerLink="/contact" class="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold text-[14px] px-9 py-3.5 rounded-full no-underline transition-all duration-200 hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5">
            <span class="material-icons text-base">contact_mail</span>
            Contact Us
          </a>
        </div>
        <div class="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/15 relative z-10">
          <div class="flex items-center gap-2 text-white/70 text-[12px]">
            <span class="material-icons text-yellow-300 text-sm">verified</span>
            Industry-Grade Hardware
          </div>
          <div class="flex items-center gap-2 text-white/70 text-[12px]">
            <span class="material-icons text-yellow-300 text-sm">menu_book</span>
            Full Lab Manuals
          </div>
          <div class="flex items-center gap-2 text-white/70 text-[12px]">
            <span class="material-icons text-yellow-300 text-sm">build</span>
            Installation &amp; Support
          </div>
          <div class="flex items-center gap-2 text-white/70 text-[12px]">
            <span class="material-icons text-yellow-300 text-sm">school</span>
            Curriculum-Aligned
          </div>
        </div>
      </div>
    </section>
  `,
})
export class JuniorStemComponent implements OnInit, AfterViewInit {
  @ViewChildren('whyRef') whyEls!: QueryList<ElementRef>;
  @ViewChildren('trainerRef') trainerEls!: QueryList<ElementRef>;

  heroImgError = false;
  openFaq = 0;

  whyCards = [
    {
      title: 'Electronics & Circuits',
      icon: 'memory',
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      desc: 'Master digital and analog fundamentals on real circuit-level trainer hardware.',
    },
    {
      title: 'Automation & Control',
      icon: 'precision_manufacturing',
      iconColor: '#16a34a',
      iconBg: '#f0fdf4',
      desc: 'Work with PLCs and control systems used across modern industrial plants.',
    },
    {
      title: 'Embedded & Computing',
      icon: 'developer_board',
      iconColor: '#ea580c',
      iconBg: '#fff7ed',
      desc: 'Program microprocessors and embedded systems that drive smart devices.',
    },
    {
      title: 'Power & Renewable Energy',
      icon: 'solar_power',
      iconColor: '#7c3aed',
      iconBg: '#faf5ff',
      desc: 'Study electrical machines, power electronics, and renewable energy systems.',
    },
  ];

  trainers = [
    {
      name: 'Digital Electronics Trainer',
      icon: 'memory',
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      desc: 'Study logic gates, flip-flops, counters, and digital circuit design on a dedicated trainer board.',
    },
    {
      name: 'Analog Electronics Trainer',
      icon: 'graphic_eq',
      iconColor: '#16a34a',
      iconBg: '#f0fdf4',
      desc: 'Explore amplifiers, oscillators, and analog signal behaviour through guided experiments.',
    },
    {
      name: 'PLC Training System',
      icon: 'developer_board',
      iconColor: '#ea580c',
      iconBg: '#fff7ed',
      desc: 'Program and troubleshoot industrial PLCs using ladder logic on real controller hardware.',
    },
    {
      name: 'Industrial Automation Trainer',
      icon: 'precision_manufacturing',
      iconColor: '#7c3aed',
      iconBg: '#faf5ff',
      desc: 'Simulate factory automation processes — sensors, actuators, and conveyor logic combined.',
    },
    {
      name: 'Control Systems Trainer',
      icon: 'tune',
      iconColor: '#0e7490',
      iconBg: '#cffafe',
      desc: 'Model open- and closed-loop control systems and study feedback and stability concepts.',
    },
    {
      name: 'Embedded Systems Trainer',
      icon: 'code',
      iconColor: '#be123c',
      iconBg: '#ffe4e6',
      desc: 'Develop and debug firmware on microcontroller-based embedded hardware platforms.',
    },
    {
      name: 'Microprocessor Trainer',
      icon: 'dns',
      iconColor: '#2563eb',
      iconBg: '#eff6ff',
      desc: 'Learn instruction sets, memory interfacing, and I/O operations on classic microprocessor kits.',
    },
    {
      name: 'Mechatronics Trainer',
      icon: 'engineering',
      iconColor: '#16a34a',
      iconBg: '#f0fdf4',
      desc: 'Integrate mechanical, electrical, and software systems in one multidisciplinary trainer.',
    },
    {
      name: 'Electrical Machines Trainer',
      icon: 'electrical_services',
      iconColor: '#ea580c',
      iconBg: '#fff7ed',
      desc: 'Test motors, generators, and transformers to understand electromechanical energy conversion.',
    },
    {
      name: 'Power Electronics Trainer',
      icon: 'bolt',
      iconColor: '#7c3aed',
      iconBg: '#faf5ff',
      desc: 'Study rectifiers, inverters, and converters used in modern power conversion systems.',
    },
    {
      name: 'Renewable Energy Laboratory',
      icon: 'solar_power',
      iconColor: '#0e7490',
      iconBg: '#cffafe',
      desc: 'Design and test solar, wind, and hybrid energy systems in a dedicated lab setup.',
    },
    {
      name: 'Smart Grid Trainer',
      icon: 'hub',
      iconColor: '#be123c',
      iconBg: '#ffe4e6',
      desc: 'Explore smart metering, grid monitoring, and distributed energy management concepts.',
    },
  ];

  faqs = [
    {
      q: 'Which institutions are these trainers designed for?',
      a: 'Our engineering laboratory trainers are built for TVET institutions, polytechnics, and universities running electrical, electronics, mechatronics, and industrial engineering programmes.',
    },
    {
      q: 'Do trainers come with lab manuals and courseware?',
      a: 'Yes — every trainer ships with structured experiment manuals and lab guides aligned to standard engineering curricula, so lecturers can integrate them directly into coursework.',
    },
    {
      q: 'Is installation and technical support included?',
      a: 'Yes — ESIC provides installation, commissioning, and after-sales technical support to ensure your lab equipment stays fully operational.',
    },
    {
      q: 'Can trainers be customized to a specific curriculum?',
      a: 'Absolutely. We work with institutions to tailor trainer specifications and experiment sets to match their specific engineering programme requirements.',
    },
    {
      q: 'Do you train lecturers and lab technicians on the equipment?',
      a: 'Yes — we provide staff orientation sessions so lecturers and lab technicians can confidently operate and maintain each trainer system.',
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
    observe(this.trainerEls, 60);
  }
}