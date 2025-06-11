import { BrowserRouter, Route, Routes } from "react-router-dom"
import styles from "./App.module.css"
import CreateHeader from "./components/Header"
import Home from "./pages/home/Home"
import Subspecies from "./pages/subspecies/Subspecies"
import OldSubspecies from "./pages/oldSubspecies/oldSubspecies"
import Buchholz from "./pages/buchholz/Buchholz"
import ExtendedWorm from "./pages/extendedWorm/ExtendedWorm"
import GPS from "./pages/GPS/GPS"

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <CreateHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subspecies" element={<Subspecies />} />
          <Route path="/oldSubspecies" element={<OldSubspecies />} />
          <Route path="/buchholz" element={<Buchholz />} />
          <Route path="/extendedWorm" element={<ExtendedWorm />} />
          <Route path="/gps" element={<GPS />} />
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App