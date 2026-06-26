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
  selector: 'app-early-stem',
  imports: [RouterLink],
  styles: [
      `
          @keyframes shimmer {
              0% { background-position: 200% center; }
              100% { background-position: -200% center; }
          }
          
          @keyframes heroPulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4); }
              50% { box-shadow: 0 0 0 14px rgba(250, 204, 21, 0); }
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
          
          @keyframes imageZoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.1); }
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
          
          @keyframes bounceIn {
              0% {
                  opacity: 0;
                  transform: scale(0.3);
              }
              50% {
                  transform: scale(1.05);
              }
              70% {
                  transform: scale(0.9);
              }
              100% {
                  opacity: 1;
                  transform: scale(1);
              }
          }
          
          @keyframes pulseGlow {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
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
          
          .animate-image-zoom {
              animation: imageZoom 8s ease-in-out infinite alternate;
          }
          
          .animate-fade-in-up {
              animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-bounce-in {
              animation: bounceIn 0.6s ease-out forwards;
          }
          
          .animate-pulse-glow {
              animation: pulseGlow 2s ease-in-out infinite;
          }
          
          .image-hover-zoom {
              transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .image-hover-zoom:hover {
              transform: scale(1.08);
          }
          
          .card-hover {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
          
          .glass-effect {
              background: rgba(255, 255, 255, 0.08);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.12);
          }
          
          .gradient-border {
              position: relative;
              background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(251, 146, 60, 0.05));
              border: 1px solid transparent;
              background-clip: padding-box;
          }
          
          .gradient-border::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: inherit;
              padding: 1.5px;
              background: linear-gradient(135deg, #facc15, #fb923c, #facc15);
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              pointer-events: none;
          }
      `
  ],
  template: `
      <!-- ══ HERO SECTION ══ -->
      <section class="relative overflow-hidden bg-gradient-to-br from-[#0d1b6e] via-[#1a3fbf] to-[#2563eb] min-h-[580px] flex items-center py-16 border-b-[4px] border-[#facc15]">
          <!-- Animated Background Particles -->
          <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
          
          <!-- Floating Gradient Orbs -->
          <div class="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                  <!-- Left Content -->
                  <div class="space-y-6 animate-fade-in-up">
                      <!-- Badge -->
                      <div class="inline-flex items-center gap-2 bg-[#facc15]/10 border border-[#facc15]/30 text-[#facc15] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
                          <span class="w-2 h-2 bg-[#facc15] rounded-full animate-pulse"></span>
                          Early STEM Program 2026
                      </div>
                      
                      <h1 class="text-[clamp(42px,6vw,72px)] font-black text-white leading-[1.05]">
                          Explore.<br />
                          <span class="bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#facc15] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Build.</span><br />
                          Discover.
                      </h1>
                      
                      <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                          Introduce children to the exciting world of Science, Technology,
                          Engineering, and Mathematics through fun hands-on activities,
                          coding, robotics, and creative problem-solving!
                      </p>
                      
                      <!-- Buttons -->
                      <div class="flex flex-wrap gap-4 pt-2">
                          <a routerLink="/auth/register" 
                             class="inline-flex items-center gap-2 bg-[#facc15] text-[#0d1b6e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)] animate-hero-pulse">
                              <span class="material-icons text-base">rocket_launch</span>
                              Enroll Now
                          </a>
                          <a routerLink="/contact" 
                             class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                              <span class="material-icons text-base">play_circle</span>
                              Learn More
                          </a>
                      </div>
                      
                      <!-- Age Badges -->
                      <div class="flex flex-wrap gap-3 pt-4">
                          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                              <span class="material-icons text-[#facc15]">child_care</span>
                              Ages 6–12
                          </div>
                          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                              <span class="material-icons text-[#facc15]">science</span>
                              Hands-on Learning
                          </div>
                          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                              <span class="material-icons text-[#facc15]">verified</span>
                              Safe & Fun
                          </div>
                      </div>
                  </div>
                  
                  <!-- Right Visual -->
                  <div class="hidden lg:flex relative justify-center items-center">
                      <div class="relative">
                          <!-- Floating Chips -->
                          <div class="absolute -top-6 -left-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#2563eb] text-2xl animate-float1">
                              <span class="material-icons">rocket_launch</span>
                          </div>
                          <div class="absolute -top-6 -right-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#16a34a] text-2xl animate-float2" style="animation-delay: 0.6s;">
                              <span class="material-icons">smart_toy</span>
                          </div>
                          <div class="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#ea580c] text-2xl animate-float3" style="animation-delay: 0.9s;">
                              <span class="material-icons">science</span>
                          </div>
                          <div class="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#7c3aed] text-2xl animate-float1" style="animation-delay: 1.2s;">
                              <span class="material-icons">lightbulb</span>
                          </div>
                          <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#ca8a04] text-2xl animate-float2" style="animation-delay: 0.3s;">
                              <span class="material-icons">extension</span>
                          </div>
                          
                          <!-- Main Image Card -->
                          <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                              <div class="relative bg-gradient-to-br from-[#facc15]/20 to-[#fb923c]/10 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                  <div class="absolute inset-0 bg-gradient-to-t from-[#0d1b6e]/50 to-transparent"></div>
                                  <img src="/images/esic-6-12.jpeg" 
                                       alt="Early STEM Kids" 
                                       class="relative z-10 max-h-[170px] w-auto object-contain rounded-lg animate-float1"
                                       (error)="heroImgError = true" />
                                  <div class="absolute inset-0 animate-image-zoom bg-gradient-to-br from-yellow-400/10 to-orange-400/5"></div>
                              </div>
                              <div class="mt-4 bg-gradient-to-r from-[#facc15] to-[#fb923c] text-[#0d1b6e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg">
                                  <span class="material-icons text-sm">bolt</span>
                                  EARLY STEM PROGRAM — AGES 6–12
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ WHY STEM MATTERS ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#f8faff] to-white">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">Why It Matters</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Building Future Innovators</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Give your child the foundation to understand and shape tomorrow's world</p>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  @for (card of whyCards; track card.title; let i = $index) {
                      <div class="group bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,30,92,0.1)] hover:border-[#facc15] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up" 
                           #whyRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.1 }}s;">
                          
                          <!-- Image Container -->
                          <div class="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                              <img [src]="card.image" 
                                   [alt]="card.title"
                                   class="w-full h-full object-cover image-hover-zoom"
                                   loading="lazy" />
                              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                              <div class="absolute bottom-3 left-3 w-12 h-12 rounded-full flex items-center justify-center shadow-lg" 
                                   [style.background]="card.iconBg">
                                  <span class="material-icons text-2xl" [style.color]="card.iconColor">{{ card.icon }}</span>
                              </div>
                          </div>
                          
                          <h3 class="text-[16px] font-extrabold text-[#001e5c] mb-2 flex items-center gap-2">
                              <span class="material-icons text-base" [style.color]="card.iconColor">{{ card.icon }}</span>
                              {{ card.title }}
                          </h3>
                          <p class="text-[13px] text-slate-600 leading-relaxed">{{ card.desc }}</p>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ ACTIVITIES ══ -->
      <section class="py-16 md:py-20 px-4 bg-white">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-3">Program Activities</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">What We Do</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">Six exciting activity tracks that keep kids engaged, challenged, and always wanting more</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (act of activities; track act.title; let i = $index) {
                      <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,30,92,0.1)] hover:border-orange-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                           #actRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.08 }}s;">
                          
                          <!-- Activity Image -->
                          <div class="relative w-full h-48 overflow-hidden">
                              <img [src]="act.image || '/images/default-activity.jpg'" 
                                   [alt]="act.title"
                                   class="w-full h-full object-cover image-hover-zoom"
                                   loading="lazy" />
                              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                              <div class="absolute bottom-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" 
                                   [style.background]="act.iconBg">
                                  <span class="material-icons text-2xl" [style.color]="act.iconColor">{{ act.icon }}</span>
                              </div>
                          </div>
                          
                          <div class="p-6">
                              <h3 class="text-[15px] font-extrabold text-[#001e5c] mb-2">{{ act.title }}</h3>
                              <p class="text-[13px] text-slate-600 leading-relaxed">{{ act.desc }}</p>
                          </div>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ LEARNING JOURNEY ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#f0f4ff] via-[#fdf4ff] to-[#f8faff]">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mb-3">The Journey</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Learning Pathway</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">Every child follows an exciting five-stage adventure from curious beginner to confident creator</p>
              </div>
              
              <div class="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                  @for (step of journeySteps; track step.label; let i = $index; let last = $last) {
                      <div class="flex flex-col items-center gap-3 flex-1 w-full sm:w-auto">
                          <div class="w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] opacity-0 transition-all duration-500 hover:scale-[1.12] hover:-rotate-[5deg] [&.visible]:opacity-100 [&.visible]:animate-bounce-in"
                               #journeyRef [attr.data-index]="i"
                               [style.background]="step.color"
                               style="animation-delay: {{ i * 0.1 }}s;">
                              {{ i + 1 }}
                          </div>
                          <div class="text-[13px] font-extrabold text-[#001e5c] text-center">{{ step.label }}</div>
                          <div class="text-[11px] text-slate-600 text-center">{{ step.weeks }}</div>
                          @if (!last) {
                              <div class="hidden sm:block w-12 h-0.5 rounded-full" 
                                   [style.background]="'linear-gradient(90deg,' + step.color + ',' + journeySteps[i + 1].color + ')'"></div>
                          }
                      </div>
                      @if (!last) {
                          <span class="material-icons text-slate-400 sm:hidden">arrow_downward</span>
                      }
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ SKILLS ══ -->
      <section class="py-16 md:py-20 px-4 bg-white">
          <div class="max-w-4xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-green-100 text-green-700 border border-green-200 mb-3">What They'll Learn</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Skills Gained</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">A balanced mix of technical and life skills that prepare children for the future</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Technical Skills -->
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
                      <div class="flex items-center gap-2 text-blue-700 font-extrabold text-[16px] mb-4">
                          <span class="material-icons">computer</span>
                          Technical Skills
                      </div>
                      <div class="space-y-3">
                          @for (skill of technicalSkills; track skill) {
                              <div class="flex items-center gap-3 text-[13px] text-slate-700">
                                  <span class="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                                  {{ skill }}
                              </div>
                          }
                      </div>
                  </div>
                  
                  <!-- Life Skills -->
                  <div class="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 border border-purple-200">
                      <div class="flex items-center gap-2 text-purple-700 font-extrabold text-[16px] mb-4">
                          <span class="material-icons">psychology</span>
                          Life Skills
                      </div>
                      <div class="space-y-3">
                          @for (skill of lifeSkills; track skill) {
                              <div class="flex items-center gap-3 text-[13px] text-slate-700">
                                  <span class="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                                  {{ skill }}
                              </div>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ FEATURED PROJECTS ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#f8faff] to-white">
          <div class="max-w-5xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 mb-3">Student Work</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Featured Projects</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">Real projects built by real kids — proof that big ideas start young</p>
              </div>
              
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  @for (proj of featuredProjects; track proj.title; let i = $index) {
                      <div class="group bg-white rounded-2xl p-6 border border-slate-200 text-center opacity-0 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,30,92,0.12)] hover:border-yellow-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                           #projRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.08 }}s;">
                          
                          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]">
                              <span class="material-icons text-3xl text-yellow-600">{{ proj.icon }}</span>
                          </div>
                          
                          <h3 class="text-[13px] font-extrabold text-[#001e5c] mb-1.5">{{ proj.title }}</h3>
                          <p class="text-[11px] text-slate-600">{{ proj.sub }}</p>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ PARENT BENEFITS ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#001e5c] to-[#0d1b6e]">
          <div class="max-w-4xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-white/10 text-green-300 border border-green-400/30 mb-3">For Parents</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">Why Parents Choose ESIC</h2>
                  <p class="text-white/60 text-[15px] leading-relaxed max-w-2xl mx-auto">We've thought of everything so you don't have to worry</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (benefit of parentBenefits; track benefit; let i = $index) {
                      <div class="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl p-4 opacity-0 transition-all duration-500 hover:bg-white/20 hover:scale-[1.02] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                           #parentRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.06 }}s;">
                          
                          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                              <span class="material-icons text-white text-sm">check</span>
                          </div>
                          <span class="text-white/90 text-[13px] font-medium leading-relaxed">{{ benefit }}</span>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ TESTIMONIALS ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#f8faff] to-white">
          <div class="max-w-5xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-200 mb-3">What Parents Say</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Testimonials</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">Hear from families who have experienced the ESIC difference</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  @for (t of testimonials; track t.name; let i = $index) {
                      <div class="group bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,30,92,0.1)] hover:border-blue-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                           #testiRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.1 }}s;">
                          
                          <div class="text-6xl font-black leading-none mb-4" [style.color]="t.quoteColor">"</div>
                          <p class="text-[13px] text-slate-700 leading-relaxed italic mb-4">{{ t.text }}</p>
                          
                          <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                              <div class="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white flex-shrink-0" 
                                   [style.background]="t.avatarColor">
                                  {{ t.initials }}
                              </div>
                              <div>
                                  <div class="text-[13px] font-extrabold text-[#001e5c]">{{ t.name }}</div>
                                  <div class="text-[11px] text-slate-600">{{ t.role }}</div>
                              </div>
                          </div>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ FAQ ══ -->
      <section class="py-16 md:py-20 px-4 bg-white">
          <div class="max-w-2xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-purple-100 text-purple-700 border border-purple-200 mb-3">Got Questions?</div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Frequently Asked</h2>
              </div>
              
              <div class="space-y-3">
                  @for (faq of faqs; track faq.q; let i = $index) {
                      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-purple-300" 
                           [class.shadow-[0_8px_32px_rgba(0,30,92,0.08)]]="openFaq === i">
                          
                          <div class="flex items-center justify-between p-5 cursor-pointer gap-3 transition-colors duration-200 hover:bg-slate-50" 
                               (click)="toggleFaq(i)">
                              <span class="text-[14px] font-extrabold text-[#001e5c] flex-1">{{ faq.q }}</span>
                              <span class="material-icons text-purple-600 transition-transform duration-300" 
                                    [class.rotate-180]="openFaq === i">expand_more</span>
                          </div>
                          
                          <div class="overflow-hidden transition-all duration-300"
                               [style.max-height]="openFaq === i ? '200px' : '0'">
                              <div class="px-5 pb-5">
                                  <p class="text-[13px] text-slate-600 leading-relaxed">{{ faq.a }}</p>
                              </div>
                          </div>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ FINAL CTA ══ -->
      <section class="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-[#7c3aed] via-[#2563eb] to-[#0ea5e9] border-t-4 border-[#facc15] border-b-4 border-[#facc15]">
          <!-- Animated Orbs -->
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-4xl mx-auto text-center relative z-10">
              <div class="material-icons text-5xl text-[#facc15] block mb-6 animate-star-spin">stars</div>
              
              <h2 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4">
                  Start Your Child's<br />STEM Journey Today
              </h2>
              
              <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                  Give your child the opportunity to learn, create, and innovate through
                  exciting STEM activities at ESIC, Chuka University.
              </p>
              
              <div class="flex flex-wrap justify-center gap-4">
                  <a routerLink="/auth/register" 
                     class="inline-flex items-center gap-3 bg-[#facc15] text-[#0d1b6e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)]">
                      <span class="material-icons text-base">rocket_launch</span>
                      Register Now
                  </a>
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                      <span class="material-icons text-base">contact_mail</span>
                      Contact Us
                  </a>
              </div>
              
              <!-- Trust Badges -->
              <div class="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                  <div class="flex items-center gap-2 text-white/70 text-[12px]">
                      <span class="material-icons text-[#facc15] text-sm">verified</span>
                      Safe Learning Environment
                  </div>
                  <div class="flex items-center gap-2 text-white/70 text-[12px]">
                      <span class="material-icons text-[#facc15] text-sm">school</span>
                      Qualified STEM Instructors
                  </div>
                  <div class="flex items-center gap-2 text-white/70 text-[12px]">
                      <span class="material-icons text-[#facc15] text-sm">handshake</span>
                      Hands-On Activities
                  </div>
                  <div class="flex items-center gap-2 text-white/70 text-[12px]">
                      <span class="material-icons text-[#facc15] text-sm">emoji_events</span>
                      Age-Appropriate Learning
                  </div>
              </div>
          </div>
      </section>
  `,
})
export class EarlyStemComponent implements OnInit, AfterViewInit {
  @ViewChildren('whyRef') whyEls!: QueryList<ElementRef>;
  @ViewChildren('actRef') actEls!: QueryList<ElementRef>;
  @ViewChildren('journeyRef') journeyEls!: QueryList<ElementRef>;
  @ViewChildren('projRef') projEls!: QueryList<ElementRef>;
  @ViewChildren('parentRef') parentEls!: QueryList<ElementRef>;
  @ViewChildren('testiRef') testiEls!: QueryList<ElementRef>;
  
