import { createSupabaseClient } from '@/lib/supabase/client';

export async function checkUserAccess() {
  const supabase = createSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: false, redirect: '/login' };
  }

  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (workspaceError || !workspace) {
    return { ok: false, redirect: '/login' };
  }

  if (workspace.status !== 'active') {
    return { ok: false, redirect: '/blocked' };
  }

  if (workspace.expires_at && new Date(workspace.expires_at) < new Date()) {
    return { ok: false, redirect: '/blocked' };
  }

  return { ok: true, user, workspace };
}