import { useState } from "react"
import Home from "./pages/Home"
import Equipment from "./pages/Equipment"
import "./styles/Global.css"

function App() {
  const [page, setPage] = useState("home")

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "equipment" && <Equipment setPage={setPage} />}
    </>
  )
}

export default App