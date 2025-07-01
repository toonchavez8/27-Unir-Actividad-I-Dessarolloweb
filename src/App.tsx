import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { siteRoutes } from "@/Routes/siteRoutes"; // Importing site routes

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {siteRoutes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
