import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoGallery = ({ photos, isBlurred, userTier, onUpgrade }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos?.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos?.length) % photos?.length);
  };

  return (
    <div className="relative bg-card rounded-lg overflow-hidden">
      {/* Main Photo Display */}
      <div className="relative aspect-[4/5] bg-muted">
        <Image
          src={photos?.[currentPhotoIndex]}
          alt="Profile photo"
          className={`w-full h-full object-cover ${isBlurred ? 'blur-md' : ''}`}
        />
        
        {/* Navigation Arrows */}
        {photos?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Photo Counter */}
        {photos?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono">
            {currentPhotoIndex + 1} / {photos?.length}
          </div>
        )}

        {/* Blur Overlay for Free Users */}
        {isBlurred && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <Icon name="Lock" size={48} className="mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">
                Premium Feature
              </h3>
              <p className="text-sm opacity-90 mb-4">
                Upgrade to view clear photos
              </p>
              <Button
                variant="default"
                onClick={onUpgrade}
                className="bg-white text-foreground hover:bg-gray-100"
              >
                <Icon name="Crown" size={16} className="mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Photo Thumbnails */}
      {photos?.length > 1 && !isBlurred && (
        <div className="flex space-x-2 p-3 bg-muted/30">
          {photos?.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentPhotoIndex
                  ? 'border-primary' :'border-transparent hover:border-border'
              }`}
            >
              <Image
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoGallery;