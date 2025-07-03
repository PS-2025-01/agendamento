import {Toaster} from "react-hot-toast";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="app-container">
      <Toaster position="bottom-center" />
      <AppRoutes />
    </div>
  );
}

export default App;