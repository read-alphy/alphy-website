import Navbar from "./components/Navbar"
import { useState } from "react";
import { useEffect } from "react";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SingUp";
import Account from "./routes/Account";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Coins from "./components/Coins";
import Article from "./components/Article";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SuperTokensConfig } from "./routes/SuperTokenComponents/Config";
import Home2 from "./supertokens_home"
import Footer from "./components/Footer";


function App() {

  const [data, setData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"
  const location = useLocation();

  useEffect(() => {
    axios.get(url)
      .then((response) => {

        setData(response.data)

      })
  }, [url])





  return (

    <div className="App">
      <Navbar />
      <Routes>
        {/* {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))} */}
        <Route path="/" element={<Home coins={data} />} />
        {/*           <Route path="/" element={<SessionAuth>
            <Home2 />

          </SessionAuth>} /> */}
        <Route path="/article/:article_ID" element={

          /* <SessionAuth><Article data={data} /></SessionAuth> */

          <Article data={data} />
        }>

        </Route>

      </Routes>
      {location.pathname === "/" ? (<Footer />) : (null)}
    </div>

  );

}

export default App;
