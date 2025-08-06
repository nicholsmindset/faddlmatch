-- Faddlmatch Schema with Authentication
-- Schema Analysis: Fresh project - no existing tables
-- Integration Type: Complete schema with authentication
-- Dependencies: None - creating new schema

-- 1. Custom Types
CREATE TYPE public.subscription_tier AS ENUM ('intention', 'patience', 'reliance');
CREATE TYPE public.user_role AS ENUM ('admin', 'user');
CREATE TYPE public.marital_status AS ENUM ('widowed', 'divorced');
CREATE TYPE public.prayer_frequency AS ENUM ('5_times_daily', 'mostly_regular', 'occasionally', 'not_regular');
CREATE TYPE public.hijab_preference AS ENUM ('always', 'sometimes', 'never', 'no_preference');
CREATE TYPE public.education_level AS ENUM ('high_school', 'diploma', 'bachelors', 'masters', 'phd', 'other');
CREATE TYPE public.smoking_preference AS ENUM ('never', 'occasionally', 'regularly', 'no_preference');
CREATE TYPE public.match_status AS ENUM ('pending', 'liked', 'passed', 'matched');
CREATE TYPE public.message_status AS ENUM ('sent', 'delivered', 'read');

-- 2. Core Tables
-- User profiles table (references auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    age INTEGER,
    location TEXT,
    district TEXT,
    marital_status public.marital_status,
    children_count INTEGER DEFAULT 0,
    profession TEXT,
    education_level public.education_level,
    monthly_income_range TEXT,
    prayer_frequency public.prayer_frequency,
    hijab_preference public.hijab_preference,
    smoking_preference public.smoking_preference,
    about_me TEXT,
    looking_for TEXT,
    subscription_tier public.subscription_tier DEFAULT 'intention'::public.subscription_tier,
    stripe_customer_id TEXT UNIQUE,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    profile_completion_percentage INTEGER DEFAULT 0,
    last_active TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User photos table
CREATE TABLE public.user_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    is_blurred BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    matched_user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status public.match_status DEFAULT 'pending'::public.match_status,
    compatibility_score INTEGER DEFAULT 0,
    user_action public.match_status,
    matched_user_action public.match_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, matched_user_id)
);

-- Messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status public.message_status DEFAULT 'sent'::public.message_status,
    is_deleted_by_sender BOOLEAN DEFAULT false,
    is_deleted_by_receiver BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table for Stripe integration
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    tier public.subscription_tier NOT NULL,
    status TEXT NOT NULL,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Daily activity tracking
CREATE TABLE public.daily_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    activity_date DATE DEFAULT CURRENT_DATE,
    matches_viewed INTEGER DEFAULT 0,
    messages_sent INTEGER DEFAULT 0,
    profile_views_received INTEGER DEFAULT 0,
    interests_expressed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_date)
);

-- FAQ table for dynamic content management
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_subscription_tier ON public.user_profiles(subscription_tier);
CREATE INDEX idx_user_profiles_location ON public.user_profiles(location);
CREATE INDEX idx_user_profiles_marital_status ON public.user_profiles(marital_status);
CREATE INDEX idx_user_profiles_is_active ON public.user_profiles(is_active);
CREATE INDEX idx_user_profiles_stripe_customer ON public.user_profiles(stripe_customer_id);

CREATE INDEX idx_user_photos_user_id ON public.user_photos(user_id);
CREATE INDEX idx_user_photos_is_primary ON public.user_photos(is_primary);

CREATE INDEX idx_matches_user_id ON public.matches(user_id);
CREATE INDEX idx_matches_matched_user_id ON public.matches(matched_user_id);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_matches_created_at ON public.matches(created_at);

CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);

CREATE INDEX idx_daily_activities_user_date ON public.daily_activities(user_id, activity_date);

CREATE INDEX idx_faqs_display_order ON public.faqs(display_order);
CREATE INDEX idx_faqs_is_active ON public.faqs(is_active);

-- 4. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- User profiles policies
CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "public_can_view_basic_profiles"
ON public.user_profiles
FOR SELECT
TO public
USING (is_active = true);

