import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer.component';
import { NavbarComponent } from './shared/components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class AppComponent {}