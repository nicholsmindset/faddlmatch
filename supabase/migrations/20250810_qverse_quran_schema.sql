-- Qur'an schema for QVerse MVP
-- Sources: Arabic text via Tanzil (Uthmani); translations via Saheeh International
-- Store sources and languages explicitly; always cite when displaying.

begin;

create table if not exists public.quran_surah (
  surah_number integer primary key check (surah_number between 1 and 114),
  surah_name text not null
);

create table if not exists public.quran_ayah (
  surah_number integer not null references public.quran_surah(surah_number) on delete cascade,
  ayah_number integer not null check (ayah_number >= 1),
  text_ar text not null,
  primary key (surah_number, ayah_number)
);

create table if not exists public.quran_translation (
  surah_number integer not null,
  ayah_number integer not null,
  language_code text not null check (char_length(language_code) between 2 and 10),
  source text not null,
  text text not null,
  primary key (surah_number, ayah_number, language_code, source),
  foreign key (surah_number, ayah_number)
    references public.quran_ayah(surah_number, ayah_number)
    on delete cascade
);

create index if not exists quran_translation_lookup_idx
  on public.quran_translation (language_code, source);

-- Quiz attempts by users (anonymous allowed if user_id null)
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null,
  mode text not null check (mode in ('translation','arabic','audio','fill_blank','next_ayah')),
  surah_number integer not null,
  ayah_number integer not null,
  is_correct boolean not null,
  duration_ms integer null,
  created_at timestamptz not null default now(),
  foreign key (surah_number, ayah_number)
    references public.quran_ayah(surah_number, ayah_number)
    on delete cascade
);

create index if not exists quiz_attempts_user_created_idx
  on public.quiz_attempts (user_id, created_at desc);

-- SRS cards per user
create table if not exists public.srs_cards (
  user_id uuid not null,
  surah_number integer not null,
  ayah_number integer not null,
  ease real not null default 2.5,
  interval_days integer not null default 0,
  due_at date not null default current_date,
  status text not null default 'learning',
  updated_at timestamptz not null default now(),
  primary key (user_id, surah_number, ayah_number),
  foreign key (surah_number, ayah_number)
    references public.quran_ayah(surah_number, ayah_number)
    on delete cascade
);

-- Enable RLS for per-user privacy on user data tables
alter table public.quiz_attempts enable row level security;
alter table public.srs_cards enable row level security;

-- Allow users to manage their own SRS cards
create policy if not exists srs_cards_select on public.srs_cards
  for select using (auth.role() = 'anon' and false or auth.uid() = user_id);
create policy if not exists srs_cards_modify on public.srs_cards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Allow users to read their attempts; insert attempts for self (or null for anon)
create policy if not exists quiz_attempts_select on public.quiz_attempts
  for select using (
    case when user_id is null then true else auth.uid() = user_id end
  );
create policy if not exists quiz_attempts_insert on public.quiz_attempts
  for insert with check (
    case when user_id is null then true else auth.uid() = user_id end
  );

-- Minimal seed: Surah 1 (Al-Fatihah) and two ayahs from Surah 2
insert into public.quran_surah (surah_number, surah_name) values
  (1, 'Al-Fatihah') on conflict do nothing;
insert into public.quran_surah (surah_number, surah_name) values
  (2, 'Al-Baqarah') on conflict do nothing;

insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 1, 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 2, 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 3, 'الرَّحْمَٰنِ الرَّحِيمِ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 4, 'مَالِكِ يَوْمِ الدِّينِ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 5, 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 6, 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ') on conflict do nothing;
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (1, 7, 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ') on conflict do nothing;

insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 1, 'en', 'SaheehIntl', 'In the Name of Allah—the Most Compassionate, Most Merciful.') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 2, 'en', 'SaheehIntl', 'All praise is for Allah—Lord of all worlds,') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 3, 'en', 'SaheehIntl', 'the Most Compassionate, Most Merciful,') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 4, 'en', 'SaheehIntl', 'Master of the Day of Judgment.') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 5, 'en', 'SaheehIntl', 'You ˹alone˺ we worship and You ˹alone˺ we ask for help.') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 6, 'en', 'SaheehIntl', 'Guide us along the Straight Path,') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (1, 7, 'en', 'SaheehIntl', 'the Path of those You have blessed—not those You are displeased with, or those who are astray.') on conflict do nothing;

-- Baqarah sample
insert into public.quran_ayah (surah_number, ayah_number, text_ar) values
  (2, 255, 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ... وَهُوَ الْعَلِيُّ الْعَظِيمُ') on conflict do nothing;
insert into public.quran_translation (surah_number, ayah_number, language_code, source, text) values
  (2, 255, 'en', 'SaheehIntl', 'Allah! There is no god ˹worthy of worship˺ except Him, the Ever-Living, All-Sustaining...') on conflict do nothing;

commit;