  heroImgError = false;
  openFaq = 0;
  
  whyCards = [
      {
          title: 'Science',
          icon: 'science',
          image: '/images/esic-science.jpeg',
          iconColor: '#2563eb',
          iconBg: '#eff6ff',
          desc: 'Explore nature, experiments, and fascinating discoveries that spark curiosity',
      },
      {
          title: 'Technology',
          icon: 'computer',
          image: '/images/esic-fun-coding.jpeg',
          iconColor: '#16a34a',
          iconBg: '#f0fdf4',
          desc: 'Learn basic computer skills and coding concepts through fun games and projects',
      },
      {
          title: 'Engineering',
          icon: 'settings',
          image: '/images/esic-experiments.jpeg',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'Build structures, machines, and creative projects that actually work',
      },
      {
          title: 'Mathematics',
          icon: 'calculate',
          image: '/images/esic-math.jpeg',
          iconColor: '#7c3aed',
          iconBg: '#faf5ff',
          desc: 'Develop problem-solving skills through puzzles, patterns, and logical thinking',
      },
  ];
  
  activities = [
      {
          title: 'Robotics for Kids',
          icon: 'smart_toy',
          image: '/images/esic-engineering.jpeg',
          iconColor: '#2563eb',
          iconBg: '#eff6ff',
          desc: 'Build and program simple robots that move, sense, and react to their environment',
      },
      {
          title: 'Fun Coding',
          icon: 'code',
          image: '/images/esic-coding.jpeg',
          iconColor: '#16a34a',
          iconBg: '#f0fdf4',
          desc: 'Scratch programming and beginner coding games that teach logic through creativity',
      },
      {
          title: 'Science Experiments',
          icon: 'science',
          image: '/images/esic-experiments.jpeg',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'Safe, exciting hands-on experiments that make science come alive in surprising ways',
      },
      {
          title: 'Creative Engineering',
          icon: 'architecture',
          image: '/images/esic-engineering.jpeg',
          iconColor: '#7c3aed',
          iconBg: '#faf5ff',
          desc: 'Build bridges, towers, and inventions using everyday materials and big ideas',
      },
      {
          title: 'Digital Creativity',
          icon: 'brush',
          image: '/images/esic-creativity.jpeg',
          iconColor: '#a16207',
          iconBg: '#fef9c3',
          desc: 'Animation, digital storytelling, and design that blend art and technology',
      },
      {
          title: 'STEM Challenges',
          icon: 'emoji_events',
          image: '/images/esic-challenges.jpeg',
          iconColor: '#be185d',
          iconBg: '#fce7f3',
          desc: 'Team competitions and puzzles that build collaboration, grit, and a love of winning',
      },
  ];
  
