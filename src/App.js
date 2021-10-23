import React, { Suspense } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/Header/Navbar/navBar";
import Loading from "./components/Loading/loading";

const HomePage = React.lazy(() => import("./containers/HomePage/HomePage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <NavBar />
      <HomePage />
    </Suspense>
  );
}

export default App;
