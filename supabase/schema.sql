create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  category text not null check (category in ('soiree','ensemble','traditionnel','autre')),
  price integer not null check (price >= 0),
  sizes text[] default '{}',
  colors text[] default '{}',
  is_new boolean default false,
  in_stock boolean default true,
  images text[] default '{}',
  video_url text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  customer_phone text,
  customer_city text,
  items jsonb not null,
  total integer,
  status text default 'en_attente' check (status in ('en_attente','confirmee','livree','annulee')),
  created_at timestamptz default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Lecture publique des produits" on public.products;
create policy "Lecture publique des produits" on public.products for select using (true);

drop policy if exists "Ecriture produits reservee a l'admin" on public.products;
create policy "Ecriture produits reservee a l'admin" on public.products
  for all to authenticated using (true) with check (true);

drop policy if exists "Creation de commande publique" on public.orders;
create policy "Creation de commande publique" on public.orders for insert to anon, authenticated with check (true);

drop policy if exists "Lecture commandes reservee a l'admin" on public.orders;
create policy "Lecture commandes reservee a l'admin" on public.orders for select to authenticated using (true);

drop policy if exists "Maj commandes reservee a l'admin" on public.orders;
create policy "Maj commandes reservee a l'admin" on public.orders for update to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('products', 'products', true, 52428800, array['image/jpeg','image/png','image/webp','video/mp4'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Lecture publique medias produits" on storage.objects;
create policy "Lecture publique medias produits" on storage.objects for select using (bucket_id = 'products');

drop policy if exists "Upload medias reserve admin" on storage.objects;
create policy "Upload medias reserve admin" on storage.objects for insert to authenticated with check (bucket_id = 'products');

drop policy if exists "Maj medias reserve admin" on storage.objects;
create policy "Maj medias reserve admin" on storage.objects for update to authenticated using (bucket_id = 'products') with check (bucket_id = 'products');

drop policy if exists "Suppression medias reserve admin" on storage.objects;
create policy "Suppression medias reserve admin" on storage.objects for delete to authenticated using (bucket_id = 'products');

insert into public.products (name, slug, category, price, description, sizes, colors, is_new, in_stock)
values
  ('Robe Ayélé', 'robe-ayele', 'soiree', 35000, 'Robe de soirée en tissu wax, coupe fluide, ceinture assortie. Confectionnée à tes mesures.', array['36','38','40','42'], array['Bordeaux','Émeraude'], true, true),
  ('Ensemble Akofa', 'ensemble-akofa', 'ensemble', 42000, 'Ensemble deux pièces, haut brodé main et jupe crayon assortie.', array['36','38','40'], array['Ocre','Bleu nuit'], false, true),
  ('Robe Réveillon', 'robe-reveillon', 'soiree', 48000, 'Robe satin, coupe sirène, idéale pour les grandes occasions.', array['38','40','42','44'], array['Or','Noir'], true, true),
  ('Tenue Adjoa', 'tenue-adjoa', 'traditionnel', 39000, 'Tenue traditionnelle deux pièces, motifs tissés, parfaite pour les cérémonies.', array['36','38','40','42'], array['Vert/Or'], false, true),
  ('Robe Mireille', 'robe-mireille', 'soiree', 33000, 'Robe courte, tissu léger, parfaite pour les sorties et cocktails.', array['36','38','40'], array['Corail'], false, true),
  ('Ensemble Foli', 'ensemble-foli', 'ensemble', 45000, 'Ensemble pantalon large et top ajusté, pour un look à la fois classe et confortable.', array['38','40','42'], array['Terracotta','Kaki'], false, true)
on conflict (slug) do nothing;
