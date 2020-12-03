START TRANSACTION;

delete from emprunt where id between 1 and 10;
delete from exemplaire where id between 1 and 10;
delete from livre where id between 1 and 10;
delete from theme where id between 1 and 10;
delete from emplacement where id between 1 and 10;
delete from auteur where id between 1 and 10;


insert into auteur(auteur)  values ("Jules Verne"); 
insert into auteur(auteur)  values ("J.R.R Tolkien");
insert into auteur(auteur)  values ("Victor Hugo");
insert into auteur(auteur)  values ("Lovecraft");

insert into theme(theme)  values ("Horreur");
insert into theme(theme)  values ("Science fiction");
insert into theme(theme)  values ("Aventure");
insert into theme(theme)  values ("Fantastique");
insert into theme(theme)  values ("Policier");

insert into emplacement(nom_emplacement)  values ("Zone 1");
insert into emplacement(nom_emplacement)  values ("Zone 2");
insert into emplacement(nom_emplacement)  values ("Zone 3");

insert into livre(titre,code,description,isbn)  values ("Appel de Cthulhu", "ACTH457LO","Pour avoir plus d'info, aller sur internet.","2563775446789");
insert into livre(titre,code,description,isbn)  values ("Voyage au centre de la terre", "VCDT890JV","Pour avoir plus d'info, aller sur internet.","5742684673446");
insert into livre(titre,code,description,isbn)  values ("Le seigneur des anneaux : la communaut� de l'anneau", "LSDA934JT","Pour avoir plus d'info, aller sur internet.","8948667847521");

insert into livre_auteur(livre_id,auteur_id) values (11,14);
insert into livre_auteur(livre_id,auteur_id) values (12,11);
insert into livre_auteur(livre_id,auteur_id) values (13,12);

insert into livre_emplacement (livre_id,emplacement_id) values (11,11);
insert into livre_emplacement (livre_id,emplacement_id) values (12,12);
insert into livre_emplacement (livre_id,emplacement_id) values (13,13);

insert into livre_theme (livre_id,theme_id) values (11,11);
insert into livre_theme (livre_id,theme_id) values (12,13);
insert into livre_theme (livre_id,theme_id) values (13,13);
insert into livre_theme (livre_id,theme_id) values (13,14);

insert into exemplaire (disponibilite,livre_id) values (1,11);
insert into exemplaire (disponibilite,livre_id) values (1,12);
insert into exemplaire (disponibilite,livre_id) values (1,13);

commit;
