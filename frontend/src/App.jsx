import {Toaster} from "react-hot-toast";
import AppRoutes from "./routes";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Toaster position="bottom-center" />
      <AppRoutes />
      {/* <Footer /> */}
    </>
  );
}

export default App;