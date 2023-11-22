create table "public"."property_listings" (
    "listing_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default auth.uid(),
    "location" text not null,
    "occupancy" text not null default 'any'::text,
    "contact_number" text,
    "date_available" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "images" text[],
    "allow_teams" boolean not null default false,
    "amenities" text[] not null,
    "description" text,
    "approx_rent" text not null,
    "creator_name" text default get_user_name_v2(),
    "area" text,
    "locality" text,
    "bhk" text,
    "bathroom" text,
    "address" text not null,
    "status" text default '0'::text
);


alter table "public"."property_listings" enable row level security;

create table "public"."rent_agreements" (
    "created_at" timestamp with time zone not null default now(),
    "owner_name" text not null,
    "owner_address" text not null,
    "owner_email" text not null,
    "owner_phone" text not null,
    "tenant_name" text not null,
    "tenant_address" text not null,
    "tenant_email" text not null,
    "tenant_phone" text not null,
    "property_state" text not null,
    "property_city" text not null,
    "property_pincode" text not null,
    "property_address" text not null,
    "annexure_details" text,
    "agreement_id" uuid not null default gen_random_uuid(),
    "monthly_rent" bigint not null,
    "security_deposit" bigint not null,
    "lock_in_period" bigint not null,
    "notice_period" bigint not null,
    "agreement_validity" bigint not null,
    "agreement_start_date" text not null,
    "created_by" text
);


alter table "public"."rent_agreements" enable row level security;

create table "public"."team_join_invitations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "inviter_user_id" uuid not null,
    "status" text not null default 'waiting'::text,
    "team_id" uuid not null default gen_random_uuid(),
    "invitee_user_id" uuid not null,
    "inviter_name" text,
    "invitee_name" text
);


alter table "public"."team_join_invitations" enable row level security;

create table "public"."team_members" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "team_id" uuid default gen_random_uuid()
);


alter table "public"."team_members" enable row level security;

CREATE UNIQUE INDEX property_listings_pkey ON public.property_listings USING btree (listing_id);

CREATE UNIQUE INDEX "rent-agreements_pkey" ON public.rent_agreements USING btree (agreement_id);

CREATE UNIQUE INDEX team_join_invitations_pkey ON public.team_join_invitations USING btree (id);

CREATE UNIQUE INDEX team_members_pkey ON public.team_members USING btree (id);

alter table "public"."property_listings" add constraint "property_listings_pkey" PRIMARY KEY using index "property_listings_pkey";

alter table "public"."rent_agreements" add constraint "rent-agreements_pkey" PRIMARY KEY using index "rent-agreements_pkey";

alter table "public"."team_join_invitations" add constraint "team_join_invitations_pkey" PRIMARY KEY using index "team_join_invitations_pkey";

alter table "public"."team_members" add constraint "team_members_pkey" PRIMARY KEY using index "team_members_pkey";

alter table "public"."property_listings" add constraint "property_listings_created_by_fkey" FOREIGN KEY (created_by) REFERENCES user_profiles(user_id) not valid;

alter table "public"."property_listings" validate constraint "property_listings_created_by_fkey";

alter table "public"."team_join_invitations" add constraint "team_join_invitations_invitee_user_id_fkey" FOREIGN KEY (invitee_user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE not valid;

alter table "public"."team_join_invitations" validate constraint "team_join_invitations_invitee_user_id_fkey";

alter table "public"."team_join_invitations" add constraint "team_join_invitations_inviter_user_id_fkey" FOREIGN KEY (inviter_user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE not valid;

alter table "public"."team_join_invitations" validate constraint "team_join_invitations_inviter_user_id_fkey";

alter table "public"."team_members" add constraint "team_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE not valid;

alter table "public"."team_members" validate constraint "team_members_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_add_team_member_after_invitation_accepted()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
UPDATE team_members
SET team_id = NEW.team_id
WHERE user_id = NEW.invitee_user_id;

IF NOT FOUND THEN
INSERT INTO team_members(user_id, team_id)
VALUES (
    NEW.invitee_user_id,
    NEW.team_id
  );
END IF;
RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_name(input_user_id uuid)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    user_name TEXT;
BEGIN
    SELECT name INTO user_name FROM user_profiles WHERE user_profiles.user_id = input_user_id;
    RETURN user_name;
END; $function$
;

create policy "Enable delete for users based on email_id"
on "public"."property_listings"
as permissive
for delete
to public
using (((auth.jwt() ->> 'email'::text) = 'lit2020016@iiitl.ac.in'::text));


create policy "Enable insert for authenticated users only"
on "public"."property_listings"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."property_listings"
as permissive
for select
to public
using (true);


create policy "Property status update policy"
on "public"."property_listings"
as permissive
for update
to public
using (((auth.jwt() ->> 'email'::text) = 'lit2020016@iiitl.ac.in'::text))
with check (((auth.jwt() ->> 'email'::text) = 'lit2020016@iiitl.ac.in'::text));


create policy "enable update access for admin users"
on "public"."property_listings"
as permissive
for update
to public
using (((auth.jwt() ->> 'email'::text) = 'lit2020016@iiitl.ac.in'::text))
with check (((auth.jwt() ->> 'email'::text) = 'lit2020016@iiitl.ac.in'::text));


create policy "Enable insert for authenticated users only"
on "public"."rent_agreements"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."rent_agreements"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "public"."team_join_invitations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."team_join_invitations"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on uid"
on "public"."team_join_invitations"
as permissive
for update
to public
using ((auth.uid() = invitee_user_id))
with check ((auth.uid() = invitee_user_id));


create policy "Enable insert for authenticated users only"
on "public"."team_members"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."team_members"
as permissive
for select
to public
using (true);


CREATE TRIGGER on_team_invitation_accepted_trigger AFTER UPDATE ON public.team_join_invitations FOR EACH ROW WHEN (((old.status <> new.status) AND (new.status = 'accepted'::text))) EXECUTE FUNCTION handle_add_team_member_after_invitation_accepted();


