# University Data App

The **University Data App** is a web application that allows users to search for universities, view details, and manage their favorite universities. The app is built using modern web technologies and provides a responsive and user-friendly interface.

---

## Features

- **Search Universities**: Search for universities by name and country.
- **View Details**: View university details such as name, state/province, and website.
- **Manage Favorites**: Add or remove universities from your favorites list.
- **Pagination**: Navigate through large datasets with pagination.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **API**: Fetch API for data retrieval
- **State Management**: React hooks (`useState`, `useEffect`, `useCallback`)
- **Styling**: Tailwind CSS for responsive and modern UI
- **Utilities**: Debouncing for search optimization

---

## Getting Started

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (Node package manager)
- **MongoDB** (running locally or accessible remotely)

---

### Installation

Install the dependencies:

```bash
npm install
```

---

### Setting Up the Database

1. Ensure MongoDB is running locally or accessible remotely. If MongoDB is not running, start it:

   ```bash
   mongod
   ```

2. Import the university data into the database:
   - Update the MongoDB connection URI in `src/utils/importJSON.ts` if necessary.
   - Run the import script:
     ```bash
     npx ts-node src/utils/importJSON.ts
     ```
   - This will load the data into the `universityDB` database in the `universities` collection.

---

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

---

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

Then, you can start the production server with:

```bash
npm start
```

---

### Docker Instructions

To run the application using Docker, follow these steps:

1. Build the Docker image:

   ```bash
   docker build -t university-data-app .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 university-data-app
   ```

3. Access the application at:

   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
src/
├── components/          # Reusable UI components (e.g., UniversityTable, Pagination)
├── container/           # Main pages (e.g., MainPage, FavoritesPage)
├── pages/               # Next.js pages (_app.tsx, index.tsx)
├── styles/              # Global CSS styles
├── utils/               # Utility functions and types
└── public/              # Static assets
```

---

## How to Use

1. **Search for Universities**:

   - Use the search bar to find universities by name.
   - Filter results by selecting a country from the dropdown.

2. **View University Details**:

   - View details such as the university's name, state/province, and website.

3. **Manage Favorites**:

   - Click the star icon to add or remove universities from your favorites list.
   - Navigate to the "Favorites" page to view your saved universities.

4. **Pagination**:
   - Use the pagination controls to navigate through the list of universities.

---

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

---

## License

This project is licensed under the MIT License.