-- User photos policies
CREATE POLICY "users_manage_own_photos"
ON public.user_photos
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "public_can_view_photos"
ON public.user_photos
FOR SELECT
TO public
USING (true);

-- Matches policies
CREATE POLICY "users_manage_own_matches"
ON public.matches
FOR ALL
TO authenticated
USING (user_id = auth.uid() OR matched_user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Messages policies
CREATE POLICY "users_manage_own_messages"
ON public.messages
FOR ALL
TO authenticated
USING (sender_id = auth.uid() OR receiver_id = auth.uid())
WITH CHECK (sender_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "users_view_own_subscriptions"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Daily activities policies
CREATE POLICY "users_manage_own_activities"
ON public.daily_activities
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- FAQ policies (public read access)
CREATE POLICY "public_can_read_faqs"
ON public.faqs
FOR SELECT
TO public
USING (is_active = true);

-- 6. Functions
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$;

-- Function to update profile completion percentage
CREATE OR REPLACE FUNCTION public.calculate_profile_completion(user_uuid UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    completion_score INTEGER := 0;
    profile_record RECORD;
BEGIN
    SELECT * INTO profile_record
    FROM public.user_profiles
    WHERE id = user_uuid;
    
    IF profile_record IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Basic info (40 points total)
    IF profile_record.full_name IS NOT NULL AND LENGTH(profile_record.full_name) > 0 THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.age IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.location IS NOT NULL AND LENGTH(profile_record.location) > 0 THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.marital_status IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.profession IS NOT NULL AND LENGTH(profile_record.profession) > 0 THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.education_level IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.prayer_frequency IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.about_me IS NOT NULL AND LENGTH(profile_record.about_me) > 50 THEN
        completion_score := completion_score + 5;
    END IF;
    
    -- Photos (30 points)
    IF EXISTS (SELECT 1 FROM public.user_photos WHERE user_id = user_uuid AND is_primary = true) THEN
        completion_score := completion_score + 30;
    END IF;
    
    -- Additional details (30 points)
    IF profile_record.looking_for IS NOT NULL AND LENGTH(profile_record.looking_for) > 30 THEN
        completion_score := completion_score + 15;
    END IF;
    IF profile_record.hijab_preference IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.smoking_preference IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    IF profile_record.monthly_income_range IS NOT NULL THEN
        completion_score := completion_score + 5;
    END IF;
    
    RETURN LEAST(completion_score, 100);
END;
$$;

-- Function to get daily matches based on tier
CREATE OR REPLACE FUNCTION public.get_daily_matches(target_user_id UUID, match_limit INTEGER DEFAULT 3)
RETURNS TABLE(
    id UUID,
    full_name TEXT,
    age INTEGER,
    location TEXT,
    district TEXT,
    profession TEXT,
    education_level public.education_level,
    photo_url TEXT,
    compatibility_score INTEGER,
    is_verified BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.id,
        up.full_name,
        up.age,
        up.location,
        up.district,
        up.profession,
        up.education_level,
        ph.photo_url,
        FLOOR(RANDOM() * 41 + 60)::INTEGER as compatibility_score,
        up.is_verified
    FROM public.user_profiles up
    LEFT JOIN public.user_photos ph ON up.id = ph.user_id AND ph.is_primary = true
    WHERE up.id != target_user_id
        AND up.is_active = true
        AND NOT EXISTS (
            SELECT 1 FROM public.matches m 
            WHERE (m.user_id = target_user_id AND m.matched_user_id = up.id)
               OR (m.user_id = up.id AND m.matched_user_id = target_user_id)
        )
    ORDER BY RANDOM()
    LIMIT match_limit;
END;
$$;

-- 7. Triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update profile completion percentage
CREATE OR REPLACE FUNCTION public.update_profile_completion()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    NEW.profile_completion_percentage := public.calculate_profile_completion(NEW.id);
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profile_completion_trigger
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_profile_completion();

-- 8. Mock Data
DO $$
DECLARE
    user1_id UUID := gen_random_uuid();
    user2_id UUID := gen_random_uuid();
    user3_id UUID := gen_random_uuid();
    user4_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user1_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'amira.hassan@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Amira Hassan"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah.ahmed@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Ahmed"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user3_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'fatima.alzahra@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Fatima Al-Zahra"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user4_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'khadija.rahman@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Khadija Rahman"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Update user profiles with complete information
    UPDATE public.user_profiles SET
        age = 32,
        location = 'Singapore',
        district = 'Tampines',
        marital_status = 'widowed'::public.marital_status,
        children_count = 1,
        profession = 'Marketing Manager',
        education_level = 'bachelors'::public.education_level,
        monthly_income_range = 'SGD 4000-6000',
        prayer_frequency = '5_times_daily'::public.prayer_frequency,
        hijab_preference = 'always'::public.hijab_preference,
        smoking_preference = 'never'::public.smoking_preference,
        about_me = 'I am a devoted Muslim mother looking for a kind, understanding partner who shares my values and faith. Family is everything to me.',
        looking_for = 'A practicing Muslim man who is ready for marriage and understands the blessing of second chances. Someone who values family, prayer, and building a halal relationship.',
        subscription_tier = 'patience'::public.subscription_tier,
        is_verified = true,
        profile_completion_percentage = 95
    WHERE id = user1_id;

    UPDATE public.user_profiles SET
        age = 28,
        location = 'Singapore',
        district = 'Jurong East',
        marital_status = 'divorced'::public.marital_status,
        children_count = 0,
        profession = 'Software Engineer',
        education_level = 'bachelors'::public.education_level,
        monthly_income_range = 'SGD 5000-7000',
        prayer_frequency = '5_times_daily'::public.prayer_frequency,
        hijab_preference = 'always'::public.hijab_preference,
        smoking_preference = 'never'::public.smoking_preference,
        about_me = 'Alhamdulillah, I am grateful for all of Allah''s blessings. I work in technology and love helping others through my career.',
        looking_for = 'A practicing brother who fears Allah and wants to complete half his deen with me. Someone who values communication and mutual respect.',
        subscription_tier = 'intention'::public.subscription_tier,
        is_verified = true,
        profile_completion_percentage = 90
    WHERE id = user2_id;

    UPDATE public.user_profiles SET
        age = 35,
        location = 'Singapore',
        district = 'Woodlands',
        marital_status = 'widowed'::public.marital_status,
        children_count = 2,
        profession = 'Teacher',
        education_level = 'masters'::public.education_level,
        monthly_income_range = 'SGD 3500-5000',
        prayer_frequency = '5_times_daily'::public.prayer_frequency,
        hijab_preference = 'always'::public.hijab_preference,
        smoking_preference = 'never'::public.smoking_preference,
        about_me = 'I am an educator who believes in nurturing young minds. My children are my priority, and I seek a partner who will love them as his own.',
        looking_for = 'A compassionate man who understands the responsibilities of being a stepfather and is ready to build a loving Islamic household together.',
        subscription_tier = 'reliance'::public.subscription_tier,
        is_verified = true,
        profile_completion_percentage = 98
    WHERE id = user3_id;

    UPDATE public.user_profiles SET
        age = 29,
        location = 'Singapore',
        district = 'Clementi',
        marital_status = 'divorced'::public.marital_status,
        children_count = 1,
        profession = 'Healthcare Professional',
        education_level = 'bachelors'::public.education_level,
        monthly_income_range = 'SGD 4500-6500',
        prayer_frequency = 'mostly_regular'::public.prayer_frequency,
        hijab_preference = 'always'::public.hijab_preference,
        smoking_preference = 'never'::public.smoking_preference,
        about_me = 'Working in healthcare has taught me the value of compassion and patience. I am a single mother striving to raise my child with Islamic values.',
        looking_for = 'A practicing Muslim who values family and is ready for the commitment that comes with marriage and stepparenting.',
        subscription_tier = 'intention'::public.subscription_tier,
        is_verified = false,
        profile_completion_percentage = 85
    WHERE id = user4_id;

    -- Add sample photos
    INSERT INTO public.user_photos (user_id, photo_url, is_primary, is_blurred) VALUES
        (user1_id, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face', true, false),
        (user2_id, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', true, true),
        (user3_id, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', true, false),
        (user4_id, 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face', true, true);

    -- Add some matches
    INSERT INTO public.matches (user_id, matched_user_id, status, compatibility_score, user_action, matched_user_action) VALUES
        (user1_id, user2_id, 'matched'::public.match_status, 87, 'liked'::public.match_status, 'liked'::public.match_status),
        (user1_id, user3_id, 'pending'::public.match_status, 92, 'pending'::public.match_status, 'pending'::public.match_status),
        (user2_id, user4_id, 'liked'::public.match_status, 78, 'liked'::public.match_status, 'pending'::public.match_status);

    -- Add sample messages
    INSERT INTO public.messages (sender_id, receiver_id, content, status) VALUES
        (user1_id, user2_id, 'Assalamu alaikum sister, I hope you are doing well by the grace of Allah.', 'read'::public.message_status),
        (user2_id, user1_id, 'Wa alaikum assalam, Alhamdulillah I am well. Thank you for reaching out.', 'read'::public.message_status),
        (user1_id, user2_id, 'I read your profile and admire your dedication to your faith. Would you be interested in getting to know each other better?', 'delivered'::public.message_status);

    -- Add daily activities
    INSERT INTO public.daily_activities (user_id, activity_date, matches_viewed, messages_sent, profile_views_received, interests_expressed) VALUES
        (user1_id, CURRENT_DATE, 3, 2, 5, 1),
        (user2_id, CURRENT_DATE, 2, 1, 8, 0),
        (user3_id, CURRENT_DATE, 5, 0, 12, 2),
        (user4_id, CURRENT_DATE, 1, 0, 3, 1);

    -- Add FAQ content
    INSERT INTO public.faqs (question, answer, display_order) VALUES
        ('What is Faddl?', 'Faddl is a faith-guided platform built especially for widowed and divorced Muslims seeking a second chance at companionship. We prioritise dignity, privacy, and genuine connection — no swiping, no pressure.', 1),
        ('Who is Faddl for?', 'Faddl is for Muslim men and women who are previously married, and who are looking to begin again with someone who shares their values and understands their journey.', 2),
        ('What makes Faddl different from other matchmaking sites?', 'Faddl''s uniqueness lies in: A focused niche: We serve only widowed and divorced Muslims — no generic profiles or unclear intentions. Blurred profile photos until mutual interest or admin approval — for privacy and modesty. No swiping or superficial browsing — we prioritise sincerity over speed. A gentle personality and values-based matching feature to increase compatibility and reduce mismatches. Designed with cultural sensitivity and adab in mind, especially for users in Singapore and Southeast Asia.', 3),
        ('Is Faddl Shariah-compliant?', 'Faddl is designed to honour Islamic principles; profiles are moderated for appropriate content, and users are encouraged to involve a wali or guardian. We promote intention-led, halal connections — not dating.', 4),
        ('How do I know the people here are genuine?', 'We use a manual profile review process, optional ID verification, and flagging/report tools to ensure genuine intent and safety. This platform was built to protect hearts, not play with them.', 5),
        ('Is there a fee to join?', 'Faddl will always have a free basic tier, with optional upgrades for extra features. We believe finding a second chance at happiness should not be out of reach due to finances.', 6),
        ('Can I use Faddl from outside Singapore?', 'Yes. While Faddl is built with Singapore''s Muslim community in mind, we welcome users from across Southeast Asia and beyond who align with our values.', 7),
        ('Is my data safe and private?', 'Absolutely. We take privacy seriously — your photos remain blurred by default, your contact info is never shared publicly, and you are always in control of who sees your profile.', 8),
        ('How do I get started?', 'Just sign up with your email or Google account, complete your profile with honesty and care, and let Faddl guide you toward someone compatible, sincere, and ready — just like you.', 9);

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating mock data: %', SQLERRM;
END $$;