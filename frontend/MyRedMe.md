 README ULTRA APPROFONDITO - FRONTEND REACT + TYPESCRIPT

## Descrizione generale

Questa applicazione frontend, sviluppata in React + TypeScript, permette la consultazione, ricerca, confronto e gestione di prodotti tecnologici. L'architettura è pensata per essere modulare, performante e facilmente estendibile. Di seguito trovi una spiegazione dettagliata delle funzionalità, della logica e delle tecnologie usate, con riferimenti diretti al codice e agli hook avanzati di React.

---

## Funzionalità principali

- **Visualizzazione prodotti**: elenco di prodotti con dettagli, immagini e categorie.
- **Ricerca e filtro**: barra di ricerca con debounce, filtro per categoria e ordinamento alfabetico.
- **Preferiti**: aggiunta/rimozione prodotti dai preferiti, con persistenza locale.
- **Comparatore**: selezione e confronto di più prodotti su una pagina dedicata.
- **Dettaglio prodotto**: pagina con tutte le informazioni del prodotto selezionato.

---

## Architettura e logica

### Stato globale e Context

La gestione dello stato globale (prodotti, preferiti, confronto, filtri) è centralizzata tramite un Context React (`GlobalContext`). Tutti i componenti accedono ai dati e alle funzioni tramite questo context, garantendo coerenza e semplicità di manutenzione.

**Esempio di creazione e uso del context:**
```js
import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    // Destrutturazione diretta del custom hook
    const {
        search,
        setSearch,
        category,
        setCategory,
        sortBy,
        setSortBy,
        filteredProducts
    } = useFilter(product);

    return (
        <GlobalContext.Provider value={{
            // Proprietà del context
            product,
            setProduct,
            addToFavorites,
            removeFromFavorites,
            favoritesProduct,
            // Proprietà del filtro
            search,
            setSearch,
            category,
            setCategory,
            sortBy,
            setSortBy,
            filteredProducts
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
```

---

### try/catch

**Definizione:** `try/catch` serve per gestire errori in modo sicuro durante operazioni asincrone o potenzialmente fallibili.

**Nel codice:** Viene usato per gestire errori nelle chiamate fetch, sia per la lista prodotti che per il dettaglio:

```js
useEffect(() => {
    const getProducts = async () => {
        try {
            const response = await fetch(`${url}/products`);
            const data = await response.json();
            setProduct(data);
        } catch (err) {
            console.error("Errore fetch prodotti:", err);
        }
    };
    getProducts();
}, [url]);
```
- Se la fetch fallisce, l'errore viene catturato e loggato, evitando crash dell'app.

---

### Promise.all

**Definizione:** `Promise.all` permette di eseguire più operazioni asincrone in parallelo e attendere che tutte siano completate.

**Nel codice:** Usato per caricare i dettagli di tutti i prodotti selezionati per il confronto:

```js
useEffect(() => {
    Promise.all(
        compareProduct.map(prod =>
            fetch(`http://localhost:3001/products/${prod.id}`)
                .then(res => res.json())
                .then(data => data.product)
        )
    ).then(setDetailedProducts);
}, [compareProduct]);
```
- Tutte le fetch partono insieme e solo quando sono tutte completate aggiorniamo lo stato con i dettagli.

---

### useParams

**Definizione:** `useParams` è un hook di React Router che estrae i parametri dinamici dalla URL corrente.

**Nel codice:** Usato nella pagina di dettaglio per ottenere l'ID del prodotto dalla URL:

```js
const { id } = useParams(); // estrae l'id del prodotto dalla URL
const { selectedProduct, fetchProductById } = useGlobalContext(); // ottiene il prodotto selezionato e la funzione per caricarlo dal context
const navigate = useNavigate(); // hook per la navigazione programmatica

useEffect(() => {
    fetchProductById(id); // carica i dettagli del prodotto quando l'id cambia
}, [id, fetchProductById]); // dipendenze: ricarica se cambia l'id o la funzione fetch
```
- Permette di avere URL dinamiche come `/detail/123` dove `123` è l'ID del prodotto.
- Ogni volta che l'ID cambia nella URL, viene automaticamente caricato il prodotto corrispondente.

---

### useCallback

**Definizione:** `useCallback` memorizza una funzione tra i render, restituendo sempre la stessa referenza finché le dipendenze non cambiano. Utile per evitare che componenti figli ricevano una nuova funzione ad ogni render (causando rerender inutili).

**Nel codice:** Usato per funzioni come il debounce della ricerca e per funzioni passate come prop:

```js
const debouncedSetSearch = useCallback(
    debounce((value) => {
        setDebouncedSearch(value);
    }, 500),
    []
);
```
- Così la funzione debounced non viene ricreata ad ogni render.

---

### useMemo vs React.memo()

**useMemo:**
- Hook che memorizza il **risultato di una funzione** tra i render
- Evita ricalcoli inutili di valori derivati
- Si usa per ottimizzare calcoli costosi o filtri su grandi quantità di dati

**React.memo():**
- Higher-Order Component che memorizza un **intero componente**
- Evita re-render inutili del componente se le sue prop non cambiano
- Si usa per ottimizzare componenti che ricevono le stesse prop

**Nel codice:**

```js
// useMemo per calcolare i prodotti filtrati
const filteredProducts = useMemo(() => {
    let filtered = category
        ? products.filter(p => p.category === category)
        : products;

    if (debouncedSearch) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }

    return filtered;
}, [products, debouncedSearch, category, sortBy]);

