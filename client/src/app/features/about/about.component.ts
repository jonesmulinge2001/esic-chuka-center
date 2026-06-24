import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  template: `
    <!-- Hero with Chuka University Background -->
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Background Image - Chuka University Science Park -->
      <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
           style="background-image: url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')">
      </div>
      
      <!-- Animated Overlay Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aC00em0wIDB2LTRoLTR2NGg0em0wIDB2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto text-center px-4 py-20">
        <div class="animate-fade-in-up">
          <div class="inline-block mb-6 px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span class="text-white text-sm font-medium tracking-wider uppercase">Chuka University</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-tight">
            ESIC STEM LAB
          </h1>
          <p class="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto">
            Electronics & Software Innovation Center at Chuka University<br>
          </p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <button class="px-10 py-4 bg-white text-[#2563EB] rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
              Explore Our Center
            </button>
            <button class="px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Visit Us
            </button>
          </div>
        </div>
      </div>

      <!-- Animated Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>

    <!-- Mission Section with Images -->
    <section class="relative py-20 px-4 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-white"></div>
      
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-[#dbeafe] text-[#2563EB] rounded-full text-sm font-semibold mb-4">Our Purpose</span>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-gray-900">Our Mission</h2>
          <p class="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">Empowering the next generation of innovators through quality STEM education</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Mission Image 1 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#2563EB]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="STEM Education" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">Quality Education</h3>
              <p class="text-sm text-white/90">Delivering high-quality STEM education from early childhood to advanced university level</p>
            </div>
          </div>

          <!-- Mission Image 2 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#10B981]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Innovation Hub" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">Innovation Culture</h3>
              <p class="text-sm text-white/90">Fostering a culture of innovation, research, and entrepreneurship among students</p>
            </div>
          </div>

          <!-- Mission Image 3 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Community Engagement" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">Community Impact</h3>
              <p class="text-sm text-white/90">Engaging communities through outreach programs and STEM awareness initiatives</p>
            </div>
          </div>
        </div>

        <!-- Mission Description Card -->
        <div class="mt-12 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
          <p class="text-gray-700 text-lg leading-relaxed">
            To provide accessible, high-quality STEM education and innovation opportunities that empower students, 
            educators, and communities across Kenya and beyond. Through our <span class="text-[#2563EB] font-semibold">ESIC</span>, 
            we bridge the gap between theoretical knowledge and practical application.
          </p>
        </div>
      </div>
    </section>

    <!-- Vision Section with Images -->
    <section class="relative py-20 px-4 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center bg-fixed" 
           style="background-image: url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')">
      </div>
      
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 border border-white/30">Future Forward</span>
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white">Our Vision</h2>
          <p class="text-white text-lg mt-3 max-w-2xl mx-auto">Building a future where African innovation leads the world</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Vision Image 1 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#10B981]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Future Technology" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">World-Class Engineers</h3>
              <p class="text-sm text-white/90">Producing world-class engineers and innovators who solve Africa's challenges</p>
            </div>
          </div>

          <!-- Vision Image 2 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#2563EB]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Research & Innovation" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">Research Excellence</h3>
              <p class="text-sm text-white/90">Leading center for STEM innovation and technology education in the Mount Kenya region</p>
            </div>
          </div>

          <!-- Vision Image 3 -->
          <div class="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-t from-[#4F46E5]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Global Impact" 
                 class="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-bold mb-2">Global Leadership</h3>
              <p class="text-sm text-white/90">Empowering students, educators, and communities across Kenya and beyond</p>
            </div>
          </div>
        </div>

        <!-- Vision Description Card -->
        <div class="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20">
          <p class="text-white text-lg leading-relaxed">
            To be the leading center for STEM innovation and technology education in the Mount Kenya region, 
            producing world-class engineers and innovators who solve Africa's challenges. Our <span class="font-semibold">ESIC</span> 
            serves as a hub for cutting-edge research and technological advancement.
          </p>
        </div>
      </div>
    </section>

    <!-- Objectives with Background -->
    <section class="relative py-20 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" 
           style="background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-indigo-900/90 to-purple-900/95"></div>
      </div>
      
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-[#10B981]/20 backdrop-blur-sm text-[#10B981] rounded-full text-sm font-semibold mb-4 border border-[#10B981]/30">Our Goals</span>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-white">Core Objectives</h2>
          <p class="text-white/70 text-lg mt-3">Strategic pillars guiding our STEM education initiatives</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-5">
          @for (obj of objectives; track obj) {
            <div class="group flex items-start gap-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#2563EB] rounded-full flex items-center justify-center shadow-lg shadow-[#2563EB]/30">
                <span class="material-icons-outlined text-white text-sm">check</span>
              </div>
              <span class="text-white/90 text-sm font-light leading-relaxed">{{ obj }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="relative py-20 px-4 bg-[#f8fafc]">
      <div class="relative max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-[#dbeafe] text-[#2563EB] rounded-full text-sm font-semibold mb-4">Meet the Team</span>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-gray-900">Our Team</h2>
          <p class="text-gray-600 text-lg mt-2">Passionate innovators driving STEM education forward at Chuka University</p>
        </div>

        @if (team().length > 0) {
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            @for (member of team(); track member.id) {
              <div class="group relative bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3">
                <!-- Animated Gradient Border -->
                <div class="absolute -inset-0.5 bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#4F46E5] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                <div class="relative bg-white rounded-3xl p-8 text-center">
                  <div class="relative w-24 h-24 rounded-full mx-auto mb-5">
                    <div class="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] opacity-75 group-hover:scale-110 transition-transform duration-500"></div>
                    <div class="absolute inset-0.5 rounded-full bg-white flex items-center justify-center overflow-hidden">
                      @if (member.avatarUrl) {
                        <img [src]="member.avatarUrl" [alt]="member.name" class="w-full h-full rounded-full object-cover">
                      } @else {
                        <span class="material-icons-outlined text-[#2563EB] text-4xl">person</span>
                      }
                    </div>
                  </div>
                  
                  <h3 class="font-semibold text-gray-900 text-lg">{{ member.name }}</h3>
                  <p class="text-sm text-[#2563EB] font-medium mt-1">{{ member.title }}</p>
                  <p class="text-sm text-gray-500 mt-3 line-clamp-2">{{ member.bio }}</p>
                  
                  <div class="flex justify-center gap-2 mt-4">
                    <button class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#dbeafe] transition-colors duration-300">
                      <span class="material-icons-outlined text-sm text-gray-600">link</span>
                    </button>
                    <button class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#dbeafe] transition-colors duration-300">
                      <span class="material-icons-outlined text-sm text-gray-600">email</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="text-center py-16 bg-white rounded-3xl shadow-xl">
            <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <span class="material-icons-outlined text-4xl text-gray-400">people</span>
            </div>
            <p class="text-gray-400 text-lg">Team information coming soon.</p>
          </div>
        }
      </div>
    </section>

    <!-- Call to Action -->
    <section class="relative py-20 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" 
           style="background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')">
      </div>
      
      <!-- Science Park Pattern Overlay -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aC00em0wIDB2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto text-center text-white">
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">Visit ESIC</h2>
        <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Experience innovation firsthand at Chuka University's state-of-the-art research facility
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button class="px-10 py-4 bg-white text-[#2563EB] rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
            Schedule a Visit
          </button>
          <button class="px-10 py-4 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes scroll {
      0%, 100% {
        transform: translateY(0);
        opacity: 1;
      }
      50% {
        transform: translateY(8px);
        opacity: 0.3;
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out forwards;
    }
    
    .animate-scroll {
      animation: scroll 2s ease-in-out infinite;
    }
    
    .shadow-3xl {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  `]
})
export class AboutComponent implements OnInit {
  private api = inject(ApiService);
  team = signal<any[]>([]);

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
}