import { Component, inject, OnInit } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { LiffService } from './services/liff.service';

@Component({
  selector: 'app-root',
  imports: [ProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly liffService = inject(LiffService);

  ngOnInit() {
    this.liffService.init();
  }
}
