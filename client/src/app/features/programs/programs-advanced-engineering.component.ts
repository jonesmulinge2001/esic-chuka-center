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
    selector: 'app-classroom-solutions',
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
        `
    ],
    template: `
        <!-- ══ HERO SECTION ══ -->
        <section class="relative overflow-hidden bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] min-h-[520px] flex items-center py-16 border-b-[4px] border-[#fbd01d]">
            <!-- Animated Background Particles -->
            <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
            
            <!-- Floating Gradient Orbs -->
            <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div class="space-y-6 animate-fade-in-up">
                        <h1 class="text-[clamp(38px,5.5vw,64px)] font-black text-white leading-[1.05]">
                            STEM Classroom<br />
                            <span class="bg-gradient-to-r from-[#fbd01d] via-[#fdd835] to-[#fbd01d] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Solutions</span>
                        </h1>
                        
                        <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                            We help schools establish complete STEM laboratories — from design and
                            installation to teacher training and ongoing support.
                        </p>
                        
                        <!-- Buttons -->
                        <div class="flex flex-wrap gap-4 pt-2">
                            <a routerLink="/contact" 
                               class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)] animate-hero-pulse">
                                <span class="material-icons text-base">request_quote</span>
                                Get a Quote
                            </a>
                            <a routerLink="/contact" 
                               class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                                <span class="material-icons text-base">handshake</span>
                                Partner With Us
                            </a>
                        </div>
                    </div>
                    
                    <!-- Right Visual -->
                    <div class="hidden lg:flex relative justify-center items-center">
                        <div class="relative">
                            <!-- Floating Chips -->
                            <div class="absolute -top-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float1">
                                <span class="material-icons">design_services</span>
                            </div>
                            <div class="absolute -top-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.6s;">
                                <span class="material-icons">construction</span>
                            </div>
                            <div class="absolute -bottom-6 -left-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float3" style="animation-delay: 0.9s;">
                                <span class="material-icons">school</span>
                            </div>
                            <div class="absolute -bottom-6 -right-6 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float1" style="animation-delay: 1.2s;">
                                <span class="material-icons">support_agent</span>
                            </div>
                            <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 glass-effect rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-cyan-400 text-2xl animate-float2" style="animation-delay: 0.3s;">
                                <span class="material-icons">menu_book</span>
                            </div>
                            
                            <!-- Main Image Card -->
                            <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                                <div class="relative bg-gradient-to-br from-blue-600/30 to-cyan-400/20 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#001a5e]/50 to-transparent"></div>
                                    <img src="/images/esic-lab.jpeg" 
                                         alt="STEM Classroom Solutions" 
                                         class="relative z-10 max-h-[170px] w-auto object-contain animate-float1"
                                         (error)="heroImgError = true" />
                                    <div class="absolute inset-0 animate-image-zoom bg-gradient-to-br from-blue-500/10 to-cyan-400/5"></div>
                                </div>
                                <div class="mt-4 bg-gradient-to-r from-[#fbd01d] to-[#fdd835] text-[#001a5e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg">
                                    <span class="material-icons text-sm">bolt</span>
                                    DESIGN • INSTALL • TRAIN • SUPPORT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- ══ SERVICES ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">Services Include</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">A Complete STEM Lab Solution</h2>
                    <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">From first blueprint to long-term upkeep — we cover every stage of setting up your STEM laboratory</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (service of services; track service.title; let i = $index) {
                        <div class="group bg-white rounded-2xl p-7 border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,26,94,0.1)] hover:border-[#fbd01d] [&.visible]:opacity-100 [&.visible]:animate-fade-in-up" 
                             #serviceRef [attr.data-index]="i"
                             style="animation-delay: {{ i * 0.1 }}s;">
                            
                            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" 
                                 [style.background]="service.iconBg">
                                <span class="material-icons text-[26px]" [style.color]="service.iconColor">{{ service.icon }}</span>
                            </div>
                            
                            <h3 class="text-[16px] font-extrabold text-slate-900 mb-2">{{ service.title }}</h3>
                            <p class="text-[13px] text-slate-600 leading-relaxed">{{ service.desc }}</p>
                        </div>
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
                    Ready to Build Your STEM Lab?
                </h2>
                
                <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                    Talk to our team about setting up a complete, curriculum-aligned STEM
                    laboratory at your school.
                </p>
                
                <div class="flex flex-wrap justify-center gap-4">
                    <a routerLink="/contact" 
                       class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
                        <span class="material-icons text-base">request_quote</span>
                        Get a Quote
                    </a>
                    <a routerLink="/contact" 
                       class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                        <span class="material-icons text-base">contact_mail</span>
                        Contact Team
                    </a>
                </div>
            </div>
        </section>
    `,
})
export class AdvancedEngineeringComponent implements OnInit, AfterViewInit {
    @ViewChildren('serviceRef') serviceEls!: QueryList<ElementRef>;
    
    heroImgError = false;
    
    services = [
        {
            title: 'Laboratory Design',
            icon: 'design_services',
            iconColor: '#2563eb',
            iconBg: '#dbeafe',
            desc: 'We plan and design STEM lab spaces — layout, wiring, workstations, and safety — tailored to your school\'s space and budget.',
        },
        {
            title: 'Equipment Installation',
            icon: 'construction',
            iconColor: '#15803d',
            iconBg: '#dcfce7',
            desc: 'Our technicians install and commission all lab equipment and trainer systems, ensuring everything is ready for use from day one.',
        },
        {
            title: 'Teacher Training',
            icon: 'school',
            iconColor: '#ea580c',
            iconBg: '#fff7ed',
            desc: 'We train your teachers and lab technicians to confidently operate equipment and deliver hands-on STEM lessons.',
        },
        {
            title: 'Curriculum Mapping',
            icon: 'account_tree',
            iconColor: '#7c3aed',
            iconBg: '#ede9fe',
            desc: 'We align lab activities and equipment usage directly to your existing curriculum and syllabus requirements.',
        },
        {
            title: 'Laboratory Manuals',
            icon: 'menu_book',
            iconColor: '#0891b2',
            iconBg: '#cffafe',
            desc: 'Every lab is supported with structured experiment manuals and guides for consistent, repeatable lessons.',
        },
        {
            title: 'Maintenance Support',
            icon: 'support_agent',
            iconColor: '#be123c',
            iconBg: '#ffe4e6',
            desc: 'Ongoing maintenance and technical support keep your lab equipment running reliably long after installation.',
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
        
        observe(this.serviceEls, 100);
    }
}