/**
 * Resend Email Service
 * Handles all email operations using Resend API
 */
class EmailService {
  constructor() {
    this.fromEmail = import.meta.env?.VITE_RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  }

  /**
   * Send email via Supabase Edge Function (server-side)
   * @param {Object} emailData - Email configuration
   * @param {string[]} emailData.to - Recipient email addresses
   * @param {string} emailData.subject - Email subject
   * @param {string} emailData.html - HTML content
   * @param {string} [emailData.text] - Plain text content (optional)
   * @param {string} [emailData.emailType] - A logical type for server tagging/analytics
   * @param {Object} [emailData.metadata] - Optional metadata to attach
   */
  async sendEmail(emailData) {
    try {
      const { supabase } = await import('../lib/supabase');

      const { data, error } = await supabase?.functions?.invoke('send-email', {
        body: {
          to: Array.isArray(emailData?.to) ? emailData?.to : [emailData?.to],
          subject: emailData?.subject,
          html: emailData?.html,
          emailType: emailData?.emailType || 'general',
          metadata: emailData?.metadata || undefined,
        }
      });

      if (error) {
        throw new Error(`Email send failed: ${error?.message || 'Unknown error'}`);
      }

      return data;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(userEmail, userName) {
    const emailData = {
      to: [userEmail],
      subject: 'Welcome to FaddlMatch - Your Journey Begins! 🌟',
      html: this.generateWelcomeEmailTemplate(userName),
      emailType: 'welcome',
      metadata: { userEmail }
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Send match notification email
   */
  async sendMatchNotificationEmail(userEmail, userName, matchName, compatibilityScore) {
    const emailData = {
      to: [userEmail],
      subject: `New Match Found! ${compatibilityScore}% Compatibility 💚`,
      html: this.generateMatchNotificationTemplate(userName, matchName, compatibilityScore),
      emailType: 'match_notification',
      metadata: { userEmail, matchName, compatibilityScore }
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Send message notification email
   */
  async sendMessageNotificationEmail(userEmail, userName, senderName) {
    const emailData = {
      to: [userEmail],
      subject: `New Message from ${senderName} 💬`,
      html: this.generateMessageNotificationTemplate(userName, senderName),
      emailType: 'message_notification',
      metadata: { userEmail, senderName }
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Send subscription confirmation email
   */
  async sendSubscriptionConfirmationEmail(userEmail, userName, planName, features) {
    const emailData = {
      to: [userEmail],
      subject: `Welcome to ${planName} Plan! 🎉`,
      html: this.generateSubscriptionConfirmationTemplate(userName, planName, features),
      emailType: 'subscription_confirmation',
      metadata: { userEmail, planName }
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Send contact form submission confirmation
   */
  async sendContactFormConfirmationEmail(userEmail, userName, subject) {
    const emailData = {
      to: [userEmail],
      subject: 'We received your message - FaddlMatch Support',
      html: this.generateContactFormConfirmationTemplate(userName, subject),
      emailType: 'contact_confirmation',
      metadata: { userEmail, subject }
    };

    return await this.sendEmail(emailData);
  }

  /**
   * Generate welcome email HTML template
   */
  generateWelcomeEmailTemplate(userName) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to FaddlMatch</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to FaddlMatch! 🌟</h1>
              <p>Your Islamic matrimonial journey begins here</p>
            </div>
            <div class="content">
              <h2>Assalamu Alaikum ${userName || 'Dear User'}!</h2>
              <p>We're thrilled to welcome you to FaddlMatch, where meaningful Islamic connections are made with the intention of marriage, following Islamic principles and values.</p>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>✅ Complete your profile to attract compatible matches</li>
                <li>✅ Add photos and write about yourself</li>
                <li>✅ Set your partner preferences</li>
                <li>✅ Start receiving daily matches</li>
              </ul>

              <a href="#" class="cta-button">Complete Your Profile</a>

              <p>Remember, we're here to help you find your life partner in a halal way. May Allah bless your search and guide you to your perfect match.</p>
              
              <p>Barakallahu feeki,<br>The FaddlMatch Team</p>
            </div>
            <div class="footer">
              <p>© 2025 FaddlMatch. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate match notification email template
   */
  generateMatchNotificationTemplate(userName, matchName, compatibilityScore) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Match Found!</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .compatibility-badge { background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
            .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 New Match Found!</h1>
              <p>Someone special is waiting for you</p>
            </div>
            <div class="content">
              <h2>Assalamu Alaikum ${userName || 'Dear User'}!</h2>
              <p>Alhamdulillah! We have great news for you. You have a new match on FaddlMatch!</p>
              
              <div style="text-align: center; margin: 25px 0;">
                <h3>Match with ${matchName || 'Someone Special'}</h3>
                <span class="compatibility-badge">${compatibilityScore || 85}% Compatibility</span>
              </div>

              <p>This match was carefully selected based on your preferences, Islamic values, and compatibility factors including:</p>
              <ul>
                <li>Religious practice and beliefs</li>
                <li>Education and career goals</li>
                <li>Family values and expectations</li>
                <li>Life goals and aspirations</li>
              </ul>

              <a href="#" class="cta-button">View Profile & Connect</a>

              <p><em>"And among His signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your hearts." - Quran 30:21</em></p>
              
              <p>May Allah guide both of you towards a blessed union.</p>
              
              <p>Barakallahu feeki,<br>The FaddlMatch Team</p>
            </div>
            <div class="footer">
              <p>© 2025 FaddlMatch. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate message notification email template
   */
  generateMessageNotificationTemplate(userName, senderName) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Message</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 New Message</h1>
              <p>Someone wants to connect with you</p>
            </div>
            <div class="content">
              <h2>Assalamu Alaikum ${userName || 'Dear User'}!</h2>
              <p>You have received a new message from ${senderName || 'a member'} on FaddlMatch.</p>
              
              <p>They're interested in getting to know you better and potentially starting a meaningful conversation that could lead to marriage, Insha'Allah.</p>

              <a href="#" class="cta-button">Read & Reply</a>

              <p><strong>Remember:</strong> All conversations on FaddlMatch are intended for serious matrimonial purposes. Please maintain Islamic etiquette and communicate with respect and good intentions.</p>
              
              <p>May Allah bless your conversations and guide you both.</p>
              
              <p>Barakallahu feeki,<br>The FaddlMatch Team</p>
            </div>
            <div class="footer">
              <p>© 2025 FaddlMatch. All rights reserved.</p>
              <p>This email was sent because you have an active account on FaddlMatch.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate subscription confirmation email template
   */
  generateSubscriptionConfirmationTemplate(userName, planName, features) {
    const featuresList = features?.map(feature => `<li>✅ ${feature}</li>`)?.join('') || '';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Subscription Confirmed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .plan-badge { background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
            .cta-button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Subscription Activated!</h1>
              <p>Welcome to premium features</p>
            </div>
            <div class="content">
              <h2>Assalamu Alaikum ${userName || 'Dear User'}!</h2>
              <p>Alhamdulillah! Your subscription to the <span class="plan-badge">${planName || 'Premium'} Plan</span> has been successfully activated.</p>
              
              <p><strong>Your new features include:</strong></p>
              <ul>
                ${featuresList || `
                  <li>✅ Unlimited daily matches</li>
                  <li>✅ Advanced search filters</li>
                  <li>✅ Priority customer support</li>
                  <li>✅ Read receipts for messages</li>
                `}
              </ul>

              <a href="#" class="cta-button">Explore Premium Features</a>

              <p>We're committed to helping you find your ideal life partner through our enhanced features. May Allah bless your journey and guide you to success.</p>
              
              <p>Barakallahu feeki,<br>The FaddlMatch Team</p>
            </div>
            <div class="footer">
              <p>© 2025 FaddlMatch. All rights reserved.</p>
              <p>Questions about your subscription? Contact our support team.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Generate contact form confirmation email template
   */
  generateContactFormConfirmationTemplate(userName, subject) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Message Received</h1>
              <p>We'll get back to you soon</p>
            </div>
            <div class="content">
              <h2>Assalamu Alaikum ${userName || 'Dear User'}!</h2>
              <p>Thank you for contacting FaddlMatch. We have successfully received your message regarding: <strong>"${subject || 'General Inquiry'}"</strong></p>
              
              <p>Our support team will review your message and respond within 24-48 hours, Insha'Allah. We appreciate your patience.</p>

              <p><strong>In the meantime:</strong></p>
              <ul>
                <li>Check our FAQ section for quick answers</li>
                <li>Visit your profile to ensure it's complete</li>
                <li>Explore new matches and connections</li>
              </ul>

              <p>JazakAllahu Khairan for choosing FaddlMatch for your matrimonial journey.</p>
              
              <p>Barakallahu feeki,<br>The FaddlMatch Support Team</p>
            </div>
            <div class="footer">
              <p>© 2025 FaddlMatch. All rights reserved.</p>
              <p>For urgent matters, please contact us directly through the app.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;