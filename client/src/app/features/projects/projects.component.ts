import { Component, OnInit, signal, inject, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, PaginatedResult } from '../../core/services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, CommonModule],
  styles: [`
    @keyframes float1 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(3deg); }
    }
    
    @keyframes float2 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-2deg); }
    }
    
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
    
    @keyframes rotateSlow {
      to { transform: rotate(360deg); }
    }
    
    @keyframes imageZoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }
    
    .animate-float1 { animation: float1 4s ease-in-out infinite; }
    .animate-float2 { animation: float2 3.5s ease-in-out infinite; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-shimmer { animation: shimmer 3s linear infinite; background-size: 200% auto; }
    .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
    .animate-rotate-slow { animation: rotateSlow 20s linear infinite; }
    .animate-image-zoom { animation: imageZoom 8s ease-in-out infinite alternate; }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .research-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .research-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    
    .research-icon {
      transition: transform 0.3s ease;
    }
    
    .research-card:hover .research-icon {
      transform: scale(1.15) rotate(-5deg);
    }
    
    .project-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 64px rgba(0, 26, 94, 0.15);
    }
    
    .project-card .project-image {
      transition: transform 0.6s ease;
    }
    
    .project-card:hover .project-image {
      transform: scale(1.05);
    }
    
    .category-badge {
      background: rgba(251, 208, 29, 0.15);
      color: #fbd01d;
      border: 1px solid rgba(251, 208, 29, 0.3);
    }
    
    .stats-number {
      font-size: clamp(28px, 3.5vw, 42px);
      font-weight: 900;
      background: linear-gradient(135deg, #fbd01d, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .divider-gradient {
      height: 4px;
      background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
      width: 80px;
      margin: 0 auto;
      border-radius: 2px;
    }
    
    .research-grid-item {
      opacity: 0;
    }
    
    .research-grid-item.visible {
      opacity: 1;
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .tech-tag {
      background: rgba(0, 26, 94, 0.08);
      color: #001a5e;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 20px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    
    .project-status {
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 9px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    
    .project-status.completed {
      background: rgba(34, 197, 94, 0.9);
      color: white;
    }
    
    .project-status.in-progress {
      background: rgba(251, 208, 29, 0.9);
      color: #001a5e;
    }
    
    .project-status.prototype {
      background: rgba(124, 58, 237, 0.9);
      color: white;
    }
  `],
  template: `
    <!-- ══ HERO SECTION ══ -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] py-20 px-4 border-b-[4px] border-[#fbd01d]">
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-rotate-slow"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-rotate-slow" style="animation-duration: 30s;"></div>
      </div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="inline-block category-badge px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase mb-4">
          <span class="material-icons align-middle text-[14px] mr-1">biotech</span>
          Research & Innovation
        </div>
        
        <h1 class="text-[clamp(38px,5.5vw,56px)] font-black text-white leading-[1.05] mb-4">
          Projects & Research
        </h1>
        
        <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto">
          Student innovations, research initiatives, and engineering prototypes solving real-world challenges
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">12+</div>
            <div class="text-[11px] text-white/50 font-medium">Active Projects</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">14</div>
            <div class="text-[11px] text-white/50 font-medium">Research Areas</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">45+</div>
            <div class="text-[11px] text-white/50 font-medium">Students Involved</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">3</div>
            <div class="text-[11px] text-white/50 font-medium">Patent Filings</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ PROJECT SHOWCASE ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">rocket</span>
            Featured Projects
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Innovative Student Projects</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Explore our collection of student-led engineering innovations and research prototypes
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <!-- Featured Projects Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of featuredProjects; track project.id) {
            <a [routerLink]="['/projects', project.slug]" 
               class="bg-white rounded-2xl overflow-hidden border border-slate-200 project-card group">
              <div class="relative h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                @if (project.image) {
                  <img [src]="project.image" 
                       [alt]="project.title" 
                       class="h-full w-full object-cover project-image">
                } @else {
                  <div class="h-full w-full flex items-center justify-center">
                    <span class="material-icons text-primary-300 text-7xl">{{ project.icon || 'science' }}</span>
                  </div>
                }
                
                <!-- Status Badge -->
                <span class="project-status" [class]="project.status">
                  {{ project.status }}
                </span>
                
                <!-- Category Badge -->
                <span class="absolute top-3 right-3 text-[9px] font-bold bg-[#fbd01d] text-[#001a5e] px-3 py-1 rounded-full shadow-md">
                  {{ project.category }}
                </span>
              </div>
              
              <div class="p-5">
                <h3 class="font-display font-bold text-[15px] text-slate-900 group-hover:text-[#001a5e] transition-colors mb-2">
                  {{ project.title }}
                </h3>
                <p class="text-[13px] text-slate-500 line-clamp-2 mb-3">
                  {{ project.description }}
                </p>
                
                <!-- Tech Tags -->
                <div class="flex flex-wrap gap-1.5 mb-3">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
                
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2 text-slate-400">
                    <span class="material-icons text-[14px]">group</span>
                    <span>{{ project.team }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-[#001a5e] font-medium">
                    <span>Learn More</span>
                    <span class="material-icons text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- ══ INNOVATION SECTION ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-100 to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">lightbulb</span>
            Innovation Beyond the Classroom
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Solving Real-World Challenges</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Our research focuses on solving real-world engineering challenges while creating educational technologies for future innovators
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <!-- Research Areas Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          @for (area of researchAreas; track area.name; let i = $index) {
            <div class="research-card bg-white rounded-2xl p-5 border border-slate-200 text-center research-grid-item"
                 #researchRef [attr.data-index]="i"
                 style="animation-delay: {{ i * 0.04 }}s;">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 research-icon"
                   [style.background]="area.bg">
                <span class="material-icons text-[26px]" [style.color]="area.color">{{ area.icon }}</span>
              </div>
              <h4 class="text-[13px] font-extrabold text-slate-900">{{ area.name }}</h4>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ PROJECT HIGHLIGHTS ══ -->
    <section class="relative overflow-hidden py-16 md:py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-[clamp(24px,3vw,36px)] font-black text-white mb-3">Why ESIC Projects Stand Out</h2>
          <p class="text-white/60 text-[15px] max-w-2xl mx-auto">Each project combines theoretical knowledge with practical application</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="glass-effect rounded-2xl p-8 text-center border border-white/10">
            <span class="material-icons text-4xl text-[#fbd01d] block mb-4">lightbulb</span>
            <h4 class="text-white font-bold text-[18px] mb-2">Real-World Impact</h4>
            <p class="text-white/60 text-[13px] leading-relaxed">
              Solutions addressing real engineering challenges in Kenya and beyond
            </p>
          </div>
          
          <div class="glass-effect rounded-2xl p-8 text-center border border-white/10">
            <span class="material-icons text-4xl text-[#fbd01d] block mb-4">psychology</span>
            <h4 class="text-white font-bold text-[18px] mb-2">Educational Technology</h4>
            <p class="text-white/60 text-[13px] leading-relaxed">
              Creating technologies that enhance learning for future innovators
            </p>
          </div>
          
          <div class="glass-effect rounded-2xl p-8 text-center border border-white/10">
            <span class="material-icons text-4xl text-[#fbd01d] block mb-4">handshake</span>
            <h4 class="text-white font-bold text-[18px] mb-2">Industry Collaboration</h4>
            <p class="text-white/60 text-[13px] leading-relaxed">
              Partnering with industry to solve practical engineering challenges
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ ALL PROJECTS GRID ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-green-50 text-green-700 mb-2">
              <span class="material-icons align-middle text-[14px] mr-1">engineering</span>
              Complete Project List
            </div>
            <h2 class="text-[clamp(24px,3vw,36px)] font-black text-slate-900">All Student Projects</h2>
          </div>
          <span class="text-[13px] text-slate-500 font-medium">{{ allProjects.length }} projects</span>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (project of allProjects; track project.id) {
            <a [routerLink]="['/projects', project.slug]" 
               class="bg-white rounded-2xl overflow-hidden border border-slate-200 project-card group">
              <div class="relative h-36 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                @if (project.image) {
                  <img [src]="project.image" 
                       [alt]="project.title" 
                       class="h-full w-full object-cover project-image">
                } @else {
                  <div class="h-full w-full flex items-center justify-center">
                    <span class="material-icons text-primary-300 text-5xl">{{ project.icon || 'science' }}</span>
                  </div>
                }
                <span class="absolute top-2 right-2 text-[8px] font-bold bg-[#fbd01d] text-[#001a5e] px-2 py-0.5 rounded-full">
                  {{ project.category }}
                </span>
              </div>
              
              <div class="p-4">
                <h4 class="font-bold text-[13px] text-slate-900 group-hover:text-[#001a5e] transition-colors line-clamp-1">
                  {{ project.title }}
                </h4>
                <div class="flex flex-wrap gap-1 mt-2">
                  @for (tech of project.technologies.slice(0, 2); track tech) {
                    <span class="tech-tag text-[8px]">{{ tech }}</span>
                  }
                  @if (project.technologies.length > 2) {
                    <span class="tech-tag text-[8px]">+{{ project.technologies.length - 2 }}</span>
                  }
                </div>
              </div>
            </a>
          }
        </div>

        <!-- View All CTA -->
        <div class="text-center mt-10">
          <a routerLink="/projects/all" 
             class="inline-flex items-center gap-2 bg-[#001a5e] text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-[#012a8a] transition-colors shadow-lg">
            View All Projects
            <span class="material-icons text-base">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ══ FINAL CTA ══ -->
    <section class="py-16 px-4 bg-gradient-to-b from-slate-100 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <div class="w-16 h-16 rounded-2xl bg-[#fbd01d]/10 flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-3xl text-[#fbd01d]">add_comment</span>
        </div>
        
        <h3 class="text-[clamp(24px,3vw,36px)] font-black text-slate-900 mb-3">
          Have a Research Idea?
        </h3>
        
        <p class="text-slate-600 text-[15px] leading-relaxed max-w-xl mx-auto mb-6">
          We're always looking for passionate students and researchers to join our innovation community
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/contact" 
             class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] hover:scale-105 transition-transform">
            <span class="material-icons text-base">send</span>
            Submit Your Idea
          </a>
          <a routerLink="/research" 
             class="inline-flex items-center gap-2 bg-white text-[#001a5e] font-bold text-[14px] px-8 py-4 rounded-full border-2 border-[#001a5e] hover:bg-slate-50 transition-colors">
            <span class="material-icons text-base">menu_book</span>
            View Research Areas
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);
  projects = signal<any[]>([]);
  loading = signal(true);
  
  @ViewChildren('researchRef') researchEls!: QueryList<ElementRef>;

  // Featured Projects - Main showcase
  featuredProjects = [
    {
      id: 1,
      slug: 'ai-powered-robot',
      title: 'AI-Powered Robot',
      description: 'An autonomous robot using computer vision and machine learning for navigation and object recognition',
      category: 'Artificial Intelligence',
      status: 'completed',
      team: '4 Students',
      image: '/images/ai-robot.jpg',
      icon: 'smart_toy',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Raspberry Pi']
    },
    {
      id: 2,
      slug: 'autonomous-line-follower',
      title: 'Autonomous Line Follower',
      description: 'Advanced line-following robot with PID control and obstacle detection for educational applications',
      category: 'Robotics',
      status: 'completed',
      team: '3 Students',
      image: '/images/line-follower.jpg',
      icon: 'route',
      technologies: ['Arduino', 'C++', 'PID Control', 'IR Sensors']
    },
    {
      id: 3,
      slug: 'smart-irrigation-system',
      title: 'Smart Irrigation System',
      description: 'IoT-based precision agriculture system using soil moisture sensors and automated water management',
      category: 'Smart Agriculture',
      status: 'in-progress',
      team: '5 Students',
      image: '/images/smart-irrigation.jpg',
      icon: 'sprinkler',
      technologies: ['IoT', 'NodeMCU', 'Sensors', 'Cloud Computing']
    },
    {
      id: 4,
      slug: 'solar-tracking-system',
      title: 'Solar Tracking System',
      description: 'Dual-axis solar tracker maximizing solar panel efficiency using light sensors and servo motors',
      category: 'Renewable Energy',
      status: 'completed',
      team: '3 Students',
      image: '/images/solar-tracker.jpg',
      icon: 'solar_power',
      technologies: ['Arduino', 'Servo Motors', 'LDR Sensors', 'Solar Panels']
    },
    {
      id: 5,
      slug: 'plc-factory-automation',
      title: 'PLC-Based Factory Automation',
      description: 'Industrial automation system using PLCs for conveyor belt control, sorting, and process monitoring',
      category: 'Industrial Automation',
      status: 'prototype',
      team: '4 Students',
      image: '/images/plc-automation.jpg',
      icon: 'precision_manufacturing',
      technologies: ['PLC', 'Ladder Logic', 'SCADA', 'Industrial Sensors']
    },
    // {
    //   id: 6,
    //   slug: 'drone-applications',
    //   title: 'Drone Applications',
    //   description: 'Research on drone applications for surveillance, delivery, and agricultural monitoring',
    //   category: 'Robotics',
    //   status: 'in-progress',
    //   team: '6 Students',
    //   image: '/images/projects/drone.jpg',
    //   icon: 'flight',
    //   technologies: ['UAV', 'GPS', 'Computer Vision', 'Telemetry']
    // },
    // {
    //   id: 7,
    //   slug: 'smart-home-system',
    //   title: 'Smart Home System',
    //   description: 'Complete home automation system with voice control, energy monitoring, and security features',
    //   category: 'Internet of Things',
    //   status: 'completed',
    //   team: '3 Students',
    //   image: '/images/projects/smart-home.jpg',
    //   icon: 'home_automation',
    //   technologies: ['ESP32', 'MQTT', 'Node-RED', 'AI Voice Control']
    // },
    // {
    //   id: 8,
    //   slug: 'weather-monitoring-station',
    //   title: 'Weather Monitoring Station',
    //   description: 'Automated weather station collecting and analyzing real-time meteorological data',
    //   category: 'IoT & Data Science',
    //   status: 'completed',
    //   team: '2 Students',
    //   image: '/images/projects/weather-station.jpg',
    //   icon: 'cloud',
    //   technologies: ['Arduino', 'Sensors', 'Data Logging', 'Data Visualization']
    // },
    // {
    //   id: 9,
    //   slug: 'iot-energy-meter',
    //   title: 'IoT Energy Meter',
    //   description: 'Smart energy monitoring system for real-time electricity consumption tracking and analysis',
    //   category: 'Internet of Things',
    //   status: 'prototype',
    //   team: '4 Students',
    //   image: '/images/projects/energy-meter.jpg',
    //   icon: 'bolt',
    //   technologies: ['IoT', 'ESP8266', 'Current Sensors', 'Cloud Analytics']
    // },
    // {
    //   id: 10,
    //   slug: 'reinforcement-learning-cartpole',
    //   title: 'Reinforcement Learning CartPole',
    //   description: 'Implementation of reinforcement learning algorithms to solve the classic CartPole balancing problem',
    //   category: 'Machine Learning',
    //   status: 'completed',
    //   team: '2 Students',
    //   image: '/images/projects/cartpole.jpg',
    //   icon: 'model_training',
    //   technologies: ['Python', 'OpenAI Gym', 'Deep Learning', 'Reinforcement Learning']
    // },
    // {
    //   id: 11,
    //   slug: 'digital-control-experiments',
    //   title: 'Digital Control Experiments',
    //   description: 'Research on digital control systems for temperature, speed, and position control applications',
    //   category: 'Control Systems',
    //   status: 'completed',
    //   team: '3 Students',
    //   image: '/images/projects/digital-control.jpg',
    //   icon: 'settings',
    //   technologies: ['MATLAB', 'Simulink', 'Arduino', 'PID Control']
    // },
    // {
    //   id: 12,
    //   slug: 'ev-charging-demonstrator',
    //   title: 'Electric Vehicle Charging Demonstrator',
    //   description: 'Prototype EV charging station with smart grid integration and load management',
    //   category: 'Power Electronics',
    //   status: 'prototype',
    //   team: '5 Students',
    //   image: '/images/projects/ev-charging.jpg',
    //   icon: 'electric_car',
    //   technologies: ['Power Electronics', 'EV', 'Smart Grid', 'BMS']
    // }
  ];

  // All projects (including API data merged with featured)
  allProjects: any[] = [];

  researchAreas = [
    { name: 'Artificial Intelligence', icon: 'psychology', color: '#7c3aed', bg: '#ede9fe' },
    { name: 'Machine Learning', icon: 'model_training', color: '#2563eb', bg: '#dbeafe' },
    { name: 'Control Systems', icon: 'settings', color: '#ea580c', bg: '#fff7ed' },
    { name: 'Robotics', icon: 'smart_toy', color: '#16a34a', bg: '#dcfce7' },
    { name: 'Industrial Automation', icon: 'precision_manufacturing', color: '#0891b2', bg: '#cffafe' },
    { name: 'Embedded Systems', icon: 'memory', color: '#be123c', bg: '#ffe4e6' },
    { name: 'Internet of Things', icon: 'devices', color: '#7c3aed', bg: '#f3e8ff' },
    { name: 'Renewable Energy', icon: 'solar_power', color: '#ca8a04', bg: '#fef9c3' },
    { name: 'Power Electronics', icon: 'bolt', color: '#dc2626', bg: '#fee2e2' },
    { name: 'Biomedical Engineering', icon: 'health_and_safety', color: '#16a34a', bg: '#dcfce7' },
    { name: 'Smart Agriculture', icon: 'agriculture', color: '#ea580c', bg: '#fff7ed' },
    { name: 'Smart Manufacturing', icon: 'factory', color: '#2563eb', bg: '#dbeafe' },
    { name: 'Digital Twin Technologies', icon: 'computer', color: '#7c3aed', bg: '#ede9fe' },
    { name: 'Engineering Education', icon: 'school', color: '#0891b2', bg: '#cffafe' },
  ];

  ngOnInit() {
    // Use featured projects as the initial data
    this.allProjects = this.featuredProjects;
    this.projects.set(this.featuredProjects);
    this.loading.set(false);

    // Try to fetch additional projects from API
    this.api.get<PaginatedResult<any>>('/projects').subscribe({
      next: res => {
        // Merge API data with featured projects (avoid duplicates)
        const apiProjects = res.data.filter((p: any) => 
          !this.featuredProjects.some(fp => fp.slug === p.slug)
        );
        const merged = [...this.featuredProjects, ...apiProjects];
        this.allProjects = merged;
        this.projects.set(merged);
        this.loading.set(false);
      },
      error: () => {
        // Keep featured projects if API fails
        this.loading.set(false);
      },
    });
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.getAttribute('data-index') || '0');
            setTimeout(() => el.classList.add('visible'), idx * 40);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    
    this.researchEls.forEach((el) => {
      observer.observe(el.nativeElement);
    });
  }
}