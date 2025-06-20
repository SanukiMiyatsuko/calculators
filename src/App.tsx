import { BrowserRouter, Route, Routes } from "react-router-dom"
import styles from "./App.module.css"
import CreateHeader from "./components/Header"
import Home from "./pages/home/Home"
import { routes } from "./routes"

function App() {
  return (
    <BrowserRouter basename="/calculators">
      <div className={styles.app}>
        <CreateHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<h1>Not Found Page</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App