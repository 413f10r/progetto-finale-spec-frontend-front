# 📊 Progetto Pratico - Comparatore di Records

## 🖼️ Cosa devi realizzare

Una SPA che simula l’esperienza di un utente non autenticato, che può:
- Sfogliare, cercare e filtrare record
- Confrontare più elementi tra loro
- Salvare i preferiti  
❌ Non può creare, modificare o cancellare record.

---

## 🔍 Tecnologie da utilizzare

- React in JavaScript (solo tecnologie viste durante il corso)
- Librerie esterne solo per lo styling (es. Tailwind CSS, Bootstrap, styled-components)
- **Backend già pronto**: sviluppa solo il frontend

---

## 🎨 Tematica a scelta

Scegli liberamente l’argomento del comparatore.  
Qualsiasi entità con proprietà confrontabili è valida!  
Esempi: smartphone, tablet, laptop, videogiochi, auto, corsi, alimenti, ecc.

---

## 🛠️ Backend

- Clona il repo: [boolean-it/progetto-finale-spec-frontend-back](https://github.com/boolean-it/progetto-finale-spec-frontend-back)
- Definisci le risorse in `types.ts` (almeno `title` e `category`)
- Popola ogni risorsa con almeno 10 record validi

---

## 🔧 API disponibili

- `GET /{tipo}s` → lista record (con query string per ricerca e filtro)
- `GET /{tipo}s/:id` → dettaglio record
- `POST /{tipo}s` → crea record (non usato lato utente)
- `PUT /{tipo}s/:id` → aggiorna record (non usato lato utente)
- `DELETE /{tipo}s/:id` → elimina record (non usato lato utente)

---

## 🥉 Requisiti Minimi

- Gestione di una risorsa definita in `types.ts`
- Lista dei record con:
  - Solo proprietà principali `title` e `category`
  - Barra di ricerca per cercare nei titoli (`title`)
  - Filtro per categoria (`category`)
  - Ordinamento alfabetico per `title` o `category` (A-Z e Z-A)
- Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà
- Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche
- Sistema di preferiti, sempre accessibile e aggiornabile:
  - L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
  - I preferiti devono essere consultabili in ogni sezione dell’app

---

## 🥈 Requisiti Consigliati (Facoltativi)

- Comparatore di 2 o più record (layout adattivo)
- Debounce sulla ricerca
- Persistenza dei preferiti (es. localStorage)
- Gestione degli stati vuoti (nessun risultato, lista preferiti vuota, nessun elemento selezionato nel comparatore)

---

## 🥇 Requisiti Aggiuntivi (Facoltativi)

- Gestione di più risorse nella stessa SPA
- CRUD completo dal frontend (creazione, modifica, eliminazione, validazione)

---

## 🎯 BONUS (Facoltativo)

- Seconda versione del progetto in TypeScript (la versione principale deve rimanere in JavaScript)

---

## ⏱️ Tempistiche

Il progetto finale è pensato per essere svolto in **7 giorni di lavoro**.  
❗ Non è consigliato lavorarci per più o meno tempo.

---

## 📦 Consegna del progetto

Al momento del push finale, **includi anche**:
- La cartella `/database` del backend, con i file `.json` generati per la tua risorsa
- Il file `types.ts` con la definizione della risorsa (o delle risorse) utilizzate

### Perché è importante?

Questi due elementi servono a:
- Far capire all’insegnante la struttura dei dati su cui hai lavorato
- Consentire di fare dei test funzionali sull’app, con dati reali già pronti

📌 **Assicurati che i file .json contengano almeno 10 record coerenti con la tipologia scelta.**  
❗ Progetti senza database e `types.ts` potrebbero risultare incompleti e difficili da valutare correttamente.

---

##






