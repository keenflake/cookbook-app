import { SupabaseClientOptions, createClient } from '@supabase/supabase-js';

import { assert } from '@app/common/utils';

assert(typeof process.env.SUPABASE_URL === 'string', `"SUPABASE_URL" env is not defined`);
assert(typeof process.env.SUPABASE_API_KEY === 'string', `"SUPABASE_API_KEY" env is not defined`);

const options: SupabaseClientOptions<'public'> = {
  db: {
    schema: 'public',
  },
};

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY, options);
