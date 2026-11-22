# Admin panel setup

The editor is available at `/admin`. It uses Supabase Auth and the `events` table; only user IDs explicitly added to `admin_users` can create, edit, or delete events.

1. Create a Supabase project. In **SQL Editor**, run `supabase/setup.sql`.
2. In **Authentication → Users**, create an admin user with email and password. Disable public sign-ups in **Authentication → Settings**.
3. Copy that user's UUID, then run `insert into public.admin_users (user_id) values ('USER-UUID-HERE');` in SQL Editor.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel project's Environment Variables, then redeploy. These are the project's public URL and publishable/anon key; never put a service-role key in the site.
5. Open `https://YOUR-DOMAIN/admin` and sign in with the admin user's email and password. Create a concert and check **Показывать на сайте** to publish it.

The public site displays the nearest future event marked as published. The same credentials and environment variables can be put in `.env.local` for local development.
