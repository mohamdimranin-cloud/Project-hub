-- ProjectHub Database Schema for Neon PostgreSQL

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    branch VARCHAR(100),
    college VARCHAR(255),
    role VARCHAR(20) DEFAULT 'requester' CHECK (role IN ('requester', 'admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    project_type VARCHAR(20) NOT NULL CHECK (project_type IN ('mini', 'major')),
    budget DECIMAL(10, 2),
    deadline DATE NOT NULL,
    technologies TEXT[], -- Array of technologies
    phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in-review', 'accepted', 'in-progress', 'delivered', 'completed', 'rejected')),
    requester_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assigned_developer_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    estimated_delivery DATE,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP,
    admin_notes TEXT,
    source_code_link VARCHAR(500),
    delivery_notes TEXT,
    download_unlocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progress Updates Table
CREATE TABLE IF NOT EXISTS progress_updates (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deliverables Table
CREATE TABLE IF NOT EXISTS deliverables (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    related_project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_requester ON projects(requester_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_progress_project ON progress_updates(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: password123)
INSERT INTO users (email, password, name, phone, branch, college, role, is_active)
VALUES (
    'admin@test.com',
    '$2a$10$YourHashedPasswordHere', -- You'll need to hash this
    'Admin User',
    '7892856055',
    'N/A',
    'N/A',
    'admin',
    true
) ON CONFLICT (email) DO NOTHING;

-- Insert default student user
INSERT INTO users (email, password, name, phone, branch, college, role, is_active)
VALUES (
    'student@test.com',
    '$2a$10$YourHashedPasswordHere', -- You'll need to hash this
    'Test Student',
    '+1234567890',
    'Computer Science',
    'Test University',
    'requester',
    true
) ON CONFLICT (email) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('faqs', '[
    {"question": "How long does it take?", "answer": "Depends on project complexity"},
    {"question": "What payment methods?", "answer": "UPI, Card, Net Banking"}
]'::jsonb),
('contact', '{
    "email": "support@projecthub.com",
    "phone": "+1234567890",
    "address": "123 Main St, City"
}'::jsonb),
('pricing', '{
    "mini": 5000,
    "major": 15000
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
