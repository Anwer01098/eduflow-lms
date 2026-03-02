import { Component } from '@angular/core';

@Component({
  template: `
    <div class="page-header"><h1>Messages</h1></div>
    <div class="card empty-state">
      <h3>No messages yet</h3>
      <p>Your conversations will appear here.</p>
    </div>
  `
})
export class MessagesComponent {}
