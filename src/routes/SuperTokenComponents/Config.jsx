import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";

export const SuperTokensConfig = {
    appInfo: {
        appName: "Alphy",
        apiDomain: process.env.REACT_APP_API_URL || "http://localhost:3001",
        websiteDomain: "https://alphy.app" || "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        Passwordless.init({

            style: {
                container: {
                    fontFamily: "Open Sans, sans-serif",
                },
                button: {
                    backgroundColor: "#93BFCF",
                    border: "#93BFCF",
                    color: "#F9F8F8",
                },
                superTokensBranding: {
                    display: "none"
                },
            },
            contactMethod: "EMAIL",
        }),
        Session.init(),
    ],
};

/* console.log(`BACK ${process.env.REACT_APP_API_URL}, FRONT ${process.env.REACT_APP_API_URL}`) */