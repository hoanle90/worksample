# 🛒 E-commerce Web App

---

## 🧑‍💻 Technical Stack

| Layer       | Tech Used           |
|-------------|---------------------|
| Frontend    | Next.js (React 18)  |
| State Mgmt  | Redux Toolkit       |
| Backend API | Node.js + Express   |
| Database    | JSON (or mock data) |
| Styling     | Tailwind CSS        |
| Testing     | Jest                |

---

## 🚀 Features

- Server-Side Rendering for SEO optimization.
- Client-Side Interactivity for dynamic cart behavior.
- Responsive design.
- Unit tests with Jest and React Testing Library.
- Live toast notifications for cart actions.

---


## ⚙️ Installation & Usage

### Frontend

```bash
cd frontend
npm install
npm run dev        # Starts dev server with Turbopack
npm run test       # Run unit tests
npm run test:coverage  # Test with coverage report
```

### Frontend
```bash
cd backend
npm install
npm start          # Starts Express server with Nodemon
```
### Data flow
1)Initial Page Load (SSR)

getServerSideProps in pages/index.tsx calls an API to fetch the product list.

The server returns HTML with product data pre-rendered for SEO.

The browser receives and displays the rendered product list.

2) Client-Side Interactions (CSR)

When the user:

Clicks “Add to Cart”

Increments/Decrements quantity

Removes an item
→ These interactions dispatch Redux actions (e.g., addToCart, updateQuantity, removeFromCart).

3) State & UI Update

Redux store updates cart state.

UI (e.g., cart summary, button states) re-renders automatically based on the new Redux state.

4)No API calls for cart

All cart interactions are local, stored in the Redux store.

No communication with a backend or database during cart updates.

### Diagram
                                    +--------------------+
                                    |    Client (Browser) |
                                    |  (React + Redux)    |
                                    +--------------------+
                                               |
                                               | Initial Product Fetch (SSR/SSG)
                                               v
                                     +---------------------------+
                                     | getServerSideProps (API)  |
                                     | Fetch Product List        |
                                     +---------------------------+
                                               |
                                               | API Response (Product List)
                                               v
                                     +----------------------------+
                                     | Render Product List in UI  |
                                     +----------------------------+
                                               |
                                               | User Interaction (Add, Update, Remove)
                                               v
                                    +-------------------------------+
                                    | Redux Dispatch (cartSlice)     |
                                    | Update Cart State Locally      |
                                    +-------------------------------+
                                               |
                                               | UI Re-render Based on Updated State
                                               v
                                    +----------------------------+
                                    | Updated Cart UI (quantities |
                                    | and total price updated)    |
                                    +----------------------------+
                                               |
                                               | No further API calls for cart updates
                                               v
                                    +-------------------------+
                                    | Local State Management  |
                                    | (Redux store)           |
                                    +-------------------------+
                                          
1) Client (React + Redux):

When the page is loaded, getServerSideProps is called to fetch the initial product data via an API call to the backend.

The product list is rendered on the page for the user to view.

User interactions (adding, updating, or removing products from the cart) trigger Redux actions to update the local state (in cartSlice).

The UI updates accordingly (re-renders) based on the updated cart state (local Redux store).

2) Backend (API):

The backend API is responsible for fetching the product list, which is then sent as a response to the client.

After the initial product data is fetched, no further API calls are required for cart actions (as those are handled by Redux).

3) Redux Store:

The cart data is handled entirely through Redux state.

Cart actions like adding or removing items update the local Redux state.

The UI listens for state changes and re-renders when the cart state changes (e.g., product quantity or total price).

4)Database:

The database stores the product data, which is fetched by the backend API to send to the client for rendering.


