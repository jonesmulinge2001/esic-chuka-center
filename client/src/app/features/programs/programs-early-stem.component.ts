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
    selector: 'app-stem-kits',
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
        <section class="relative overflow-hidden bg-gradient-to-br from-[#0d1b6e] via-[#1a3fbf] to-[#2563eb] min-h-[520px] flex items-center py-16 border-b-[4px] border-[#facc15]">
            <!-- Animated Background Particles -->
            <div id="heroStarsHost" class="absolute inset-0 pointer-events-none"></div>
            
            <!-- Floating Gradient Orbs -->
            <div class="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div class="space-y-6 animate-fade-in-up">
                        <h1 class="text-[clamp(42px,6vw,72px)] font-black text-white leading-[1.05]">
                            STEM<br />
                            <span class="bg-gradient-to-r from-[#facc15] via-[#fb923c] to-[#facc15] bg-[length:200%] text-transparent bg-clip-text animate-shimmer">Learning Kits</span>
                        </h1>
                        
                        <p class="text-white/80 text-[16px] leading-relaxed max-w-lg">
                            Introduce learners to science through exciting experiments — hands-on kits
                            covering electronics, coding, robotics, IoT, AI, and renewable energy.
                        </p>
                        
                        <!-- Buttons -->
                        <div class="flex flex-wrap gap-4 pt-2">
                            <a routerLink="/programs" 
                               class="inline-flex items-center gap-2 bg-[#facc15] text-[#0d1b6e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)] animate-hero-pulse">
                                <span class="material-icons text-base">science</span>
                                Explore Kits
                            </a>
                            <a routerLink="/contact" 
                               class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-[14px] px-8 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
                                <span class="material-icons text-base">handshake</span>
                                Partner With Us
                            </a>
                        </div>
                        
                        <!-- Highlight Badges -->
                        <div class="flex flex-wrap gap-3 pt-4">
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#facc15]">inventory_2</span>
                                10+ Kit Types
                            </div>
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#facc15]">science</span>
                                Hands-on Learning
                            </div>
                            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white/90 text-[12px] font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105">
                                <span class="material-icons text-[#facc15]">verified</span>
                                Curriculum-Aligned
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Visual -->
                    <div class="hidden lg:flex relative justify-center items-center">
                        <div class="relative">
                            <!-- Floating Chips -->
                            <div class="absolute -top-6 -left-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#2563eb] text-2xl animate-float1">
                                <span class="material-icons">bolt</span>
                            </div>
                            <div class="absolute -top-6 -right-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#16a34a] text-2xl animate-float2" style="animation-delay: 0.6s;">
                                <span class="material-icons">smart_toy</span>
                            </div>
                            <div class="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#ea580c] text-2xl animate-float3" style="animation-delay: 0.9s;">
                                <span class="material-icons">sensors</span>
                            </div>
                            <div class="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#7c3aed] text-2xl animate-float1" style="animation-delay: 1.2s;">
                                <span class="material-icons">psychology</span>
                            </div>
                            <div class="absolute top-1/2 -left-[30px] -translate-y-1/2 bg-white/90 backdrop-blur-[12px] rounded-xl w-14 h-14 flex items-center justify-center shadow-2xl text-[#ca8a04] text-2xl animate-float2" style="animation-delay: 0.3s;">
                                <span class="material-icons">memory</span>
                            </div>
                            
                            <!-- Main Image Card -->
                            <div class="glass-effect rounded-2xl p-6 max-w-[380px] w-full shadow-2xl">
                                <div class="relative bg-gradient-to-br from-[#facc15]/20 to-[#fb923c]/10 rounded-xl h-[220px] flex items-center justify-center overflow-hidden">
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#0d1b6e]/50 to-transparent"></div>
                                    <img src="/images/esic-6-12.jpeg" 
                                         alt="STEM Learning Kits" 
                                         class="relative z-10 max-h-[170px] w-auto object-contain rounded-lg animate-float1"
                                         (error)="heroImgError = true" />
                                    <div class="absolute inset-0 animate-image-zoom bg-gradient-to-br from-yellow-400/10 to-orange-400/5"></div>
                                </div>
                                <div class="mt-4 bg-gradient-to-r from-[#facc15] to-[#fb923c] text-[#0d1b6e] rounded-xl px-4 py-3 text-center text-[12px] font-black tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg">
                                    <span class="material-icons text-sm">bolt</span>
                                    LEARN BY BUILDING
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
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">Science Made Tangible</h2>
                    <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">Every kit turns abstract theory into something learners can see, touch, and build</p>
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
        
        <!-- ══ KIT CATALOG ══ -->
        <!-- <section class="py-16 md:py-20 px-4 bg-white">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-orange-100 text-orange-700 border border-orange-200 mb-3">Examples</div>
                    <h2 class="text-[clamp(28px,4vw,42px)] font-black text-[#001e5c] mb-3">STEM Learning Kits</h2>
                    <p class="text-slate-600 text-[15px] leading-relaxed max-w-2xl mx-auto">A growing catalog of learning systems — from foundational circuits to AI and drones</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @for (kit of kits; track kit.title; let i = $index) {
                        <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,30,92,0.1)] hover:border-orange-400 [&.visible]:opacity-100 [&.visible]:animate-fade-in-up"
                             #kitRef [attr.data-index]="i"
                             style="animation-delay: {{ i * 0.08 }}s;">
                            
                          
                            <div class="relative w-full h-48 overflow-hidden">
                                <img [src]="kit.image"
                                     [alt]="kit.title"
                                     (error)="kit.image = '/images/default-activity.jpg'"
                                     class="w-full h-full object-cover image-hover-zoom"
                                     loading="lazy" />
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                <div class="absolute bottom-4 left-4 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" 
                                     [style.background]="kit.iconBg">
                                    <span class="material-icons text-2xl" [style.color]="kit.iconColor">{{ kit.icon }}</span>
                                </div>
                            </div>
                            
                            <div class="p-6">
                                <h3 class="text-[15px] font-extrabold text-[#001e5c] mb-2">{{ kit.title }}</h3>
                                <p class="text-[13px] text-slate-600 leading-relaxed">{{ kit.desc }}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section> -->
        
        <!-- ══ FAQ ══ -->
        <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-[#f8faff] to-white">
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
                    Bring STEM Learning Kits<br />To Your Institution
                </h2>
                
                <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
                    From circuit kits to AI and drone technology — equip your learners with
                    hands-on tools built for real understanding.
                </p>
                
                <div class="flex flex-wrap justify-center gap-4">
                    <a routerLink="/programs" 
                       class="inline-flex items-center gap-3 bg-[#facc15] text-[#0d1b6e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(250,204,21,0.5)]">
                        <span class="material-icons text-base">science</span>
                        Explore All Kits
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
                        Safe & Durable Materials
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#facc15] text-sm">menu_book</span>
                        Step-by-Step Manuals
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#facc15] text-sm">handshake</span>
                        Hands-On Experiments
                    </div>
                    <div class="flex items-center gap-2 text-white/70 text-[12px]">
                        <span class="material-icons text-[#facc15] text-sm">school</span>
                        Curriculum-Aligned
                    </div>
                </div>
            </div>
        </section>
    `,
  })
  export class EarlyStemComponent implements OnInit, AfterViewInit {
    @ViewChildren('whyRef') whyEls!: QueryList<ElementRef>;
    @ViewChildren('kitRef') kitEls!: QueryList<ElementRef>;
    
    heroImgError = false;
    openFaq = 0;
    
    whyCards = [
        {
            title: 'Science',
            icon: 'science',
            image: '/images/esic-science.jpeg',
            iconColor: '#2563eb',
            iconBg: '#eff6ff',
            desc: 'Explore experiments and phenomena that turn curiosity into real understanding',
        },
        {
            title: 'Technology',
            icon: 'computer',
            image: '/images/esic-fun-coding.jpeg',
            iconColor: '#16a34a',
            iconBg: '#f0fdf4',
            desc: 'Build coding, IoT, and AI skills through kits designed for progressive learning',
        },
        {
            title: 'Engineering',
            icon: 'settings',
            image: '/images/esic-experiments.jpeg',
            iconColor: '#ea580c',
            iconBg: '#fff7ed',
            desc: 'Design, wire, and assemble systems that actually work — from circuits to drones',
        },
        {
            title: 'Mathematics',
            icon: 'calculate',
            image: '/images/esic-math.jpeg',
            iconColor: '#7c3aed',
            iconBg: '#faf5ff',
            desc: 'Apply logic and problem-solving through sensor data, automation, and code',
        },
    ];
    
    // kits = [
    //     {
    //         title: 'Circuit Learning Kit',
    //         icon: 'bolt',
    //         image: '/images/kits/circuit-learning-kit.jpeg',
    //         iconColor: '#2563eb',
    //         iconBg: '#eff6ff',
    //         desc: 'Build and test simple circuits to understand current, voltage, and resistance hands-on.',
    //     },
    //     {
    //         title: 'Electricity & Magnetism Kit',
    //         icon: 'electric_bolt',
    //         image: '/images/kits/electricity-magnetism-kit.jpeg',
    //         iconColor: '#ca8a04',
    //         iconBg: '#fef9c3',
    //         desc: 'Explore electromagnetic principles through guided, curriculum-aligned experiments.',
    //     },
    //     {
    //         title: 'Renewable Energy Kit',
    //         icon: 'solar_power',
    //         image: '/images/kits/renewable-energy-kit.jpeg',
    //         iconColor: '#16a34a',
    //         iconBg: '#f0fdf4',
    //         desc: 'Build solar, wind, and other clean-energy models to learn sustainable power generation.',
    //     },
    //     {
    //         title: 'Coding Kit',
    //         icon: 'code',
    //         image: '/images/kits/coding-kit.jpeg',
    //         iconColor: '#16a34a',
    //         iconBg: '#f0fdf4',
    //         desc: 'Learn programming logic through structured, project-based coding challenges.',
    //     },
    //     {
    //         title: 'Arduino Starter Kit',
    //         icon: 'memory',
    //         image: '/images/kits/arduino-starter-kit.jpeg',
    //         iconColor: '#7c3aed',
    //         iconBg: '#faf5ff',
    //         desc: 'Get hands-on with microcontrollers, sensors, and actuators using the Arduino platform.',
    //     },
    //     {
    //         title: 'Robotics Explorer Kit',
    //         icon: 'smart_toy',
    //         image: '/images/kits/robotics-explorer-kit.jpeg',
    //         iconColor: '#2563eb',
    //         iconBg: '#eff6ff',
    //         desc: 'Design, build, and program robots that move, sense, and respond to their environment.',
    //     },
    //     {
    //         title: 'Sensor Technology Kit',
    //         icon: 'sensors',
    //         image: '/images/kits/sensor-technology-kit.jpeg',
    //         iconColor: '#ea580c',
    //         iconBg: '#fff7ed',
    //         desc: 'Work with real-world sensors to measure light, motion, temperature, and more.',
    //     },
    //     {
    //         title: 'Internet of Things Kit',
    //         icon: 'wifi',
    //         image: '/images/kits/iot-kit.jpeg',
    //         iconColor: '#4f46e5',
    //         iconBg: '#eef2ff',
    //         desc: 'Connect devices and sensors to build practical, internet-enabled smart systems.',
    //     },
    //     {
    //         title: 'Artificial Intelligence Learning Kit',
    //         icon: 'psychology',
    //         image: '/images/kits/ai-learning-kit.jpeg',
    //         iconColor: '#be185d',
    //         iconBg: '#fce7f3',
    //         desc: 'Introduce machine learning and AI concepts through guided, applied mini-projects.',
    //     },
    //     {
    //         title: 'Drone Technology Kit',
    //         icon: 'flight',
    //         image: '/images/kits/drone-technology-kit.jpeg',
    //         iconColor: '#0d9488',
    //         iconBg: '#f0fdfa',
    //         desc: 'Assemble and fly a drone while learning aerodynamics, control systems, and safety.',
    //     },
    // ];
    
    faqs = [
        {
            q: 'Who are these STEM learning kits designed for?',
            a: 'Our kits are built for a wide range of learners — from foundational kits suited to younger students in primary and junior secondary school, to advanced kits like Arduino, IoT, AI, and drone technology designed for senior secondary, TVET, and university-level learners.',
        },
        {
            q: 'Do the kits include instructional materials?',
            a: 'Yes — every kit ships with a step-by-step experiment manual, and most are supported by video tutorials so learners and educators can get started with confidence.',
        },
        {
            q: 'Can kits be purchased individually or as sets?',
            a: 'Both. Institutions can order individual kits to fill a specific curriculum gap, or a bundled set covering multiple STEM disciplines for a full learning lab setup.',
        },
        {
            q: 'Are the kits aligned with the school curriculum?',
            a: 'Yes — each kit is designed to complement the science, technology, and engineering topics taught at the relevant education level, making them easy to integrate into existing lesson plans.',
        },
        {
            q: 'Do you offer training for teachers using the kits?',
            a: 'Yes — we provide teacher orientation sessions and guides so educators can confidently run experiments and get the most out of every kit in the classroom.',
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
        observe(this.kitEls, 80);
    }
  }