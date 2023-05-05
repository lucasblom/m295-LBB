# m295-LBB
Datum: 05.05.2023<br>
Autor: Lucas Blom<br>
Kurs: M295 (Backend-Entwicklung mit Node.js)<br>

## Beschreibung
Dieses Repository enthält die Lösung für die Modulabschlussprüfung 295 (Backend-Entwicklung mit Node.js). Es handelt sich um eine REST API, welche mit Node.js und Express.js entwickelt wurde. Die Daten werden in einer JSON Datei gespeichert.

## Installation
1. Repository klonen
2. In das Verzeichnis wechseln
3. `npm install` ausführen
4. `npm start` ausführen

## Endpoints
### GET/tasks
GET/tasks liefert eine Liste von allen Tasks im JSON Format zurück. Es nimmt keine Parameter entgegen.

### POST/tasks
POST/tasks erstellt einen neuen Task. Es nimmt einen JSON Body entgegen, welcher die Eigenschaften des Tasks enthält. Es gibt den erstellten Task im JSON Format zurück.

### GET/tasks/{id}
GET/tasks/{id} liefert einen Task im JSON Format zurück. Es nimmt die ID des Tasks als Parameter entgegen.

### PUT/tasks/{id}
PUT/tasks/{id} aktualisiert einen Task. Es nimmt die ID des Tasks als Parameter entgegen und einen JSON Body, welcher die Eigenschaften des Tasks enthält. Es gibt den aktualisierten Task im JSON Format zurück.

### DELETE/tasks/{id}
DELETE/tasks/{id} löscht einen Task. Es nimmt die ID des Tasks als Parameter entgegen. Es gibt den gelöschten Task im JSON Format zurück.

### POST/login
 POST/login nimmt einen JSON Body entgegen, welcher die Eigenschaften des Users enthält. Es gibt eine Login-Bestätigung im JSON Format zurück.

### GET/verify
 GET/verify überprüft, ob der User eingeloggt ist. Es gibt eine Bestätigung im JSON Format zurück.

### DELETE/logout
DELETE/logout loggt den User aus.

## Authentifizierung
Diese API verwented Authentifizierung mittles `Cookies`. Bei dem Login ist wichtig das Sie das passwort: `m295` verwenden. Die email ist egal, solange Sie gültig ist.