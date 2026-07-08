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
  selector: 'app-learning-resources',
  imports: [RouterLink],
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
          
          @keyframes badgePulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
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
          
          .animate-badge-pulse {
              animation: badgePulse 2s ease-in-out infinite;
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
          
          .resource-card {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .resource-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
          }
          
          .icon-check {
              color: #22c55e;
          }
          
          .category-badge {
              background: rgba(251, 208, 29, 0.15);
              color: #fbd01d;
              border: 1px solid rgba(251, 208, 29, 0.3);
          }
          
          .resource-icon {
              transition: all 0.3s ease;
          }
          
          .resource-card:hover .resource-icon {
              transform: scale(1.1) rotate(-5deg);
          }
          
          .divider-gradient {
              height: 4px;
              background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
              width: 80px;
              margin: 0 auto;
              border-radius: 2px;
          }
      `
  ],
  template: `
      <!-- ══ HERO SECTION ══ -->
      <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] min-h-[480px] flex items-center py-16 border-b-[4px] border-[#fbd01d]">
          <!-- Animated Background Particles -->
          <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
          
          <!-- Floating Gradient Orbs -->
          <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div class="grid lg:grid-cols-2 gap-12 items-center">
                  <!-- Left Content -->
                  <div class="space-y-6 animate-fade-in-up">
                     
                      
                      <h1 class="text-[clamp(38px,5.5vw,64px)] font-black text-white leading-[1.05]">
                          Complete Learning<br />
                          <span class="bg-gradient-to-r from-[#fbd01d] via-[#fdd835] to-[#fbd01d] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Resource Suite</span>
                      </h1>
                      
                      <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                          Every ESIC product includes a complete learning ecosystem with comprehensive resources for both students and teachers — all designed to enhance the educational experience.
                      </p>
                      
                      <!-- Buttons -->
                      <div class="flex flex-wrap gap-4 pt-2">
                          <a routerLink="/contact" 
                             class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)] animate-hero-pulse">
                              <span class="material-icons text-base">download</span>
                              Download Brochure
                          </a>
                          <a routerLink="/contact" 
                             class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                              <span class="material-icons text-base">preview</span>
                              View Samples
                          </a>
                      </div>
                  </div>
                  
                  <!-- Right Visual -->
                  <div class="hidden lg:flex relative justify-center items-center">
                      <div class="relative">
                          <!-- Floating Icons -->
                          <div class="absolute -top-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#fbd01d] text-2xl animate-float1">
                              <span class="material-icons">menu_book</span>
                          </div>
                          <div class="absolute -top-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.6s;">
                              <span class="material-icons">quiz</span>
                          </div>
                          <div class="absolute -bottom-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-purple-400 text-2xl animate-float3" style="animation-delay: 0.9s;">
                              <span class="material-icons">simulation</span>
                          </div>
                          <div class="absolute -bottom-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-green-400 text-2xl animate-float1" style="animation-delay: 1.2s;">
                              <span class="material-icons">workspace_premium</span>
                          </div>
                          <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-yellow-400 text-2xl animate-float2" style="animation-delay: 0.3s;">
                              <span class="material-icons">qr_code_scanner</span>
                          </div>
                          
                          <!-- Main Card -->
                          <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                              <div class="relative bg-gradient-to-br from-blue-600/30 to-purple-400/20 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                  <div class="absolute inset-0 bg-gradient-to-t from-[#001a5e]/50 to-transparent"></div>
                                  <div class="relative z-10 text-center text-white">
                                      <span class="material-icons text-6xl text-[#fbd01d]">auto_stories</span>
                                      <p class="text-sm font-bold mt-2 text-white/80">Complete Learning Ecosystem</p>
                                      <div class="flex justify-center gap-4 mt-3">
                                          <span class="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full">Students</span>
                                          <span class="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full">Teachers</span>
                                      </div>
                                  </div>
                                  <div class="absolute inset-0 animate-image-zoom bg-gradient-to-br from-blue-500/10 to-purple-400/5"></div>
                              </div>
                              <div class="mt-4 bg-gradient-to-r from-[#fbd01d] to-[#fdd835] text-[#001a5e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg">
                                  <span class="material-icons text-sm">verified</span>
                                  8 RESOURCES FOR STUDENTS • 6 FOR TEACHERS
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ STUDENT RESOURCES ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">
                      <span class="material-icons align-middle text-[14px] mr-1">school</span>
                      For Students
                  </div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Student Learning Resources</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Comprehensive materials designed to engage, educate, and empower students throughout their learning journey</p>
                  <div class="divider-gradient mt-4"></div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  @for (resource of studentResources; track resource.title; let i = $index) {
                      <div class="bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-[#fbd01d] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up resource-card" 
                           #studentRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.1 }}s;">
                          
                          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" 
                               [style.background]="resource.iconBg">
                              <span class="material-icons text-[26px]" [style.color]="resource.iconColor">{{ resource.icon }}</span>
                          </div>
                          
                          <h3 class="text-[15px] font-extrabold text-slate-900 mb-1">{{ resource.title }}</h3>
                          <p class="text-[12px] text-slate-600 leading-relaxed">{{ resource.desc }}</p>
                          
                          <div class="mt-3 flex items-center gap-1 text-[11px] font-semibold text-green-600">
                              <span class="material-icons text-[14px]">check_circle</span>
                              <span>Included</span>
                          </div>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ TEACHER RESOURCES ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-100 to-slate-50">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
                      <span class="material-icons align-middle text-[14px] mr-1">teaching</span>
                      For Teachers
                  </div>
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Teacher Support Resources</h2>
                  <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Everything educators need to deliver effective lessons, assess progress, and enhance classroom instruction</p>
                  <div class="divider-gradient mt-4"></div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  @for (resource of teacherResources; track resource.title; let i = $index) {
                      <div class="bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-[#fbd01d] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up resource-card" 
                           #teacherRef [attr.data-index]="i"
                           style="animation-delay: {{ i * 0.1 }}s;">
                          
                          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" 
                               [style.background]="resource.iconBg">
                              <span class="material-icons text-[26px]" [style.color]="resource.iconColor">{{ resource.icon }}</span>
                          </div>
                          
                          <h3 class="text-[15px] font-extrabold text-slate-900 mb-1">{{ resource.title }}</h3>
                          <p class="text-[12px] text-slate-600 leading-relaxed">{{ resource.desc }}</p>
                          
                          <div class="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
                              <span class="material-icons text-[14px]">check_circle</span>
                              <span>Included</span>
                          </div>
                      </div>
                  }
              </div>
          </div>
      </section>
      
      <!-- ══ COMPARISON / VALUE PROPOSITION ══ -->
      <section class="py-16 md:py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3]">
          <div class="max-w-7xl mx-auto">
              <div class="text-center mb-12">
                  <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">A Complete Ecosystem for Success</h2>
                  <p class="text-white/70 text-[15px] leading-relaxed mx-auto max-w-2xl">All resources work together to create a seamless learning experience</p>
              </div>
              
              <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <!-- Student Column -->
                  <div class="glass-effect rounded-2xl p-8 border border-white/10">
                      <div class="flex items-center gap-3 mb-6">
                          <span class="material-icons text-3xl text-[#fbd01d]">school</span>
                          <h3 class="text-xl font-bold text-white">Student Resources</h3>
                      </div>
                      <ul class="space-y-3">
                          @for (item of studentResources; track item.title) {
                              <li class="flex items-start gap-3 text-white/80 text-[14px]">
                                  <span class="material-icons text-[#fbd01d] text-[18px] mt-0.5">check_circle</span>
                                  <span><span class="font-bold text-white">{{ item.title }}</span> — {{ item.desc }}</span>
                              </li>
                          }
                      </ul>
                      <div class="mt-6 pt-6 border-t border-white/10">
                          <div class="bg-[#fbd01d]/10 rounded-xl px-4 py-3 text-center">
                              <span class="text-white font-bold text-[13px]">🎯 8 Comprehensive Resources</span>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Teacher Column -->
                  <div class="glass-effect rounded-2xl p-8 border border-white/10">
                      <div class="flex items-center gap-3 mb-6">
                          <span class="material-icons text-3xl text-[#fbd01d]">teaching</span>
                          <h3 class="text-xl font-bold text-white">Teacher Resources</h3>
                      </div>
                      <ul class="space-y-3">
                          @for (item of teacherResources; track item.title) {
                              <li class="flex items-start gap-3 text-white/80 text-[14px]">
                                  <span class="material-icons text-[#fbd01d] text-[18px] mt-0.5">check_circle</span>
                                  <span><span class="font-bold text-white">{{ item.title }}</span> — {{ item.desc }}</span>
                              </li>
                          }
                      </ul>
                      <div class="mt-6 pt-6 border-t border-white/10">
                          <div class="bg-[#fbd01d]/10 rounded-xl px-4 py-3 text-center">
                              <span class="text-white font-bold text-[13px]">📚 6 Comprehensive Resources</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <!-- ══ FINAL CTA ══ -->
      <section class="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800 border-t-4 border-[#fbd01d]">
          <!-- Animated Orbs -->
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div class="max-w-4xl mx-auto text-center relative z-10">
              <div class="material-icons text-5xl text-[#fbd01d] block mb-6 animate-star-spin">auto_stories</div>
              
              <h2 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4">
                  Ready to Access These Resources?
              </h2>
              
              <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                  Every ESIC product includes this complete learning ecosystem. Contact us to learn more about our comprehensive educational solutions.
              </p>
              
              <div class="flex flex-wrap justify-center gap-4">
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
                      <span class="material-icons text-base">request_quote</span>
                      Request Demo
                  </a>
                  <a routerLink="/contact" 
                     class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                      <span class="material-icons text-base">contact_mail</span>
                      Contact Us
                  </a>
              </div>
              
              <div class="mt-8 flex justify-center gap-6 text-white/50 text-[12px]">
                  <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">verified</span>
                      Included with every product
                  </span>
                  <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">update</span>
                      Regularly updated
                  </span>
              </div>
          </div>
      </section>
  `,
})
export class ResourcesComponent implements OnInit, AfterViewInit {
  @ViewChildren('studentRef') studentEls!: QueryList<ElementRef>;
  @ViewChildren('teacherRef') teacherEls!: QueryList<ElementRef>;
  
  studentResources = [
      {
          title: 'Experiment Manual',
          icon: 'menu_book',
          iconColor: '#2563eb',
          iconBg: '#dbeafe',
          desc: 'Detailed step-by-step guides for conducting experiments and practical activities.',
      },
      {
          title: 'Video Tutorials',
          icon: 'play_circle',
          iconColor: '#dc2626',
          iconBg: '#fee2e2',
          desc: 'Engaging video content demonstrating key concepts and procedures.',
      },
      {
          title: 'Interactive Simulations',
          icon: 'simulation',
          iconColor: '#7c3aed',
          iconBg: '#ede9fe',
          desc: 'Hands-on digital simulations for exploring complex concepts safely.',
      },
      {
          title: 'QR Codes',
          icon: 'qr_code_scanner',
          iconColor: '#0891b2',
          iconBg: '#cffafe',
          desc: 'Quick-access codes linking to supplementary resources and materials.',
      },
      {
          title: 'Worksheets',
          icon: 'assignment',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'Structured activities for reinforcing learning and practicing skills.',
      },
      {
          title: 'Quizzes',
          icon: 'quiz',
          iconColor: '#be123c',
          iconBg: '#ffe4e6',
          desc: 'Formative and summative assessments to track understanding.',
      },
      {
          title: 'Practical Assessments',
          icon: 'engineering',
          iconColor: '#15803d',
          iconBg: '#dcfce7',
          desc: 'Hands-on evaluation tasks measuring practical skills and competencies.',
      },
      {
          title: 'Digital Certificates',
          icon: 'workspace_premium',
          iconColor: '#ca8a04',
          iconBg: '#fef9c3',
          desc: 'Verifiable credentials recognizing student achievement and completion.',
      },
  ];
  
  teacherResources = [
      {
          title: 'Lesson Plans',
          icon: 'planner_review',
          iconColor: '#2563eb',
          iconBg: '#dbeafe',
          desc: 'Comprehensive guides for structuring effective learning sessions.',
      },
      {
          title: 'Laboratory Guides',
          icon: 'science',
          iconColor: '#15803d',
          iconBg: '#dcfce7',
          desc: 'Technical documentation for setting up and managing lab activities.',
      },
      {
          title: 'Marking Schemes',
          icon: 'grading',
          iconColor: '#7c3aed',
          iconBg: '#ede9fe',
          desc: 'Clear criteria for consistent and fair student assessment.',
      },
      {
          title: 'Classroom Activities',
          icon: 'group_work',
          iconColor: '#ea580c',
          iconBg: '#fff7ed',
          desc: 'Engaging group and individual exercises for active learning.',
      },
      {
          title: 'PowerPoint Slides',
          icon: 'presentation',
          iconColor: '#be123c',
          iconBg: '#ffe4e6',
          desc: 'Ready-to-use presentations for effective classroom instruction.',
      },
      {
          title: 'Training Workshops',
          icon: 'workshops',
          iconColor: '#0891b2',
          iconBg: '#cffafe',
          desc: 'Professional development sessions for educators and staff.',
      },
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
      
      observe(this.studentEls, 80);
      observe(this.teacherEls, 80);
  }
}