  journeySteps = [
      { label: 'Discover', weeks: 'Week 1–2', color: '#2563eb' },
      { label: 'Experiment', weeks: 'Week 3–4', color: '#7c3aed' },
      { label: 'Create', weeks: 'Week 5–6', color: '#ea580c' },
      { label: 'Innovate', weeks: 'Week 7–8', color: '#16a34a' },
      { label: 'Present', weeks: 'Week 9–10', color: '#ca8a04' },
  ];
  
  technicalSkills = [
      'Basic coding with Scratch & Python',
      'Robotics fundamentals & sensors',
      'Scientific observation & method',
      'Problem-solving & debugging',
      'Digital literacy & safety',
  ];
  
  lifeSkills = [
      'Teamwork & collaboration',
      'Creativity & imagination',
      'Communication & presentation',
      'Confidence & resilience',
      'Critical thinking & curiosity',
  ];
  
  featuredProjects = [
      { icon: 'traffic', title: 'Smart Traffic Light', sub: 'Logic, sensors & automation' },
      { icon: 'directions_car', title: 'Mini Robot Car', sub: 'Robotics & motor control' },
      { icon: 'gamepad', title: 'Interactive Story Game', sub: 'Built using Scratch' },
      { icon: 'volcano', title: 'Volcano Experiment', sub: 'Chemical reactions & science' },
  ];
  
