# Electica Travel Itinerary API

A NestJS REST API for sorting travel tickets and generating human-readable itineraries. Extensible for multiple transit types.

## Setup Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/robatsilva/Electica.git
   cd Electica/api
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the API locally:**
   ```sh
   npm run start:dev
   ```
   The server will start on `http://localhost:3000`.

## API Documentation (Swagger)

- Access Swagger UI at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Use the interactive documentation to test endpoints and view request/response schemas.

## Example Payload

Here is a sample payload for creating an itinerary:

```json
[
  {
    "id": "1",
    "type": "train",
    "from": "Madrid",
    "to": "Barcelona",
    "details": {
      "seatNumber": "45B",
      "platform": "1"
    }
  },
  {
    "id": "2",
    "type": "flight",
    "from": "Barcelona",
    "to": "London",
    "details": {
      "gate": "22",
      "luggage": "Baggage drop at ticket counter 344"
    }
  },
  {
    "id": "3",
    "type": "bus",
    "from": "London",
    "to": "Manchester"
  }
]
```

You can POST this array to the `/tickets/itinerary` endpoint to store and receive a sorted itinerary.

## Running Tests

- Run all unit tests:
  ```sh
  npm test
  ```

## Improvements & Next Steps

- **Database Connection:**
  - Persist itineraries and tickets using a database (e.g., PostgreSQL, MongoDB).
- **Authentication:**
  - Secure endpoints with JWT or OAuth2 authentication.
- **Advanced Validation:**
  - Add DTO validation and error handling for edge cases.
- **Multiple Itineraries:**
  - Support for disconnected or branched itineraries.
- **Custom Transit Types:**
  - Easily add new ticket types and formatters for extensibility.

## Notes

- The algorithm works for any ticket type as long as the itinerary is uninterrupted.
- Formatters are extensible for new transit types.

---

**Note:** The assessment were created with the help of Copilot AI.
