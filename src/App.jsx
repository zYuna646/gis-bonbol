import { Route, Routes } from "react-router-dom";

import routes from "./constants/routes";
import views from "./views";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Gis-BonBol"; // Ganti judul sesuai keinginan Anda
  }, []);
  return (
    <div className="min-h-svh bg-gradient-to-t from-black/60 to-black/60 text-slate-100">
      <Routes>
        <Route path={routes.Home} element={<views.Home />} />
        <Route path={routes.Spatial} element={<views.Spatial />} />
        <Route path={routes.Tabular} element={<views.Tabular />} />
      </Routes>
    </div>
  );
}
