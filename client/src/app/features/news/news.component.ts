import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe],
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
    
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
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
    
    .animate-slide-in-left {
      animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .animate-slide-in-right {
      animation: slideInRight 0.6s ease-out forwards;
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .news-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
    }
    
    .news-card.visible {
      opacity: 1;
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .news-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 26, 94, 0.12);
    }
    
    .news-image {
      transition: transform 0.6s ease;
    }
    
    .news-card:hover .news-image {
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
    
    .category-chip {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .category-chip:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 26, 94, 0.15);
    }
    
    .category-chip.active {
      background: #001a5e;
      color: white;
      border-color: #001a5e;
    }
    
    .featured-news {
      transition: all 0.4s ease;
    }
    
    .featured-news:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 64px rgba(0, 26, 94, 0.15);
    }
    
    .timeline-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #fbd01d;
      background: white;
      position: relative;
      flex-shrink: 0;
    }
    
    .timeline-dot::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #fbd01d;
    }
    
    .timeline-line {
      width: 2px;
      background: linear-gradient(180deg, #fbd01d, transparent);
      flex-shrink: 0;
      margin: 0 auto;
    }
    
    .newsletter-input:focus {
      outline: none;
      border-color: #fbd01d;
      box-shadow: 0 0 0 3px rgba(251, 208, 29, 0.2);
    }
    
    .filter-btn {
      transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
      background: #001a5e;
      color: white;
      border-color: #001a5e;
    }
    
    .filter-btn.active {
      background: #001a5e;
      color: white;
      border-color: #001a5e;
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
          <span class="material-icons align-middle text-[14px] mr-1">newspaper</span>
          News & Updates
        </div>
        
        <h1 class="text-[clamp(38px,5.5vw,56px)] font-black text-white leading-[1.05] mb-4">
          Latest News
        </h1>
        
        <p class="text-white/80 text-[16px] leading-relaxed max-w-2xl mx-auto">
          Stay updated with the latest from ESIC — product launches, workshops, competitions, and community impact
        </p>
        
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">50+</div>
            <div class="text-[11px] text-white/50 font-medium">News Articles</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">8</div>
            <div class="text-[11px] text-white/50 font-medium">Categories</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">25+</div>
            <div class="text-[11px] text-white/50 font-medium">Events Covered</div>
          </div>
          <div class="glass-effect rounded-xl p-4">
            <div class="stats-number">100+</div>
            <div class="text-[11px] text-white/50 font-medium">Schools Reached</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CATEGORY FILTERS ══ -->
    <section class="py-8 px-4 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-center gap-2 md:gap-3">
          <button (click)="filterCategory('all')" 
                  class="filter-btn px-4 py-2 rounded-full text-[12px] font-bold border-2 border-slate-200 text-slate-600 hover:border-[#001a5e] transition-all"
                  [class.active]="selectedCategory() === 'all'">
            All News
          </button>
          @for (category of newsCategories; track category.key) {
            <button (click)="filterCategory(category.key)" 
                    class="filter-btn px-4 py-2 rounded-full text-[12px] font-bold border-2 border-slate-200 text-slate-600 hover:border-[#001a5e] transition-all"
                    [class.active]="selectedCategory() === category.key">
              <span class="material-icons align-middle text-[14px] mr-1">{{ category.icon }}</span>
              {{ category.label }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- ══ FEATURED NEWS ══ -->
    @if (featuredNews && selectedCategory() === 'all') {
      <section class="py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 featured-news shadow-lg">
            <div class="grid md:grid-cols-2">
              <div class="h-64 md:h-auto overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                @if (featuredNews.image) {
                  <img [src]="featuredNews.image" 
                       [alt]="featuredNews.title" 
                       class="w-full h-full object-cover news-image">
                } @else {
                  <div class="h-full w-full flex items-center justify-center">
                    <span class="material-icons text-primary-300 text-7xl">{{ featuredNews.icon || 'newspaper' }}</span>
                  </div>
                }
              </div>
              <div class="p-8 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-[10px] font-bold bg-[#fbd01d] text-[#001a5e] px-3 py-1 rounded-full uppercase tracking-[0.06em]">
                    {{ featuredNews.category }}
                  </span>
                  <span class="text-[12px] text-slate-400">{{ featuredNews.date | date:'MMMM d, yyyy' }}</span>
                </div>
                <h2 class="text-[clamp(24px,2.5vw,32px)] font-black text-slate-900 mb-3">
                  {{ featuredNews.title }}
                </h2>
                <p class="text-slate-600 text-[15px] leading-relaxed mb-4">
                  {{ featuredNews.excerpt }}
                </p>
                <a [routerLink]="['/news', featuredNews.slug]" 
                   class="inline-flex items-center gap-2 text-[#001a5e] font-bold text-[14px] hover:gap-3 transition-all">
                  Read Full Story
                  <span class="material-icons text-base">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    }

    <!-- ══ NEWS GRID ══ -->
    <section class="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 mb-2">
              <span class="material-icons align-middle text-[14px] mr-1">feed</span>
              News Feed
            </div>
            <h2 class="text-[clamp(24px,3vw,36px)] font-black text-slate-900">
              @if (selectedCategory() === 'all') {
                All News & Updates
              } @else {
                {{ getCategoryLabel(selectedCategory()) }} News
              }
            </h2>
          </div>
          <span class="text-[13px] text-slate-500 font-medium">{{ filteredNews.length }} articles</span>
        </div>

        @if (filteredNews.length === 0) {
          <div class="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <span class="material-icons text-6xl text-slate-300 block mb-4">search_off</span>
            <p class="text-slate-400 font-medium text-[15px]">No news articles found in this category</p>
            <p class="text-slate-400 text-[13px]">Check back later for updates</p>
          </div>
        } @else {
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (news of filteredNews; track news.id; let i = $index) {
              <a [routerLink]="['/news', news.slug]" 
                 class="bg-white rounded-2xl overflow-hidden border border-slate-200 news-card group"
                 #newsRef [attr.data-index]="i"
                 style="animation-delay: {{ i * 0.06 }}s;">
                
                <div class="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50">
                  @if (news.image) {
                    <img [src]="news.image" 
                         [alt]="news.title" 
                         class="h-full w-full object-cover news-image">
                  } @else {
                    <div class="h-full w-full flex items-center justify-center">
                      <span class="material-icons text-primary-300 text-6xl">{{ news.icon || 'newspaper' }}</span>
                    </div>
                  }
                  <span class="absolute top-3 right-3 text-[9px] font-bold bg-[#fbd01d] text-[#001a5e] px-3 py-1 rounded-full shadow-md">
                    {{ news.category }}
                  </span>
                  @if (news.featured) {
                    <span class="absolute top-3 left-3 text-[9px] font-bold bg-purple-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span class="material-icons text-[12px]">star</span>
                      Featured
                    </span>
                  }
                </div>
                
                <div class="p-5">
                  <div class="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <span class="flex items-center gap-1">
                      <span class="material-icons text-[14px]">calendar_today</span>
                      {{ news.date | date:'MMM d, yyyy' }}
                    </span>
                    <span>·</span>
                    <span>{{ news.readTime }} min read</span>
                  </div>
                  
                  <h3 class="font-display font-bold text-[15px] text-slate-900 group-hover:text-[#001a5e] transition-colors mb-2 line-clamp-2">
                    {{ news.title }}
                  </h3>
                  
                  <p class="text-[13px] text-slate-500 line-clamp-2 mb-3">
                    {{ news.excerpt }}
                  </p>
                  
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2 text-slate-400">
                      <span class="material-icons text-[14px]">person</span>
                      <span>{{ news.author }}</span>
                    </div>
                    <span class="text-[#001a5e] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <span class="material-icons text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </a>
            }
          </div>
        }

        <!-- Load More -->
        @if (filteredNews.length > 6) {
          <div class="text-center mt-10">
            <button class="inline-flex items-center gap-2 bg-white text-[#001a5e] font-bold text-[14px] px-8 py-3.5 rounded-full border-2 border-[#001a5e] hover:bg-[#001a5e] hover:text-white transition-colors shadow-lg">
              <span class="material-icons text-base">refresh</span>
              Load More News
            </button>
          </div>
        }
      </div>
    </section>

    <!-- ══ TIMELINE / RECENT HIGHLIGHTS ══ -->
    <section class="py-16 md:py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-block text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 mb-3">
            <span class="material-icons align-middle text-[14px] mr-1">timeline</span>
            Recent Highlights
          </div>
          <h2 class="text-[clamp(28px,4vw,42px)] font-black text-slate-900 mb-3">Our Journey So Far</h2>
          <p class="text-slate-600 text-[15px] leading-relaxed mx-auto max-w-2xl">
            Key milestones and achievements from our recent activities
          </p>
          <div class="divider-gradient mt-4"></div>
        </div>

        <div class="space-y-6">
          @for (highlight of timelineHighlights; track highlight.id; let i = $index) {
            <div class="flex gap-4 items-start">
              <div class="flex flex-col items-center">
                <div class="timeline-dot"></div>
                @if (i < timelineHighlights.length - 1) {
                  <div class="timeline-line h-16"></div>
                }
              </div>
              <div class="bg-white rounded-2xl p-6 border border-slate-200 flex-1 hover:shadow-md transition-shadow">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <span class="text-[10px] font-bold bg-[#fbd01d] text-[#001a5e] px-3 py-1 rounded-full uppercase tracking-[0.06em]">
                    {{ highlight.category }}
                  </span>
                  <span class="text-[12px] text-slate-400">{{ highlight.date | date:'MMMM d, yyyy' }}</span>
                </div>
                <h4 class="font-bold text-[15px] text-slate-900 mb-1">{{ highlight.title }}</h4>
                <p class="text-[13px] text-slate-500">{{ highlight.description }}</p>
                @if (highlight.link) {
                  <a [routerLink]="highlight.link" 
                     class="inline-block mt-3 text-[#001a5e] font-bold text-[12px] hover:underline">
                    Learn More →
                  </a>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ NEWSLETTER SIGNUP ══ -->
    <section class="relative overflow-hidden py-16 md:py-20 px-4 bg-gradient-to-br from-[#001a5e] via-[#012a8a] to-[#094ed3] border-y-4 border-[#fbd01d]">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <div class="w-16 h-16 rounded-2xl bg-[#fbd01d]/20 flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-3xl text-[#fbd01d]">mail</span>
        </div>
        
        <h3 class="text-[clamp(24px,3vw,36px)] font-black text-white mb-3">
          Subscribe to Our Newsletter
        </h3>
        
        <p class="text-white/70 text-[15px] leading-relaxed max-w-lg mx-auto mb-6">
          Get the latest news, product updates, and event announcements delivered to your inbox
        </p>
        
        <div class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input type="email" 
                 placeholder="Enter your email address" 
                 class="newsletter-input flex-1 px-5 py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 text-[14px]">
          <button class="inline-flex items-center justify-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg whitespace-nowrap">
            <span class="material-icons text-base">send</span>
            Subscribe
          </button>
        </div>
        
        <p class="text-white/40 text-[11px] mt-4">No spam, unsubscribe anytime</p>
      </div>
    </section>

    <!-- ══ FINAL CTA ══ -->
    <section class="py-16 px-4 bg-gradient-to-b from-slate-100 to-white">
      <div class="max-w-4xl mx-auto text-center">
        <div class="w-16 h-16 rounded-2xl bg-[#fbd01d]/10 flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-3xl text-[#fbd01d]">share</span>
        </div>
        
        <h3 class="text-[clamp(24px,3vw,36px)] font-black text-slate-900 mb-3">
          Share Your News With Us
        </h3>
        
        <p class="text-slate-600 text-[15px] leading-relaxed max-w-xl mx-auto mb-6">
          Have a story to share? We'd love to hear about your ESIC experiences and achievements
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a routerLink="/contact" 
             class="inline-flex items-center gap-2 bg-[#fbd01d] text-[#001a5e] font-extrabold text-[14px] px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(251,208,29,0.3)] hover:scale-105 transition-transform">
            <span class="material-icons text-base">edit</span>
            Submit a Story
          </a>
          <a routerLink="/contact" 
             class="inline-flex items-center gap-2 bg-white text-[#001a5e] font-bold text-[14px] px-8 py-4 rounded-full border-2 border-[#001a5e] hover:bg-slate-50 transition-colors">
            <span class="material-icons text-base">contact_mail</span>
            Contact PR Team
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NewsComponent implements OnInit, AfterViewInit {
  @ViewChildren('newsRef') newsEls!: QueryList<ElementRef>;
  
  selectedCategory = signal<string>('all');
  
  newsCategories = [
    { key: 'products', label: 'Latest Products', icon: 'smart_toy' },
    { key: 'workshops', label: 'Training Workshops', icon: 'school' },
    { key: 'visits', label: 'School Visits', icon: 'location_on' },
    { key: 'competitions', label: 'Competitions', icon: 'emoji_events' },
    { key: 'research', label: 'Research Publications', icon: 'science' },
    { key: 'science-fair', label: 'Science Fair Winners', icon: 'stars' },
    { key: 'teacher-training', label: 'Teacher Training', icon: 'teaching' },
    { key: 'outreach', label: 'Community Outreach', icon: 'volunteer_activism' }
  ];

  // Featured news item
  featuredNews = {
    id: 0,
    slug: 'esic-launches-ai-robotics-kit',
    title: 'ESIC Launches New AI-Powered Robotics Kit for Schools',
    excerpt: 'Revolutionary STEM learning kit combines artificial intelligence with hands-on robotics to prepare students for the future of technology.',
    category: 'Latest Products',
    date: new Date('2026-07-01'),
    readTime: 5,
    author: 'ESIC News Team',
    image: '/images/news/ai-robotics-kit.jpg',
    icon: 'smart_toy',
    featured: true
  };

  // All news articles
  allNews = [
    {
      id: 1,
      slug: 'esic-launches-ai-robotics-kit',
      title: 'ESIC Launches New AI-Powered Robotics Kit',
      excerpt: 'Revolutionary STEM learning kit combining AI with hands-on robotics for schools.',
      category: 'Latest Products',
      date: new Date('2026-07-01'),
      readTime: 5,
      author: 'ESIC News Team',
      image: '/images/news/ai-robotics-kit.jpg',
      icon: 'smart_toy',
      featured: true
    },
    {
      id: 2,
      slug: 'teacher-training-workshop-chuka',
      title: 'Teacher Training Workshop Held at Chuka University',
      excerpt: 'Over 50 STEM educators participated in a hands-on workshop on integrating technology in classrooms.',
      category: 'Training Workshops',
      date: new Date('2026-06-25'),
      readTime: 4,
      author: 'Jane Mwangi',
      image: '/images/news/teacher-training.jpg',
      icon: 'school',
      featured: false
    },
    {
      id: 3,
      slug: 'stem-competition-2026-winners',
      title: 'ESIC STEM Competition 2026 Winners Announced',
      excerpt: 'Students from 20 schools showcased their innovations in robotics, AI, and renewable energy.',
      category: 'Competitions',
      date: new Date('2026-06-20'),
      readTime: 6,
      author: 'Peter Ochieng',
      image: '/images/news/competition-winners.jpg',
      icon: 'emoji_events',
      featured: false
    },
    {
      id: 4,
      slug: 'school-visit-kianyaga-high',
      title: 'ESIC Team Visits Kianyaga High School STEM Lab',
      excerpt: 'Official commissioning of the new STEM laboratory and teacher training session.',
      category: 'School Visits',
      date: new Date('2026-06-15'),
      readTime: 3,
      author: 'Mary Wanjiru',
      image: '/images/news/school-visit.jpg',
      icon: 'location_on',
      featured: false
    },
    {
      id: 5,
      slug: 'research-publication-engineering-education',
      title: 'Research Publication on Engineering Education in Kenya',
      excerpt: 'Collaborative research on the impact of hands-on STEM education in developing countries.',
      category: 'Research Publications',
      date: new Date('2026-06-10'),
      readTime: 8,
      author: 'Dr. Sarah Kamau',
      image: '/images/news/research-publication.jpg',
      icon: 'science',
      featured: false
    },
    {
      id: 6,
      slug: 'science-fair-winners-2026',
      title: 'Science Fair Winners: ESIC Students Shine',
      excerpt: 'ESIC-supported students won top awards at the National Science Fair with innovative projects.',
      category: 'Science Fair Winners',
      date: new Date('2026-06-05'),
      readTime: 4,
      author: 'ESIC News Team',
      image: '/images/news/science-fair.jpg',
      icon: 'stars',
      featured: false
    },
    {
      id: 7,
      slug: 'teacher-training-program-launch',
      title: 'New Teacher Training Program Launched in Meru',
      excerpt: 'Comprehensive training program for STEM teachers covering modern teaching methodologies.',
      category: 'Teacher Training',
      date: new Date('2026-05-28'),
      readTime: 5,
      author: 'Grace Atieno',
      image: '/images/news/teacher-training-meru.jpg',
      icon: 'teaching',
      featured: false
    },
    {
      id: 8,
      slug: 'community-outreach-program',
      title: 'Community Outreach Program Reaches 500 Students',
      excerpt: 'ESIC\'s community engagement program brought STEM education to underserved schools.',
      category: 'Community Outreach',
      date: new Date('2026-05-20'),
      readTime: 4,
      author: 'John Mwangi',
      image: '/images/news/community-outreach.jpg',
      icon: 'volunteer_activism',
      featured: false
    },
    {
      id: 9,
      slug: 'industrial-automation-kit',
      title: 'New Industrial Automation Training Kit Released',
      excerpt: 'PLC-based automation kit designed for TVET institutions and engineering students.',
      category: 'Latest Products',
      date: new Date('2026-05-15'),
      readTime: 4,
      author: 'ESIC News Team',
      image: '/images/news/automation-kit.jpg',
      icon: 'precision_manufacturing',
      featured: false
    },
    {
      id: 10,
      slug: 'renewable-energy-workshop',
      title: 'Renewable Energy Workshop for Students',
      excerpt: 'Hands-on workshop on solar energy systems and sustainable power solutions.',
      category: 'Training Workshops',
      date: new Date('2026-05-10'),
      readTime: 3,
      author: 'Peter Ochieng',
      image: '/images/news/renewable-energy.jpg',
      icon: 'solar_power',
      featured: false
    },
    {
      id: 11,
      slug: 'international-robotics-competition',
      title: 'ESIC Team Represents Kenya at International Robotics Competition',
      excerpt: 'Students from ESIC partner schools compete in the World Robotics Olympiad.',
      category: 'Competitions',
      date: new Date('2026-05-05'),
      readTime: 6,
      author: 'Jane Mwangi',
      image: '/images/news/robotics-competition.jpg',
      icon: 'robot',
      featured: false
    },
    {
      id: 12,
      slug: 'university-partnership-announcement',
      title: 'New University Partnership for STEM Research',
      excerpt: 'Strategic collaboration to advance research in engineering and technology education.',
      category: 'Research Publications',
      date: new Date('2026-04-28'),
      readTime: 5,
      author: 'Dr. Sarah Kamau',
      image: '/images/news/university-partnership.jpg',
      icon: 'local_library',
      featured: false
    }
  ];

  // Timeline highlights
  timelineHighlights = [
    {
      id: 1,
      category: 'Latest Products',
      title: 'AI Robotics Kit Launch',
      description: 'Launched an innovative AI-powered robotics learning kit for schools.',
      date: new Date('2026-07-01'),
      link: '/news/esic-launches-ai-robotics-kit'
    },
    {
      id: 2,
      category: 'Training Workshops',
      title: 'Teacher Training at Chuka University',
      description: 'Trained 50+ STEM educators in modern teaching methodologies.',
      date: new Date('2026-06-25'),
      link: '/news/teacher-training-workshop-chuka'
    },
    {
      id: 3,
      category: 'Competitions',
      title: 'STEM Competition 2026',
      description: 'Over 20 schools participated in the annual STEM competition.',
      date: new Date('2026-06-20'),
      link: '/news/stem-competition-2026-winners'
    },
    {
      id: 4,
      category: 'Community Outreach',
      title: 'Reached 500 Students',
      description: 'Community outreach program brought STEM education to underserved schools.',
      date: new Date('2026-05-20'),
      link: '/news/community-outreach-program'
    },
    {
      id: 5,
      category: 'Research Publications',
      title: 'Engineering Education Research Published',
      description: 'Research on hands-on STEM education impact in Kenya published.',
      date: new Date('2026-06-10'),
      link: '/news/research-publication-engineering-education'
    }
  ];

  get filteredNews() {
    return this.allNews.filter(news => {
      if (this.selectedCategory() === 'all') return true;
      return news.category.toLowerCase().replace(/ /g, '-') === this.selectedCategory();
    });
  }

  getCategoryLabel(key: string): string {
    const category = this.newsCategories.find(c => c.key === key);
    return category ? category.label : 'All';
  }

  filterCategory(key: string) {
    this.selectedCategory.set(key);
    // Scroll to top of news grid
    const newsSection = document.querySelector('.news-grid-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnInit() {
    // Any initialization logic
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;
    
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
    
    this.newsEls.forEach((el) => {
      observer.observe(el.nativeElement);
    });
  }
}