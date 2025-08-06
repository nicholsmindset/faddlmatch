import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLinks = () => {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: 'https://facebook.com/faddlmatch',
      description: 'Follow us for updates and community stories',
      color: 'text-[#1877F2] hover:bg-[#1877F2]/10'
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      url: 'https://instagram.com/faddlmatch',
      description: 'See success stories and Islamic marriage tips',
      color: 'text-[#E4405F] hover:bg-[#E4405F]/10'
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: 'https://twitter.com/faddlmatch',
      description: 'Get the latest news and announcements',
      color: 'text-[#1DA1F2] hover:bg-[#1DA1F2]/10'
    },
    {
      name: 'YouTube',
      icon: 'Youtube',
      url: 'https://youtube.com/faddlmatch',
      description: 'Watch testimonials and helpful videos',
      color: 'text-[#FF0000] hover:bg-[#FF0000]/10'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/company/faddlmatch',
      description: 'Connect with us professionally',
      color: 'text-[#0A66C2] hover:bg-[#0A66C2]/10'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: 'https://t.me/faddlmatch',
      description: 'Join our community channel',
      color: 'text-[#0088CC] hover:bg-[#0088CC]/10'
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {socialPlatforms?.map((platform) => (
          <div key={platform?.name} className="text-center">
            <Button
              variant="ghost"
              onClick={() => handleSocialClick(platform?.url)}
              className={`w-full flex flex-col items-center p-4 h-auto space-y-2 hover:scale-105 transition-all duration-200 ${platform?.color}`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Icon name={platform?.icon} size={24} />
              </div>
              <span className="font-medium text-sm text-foreground">
                {platform?.name}
              </span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2 px-2">
              {platform?.description}
            </p>
          </div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-islamic-green">15K+</div>
          <div className="text-sm text-muted-foreground">Followers</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-trust-blue">2K+</div>
          <div className="text-sm text-muted-foreground">Success Stories</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-premium-purple">50+</div>
          <div className="text-sm text-muted-foreground">Countries</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-foreground">4.8★</div>
          <div className="text-sm text-muted-foreground">User Rating</div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-8 p-6 bg-islamic-green/5 border border-islamic-green/20 rounded-lg">
        <div className="text-center">
          <Icon name="Bell" size={24} className="text-islamic-green mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-2">
            Stay Updated
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Subscribe to our newsletter for Islamic marriage tips and platform updates
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
            />
            <Button
              className="bg-islamic-green hover:bg-islamic-green/90 text-white"
              iconName="Mail"
              iconPosition="left"
              iconSize={16}
            >
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;