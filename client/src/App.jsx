import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import toast from "react-hot-toast"

const App = () => {
  return (
    <div data-theme="coffee">
        <button onClick={() => toast.success("Congrats!")} className="text-green-500">Sucess</button>
        <button onClick={() => toast.error("Whoops!")} className="text-red-500 p-4 bg-pink-300">Error</button>
        <button className="btn btn-primary">Click Me!</button>
        <Routes>
            <Route path="/" element = {<HomePage />} />
            <Route path="/create" element = {<CreatePage />} />
            <Route path="/post/:id" element = {<PostDetailPage />} />
        </Routes>
    </div>
  )
}

export default App