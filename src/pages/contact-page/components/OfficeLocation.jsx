import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OfficeLocation = ({ showMap, onToggleMap }) => {
  const officeInfo = {
    name: 'FADDLmatch Singapore Office',
    address: '123 Islamic Centre Road, #05-01\nSingapore 123456',
    phone: '+65 1234 5678',
    email: 'office@faddlmatch.com',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    operatingHours: {
      weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
      saturday: 'Saturday: 10:00 AM - 4:00 PM',
      sunday: 'Sunday: Closed'
    }
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(officeInfo?.address?.replace('\n', ', '));
    window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
  };

  const handleCallOffice = () => {
    window.location.href = `tel:${officeInfo?.phone}`;
  };

  const handleEmailOffice = () => {
    window.location.href = `mailto:${officeInfo?.email}`;
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
              Visit Our Office
            </h2>
            <p className="text-muted-foreground font-body">
              Located in the heart of Singapore's Islamic community
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onToggleMap}
            iconName={showMap ? "MapPin" : "Map"}
            iconPosition="left"
            iconSize={16}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Office Details */}
        <div className="p-6 lg:p-8">
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-islamic-green/10 rounded-lg flex-shrink-0">
                <Icon name="MapPin" size={20} className="text-islamic-green" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {officeInfo?.name}
                </h3>
                <p className="text-muted-foreground text-sm whitespace-pre-line">
                  {officeInfo?.address}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGetDirections}
                  className="mt-2 text-islamic-green hover:text-islamic-green/80 p-0"
                >
                  Get Directions
                  <Icon name="ExternalLink" size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-trust-blue/10 rounded-lg flex-shrink-0">
                <Icon name="Phone" size={20} className="text-trust-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Phone & Email
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={handleCallOffice}
                    className="block text-muted-foreground text-sm hover:text-trust-blue transition-colors"
                  >
                    {officeInfo?.phone}
                  </button>
                  <button
                    onClick={handleEmailOffice}
                    className="block text-muted-foreground text-sm hover:text-trust-blue transition-colors"
                  >
                    {officeInfo?.email}
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-premium-purple/10 rounded-lg flex-shrink-0">
                <Icon name="Clock" size={20} className="text-premium-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Operating Hours
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    {officeInfo?.operatingHours?.weekdays}
                  </p>
                  <p className="text-muted-foreground">
                    {officeInfo?.operatingHours?.saturday}
                  </p>
                  <p className="text-muted-foreground">
                    {officeInfo?.operatingHours?.sunday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prayer Times Note */}
          <div className="mt-6 p-4 bg-islamic-green/5 border border-islamic-green/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-islamic-green" />
              <p className="text-sm font-medium text-islamic-green">
                Islamic Considerations
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Our office hours accommodate daily prayer times. We may briefly pause 
              meetings during prayer times and are closed during Jummah prayers on Fridays.
            </p>
          </div>
        </div>

        {/* Map Area */}
        <div className="bg-muted/30 relative">
          {showMap ? (
            <div className="h-full min-h-[400px] flex items-center justify-center">
              {/* In a real application, this would be an embedded Google Maps or similar */}
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-islamic-green" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Interactive Map
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Map integration would be implemented here
                </p>
                <Button
                  variant="outline"
                  onClick={handleGetDirections}
                  iconName="Navigation"
                  iconPosition="left"
                  iconSize={16}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Map" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Office Location
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Click "Show Map" to view our location
                </p>
                <Button
                  variant="outline"
                  onClick={onToggleMap}
                  iconName="Map"
                  iconPosition="left"
                  iconSize={16}
                >
                  Show Map
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transportation Info */}
      <div className="p-6 lg:p-8 border-t border-border bg-muted/20">
        <h3 className="font-semibold text-foreground mb-4">
          Getting Here
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Train" size={16} className="text-islamic-green" />
            <span className="text-muted-foreground">
              MRT: City Hall Station (2 min walk)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Car" size={16} className="text-trust-blue" />
            <span className="text-muted-foreground">
              Parking: Available nearby
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={16} className="text-premium-purple" />
            <span className="text-muted-foreground">
              Bus: Multiple routes nearby
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocation;