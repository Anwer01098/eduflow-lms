import { Component } from '@angular/core';

@Component({
  template: `
    <div style="max-width: 500px; margin: 60px auto; text-align: center;">
      <div class="card">
        <div style="font-size: 48px; margin-bottom: 16px;">&#9203;</div>
        <h2>Account Pending Approval</h2>
        <p style="color: #6b7280; margin-top: 12px;">
          Your teacher account is awaiting administrator approval. You will be able to create courses and manage students once your account is approved.
        </p>
        <p style="color: #6b7280; margin-top: 12px; font-size: 14px;">
          This usually takes 1-2 business days.
        </p>
      </div>
    </div>
  `
})
export class PendingApprovalComponent {}
