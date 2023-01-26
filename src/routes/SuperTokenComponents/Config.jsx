import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";

export const SuperTokensConfig = {
    appInfo: {
        appName: "Alphy",
        apiDomain: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
        websiteDomain: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000",
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyPasswordless.init({
            signInUpFeature: {
            },
            style: {
                container: {
                    backgroundColor: "#242423",
                },
                headerTitle: { color: "#ced4da", },
                label: { color: "#ced4da", },
                input: {
                    backgroundColor: "#FFF",
                    color: "#242423",
                },
                button: {
                    backgroundColor: "#FFF",
                    color: "#242423",
                },
                superTokensBranding: {
                    display: "none"
                }
            },
            contactMethod: "EMAIL",
        }),
        Session.init(),
    ],
};

console.log(`BACK ${process.env.REACT_APP_BACKEND_URL}, FRONT ${process.env.REACT_APP_FRONTEND_URL}`)