create policy "Enable insert for authenticated users only"
on "storage"."buckets"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "storage"."buckets"
as permissive
for select
to public
using (true);


create policy "Read access to all the users 15yjd5i_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'listing-images-bucket'::text) AND (auth.role() = 'anon'::text)));


create policy "Write access to authenticated users only. 15yjd5i_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'listing-images-bucket'::text) AND (auth.role() = 'authenticated'::text)));



