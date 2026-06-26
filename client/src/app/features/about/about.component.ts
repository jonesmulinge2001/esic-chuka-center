import { Component, OnInit, signal, inject, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  styles: [`
    /* ── Keyframes ── */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scrollDot {
      0%,100% { transform: translateY(0); opacity: 1; }
      50%     { transform: translateY(8px); opacity: .3; }
    }
    @keyframes shimmer {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes orbFloat {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-14px); }
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(37,99,235,.3); }
      50%     { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
    }
    @keyframes cardSlideUp {
      from { opacity: 0; transform: translateY(50px) scale(.94); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes objPop {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    /* ── Hero ── */
    .hero-section {
      position: relative;
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background: url('/images/esic-bg.jpeg') center/cover fixed;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,
        rgba(0,30,92,.88) 0%,
        rgba(0,51,153,.78) 50%,
        rgba(10,30,80,.85) 100%);
    }
    .hero-orb {
      position: absolute; border-radius: 50%;
      filter: blur(80px); pointer-events: none;
    }
    .orb-gold {
      width: 350px; height: 350px;
      background: rgba(245,197,24,.08);
      top: -80px; right: 8%;
      animation: orbFloat 5s ease-in-out infinite;
    }
    .orb-green {
      width: 250px; height: 250px;
      background: rgba(16,185,129,.07);
      bottom: -60px; left: 5%;
      animation: orbFloat 6s ease-in-out infinite 1s;
    }
    .hero-content {
      position: relative; z-index: 2;
      max-width: 860px; text-align: center;
      padding: 60px 24px;
      animation: fadeInUp .9s ease both;
    }
    .hero-eyebrow {
      display: inline-block;
      padding: 6px 20px;
      background: rgba(255,255,255,.12);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,.22);
      border-radius: 30px;
      color: #fff; font-size: 11px; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .hero-heading {
      font-size: clamp(42px, 7vw, 80px);
      font-weight: 900; color: #fff;
      line-height: 1.02; margin-bottom: 18px;
    }
    .heading-gold {
      background: linear-gradient(90deg, #f5c518, #ffd94d, #f5c518);
      background-size: 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .hero-sub {
      color: rgba(255,255,255,.8);
      font-size: clamp(15px, 2vw, 20px);
      line-height: 1.65; margin-bottom: 32px;
    }
    .hero-btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-bottom: 36px; }
    .btn-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: #fff; color: #1d3a8a;
      font-weight: 800; font-size: 13px;
      padding: 13px 28px; border-radius: 30px;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(0,0,0,.2);
      animation: pulse 2.5s ease-in-out infinite;
      transition: transform .2s, box-shadow .2s;
    }
    .btn-white:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 14px 32px rgba(0,0,0,.3); }
    .btn-ghost-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,.12); color: #fff;
      font-weight: 700; font-size: 13px;
      padding: 13px 28px; border-radius: 30px;
      text-decoration: none;
      border: 2px solid rgba(255,255,255,.35);
      backdrop-filter: blur(8px);
      transition: transform .2s, background .2s;
    }
    .btn-ghost-white:hover { transform: translateY(-2px); background: rgba(255,255,255,.2); }

    /* Hero stats */
    .hero-stats {
      display: flex; justify-content: center; flex-wrap: wrap; gap: 32px;
      border-top: 1px solid rgba(255,255,255,.15);
      padding-top: 24px;
    }
    .stat-val { font-size: 26px; font-weight: 900; color: #f5c518; }
    .stat-lbl { font-size: 11px; color: rgba(255,255,255,.65); margin-top: 2px; }

    /* Scroll indicator */
    .scroll-indicator {
      position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 3;
    }
    .scroll-outer {
      width: 24px; height: 40px;
      border: 2px solid rgba(255,255,255,.4);
      border-radius: 12px; display: flex;
      justify-content: center; padding-top: 6px;
    }
    .scroll-inner {
      width: 4px; height: 10px;
      background: rgba(255,255,255,.5); border-radius: 2px;
      animation: scrollDot 2s ease-in-out infinite;
    }

    /* ── Mission / Vision image cards ── */
    .img-card {
      position: relative; overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0,30,92,.1);
      cursor: pointer;
      transition: transform .4s cubic-bezier(.34,1.2,.64,1), box-shadow .4s;
    }
    .img-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,30,92,.18); }
    .img-card img {
      width: 100%; height: 240px; object-fit: cover; display: block;
      transition: transform .6s ease;
    }
    .img-card:hover img { transform: scale(1.08); }
    .img-card-overlay {
      position: absolute; inset: 0;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 20px;
      background: linear-gradient(to top,
        rgba(0,30,92,.85) 0%,
        rgba(0,30,92,.2) 60%,
        transparent 100%);
      transform: translateY(60%);
      transition: transform .4s ease;
    }
    .img-card:hover .img-card-overlay { transform: translateY(0); }
    .img-card-tag {
      display: inline-block; font-size: 10px; font-weight: 700;
      letter-spacing: .06em; text-transform: uppercase;
      padding: 3px 10px; border-radius: 20px;
      margin-bottom: 6px; width: fit-content;
    }
    .card-img-title { color: #fff; font-size: 15px; font-weight: 800; margin-bottom: 4px; }
    .card-img-desc  { color: rgba(255,255,255,.8); font-size: 12px; line-height: 1.5; }

    /* Desc card */
    .desc-card {
      background: #fff; border-radius: 20px;
      border: 1px solid #e2e8f7; padding: 28px 32px;
      box-shadow: 0 4px 20px rgba(0,30,92,.06);
    }
    .desc-card p { color: #374151; font-size: 15px; line-height: 1.8; }
    .desc-accent  { color: #1d4ed8; font-weight: 700; }

    /* ── Objectives ── */
    .objectives-section {
      position: relative; padding: 64px 0; overflow: hidden;
    }
    .obj-bg {
      position: absolute; inset: 0;
      background: url('/images/esic-bg.jpeg') center/cover;
    }
    .obj-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,
        rgba(15,23,42,.95) 0%,
        rgba(30,58,138,.9) 50%,
        rgba(76,29,149,.92) 100%);
    }
    .obj-item {
      display: flex; align-items: flex-start; gap: 14px;
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(12px);
      padding: 18px 20px; border-radius: 14px;
      border: 1px solid rgba(255,255,255,.1);
      opacity: 0;
      transition: background .25s, transform .25s, opacity .4s;
    }
    .obj-item.visible { opacity: 1; }
    .obj-item:hover { background: rgba(255,255,255,.15); transform: translateY(-2px); }
    .obj-check {
      flex-shrink: 0; width: 34px; height: 34px;
      background: linear-gradient(135deg, #10b981, #2563eb);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(37,99,235,.3);
      animation: pulse 3s ease-in-out infinite;
    }
    .obj-text { color: rgba(255,255,255,.88); font-size: 13px; line-height: 1.6; }

    /* ── Team ── */
    .team-section { background: #f8faff; padding: 64px 0; }
    .team-card {
      position: relative; background: #fff;
      border-radius: 20px; padding: 28px 20px; text-align: center;
      border: 1px solid #e8edf8; overflow: hidden;
      transition: transform .35s cubic-bezier(.34,1.3,.64,1),
                  box-shadow .35s, border-color .35s;
    }
    .team-card::before {
      content: ''; position: absolute; inset: -1px;
      border-radius: 20px;
      background: linear-gradient(135deg, #2563eb, #10b981, #4f46e5);
      opacity: 0; transition: opacity .35s; z-index: 0;
    }
    .team-card::after {
      content: ''; position: absolute; inset: 1px;
      border-radius: 19px; background: #fff; z-index: 0;
    }
    .team-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(0,30,92,.14); }
    .team-card:hover::before { opacity: 1; }
    .team-card-inner { position: relative; z-index: 1; }
    .avatar-ring {
      position: relative; width: 80px; height: 80px;
      border-radius: 50%; margin: 0 auto 16px;
    }
    .avatar-ring::before {
      content: ''; position: absolute; inset: -3px; border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #10b981, #4f46e5);
      opacity: .6; transition: opacity .35s;
    }
    .team-card:hover .avatar-ring::before { opacity: 1; }
    .avatar-inner {
      position: absolute; inset: 0; border-radius: 50%;
      background: #f0f4ff;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; border: 2px solid #fff;
    }
    .member-name { font-size: 14px; font-weight: 800; color: #001e5c; margin-bottom: 3px; }
    .member-role { font-size: 11px; font-weight: 700; color: #2563eb; margin-bottom: 10px; }
    .member-bio  {
      font-size: 11px; color: #64748b; line-height: 1.6; margin-bottom: 14px;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .member-actions { display: flex; justify-content: center; gap: 8px; }
    .member-btn {
      width: 30px; height: 30px; border-radius: 50%;
      background: #f1f5f9; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s, transform .2s;
    }
    .member-btn:hover { background: #dbeafe; transform: scale(1.1); }

    /* ── CTA ── */
    .cta-section {
      position: relative; padding: 72px 0; overflow: hidden; text-align: center;
    }
    .cta-bg {
      position: absolute; inset: 0;
      background: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80') center/cover;
    }
    .cta-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(0,30,92,.9), rgba(0,51,153,.85));
    }
    .cta-content {
      position: relative; z-index: 1;
      max-width: 640px; margin: 0 auto; padding: 0 24px;
    }
    .cta-eyebrow {
      display: inline-block;
      background: rgba(245,197,24,.15); color: #f5c518;
      border: 1px solid rgba(245,197,24,.3);
      font-size: 11px; font-weight: 700; letter-spacing: .1em;
      text-transform: uppercase; padding: 4px 14px;
      border-radius: 20px; margin-bottom: 16px;
    }

    /* ── Utilities ── */
    .section-eyebrow {
      display: inline-block; font-size: 11px; font-weight: 700;
      letter-spacing: .1em; text-transform: uppercase;
      padding: 4px 14px; border-radius: 20px; margin-bottom: 10px;
    }
    .eyebrow-blue   { background: #dbeafe; color: #1d4ed8; }
    .eyebrow-green  { background: #d1fae5; color: #047857; }
    .eyebrow-purple { background: rgba(79,70,229,.12); color: #4338ca; }
    .section-title  { font-size: clamp(26px, 4vw, 40px); font-weight: 900; color: #001e5c; margin-bottom: 8px; }
    .section-sub    { color: #64748b; font-size: 14px; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  `],
  template: `
    <!-- ══ HERO ══ -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-orb orb-gold"></div>
      <div class="hero-orb orb-green"></div>

      <div class="hero-content">
        <div class="hero-eyebrow">ESIC | Chuka University</div>
        <h1 class="hero-heading">
          ESIC<br>
          <span class="heading-gold">STEM LAB</span>
        </h1>
        <p class="hero-sub">
          Electronics &amp; Software Innovation Center<br>
          Empowering Africa's next generation of builders and thinkers
        </p>
        <div class="hero-btns">
          <button class="btn-white">
            <span class="material-icons-outlined text-base">explore</span>
            Explore Our Center
          </button>
          <button class="btn-ghost-white">
            <span class="material-icons-outlined text-base">location_on</span>
            Visit Us
          </button>
        </div>
        <!-- Stats row in hero -->
        <div class="hero-stats">
          @for (stat of stats; track stat.label) {
            <div class="text-center">
              <div class="stat-val">{{ stat.value }}</div>
              <div class="stat-lbl">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-outer"><div class="scroll-inner"></div></div>
      </div>
    </section>

    <!-- ══ MISSION ══ -->
    <section class="py-16 px-4" style="background: linear-gradient(to bottom, #f8fafc, #fff)">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="section-eyebrow eyebrow-blue">Our Purpose</div>
          <h2 class="section-title">Our Mission</h2>
          <p class="section-sub mx-auto">Empowering the next generation of innovators through quality STEM education</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-5 mb-7">
          @for (card of missionCards; track card.title) {
            <div class="img-card">
              <img [src]="card.image" [alt]="card.title" class="w-full h-60 object-cover">
              <div class="img-card-overlay">
                <span class="img-card-tag" [style.background]="card.tagBg + '0.75)'" style="color:#fff">{{ card.tag }}</span>
                <div class="card-img-title">{{ card.title }}</div>
                <div class="card-img-desc">{{ card.desc }}</div>
              </div>
            </div>
          }
        </div>

        <div class="desc-card">
          <p>
            To provide accessible, high-quality STEM education and innovation opportunities that empower
            students, educators, and communities across Kenya and beyond. Through our
            <span class="desc-accent">ESIC</span>, we bridge the gap between theoretical knowledge
            and practical application.
          </p>
        </div>
      </div>
    </section>

    <!-- ══ VISION ══ -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <div class="section-eyebrow eyebrow-green">Future Forward</div>
          <h2 class="section-title">Our Vision</h2>
          <p class="section-sub mx-auto">Building a future where African innovation leads the world</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-5 mb-7">
          @for (card of visionCards; track card.title) {
            <div class="img-card">
              <img [src]="card.image" [alt]="card.title" class="w-full h-60 object-cover">
              <div class="img-card-overlay">
                <span class="img-card-tag" [style.background]="card.tagBg + '0.75)'" style="color:#fff">{{ card.tag }}</span>
                <div class="card-img-title">{{ card.title }}</div>
                <div class="card-img-desc">{{ card.desc }}</div>
              </div>
            </div>
          }
        </div>

        <div class="desc-card" style="background:#f8faff; border-color:#dce6f7">
          <p>
            To be the leading center for STEM innovation and technology education in the Mount Kenya region,
            producing world-class engineers and innovators who solve Africa's challenges. Our
            <span class="desc-accent">ESIC</span> serves as a hub for cutting-edge research
            and technological advancement.
          </p>
        </div>
      </div>
    </section>

    <!-- ══ OBJECTIVES ══ -->
    <section class="objectives-section">
      <div class="obj-bg"></div>
      <div class="obj-overlay"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-4">
        <div class="text-center mb-10">
          <div class="section-eyebrow" style="background:rgba(16,185,129,.18);color:#34d399">Our Goals</div>
          <h2 class="text-3xl font-black text-white mb-2">Core Objectives</h2>
          <p class="text-white/65 text-sm">Strategic pillars guiding our STEM education initiatives</p>
        </div>
        <div class="grid md:grid-cols-2 gap-3.5">
          @for (obj of objectives; track obj; let i = $index) {
            <div class="obj-item" #objRef [attr.data-index]="i">
              <div class="obj-check">
                <span class="material-icons-outlined text-white text-base">check</span>
              </div>
              <span class="obj-text">{{ obj }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ══ TEAM ══ -->
    <section class="team-section">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <div class="section-eyebrow eyebrow-blue">Meet the Team</div>
          <h2 class="section-title">Our Team</h2>
          <p class="section-sub mx-auto">Passionate innovators driving STEM education forward at Chuka University</p>
        </div>

        @if (team().length > 0) {
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            @for (member of team(); track member.id) {
              <div class="team-card">
                <div class="team-card-inner">
                  <div class="avatar-ring">
                    <div class="avatar-inner">
                      @if (member.avatarUrl) {
                        <img [src]="member.avatarUrl" [alt]="member.name" class="w-full h-full rounded-full object-cover">
                      } @else {
                        <span class="material-icons-outlined text-[#2563eb] text-4xl">person</span>
                      }
                    </div>
                  </div>
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-role">{{ member.title }}</div>
                  <div class="member-bio">{{ member.bio }}</div>
                  <div class="member-actions">
                    <button class="member-btn" title="Profile">
                      <span class="material-icons-outlined text-gray-500 text-sm">link</span>
                    </button>
                    <button class="member-btn" title="Email">
                      <span class="material-icons-outlined text-gray-500 text-sm">email</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="text-center py-16 bg-white rounded-2xl border border-[#e8edf8]">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0f4ff] mb-4">
              <span class="material-icons-outlined text-[#2563eb] text-4xl">people</span>
            </div>
            <p class="text-slate-400 text-sm">Team information coming soon.</p>
          </div>
        }
      </div>
    </section>

    <!-- ══ CTA ══ -->
    <section class="cta-section">
      <div class="cta-bg"></div>
      <div class="cta-overlay"></div>
      <div class="cta-content">
        <div class="cta-eyebrow">Come See Us</div>
        <h2 class="text-4xl font-black text-white mb-3">Visit ESIC</h2>
        <p class="text-white/75 text-sm leading-relaxed mb-7">
          Experience innovation firsthand at Chuka University's state-of-the-art STEM
          research facility in Tharaka Nithi County.
        </p>
        <div class="hero-btns">
          <button class="btn-white">
            <span class="material-icons-outlined text-base">calendar_month</span>
            Schedule a Visit
          </button>
          <button class="btn-ghost-white">
            <span class="material-icons-outlined text-base">info</span>
            Learn More
          </button>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);

  @ViewChildren('objRef') objEls!: QueryList<ElementRef>;

  team = signal<any[]>([]);

  stats = [
    { value: '61+',   label: 'Experiments' },
    { value: '1000+', label: 'Students Reached' },
    { value: '50+',   label: 'Schools Served' },
    { value: '10+',   label: 'Learning Systems' },
  ];

  missionCards = [
    {
      image: '/images/esic-b1.jpeg', tag: 'Education',
      tagBg: 'rgba(37,99,235,',
      title: 'Quality Education',
      desc: 'Delivering high-quality STEM education from early childhood to advanced university level',
    },
    {
      image: '/images/esic-b2.jpeg', tag: 'Innovation',
      tagBg: 'rgba(16,185,129,',
      title: 'Innovation Culture',
      desc: 'Fostering a culture of innovation, research, and entrepreneurship among students',
    },
    {
      image: '/images/esic-b3.jpeg', tag: 'Community',
      tagBg: 'rgba(79,70,229,',
      title: 'Community Impact',
      desc: 'Engaging communities through outreach programs and STEM awareness initiatives',
    },
  ];

  visionCards = [
    {
      image: '/images/esic-b4.jpeg', tag: 'Engineering',
      tagBg: 'rgba(16,185,129,',
      title: 'World-Class Engineers',
      desc: 'Producing engineers and innovators who solve Africa\'s most pressing challenges',
    },
    {
      image: '/images/esic-b33.jpeg', tag: 'Research',
      tagBg: 'rgba(37,99,235,',
      title: 'Research Excellence',
      desc: 'Leading center for STEM innovation in the Mount Kenya region',
    },
    {
      image: '/images/esic-gl.jpeg', tag: 'Global',
      tagBg: 'rgba(79,70,229,',
      title: 'Global Leadership',
      desc: 'Empowering students, educators, and communities across Kenya and beyond',
    },
  ];

  objectives = [
    'Deliver high-quality STEM education from early childhood to advanced university level',
    'Foster a culture of innovation, research, and entrepreneurship',
    'Build strategic partnerships with industry and academic institutions',
    'Provide hands-on laboratory and industrial training experiences',
    'Promote gender equality and inclusivity in STEM fields',
    'Support student project development and innovation showcases',
    'Develop STEM resources and curriculum materials for educators',
    'Engage communities through outreach and STEM awareness programs',
  ];

  ngOnInit() {
    this.api.get<any[]>('/team').subscribe({
      next: data => this.team.set(data),
      error: () => this.team.set([]),
    });
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') return;

    // Stagger objective items in
    const objObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const idx = parseInt(el.getAttribute('data-index') || '0');
          setTimeout(() => el.classList.add('visible'), idx * 80);
          objObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    this.objEls.forEach(el => objObserver.observe(el.nativeElement));
  }
}