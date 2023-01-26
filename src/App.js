import Navbar from "./components/Navbar"
import { useState } from "react";
import { useEffect } from "react";
// import Account from "./routes/Account.jsx.old";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import Article from "./components/Article";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SuperTokensConfig } from "./routes/SuperTokenComponents/Config";
import Home2 from "./supertokens_home"
import Footer from "./components/Footer";


function App() {

  SuperTokens.init(SuperTokensConfig)
  const [data, setData] = useState([])
  const url = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/summaries`
  console.log(url)
  const location = useLocation();
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setData(response.data)
      })
  }, [url])

  return (
    <SuperTokensWrapper>
      <div className="App">
        <Navbar />
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
          <Route path="/a" element={<SessionAuth>
            <Home2 />
          </SessionAuth>} />
          <Route path="/" element={<Home data={data} />} />
          <Route path="/article/:article_ID" element={
            <SessionAuth><Article data={data} /></SessionAuth>} />
        </Routes>
        {location.pathname === "/a" ? (<Footer />) : (null)}
      </div>
    </SuperTokensWrapper>
  );

}

export default App;

