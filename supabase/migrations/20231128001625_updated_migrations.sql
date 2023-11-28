alter table "public"."property_listings" drop constraint "property_listings_created_by_fkey";

alter table "public"."test_table" drop constraint "test_table_pkey";

drop index if exists "public"."test_table_pkey";

drop table "public"."test_table";

create table "public"."property_requests" (
    "property_id" uuid not null,
    "type" text not null,
    "team_user_id" uuid not null,
    "listing_id" uuid not null default gen_random_uuid()
);


alter table "public"."property_requests" enable row level security;

alter table "public"."roommate_required_listings" add column "address" text not null;

alter table "public"."roommate_required_listings" add column "area" text not null;

alter table "public"."roommate_required_listings" add column "bathroom" text not null;

alter table "public"."roommate_required_listings" add column "bhk" text not null;

alter table "public"."roommate_required_listings" add column "locality" text not null;

alter table "public"."user_profiles" add column "location_city" text;

CREATE UNIQUE INDEX property_requests_pkey ON public.property_requests USING btree (listing_id);

alter table "public"."property_requests" add constraint "property_requests_pkey" PRIMARY KEY using index "property_requests_pkey";

alter table "public"."property_listings" add constraint "property_listings_created_by_fkey" FOREIGN KEY (created_by) REFERENCES user_profiles(user_id) ON DELETE CASCADE not valid;

alter table "public"."property_listings" validate constraint "property_listings_created_by_fkey";

create policy "Enable insert for authenticated users only"
on "public"."property_requests"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."property_requests"
as permissive
for select
to public
using (true);



