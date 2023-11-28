create policy "Enable insert for authenticated users only"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "storage"."objects"
as permissive
for select
to public
using (true);


create policy "Give anon users access to JPG images in folder ythqi4_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'avatar-images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give anon users access to images in folder ythqi4_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'avatar-images'::text) AND (auth.role() = 'anon'::text)));



