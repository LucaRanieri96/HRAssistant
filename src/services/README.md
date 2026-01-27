# API Service

Questo file gestisce le chiamate API al backend per il ranking dei candidati.

## Flusso attuale (Demo)

1. **CVSelectionView** → L'utente seleziona i candidati e clicca su "CLASSIFICA CANDIDATI"
2. Naviga a **ProcessingScreen** passando:
   - `jobId`: ID dell'offerta lavorativa
   - `candidateIds`: Lista degli ID dei candidati selezionati (comma-separated)
3. **ProcessingScreen** → Durante il loading animato:
   - Chiama `rankCandidates()` passando jobId e candidateIds
   - Attende la risposta (simulata con 3 secondi di delay)
4. **ResultsView** → Riceve i candidati rankedati tramite `router.state` e li visualizza

## Integrazione Backend

### Request Format
```typescript
POST /api/rank-candidates
Content-Type: application/json

{
  "jobOfferId": "1",
  "candidateIds": ["1", "3", "5"]
}
```

### Response Format
```typescript
{
  "candidates": [
    {
      "id": "1",
      "nameKey": "results.mockData.marcoBianchi.name",
      "matchScore": 95,
      "experienceKey": "results.mockData.marcoBianchi.experience",
      "skills": ["React", "TypeScript", "Node.js", "AWS"],
      "educationKey": "results.mockData.marcoBianchi.education"
    },
    ...
  ]
}
```

### Come sostituire il mock con la vera API

Nel file `src/services/api.ts`, sostituisci il blocco commentato con la vera chiamata:

```typescript
export const rankCandidates = async (request: RankingRequest): Promise<RankingResponse> => {
  const response = await fetch('https://your-backend.com/api/rank-candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Aggiungi auth headers se necessari
      // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request),
  })
  
  if (!response.ok) {
    throw new Error('Failed to rank candidates')
  }
  
  return await response.json()
}
```

## Note importanti

- I `*Key` (nameKey, experienceKey, etc.) sono chiavi di localizzazione
- Il backend e frontend devono usare le stesse chiavi nei file `locales/`
- Il `matchScore` è calcolato dall'AI e deve essere un numero tra 0-100
- L'array `skills` contiene le competenze tecniche del candidato
- I candidati nella risposta devono essere già ordinati per `matchScore` (dal più alto al più basso)
