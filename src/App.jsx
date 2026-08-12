import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Writing from "./pages/Writing";
import HelloWorld from "./pages/writing/HelloWorld";
import Gears from "./pages/Gears";
import FirstPost from "./pages/writing/FirstPost";
import OnBuilding from "./pages/writing/OnBuilding";
import MarkdownBenchmark from "./pages/writing/MarkdownBenchmark";
import Watching from "./pages/Watching";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gears" element={<Gears />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/first-post" element={<FirstPost />} />
        <Route path="/writing/on-building" element={<OnBuilding />} />
        <Route path="/writing/markdown-benchmark" element={<MarkdownBenchmark />} />
        <Route path="/writing/hello-world" element={<HelloWorld />} />
      </Route>
    </Routes>
  );
}
