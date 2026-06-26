import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, DatePipe, TitleCasePipe],
  styles: [`
    /* ── Layout ── */
    .shell {
      display: grid;
      grid-template-columns: 220px 1fr;
      min-height: 100vh;
      background: #f0f4ff;
    }

    /* ── Sidebar ── */
    .sidebar {
      background: #001e5c;
      padding: 20px 14px;
      display: flex; flex-direction: column; gap: 2px;
      position: sticky; top: 0; height: 100vh;
      overflow-y: auto;
    }
    .sidebar-logo {
      display: flex; align-items: center; gap: 10px;
      padding: 0 6px 18px;
      border-bottom: 1px solid rgba(255,255,255,.1);
      margin-bottom: 6px;
    }
    .logo-badge {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, #003399, #1a4fbf);
      border-radius: 9px; display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 11px; color: #fff; flex-shrink: 0;
    }
    .logo-title { font-weight: 800; font-size: 12px; color: #fff; letter-spacing: .04em; }
    .logo-sub   { font-size: 9px; color: rgba(255,255,255,.45); margin-top: 1px; }

    .nav-section {
      font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      color: rgba(255,255,255,.3); padding: 14px 8px 4px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 9px;
      padding: 8px 10px; border-radius: 9px;
      color: rgba(255,255,255,.6); font-size: 12px; font-weight: 500;
      text-decoration: none; transition: background .15s, color .15s;
      position: relative;
    }
    .nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
    .nav-item.active, .nav-item.rla-active {
      background: rgba(255,255,255,.12); color: #fff;
    }
    .nav-item.active .nav-icon,
    .nav-item.rla-active .nav-icon { color: #facc15; }
    .nav-icon { font-size: 18px; }
    .nav-badge {
      margin-left: auto; background: #ef4444; color: #fff;
      font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 10px;
    }

    .sidebar-footer {
      margin-top: auto; border-top: 1px solid rgba(255,255,255,.1); padding-top: 12px;
    }
    .user-chip {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 10px; border-radius: 9px;
      transition: background .15s; cursor: pointer;
    }
    .user-chip:hover { background: rgba(255,255,255,.08); }
    .user-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 11px; color: #fff; flex-shrink: 0;
    }
    .user-name { font-size: 12px; font-weight: 600; color: #fff; }
    .user-role { font-size: 10px; color: rgba(255,255,255,.4); }

    /* ── Main ── */
    .main { padding: 26px 26px; overflow-y: auto; }

    /* ── Topbar ── */
    .topbar {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 24px;
    }
    .topbar-heading { font-size: 20px; font-weight: 900; color: #001e5c; line-height: 1; }
    .topbar-sub     { font-size: 12px; color: #64748b; margin-top: 3px; }
    .topbar-actions { display: flex; align-items: center; gap: 10px; }
    .top-btn {
      width: 36px; height: 36px; border-radius: 9px;
      background: #fff; border: 1px solid #e2e8f7;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background .15s, border-color .15s;
      position: relative;
    }
    .top-btn:hover { background: #eff4ff; border-color: #bfdbfe; }
    .top-avatar {
      width: 36px; height: 36px; border-radius: 9px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 12px; color: #fff; cursor: pointer;
    }
    .notif-dot {
      position: absolute; top: 6px; right: 6px;
      width: 6px; height: 6px; background: #ef4444;
      border-radius: 50%; border: 1.5px solid #fff;
    }

    /* ── Stats row ── */
    .stats-row {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 14px; margin-bottom: 22px;
    }
    .stat-card {
      background: #fff; border-radius: 14px; border: 1px solid #e8edf8;
      padding: 16px; position: relative; overflow: hidden;
      transition: transform .2s, box-shadow .2s;
    }
    .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,30,92,.08); }
    .stat-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      border-radius: 14px 14px 0 0;
    }
    .stat-blue::before   { background: linear-gradient(90deg, #2563eb, #60a5fa); }
    .stat-green::before  { background: linear-gradient(90deg, #16a34a, #4ade80); }
    .stat-purple::before { background: linear-gradient(90deg, #7c3aed, #a78bfa); }
    .stat-orange::before { background: linear-gradient(90deg, #ea580c, #fb923c); }
    .stat-icon {
      width: 36px; height: 36px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
    }
    .stat-value  { font-size: 24px; font-weight: 900; color: #001e5c; line-height: 1; margin-bottom: 3px; }
    .stat-label  { font-size: 11px; color: #64748b; font-weight: 500; }
    .stat-change {
      font-size: 10px; margin-top: 4px;
      display: flex; align-items: center; gap: 3px; color: #16a34a;
    }

    /* ── Body grid ── */
    .body-grid { display: grid; grid-template-columns: 1fr 300px; gap: 18px; }

    /* ── Section label ── */
    .section-label {
      font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
      color: #94a3b8; margin-bottom: 10px;
    }

    /* ── Action cards ── */
    .actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
    .action-card {
      background: #fff; border-radius: 14px; border: 1.5px solid #e8edf8;
      padding: 16px; text-decoration: none; display: block;
      transition: transform .25s cubic-bezier(.34,1.4,.64,1), box-shadow .25s, border-color .2s;
    }
    .action-card:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 12px 30px rgba(0,30,92,.1);
      border-color: #bfdbfe;
    }
    .action-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; margin-bottom: 12px;
      transition: transform .25s;
    }
    .action-card:hover .action-icon { transform: scale(1.1) rotate(6deg); }
    .action-title { font-size: 13px; font-weight: 800; color: #001e5c; margin-bottom: 3px; }
    .action-desc  { font-size: 11px; color: #64748b; line-height: 1.4; }
    .action-arrow {
      font-size: 14px; color: #94a3b8; margin-top: 8px; display: block;
      transition: color .2s, transform .2s;
    }
    .action-card:hover .action-arrow { color: #2563eb; transform: translateX(3px); }

    /* ── Submissions ── */
    .submissions-section { margin-top: 18px; }
    .sub-item {
      background: #fff; border-radius: 12px; border: 1px solid #e8edf8;
      padding: 13px 16px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      margin-bottom: 8px;
      transition: border-color .2s, box-shadow .2s;
    }
    .sub-item:hover { border-color: #bfdbfe; box-shadow: 0 4px 14px rgba(0,30,92,.06); }
    .sub-title { font-size: 13px; font-weight: 700; color: #001e5c; margin-bottom: 2px; }
    .sub-meta  { font-size: 11px; color: #94a3b8; }
    .sub-status { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
    .empty-card {
      background: #fff; border-radius: 14px; border: 1.5px dashed #dce6f7;
      padding: 32px 20px; text-align: center;
    }

    /* ── Right column ── */
    .right-col { display: flex; flex-direction: column; gap: 14px; }

    /* Progress card */
    .progress-card {
      background: linear-gradient(135deg, #001e5c, #003399);
      border-radius: 14px; padding: 20px; color: #fff;
    }
    .progress-title { font-size: 13px; font-weight: 800; margin-bottom: 3px; }
    .progress-sub   { font-size: 11px; color: rgba(255,255,255,.55); margin-bottom: 14px; }
    .progress-pct   { font-size: 22px; font-weight: 900; color: #facc15; }
    .progress-sublbl{ font-size: 10px; color: rgba(255,255,255,.5); margin-bottom: 8px; }
    .progress-track { background: rgba(255,255,255,.15); border-radius: 20px; height: 7px; overflow: hidden; }
    .progress-fill  { height: 100%; background: linear-gradient(90deg, #facc15, #fb923c); border-radius: 20px; }
    .progress-steps { display: flex; flex-direction: column; gap: 7px; margin-top: 14px; }
    .progress-step  { display: flex; align-items: center; gap: 8px; font-size: 11px; color: rgba(255,255,255,.75); }
    .step-dot       { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot-done       { background: #4ade80; }
    .dot-active     { background: #facc15; animation: pulse 1.5s ease-in-out infinite; }
    .dot-todo       { background: rgba(255,255,255,.25); }

    @keyframes pulse {
      0%,100% { opacity: 1; } 50% { opacity: .5; }
    }

    /* Events mini card */
    .side-card { background: #fff; border-radius: 14px; border: 1px solid #e8edf8; padding: 16px; }
    .side-card-title {
      font-size: 12px; font-weight: 800; color: #001e5c; margin-bottom: 12px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .side-card-link { font-size: 10px; color: #2563eb; font-weight: 700; text-decoration: none; }
    .side-card-link:hover { text-decoration: underline; }

    .event-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .event-item:last-child { border-bottom: none; padding-bottom: 0; }
    .event-date {
      flex-shrink: 0; width: 38px; height: 38px; border-radius: 9px;
      display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
    }
    .event-day { font-size: 15px; font-weight: 900; line-height: 1; }
    .event-mon { font-size: 8px; text-transform: uppercase; letter-spacing: .05em; font-weight: 700; }
    .event-name { font-size: 12px; font-weight: 700; color: #001e5c; line-height: 1.3; margin-bottom: 2px; }
    .event-loc  { font-size: 10px; color: #94a3b8; display: flex; align-items: center; gap: 3px; }

    /* Leaderboard */
    .lb-item { display: flex; align-items: center; gap: 9px; padding: 7px 0; border-bottom: 1px solid #f8faff; }
    .lb-item:last-child { border-bottom: none; }
    .lb-rank { width: 20px; font-size: 11px; font-weight: 800; color: #94a3b8; flex-shrink: 0; text-align: center; }
    .lb-avatar {
      width: 27px; height: 27px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 800; color: #fff; flex-shrink: 0;
    }
    .lb-name { font-size: 12px; font-weight: 600; color: #1e3a8a; flex: 1; }
    .lb-pts  { font-size: 11px; font-weight: 800; color: #2563eb; }
    .lb-me   { background: #eff6ff; border-radius: 8px; padding: 4px 6px; }

    /* Responsive */
    @media (max-width: 1024px) {
      .stats-row { grid-template-columns: 1fr 1fr; }
      .body-grid  { grid-template-columns: 1fr; }
      .right-col  { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    }
    @media (max-width: 768px) {
      .shell   { grid-template-columns: 1fr; }
      .sidebar { display: none; }
      .right-col { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
  `],
  template: `
    <div class="shell">

      <!-- ══ SIDEBAR ══ -->
      <aside class="sidebar">
        <!-- Logo -->
        <div class="sidebar-logo">
          <div class="logo-badge">ES</div>
          <div>
            <div class="logo-title">ESIC</div>
            <div class="logo-sub">STEM LAB</div>
          </div>
        </div>

        <!-- Nav -->
        <div class="nav-section">Main</div>
        <a routerLink="/dashboard" routerLinkActive="rla-active" [routerLinkActiveOptions]="{exact:true}" class="nav-item">
          <span class="material-icons-outlined nav-icon">dashboard</span>Dashboard
        </a>
        <a routerLink="/dashboard/submit-project" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">upload_file</span>Submit project
        </a>
        <a routerLink="/dashboard/my-events" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">event</span>My events
          @if (upcomingEventCount() > 0) {
            <span class="nav-badge">{{ upcomingEventCount() }}</span>
          }
        </a>
        <a routerLink="/resources" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">menu_book</span>Resources
        </a>

        <div class="nav-section">Explore</div>
        <a routerLink="/projects" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">biotech</span>Projects
        </a>
        <a routerLink="/events" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">people</span>Community
        </a>
        <a routerLink="/leaderboard" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">emoji_events</span>Leaderboard
        </a>

        <div class="nav-section">Account</div>
        <a routerLink="/profile" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">person</span>Profile
        </a>
        <a routerLink="/settings" routerLinkActive="rla-active" class="nav-item">
          <span class="material-icons-outlined nav-icon">settings</span>Settings
        </a>

        <!-- User footer -->
        <div class="sidebar-footer">
          <div class="user-chip" (click)="auth.logout()">
            <div class="user-avatar">{{ initials() }}</div>
            <div>
              <div class="user-name">{{ auth.user()?.firstName }}</div>
              <div class="user-role">Student Member</div>
            </div>
            <span class="material-icons-outlined nav-icon" style="margin-left:auto;font-size:16px;color:rgba(255,255,255,.35)">logout</span>
          </div>
        </div>
      </aside>

      <!-- ══ MAIN ══ -->
      <main class="main">

        <!-- Topbar -->
        <div class="topbar">
          <div>
            <div class="topbar-heading">Welcome back, {{ auth.user()?.firstName }} 👋</div>
            <div class="topbar-sub">Manage your ESIC STEM LAB activities · {{ today | date:'EEEE, d MMM y' }}</div>
          </div>
          <div class="topbar-actions">
            <button class="top-btn" title="Search">
              <span class="material-icons-outlined text-gray-500 text-lg">search</span>
            </button>
            <button class="top-btn" title="Notifications" style="position:relative">
              <span class="material-icons-outlined text-gray-500 text-lg">notifications_none</span>
              <div class="notif-dot"></div>
            </button>
            <div class="top-avatar">{{ initials() }}</div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          @for (stat of stats; track stat.label) {
            <div class="stat-card" [class]="'stat-' + stat.accent">
              <div class="stat-icon" [style.background]="stat.iconBg">
                <span class="material-icons-outlined text-lg" [style.color]="stat.iconColor">{{ stat.icon }}</span>
              </div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-change">
                <span class="material-icons-outlined text-xs">arrow_upward</span>
                {{ stat.change }}
              </div>
            </div>
          }
        </div>

        <!-- Body -->
        <div class="body-grid">

          <!-- Left -->
          <div>
            <!-- Quick actions -->
            <div class="section-label">Quick actions</div>
            <div class="actions-grid">
              @for (card of actions; track card.title) {
                <a [routerLink]="card.route" class="action-card">
                  <div class="action-icon" [style.background]="card.iconBg">
                    <span class="material-icons-outlined text-xl" [style.color]="card.iconColor">{{ card.icon }}</span>
                  </div>
                  <div class="action-title">{{ card.title }}</div>
                  <div class="action-desc">{{ card.desc }}</div>
                  <span class="material-icons-outlined action-arrow">arrow_forward</span>
                </a>
              }
            </div>

            <!-- Submissions -->
            <div class="submissions-section">
              <div class="section-label">My project submissions</div>
              @if (submissions().length === 0) {
                <div class="empty-card">
                  <span class="material-icons-outlined text-4xl text-slate-300 block mb-2">science</span>
                  <p class="text-sm text-slate-400">No submissions yet.</p>
                  <a routerLink="submit-project" class="text-[#2563eb] text-sm font-bold mt-1 inline-block">Submit your first project →</a>
                </div>
              } @else {
                @for (sub of submissions(); track sub.id) {
                  <div class="sub-item">
                    <div class="flex-1 min-w-0">
                      <div class="sub-title truncate">{{ sub.title }}</div>
                      <div class="sub-meta">{{ sub.category }} · {{ sub.submittedAt | date:'MMM d, y' }}</div>
                    </div>
                    <span class="sub-status" [class]="statusClass(sub.status)">{{ sub.status | titlecase }}</span>
                  </div>
                }
              }
            </div>
          </div>

          <!-- Right column -->
          <div class="right-col">

            <!-- Program progress -->
            <div class="progress-card">
              <div class="progress-title">Program progress</div>
              <div class="progress-sub">Early STEM — Week {{ currentWeek }} of {{ totalWeeks }}</div>
              <div class="progress-pct">{{ progressPct }}%</div>
              <div class="progress-sublbl">completion</div>
              <div class="progress-track">
                <div class="progress-fill" [style.width]="progressPct + '%'"></div>
              </div>
              <div class="progress-steps">
                @for (step of journeySteps; track step.label) {
                  <div class="progress-step">
                    <div class="step-dot" [class]="step.dotClass"></div>
                    {{ step.label }} — {{ step.status }}
                  </div>
                }
              </div>
            </div>

            <!-- Upcoming events -->
            <div class="side-card">
              <div class="side-card-title">
                Upcoming events
                <a routerLink="/events" class="side-card-link">See all</a>
              </div>
              @for (ev of upcomingEvents; track ev.title) {
                <div class="event-item">
                  <div class="event-date" [style.background]="ev.dateBg" [style.color]="ev.dateColor">
                    <div class="event-day">{{ ev.day }}</div>
                    <div class="event-mon">{{ ev.mon }}</div>
                  </div>
                  <div>
                    <div class="event-name">{{ ev.title }}</div>
                    <div class="event-loc">
                      <span class="material-icons-outlined" style="font-size:12px">location_on</span>
                      {{ ev.location }}
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Leaderboard -->
            <div class="side-card">
              <div class="side-card-title">
                STEM leaderboard
                <a routerLink="/leaderboard" class="side-card-link">Full list</a>
              </div>
              @for (entry of leaderboard; track entry.name) {
                <div class="lb-item" [class.lb-me]="entry.isMe">
                  <div class="lb-rank" [style.color]="entry.rankColor">{{ entry.rank }}</div>
                  <div class="lb-avatar" [style.background]="entry.avatarBg">{{ entry.initials }}</div>
                  <div class="lb-name" [style.color]="entry.isMe ? '#1d4ed8' : '#1e3a8a'"
                       [style.fontWeight]="entry.isMe ? '700' : '500'">
                    {{ entry.isMe ? 'You' : entry.name }}
                  </div>
                  <div class="lb-pts">{{ entry.pts }} pts</div>
                </div>
              }
            </div>

          </div>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  private api = inject(ApiService);

  submissions = signal<any[]>([]);
  today = new Date();
  currentWeek = 6;
  totalWeeks = 10;
  get progressPct() { return Math.round((this.currentWeek / this.totalWeeks) * 100); }

  initials = computed(() => {
    const u = this.auth.user();
    if (!u) return 'U';
    return ((u.firstName?.[0] ?? '') + (u.lastName?.[0] ?? '')).toUpperCase();
  });

  upcomingEventCount = computed(() => 2);

  stats = [
    { label: 'Projects submitted', value: '3',   icon: 'upload_file', accent: 'blue',   iconBg: '#eff6ff', iconColor: '#2563eb', change: '+1 this month' },
    { label: 'Events registered',  value: '2',   icon: 'event',       accent: 'green',  iconBg: '#f0fdf4', iconColor: '#16a34a', change: 'Next: Jul 12' },
    { label: 'Resources accessed', value: '8',   icon: 'menu_book',   accent: 'purple', iconBg: '#faf5ff', iconColor: '#7c3aed', change: '+3 this week' },
    { label: 'STEM points earned', value: '142', icon: 'emoji_events', accent: 'orange', iconBg: '#fff7ed', iconColor: '#ea580c', change: 'Rank #7' },
  ];

  actions = [
    { title: 'Submit a project', desc: 'Share your innovation or research with the ESIC community',  route: 'submit-project', icon: 'upload_file',  iconBg: '#eff6ff', iconColor: '#2563eb' },
    { title: 'My events',        desc: 'View and manage your upcoming event registrations',            route: 'my-events',      icon: 'event',        iconBg: '#f0fdf4', iconColor: '#16a34a' },
    { title: 'Browse resources', desc: 'Access STEM learning materials, kits, and experiment guides', route: '/resources',     icon: 'menu_book',    iconBg: '#faf5ff', iconColor: '#7c3aed' },
    { title: 'Leaderboard',      desc: 'See your STEM points ranking among peers',                    route: '/leaderboard',   icon: 'emoji_events', iconBg: '#fef3c7', iconColor: '#b45309' },
  ];

  journeySteps = [
    { label: 'Discover',   status: 'completed',  dotClass: 'step-dot dot-done' },
    { label: 'Experiment', status: 'completed',  dotClass: 'step-dot dot-done' },
    { label: 'Create',     status: 'completed',  dotClass: 'step-dot dot-done' },
    { label: 'Innovate',   status: 'in progress',dotClass: 'step-dot dot-active' },
    { label: 'Present',    status: 'upcoming',   dotClass: 'step-dot dot-todo' },
  ];

  upcomingEvents = [
    { day: '12', mon: 'Jul', title: 'Arduino Robotics Bootcamp', location: 'ESIC Lab, Chuka',      dateBg: '#eff6ff', dateColor: '#1d4ed8' },
    { day: '19', mon: 'Jul', title: 'Python Coding for Kids',    location: 'CDAM Lab',              dateBg: '#faf5ff', dateColor: '#6d28d9' },
    { day: '01', mon: 'Aug', title: 'ESIC STEM Challenge 2026',  location: 'Chuka Univ. Hall',      dateBg: '#fef3c7', dateColor: '#b45309' },
  ];

  leaderboard = [
    { rank: '1', name: 'Amina Kamau',    initials: 'AK', pts: 310, avatarBg: '#2563eb', rankColor: '#ca8a04', isMe: false },
    { rank: '2', name: 'Brian Muthomi',  initials: 'BM', pts: 287, avatarBg: '#16a34a', rankColor: '#64748b', isMe: false },
    { rank: '3', name: 'Cynthia Wanjiku',initials: 'CW', pts: 265, avatarBg: '#7c3aed', rankColor: '#b45309', isMe: false },
    { rank: '7', name: 'You',            initials: 'JN', pts: 142, avatarBg: 'linear-gradient(135deg,#2563eb,#7c3aed)', rankColor: '#2563eb', isMe: true },
  ];

  ngOnInit() {
    this.api.get<any[]>('/submissions/mine').subscribe({
      next: data => this.submissions.set(data),
      error: () => {},
    });
  }

  statusClass(s: string) {
    const m: Record<string, string> = {
      SUBMITTED:    'bg-blue-100 text-blue-700',
      UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
      APPROVED:     'bg-green-100 text-green-700',
      REJECTED:     'bg-red-100 text-red-700',
      PUBLISHED:    'bg-violet-100 text-violet-700',
    };
    return m[s] ?? 'bg-gray-100 text-gray-600';
  }
}