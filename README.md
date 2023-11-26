<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <h1 align="center"> Humara Ghar <br/>
    perfect way to find your perfect roommates.</h1>
</a>

<p align="center">
  Built with nextjs, tailwindcss, supabase, and love &hearts;.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
</p>
<br/>

If you wish to just develop [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

## Dev Environment Setup

### Install Dependencies

- Run `npm i` to install dependencies for your project.

### Supabase Login in Terminal

- If you haven't used Supabase in your terminal before, log in by creating an access token [here](https://app.supabase.com/account/tokens).
- Copy the access token generated.
- Run `npx supabase login` in your terminal.
- When prompted for an access token, paste the token you copied earlier to log in.

### Linking Your Project to Supabase

- Run `npx supabase link --project-ref {projectRef}` in your terminal.
  - Your project reference is available in the project settings section within the Supabase dashboard.
- After running the command, you'll be prompted for the database password you saved earlier. Enter it to complete the linking process.

### Pushing Nextbase Magic to Your Supabase Project

- Execute `npx supabase db push .` in your terminal.
- This command will push all necessary configurations (teams, admin panel, projects, etc.) into your Supabase project.
- Your Supabase project will now be ready for use.

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```
