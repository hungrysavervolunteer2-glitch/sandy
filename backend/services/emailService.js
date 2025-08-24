const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: `"Projectify" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(userEmail, userName) {
    const subject = 'Welcome to Projectify!';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f97316;">Welcome to Projectify! 🎉</h1>
        <p>Hi ${userName},</p>
        <p>Welcome to Projectify! We're excited to have you join our platform where amazing projects come to life.</p>
        <h3>What's next?</h3>
        <ul>
          <li>Browse available projects in your dashboard</li>
          <li>Apply to projects that match your skills</li>
          <li>Track your application status in real-time</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Happy project hunting!</p>
        <p><strong>The Projectify Team</strong></p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          This email was sent to ${userEmail}. If you didn't create an account, please ignore this email.
        </p>
      </div>
    `;
    
    return this.sendEmail(userEmail, subject, html);
  }

  async sendProjectApprovalEmail(userEmail, userName, projectName, projectDescription) {
    const subject = `Great News! Project "${projectName}" has been approved`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Project Approved! ✅</h1>
        <p>Hi ${userName},</p>
        <p>We have great news! The project "<strong>${projectName}</strong>" that you applied to has been approved and is now active.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Project Details:</h3>
          <p><strong>Name:</strong> ${projectName}</p>
          <p><strong>Description:</strong> ${projectDescription}</p>
        </div>
        <p>You can now view the full project details and next steps in your dashboard.</p>
        <p>Good luck with your application!</p>
        <p><strong>The Projectify Team</strong></p>
      </div>
    `;
    
    return this.sendEmail(userEmail, subject, html);
  }

  async sendApplicationApprovedEmail(userEmail, userName, projectName) {
    const subject = `Your application for "${projectName}" has been approved!`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Congratulations! 🎉</h1>
        <p>Hi ${userName},</p>
        <p>Fantastic news! Your application for the project "<strong>${projectName}</strong>" has been approved!</p>
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
          <p style="margin: 0;"><strong>What happens next?</strong></p>
          <ul style="margin: 10px 0;">
            <li>Check your dashboard for project details and timeline</li>
            <li>You may receive additional communication from the project team</li>
            <li>Prepare to start working on this exciting project!</li>
          </ul>
        </div>
        <p>We're excited to see what you'll accomplish on this project!</p>
        <p><strong>The Projectify Team</strong></p>
      </div>
    `;
    
    return this.sendEmail(userEmail, subject, html);
  }

  async sendApplicationRejectedEmail(userEmail, userName, projectName) {
    const subject = `Update on your application for "${projectName}"`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #f97316;">Application Update</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for your interest in the project "<strong>${projectName}</strong>". After careful consideration, we've decided to move forward with other candidates for this particular project.</p>
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Don't let this discourage you!</strong></p>
          <p style="margin: 10px 0;">There are many other exciting projects available on our platform. We encourage you to:</p>
          <ul style="margin: 10px 0;">
            <li>Browse other available projects</li>
            <li>Update your profile to highlight your skills</li>
            <li>Apply to projects that match your expertise</li>
          </ul>
        </div>
        <p>Keep applying and stay positive - the right project is out there waiting for you!</p>
        <p><strong>The Projectify Team</strong></p>
        <hr>
        <p style="text-align: center;">
          <a href="${process.env.FRONTEND_URL}/user/dashboard" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Browse More Projects</a>
        </p>
      </div>
    `;
    
    return this.sendEmail(userEmail, subject, html);
  }
}

module.exports = new EmailService();