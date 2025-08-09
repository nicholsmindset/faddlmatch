import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const QuranChallengeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivory-cream">
      <GlobalHeader />
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-10">
        <div className="bg-white border border-bronze/20 rounded-xl p-8 shadow-elevation-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-emerald-green/10 rounded-full flex items-center justify-center">
              <Icon name="Book" size={22} className="text-emerald-green" />
            </div>
            <h1 className="font-cinzel text-2xl font-bold text-midnight-navy">Qur'an Verse Challenge</h1>
          </div>

          <p className="text-muted-bronze font-lato mb-6">
            Test and strengthen your knowledge of the Qur'an with respectful, citation-first challenges. All verses are shown exactly with references. Translations are provided for learning.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="border border-bronze/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h2 className="font-lato font-semibold text-midnight-navy">Identify from Translation</h2>
                <p className="text-sm text-muted-bronze">See an English translation, pick the correct Surah:Ayah.</p>
              </div>
              <Button className="bg-emerald-green text-white" onClick={() => navigate('/quran-challenge/play?mode=translation')}>
                Start
              </Button>
            </div>

            <div className="border border-bronze/20 rounded-lg p-4 flex items-center justify-between opacity-80">
              <div>
                <h2 className="font-lato font-semibold text-midnight-navy">Identify from Arabic (coming soon)</h2>
                <p className="text-sm text-muted-bronze">See the Arabic text, select the correct reference.</p>
              </div>
              <Button variant="outline" className="border-emerald-green text-emerald-green" disabled>
                Soon
              </Button>
            </div>
          </div>

          <div className="mt-6 text-xs text-muted-bronze font-lato">
            Always shows Surah and Ayah numbers. Please report any issues. May Allah bless your learning.
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuranChallengeHome;