import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router";
import Text from "./pages/singleText/Text";
import Client from "./layouts/Client";

function App() {
  return (
    <Routes>
      <Route element={<Client />}>
        <Route path="/" index element={<Home />} />
        <Route path="/:id" index element={<Text />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
