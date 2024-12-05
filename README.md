# Övning - Intro till API

I denna övning får ni en färdig applikation som hämtar data från ett API som heter [JSON Placeholder](https://jsonplaceholder.typicode.com/). Datan som hämtas är users och den hämtar en lista med users och detaljerad information om en user. För att visa upp dessa så gör den lite gammal hederlig DOM-manipulation.

Uppgiften går ut på att ni ska bygga vidare på den existerande kodbasen.

1. När man har klickat på ett user-kort så kommer man till en detaljsida som visare lite mer information om den valda user. Där finns även knapp som det står "Back to user list" på. Skapa logik för att komma tillbaka till listan med users när man trycker på den knappen.

2. Lägg till HTML i `createUserPage()`-metoden för att kunna visa poster _( posts )_ på detaljsidan som tillhör avändaren i fråga. För att detta ska funka så behöves det även en ytterligare hämtning från API:et samt lite DOM-manipulation för att dölja och visa posterna.

3. Spara alla hämtningar från API:et i LocalStorage. Det betyder att om du har hämtat alla användare från API:et en gång så ska du aldrig behöva hämta de igen, utan då ska "hämtning" ske från LocalStorage istället. Sen om du trycker på en specifik användare så kan du ju antingen utnyttja alla användare som redan finns sparat i LocalStorage eller hämta en specifik användare från API:et och sen spara den till LocalStorage. Trycker du på samma användare sen igen så ska det hämtas från LocalStorage istället. Posterna funkar likadant, hämta från API:et första gången och spara i LocalStorage. Här får man tänkta till lite och skapa logik som gör de här checkarna automatiskt.
