import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { flattenVerses } from '../../data/quranSample';

function pickRandomItems(items, count, excludeId) {
  const pool = excludeId ? items.filter(v => v.id !== excludeId) : items.slice();
  const result = [];
  const used = new Set();
  while (result.length < Math.min(count, pool.length)) {
    const idx = Math.floor(Math.random() * pool.length);
    if (used.has(idx)) continue;
    used.add(idx);
    result.push(pool[idx]);
  }
  return result;
}

const STORAGE_KEY = 'qverse_local_history_v1';

const QuranChallengePlay = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'translation';

  const verses = useMemo(() => flattenVerses(), []);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = 10;

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateQuestion() {
    const answer = verses[Math.floor(Math.random() * verses.length)];
    const distractors = pickRandomItems(verses, 3, answer.id);
    const choices = [...distractors, answer]
      .map(v => ({ id: v.id, label: `${v.surahName} ${v.surahNumber}:${v.ayahNumber}` }))
      .sort(() => Math.random() - 0.5);
    setCurrent(answer);
    setOptions(choices);
    setSelected(null);
    setIsCorrect(null);
  }

  function saveHistory(entry) {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existing.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-200)));
    } catch {}
  }

  function onSelect(optionId) {
    if (!current) return;
    setSelected(optionId);
    const correct = optionId === current.id;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    saveHistory({
      ts: Date.now(),
      id: current.id,
      mode,
      correct,
    });
  }

  function nextQuestion() {
    if (questionIndex + 1 >= totalQuestions) {
      navigate(`/quran-challenge?score=${score}`);
      return;
    }
    setQuestionIndex(q => q + 1);
    generateQuestion();
  }

  const prompt = mode === 'translation' ? current?.textEn : current?.textAr;

  return (
    <div className="min-h-screen bg-ivory-cream">
      <GlobalHeader />
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-bronze/20 rounded-xl p-6 shadow-elevation-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="ListChecks" size={18} className="text-emerald-green" />
              <h2 className="font-cinzel text-xl font-bold text-midnight-navy">Challenge</h2>
            </div>
            <div className="text-sm font-lato text-muted-bronze">Question {questionIndex + 1} / {totalQuestions} • Score {score}</div>
          </div>

          <div className="mb-6">
            <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-lg p-4">
              <p className="font-lato text-midnight-navy leading-7">{prompt}</p>
            </div>
            <p className="text-xs text-muted-bronze mt-2">Select the correct Surah and Ayah. Exact references are shown after answering.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {options.map((opt) => {
              const isChosen = selected === opt.id;
              const isOptCorrect = isCorrect && opt.id === current?.id;
              const base = 'w-full text-left px-4 py-3 rounded-md border font-lato transition';
              const style = !selected
                ? 'border-bronze/20 hover:bg-emerald-green/5'
                : isChosen && isOptCorrect
                ? 'border-emerald-green bg-emerald-green/10'
                : isChosen && !isOptCorrect
                ? 'border-red-400 bg-red-50'
                : 'border-bronze/20 opacity-80';
              return (
                <button
                  key={opt.id}
                  disabled={!!selected}
                  className={`${base} ${style}`}
                  onClick={() => onSelect(opt.id)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-6">
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name={isCorrect ? 'CheckCircle' : 'XCircle'} size={18} className={isCorrect ? 'text-emerald-green' : 'text-red-500'} />
                  <div>
                    <div className="font-lato text-midnight-navy text-sm">
                      {isCorrect ? 'Correct' : 'Incorrect'} — {current?.surahName} {current?.surahNumber}:{current?.ayahNumber}
                    </div>
                    <div className="text-sm text-muted-bronze mt-1">Arabic: <span className="font-arabic font-semibold">{current?.textAr}</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" className="border-bronze text-bronze" onClick={() => navigate('/quran-challenge')}>
                  Quit
                </Button>
                <Button className="bg-emerald-green text-white" onClick={nextQuestion}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuranChallengePlay;