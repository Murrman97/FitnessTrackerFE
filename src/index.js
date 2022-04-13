import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import ContentProvider from "./components/ContentProvider";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Router>
    <AuthProvider>
      <ContentProvider>
      <App />
      </ContentProvider>
    </AuthProvider>
  </Router>
);
