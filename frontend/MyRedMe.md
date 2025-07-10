# README: Logica di Scroll su Card di Dettaglio in ComparePage

## Obiettivo
Quando l’utente clicca su "Confronta" su una Card prodotto (ad esempio dalla lista sotto la searchbar), la pagina Compare deve scrollare automaticamente verso la card di dettaglio corrispondente, rendendo l’esperienza utente più fluida e immediata.

---

## 1. ComparePage.jsx
**Responsabilità:**
- Gestisce la lista dei prodotti da confrontare (`detailedProducts`).
- Crea un array di ref (`cardRefs`) per accedere direttamente alle card di dettaglio nel DOM.
- Espone una funzione `scrollToCard(productId)` che scrolla verso la card di dettaglio del prodotto desiderato.

**Codice chiave:**
```jsx
const cardRefs = useRef([]);
const scrollToCard = (productId) => {
  const idx = detailedProducts.findIndex(p => p.id === productId);
  if (idx !== -1 && cardRefs.current[idx]) {
    cardRefs.current[idx].scrollIntoView({ behavior: "smooth", block: "center" });
    cardRefs.current[idx].focus?.();
  }
};
```
Collega ogni ref alla rispettiva card:
```jsx
{detailedProducts.map((product, idx) => (
  <div
    className="compare-detail-card"
    key={product.id}
    ref={el => cardRefs.current[idx] = el}
    tabIndex={-1}
  >
    <DetailCard product={product} compare />
    {/* ...bottoni... */}
  </div>
))}
```
Passa `scrollToCard` come prop (`onCompareClick`) alle Card nella lista:
```jsx
<Card product={product} onCompareClick={() => scrollToCard(product.id)} />
```

---

## 2. Card.jsx
**Responsabilità:**
- Mostra le informazioni base del prodotto.
- Contiene il bottone "Confronta" (`BtnCompare`).
- Riceve la prop `onCompareClick` da ComparePage e la passa a BtnCompare.

**Codice chiave:**
```jsx
<BtnCompare product={product} onCompareClick={onCompareClick} />
```

---

## 3. BtnCompare.jsx
**Responsabilità:**
- Gestisce l’aggiunta/rimozione del prodotto dal confronto.
- Quando viene aggiunto, chiama la funzione `onCompareClick` se fornita (cioè solo in ComparePage).
- Usa `setTimeout` per attendere il render della nuova card prima di scrollare.

**Codice chiave:**
```jsx
const handleCompareClick = () => {
  if (alreadyInCompare) {
    removeFromCompare(product.id);
  } else {
    addToCompare(product);
    // Chiama la funzione di scroll solo dopo aver aggiunto
    if (onCompareClick) setTimeout(onCompareClick, 200);
  }
};
```

---

## 4. Schema del flusso
1. Utente clicca "Confronta" su una Card nella lista sotto la searchbar in ComparePage.
2. BtnCompare aggiunge il prodotto al confronto e chiama `onCompareClick`.
3. Card riceve la prop `onCompareClick` da ComparePage e la passa a BtnCompare.
4. ComparePage esegue `scrollToCard(product.id)`, che scrolla la pagina sulla card di dettaglio appena aggiunta.

---

## 5. Note aggiuntive
- Se usi la Card in altre pagine (es. Home), la prop `onCompareClick` non viene passata, quindi lo scroll non avviene.
- L’uso di `tabIndex={-1}` sulle card di dettaglio permette di portare il focus via JS, migliorando l’accessibilità.
- Il pattern di passare funzioni come prop è molto usato in React per collegare comportamenti tra componenti.

---

## 6. Esempio visivo (semplificato)
```
ComparePage
 ├─ Card (onCompareClick={scrollToCard})
 │    └─ BtnCompare (onCompareClick)
 └─ ... (detailedProducts e cardRefs)
```