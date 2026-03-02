CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  role VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  avatar_url VARCHAR(512),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  level VARCHAR(100),
  image_url VARCHAR(512),
  instructor_id UUID NOT NULL,
  instructor_name VARCHAR(255),
  modules_count INT,
  students_count INT,
  status VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE enrollments (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT,
  student_id UUID,
  progress INT,
  enrolled_at TIMESTAMP,
  UNIQUE(course_id, student_id)
);

CREATE TABLE assignments (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT,
  title VARCHAR(255),
  description TEXT,
  max_grade INT,
  due_date TIMESTAMP,
  created_by UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  assignment_id BIGINT,
  student_id UUID,
  status VARCHAR(20),
  grade INT,
  feedback TEXT,
  file_name VARCHAR(255),
  submitted_at TIMESTAMP,
  graded_at TIMESTAMP
);

CREATE TABLE teacher_approval_requests (
  id BIGSERIAL PRIMARY KEY,
  profile_id BIGINT,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  status VARCHAR(20),
  created_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by UUID
);

CREATE TABLE blocked_emails (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  blocked_at TIMESTAMP,
  reason VARCHAR(255)
);

CREATE TABLE conversations (
  id BIGSERIAL PRIMARY KEY,
  type VARCHAR(20),
  title VARCHAR(255),
  course_id BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE conversation_participants (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT,
  profile_id BIGINT,
  joined_at TIMESTAMP,
  last_read_at TIMESTAMP,
  UNIQUE(conversation_id, profile_id)
);

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT,
  sender_id UUID,
  content TEXT,
  created_at TIMESTAMP
);

CREATE TABLE course_files (
  id BIGSERIAL PRIMARY KEY,
  context_type VARCHAR(50),
  context_id BIGINT,
  file_name VARCHAR(255),
  file_type VARCHAR(100),
  file_url VARCHAR(512),
  file_size BIGINT,
  uploaded_by UUID,
  created_at TIMESTAMP
);

CREATE TABLE refresh_tokens (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(700) UNIQUE NOT NULL,
  user_id UUID NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (id, email, password_hash, role, created_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@local.test', '$2a$10$S29cakuAzM4ANoeHFTWeHul0PeBkcgY9InZtAGlBftU88xCVzeZJy', 'ADMIN', NOW());

INSERT INTO profiles (user_id, full_name, email, role, status, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'System Admin', 'admin@local.test', 'ADMIN', 'ACTIVE', NOW(), NOW());
