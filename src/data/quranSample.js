export const quranSample = [
  {
    surahNumber: 1,
    surahName: 'Al-Fatihah',
    ayahs: [
      {
        ayahNumber: 1,
        textAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        textEn: 'In the Name of Allah—the Most Compassionate, Most Merciful.',
      },
      {
        ayahNumber: 2,
        textAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        textEn: 'All praise is for Allah—Lord of all worlds,',
      },
      {
        ayahNumber: 3,
        textAr: 'الرَّحْمَٰنِ الرَّحِيمِ',
        textEn: 'the Most Compassionate, Most Merciful,',
      },
      {
        ayahNumber: 4,
        textAr: 'مَالِكِ يَوْمِ الدِّينِ',
        textEn: 'Master of the Day of Judgment.',
      },
      {
        ayahNumber: 5,
        textAr: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        textEn: 'You ˹alone˺ we worship and You ˹alone˺ we ask for help.',
      },
      {
        ayahNumber: 6,
        textAr: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        textEn: 'Guide us along the Straight Path,',
      },
      {
        ayahNumber: 7,
        textAr: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        textEn: 'the Path of those You have blessed—not those You are displeased with, or those who are astray.',
      },
    ],
  },
  {
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahs: [
      {
        ayahNumber: 255,
        textAr:
          'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        textEn:
          'Allah! There is no god ˹worthy of worship˺ except Him, the Ever-Living, All-Sustaining. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who could possibly intercede with Him without His permission? He ˹fully˺ knows what is ahead of them and what is behind them, but no one can grasp any of His knowledge—except what He wills ˹to reveal˺. His Seat encompasses the heavens and the earth, and the preservation of both does not tire Him. For He is the Most High, the Greatest.',
      },
      {
        ayahNumber: 286,
        textAr:
          'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا ۖ وَاغْفِرْ لَنَا ۖ وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
        textEn:
          'Allah does not require of any soul more than what it can afford. All good will be for its own benefit, and all evil will be to its own loss. ˹The believers cry,˺ “Our Lord! Do not punish us if we forget or make a mistake. Our Lord! Do not place a burden on us like the one You placed on those before us. Our Lord! Do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy on us. You are our only Guardian. So grant us victory over the disbelieving people.”',
      },
    ],
  },
];

export function flattenVerses(sample = quranSample) {
  const verses = [];
  for (const surah of sample) {
    for (const ayah of surah.ayahs) {
      verses.push({
        surahNumber: surah.surahNumber,
        surahName: surah.surahName,
        ayahNumber: ayah.ayahNumber,
        textAr: ayah.textAr,
        textEn: ayah.textEn,
        id: `${surah.surahNumber}:${ayah.ayahNumber}`,
      });
    }
  }
  return verses;
}