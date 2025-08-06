-- ===================================================================
-- FADDLMATCH MESSAGING SYSTEM - COMPLETE DATABASE MIGRATION
-- ===================================================================
-- Copy and paste this entire script into your Supabase SQL Editor
-- This creates all tables, indexes, security policies, and triggers
-- ===================================================================

-- Step 1: Create Tables
-- ===================================================================

CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    participant_1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    participant_2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    participant_1_unread_count INTEGER DEFAULT 0,
    participant_2_unread_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    guardian_notified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'guardian_request')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE,
    guardian_approved BOOLEAN DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS guardian_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    guardian_email VARCHAR(255) NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'failed'))
);

-- Step 2: Create Performance Indexes
-- ===================================================================

CREATE INDEX IF NOT EXISTS idx_conversations_participants 
ON conversations(participant_1_id, participant_2_id);

CREATE INDEX IF NOT EXISTS idx_conversations_updated 
ON conversations(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_conversation 
ON messages(conversation_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_sender 
ON messages(sender_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guardian_notifications_user 
ON guardian_notifications(user_id, sent_at DESC);

-- Step 3: Enable Row Level Security
-- ===================================================================

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_notifications ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop Existing Policies (if any)
-- ===================================================================

DROP POLICY IF EXISTS "conversations_policy" ON conversations;
DROP POLICY IF EXISTS "messages_policy" ON messages;
DROP POLICY IF EXISTS "guardian_notifications_policy" ON guardian_notifications;
DROP POLICY IF EXISTS "Users can view their own conversations" ON conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON conversations;
DROP POLICY IF EXISTS "Users can update their conversations" ON conversations;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Users can send messages to their conversations" ON messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON messages;
DROP POLICY IF EXISTS "Users can view their guardian notifications" ON guardian_notifications;
DROP POLICY IF EXISTS "System can insert guardian notifications" ON guardian_notifications;

-- Step 5: Create Security Policies
-- ===================================================================

-- Conversations Policies
CREATE POLICY "conversations_select_policy" ON conversations
    FOR SELECT USING (
        participant_1_id = auth.uid() OR 
        participant_2_id = auth.uid()
    );

CREATE POLICY "conversations_insert_policy" ON conversations
    FOR INSERT WITH CHECK (
        participant_1_id = auth.uid() OR 
        participant_2_id = auth.uid()
    );

CREATE POLICY "conversations_update_policy" ON conversations
    FOR UPDATE USING (
        participant_1_id = auth.uid() OR 
        participant_2_id = auth.uid()
    );

-- Messages Policies
CREATE POLICY "messages_select_policy" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
        )
    );

CREATE POLICY "messages_insert_policy" ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND (conversations.participant_1_id = auth.uid() OR conversations.participant_2_id = auth.uid())
        )
    );

CREATE POLICY "messages_update_policy" ON messages
    FOR UPDATE USING (sender_id = auth.uid());

-- Guardian Notifications Policies
CREATE POLICY "guardian_notifications_select_policy" ON guardian_notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "guardian_notifications_insert_policy" ON guardian_notifications
    FOR INSERT WITH CHECK (true);

-- Step 6: Create Trigger Functions
-- ===================================================================

CREATE OR REPLACE FUNCTION update_conversation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations 
    SET 
        updated_at = NOW(),
        last_message_at = NOW()
    WHERE id = NEW.conversation_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_unread_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations 
    SET 
        participant_1_unread_count = CASE 
            WHEN participant_1_id != NEW.sender_id THEN participant_1_unread_count + 1
            ELSE participant_1_unread_count
        END,
        participant_2_unread_count = CASE 
            WHEN participant_2_id != NEW.sender_id THEN participant_2_unread_count + 1
            ELSE participant_2_unread_count
        END
    WHERE id = NEW.conversation_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create Triggers
-- ===================================================================

DROP TRIGGER IF EXISTS update_conversation_on_message ON messages;
DROP TRIGGER IF EXISTS increment_unread_on_message ON messages;

CREATE TRIGGER update_conversation_on_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_conversation_timestamp();

CREATE TRIGGER increment_unread_on_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION increment_unread_count();

-- Step 8: Verification Query
-- ===================================================================
-- Run this to verify tables were created successfully:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name IN ('conversations', 'messages', 'guardian_notifications');

-- ===================================================================
-- MIGRATION COMPLETE ✅
-- ===================================================================
-- Your FaddlMatch messaging system is now ready with:
-- ✅ Real-time messaging tables
-- ✅ Islamic compliance support  
-- ✅ Guardian notification system
-- ✅ Row Level Security policies
-- ✅ Performance indexes
-- ✅ Automatic triggers for timestamps and unread counts
-- ===================================================================