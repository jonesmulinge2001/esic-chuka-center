import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
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
    
    @keyframes float1 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(3deg); }
    }
    
    @keyframes float2 {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-2deg); }
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
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-shimmer {
      animation: shimmer 3s linear infinite;
      background-size: 200% auto;
    }
    
    .animate-float1 {
      animation: float1 4s ease-in-out infinite;
    }
    
    .animate-float2 {
      animation: float2 3.5s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulseGlow 3s ease-in-out infinite;
    }
    
    .animate-rotate-slow {
      animation: rotateSlow 20s linear infinite;
    }
    
    .animate-image-zoom {
      animation: imageZoom 8s ease-in-out infinite alternate;
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .partner-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
    }
    
    .partner-card.visible {
      opacity: 1;
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .partner-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 26, 94, 0.15);
    }
    
    .partner-logo {
      transition: transform 0.3s ease;
    }
    
    .partner-card:hover .partner-logo {
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
    
    .partner-type-icon {
      transition: transform 0.3s ease;
    }
    
    .partner-card:hover .partner-type-icon {
      transform: scale(1.1) rotate(-5deg);
    }
    
    .testimonial-card {
      transition: all 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 26, 94, 0.08);
    }
    
    .partner-grid-item {
      opacity: 0;
    }
    
    .partner-grid-item.visible {
      opacity: 1;
      animation: fadeInUp 0.6s ease-out forwards;
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
          <span class="material-icons align-middle text-[14px] mr-1">handshake</span>
          Our Partners
        </div>
        
        <h1 class="text-[clamp(38px,5.5vw,56px)] font-black text-white leading-[1.05] mb-4">
          Partners & Collaborators
        </h1>
        
        <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto">
          Collaborating with leading institutions and organizations to advance STEM education and innovation in Kenya
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">50+</div>
            <div class="text-[11px] text-white/50 font-medium">Partner Institutions</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">7</div>
            <div class="text-[11px] text-white/50 font-medium">Partner Categories</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">10K+</div>
            <div class="text-[11px] text-white/50 font-medium">Students Impacted</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">15+</div>
            <div class="text-[11px] text-white/50 font-medium">Countries Reached</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ PARTNER CATEGORIES ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">groups</span>
            Our Partner Network
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Diverse Partnerships for Impact</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            We work with a wide range of organizations to create meaningful educational opportunities
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <!-- Partner Categories Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (category of partnerCategories; track category.name; let i = $index) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200 partner-card"
                 #partnerRef [attr.data-index]="i"
                 style="animation-delay: {{ i * 0.06 }}s;">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 partner-type-icon"
                   [style.background]="category.bg">
                <span class="material-icons text-[28px]" [style.color]="category.color">{{ category.icon }}</span>
              </div>
              <h3 class="text-[16px] font-extrabold text-slate-900 mb-1">{{ category.name }}</h3>
              <p class="text-[12px] text-slate-500 leading-relaxed">{{ category.count }} partners</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (example of category.examples.slice(0, 3); track example) {
                  <span class="text-[9px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {{ example }}
                  </span>
                }
                @if (category.examples.length > 3) {
                  <span class="text-[9px] font-medium bg-slate-100 text-slate-400 px-2 py-1 rounded-full">
                    +{{ category.examples.length - 3 }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ FEATURED PARTNERS ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-100 to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">star</span>
            Featured Partners
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Our Valued Collaborators</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Organizations that have partnered with us to advance STEM education and innovation
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (partner of featuredPartners; track partner.name; let i = $index) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200 partner-card"
                 #featuredRef [attr.data-index]="i"
                 style="animation-delay: {{ i * 0.08 }}s;">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                     [style.background]="partner.iconBg">
                  <span class="material-icons text-[28px]" [style.color]="partner.iconColor">{{ partner.icon }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-[15px] text-slate-900">{{ partner.name }}</h4>
                  <p class="text-[12px] text-slate-500">{{ partner.category }}</p>
                  <div class="mt-2 flex items-center gap-1 text-[11px] text-[#fbd01d]">
                    <span class="material-icons text-[14px]">star</span>
                    <span class="font-medium text-slate-600">{{ partner.rating }} rating</span>
                    <span class="text-slate-400">·</span>
                    <span class="text-slate-500">{{ partner.projects }} projects</span>
                  </div>
                </div>
              </div>
              <p class="text-[13px] text-slate-600 leading-relaxed mt-3">{{ partner.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (tag of partner.tags; track tag) {
                  <span class="text-[9px] font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                    {{ tag }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ IMPACT STORIES ══ -->
    <section class="relative overflow-hidden py-16 md:py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-[#fbd01d]/20 text-[#fbd01d] border border-[#fbd01d]/30 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">format_quote</span>
            Testimonials
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-3">What Our Partners Say</h2>
          <p class="text-white/60 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Hear from our partners about the impact of our collaboration
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          @for (testimonial of testimonials; track testimonial.name) {
            <div class="glass-effect rounded-2xl p-6 border border-white/10 testimonial-card">
              <div class="flex items-center gap-1 text-[#fbd01d] mb-3">
                @for (star of [1,2,3,4,5]; track star) {
                  <span class="material-icons text-[16px]">star</span>
                }
              </div>
              <p class="text-white/80 text-[13px] leading-relaxed italic mb-4">
                "{{ testimonial.quote }}"
              </p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-[14px]"
                     [style.background]="testimonial.avatarBg">
                  {{ testimonial.initials }}
                </div>
                <div>
                  <div class="text-white font-bold text-[13px]">{{ testimonial.name }}</div>
                  <div class="text-white/50 text-[11px]">{{ testimonial.role }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ PARTNER BENEFITS ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-green-50 text-green-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">verified</span>
            Partner Benefits
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Why Partner With ESIC</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Benefits and opportunities available to our partner organizations
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (benefit of partnerBenefits; track benefit.title) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200 partner-card"
                 [class.visible]="true"
                 style="animation-delay: 0s;">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                   [style.background]="benefit.bg">
                <span class="material-icons text-[22px]" [style.color]="benefit.color">{{ benefit.icon }}</span>
              </div>
              <h4 class="font-bold text-[15px] text-slate-900 mb-2">{{ benefit.title }}</h4>
              <p class="text-[13px] text-slate-500 leading-relaxed">{{ benefit.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ BECOME A PARTNER CTA ══ -->
    <section class="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-t-4 border-[#fbd01d]">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="w-20 h-20 rounded-2xl bg-[#fbd01d]/20 flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-4xl text-[#fbd01d]">handshake</span>
        </div>
        
        <h2 class="text-[clamp(32px,4.5vw,48px)] font-black text-white leading-[1.1] mb-4">
          Ready to Partner With Us?
        </h2>
        
        <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto mb-8">
          Join our network of partners and help shape the future of STEM education in Kenya and beyond
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/contact" 
             class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
            <span class="material-icons text-base">send</span>
            Become a Partner
          </a>
          <a routerLink="/contact" 
             class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
            <span class="material-icons text-base">contact_mail</span>
            Contact Partnership Team
          </a>
        </div>
        
        <div class="mt-8 flex flex-wrap justify-center gap-6 text-white/40 text-[11px]">
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">verified</span>
            No partnership fees
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">update</span>
            Flexible collaboration models
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">support</span>
            Dedicated support team
          </span>
        </div>
      </div>
    </section>
  `,
})
export class PartnersComponent implements OnInit, AfterViewInit {
  @ViewChildren('partnerRef') partnerEls!: QueryList<ElementRef>;
  @ViewChildren('featuredRef') featuredEls!: QueryList<ElementRef>;

  partnerCategories = [
    {
      name: 'Schools',
      icon: 'school',
      color: '#2563eb',
      bg: '#dbeafe',
      count: 12,
      examples: ['Chuka High School', 'St. Mary\'s', 'Kianyaga High']
    },
    {
      name: 'Universities',
      icon: 'local_library',
      color: '#7c3aed',
      bg: '#ede9fe',
      count: 8,
      examples: ['Chuka University', 'JKUAT', 'KU']
    },
    {
      name: 'TVET Institutions',
      icon: 'construction',
      color: '#ea580c',
      bg: '#fff7ed',
      count: 10,
      examples: ['KTTC', 'Kenya School of TVET', 'Kabete National Polytechnic']
    },
    {
      name: 'Government',
      icon: 'account_balance',
      color: '#be123c',
      bg: '#ffe4e6',
      count: 6,
      examples: ['Ministry of Education', 'TVET Authority', 'KICD']
    },
    {
      name: 'Industry',
      icon: 'business_center',
      color: '#0891b2',
      bg: '#cffafe',
      count: 15,
      examples: ['Safaricom', 'GE Healthcare', 'Microsoft']
    },
    {
      name: 'Research Organizations',
      icon: 'science',
      color: '#15803d',
      bg: '#dcfce7',
      count: 7,
      examples: ['KEMRI', 'KALRO', 'ICRAF']
    },
    {
      name: 'Development Partners',
      icon: 'public',
      color: '#ca8a04',
      bg: '#fef9c3',
      count: 5,
      examples: ['UNDP', 'UNESCO', 'World Bank']
    }
  ];

  featuredPartners = [
    {
      name: 'Chuka University',
      category: 'University',
      icon: 'local_library',
      iconColor: '#7c3aed',
      iconBg: '#ede9fe',
      rating: 4.8,
      projects: 15,
      description: 'Strategic partner in STEM education and research, hosting ESIC labs and training programs.',
      tags: ['STEM', 'Research', 'Education']
    },
    {
      name: 'Ministry of Education',
      category: 'Government',
      icon: 'account_balance',
      iconColor: '#be123c',
      iconBg: '#ffe4e6',
      rating: 4.6,
      projects: 8,
      description: 'Supporting national STEM education initiatives and curriculum development.',
      tags: ['Policy', 'Curriculum', 'National']
    },
    {
      name: 'Safaricom PLC',
      category: 'Industry',
      icon: 'business_center',
      iconColor: '#0891b2',
      iconBg: '#cffafe',
      rating: 4.9,
      projects: 12,
      description: 'Leading technology partner providing connectivity solutions for ESIC\'s digital platforms.',
      tags: ['Technology', 'Connectivity', 'Innovation']
    },
    {
      name: 'UNESCO',
      category: 'Development Partner',
      icon: 'public',
      iconColor: '#ca8a04',
      iconBg: '#fef9c3',
      rating: 4.7,
      projects: 6,
      description: 'Supporting STEM education quality and access initiatives across Kenya.',
      tags: ['Education', 'SDG', 'Global']
    },
    {
      name: 'JKUAT',
      category: 'University',
      icon: 'local_library',
      iconColor: '#2563eb',
      iconBg: '#dbeafe',
      rating: 4.5,
      projects: 10,
      description: 'Collaborating on engineering research and student innovation programs.',
      tags: ['Engineering', 'Research', 'Innovation']
    },
    {
      name: 'KEMRI',
      category: 'Research Organization',
      icon: 'science',
      iconColor: '#15803d',
      iconBg: '#dcfce7',
      rating: 4.8,
      projects: 5,
      description: 'Partnering on biomedical engineering and health technology research.',
      tags: ['Biomedical', 'Health', 'Research']
    }
  ];

  testimonials = [
    {
      name: 'Dr. Jane Mwangi',
      role: 'Dean, Chuka University',
      quote: 'ESIC has transformed how we deliver STEM education. Their complete learning ecosystem and partner support have been invaluable.',
      initials: 'JM',
      avatarBg: 'linear-gradient(135deg, #2563eb, #7c3aed)'
    },
    {
      name: 'Prof. David Kariuki',
      role: 'Director, TVET Authority',
      quote: 'The partnership with ESIC has elevated the quality of technical education in Kenya. Students are now industry-ready.',
      initials: 'DK',
      avatarBg: 'linear-gradient(135deg, #16a34a, #ea580c)'
    },
    {
      name: 'Sarah Wanjiku',
      role: 'Education Specialist, UNESCO',
      quote: 'ESIC\'s innovative approach to STEM education aligns perfectly with our vision for quality education in Africa.',
      initials: 'SW',
      avatarBg: 'linear-gradient(135deg, #7c3aed, #2563eb)'
    }
  ];

  partnerBenefits = [
    {
      title: 'Access to Resources',
      icon: 'menu_book',
      color: '#2563eb',
      bg: '#dbeafe',
      description: 'Get access to our complete learning resources and educational materials.'
    },
    {
      title: 'Training & Development',
      icon: 'school',
      color: '#7c3aed',
      bg: '#ede9fe',
      description: 'Receive specialized training for educators and students in STEM fields.'
    },
    {
      title: 'Research Collaboration',
      icon: 'science',
      color: '#16a34a',
      bg: '#dcfce7',
      description: 'Partner on research projects and innovation initiatives.'
    },
    {
      title: 'Networking Opportunities',
      icon: 'groups',
      color: '#ea580c',
      bg: '#fff7ed',
      description: 'Connect with other partners and stakeholders in STEM education.'
    },
    {
      title: 'Knowledge Sharing',
      icon: 'share',
      color: '#0891b2',
      bg: '#cffafe',
      description: 'Exchange best practices and innovative teaching methodologies.'
    },
    {
      title: 'Recognition & Visibility',
      icon: 'emoji_events',
      color: '#ca8a04',
      bg: '#fef9c3',
      description: 'Gain recognition as a leader in STEM education and innovation.'
    }
  ];

  ngOnInit() {
    // Any initialization logic
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;
    
    // Observer for partner cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.getAttribute('data-index') || '0');
            setTimeout(() => el.classList.add('visible'), idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    
    this.partnerEls.forEach((el) => {
      observer.observe(el.nativeElement);
    });
    
    // Observer for featured partners
    const featuredObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.getAttribute('data-index') || '0');
            setTimeout(() => el.classList.add('visible'), idx * 100);
            featuredObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    
    this.featuredEls.forEach((el) => {
      featuredObserver.observe(el.nativeElement);
    });
  }
}