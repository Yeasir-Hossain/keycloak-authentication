import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { Route, Routes } from "react-router";
import Text from "./pages/singleText/Text";
import Client from "./layouts/Client";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <Routes>
      <Route element={<Client />}>
        <Route path="/" index element={<Home />} />
        <Route path="/:id" index element={<Text />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
