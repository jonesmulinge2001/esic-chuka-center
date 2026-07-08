import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  signal,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-learning-resources',
  imports: [RouterLink, CommonModule, DatePipe],
  styles: [
      `
          @keyframes shimmer {
              0% { background-position: 200% center; }
              100% { background-position: -200% center; }
          }
          
          @keyframes heroPulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
              50% { box-shadow: 0 0 0 14px rgba(37, 99, 235, 0); }
          }
          
          @keyframes float1 {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-12px) rotate(5deg); }
          }
          
          @keyframes float2 {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-16px) rotate(-4deg); }
          }
          
          @keyframes float3 {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px) rotate(3deg); }
          }
          
          @keyframes starSpin {
              to { transform: rotate(360deg); }
          }
          
          @keyframes fadeInUp {
              from {
                  opacity: 0;
                  transform: translateY(30px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
          
          @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; }
          }
          
          @keyframes slideInLeft {
              from {
                  opacity: 0;
                  transform: translateX(-30px);
              }
              to {
                  opacity: 1;
                  transform: translateX(0);
              }
          }
          
          .animate-shimmer {
              animation: shimmer 3s linear infinite;
              background-size: 200% auto;
          }
          
          .animate-hero-pulse {
              animation: heroPulse 2.5s ease-in-out infinite;
          }
          
          .animate-float1 {
              animation: float1 3.5s ease-in-out infinite;
          }
          
          .animate-float2 {
              animation: float2 4s ease-in-out infinite;
          }
          
          .animate-float3 {
              animation: float3 3s ease-in-out infinite;
          }
          
          .animate-star-spin {
              animation: starSpin 6s linear infinite;
          }
          
          .animate-fade-in-up {
              animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-pulse-slow {
              animation: pulse 2.5s ease-in-out infinite;
          }
          
          .animate-slide-in-left {
              animation: slideInLeft 0.6s ease-out forwards;
          }
          
          .glass-effect {
              background: rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.12);
          }
          
          .feature-card {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .feature-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
          
          .feature-icon {
              transition: transform 0.3s ease;
          }
          
          .feature-card:hover .feature-icon {
              transform: scale(1.1) rotate(-5deg);
          }
          
          .badge-gold {
              background: linear-gradient(135deg, #fbd01d, #f59e0b);
              color: #001a5e;
          }
          
          .badge-blue {
              background: rgba(37, 99, 235, 0.15);
              color: #2563eb;
              border: 1px solid rgba(37, 99, 235, 0.2);
          }
          
          .badge-purple {
              background: rgba(124, 58, 237, 0.15);
              color: #7c3aed;
              border: 1px solid rgba(124, 58, 237, 0.2);
          }
          
          .badge-green {
              background: rgba(22, 163, 74, 0.15);
              color: #16a34a;
              border: 1px solid rgba(22, 163, 74, 0.2);
          }
          
          .badge-orange {
              background: rgba(234, 88, 12, 0.15);
              color: #ea580c;
              border: 1px solid rgba(234, 88, 12, 0.2);
          }
          
          .platform-card {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .platform-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 40px rgba(0, 26, 94, 0.12);
          }
          
          .divider-gradient {
              height: 4px;
              background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
              width: 80px;
              margin: 0 auto;
              border-radius: 2px;
          }
          
          .stat-number {
              font-size: clamp(28px, 3vw, 36px);
              font-weight: 900;
              background: linear-gradient(135deg, #fbd01d, #f59e0b);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
          }
          
          .glow-effect {
              position: relative;
          }
          
          .glow-effect::before {
              content: '';
              position: absolute;
              inset: -2px;
              background: linear-gradient(135deg, #fbd01d, #f59e0b);
              border-radius: 16px;
              opacity: 0;
              transition: opacity 0.3s ease;
              z-index: -1;
          }
          
          .glow-effect:hover::before {
              opacity: 1;
          }
      `
  ],
  template: `
      <!-- ══ HERO SECTION ══ -->
      <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] min-h-[460px] flex items-center py-16 border-b-[4px] border-[#fbd01d]">
          <!-- Animated Background Particles -->
          <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
          
          <!-- Floating Gradient Orbs -->
          <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                  <!-- Left Content -->
                  <div class="space-y-6 animate-fade-in-up">
                              
                      <h1 class="text-[clamp(38px,5.5vw,56px)] font-black text-white leading-[1.05]">
                          Learn<br />
                          <span class="bg-gradient-to-r from-[#fbd01d] via-[#fdd835] to-[#fbd01d] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Anywhere</span>
                      </h1>
                      
                      <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                          Our digital platform complements every ESIC learning kit, providing a complete online learning experience accessible from any device.
                      </p>
                      
                      <!-- Buttons -->
                      <div class="flex flex-wrap gap-4 pt-2">
                          <a routerLink="/dashboard" 
                             class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)] animate-hero-pulse">
                              <span class="material-icons text-base">dashboard</span>
                              Go to Dashboard
                          </a>
                          <a routerLink="/contact" 
                             class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                              <span class="material-icons text-base">play_circle</span>
                              Watch Demo
                          </a>
                      </div>
                      
                      <!-- Stats -->
                      <div class="flex gap-8 pt-4">
                          <div>
                              <div class="text-2xl font-black text-white">14+</div>
                              <div class="text-[11px] text-white/50 font-medium">Features</div>
                          </div>
                          <div>
                              <div class="text-2xl font-black text-white">24/7</div>
                              <div class="text-[11px] text-white/50 font-medium">Access</div>
                          </div>
                          <div>
                              <div class="text-2xl font-black text-white">100%</div>
                              <div class="text-[11px] text-white/50 font-medium">Online</div>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Right Visual -->
                  <div class="hidden lg:flex relative justify-center items-center">
                      <div class="relative">
                          <!-- Floating Icons -->
                          <div class="absolute -top-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#fbd01d] text-2xl animate-float1">
                              <span class="material-icons">school</span>
                          </div>
                          <div class="absolute -top-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.6s;">
                              <span class="material-icons">simulation</span>
                          </div>
                          <div class="absolute -bottom-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-purple-400 text-2xl animate-float3" style="animation-delay: 0.9s;">
                              <span class="material-icons">quiz</span>
                          </div>
                          <div class="absolute -bottom-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-green-400 text-2xl animate-float1" style="animation-delay: 1.2s;">
                              <span class="material-icons">workspace_premium</span>
                          </div>
                          <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-yellow-400 text-2xl animate-float2" style="animation-delay: 0.3s;">
                              <span class="material-icons">forum</span>
                          </div>
                          
                          <!-- Main Card -->
                          <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                              <div class="relative bg-gradient-to-br from-blue-600/30 to-purple-400/20 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                  <div class="absolute inset-0 bg-gradient-to-t from-[#001a5e]/50 to-transparent"></div>
                                  <div class="relative z-10 text-center text-white">
                                      <span class="material-icons text-6xl text-[#fbd01d]">auto_stories</span>
                                      <p class="text-sm font-bold mt-2 text-white/80">ESIC Learn Platform</p>
                                      <div class="flex justify-center gap-3 mt-3 flex-wrap">
                                          <span class="text-[9px] font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                                              <span class="material-icons align-middle text-[12px] mr-1">person</span>
                                              Student
                                          </span>
                                          <span class="text-[9px] font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                                              <span class="material-icons align-middle text-[12px] mr-1">teaching</span>
                                              Teacher
                                          </span>
                                          <span class="text-[9px] font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                                              <span class="material-icons align-middle text-[12px] mr-1">psychology</span>
                                              AI Assistant
                                          </span>
                                      </div>
                                  </div>
                                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-400/5"></div>
                              </div>
                              <div class="mt-4 bg-gradient-to-r from-[#fbd01d] to-[#fdd835] text-[#001a5e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.06em] flex items-center justify-center gap-2 shadow-lg">
                                  <span class="material-icons text-sm">verified</span>
                                  COMPLETE DIGITAL LEARNING ECOSYSTEM
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ PLATFORM FEATURES ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">
                      <span class="material-icons align-middle text-[14px] mr-1">stars</span>
                      Platform Features
                  </div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Everything You Need to Learn</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">ESIC Learn provides a comprehensive digital learning experience with features for every learning style</p>
                  <div class="divider-gradient mt-4"></div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  @for (feature of platformFeatures; track feature.title; let i = $index) {
                      <div class="bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-[#fbd01d] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up feature-card" 
                           #featureRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.05 }}s;">
                          
                          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 feature-icon" 
                               [style.background]="feature.iconBg">
                              <span class="material-icons text-[26px]" [style.color]="feature.iconColor">{{ feature.icon }}</span>
                          </div>
                          
                          <h3 class="text-[15px] font-extrabold text-slate-900 mb-1">{{ feature.title }}</h3>
                          <p class="text-[12px] text-slate-600 leading-relaxed">{{ feature.desc }}</p>
                          
                          @if (feature.badge) {
                              <div class="mt-3 inline-block text-[9px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full"
                                   [class]="feature.badgeClass">
                                  {{ feature.badge }}
                              </div>
                          }
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ DASHBOARD PREVIEW ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-100 to-slate-50">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
                      <span class="material-icons align-middle text-[14px] mr-1">dashboard</span>
                      Student Dashboard
                  </div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Your Learning Hub</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Track progress, access resources, and manage your learning journey from one central dashboard</p>
                  <div class="divider-gradient mt-4"></div>
              </div>
              
              <!-- Dashboard Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  @for (stat of dashboardStats; track stat.label) {
                      <div class="bg-white rounded-2xl p-6 border border-slate-200 text-center platform-card">
                          <div class="text-2xl md:text-3xl font-black text-[#001a5e]">{{ stat.value }}</div>
                          <div class="text-[11px] text-slate-500 font-medium mt-1">{{ stat.label }}</div>
                          <div class="text-[10px] text-green-600 mt-1 flex items-center justify-center gap-1">
                              <span class="material-icons text-[12px]">arrow_upward</span>
                              {{ stat.change }}
                          </div>
                      </div>
                  }
              </div>
              
              <!-- Dashboard Preview Cards -->
              <div class="grid md:grid-cols-2 gap-6">
                  <!-- Student Section -->
                  <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                      <div class="flex items-center gap-3 mb-6">
                          <span class="material-icons text-2xl text-blue-600">person</span>
                          <h3 class="text-lg font-bold text-slate-900">Student Features</h3>
                      </div>
                      <div class="grid grid-cols-2 gap-3">
                          @for (item of studentFeatures; track item) {
                              <div class="flex items-center gap-2 text-[13px] text-slate-700">
                                  <span class="material-icons text-[16px] text-blue-500">check_circle</span>
                                  <span>{{ item }}</span>
                              </div>
                          }
                      </div>
                  </div>
                  
                  <!-- Teacher Section -->
                  <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                      <div class="flex items-center gap-3 mb-6">
                          <span class="material-icons text-2xl text-purple-600">teaching</span>
                          <h3 class="text-lg font-bold text-slate-900">Teacher Features</h3>
                      </div>
                      <div class="grid grid-cols-2 gap-3">
                          @for (item of teacherFeatures; track item) {
                              <div class="flex items-center gap-2 text-[13px] text-slate-700">
                                  <span class="material-icons text-[16px] text-purple-500">check_circle</span>
                                  <span>{{ item }}</span>
                              </div>
                          }
                      </div>
                  </div>
              </div>
              
              <!-- AI Assistant Highlight -->
              <div class="mt-8 bg-gradient-to-r from-[#001a5e] to-[#094ed3] rounded-2xl p-8 text-white relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div class="flex items-center gap-4">
                          <div class="w-16 h-16 rounded-2xl bg-[#fbd01d]/20 flex items-center justify-center flex-shrink-0">
                              <span class="material-icons text-3xl text-[#fbd01d]">psychology</span>
                          </div>
                          <div>
                              <h4 class="text-xl font-bold">AI Learning Assistant</h4>
                              <p class="text-white/70 text-[13px] max-w-md">Get personalized help, instant answers, and learning recommendations powered by artificial intelligence</p>
                          </div>
                      </div>
                      <a routerLink="/dashboard" 
                         class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-bold text-[13px] px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg flex-shrink-0">
                          <span class="material-icons text-base">chat</span>
                          Try AI Assistant
                      </a>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ ACCESS ANYWHERE ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
          <div class="max-w-7xl mx-auto text-center">
              <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-[#fbd01d]/20 text-[#fbd01d] border border-[#fbd01d]/30 mb-4">
                  <span class="material-icons align-middle text-[14px] mr-1">devices</span>
                  Access Anywhere
              </div>
              
              <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-4">Learn Anytime, Anywhere</h2>
              <p class="text-white/70 text-[15px] leading-relaxed mx-auto max-w-2xl mb-10">
                  Access your learning resources from any device — desktop, tablet, or mobile
              </p>
              
              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  @for (device of devices; track device.name) {
                      <div class="glass-effect rounded-2xl p-6 border border-white/10 hover:border-[#fbd01d]/50 transition-all duration-300">
                          <span class="material-icons text-4xl text-[#fbd01d] block mb-3">{{ device.icon }}</span>
                          <h4 class="text-white font-bold text-[15px] mb-1">{{ device.name }}</h4>
                          <p class="text-white/50 text-[12px]">{{ device.desc }}</p>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ FINAL CTA ══ -->
      <section class="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800">
          <!-- Animated Orbs -->
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-4xl mx-auto text-center relative z-10">
              <div class="material-icons text-5xl text-[#fbd01d] block mb-6 animate-star-spin">auto_stories</div>
              
              <h2 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4">
                  Ready to Start Learning?
              </h2>
              
              <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                  Every ESIC learning kit includes access to the complete ESIC Learn platform. Get started today with our comprehensive digital learning ecosystem.
              </p>
              
              <div class="flex flex-wrap justify-center gap-4">
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
                      <span class="material-icons text-base">school</span>
                      Get Started
                  </a>
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                      <span class="material-icons text-base">contact_mail</span>
                      Contact Sales
                  </a>
              </div>
              
              <div class="mt-8 flex flex-wrap justify-center gap-6 text-white/40 text-[11px]">
                  <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">verified</span>
                      Included with every kit
                  </span>
                  <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">update</span>
                      Regular updates
                  </span>
                  <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">support</span>
                      24/7 support
                  </span>
              </div>
          </div>
      </section>
  `,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('featureRef') featureEls!: QueryList<ElementRef>;
  
  platformFeatures = [
      {
          title: 'Interactive Lessons',
          icon: 'menu_book',
          iconColor: '#2563eb',
          iconBg: '#dbeafe',
          desc: 'Engaging, interactive lessons that make learning fun and effective',
          badge: 'Popular',
          badgeClass: 'badge-gold'
      },
      {
          title: 'Video Demonstrations',
          icon: 'play_circle',
          iconColor: '#dc2626',
          iconBg: '#fee2e2',
          desc: 'High-quality video content demonstrating key concepts and procedures',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Virtual Laboratories',
          icon: 'simulation',
          iconColor: '#7c3aed',
          iconBg: '#ede9fe',
          desc: 'Safe, interactive virtual labs for hands-on experimentation',
          badge: 'New',
          badgeClass: 'badge-purple'
      },
      {
          title: 'Downloadable Manuals',
          icon: 'download',
          iconColor: '#0891b2',
          iconBg: '#cffafe',
          desc: 'Comprehensive manuals available for offline access and reference',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Student Dashboard',
          icon: 'dashboard',
          iconColor: '#16a34a',
          iconBg: '#dcfce7',
          desc: 'Personalized dashboard to track your learning progress and achievements',
          badge: 'Essential',
          badgeClass: 'badge-green'
      },
      {
          title: 'Teacher Dashboard',
          icon: 'teaching',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'Powerful tools for educators to manage classes and monitor student progress',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Assessments',
          icon: 'quiz',
          iconColor: '#be123c',
          iconBg: '#ffe4e6',
          desc: 'Comprehensive assessments to evaluate understanding and track growth',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Certificates',
          icon: 'workspace_premium',
          iconColor: '#ca8a04',
          iconBg: '#fef9c3',
          desc: 'Verifiable digital certificates recognizing achievement and completion',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Progress Tracking',
          icon: 'trending_up',
          iconColor: '#2563eb',
          iconBg: '#dbeafe',
          desc: 'Detailed analytics and insights to monitor learning progress over time',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'Discussion Forums',
          icon: 'forum',
          iconColor: '#7c3aed',
          iconBg: '#ede9fe',
          desc: 'Collaborative forums for students to share ideas and ask questions',
          badge: null,
          badgeClass: ''
      },
      {
          title: 'AI Learning Assistant',
          icon: 'psychology',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'AI-powered assistant providing personalized help and recommendations',
          badge: 'AI-Powered',
          badgeClass: 'badge-orange'
      },
      {
          title: 'Progress Tracking',
          icon: 'insights',
          iconColor: '#16a34a',
          iconBg: '#dcfce7',
          desc: 'Visual progress tracking with milestones and achievement markers',
          badge: null,
          badgeClass: ''
      },
  ];
  
  dashboardStats = [
      { label: 'Active Students', value: '2,847', change: '+12% this month' },
      { label: 'Courses Available', value: '156', change: '+8 new this week' },
      { label: 'Completion Rate', value: '87%', change: '+5% improvement' },
      { label: 'AI Queries Answered', value: '4,231', change: '+23% growth' },
  ];
  
  studentFeatures = [
      'Interactive Lessons',
      'Video Demonstrations',
      'Virtual Laboratories',
      'Downloadable Manuals',
      'Assessments & Quizzes',
      'Progress Tracking',
      'Discussion Forums',
      'AI Learning Assistant'
  ];
  
  teacherFeatures = [
      'Teacher Dashboard',
      'Class Management',
      'Student Progress Monitoring',
      'Resource Library',
      'Assessment Creation',
      'Grading & Feedback',
      'Classroom Analytics',
      'AI Teaching Assistant'
  ];
  
  devices = [
      { name: 'Desktop', icon: 'desktop_windows', desc: 'Full experience on desktop browsers' },
      { name: 'Tablet', icon: 'tablet', desc: 'Optimized for tablet screens' },
      { name: 'Mobile', icon: 'smartphone', desc: 'Learn on the go with mobile access' },
      { name: 'Any Device', icon: 'devices', desc: 'Works on any modern browser' },
  ];
  
  ngOnInit() {
      if (typeof document !== 'undefined') {
          setTimeout(() => {
              const host = document.getElementById('heroStarsHost');
              if (!host) return;
              for (let i = 0; i < 50; i++) {
                  const s = document.createElement('div');
                  const sz = Math.random() * 4 + 1;
                  const duration = Math.random() * 3 + 2;
                  s.style.cssText = `
                      position:absolute;
                      border-radius:50%;
                      background:rgba(255,255,255,${Math.random() * 0.5 + 0.2});
                      width:${sz}px;
                      height:${sz}px;
                      top:${Math.random() * 100}%;
                      left:${Math.random() * 100}%;
                      animation: float${Math.floor(Math.random() * 3) + 1} ${duration}s ease-in-out infinite;
                      animation-delay: ${Math.random() * 2}s;
                  `;
                  host.appendChild(s);
              }
          });
      }
  }
  
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
                          (entry.target as any)._obs?.unobserve(entry.target);
                      }
                  });
              },
              { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
          );
      
      const observe = (list: QueryList<ElementRef>, delayMs = 80) => {
          const obs = makeObserver(delayMs);
          list.forEach((r) => {
              (r.nativeElement as any)._obs = obs;
              obs.observe(r.nativeElement);
          });
      };
      
      observe(this.featureEls, 50);
  }
}