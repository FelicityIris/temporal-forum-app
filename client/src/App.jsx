import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import PostDetailPage from "./pages/PostDetailPage";

const App = () => {
  return (
    <div data-theme="coffee" /*className="relative h-full w-full"*/>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#FF9DDE40_100%)]" />
        <Routes>
            <Route path="/" element = {<HomePage />} />
            <Route path="/create" element = {<CreatePage />} />
            <Route path="/post/:id" element = {<PostDetailPage />} />
        </Routes>
    </div>
  )
}

export default App