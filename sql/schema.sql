create extension if not exists pgcrypto;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  company_name text,
  plan text default 'free',
  created_at timestamptz default now()
);

create table if not exists flows (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  name text not null,
  channel text default 'instagram',
  trigger_type text default 'keyword',
  trigger_value text not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists flow_steps (
  id uuid primary key default gen_random_uuid(),
  flow_id uuid references flows(id) on delete cascade,
  step_order int not null,
  type text default 'message',
  content text,
  delay_seconds int default 0,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  platform_user_id text,
  name text,
  username text,
  tag text,
  status text default 'Novo',
  created_at timestamptz default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  platform text,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  direction text,
  content text,
  sent_by text,
  created_at timestamptz default now()
);