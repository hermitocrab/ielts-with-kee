-- ============================================
-- IELTS with Kee - Database Schema
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- Students table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW()
);

-- Homework submissions
CREATE TABLE IF NOT EXISTS public.homework (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    tool_type TEXT DEFAULT 'general',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed', 'returned')),
    feedback TEXT DEFAULT '',
    score DECIMAL(3,1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ
);

-- Learning progress
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
    tool_type TEXT NOT NULL,
    completed_items JSONB DEFAULT '[]',
    score_avg DECIMAL(3,1) DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, tool_type)
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Students: can only read/update their own profile
CREATE POLICY "students_self_access"
    ON public.students
    FOR ALL
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Admin/teacher: read all students (using a helper function)
CREATE POLICY "admin_read_students"
    ON public.students
    FOR SELECT
    USING (auth.email() = 'sriskeeda@gmail.com');

-- Homework: students CRUD their own
CREATE POLICY "homework_self"
    ON public.homework
    FOR ALL
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Teacher: read all homework
CREATE POLICY "teacher_read_homework"
    ON public.homework
    FOR SELECT
    USING (auth.role() = 'service_role' OR EXISTS (
        SELECT 1 FROM public.students WHERE id = auth.uid() AND email = 'sriskeeda@gmail.com'
    ));

-- Teacher: update homework (add feedback/score)
CREATE POLICY "teacher_update_homework"
    ON public.homework
    FOR UPDATE
    USING (auth.role() = 'service_role' OR EXISTS (
        SELECT 1 FROM public.students WHERE id = auth.uid() AND email = 'sriskeeda@gmail.com'
    ));

-- Progress: students self
CREATE POLICY "progress_self"
    ON public.learning_progress
    FOR ALL
    USING (student_id = auth.uid())
    WITH CHECK (student_id = auth.uid());

-- Auto-create student profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.students (id, email, display_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