  parentBenefits = [
      'Safe, supervised learning environment at every session',
      'Qualified, passionate STEM instructors and mentors',
      'Hands-on practical learning — never just theory',
      'Small learning groups for personal attention',
      'Encourages creativity, imagination, and self-expression',
      'Builds confidence through real achievements and showcases',
      'Prepares children for the technology-driven future',
      'Progress reports and family update sessions included',
  ];
  
  testimonials = [
      {
          text: "My son now wakes up excited to go to class. He built a robot car and won't stop talking about coding. ESIC changed everything for him.",
          name: 'Mary Wanjiku',
          role: 'Parent, Age 9',
          initials: 'MW',
          avatarColor: '#2563eb',
          quoteColor: '#bfdbfe',
      },
      {
          text: 'The robotics activities were amazing. My daughter was shy before, but now she presents her projects confidently. The instructors are wonderful.',
          name: 'James Kamau',
          role: 'Parent, Age 11',
          initials: 'JK',
          avatarColor: '#7c3aed',
          quoteColor: '#d8b4fe',
      },
      {
          text: "A wonderful introduction to technology and science. My twins learned teamwork, patience, and creativity. Best investment we've made as parents.",
          name: 'Alice Njeri',
          role: 'Parent, Ages 7 & 10',
          initials: 'AN',
          avatarColor: '#ea580c',
          quoteColor: '#fed7aa',
      },
  ];
  
