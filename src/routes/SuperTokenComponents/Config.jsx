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
                providers: [
                    // ThirdPartyPasswordless.Github.init(),
                    ThirdPartyPasswordless.Google.init(),
                    ThirdPartyPasswordless.Apple.init(),
                ],
            },
            contactMethod: "EMAIL",
        }),
        Session.init(),
    ],
};

console.log(`BACK ${process.env.REACT_APP_BACKEND_URL}, FRONT ${process.env.REACT_APP_FRONTEND_URL}`)