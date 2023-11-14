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

CREATE OR REPLACE FUNCTION public.get_user_name_v2()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    user_name TEXT;
BEGIN
    SELECT name INTO user_name FROM user_profiles WHERE user_profiles.user_id = auth.uid();
    RETURN user_name;
END; $function$
;

alter table "public"."room_required_listings" add column "creator_name" text default get_user_name_v2();

alter table "public"."roommate_required_listings" add column "creator_name" text default get_user_name_v2();

set check_function_bodies = off;
