# tech-str
Spring Boot sistem za upravljanje inventarom za Techno-store

Ova Spring Boot aplikacija služi kao sistem za upravljanje inventarom za Techno-store, omogućavajući efikasno organizovanje i upravljanje podacima o proizvodima. Aplikacija se fokusira na tri osnovna entiteta: Product, Producer i Location, koji su međusobno povezani kako bi se osigurala potpuna funkcionalnost sistema.

# Karakteristike
* Osnovni Entiteti: Aplikacija upravlja entitetima Product, Producer i Location, omogućavajući lako dodavanje, ažuriranje i uklanjanje podataka. Ovi entiteti su međusobno povezani, što olakšava upravljanje informacijama o inventaru.

* Upravljanje Podacima: Koristi PostgreSQL kao bazu podataka, pristupajući joj putem Dockera. Implementirane su CRUD operacije (Create, Read, Update, Delete) za nesmetano rukovanje podacima, što omogućava brze i efikasne transakcije.

* Siguran REST API: Aplikacija implementira Keycloak za autentifikaciju i autorizaciju, koristeći JWT (JSON Web Tokens) za siguran pristup RESTful krajnjim tačkama. Samo ovlašteni korisnici mogu izvoditi akcije poput POST, PUT i DELETE, što osigurava sigurnost podataka.

* Integracija Podataka o Vremenu: Aplikacija preuzima i skladišti podatke o vremenu sa Open Data Servera njemačkog vremenskog servisa (DWD).

* Dokumentacija API-ja: Aplikacija je integrisana sa OpenAPI (Swagger), što omogućava jasnu dokumentaciju API-ja i jednostavno testiranje krajnjih tačaka.

* Razvojni Alati: Projekt je izrađen koristeći Visual Studio Code, uz Postman za testiranje API-ja. Struktura projekta je dobro organizovana, omogućavajući lako održavanje i proširivanje funkcionalnosti.
