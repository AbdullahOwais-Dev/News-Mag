import Navbar from "./Components/Navbar"
import NewsBoard from "./Components/NewsBoard"
import { useState, useEffect } from "react";

const App = () => {

  const [category, setCategory] = useState("general")

  return (
    <div>
      <Navbar setCategory={setCategory}/>
      <NewsBoard category={category}/>
    </div>
  )
}

export default App
