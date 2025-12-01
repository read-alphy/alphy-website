import React, { useState, useEffect } from "react";
import SideFeed from "../SideFeed/SideFeed";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../Loading";
import Head from "next/head";
import Content from "./Content";
import { API_URL } from "../../constants";

export default function SourcePage({
  collapsed,
  setCollapsed,
  tier,
  userArchipelagos,
  currentUser,
  sandboxHistory,
  setSandboxHistory,
  getSandboxHistory,
  loggedIn,
  setLoggedIn,
  data,
  setData,
  source_type,
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionsHub, setActionsHub] = useState(false);
  const [bookmarkChecked, setBookmarkChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState("en");
  const [called, setCalled] = useState(false);
  const [authorizationError, setAuthorizationError] = useState(false);

  useEffect(() => {
    if (
      data.summaries !== undefined &&
      data.summaries.length > 1 &&
      data.lang !== undefined &&
      data.summaries[1] !== undefined &&
      data.summaries[1].complete === true
    ) {
      setLanguage(data.lang);
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const source_id = router.query.source_id;
  const url = `${API_URL}/sources/up/${source_id}`;
  useEffect(() => {
    if (
      source_type !== "yt" &&
      source_type !== "x" &&
      source_type !== "up" &&
      source_type !== "tw" &&
      source_type !== "sp" &&
      source_type !== "ap"
    ) {
      router.push("/404");
    }
  }, [source_type]);

  const checkBookmark = async () => {
    try {
      await axios
        .get(`${API_URL}/sources/up/${source_id}/bookmark`, {
          headers: {
            "id-token": currentUser.accessToken,
          },
        })
        .then((response) => {
          if (response.data) {
            setBookmarkChecked(true);
            setIsBookmarked(response.data.is_bookmark);
          }
        });
    } catch (error) {
      console.error("Error checking bookmarks", error);
      setBookmarkChecked(true);
    }
  };

  useEffect(() => {
    if (source_type === "up" && data ===null ) {
      setAuthorizationError(true);
    }

    if (currentUser && called === false && source_type == "up") {
      setCalled(true);

      fetchDataUpload(url, false);
    }

    if (
      currentUser !== null &&
      bookmarkChecked === false &&
      source_type !== "up"
    ) {
      setTimeout(() => {
        checkBookmark();
      }, 1000);
    }
  }, [data, currentUser, source_id]);

  const fetchDataUpload = async (url, constantFetch) => {
    console.log("fetching data upload");

    try {
      if (constantFetch === false) {
        setIsLoading(true);
      }

      await axios
        .get(url, {
          headers: {
            "id-token": currentUser.accessToken,
          },
        })
        .then((response) => {
          if (response.data !== null && response.data !== undefined) {
            setData(response.data);
            
            setIsVisible(response.data.is_visible);
            setIsPublic(response.data.is_public);
          }
          setIsLoading(false);
          setAuthorizationError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } catch (error) {
      if (error.response?.status === 404) {
        setIsLoading(false);
      }
      console.error(`Error fetching data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data for non-upload sources (public sources)
  const fetchData = async (fetchUrl, constantFetch) => {
    console.log("fetching data for public source");

    try {
      if (constantFetch === false) {
        setIsLoading(true);
      }

      const publicUrl = `${API_URL}/sources/${source_type}/${source_id}`;
      
      await axios
        .get(publicUrl)
        .then((response) => {
          if (response.data !== null && response.data !== undefined) {
            setData(response.data);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } catch (error) {
      if (error.response?.status === 404) {
        setIsLoading(false);
      }
      console.error(`Error fetching data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (event) => {
    const selectedCode = event.target.value;
    setLanguage(selectedCode);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        let summaryComplete = false;

        if (data !== null && data.summaries !== undefined) {
          if (data.summaries.length > 0) {
            summaryComplete =
              data.summaries.find((item) => item.lang === language).complete !==
              undefined
                ? data.summaries.find((item) => item.lang === language).complete
                : false;
          }
        }

        if (
          data !== null &&
          summaryComplete === false &&
          called === true &&
          currentUser
        ) {
          if (source_type === "up" && summaryComplete === false) {
            fetchDataUpload(url, true);
          } else if (source_type !== "up" && summaryComplete === false) {
            fetchData(url, true);
          }
        } else {
          return;
        }
      },

      5000
    );

    return () => clearInterval(interval);
  }, [data, language]);

  const handleVisibility = () => {
    const targetVisibility = !isVisible;
    localStorage.setItem("isVisibleUpload", isVisible);

    try {
      axios
        .patch(
          `${API_URL}/sources/${source_type}/${source_id}/visibility?visibility=${targetVisibility}`,
          null,
          {
            headers: {
              accept: "application/json",
              "id-token": currentUser.accessToken,
            },
          }
        )
        .then((response) => {
          localStorage.setItem("isVisibleUpload", targetVisibility);
          setIsVisible(targetVisibility);
          setIsPublic(targetVisibility);
        });
    } catch (error) {
      console.log("arcChat error", error);
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
      }
    }
  };

  return (
    <div className="article bg-white dark:bg-darkMode dark:text-zinc-300">
      <Head>
        <title>
          {data.title !== undefined
            ? data.title
            : "Alphy - Turn audio to text, summarize, and generate content with AI"}
        </title>
      </Head>
      

      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          tier={tier}
          sandboxHistory={sandboxHistory}
          source_id={source_id}
          actionsHub={actionsHub}
          setActionsHub={setActionsHub}
          isSandbox={isSandbox}
        />

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {isLoading || data.length ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : authorizationError ? (
            <div className="flex-col flex mx-10 md:mx-20 mx-auto mt-20 md:mt-40 px-4">
              <div className="text-xl max-w-[600px] text-zinc-700 dark:text-zinc-300 quicksand font-bold ">
                The page you're trying to reach either doesn't exist or you
                don't have permission to access it.
              </div>
              <Link
                href="/"
                className="underline mt-6 text-zinc-700 dark:text-zinc-300 max-w-[150px] quicksand font-bold"
              >
                Back To Home Page
              </Link>
            </div>
          ) : (
            isClient && (
              <Content
                data={data}
                tier={tier}
                isVisible={isVisible}
                isPublic={isPublic}
                handleVisibility={handleVisibility}
                isBookmarked={isBookmarked}
                setIsBookmarked={setIsBookmarked}
                userArchipelagos={userArchipelagos}
                actionsHub={actionsHub}
                language={language}
                setLanguage={setLanguage}
                handleLanguageChange={handleLanguageChange}
                isSandbox={isSandbox}
                setIsSandbox={setIsSandbox}
                getSandboxHistory={getSandboxHistory}
                source_id={source_id}
                source_type={source_type}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
