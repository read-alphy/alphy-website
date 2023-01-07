import Navbar from "./components/Navbar"
import { useState } from "react";
import { useEffect } from "react";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SingUp";
import Account from "./routes/Account";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Coins from "./components/Coins";
import Article from "./components/Article";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { SuperTokensConfig } from "./routes/SuperTokenComponents/Config";
import Home2 from "./supertokens_home"

SuperTokens.init(SuperTokensConfig);

function App() {

  const [data, setData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"

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
          <Route path="/" element={<Home coins={data} />} />
          <Route path="/" element={<SessionAuth>
            <Home2 />
          </SessionAuth>} />
          <Route path="/article/:article_ID" element={<SessionAuth><Article data={data} /></SessionAuth>}>

          </Route>
        </Routes>
      </div>
    </SuperTokensWrapper>
  );

}

export default App;
