import { Component, signal, inject, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
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
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .contact-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 26, 94, 0.08);
    }
    
    .cta-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .cta-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(251, 208, 29, 0.15);
    }
    
    .form-input:focus {
      outline: none;
      border-color: #fbd01d;
      box-shadow: 0 0 0 3px rgba(251, 208, 29, 0.15);
    }
    
    .category-badge {
      background: rgba(251, 208, 29, 0.15);
      color: #fbd01d;
      border: 1px solid rgba(251, 208, 29, 0.3);
    }
    
    .divider-gradient {
      height: 4px;
      background: linear-gradient(90deg, #001a5e, #094ed3, #fbd01d);
      width: 80px;
      margin: 0 auto;
      border-radius: 2px;
    }
    
    .social-icon {
      transition: all 0.3s ease;
    }
    
    .social-icon:hover {
      transform: translateY(-3px) scale(1.1);
    }
    
    .contact-icon-wrapper {
      transition: all 0.3s ease;
    }
    
    .contact-card:hover .contact-icon-wrapper {
      transform: scale(1.1) rotate(-5deg);
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
        
        
        <h1 class="text-[clamp(38px,5.5vw,56px)] font-black text-white leading-[1.05] mb-4">
          Let's Build the Future Together
        </h1>
        
        <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto">
          Whether you're establishing a STEM laboratory, developing engineering curricula, training teachers, or looking for innovative educational technologies, ESIC is ready to partner with you.
        </p>
      </div>
    </section>

    <!-- ══ CONTACT INFO & FORM ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-5 gap-8">
          <!-- Left - Contact Info -->
          <div class="lg:col-span-2 space-y-6">
            <div class="animate-fade-in-up">
              <h2 class="text-[clamp(22px,2.5vw,28px)] font-black text-slate-900 mb-3">Get in Touch</h2>
              <p class="text-slate-500 text-[14px] leading-relaxed">
                Reach out to us through any of these channels. We're here to help you with your STEM education needs.
              </p>
              <div class="divider-gradient mt-4"></div>
            </div>

            <!-- Contact Info Cards -->
            @for (info of contactInfo; track info.label) {
              <div class="bg-white rounded-2xl p-5 border border-slate-200 contact-card">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 contact-icon-wrapper"
                       [style.background]="info.bg">
                    <span class="material-icons text-[22px]" [style.color]="info.color">{{ info.icon }}</span>
                  </div>
                  <div>
                    <div class="text-[11px] text-slate-400 font-medium uppercase tracking-[0.06em]">{{ info.label }}</div>
                    <div class="text-[14px] font-semibold text-slate-800 mt-0.5">{{ info.value }}</div>
                    @if (info.subValue) {
                      <div class="text-[13px] text-slate-500 mt-0.5">{{ info.subValue }}</div>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- Social Media -->
            <!-- <div class="bg-white rounded-2xl p-5 border border-slate-200 contact-card">
              <h4 class="text-[13px] font-bold text-slate-900 mb-3">Connect With Us</h4>
              <div class="flex gap-3">
                @for (social of socialLinks; track social.platform) {
                  <a [href]="social.url" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="social-icon w-10 h-10 rounded-xl flex items-center justify-center"
                     [style.background]="social.bg"
                     [style.color]="social.color">
                    <span class="material-icons text-[20px]">{{ social.icon }}</span>
                  </a>
                }
              </div>
            </div> -->

            <!-- Quick Response Time -->
            <div class="bg-gradient-to-r from-[#001a5e] to-[#094ed3] rounded-2xl p-5 text-white">
              <div class="flex items-center gap-3">
                <span class="material-icons text-[#fbd01d] text-2xl">schedule</span>
                <div>
                  <div class="text-[12px] font-bold">Response Time</div>
                  <div class="text-[13px] text-white/70">We respond within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right - Contact Form -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg">
              @if (submitted()) {
                <!-- Success State -->
                <div class="text-center py-10">
                  <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="material-icons text-green-600 text-4xl">check_circle</span>
                  </div>
                  <h3 class="text-[22px] font-black text-slate-900 mb-2">Message Sent! 🎉</h3>
                  <p class="text-slate-500 text-[14px] max-w-sm mx-auto">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  <button (click)="resetForm()" 
                          class="mt-6 text-[#001a5e] font-bold text-[14px] hover:underline flex items-center gap-2 mx-auto">
                    <span class="material-icons text-base">refresh</span>
                    Send another message
                  </button>
                </div>
              } @else {
                <div>
                  <h3 class="text-[20px] font-black text-slate-900 mb-2">Send a Message</h3>
                  <p class="text-slate-500 text-[13px] mb-6">Fill in the form below and we'll get back to you promptly</p>
                  
                  <form (ngSubmit)="submit()" class="space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-[12px] font-bold text-slate-700 mb-1.5">Full Name *</label>
                        <input [(ngModel)]="form.name" 
                               name="name"
                               type="text" 
                               placeholder="Your full name"
                               class="form-input w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] transition-all"
                               required>
                      </div>
                      <div>
                        <label class="block text-[12px] font-bold text-slate-700 mb-1.5">Email Address *</label>
                        <input [(ngModel)]="form.email" 
                               name="email"
                               type="email" 
                               placeholder="your@email.com"
                               class="form-input w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] transition-all"
                               required>
                      </div>
                    </div>

                    <div>
                      <label class="block text-[12px] font-bold text-slate-700 mb-1.5">Subject *</label>
                      <input [(ngModel)]="form.subject" 
                             name="subject"
                             type="text" 
                             placeholder="What is this regarding?"
                             class="form-input w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] transition-all"
                             required>
                    </div>

                    <div>
                      <label class="block text-[12px] font-bold text-slate-700 mb-1.5">Message *</label>
                      <textarea [(ngModel)]="form.message" 
                                name="message"
                                rows="5" 
                                placeholder="Tell us how we can help you..."
                                class="form-input w-full border border-slate-200 rounded-xl px-4 py-3 text-[14px] transition-all resize-none"
                                required></textarea>
                    </div>

                    @if (error()) {
                      <div class="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                        <span class="material-icons text-red-500 text-[18px]">error</span>
                        <p class="text-red-600 text-[13px]">{{ error() }}</p>
                      </div>
                    }

                    <button type="submit" 
                            [disabled]="sending()"
                            class="w-full bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] py-3.5 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md">
                      @if (sending()) {
                        <span class="animate-spin material-icons text-base">refresh</span>
                        Sending...
                      } @else {
                        <span class="material-icons text-base">send</span>
                        Send Message
                      }
                    </button>

                    <p class="text-[11px] text-slate-400 text-center">We'll never share your information. Privacy guaranteed.</p>
                  </form>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CALL TO ACTION CARDS ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-100 to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">rocket</span>
            Partner With ESIC
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">How Can We Help You?</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Explore the different ways you can engage with ESIC and be part of the STEM education revolution
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (cta of ctaOptions; track cta.title) {
            <a [routerLink]="cta.route"
               class="bg-white rounded-2xl p-6 border border-slate-200 cta-card text-center group">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                   [style.background]="cta.bg">
                <span class="material-icons text-[28px]" [style.color]="cta.color">{{ cta.icon }}</span>
              </div>
              <h4 class="font-extrabold text-[15px] text-slate-900 mb-1 group-hover:text-[#001a5e] transition-colors">
                {{ cta.title }}
              </h4>
              <p class="text-[12px] text-slate-500 leading-relaxed">{{ cta.description }}</p>
              <div class="mt-3 text-[#001a5e] font-bold text-[12px] flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                <span>Learn More</span>
                <span class="material-icons text-base">arrow_forward</span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- ══ PARTNERSHIP OPPORTUNITIES ══ -->
    <section class="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="w-20 h-20 rounded-2xl bg-[#fbd01d]/20 flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-4xl text-[#fbd01d]">handshake</span>
        </div>
        
        <h2 class="text-[clamp(28px,4vw,42px)] font-black text-white mb-4">
          Ready to Partner With ESIC?
        </h2>
        
        <p class="text-white/70 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
          Join us in transforming STEM education across Kenya. We're looking for passionate partners who share our vision.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/contact" 
             class="inline-flex items-center gap-3 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[15px] px-10 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_48px_rgba(251,208,29,0.5)]">
            <span class="material-icons text-base">handshake</span>
            Partner With Us
          </a>
          <a routerLink="/partners" 
             class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-bold text-[15px] px-10 py-4 rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/50">
            <span class="material-icons text-base">groups</span>
            View Our Partners
          </a>
        </div>
        
        <div class="mt-8 flex flex-wrap justify-center gap-6 text-white/40 text-[11px]">
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">verified</span>
            No partnership fees
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">update</span>
            Flexible collaboration
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-[14px]">support</span>
            Dedicated support
          </span>
        </div>
      </div>
    </section>

    <!-- ══ MAP / LOCATION ══ -->
    <section class="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-3">
              <span class="material-icons align-middle text-[14px] mr-1">location_on</span>
              Visit Us
            </div>
            <h3 class="text-[clamp(24px,2.5vw,32px)] font-black text-slate-900 mb-3">Find Us at Chuka University</h3>
            <p class="text-slate-600 text-[14px] leading-relaxed mb-4">
              Our main campus is located at Chuka University, Tharaka-Nithi County. We welcome visitors by appointment.
            </p>
            <div class="space-y-2 text-[14px] text-slate-600">
              <div class="flex items-center gap-3">
                <span class="material-icons text-[#fbd01d] text-[18px]">location_on</span>
                <span>Chuka University, P.O. Box 109-60400</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-icons text-[#fbd01d] text-[18px]">phone</span>
                <span>+254 714 477 084</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="material-icons text-[#fbd01d] text-[18px]">email</span>
                <span>jmachoka&#64;chuka.ac.ke</span>
              </div>
            </div>
          </div>
          <div class="bg-slate-200 rounded-2xl h-64 flex items-center justify-center border border-slate-300">
            <div class="text-center text-slate-400">
              <span class="material-icons text-5xl block mb-2">map</span>
              <p class="text-[13px] font-medium">Interactive Map</p>
              <p class="text-[11px]">Chuka University, Tharaka-Nithi, Kenya</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements AfterViewInit {
  private api = inject(ApiService);
  
  form = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);
  sending = signal(false);
  error = signal('');

  contactInfo = [
    {
      icon: 'phone',
      label: 'Phone',
      value: '+254 714 477 084',
      color: '#2563eb',
      bg: '#dbeafe'
    },
    {
      icon: 'email',
      label: 'Email',
      value: 'jmachoka@chuka.ac.ke',
      subValue: 'esic@chuka.ac.ke',
      color: '#7c3aed',
      bg: '#ede9fe'
    },
    {
      icon: 'location_on',
      label: 'Address',
      value: 'Chuka University, Tharaka-Nithi',
      subValue: 'P.O. Box 109-60400, Kenya',
      color: '#ea580c',
      bg: '#fff7ed'
    },
    {
      icon: 'schedule',
      label: 'Working Hours',
      value: 'Mon – Fri, 8:00 AM – 5:00 PM',
      subValue: 'Weekends by appointment',
      color: '#16a34a',
      bg: '#dcfce7'
    }
  ];

  socialLinks = [
    { platform: 'Facebook', icon: 'facebook', url: 'https://facebook.com/esic', color: '#1877f2', bg: '#e7f3ff' },
    { platform: 'Twitter', icon: 'twitter', url: 'https://twitter.com/esic', color: '#1da1f2', bg: '#e8f5fe' },
    { platform: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/company/esic', color: '#0a66c2', bg: '#e8f0fe' },
    { platform: 'YouTube', icon: 'youtube', url: 'https://youtube.com/esic', color: '#ff0000', bg: '#fde8e8' },
    { platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com/esic', color: '#e4405f', bg: '#fde8ef' }
  ];

  ctaOptions = [
    {
      title: 'Request a Demo',
      icon: 'play_circle',
      color: '#2563eb',
      bg: '#dbeafe',
      route: '/contact/demo',
      description: 'See our solutions in action with a personalized demonstration'
    },
    {
      title: 'Become a Distributor',
      icon: 'storefront',
      color: '#16a34a',
      bg: '#dcfce7',
      route: '/contact/distributor',
      description: 'Partner with us to distribute ESIC products across Kenya'
    },
    {
      title: 'Book a School Visit',
      icon: 'school',
      color: '#7c3aed',
      bg: '#ede9fe',
      route: '/contact/school-visit',
      description: 'Invite ESIC to your school for STEM demonstrations and workshops'
    },
    {
      title: 'Partner With ESIC',
      icon: 'handshake',
      color: '#fbd01d',
      bg: '#fef9c3',
      route: '/contact/partner',
      description: 'Explore strategic partnerships and collaboration opportunities'
    }
  ];

  submit() {
    const { name, email, subject, message } = this.form;
    if (!name || !email || !subject || !message) {
      this.error.set('All fields are required. Please fill in all fields.');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      this.error.set('Please enter a valid email address.');
      return;
    }
    
    this.error.set('');
    this.sending.set(true);
    
    this.api.post('/contact', this.form).subscribe({
      next: () => {
        this.submitted.set(true);
        this.sending.set(false);
        this.form = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.error.set('Failed to send message. Please try again or contact us directly via email.');
        this.sending.set(false);
      },
    });
  }

  resetForm() {
    this.submitted.set(false);
    this.error.set('');
  }

  ngAfterViewInit() {
    // Scroll to top on load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}