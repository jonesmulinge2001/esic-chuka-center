import { Component, OnInit, signal, inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shimmer {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(251, 208, 29, 0.1); }
      50% { box-shadow: 0 0 40px rgba(251, 208, 29, 0.2); }
    }
    
    @keyframes float1 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-shimmer {
      animation: shimmer 3s linear infinite;
      background-size: 200% auto;
    }
    
    .animate-pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
    
    .animate-float1 {
      animation: float1 4s ease-in-out infinite;
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .detail-card {
      transition: all 0.3s ease;
    }
    
    .detail-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 26, 94, 0.08);
    }
    
    .tech-tag {
      background: rgba(0, 26, 94, 0.08);
      color: #001a5e;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 20px;
      letter-spacing: 0.04em;
      transition: all 0.3s ease;
    }
    
    .tech-tag:hover {
      background: #001a5e;
      color: white;
      transform: scale(1.05);
    }
    
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      padding: 6px 16px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    
    .status-badge.completed {
      background: rgba(34, 197, 94, 0.15);
      color: #16a34a;
    }
    
    .status-badge.in-progress {
      background: rgba(251, 208, 29, 0.15);
      color: #ca8a04;
    }
    
    .status-badge.prototype {
      background: rgba(124, 58, 237, 0.15);
      color: #7c3aed;
    }
    
    .status-badge .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    
    .status-badge.completed .dot {
      background: #16a34a;
    }
    
    .status-badge.in-progress .dot {
      background: #ca8a04;
    }
    
    .status-badge.prototype .dot {
      background: #7c3aed;
    }
    
    .gallery-image {
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    
    .gallery-image:hover {
      transform: scale(1.02);
    }
    
    .divider-gradient {
      height: 3px;
      background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
      width: 60px;
      border-radius: 2px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: #001a5e;
    }
    
    .related-project-card {
      transition: all 0.3s ease;
    }
    
    .related-project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 26, 94, 0.12);
    }
    
    .back-link {
      transition: all 0.3s ease;
    }
    
    .back-link:hover {
      transform: translateX(-4px);
      color: #fbd01d;
    }
  `],
  template: `
    @if (loading()) {
      <!-- Loading State -->
      <div class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3]">
        <div class="text-center text-white">
          <span class="material-icons text-5xl animate-pulse">auto_stories</span>
          <p class="text-white/60 mt-4 font-medium">Loading project details...</p>
        </div>
      </div>
    } @else if (project()) {
      <!-- ══ HERO SECTION ══ -->
      <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] py-16 md:py-20 px-4 border-b-[4px] border-[#fbd01d]">
        <!-- Animated Background -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div class="max-w-5xl mx-auto relative z-10">
          <!-- Back Link -->
          <a routerLink="/projects" 
             class="back-link inline-flex items-center gap-2 text-white/60 text-[14px] font-medium hover:text-white transition-colors mb-6">
            <span class="material-icons text-base">arrow_back</span>
            All Projects
          </a>
          
          <!-- Project Meta -->
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="text-[11px] font-bold bg-[#fbd01d] text-[#001a5e] px-4 py-1.5 rounded-full uppercase tracking-[0.06em]">
              {{ project().category }}
            </span>
            
            <span class="status-badge" [class]="project().status || 'completed'">
              <span class="dot"></span>
              {{ project().status || 'Completed' }}
            </span>
          </div>
          
          <!-- Title -->
          <h1 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4 animate-fade-in-up">
            {{ project().title }}
          </h1>
          
          <!-- Description -->
          <p class="text-white/70 text-[16px] leading-relaxed max-w-2xl">
            {{ project().description }}
          </p>
          
          <!-- Quick Info -->
          <div class="flex flex-wrap gap-6 mt-6 text-white/60 text-[13px]">
            @if (project().team) {
              <div class="flex items-center gap-2">
                <span class="material-icons text-[18px]">group</span>
                <span>Team: <span class="text-white font-medium">{{ project().team }}</span></span>
              </div>
            }
            @if (project().duration) {
              <div class="flex items-center gap-2">
                <span class="material-icons text-[18px]">schedule</span>
                <span>Duration: <span class="text-white font-medium">{{ project().duration }}</span></span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ══ MAIN CONTENT ══ -->
      <section class="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Column - Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Project Image -->
            @if (project().image) {
              <div class="rounded-2xl overflow-hidden bg-slate-100 shadow-lg border border-slate-200">
                <img [src]="project().image" 
                     [alt]="project().title" 
                     class="w-full h-auto max-h-[400px] object-cover">
              </div>
            }
            
            <!-- Full Description -->
            <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 detail-card">
              <h2 class="section-title flex items-center gap-2 mb-4">
                <span class="material-icons text-[#fbd01d]">description</span>
                Project Overview
              </h2>
              <div class="divider-gradient mb-4"></div>
              <p class="text-slate-600 leading-relaxed text-[15px]">
                {{ project().fullDescription || project().description }}
              </p>
            </div>
            
            <!-- Technologies -->
            @if (project().technologies?.length) {
              <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 detail-card">
                <h2 class="section-title flex items-center gap-2 mb-4">
                  <span class="material-icons text-[#fbd01d]">code</span>
                  Technologies Used
                </h2>
                <div class="divider-gradient mb-4"></div>
                <div class="flex flex-wrap gap-2">
                  @for (tech of project().technologies; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
              </div>
            }
            
            <!-- Team Members -->
            @if (project().teamMembers?.length) {
              <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 detail-card">
                <h2 class="section-title flex items-center gap-2 mb-4">
                  <span class="material-icons text-[#fbd01d]">groups</span>
                  Team Members
                </h2>
                <div class="divider-gradient mb-4"></div>
                <div class="grid sm:grid-cols-2 gap-3">
                  @for (member of project().teamMembers; track member) {
                    <div class="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#001a5e] to-[#094ed3] flex items-center justify-center text-white font-bold text-[14px]">
                        {{ member.charAt(0) }}
                      </div>
                      <span class="font-medium text-slate-700 text-[14px]">{{ member }}</span>
                    </div>
                  }
                </div>
              </div>
            }
            
            <!-- Key Features / Achievements -->
            @if (project().achievements?.length) {
              <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 detail-card">
                <h2 class="section-title flex items-center gap-2 mb-4">
                  <span class="material-icons text-[#fbd01d]">emoji_events</span>
                  Key Achievements
                </h2>
                <div class="divider-gradient mb-4"></div>
                <ul class="space-y-3">
                  @for (achievement of project().achievements; track achievement) {
                    <li class="flex items-start gap-3 text-slate-600 text-[14px]">
                      <span class="material-icons text-[#fbd01d] text-[18px] mt-0.5">verified</span>
                      <span>{{ achievement }}</span>
                    </li>
                  }
                </ul>
              </div>
            }
            
            <!-- Tags -->
            @if (project().tags?.length) {
              <div class="flex flex-wrap gap-2">
                @for (tag of project().tags; track tag) {
                  <span class="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-[11px] font-medium">
                    #{{ tag }}
                  </span>
                }
              </div>
            }
          </div>
          
          <!-- Right Column - Sidebar -->
          <div class="space-y-6">
            <!-- Quick Info Card -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 detail-card sticky top-6">
              <h3 class="font-bold text-[15px] text-slate-900 mb-4">Project Details</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <span class="material-icons text-[#fbd01d] text-[20px]">category</span>
                  <div>
                    <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">Category</div>
                    <div class="text-[14px] font-semibold text-slate-700">{{ project().category }}</div>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <span class="material-icons text-[#fbd01d] text-[20px]">flag</span>
                  <div>
                    <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">Status</div>
                    <div class="text-[14px] font-semibold text-slate-700 capitalize">{{ project().status || 'Completed' }}</div>
                  </div>
                </div>
                
                @if (project().team) {
                  <div class="flex items-start gap-3">
                    <span class="material-icons text-[#fbd01d] text-[20px]">group</span>
                    <div>
                      <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">Team Size</div>
                      <div class="text-[14px] font-semibold text-slate-700">{{ project().team }}</div>
                    </div>
                  </div>
                }
                
                @if (project().duration) {
                  <div class="flex items-start gap-3">
                    <span class="material-icons text-[#fbd01d] text-[20px]">schedule</span>
                    <div>
                      <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">Duration</div>
                      <div class="text-[14px] font-semibold text-slate-700">{{ project().duration }}</div>
                    </div>
                  </div>
                }
                
                @if (project().date) {
                  <div class="flex items-start gap-3">
                    <span class="material-icons text-[#fbd01d] text-[20px]">calendar_today</span>
                    <div>
                      <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">Date</div>
                      <div class="text-[14px] font-semibold text-slate-700">{{ project().date }}</div>
                    </div>
                  </div>
                }
              </div>
              
              <div class="mt-6 pt-6 border-t border-slate-200">
                <a routerLink="/contact" 
                   class="inline-flex items-center justify-center w-full gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[13px] px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-md">
                  <span class="material-icons text-base">send</span>
                  Inquire About This Project
                </a>
              </div>
            </div>
            
            <!-- Share Card -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200 detail-card">
              <h4 class="font-bold text-[13px] text-slate-900 mb-3">Share This Project</h4>
              <div class="flex gap-2">
                <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#001a5e] hover:text-white transition-colors">
                  <span class="material-icons text-[18px]">share</span>
                </button>
                <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#1877f2] hover:text-white transition-colors">
                  <span class="material-icons text-[18px]">facebook</span>
                </button>
                <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white transition-colors">
                  <span class="material-icons text-[18px]">twitter</span>
                </button>
                <button class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#0a66c2] hover:text-white transition-colors">
                  <span class="material-icons text-[18px]">linkedin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- ══ RELATED PROJECTS ══ -->
      @if (relatedProjects().length > 0) {
        <section class="py-12 md:py-16 px-4 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-[clamp(22px,2.5vw,32px)] font-black text-slate-900">Related Projects</h2>
                <p class="text-slate-500 text-[14px]">Explore similar innovations</p>
              </div>
              <a routerLink="/projects" 
                 class="text-[#001a5e] font-bold text-[13px] flex items-center gap-1 hover:gap-2 transition-all">
                View All
                <span class="material-icons text-base">arrow_forward</span>
              </a>
            </div>
            
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              @for (project of relatedProjects(); track project.id) {
                <a [routerLink]="['/projects', project.slug]" 
                   class="bg-white rounded-2xl overflow-hidden border border-slate-200 related-project-card group">
                  <div class="h-32 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                    @if (project.image) {
                      <img [src]="project.image" 
                           [alt]="project.title" 
                           class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500">
                    } @else {
                      <div class="h-full w-full flex items-center justify-center">
                        <span class="material-icons text-primary-300 text-4xl">{{ project.icon || 'science' }}</span>
                      </div>
                    }
                  </div>
                  <div class="p-4">
                    <h4 class="font-bold text-[13px] text-slate-900 group-hover:text-[#001a5e] transition-colors line-clamp-1">
                      {{ project.title }}
                    </h4>
                    <p class="text-[11px] text-slate-500 line-clamp-1">{{ project.category }}</p>
                  </div>
                </a>
              }
            </div>
          </div>
        </section>
      }
      
      <!-- ══ CTA SECTION ══ -->
      <section class="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-t-4 border-[#fbd01d]">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
        </div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <div class="w-16 h-16 rounded-2xl bg-[#fbd01d]/20 flex items-center justify-center mx-auto mb-6">
            <span class="material-icons text-3xl text-[#fbd01d]">rocket</span>
          </div>
          
          <h3 class="text-[clamp(24px,3vw,36px)] font-black text-white mb-3">
            Inspired by This Project?
          </h3>
          
          <p class="text-white/70 text-[15px] leading-relaxed max-w-xl mx-auto mb-6">
            Join ESIC and start your own innovation journey. We provide the tools, resources, and support you need.
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <a routerLink="/contact" 
               class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] hover:scale-105 transition-transform">
              <span class="material-icons text-base">send</span>
              Start Your Project
            </a>
            <a routerLink="/projects" 
               class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-colors">
              <span class="material-icons text-base">arrow_back</span>
              Browse All Projects
            </a>
          </div>
        </div>
      </section>
    } @else {
      <!-- Not Found -->
      <div class="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3]">
        <div class="text-center text-white">
          <span class="material-icons text-6xl block mb-4 text-white/30">science</span>
          <h2 class="text-3xl font-black mb-2">Project Not Found</h2>
          <p class="text-white/60">The project you're looking for doesn't exist or has been removed.</p>
          <a routerLink="/projects" 
             class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-bold text-[14px] px-6 py-3 rounded-full mt-6 hover:scale-105 transition-transform">
            <span class="material-icons text-base">arrow_back</span>
            Back to Projects
          </a>
        </div>
      </div>
    }
  `,
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  
  project = signal<any>(null);
  loading = signal(true);
  relatedProjects = signal<any[]>([]);
  
  @ViewChild('contentContainer') contentContainer!: ElementRef;

  // Sample projects data for related and fallback
  private sampleProjects = [
    {
      id: 1,
      slug: 'ai-powered-robot',
      title: 'AI-Powered Robot',
      category: 'Artificial Intelligence',
      image: '/images/projects/ai-robot.jpg',
      icon: 'smart_toy',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi'],
      team: '4 Students',
      status: 'completed',
      duration: '3 months',
      date: 'March 2026'
    },
    {
      id: 2,
      slug: 'autonomous-line-follower',
      title: 'Autonomous Line Follower',
      category: 'Robotics',
      image: '/images/projects/line-follower.jpg',
      icon: 'route',
      technologies: ['Arduino', 'C++', 'PID Control', 'IR Sensors'],
      team: '3 Students',
      status: 'completed',
      duration: '2 months',
      date: 'February 2026'
    },
    {
      id: 3,
      slug: 'smart-irrigation-system',
      title: 'Smart Irrigation System',
      category: 'Smart Agriculture',
      image: '/images/projects/smart-irrigation.jpg',
      icon: 'sprinkler',
      technologies: ['IoT', 'NodeMCU', 'Sensors', 'Cloud Computing'],
      team: '5 Students',
      status: 'in-progress',
      duration: '4 months',
      date: 'January 2026'
    },
    {
      id: 4,
      slug: 'solar-tracking-system',
      title: 'Solar Tracking System',
      category: 'Renewable Energy',
      image: '/images/projects/solar-tracker.jpg',
      icon: 'solar_power',
      technologies: ['Arduino', 'Servo Motors', 'LDR Sensors', 'Solar Panels'],
      team: '3 Students',
      status: 'completed',
      duration: '2 months',
      date: 'December 2025'
    },
    {
      id: 5,
      slug: 'plc-factory-automation',
      title: 'PLC-Based Factory Automation',
      category: 'Industrial Automation',
      image: '/images/projects/plc-automation.jpg',
      icon: 'precision_manufacturing',
      technologies: ['PLC', 'Ladder Logic', 'SCADA', 'Industrial Sensors'],
      team: '4 Students',
      status: 'prototype',
      duration: '6 months',
      date: 'November 2025'
    },
    {
      id: 6,
      slug: 'drone-applications',
      title: 'Drone Applications',
      category: 'Robotics',
      image: '/images/projects/drone.jpg',
      icon: 'flight',
      technologies: ['UAV', 'GPS', 'Computer Vision', 'Telemetry'],
      team: '6 Students',
      status: 'in-progress',
      duration: '5 months',
      date: 'October 2025'
    },
    {
      id: 7,
      slug: 'smart-home-system',
      title: 'Smart Home System',
      category: 'Internet of Things',
      image: '/images/projects/smart-home.jpg',
      icon: 'home_automation',
      technologies: ['ESP32', 'MQTT', 'Node-RED', 'AI Voice Control'],
      team: '3 Students',
      status: 'completed',
      duration: '3 months',
      date: 'September 2025'
    },
    {
      id: 8,
      slug: 'weather-monitoring-station',
      title: 'Weather Monitoring Station',
      category: 'IoT & Data Science',
      image: '/images/projects/weather-station.jpg',
      icon: 'cloud',
      technologies: ['Arduino', 'Sensors', 'Data Logging', 'Data Visualization'],
      team: '2 Students',
      status: 'completed',
      duration: '2 months',
      date: 'August 2025'
    },
    {
      id: 9,
      slug: 'iot-energy-meter',
      title: 'IoT Energy Meter',
      category: 'Internet of Things',
      image: '/images/projects/energy-meter.jpg',
      icon: 'bolt',
      technologies: ['IoT', 'ESP8266', 'Current Sensors', 'Cloud Analytics'],
      team: '4 Students',
      status: 'prototype',
      duration: '4 months',
      date: 'July 2025'
    },
    {
      id: 10,
      slug: 'reinforcement-learning-cartpole',
      title: 'Reinforcement Learning CartPole',
      category: 'Machine Learning',
      image: '/images/projects/cartpole.jpg',
      icon: 'model_training',
      technologies: ['Python', 'OpenAI Gym', 'Deep Learning', 'Reinforcement Learning'],
      team: '2 Students',
      status: 'completed',
      duration: '2 months',
      date: 'June 2025'
    },
    {
      id: 11,
      slug: 'digital-control-experiments',
      title: 'Digital Control Experiments',
      category: 'Control Systems',
      image: '/images/projects/digital-control.jpg',
      icon: 'settings',
      technologies: ['MATLAB', 'Simulink', 'Arduino', 'PID Control'],
      team: '3 Students',
      status: 'completed',
      duration: '3 months',
      date: 'May 2025'
    },
    {
      id: 12,
      slug: 'ev-charging-demonstrator',
      title: 'Electric Vehicle Charging Demonstrator',
      category: 'Power Electronics',
      image: '/images/projects/ev-charging.jpg',
      icon: 'electric_car',
      technologies: ['Power Electronics', 'EV', 'Smart Grid', 'BMS'],
      team: '5 Students',
      status: 'prototype',
      duration: '6 months',
      date: 'April 2025'
    }
  ];

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    
    // First check if it's one of our sample projects
    const sampleProject = this.sampleProjects.find(p => p.slug === slug);
    
    if (sampleProject) {
      // Build a full project detail from sample data
      this.project.set({
        ...sampleProject,
        fullDescription: `${sampleProject.title} is an innovative project developed by ESIC students. This project demonstrates cutting-edge technology in the field of ${sampleProject.category}. The team worked collaboratively to design, develop, and implement a working prototype that addresses real-world challenges.`,
        teamMembers: [
          'Dr. Sarah Kamau (Supervisor)',
          'John Mwangi (Team Lead)',
          'Mary Wanjiru (Researcher)',
          'Peter Ochieng (Developer)',
          'Grace Atieno (Designer)'
        ],
        achievements: [
          'Successfully completed within the project timeline',
          'Presented at the ESIC Annual Research Conference',
          'Received positive feedback from industry experts',
          'Demonstrated practical application in real-world scenarios'
        ],
        tags: ['engineering', 'innovation', 'research', 'STEM', 'prototype']
      });
      this.loading.set(false);
      this.getRelatedProjects(slug);
      return;
    }
    
    // If not a sample, try API
    this.api.get<any>(`/projects/${slug}`).subscribe({
      next: (data) => {
        if (data) {
          // Ensure data has all required fields
          this.project.set({
            ...data,
            fullDescription: data.fullDescription || data.description,
            teamMembers: data.teamMembers || ['Student Team'],
            technologies: data.technologies || [],
            achievements: data.achievements || [],
            status: data.status || 'completed'
          });
          this.loading.set(false);
          this.getRelatedProjects(slug);
        } else {
          this.loading.set(false);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  getRelatedProjects(currentSlug: string) {
    // Get projects from the same category or random
    const current = this.project();
    if (!current) return;
    
    const related = this.sampleProjects
      .filter(p => p.slug !== currentSlug && p.category === current.category)
      .slice(0, 3);
    
    // If not enough related by category, fill with random
    if (related.length < 3) {
      const extra = this.sampleProjects
        .filter(p => p.slug !== currentSlug && !related.some(r => r.slug === p.slug))
        .slice(0, 3 - related.length);
      related.push(...extra);
    }
    
    this.relatedProjects.set(related);
  }

  ngAfterViewInit() {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}