import {
  Component, OnInit, signal, inject,
  AfterViewInit, ElementRef, ViewChildren, QueryList
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  styles: [`
    /* ── Keyframes ── */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scrollDot {
      0%,100% { transform: translateY(0); opacity: 1; }
      50%     { transform: translateY(8px); opacity: .3; }
    }
    @keyframes shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes orbFloat {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-14px); }
    }
    @keyframes heroPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(251, 208, 29, .3); }
      50%     { box-shadow: 0 0 0 12px rgba(251, 208, 29, 0); }
    }
    @keyframes objPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.25); }
      50%     { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
    }
    @keyframes dotBounce {
      0%,100% { opacity: 1; transform: scale(1); }
      50%     { opacity: .5; transform: scale(1.4); }
    }
    @keyframes float1 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(3deg); }
    }
    @keyframes float2 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-2deg); }
    }
    @keyframes rotateSlow {
      to { transform: rotate(360deg); }
    }

    /* ── Scroll-reveal base states ── */
    .reveal-left {
      opacity: 0;
      transform: translateX(-60px) scale(.97);
      transition: opacity .75s cubic-bezier(.22,1,.36,1),
                  transform .75s cubic-bezier(.22,1,.36,1);
    }
    .reveal-right {
      opacity: 0;
      transform: translateX(60px) scale(.97);
      transition: opacity .75s cubic-bezier(.22,1,.36,1),
                  transform .75s cubic-bezier(.22,1,.36,1);
    }
    .reveal-up {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity .65s ease .1s, transform .65s ease .1s;
    }
    .reveal-up-child {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity .55s ease, transform .55s ease;
    }
    .reveal-left.in,
    .reveal-right.in,
    .reveal-up.in,
    .reveal-up-child.in { opacity: 1; transform: translate(0) scale(1); }

    /* ── Hero ── */
    .hero-section {
      position: relative;
      min-height: 86vh;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #001a5e 0%, #012a8a 50%, #094ed3 100%);
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,
        rgba(0,20,80,.92) 0%,
        rgba(0,46,138,.82) 50%,
        rgba(8,24,72,.88) 100%);
    }
    .hero-orb {
      position: absolute; border-radius: 50%;
      filter: blur(90px); pointer-events: none;
    }
    .orb-gold {
      width: 380px; height: 380px;
      background: rgba(251, 208, 29, .09);
      top: -80px; right: 6%;
      animation: orbFloat 5s ease-in-out infinite;
    }
    .orb-teal {
      width: 260px; height: 260px;
      background: rgba(16,185,129,.07);
      bottom: -60px; left: 4%;
      animation: orbFloat 6.5s ease-in-out infinite 1.2s;
    }
    .hero-content {
      position: relative; z-index: 2;
      max-width: 820px; text-align: center;
      padding: 64px 24px;
      animation: fadeInUp .9s cubic-bezier(.22,1,.36,1) both;
    }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 18px;
      background: rgba(255,255,255,.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 30px;
      color: #fff; font-size: 11px; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase;
      margin-bottom: 22px;
    }
    .eyebrow-dot {
      width: 6px; height: 6px; background: #fbd01d; border-radius: 50%;
      animation: dotBounce 1.6s ease-in-out infinite;
    }
    .hero-heading {
      font-size: clamp(44px, 7.5vw, 82px);
      font-weight: 900; color: #fff;
      line-height: 1; margin-bottom: 18px;
      letter-spacing: -.02em;
    }
    .heading-gold {
      background: linear-gradient(90deg, #fbd01d, #fdd835, #fbd01d);
      background-size: 200%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .hero-sub {
      color: rgba(255,255,255,.75);
      font-size: clamp(14px, 1.8vw, 18px);
      line-height: 1.7; margin-bottom: 32px;
    }
    .hero-btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; }
    .btn-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: #fbd01d; color: #001a5e;
      font-weight: 800; font-size: 13px;
      padding: 13px 28px; border-radius: 30px;
      border: none; cursor: pointer;
      box-shadow: 0 6px 20px rgba(251, 208, 29, .3);
      animation: heroPulse 2.5s ease-in-out infinite;
      transition: transform .2s, box-shadow .2s;
    }
    .btn-white:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 30px rgba(251, 208, 29, .4); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,.1); color: #fff;
      font-weight: 700; font-size: 13px;
      padding: 13px 28px; border-radius: 30px;
      border: 1.5px solid rgba(255,255,255,.3);
      cursor: pointer; backdrop-filter: blur(8px);
      transition: background .2s, transform .2s;
    }
    .btn-ghost:hover { background: rgba(255,255,255,.18); transform: translateY(-2px); }
    .hero-stats {
      display: flex; justify-content: center; flex-wrap: wrap; gap: 36px;
      border-top: 1px solid rgba(255,255,255,.12); padding-top: 28px;
    }
    .hero-stat-val { font-size: 28px; font-weight: 900; color: #fff; }
    .hero-stat-lbl { font-size: 11px; color: rgba(255,255,255,.6); margin-top: 2px; }
    .scroll-indicator {
      position: absolute; bottom: 28px; left: 50%;
      transform: translateX(-50%); z-index: 3;
    }
    .scroll-outer {
      width: 24px; height: 40px;
      border: 2px solid rgba(255,255,255,.35); border-radius: 12px;
      display: flex; justify-content: center; padding-top: 6px;
    }
    .scroll-inner {
      width: 4px; height: 10px;
      background: rgba(255,255,255,.5); border-radius: 2px;
      animation: scrollDot 2s ease-in-out infinite;
    }

    /* ── Who We Are ── */
    .expertise-chip {
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s, border-color .25s, background .25s;
    }
    .expertise-chip:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0,30,92,.10);
      border-color: #fbd01d;
      background: #fef9c3;
    }

    /* ── Split section (Mission / Vision) ── */
    .split-img {
      position: relative; overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,20,80,.18);
    }
    .split-img img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .8s cubic-bezier(.22,1,.36,1);
      display: block; min-height: 400px;
    }
    .split-img:hover img { transform: scale(1.04); }
    .split-img-badge {
      position: absolute; bottom: 16px; left: 16px;
      background: rgba(0,20,80,.75); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 12px; padding: 10px 14px;
      display: flex; align-items: center; gap: 8px;
    }
    .split-img-badge-icon {
      width: 32px; height: 32px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── Objectives / Values ── */
    .objectives-section {
      position: relative; overflow: hidden;
    }
    .obj-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #001a5e 0%, #012a8a 50%, #094ed3 100%);
    }
    .obj-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,
        rgba(8,14,46,.96) 0%,
        rgba(19,48,128,.92) 50%,
        rgba(46,18,120,.94) 100%);
    }
    .obj-card {
      display: flex; align-items: flex-start; gap: 14px;
      background: rgba(255,255,255,.07);
      backdrop-filter: blur(14px);
      padding: 18px 20px; border-radius: 14px;
      border: 1px solid rgba(255,255,255,.09);
      opacity: 0;
      transition: background .2s, transform .2s, opacity .5s;
    }
    .obj-card.in { opacity: 1; }
    .obj-card:hover { background: rgba(255,255,255,.13); transform: translateY(-2px); }
    .obj-check-wrap {
      flex-shrink: 0; width: 34px; height: 34px;
      background: linear-gradient(135deg, #fbd01d, #f59e0b);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      animation: objPulse 3s ease-in-out infinite;
    }

    /* ── Team card ── */
    .team-card {
      position: relative; background: #fff;
      border-radius: 20px; padding: 28px 20px;
      text-align: center; overflow: hidden;
      border: 1px solid #e8edf7;
      transition: transform .35s cubic-bezier(.34,1.3,.64,1), box-shadow .35s;
    }
    .team-card::before {
      content: ''; position: absolute; inset: -1px;
      border-radius: 20px;
      background: linear-gradient(135deg, #001a5e, #fbd01d, #094ed3);
      opacity: 0; transition: opacity .35s; z-index: 0;
    }
    .team-card::after {
      content: ''; position: absolute; inset: 1px;
      border-radius: 19px; background: #fff; z-index: 0;
    }
    .team-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,30,92,.14); }
    .team-card:hover::before { opacity: 1; }
    .team-card-inner { position: relative; z-index: 1; }
    .avatar-ring {
      position: relative; width: 80px; height: 80px;
      border-radius: 50%; margin: 0 auto 16px;
    }
    .avatar-ring::before {
      content: ''; position: absolute; inset: -3px; border-radius: 50%;
      background: linear-gradient(135deg, #001a5e, #fbd01d, #094ed3);
      opacity: .55; transition: opacity .35s;
    }
    .team-card:hover .avatar-ring::before { opacity: 1; }
    .avatar-inner {
      position: absolute; inset: 0; border-radius: 50%;
      background: #eef2ff; overflow: hidden; border: 2px solid #fff;
      display: flex; align-items: center; justify-content: center;
    }
    .member-btn {
      width: 30px; height: 30px; border-radius: 50%;
      background: #f1f5f9; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s, transform .2s;
    }
    .member-btn:hover { background: #dbeafe; transform: scale(1.1); }

    /* ── CTA section ── */
    .cta-section { position: relative; overflow: hidden; }
    .cta-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #001a5e 0%, #012a8a 50%, #094ed3 100%);
    }
    .cta-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(0,20,80,.92), rgba(0,46,138,.88));
    }
    .cta-eyebrow {
      display: inline-block;
      background: rgba(251, 208, 29, .14); color: #fbd01d;
      border: 1px solid rgba(251, 208, 29, .28);
      font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      padding: 4px 14px; border-radius: 20px; margin-bottom: 14px;
    }

    /* ── ESIC Values Animation ── */
    .value-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }
    .value-item {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      transition: all .3s ease;
    }
    .value-item:hover {
      background: rgba(251, 208, 29, 0.1);
      border-color: #fbd01d;
      transform: translateY(-4px);
    }
    .value-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .divider-gradient {
      height: 4px;
      background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
      width: 80px;
      margin: 1rem auto 0;
      border-radius: 2px;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .hero-stats { gap: 20px; }
      .hero-stat-val { font-size: 22px; }
      .split-img img { min-height: 250px; }
      .value-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
      .reveal-left, .reveal-right, .reveal-up, .reveal-up-child { opacity: 1 !important; transform: none !important; }
    }
  `],
  template: `
    <!-- ══ HERO ══ -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-orb orb-gold"></div>
      <div class="hero-orb orb-teal"></div>

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="eyebrow-dot"></span>
          Chuka University · Tharaka Nithi, Kenya
        </div>
        <h1 class="hero-heading">
          ESIC<br>
          <span class="heading-gold">STEM LAB</span>
        </h1>
        <p class="hero-sub">
          Electronics &amp; Software Innovation Center —<br>
          empowering Africa's next generation of builders, thinkers, and innovators.
        </p>
        <div class="hero-btns">
          <a routerLink="/contact" class="btn-white">
            <span class="material-icons text-base">explore</span>
            Explore Our Center
          </a>
          <a routerLink="/contact" class="btn-ghost">
            <span class="material-icons text-base">location_on</span>
            Visit Us
          </a>
        </div>
        <div class="hero-stats">
          @for (s of stats; track s.label) {
            <div class="text-center">
              <div class="hero-stat-val">{{ s.value }}</div>
              <div class="hero-stat-lbl">{{ s.label }}</div>
            </div>
          }
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-outer"><div class="scroll-inner"></div></div>
      </div>
    </section>

    <!-- ══ WHO WE ARE ══ -->
    <section class="py-20 px-4 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div class="reveal-up" #revealRef>
            <span class="inline-block text-[11px] font-bold tracking-widest uppercase
                         bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full mb-4">
              Who We Are
            </span>
            <h2 class="text-4xl lg:text-5xl font-black text-[#001a5e] leading-tight mb-5">About ESIC</h2>
            <p class="text-slate-600 text-base leading-relaxed mb-4">
              The <strong>Electronics &amp; Software Innovation Center (ESIC)</strong> is a research, design, and
              manufacturing company dedicated to advancing STEM education through innovative
              educational technologies.
            </p>
            <p class="text-slate-600 text-base leading-relaxed mb-4">
              We develop affordable, practical, and curriculum-aligned learning systems that enable
              students to discover science, engineering, technology, and innovation through
              experimentation.
            </p>
            <p class="text-slate-600 text-base leading-relaxed">
              Our interdisciplinary expertise spans <strong>electronics, software engineering, robotics,
              automation, artificial intelligence, renewable energy, embedded systems, and
              engineering education.</strong>
            </p>
          </div>

          <div class="reveal-up" #revealRef>
            <div class="text-[11px] font-bold text-[#94a3b8] tracking-[0.08em] uppercase mb-3">Our Expertise</div>
            <div class="grid grid-cols-2 gap-3">
              @for (area of expertiseAreas; track area.label) {
                <div class="expertise-chip flex items-center gap-2.5 bg-white border border-[#e2e8f7] rounded-xl px-4 py-3">
                  <span class="material-icons text-[#001a5e] text-lg">{{ area.icon }}</span>
                  <span class="text-[13px] font-bold text-[#173b78]">{{ area.label }}</span>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══ MISSION — split layout ══ -->
    <section class="py-20 px-4 lg:px-8" style="background: linear-gradient(to bottom, #f8fafc, #fff)">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-16 reveal-up" #revealRef>
          <span class="inline-block text-[11px] font-bold tracking-widest uppercase
                       bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full mb-3">
            Our Purpose
          </span>
          <h2 class="text-4xl lg:text-5xl font-black text-[#001a5e] leading-tight mb-3">Our Mission</h2>
          <p class="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Empowering the next generation of innovators through quality STEM education
          </p>
          <div class="divider-gradient"></div>
        </div>

        <!-- Three split rows -->
        @for (card of missionCards; track card.title; let i = $index) {
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 last:mb-0"
               [class.lg:flex-row-reverse]="i % 2 === 1">

            <div [class]="i % 2 === 0 ? 'reveal-left' : 'reveal-right'" #revealRef>
              <div class="split-img">
                <img [src]="card.image" [alt]="card.title" class="h-[400px] w-full object-cover">
                <div class="split-img-badge">
                  <div class="split-img-badge-icon" [style.background]="card.badgeIconBg">
                    <span class="material-icons text-sm" [style.color]="card.badgeIconColor">
                      {{ card.badgeIcon }}
                    </span>
                  </div>
                  <div>
                    <div class="text-[10px] font-bold text-white/60 uppercase tracking-wide">{{ card.tag }}</div>
                    <div class="text-[12px] font-bold text-white">{{ card.title }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div [class]="i % 2 === 1 ? 'lg:order-first' : ''">
              <div class="reveal-up" #revealRef>
                <div class="inline-block text-[10px] font-bold tracking-widest uppercase
                            px-3 py-1 rounded-full mb-4"
                     [style.background]="card.eyebrowBg"
                     [style.color]="card.eyebrowColor">
                  {{ card.tag }}
                </div>
                <h3 class="text-3xl font-black text-[#001a5e] mb-4 leading-tight">{{ card.title }}</h3>
                <p class="text-slate-600 text-base leading-relaxed mb-5">{{ card.body }}</p>
                <ul class="space-y-2.5">
                  @for (pt of card.points; track pt) {
                    <li class="flex items-start gap-3 text-[14px] text-slate-600 reveal-up-child" #revealRef>
                      <span class="material-icons text-sm mt-0.5 flex-shrink-0"
                            [style.color]="card.eyebrowColor">check_circle</span>
                      {{ pt }}
                    </li>
                  }
                </ul>
              </div>
            </div>

          </div>
        }

        <div class="reveal-up mt-4" #revealRef>
          <div class="bg-white rounded-2xl border border-blue-100 p-8 lg:p-10
                      shadow-[0_4px_24px_rgba(0,30,92,.06)]">
            <p class="text-slate-700 text-base lg:text-lg leading-relaxed">
              To accelerate experiential STEM learning by designing innovative educational equipment,
              digital learning resources, and engineering solutions that make science and technology
              accessible to every learner. Through our <span class="text-[#001a5e] font-bold">ESIC</span>,
              we bridge the gap between theoretical knowledge and practical application — one experiment,
              one project, one builder at a time.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ══ VISION ══ -->
    <section class="py-20 px-4 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-16 reveal-up" #revealRef>
          <span class="inline-block text-[11px] font-bold tracking-widest uppercase
                       bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full mb-3">
            Future Forward
          </span>
          <h2 class="text-4xl lg:text-5xl font-black text-[#001a5e] leading-tight mb-3">Our Vision</h2>
          <p class="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Building a future where African innovation leads the world
          </p>
          <div class="divider-gradient"></div>
        </div>

        @for (card of visionCards; track card.title; let i = $index) {
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 last:mb-0">

            <div [class]="i % 2 === 0 ? 'lg:order-last reveal-right' : 'reveal-left'" #revealRef>
              <div class="split-img">
                <img [src]="card.image" [alt]="card.title" class="h-[400px] w-full object-cover">
                <div class="split-img-badge">
                  <div class="split-img-badge-icon" [style.background]="card.badgeIconBg">
                    <span class="material-icons text-sm" [style.color]="card.badgeIconColor">
                      {{ card.badgeIcon }}
                    </span>
                  </div>
                  <div>
                    <div class="text-[10px] font-bold text-white/60 uppercase tracking-wide">{{ card.tag }}</div>
                    <div class="text-[12px] font-bold text-white">{{ card.title }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div [class]="i % 2 === 0 ? '' : 'lg:order-last'">
              <div class="reveal-up" #revealRef>
                <div class="inline-block text-[10px] font-bold tracking-widest uppercase
                            px-3 py-1 rounded-full mb-4"
                     [style.background]="card.eyebrowBg"
                     [style.color]="card.eyebrowColor">
                  {{ card.tag }}
                </div>
                <h3 class="text-3xl font-black text-[#001a5e] mb-4 leading-tight">{{ card.title }}</h3>
                <p class="text-slate-600 text-base leading-relaxed mb-5">{{ card.body }}</p>
                <ul class="space-y-2.5">
                  @for (pt of card.points; track pt) {
                    <li class="flex items-start gap-3 text-[14px] text-slate-600 reveal-up-child" #revealRef>
                      <span class="material-icons text-sm mt-0.5 flex-shrink-0"
                            [style.color]="card.eyebrowColor">check_circle</span>
                      {{ pt }}
                    </li>
                  }
                </ul>
              </div>
            </div>

          </div>
        }

        <div class="reveal-up mt-4" #revealRef>
          <div class="bg-slate-50 rounded-2xl border border-blue-100 p-8 lg:p-10
                      shadow-[0_4px_24px_rgba(0,30,92,.05)]">
            <p class="text-slate-700 text-base lg:text-lg leading-relaxed">
              To become <strong>Africa's leading developer of innovative STEM learning technologies</strong> that
              inspire the next generation of scientists, engineers, inventors, and entrepreneurs. Our
              <span class="text-[#001a5e] font-bold">ESIC</span> serves as a hub for cutting-edge research
              and technological advancement that positions Kenya at the forefront of African innovation.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ══ CORE VALUES ══ -->
    <section class="objectives-section py-20">
      <div class="obj-bg"></div>
      <div class="obj-overlay"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4">

        <div class="text-center mb-12 reveal-up" #revealRef>
          <span class="inline-block text-[11px] font-bold tracking-widest uppercase
                       bg-[#fbd01d]/20 text-[#fbd01d] px-4 py-1.5 rounded-full mb-3 border border-[#fbd01d]/25">
            What Drives Us
          </span>
          <h2 class="text-3xl lg:text-4xl font-black text-white mb-2">Core Values</h2>
          <p class="text-white/60 text-sm">The principles guiding everything we design, build, and teach</p>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-3.5">
          @for (value of coreValues; track value.label; let i = $index) {
            <div class="obj-card reveal-up-child" #revealRef [attr.data-index]="i">
              <div class="obj-check-wrap flex-shrink-0">
                <span class="material-icons text-white text-base">{{ value.icon }}</span>
              </div>
              <span class="text-white/85 text-[13px] font-bold leading-relaxed">{{ value.label }}</span>
            </div>
          }
        </div>

      </div>
    </section>

    <!-- ══ TEAM ══ -->
    <section class="py-20 px-4 bg-[#f8faff]">
      <div class="max-w-7xl mx-auto">

        <div class="text-center mb-12 reveal-up" #revealRef>
          <span class="inline-block text-[11px] font-bold tracking-widest uppercase
                       bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full mb-3">
            Meet the Team
          </span>
          <h2 class="text-3xl lg:text-4xl font-black text-[#001a5e] mb-2">Our Team</h2>
          <p class="text-slate-500 text-sm">Passionate innovators driving STEM education forward at Chuka University</p>
        </div>

        @if (team().length > 0) {
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            @for (member of team(); track member.id; let i = $index) {
              <div class="team-card reveal-up-child" #revealRef [attr.data-index]="i">
                <div class="team-card-inner">
                  <div class="avatar-ring">
                    <div class="avatar-inner">
                      @if (member.avatarUrl) {
                        <img [src]="member.avatarUrl" [alt]="member.name"
                             class="w-full h-full rounded-full object-cover">
                      } @else {
                        <span class="material-icons text-[#001a5e] text-4xl">person</span>
                      }
                    </div>
                  </div>
                  <div class="text-[14px] font-black text-[#001a5e] mb-0.5">{{ member.name }}</div>
                  <div class="text-[11px] font-bold text-[#fbd01d] mb-3">{{ member.title }}</div>
                  <p class="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{{ member.bio }}</p>
                  <div class="flex justify-center gap-2">
                    <button class="member-btn" title="Profile">
                      <span class="material-icons text-slate-500 text-sm">link</span>
                    </button>
                    <button class="member-btn" title="Email">
                      <span class="material-icons text-slate-500 text-sm">email</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="reveal-up text-center py-16 bg-white rounded-2xl border border-[#e8edf8]" #revealRef>
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <span class="material-icons text-blue-500 text-4xl">people</span>
            </div>
            <p class="text-slate-400 text-sm">Team information coming soon.</p>
          </div>
        }

      </div>
    </section>

    <!-- ══ ESIC VALUES SECTION ══ -->
    <section class="py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-block text-[11px] font-bold tracking-widest uppercase
                     bg-[#fbd01d]/20 text-[#fbd01d] px-4 py-1.5 rounded-full mb-3 border border-[#fbd01d]/25">
          ESIC Values
        </div>
        <h2 class="text-3xl lg:text-4xl font-black text-white mb-4">What We Stand For</h2>
        <p class="text-white/60 text-sm max-w-2xl mx-auto mb-10">
          Our values guide everything we do — from product design to community engagement
        </p>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          @for (item of esicValues; track item.title) {
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#fbd01d]/50 transition-all duration-300 group">
              <div class="text-4xl mb-3">{{ item.icon }}</div>
              <h3 class="text-white font-bold text-[15px] mb-2 group-hover:text-[#fbd01d] transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-white/50 text-[13px] leading-relaxed">{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ CTA ══ -->
    <section class="cta-section py-24">
      <div class="cta-bg"></div>
      <div class="cta-overlay"></div>
      <div class="relative z-10 max-w-2xl mx-auto px-4 text-center reveal-up" #revealRef>
        <div class="cta-eyebrow">Come See Us</div>
        <h2 class="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">Visit ESIC</h2>
        <p class="text-white/70 text-sm lg:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Experience innovation firsthand at Chuka University's state-of-the-art STEM
          research facility in Tharaka Nithi County.
        </p>
        <div class="flex justify-center flex-wrap gap-3">
          <a routerLink="/contact" class="btn-white">
            <span class="material-icons text-base">calendar_month</span>
            Schedule a visit
          </a>
          <a routerLink="/contact" class="btn-ghost">
            <span class="material-icons text-base">info</span>
            Learn more
          </a>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);

  @ViewChildren('revealRef') revealEls!: QueryList<ElementRef>;

  team = signal<any[]>([]);

  stats = [
    { value: '61+',   label: 'Experiments' },
    { value: '1000+', label: 'Students reached' },
    { value: '50+',   label: 'Schools served' },
    { value: '10+',   label: 'Learning systems' },
  ];

  expertiseAreas = [
    { icon: 'bolt',                 label: 'Electronics'            },
    { icon: 'code',                 label: 'Software Engineering'   },
    { icon: 'smart_toy',            label: 'Robotics'               },
    { icon: 'precision_manufacturing', label: 'Automation'          },
    { icon: 'psychology',           label: 'Artificial Intelligence'},
    { icon: 'solar_power',          label: 'Renewable Energy'       },
    { icon: 'memory',               label: 'Embedded Systems'       },
    { icon: 'school',               label: 'Engineering Education'  },
  ];

  coreValues = [
    { icon: 'lightbulb',            label: 'Innovation'             },
    { icon: 'construction',         label: 'Hands-on Learning'      },
    { icon: 'verified',             label: 'Quality'                },
    { icon: 'accessibility_new',    label: 'Accessibility'          },
    { icon: 'shield',               label: 'Integrity'              },
    { icon: 'groups',               label: 'Collaboration'          },
    { icon: 'eco',                  label: 'Sustainability'         },
    { icon: 'auto_stories',         label: 'Continuous Learning'    },
  ];

  esicValues = [
    {
      icon: '',
      title: 'Excellence in STEM',
      description: 'We strive for excellence in every product, training, and research initiative.'
    },
    {
      icon: '',
      title: 'Collaborative Innovation',
      description: 'We believe in the power of partnerships to drive meaningful change.'
    },
    {
      icon: '',
      title: 'African Solutions',
      description: 'We develop technologies that address Africa\'s unique challenges and opportunities.'
    },
    {
      icon: '',
      title: 'Lifelong Learning',
      description: 'We are committed to continuous improvement and knowledge sharing.'
    },
    {
      icon: '',
      title: 'Research Excellence',
      description: 'We advance STEM education through rigorous research and development.'
    },
    {
      icon: '',
      title: 'Student-Centered',
      description: 'Every innovation we create puts students at the heart of learning.'
    }
  ];

  missionCards = [
    {
      image: '/images/esic-b1.jpeg',
      tag: 'Education',
      title: 'Quality Education',
      body: 'We deliver structured, high-quality STEM education at every level — from curious six-year-olds discovering circuits for the first time to university engineers tackling industrial automation.',
      points: [
        'Age-appropriate curriculum from grade 1 through university',
        'Qualified instructors with both academic and industry experience',
        'Assessment frameworks that measure real competency, not just recall',
      ],
      eyebrowBg: '#dbeafe', eyebrowColor: '#1d4ed8',
      badgeIcon: 'school', badgeIconBg: 'rgba(37,99,235,.2)', badgeIconColor: '#93c5fd',
    },
    {
      image: '/images/esic-b2.jpeg',
      tag: 'Innovation',
      title: 'Innovation Culture',
      body: 'We don\'t just teach STEM — we build a mindset. Students learn to see problems as opportunities, collaborate across disciplines, and ship ideas that solve real community challenges.',
      points: [
        'Project-based learning culminating in annual innovation showcases',
        'Mentorship from Chuka University faculty and industry partners',
        'Student startup incubation support and prototyping resources',
      ],
      eyebrowBg: '#d1fae5', eyebrowColor: '#047857',
      badgeIcon: 'lightbulb', badgeIconBg: 'rgba(16,185,129,.2)', badgeIconColor: '#6ee7b7',
    },
    {
      image: '/images/esic-b3.jpeg',
      tag: 'Community',
      title: 'Community Impact',
      body: 'ESIC extends beyond the campus. Through school outreach, county government partnerships, and community STEM days, we are making innovation accessible across Tharaka Nithi and beyond.',
      points: [
        'County-wide school outreach programs reaching underserved areas',
        'Free holiday STEM camps for children aged 6–16',
        'Partnership with local Saccos and businesses to fund scholarships',
      ],
      eyebrowBg: '#ede9fe', eyebrowColor: '#5b21b6',
      badgeIcon: 'groups', badgeIconBg: 'rgba(79,70,229,.2)', badgeIconColor: '#c4b5fd',
    },
  ];

  visionCards = [
    {
      image: '/images/esic-b4.jpeg',
      tag: 'Engineering',
      title: 'World-Class Engineers',
      body: 'We are building graduates who are not just job-ready but world-ready — engineers who can compete globally while solving problems that matter most to Africa.',
      points: [
        'Curriculum benchmarked against global engineering standards',
        'Industry internship pipelines with Kenyan tech companies',
        'International exchange opportunities with partner institutions',
      ],
      eyebrowBg: '#d1fae5', eyebrowColor: '#047857',
      badgeIcon: 'engineering', badgeIconBg: 'rgba(16,185,129,.2)', badgeIconColor: '#6ee7b7',
    },
    {
      image: '/images/esic-b33.jpeg',
      tag: 'Research',
      title: 'Research Excellence',
      body: 'ESIC is becoming a recognised research hub in the Mount Kenya region — producing peer-reviewed work, filing patents, and attracting grant funding that elevates Chuka University\'s national standing.',
      points: [
        'Active research groups in IoT, renewable energy, and AI',
        'Collaboration with Kenyan government agencies on applied research',
        'Annual research symposium open to students and faculty',
      ],
      eyebrowBg: '#dbeafe', eyebrowColor: '#1d4ed8',
      badgeIcon: 'biotech', badgeIconBg: 'rgba(37,99,235,.2)', badgeIconColor: '#93c5fd',
    },
    {
      image: '/images/esic-gl.jpeg',
      tag: 'Global Impact',
      title: 'Global Leadership',
      body: 'Africa has the youngest population on earth. ESIC is investing in that advantage — equipping Kenya\'s next generation to lead in technology, not just consume it.',
      points: [
        'Representation at international STEM conferences and competitions',
        'Digital platform for ESIC alumni and global collaborators',
        'African STEM network partnerships across five countries',
      ],
      eyebrowBg: '#ede9fe', eyebrowColor: '#5b21b6',
      badgeIcon: 'public', badgeIconBg: 'rgba(79,70,229,.2)', badgeIconColor: '#c4b5fd',
    },
  ];

  ngOnInit() {
    this.api.get<any[]>('/team').subscribe({
      next: data => this.team.set(data),
      error: () => this.team.set([]),
    });
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const idx = parseInt(el.getAttribute('data-index') || '0');

        const delay = idx > 0 ? idx * 70 : 0;
        setTimeout(() => el.classList.add('in'), delay);
        observer.unobserve(el);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    });

    this.revealEls.forEach(r => observer.observe(r.nativeElement));
  }
}