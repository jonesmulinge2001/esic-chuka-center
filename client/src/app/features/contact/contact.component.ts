import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="bg-gradient-to-br from-primary-800 to-indigo-900 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl font-display font-extrabold mb-4">Contact Us</h1>
        <p class="text-blue-200">Get in touch with ESIC STEM LAB</p>
      </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-10">
      <!-- Info -->
      <div class="md:col-span-2 space-y-5">
        <h2 class="font-display font-bold text-gray-900 text-xl">Let's Connect</h2>
        <p class="text-gray-500 text-sm leading-relaxed">Whether you're a student, educator, researcher, or industry partner, we'd love to hear from you.</p>
        @for (info of contactInfo; track info.label) {
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span class="material-icons-outlined text-primary-600 text-base">{{ info.icon }}</span>
            </div>
            <div>
              <div class="text-xs text-gray-400 font-medium">{{ info.label }}</div>
              <div class="text-sm text-gray-700 mt-0.5">{{ info.value }}</div>
            </div>
          </div>
        }
      </div>

      <!-- Form -->
      <div class="md:col-span-3 esic-card p-8">
        @if (submitted()) {
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons-outlined text-green-600 text-3xl">check_circle</span>
            </div>
            <h3 class="font-display font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p class="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
            <button (click)="submitted.set(false)" class="mt-6 text-primary-600 text-sm font-semibold hover:underline">Send another message</button>
          </div>
        } @else {
          <h3 class="font-display font-bold text-gray-900 mb-6">Send a Message</h3>
          <div class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                <input [(ngModel)]="form.name" type="text" placeholder="Your name"
                  class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
                <input [(ngModel)]="form.email" type="email" placeholder="your@email.com"
                  class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Subject *</label>
              <input [(ngModel)]="form.subject" type="text" placeholder="How can we help?"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
              <textarea [(ngModel)]="form.message" rows="5" placeholder="Your message..."
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"></textarea>
            </div>
            @if (error()) { <p class="text-red-500 text-xs">{{ error() }}</p> }
            <button (click)="submit()" [disabled]="sending()"
              class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2">
              @if (sending()) { <span class="animate-spin material-icons-outlined text-base">refresh</span> Sending... }
              @else { <span class="material-icons-outlined text-base">send</span> Send Message }
            </button>
          </div>
        }
      </div>
    </section>
  `,
})
export class ContactComponent {
  private api = inject(ApiService);
  form = { name: '', email: '', subject: '', message: '' };
  submitted = signal(false);
  sending = signal(false);
  error = signal('');

  contactInfo = [
    { icon: 'location_on', label: 'Address', value: 'Chuka University, P.O. Box 109-60400, Chuka, Tharaka-Nithi, Kenya' },
    { icon: 'email', label: 'Email', value: 'esic@chuka.ac.ke' },
    { icon: 'schedule', label: 'Working Hours', value: 'Mon – Fri, 8:00 AM – 5:00 PM' },
  ];

  submit() {
    const { name, email, subject, message } = this.form;
    if (!name || !email || !subject || !message) { this.error.set('All fields are required.'); return; }
    this.error.set('');
    this.sending.set(true);
    this.api.post('/contact', this.form).subscribe({
      next: () => { this.submitted.set(true); this.sending.set(false); this.form = { name: '', email: '', subject: '', message: '' }; },
      error: () => { this.error.set('Failed to send message. Please try again.'); this.sending.set(false); },
    });
  }
}