// React.memo per ottimizzare le card prodotto
const Card = React.memo(function Card({ product }) {
    // Il componente si re-renderizza solo se product cambia
    return (
        <div className="card">
            <p>{product.title}</p>
            {/* ... */}
        </div>
    );
});
```

**Differenza chiave:**
- `useMemo` ottimizza i **calcoli** all'interno di un componente
- `React.memo()` ottimizza i **render** dell'intero componente

---

### useRef

**Definizione:** `useRef` crea un oggetto ref che mantiene il suo valore tra i render senza causare rerender. È usato per accedere direttamente a elementi del DOM o per memorizzare valori mutabili.

**Nel codice:** Usato per selezionare il testo nella searchbar o per scrollare su un titolo:

```js
const inputRef = useRef(null);

const handleFocus = () => {
    inputRef.current && inputRef.current.select();
};
```
- Permette di selezionare il testo nell'input quando riceve il focus.

Altro esempio per scroll su titolo:
```js
const titleRef = useRef(null);
const scrollToTitle = () => {
    titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
};
```

---

### debounce (implementazione custom)

**Definizione:** Il debounce è una tecnica per ritardare l'esecuzione di una funzione fino a quando non è passato un certo tempo dall'ultima chiamata. Serve per evitare chiamate ripetute (es: filtrare mentre l'utente digita nella searchbar).

**Nel codice:** Gestito nel custom hook `useFilter` con implementazione custom:

```js
// Funzione debounce custom
function debounce(callback, delay) {
    let timer; // timer usato per ritardare l'esecuzione
    return (value) => {
        clearTimeout(timer); // cancella il timer precedente se l'utente continua a digitare
        timer = setTimeout(() => {
            callback(value); // esegue la funzione solo dopo che è passato il delay senza nuove chiamate
        }, delay);
    }
}

const debouncedSetSearch = useCallback(debounce(setDebouncedSearch, 500), []);

// Nella funzione setSearch del return
return {
    search, // valore corrente della ricerca (aggiornato immediatamente)
    setSearch: (value) => {
        setSearch(value); // aggiorna subito lo stato per mantenere l'input reattivo
        debouncedSetSearch(value); // attiva il debounce per aggiornare debouncedSearch dopo 500ms
    },
    // ...
};
```

**Meccanismo:**
- L'utente digita → `setSearch(value)` aggiorna immediatamente lo stato per mantenere l'input reattivo
- Contemporaneamente `debouncedSetSearch(value)` avvia il timer di 500ms
- Se l'utente continua a digitare, il timer viene resettato con `clearTimeout(timer)`
- Solo quando l'utente smette di digitare per 500ms, viene eseguita `setDebouncedSearch(value)`
- Il cambio di `debouncedSearch` triggera il ricalcolo dei prodotti filtrati

---

### localStorage per Preferiti

**Definizione:** `localStorage` è un'API del browser che permette di salvare dati persistenti localmente, che rimangono anche dopo la chiusura del browser.

**Nel codice:** Usato per salvare e recuperare i prodotti preferiti:

```js
// Inizializzazione dei preferiti dal localStorage
const [favoritesProduct, setFavoritesProduct] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
});

// Sincronizzazione con localStorage ad ogni modifica
useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesProduct));
}, [favoritesProduct]);

// Funzioni per gestire i preferiti
const addToFavorites = (product) => {
    if (!favoritesProduct.some(f => f.id === product.id)) {
        setFavoritesProduct(prev => [...prev, product]);
    }
};

const removeFromFavorites = (product) => {
    setFavoritesProduct(prev => prev.filter(f => f.id !== product.id));
};
```

**Meccanismo:**
- **Inizializzazione**: Al caricamento dell'app, `useState` con lazy initialization recupera i preferiti salvati
- **Persistenza**: `useEffect` salva automaticamente i preferiti nel localStorage ogni volta che cambiano
- **Formato**: I dati vengono serializzati in JSON per il salvataggio e deserializzati al recupero
- **Fallback**: Se non ci sono preferiti salvati, parte con un array vuoto

---

## Esempio di flusso dati e logica

1. L'utente digita nella searchbar.
2. `setSearch` aggiorna **immediatamente** lo stato della ricerca (input reattivo).
3. Contemporaneamente, `debouncedSetSearch` avvia un timer di 500ms.
4. Se l'utente continua a digitare, il timer viene resettato.
5. Solo quando l'utente smette di digitare per 500ms, `debouncedSearch` viene aggiornato.
6. Quando `debouncedSearch` cambia, `useMemo` ricalcola i prodotti filtrati.
7. I componenti che mostrano i prodotti ricevono solo quelli filtrati, ottimizzando i render.

---

## Glossario rapido hook

- **useCallback:** memorizza funzioni tra i render.
- **useMemo:** memorizza valori/calcoli tra i render.
- **useRef:** mantiene valori tra i render senza causare rerender, utile per DOM.
- **useParams:** estrae parametri dinamici dalla URL.
- **debounce:** ritarda l'esecuzione di una funzione, ottimo per input e filtri.
- **React.memo():** memorizza componenti per evitare re-render inutili.
- **localStorage:** salva dati persistenti nel browser.

---

## Conclusioni

Il progetto sfrutta le best practice di React per garantire performance, modularità e facilità di manutenzione. Ogni hook e tecnica avanzata è usata per uno scopo preciso, sempre spiegato e motivato nel codice.

La combinazione di debounce custom, ottimizzazioni con useMemo/useCallback/React.memo, gestione degli errori con try/catch, e persistenza con localStorage crea un'applicazione robusta e performante.