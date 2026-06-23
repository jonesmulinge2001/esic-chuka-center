import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-submit-project',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto px-4 py-10">
      <a routerLink="/dashboard" class="text-primary-600 text-sm flex items-center gap-1 mb-6 hover:underline">
        <span class="material-icons-outlined text-base">arrow_back</span> Dashboard
      </a>
      <div class="esic-card p-8">
        <h1 class="font-display font-bold text-gray-900 text-xl mb-6">Submit a Project</h1>
        @if (submitted()) {
          <div class="text-center py-8">
            <span class="material-icons-outlined text-green-500 text-5xl block mb-3">check_circle</span>
            <h3 class="font-bold text-gray-900 mb-2">Submission Received!</h3>
            <p class="text-gray-500 text-sm mb-6">Our team will review your project and get back to you.</p>
            <a routerLink="/dashboard" class="text-primary-600 font-semibold text-sm hover:underline">Back to Dashboard</a>
          </div>
        } @else {
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Project Title *</label>
              <input [(ngModel)]="form.title" type="text" placeholder="e.g. Smart Irrigation System"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Category *</label>
              <select [(ngModel)]="form.category"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white">
                <option value="">Select category</option>
                <option value="student">Student Project</option>
                <option value="research">Research Initiative</option>
                <option value="innovation">Innovation Showcase</option>
                <option value="prototype">Engineering Prototype</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Description *</label>
              <textarea [(ngModel)]="form.description" rows="5" placeholder="Describe your project, its goals, and impact..."
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1.5">Team Members</label>
              <input [(ngModel)]="teamInput" type="text" placeholder="Names separated by comma"
                class="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500">
              <p class="text-xs text-gray-400 mt-1">e.g. Alice Mwangi, Bob Kamau</p>
            </div>
            @if (error()) { <p class="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{{ error() }}</p> }
            <button (click)="submit()" [disabled]="submitting()"
              class="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 text-sm">
              {{ submitting() ? 'Submitting...' : 'Submit Project' }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class SubmitProjectComponent {
  private api = inject(ApiService);
  form = { title: '', description: '', category: '' };
  teamInput = '';
  submitted = signal(false);
  submitting = signal(false);
  error = signal('');

  submit() {
    const { title, description, category } = this.form;
    if (!title || !description || !category) { this.error.set('Please fill in all required fields.'); return; }
    this.submitting.set(true); this.error.set('');
    const teamMembers = this.teamInput ? this.teamInput.split(',').map(s => s.trim()).filter(Boolean) : [];
    this.api.post('/submissions', { ...this.form, teamMembers }).subscribe({
      next: () => { this.submitted.set(true); this.submitting.set(false); },
      error: (e) => { this.error.set(e.error?.message ?? 'Submission failed'); this.submitting.set(false); },
    });
  }
}