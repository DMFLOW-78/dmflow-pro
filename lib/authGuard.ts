import { supabase } from './supabase';

export async function checkUserAccess() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return { ok: false, redirect: '/login' };
  }

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', data.user.id)
    .single();

  if (!workspace) {
    return { ok: false, redirect: '/login' };
  }

  if (workspace.status !== 'active') {
    return { ok: false, redirect: '/blocked' };
  }

  if (workspace.expires_at && new Date(workspace.expires_at) < new Date()) {
    return { ok: false, redirect: '/blocked' };
  }

  return { ok: true, user: data.user, workspace };
}