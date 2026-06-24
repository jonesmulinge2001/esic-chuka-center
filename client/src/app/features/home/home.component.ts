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
    /* ════════════════════════════════════════
       KEYFRAMES
    ════════════════════════════════════════ */
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50%      { transform: translateY(-12px) rotate(2deg); }
    }
    @keyframes orbPulse {
      0%, 100% { transform: scale(1); opacity: .7; }
      50%      { transform: scale(1.15); opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes cardPop {
      from { opacity: 0; transform: translateY(60px) scale(.92); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes rocketFloat {
      0%, 100% { transform: translateY(0) rotate(-30deg); }
      50%      { transform: translateY(-18px) rotate(-30deg); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245,197,24,.35); }
      50%      { box-shadow: 0 0 0 12px rgba(245,197,24,0); }
    }
    @keyframes starSpin { to { transform: rotate(360deg); } }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .6; transform: scale(1.3); }
    }
    @keyframes feFloat {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }

    /* ════════════════════════════════════════
       HERO
    ════════════════════════════════════════ */
    .hero-section {
      background: linear-gradient(135deg, #001e5c 0%, #003399 50%, #0a4fd6 100%);
      min-height: 540px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 40px 0;
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(70px);
      pointer-events: none;
    }
    .orb-1 {
      width: 320px; height: 320px;
      background: rgba(245,197,24,.12);
      top: -80px; right: 8%;
      animation: orbPulse 4s ease-in-out infinite;
    }
    .orb-2 {
      width: 220px; height: 220px;
      background: rgba(10,79,214,.28);
      bottom: -60px; left: 5%;
      animation: orbPulse 5s ease-in-out infinite .8s;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(245,197,24,.15);
      border: 1px solid rgba(245,197,24,.35);
      color: #f5c518;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 20px;
      margin-bottom: 16px;
      animation: slideUp .6s ease .1s both;
    }
    .badge-dot {
      width: 7px; height: 7px;
      background: #f5c518;
      border-radius: 50%;
      animation: dotPulse 1.5s ease-in-out infinite;
    }

    .hero-heading {
      font-size: clamp(36px, 5vw, 60px);
      font-weight: 900;
      color: #fff;
      line-height: 1.05;
      margin-bottom: 16px;
      animation: slideUp .6s ease .2s both;
    }
    .heading-gold {
      background: linear-gradient(90deg, #f5c518, #ffd94d, #f5c518);
      background-size: 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .hero-sub {
      color: #93c5fd;
      font-size: 15px;
      line-height: 1.65;
      margin-bottom: 20px;
      animation: slideUp .6s ease .3s both;
    }
    .hero-tagline {
      color: #f5c518;
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 28px;
      animation: slideUp .6s ease .35s both;
    }
    .hero-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      animation: slideUp .6s ease .4s both;
    }
    .btn-explore {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #f5c518;
      color: #001e5c;
      font-weight: 800;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(245,197,24,.35);
      animation: glow 2.5s ease-in-out infinite;
      transition: transform .2s, box-shadow .2s;
    }
    .btn-explore:hover { transform: translateY(-2px) scale(1.03); }
    .btn-partner {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,.1);
      border: 1.5px solid rgba(255,255,255,.25);
      color: #fff;
      font-weight: 700;
      font-size: 13px;
      padding: 12px 24px;
      border-radius: 12px;
      text-decoration: none;
      transition: transform .2s, background .2s;
    }
    .btn-partner:hover { transform: translateY(-2px); background: rgba(255,255,255,.18); }

    .trust-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 28px;
      animation: slideUp .6s ease .5s both;
    }
    .trust-item { display: flex; align-items: center; gap: 8px; }
    .trust-icon { color: #f5c518; }
    .trust-label { font-weight: 700; color: #fff; font-size: 11px; }
    .trust-sub   { color: #93c5fd; font-size: 10px; }

    /* Hero visual panel */
    .hero-visual { position: relative; animation: slideUp .6s ease .3s both; }
    .hero-kit-card {
      background: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 20px;
      padding: 24px;
      backdrop-filter: blur(12px);
    }
    .kit-img-area {
      background: linear-gradient(135deg, rgba(99,153,229,.2), rgba(99,70,229,.25));
      border-radius: 14px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
    }
    .kit-img-area img {
      max-height: 150px;
      width: auto;
      object-fit: contain;
      animation: heroFloat 3s ease-in-out infinite;
    }
    .kit-badge-circle {
      position: absolute;
      top: 10px; right: 10px;
      background: #003399;
      border: 2.5px solid #f5c518;
      border-radius: 50%;
      width: 62px; height: 62px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .kit-strip {
      background: #f5c518;
      color: #001e5c;
      border-radius: 8px;
      padding: 8px 14px;
      text-align: center;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: .08em;
    }
    .float-chip {
      position: absolute;
      background: #fff;
      border-radius: 10px;
      padding: 7px 12px;
      font-size: 11px;
      font-weight: 700;
      color: #001e5c;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 14px rgba(0,30,92,.18);
    }
    .chip-1 { top: -14px; left: -18px; animation: feFloat 3.5s ease-in-out infinite .5s; }
    .chip-2 { bottom: -6px; left: -22px; animation: feFloat 4s ease-in-out infinite 1s; }
    .rocket-deco {
      position: absolute;
      top: 18px; right: -8px;
      animation: rocketFloat 2.5s ease-in-out infinite;
      font-size: 32px;
      color: #f5c518;
      transform: rotate(-30deg);
    }

    /* ════════════════════════════════════════
       PROGRAM CARDS
    ════════════════════════════════════════ */
    .programs-section { background: #fff; padding: 56px 0; }

    .section-eyebrow {
      display: inline-block;
      color: #003399;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: clamp(24px, 3.5vw, 38px);
      font-weight: 900;
      color: #001e5c;
      margin-bottom: 6px;
    }
    .section-sub { color: #64748b; font-size: 14px; }

    .prog-card {
      border-radius: 20px;
      border: 1.5px solid #dce6f7;
      background: linear-gradient(160deg, #fff 70%, #f0f6ff);
      padding: 24px;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      min-height: 440px;
      opacity: 0;
      transform: translateY(60px);
      transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                  box-shadow .3s,
                  border-color .3s;
    }
    .prog-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      border-radius: 20px 20px 0 0;
    }
    .prog-card.visible { animation: cardPop .6s cubic-bezier(.34,1.56,.64,1) both; }
    .prog-card:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 20px 40px rgba(0,30,92,.12);
      border-color: #b4ccf7;
    }

    /* Accent top strips */
    .accent-amber::before  { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .accent-blue::before   { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .accent-green::before  { background: linear-gradient(90deg, #10b981, #34d399); }
    .accent-purple::before { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
    .accent-orange::before { background: linear-gradient(90deg, #f97316, #fb923c); }
    .accent-indigo::before { background: linear-gradient(90deg, #6366f1, #818cf8); }

    .card-icon-wrap {
      width: 52px; height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      transition: transform .3s;
    }
    .prog-card:hover .card-icon-wrap { transform: scale(1.12) rotate(5deg); }

    .card-title-text { font-size: 16px; font-weight: 800; color: #173b78; margin-bottom: 2px; }
    .card-age-label  {
      font-size: 10px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: .05em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    /* Product image area */
    .card-img-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 130px;
      overflow: hidden;
      border-radius: 12px;
      background: #f8fafc;
      margin-bottom: 14px;
    }
    .card-img-wrap img {
      max-height: 100%;
      width: auto;
      object-fit: contain;
      transition: transform .5s ease;
    }
    .prog-card:hover .card-img-wrap img { transform: scale(1.07); }

    .card-items-list { list-style: none; flex: 1; margin-bottom: 16px; }
    .card-items-list li {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #475569;
      padding: 3px 0;
    }
    .item-check { color: #003399; font-size: 14px; }

    .card-cta-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 800;
      color: #003399;
      transition: gap .2s;
    }
    .prog-card:hover .card-cta-row { gap: 10px; }
    .cta-arrow { transition: transform .2s; }
    .prog-card:hover .cta-arrow { transform: translateX(4px); }

    /* ════════════════════════════════════════
       DARK BANNER
    ════════════════════════════════════════ */
    .dark-banner { background: #001e5c; padding: 56px 0; }

    .pill-badge {
      display: inline-block;
      background: #f5c518;
      color: #001e5c;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .1em;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    .banner-prog-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 18px;
    }
    .banner-prog-item { display: flex; align-items: center; gap: 6px; color: #93c5fd; font-size: 11px; }
    .prog-check { color: #f5c518; font-size: 13px; }

    .btn-view-all {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #fff;
      color: #001e5c;
      font-weight: 800;
      font-size: 12px;
      padding: 10px 22px;
      border-radius: 10px;
      text-decoration: none;
      transition: background .2s, transform .2s;
    }
    .btn-view-all:hover { background: #eff4ff; transform: translateY(-1px); }

    .video-panel {
      border-radius: 16px;
      overflow: hidden;
      background: #0a1a45;
      aspect-ratio: 16 / 9;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 1px solid rgba(255,255,255,.1);
      cursor: pointer;
      transition: transform .25s;
    }
    .video-panel:hover { transform: scale(1.02); }
    .play-circle {
      width: 56px; height: 56px;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(0,0,0,.3);
      position: relative;
      z-index: 1;
      transition: transform .2s;
    }
    .video-panel:hover .play-circle { transform: scale(1.12); }

    /* ════════════════════════════════════════
       STATS
    ════════════════════════════════════════ */
    .stats-bar { background: #002580; padding: 40px 0; }
    .stat-item {
      text-align: center;
      padding: 16px 24px;
      border-right: 1px solid rgba(255,255,255,.1);
    }
    .stat-item:last-child { border-right: none; }
    .stat-val { font-size: 32px; font-weight: 900; color: #fff; }
    .stat-lbl { color: #93c5fd; font-size: 11px; font-weight: 500; margin-top: 2px; }

    /* ════════════════════════════════════════
       EVENTS
    ════════════════════════════════════════ */
    .events-section { background: #f8faff; padding: 56px 0; }

    .event-card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid #e2e8f7;
      overflow: hidden;
      text-decoration: none;
      display: block;
      transition: transform .25s, box-shadow .25s;
    }
    .event-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,30,92,.10);
    }
    .event-body { padding: 16px; }
    .event-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 20px;
    }
    .event-title-text {
      font-weight: 800;
      color: #001e5c;
      font-size: 14px;
      margin-bottom: 6px;
      line-height: 1.3;
    }
    .event-desc-text {
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .event-meta { border-top: 1px solid #f1f5f9; padding-top: 10px; }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #94a3b8;
      padding: 3px 0;
    }

    /* ════════════════════════════════════════
       PROJECTS
    ════════════════════════════════════════ */
    .projects-section { background: #fff; padding: 56px 0; }

    /* ════════════════════════════════════════
       PARTNERS
    ════════════════════════════════════════ */
    .partners-section {
      background: #f8faff;
      padding: 48px 0;
      border-top: 1px solid #e2e8f0;
    }

    /* ════════════════════════════════════════
       FINAL CTA
    ════════════════════════════════════════ */
    .cta-section { background: #003399; padding: 64px 0; text-align: center; }
    .cta-star {
      display: inline-block;
      animation: starSpin 6s linear infinite;
      color: #f5c518;
      font-size: 26px;
      margin-bottom: 12px;
    }
    .btn-join {
      display: inline-block;
      background: #f5c518;
      color: #001e5c;
      font-weight: 900;
      font-size: 14px;
      padding: 14px 36px;
      border-radius: 12px;
      text-decoration: none;
      transition: background .2s, transform .2s;
      box-shadow: 0 4px 16px rgba(245,197,24,.35);
    }
    .btn-join:hover { background: #ffd94d; transform: translateY(-2px); }
    .btn-touch {
      display: inline-block;
      border: 2px solid rgba(255,255,255,.35);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 36px;
      border-radius: 12px;
      text-decoration: none;
      transition: background .2s, transform .2s;
    }
    .btn-touch:hover { background: rgba(255,255,255,.1); transform: translateY(-2px); }

    /* ════════════════════════════════════════
       REDUCED MOTION
    ════════════════════════════════════════ */
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
    <section class="hero-section">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid lg:grid-cols-2 gap-10 items-center">

          <!-- Left copy -->
          <div>
            <div class="hero-badge">
              <span class="badge-dot"></span>
              Kenya's #1 STEM Innovation Center
            </div>

            <h1 class="hero-heading">
              Discover<br>
              <span class="heading-gold">STEM With ESIC</span>
            </h1>

            <p class="hero-sub">
              Electronics &amp; Software Innovation Center — designing hands-on kits,
              robotics, and AI tools that make science impossible to ignore.
            </p>

            <p class="hero-tagline">✦ Learn by Building. Innovate by Doing.</p>

            <div class="hero-btns">
              <a routerLink="/programs" class="btn-explore">
                <span class="material-icons-outlined text-base">science</span>
                Explore Programs
              </a>
              <a routerLink="/contact" class="btn-partner">
                <span class="material-icons-outlined text-base">handshake</span>
                Partner With Us
              </a>
            </div>

            <div class="trust-row">
              @for (badge of trustBadges; track badge.label) {
                <div class="trust-item">
                  <span class="material-icons-outlined trust-icon text-base">{{ badge.icon }}</span>
                  <div>
                    <div class="trust-label">{{ badge.label }}</div>
                    <div class="trust-sub">{{ badge.sub }}</div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: hero visual panel -->
          <div class="hero-visual hidden lg:flex justify-center items-center">
            <div class="relative w-full max-w-md">

              <!-- Floating chips -->
              <div class="float-chip chip-1">
                <span class="material-icons-outlined text-[#f5c518] text-base">bolt</span>
                Circuit Kit
              </div>
              <div class="float-chip chip-2">
                <span class="material-icons-outlined text-[#003399] text-base">smart_toy</span>
                Robotics Ready!
              </div>

              <!-- Rocket decoration -->
              <span class="material-icons-outlined rocket-deco">rocket_launch</span>

              <!-- Main card -->
              <div class="hero-kit-card">
                <div class="kit-img-area">
                  <img
                    src="/images/esic-hero.jpeg"
                    alt="ESIC STEM Learning"
                    loading="lazy"
                  />
                  <p class="absolute bottom-2 inset-x-0 text-center text-white/80 text-xs font-medium">
                    Hands-on STEM Learning
                  </p>
                  <div class="kit-badge-circle">
                    <span class="text-[#f5c518] font-black text-base leading-none">61+</span>
                    <span class="text-white text-[8px] leading-tight px-1 text-center">Experiments Included</span>
                  </div>
                </div>
                <div class="kit-strip">⚡ STEP BY STEP SCIENCE</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         PROGRAM CARDS
    ══════════════════════════════════════════════════════ -->
    <section class="programs-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-10">
          <div class="section-eyebrow">✦ Our Programs</div>
          <h2 class="section-title">STEM for Every Age &amp; Level</h2>
          <p class="section-sub">From curious 6-year-olds to university engineers — a kit for every learner.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          @for (prog of programCards; track prog.slug; let i = $index) {
            <a
              [routerLink]="['/programs', prog.slug]"
              #cardRef
              class="prog-card group"
              [class]="'prog-card accent-' + prog.accent"
              [attr.data-index]="i"
            >
              <!-- Icon -->
              <div class="card-icon-wrap" [style.background]="prog.iconBg">
                <span class="material-icons-outlined text-[28px]" [style.color]="prog.iconColor">
                  {{ prog.icon }}
                </span>
              </div>

              <div class="card-title-text">{{ prog.title }}</div>
              <div class="card-age-label">{{ prog.age }}</div>

              <!-- Product image -->
              <div class="card-img-wrap">
                <img
                  [src]="prog.image"
                  [alt]="prog.title"
                  loading="lazy"
                  (error)="prog.image = '/images/placeholder.jpg'"
                />
              </div>

              <!-- Features -->
              <ul class="card-items-list">
                @for (item of prog.items; track item) {
                  <li>
                    <span class="material-icons-outlined item-check">check_circle</span>
                    {{ item }}
                  </li>
                }
              </ul>

              <!-- CTA -->
              <div class="card-cta-row">
                {{ prog.cta }}
                <span class="material-icons-outlined cta-arrow text-base">arrow_forward</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         FEATURED PRODUCT BANNER
    ══════════════════════════════════════════════════════ -->
    <section class="dark-banner">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-3 gap-10 items-center">

          <!-- Product visuals -->
          <div class="flex items-center justify-center lg:justify-start gap-4">
            <div class="w-24 h-24 bg-white/10 rounded-2xl border border-white/15 flex items-center justify-center">
              <span class="material-icons-outlined text-[#f5c518] text-5xl">science</span>
            </div>
            <div class="w-20 h-20 bg-white rounded-xl shadow-xl flex items-center justify-center">
              <span class="material-icons-outlined text-[#003399] text-4xl">auto_stories</span>
            </div>
          </div>

          <!-- Program info -->
          <div>
            <div class="pill-badge">Explore Our Programs</div>
            <h2 class="text-2xl font-black text-white mb-4">STEM Learning Programs</h2>
            <div class="banner-prog-grid">
              @for (program of featuredPrograms.slice(0, 6); track program) {
                <div class="banner-prog-item">
                  <span class="material-icons-outlined prog-check text-sm">check_circle</span>
                  {{ program }}
                </div>
              }
            </div>
            <a routerLink="/programs" class="btn-view-all">
              View All Programs
              <span class="material-icons-outlined text-base">arrow_forward</span>
            </a>
          </div>

          <!-- Video panel -->
          <div class="video-panel hidden lg:flex">
            <div class="absolute inset-0 bg-gradient-to-br from-[#001e5c]/60 to-[#0a4fd6]/50"></div>
            <div class="play-circle">
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
    <section class="stats-bar">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4">
          @for (stat of stats; track stat.label) {
            <div class="stat-item">
              <div class="flex items-center justify-center gap-2 mb-1">
                <span class="material-icons-outlined text-[#f5c518] text-2xl">{{ stat.icon }}</span>
                <span class="stat-val">{{ stat.value }}</span>
              </div>
              <div class="stat-lbl">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════
         UPCOMING EVENTS
    ══════════════════════════════════════════════════════ -->
    <section class="events-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="flex items-end justify-between mb-8">
          <div>
            <div class="section-eyebrow">✦ What's On</div>
            <h2 class="section-title" style="font-size: 26px">Upcoming Events</h2>
            <p class="section-sub mt-1">Workshops, bootcamps, and competitions</p>
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
              <a [routerLink]="['/events', event.slug]" class="event-card">
                <div class="h-1.5 w-full" [class]="eventStripe(event.type)"></div>
                <div class="event-body">
                  <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="event-badge" [class]="eventBadge(event.type)">
                      {{ event.type }}
                    </span>
                    @if (event.isFeatured) {
                      <span class="event-badge"
                            style="background:#fef9c3;color:#92400e">
                        Featured
                      </span>
                    }
                  </div>
                  <div class="event-title-text">{{ event.title }}</div>
                  <div class="event-desc-text">{{ event.description }}</div>
                  <div class="event-meta">
                    <div class="meta-row">
                      <span class="material-icons-outlined text-[#003399] text-sm">calendar_today</span>
                      {{ event.startDate | date:'EEE, MMM d, y' }}
                    </div>
                    @if (event.location) {
                      <div class="meta-row">
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
      <section class="projects-section">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="flex items-end justify-between mb-8">
            <div>
              <div class="section-eyebrow">✦ Innovation Showcase</div>
              <h2 class="section-title" style="font-size: 26px">Featured Projects &amp; Research</h2>
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
                 class="event-card group">
                <div class="h-36 bg-gradient-to-br from-[#dbeafe] to-[#e0e7ff] flex items-center justify-center">
                  <span class="material-icons-outlined text-[#003399]/40 text-6xl">biotech</span>
                </div>
                <div class="p-5">
                  <span class="text-xs bg-[#dbeafe] text-[#003399] px-2.5 py-0.5 rounded-full font-semibold">
                    {{ proj.category }}
                  </span>
                  <h3 class="font-black text-[#001e5c] text-sm mt-2 mb-1
                             group-hover:text-[#003399] transition-colors">
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
      <section class="partners-section">
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

    <!-- ══════════════════════════════════════════════════════
         FINAL CTA
    ══════════════════════════════════════════════════════ -->
    <section class="cta-section">
      <div class="max-w-2xl mx-auto px-4">
        <div class="cta-star">✦</div>
        <h2 class="text-3xl lg:text-4xl font-black text-white mb-3">
          Ready to Innovate with ESIC?
        </h2>
        <p class="text-[#93c5fd] text-sm mb-8 leading-relaxed">
          Join a growing community of STEM innovators, educators, and researchers at Chuka University.
          Get access to programs, resources, and events — built for Kenya's learners.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/auth/register" class="btn-join">Join ESIC — It's Free</a>
          <a routerLink="/contact"       class="btn-touch">Get in Touch</a>
        </div>
      </div>
    </section>
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