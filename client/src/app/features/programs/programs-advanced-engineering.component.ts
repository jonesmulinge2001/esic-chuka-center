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
    selector: 'app-advanced-engineering',
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
            
            @keyframes glowPulse {
                0%, 100% { opacity: 0.6; }
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
            
            .animate-glow-pulse {
                animation: glowPulse 2s ease-in-out infinite;
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
                background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.05));
                border: 1px solid transparent;
                background-clip: padding-box;
            }
            
            .gradient-border::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: inherit;
                padding: 1.5px;
                background: linear-gradient(135deg, #2563eb, #06b6d4, #2563eb);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
            }
        `
    ],
    template: `
        <!-- ══ HERO SECTION ══ -->
        <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] min-h-[650px] flex items-center py-16 border-b-[4px] border-[#fbd01d]">
            <!-- Animated Background Particles -->
            <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
            
            <!-- Floating Gradient Orbs -->
            <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div class="space-y-6 animate-fade-in-up">
                        <!-- Badge -->
                        <!-- <div class="inline-flex items-center gap-2 bg-[#fbd01d]/10 border border-[#fbd01d]/30 text-[#fbd01d] text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
                            <span class="w-2 h-2 bg-[#fbd01d] rounded-full animate-pulse"></span>
                            Next-Gen Engineering Program 2026
                        </div> -->
                        
                        <h1 class="text-[clamp(42px,6vw,72px)] font-black text-white leading-[1.05]">
                            Design the<br />
                            <span class="bg-gradient-to-r from-[#fbd01d] via-[#fdd835] to-[#fbd01d] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Intelligent Systems</span><br />
                            of Tomorrow
                        </h1>
                        
                        <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                            Master electronics, embedded systems, IoT, robotics, automation, PCB design,
                            and real-world engineering projects through industry-focused training.
                        </p>
                        
                        <!-- Buttons -->
                        <div class="flex flex-wrap gap-4 pt-2">
                            <a routerLink="/auth/register" 
                               class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)] animate-hero-pulse">
                                <span class="material-icons text-base">rocket_launch</span>
                                Apply Now
                            </a>
                            <a routerLink="/contact" 
                               class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                                <span class="material-icons text-base">description</span>
                                Download Curriculum
                            </a>
                        </div>
                        
                        <!-- Stats -->
                        <div class="flex flex-wrap gap-4 pt-4">
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#fbd01d]">science</span>
                                <span class="font-black text-white text-[16px] mr-1">100+</span> Projects
                            </div>
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#fbd01d]">groups</span>
                                Industry Mentors
                            </div>
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#fbd01d]">biotech</span>
                                Hands-On Labs
                            </div>
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#fbd01d]">verified</span>
                                Certification
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Visual -->
                    <div class="hidden lg:flex relative justify-center items-center">
                        <div class="relative">
                            <!-- Floating Chips -->
                            <div class="absolute -top-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float1">
                                <span class="material-icons">memory</span>
                            </div>
                            <div class="absolute -top-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.6s;">
                                <span class="material-icons">developer_board</span>
                            </div>
                            <div class="absolute -bottom-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float3" style="animation-delay: 0.9s;">
                                <span class="material-icons">settings_ethernet</span>
                            </div>
                            <div class="absolute -bottom-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float1" style="animation-delay: 1.2s;">
                                <span class="material-icons">router</span>
                            </div>
                            <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.3s;">
                                <span class="material-icons">precision_manufacturing</span>
                            </div>
                            
                            <!-- Main Image Card -->
                            <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                                <div class="relative bg-gradient-to-br from-blue-600/30 to-cyan-400/20 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#001a5e]/50 to-transparent"></div>
                                    <img src="/images/esic-advanced.jpeg" 
                                         alt="Advanced Engineering" 
                                         class="relative z-10 max-h-[170px] w-auto object-contain animate-float1"
                                         (error)="heroImgError = true" />
                                    <div class="absolute inset-0 animate-image-zoom bg-gradient-to-br from-blue-500/10 to-cyan-400/5"></div>
                                </div>
                                <div class="mt-4 bg-gradient-to-r from-[#fbd01d] to-[#fdd835] text-[#001a5e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg">
                                    <span class="material-icons text-sm">bolt</span>
                                    ELECTRONICS • EMBEDDED • IoT • AUTOMATION
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- ══ WHY ADVANCED ENGINEERING ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">Engineering Beyond Theory</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Why Advanced Engineering?</h2>
                    <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Most learners study engineering concepts but never build complete systems. We change that.</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    @for (card of whyCards; track card.title; let i = $index) {
                        <div class="group bg-white rounded-2xl p-6 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-[#fbd01d] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up" 
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
                            
                            <h3 class="text-[16px] font-extrabold text-slate-900 mb-2">{{ card.title }}</h3>
                            <p class="text-[13px] text-slate-600 leading-relaxed">{{ card.desc }}</p>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ SPECIALIZATION TRACKS ══ -->
        <section class="py-16 md:py-20 px-4 ">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30 mb-3">Specialization Tracks</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-black mb-3">Choose Your Engineering Path</h2>
                    <p class="text-white/60 text-[15px] leading-relaxed max-w-2xl mx-auto">Deepen your expertise in the field that matches your passion and career goals</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (track of tracks; track track.title; let i = $index) {
                        <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:border-cyan-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                             #trackRef [attr.data-index]="i"
                             style="animation-delay: {{ i * 0.1 }}s;">
                            
                            <!-- Track Image -->
                            <div class="relative w-full h-52 overflow-hidden">
                                <img [src]="track.image" 
                                     [alt]="track.title"
                                     class="w-full h-full object-cover image-hover-zoom"
                                     loading="lazy" />
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                <div class="absolute bottom-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                                    <span class="material-icons text-white text-xl">{{ track.icon }}</span>
                                    <span class="text-white text-[10px] font-bold uppercase tracking-wider">Track</span>
                                </div>
                            </div>
                            
                            <div class="p-6">
                                <h3 class="text-[18px] font-extrabold text-slate-900 mb-3">{{ track.title }}</h3>
                                
                                <div class="space-y-1.5">
                                    @for (topic of track.topics; track topic) {
                                        <div class="text-[12px] text-slate-600 flex items-center gap-2">
                                            <span class="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"></span>
                                            {{ topic }}
                                        </div>
                                    }
                                </div>
                                
                                @if (track.tools) {
                                    <div class="mt-4 pt-4 border-t border-slate-200">
                                        <div class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Tools</div>
                                        <div class="flex flex-wrap gap-2">
                                            @for (tool of track.tools; track tool) {
                                                <span class="bg-gradient-to-r from-blue-50 to-cyan-50 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full border border-slate-200">{{ tool }}</span>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ CORE TECHNOLOGIES ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#003397] to-[#001a5e]">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-cyan-100/20 text-cyan-300 border border-cyan-400/30 mb-3">Core Technologies</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">Tools & Platforms</h2>
                    <p class="text-white/60 text-[15px] leading-relaxed max-w-2xl mx-auto">Industry-standard technologies you'll master throughout the program</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="group glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-cyan-400">
                        <div class="text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-4">Development Platforms</div>
                        <div class="flex flex-wrap justify-center gap-2">
                            @for (item of techPlatforms; track item) {
                                <span class="bg-white/10 px-4 py-1.5 rounded-full text-[12px] font-medium text-white/90 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105">{{ item }}</span>
                            }
                        </div>
                    </div>
                    
                    <div class="group glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-cyan-400">
                        <div class="text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-4">Communication Protocols</div>
                        <div class="flex flex-wrap justify-center gap-2">
                            @for (item of techProtocols; track item) {
                                <span class="bg-white/10 px-4 py-1.5 rounded-full text-[12px] font-medium text-white/90 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105">{{ item }}</span>
                            }
                        </div>
                    </div>
                    
                    <div class="group glass-effect rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-cyan-400">
                        <div class="text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-4">Engineering Tools</div>
                        <div class="flex flex-wrap justify-center gap-2">
                            @for (item of techTools; track item) {
                                <span class="bg-white/10 px-4 py-1.5 rounded-full text-[12px] font-medium text-white/90 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-105">{{ item }}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- ══ PROJECT SHOWCASE ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-violet-100 text-violet-700 border border-violet-200 mb-3">Build Real Products</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Engineering Project Showcase</h2>
                    <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">From concept to deployment — real projects that solve real problems</p>
                </div>
                
                <div class="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    @for (proj of projects; track proj.title; let i = $index) {
                        <div class="group bg-white rounded-2xl p-6 border border-slate-200 text-center opacity-0 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-violet-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                             #projRef [attr.data-index]="i"
                             style="animation-delay: {{ i * 0.08 }}s;">
                            
                            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]">
                                <span class="material-icons text-4xl text-violet-600">{{ proj.icon }}</span>
                            </div>
                            
                            <h3 class="text-[14px] font-extrabold text-slate-900 mb-1.5">{{ proj.title }}</h3>
                            <p class="text-[12px] text-slate-600">{{ proj.sub }}</p>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ ENGINEERING PROCESS ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-900 to-[#0a1628]">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30 mb-3">Development Process</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">Engineering Lifecycle</h2>
                    <p class="text-white/60 text-[15px] leading-relaxed">A structured approach to turning ideas into intelligent systems</p>
                </div>
                
                <div class="glass-effect rounded-2xl p-8 border border-white/10">
                    @for (step of processSteps; track step; let i = $index) {
                        <div class="flex items-center gap-5 py-3 border-b border-white/10 last:border-0 opacity-0 transition-all duration-500 hover:translate-x-2 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                             #processRef [attr.data-index]="i"
                             style="animation-delay: {{ i * 0.08 }}s;">
                            
                            <div class="relative">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-black text-[16px] text-white shadow-lg shadow-blue-600/30">
                                    {{ i + 1 }}
                                </div>
                                @if (i < processSteps.length - 1) {
                                    <div class="absolute top-full left-1/2 -translate-x-1/2 h-6 w-0.5 bg-gradient-to-b from-blue-400 to-transparent"></div>
                                }
                            </div>
                            
                            <div class="flex-1">
                                <h4 class="text-[15px] font-bold text-white">{{ step }}</h4>
                            </div>
                            
                            <div class="text-cyan-400 opacity-40 group-hover:opacity-100 transition-opacity">
                                <span class="material-icons">arrow_forward</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ INDUSTRY APPLICATIONS ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#003397] to-[#001a5e]">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-cyan-100/20 text-cyan-300 border border-cyan-400/30 mb-3">Industry Applications</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">Where These Skills Are Applied</h2>
                    <p class="text-white/60 text-[15px] leading-relaxed max-w-2xl mx-auto">Engineering innovations that shape the world around us</p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    @for (ind of industries; track ind.name) {
                        <div class="group glass-effect rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-cyan-400">
                            <div class="w-14 h-14 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20">
                                <span class="material-icons text-3xl text-cyan-400">{{ ind.icon }}</span>
                            </div>
                            <h4 class="text-[14px] font-bold text-white mb-1">{{ ind.name }}</h4>
                            <p class="text-[11px] text-white/60">{{ ind.desc }}</p>
                        </div>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ CAREER OPPORTUNITIES ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-900 to-[#0a1628]">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-emerald-100/20 text-emerald-300 border border-emerald-400/30 mb-3">Career Pathways</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">Career Opportunities</h2>
                    <p class="text-white/60 text-[15px] leading-relaxed max-w-2xl mx-auto">Roles you'll be prepared for after completing the program</p>
                </div>
                
                <div class="flex flex-wrap justify-center gap-3">
                    @for (role of careerRoles; track role) {
                        <span class="glass-effect border border-white/10 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white/90 transition-all duration-300 hover:bg-blue-600/20 hover:border-blue-400 hover:scale-105 hover:text-white cursor-default">
                            {{ role }}
                        </span>
                    }
                </div>
            </div>
        </section>
        
        <!-- ══ FINAL CTA ══ -->
        <section class="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-t-4 border-[#fbd01d] border-b-4 border-[#fbd01d]">
            <!-- Animated Orbs -->
            <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div class="max-w-4xl mx-auto text-center relative z-10">
                <div class="material-icons text-5xl text-[#fbd01d] block mb-6 animate-star-spin">settings</div>
                
                <h2 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4">
                    Ready to Engineer the Future?
                </h2>
                
                <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                    Transform ideas into intelligent electronic systems through advanced engineering
                    training, innovation, and hands-on project development.
                </p>
                
                <div class="flex flex-wrap justify-center gap-4">
                    <a routerLink="/auth/register" 
                       class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
                        <span class="material-icons text-base">rocket_launch</span>
                        Enroll Today
                    </a>
                    <a routerLink="/contact" 
                       class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                        <span class="material-icons text-base">contact_mail</span>
                        Contact Team
                    </a>
                </div>
                
                <!-- Trust Badges -->
                <div class="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#fbd01d] text-sm">verified</span>
                        Industry Recognized
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#fbd01d] text-sm">school</span>
                        100+ Students Trained
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#fbd01d] text-sm">handshake</span>
                        Corporate Partnerships
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#fbd01d] text-sm">emoji_events</span>
                        Award Winning Program
                    </div>
                </div>
            </div>
        </section>
    `,
})
export class AdvancedEngineeringComponent implements OnInit, AfterViewInit {
    @ViewChildren('whyRef') whyEls!: QueryList<ElementRef>;
    @ViewChildren('trackRef') trackEls!: QueryList<ElementRef>;
    @ViewChildren('projRef') projEls!: QueryList<ElementRef>;
    @ViewChildren('processRef') processEls!: QueryList<ElementRef>;
    
    heroImgError = false;
    
    whyCards = [
        {
            title: 'Hardware Design',
            icon: 'memory',
            image: '/images/esic-hwd.jpeg',
            iconColor: '#2563eb',
            iconBg: '#dbeafe',
            desc: 'Design reliable electronic systems from concept to production.',
        },
        {
            title: 'Embedded Programming',
            icon: 'code',
            image: '/images/esic-emp.jpeg',
            iconColor: '#0891b2',
            iconBg: '#cffafe',
            desc: 'Develop software that runs directly on hardware platforms.',
        },
        {
            title: 'Product Development',
            icon: 'engineering',
            image: '/images/esic-pd.jpeg',
            iconColor: '#7c3aed',
            iconBg: '#ede9fe',
            desc: 'Build solutions from concept to deployment with real-world constraints.',
        },
        {
            title: 'Industry Applications',
            icon: 'precision_manufacturing',
            image: '/images/esic-ia.jpeg',
            iconColor: '#15803d',
            iconBg: '#dcfce7',
            desc: 'Work on real-world engineering challenges across multiple domains.',
        },
    ];
    
    tracks = [
        {
            title: 'Embedded Systems Engineering',
            icon: 'developer_board',
            image: '/images/esic-ese.jpeg',
            topics: [
                'Embedded C',
                'ARM Architecture',
                'STM32 Development',
                'ESP32 Development',
                'RTOS Fundamentals',
                'Firmware Development',
            ],
        },
        {
            title: 'Electronics Engineering',
            icon: 'bolt',
            image: '/images/esic-elec.jpeg',
            topics: [
                'Analog Electronics',
                'Digital Electronics',
                'Signal Processing',
                'Power Electronics',
                'Instrumentation',
            ],
        },
        {
            title: 'PCB Design & Prototyping',
            icon: 'grid_on',
            image: '/images/esic-pcb.jpeg',
            topics: [
                'Schematic Capture',
                'PCB Layout',
                'Multi-Layer Boards',
                'Design Rules',
                'Manufacturing Preparation',
            ],
            tools: ['KiCad', 'Altium Designer', 'EasyEDA'],
        },
        {
            title: 'Internet of Things (IoT)',
            icon: 'wifi',
            image: '/images/esic-iot.jpeg',
            topics: [
                'Sensor Networks',
                'Wireless Communication',
                'MQTT',
                'Cloud Integration',
                'Smart Devices',
            ],
        },
        {
            title: 'Robotics & Automation',
            icon: 'smart_toy',
            image: '/images/esic-r-a.jpeg',
            topics: [
                'Motor Control',
                'Sensors',
                'Autonomous Systems',
                'Industrial Automation',
                'Control Systems',
            ],
        },
    ];
    
    techPlatforms = ['STM32', 'ESP32', 'Arduino', 'Raspberry Pi', 'BeagleBone'];
    techProtocols = ['UART', 'SPI', 'I2C', 'CAN Bus', 'Modbus', 'Bluetooth', 'Wi-Fi'];
    techTools = ['KiCad', 'Altium Designer', 'MATLAB', 'Proteus', 'LTspice'];
    
    projects = [
        { icon: 'electrical_services', title: 'Smart Energy Monitoring System', sub: 'Monitor and analyze electrical power usage' },
        { icon: 'settings', title: 'Industrial Automation Controller', sub: 'Control machinery and manufacturing processes' },
        { icon: 'grass', title: 'Smart Irrigation System', sub: 'Automated agricultural solution' },
        { icon: 'cloud', title: 'IoT Environmental Monitoring Station', sub: 'Collect and transmit sensor data' },
        { icon: 'directions_car', title: 'Autonomous Mobile Robot', sub: 'Navigation and obstacle avoidance' },
        { icon: 'lock', title: 'Smart Access Control System', sub: 'RFID and biometric integration' },
    ];
    
    processSteps = [
        'Problem Identification',
        'System Design',
        'Hardware Development',
        'Firmware Development',
        'Testing & Validation',
        'Deployment',
        'Product Improvement',
    ];
    
    industries = [
        { icon: 'agriculture', name: 'Smart Agriculture', desc: 'Precision farming technologies' },
        { icon: 'solar_power', name: 'Renewable Energy', desc: 'Solar monitoring and management' },
        { icon: 'factory', name: 'Industrial Automation', desc: 'Factory and process control' },
        { icon: 'medical_services', name: 'Healthcare Devices', desc: 'Medical monitoring equipment' },
        { icon: 'directions_car', name: 'Automotive Electronics', desc: 'Vehicle control systems' },
        { icon: 'apartment', name: 'Smart Cities', desc: 'Connected infrastructure solutions' },
        { icon: 'signal_cellular_alt', name: 'Telecommunications', desc: 'Communication hardware systems' },
        { icon: 'rocket', name: 'Aerospace & Defense', desc: 'Advanced embedded platforms' },
    ];
    
    labItems = [
        'PCB fabrication',
        'Circuit testing',
        'Oscilloscope measurements',
        'Sensor integration',
        'Embedded programming',
        'Hardware debugging',
        'Product prototyping',
    ];
    
    careerRoles = [
        'Embedded Systems Engineer',
        'Electronics Engineer',
        'Firmware Engineer',
        'IoT Developer',
        'Robotics Engineer',
        'Automation Engineer',
        'Hardware Design Engineer',
        'Systems Integration Engineer',
        'Research Engineer',
        'Product Development Engineer',
    ];
    
    certifications = [
        'Embedded Systems Development',
        'PCB Design',
        'Industrial Automation',
        'IoT Systems Engineering',
        'Robotics Engineering',
    ];
    
    researchItems = [
        { icon: 'biotech', label: 'Prototypes' },
        { icon: 'science', label: 'Research Projects' },
        { icon: 'rocket_launch', label: 'Startup Solutions' },
        { icon: 'engineering', label: 'Engineering Products' },
        { icon: 'groups', label: 'Community Challenges' },
        { icon: 'handshake', label: 'Industry Partners' },
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
        
        observe(this.whyEls, 100);
        observe(this.trackEls, 100);
        observe(this.projEls, 80);
        observe(this.processEls, 100);
    }
}