  faqs = [
      {
          q: 'What age groups are accepted into the program?',
          a: 'Our Early STEM program accepts children between the ages of 6 and 12. We group students by age to ensure activities are age-appropriate and each child gets the most from the experience.',
      },
      {
          q: 'Do students need any prior experience?',
          a: 'Absolutely not! Our program is designed for complete beginners. We start from the very basics and gradually introduce more complex concepts as students gain confidence and skills.',
      },
      {
          q: 'What should students bring to sessions?',
          a: 'Students just need to bring their curiosity and enthusiasm! All kits, equipment, and materials are provided by ESIC. A notebook and pen are optional but encouraged for personal notes.',
      },
      {
          q: 'Are all classes practical and hands-on?',
          a: 'Yes — we believe children learn best by doing. At least 70% of every session is dedicated to hands-on activities, experiments, and building projects. Theory is kept brief and always linked to a practical task.',
      },
      {
          q: 'How long is the Early STEM program?',
          a: 'The standard program runs for 10 weeks with two sessions per week. Each session is 90 minutes long. We also offer intensive holiday programs and weekend workshops throughout the year.',
      },
  ];
  
  toggleFaq(index: number) {
      this.openFaq = this.openFaq === index ? -1 : index;
  }
  
  ngOnInit() {
      if (typeof document !== 'undefined') {
          setTimeout(() => {
              const host = document.getElementById('heroStarsHost');
              if (!host) return;
              for (let i = 0; i < 40; i++) {
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
      
      observe(this.whyEls, 100);
      observe(this.actEls, 80);
      observe(this.journeyEls, 150);
      observe(this.projEls, 100);
      observe(this.parentEls, 60);
      observe(this.testiEls, 120);
  }
}