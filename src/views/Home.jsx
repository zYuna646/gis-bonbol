import { Link } from "react-router-dom";
import routes from "../constants/routes";
import strings from "../constants/strings";

export default function Home() {
  return (
    <div>
      <nav className="fixed p-5 h-10">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-10 w-8" />
        </Link>
      </nav>
      <div className="flex h-svh flex-col items-center justify-center gap-8">
        <header className="text-center w-1/2">
          <h1 className="text-4xl font-bold">{strings.app_name}</h1>
          <h3 className="text-2xl font-bold ">Sistem Informasi Geografis</h3>
            <h3 className="text-2xl font-bold">
              Pertanian Kabupaten Bone Bolango
            </h3>
            <div className="border-b-2 border-lime-400 w-full"></div>
        </header>

        <nav className="flex gap-4">
          <Link
            to={routes.Spatial}
            className="rounded px-4 py-2 outline outline-2 outline-slate-100 transition-colors hover:bg-slate-100/10"
          >
            Data Spasial
          </Link>
          <Link
            to={routes.Tabular}
            className="rounded px-4 py-2 outline outline-2 outline-slate-100 transition-colors hover:bg-slate-100/10"
          >
            Data Tabular
          </Link>
        </nav>

        <main className="max-w-screen-md text-balance text-center">
          <p>
            SIG-PBB merupakan WebGIS yang menyajikan data-data geospasial
            Kabupaten Bone Bolango, Provinsi Gorontalo, Indonesia.
          </p>
        </main>
      </div>
    </div>
  );
}