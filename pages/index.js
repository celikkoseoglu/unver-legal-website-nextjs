import NavigationBar from "../components/Navbar/NavigationBar";
import Landing from "../components/Section/Landing";
import AboutMe from "../components/Section/AboutUs";
import PublicationShowcase from "../components/Section/PublicationShowcase";
import Contact from "../components/Section/Contact";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import {
  DEFAULT_LANGUAGE,
  getInitialLanguage,
} from "../utils/LanguageSwitcher";
import NoSSR from "react-no-ssr";
import { getAllPosts } from "../lib/api";

const content = require("../data/content.json");

export default function Home({ allPosts }) {
  const [language, setLanguage] = useState(getInitialLanguage());

  const noSSRContent = (
    <>
      <NavigationBar
        language={DEFAULT_LANGUAGE}
        languageSwitchFunction={setLanguage}
      />
      <Landing id={content.landingReference} language={DEFAULT_LANGUAGE} />
      <AboutMe id={content.aboutUsReference} language={DEFAULT_LANGUAGE} />
      <PublicationShowcase
        id={content.publicationShowcaseReference}
        allPosts={allPosts}
        language={DEFAULT_LANGUAGE}
      />
      <Contact id={content.contactReference} language={DEFAULT_LANGUAGE} />
      <Footer language={DEFAULT_LANGUAGE} />
    </>
  );

  const clientContent = (
    <>
      <NavigationBar language={language} languageSwitchFunction={setLanguage} />
      <Landing id={content.landingReference} language={language} />
      <AboutMe id={content.aboutUsReference} language={language} />
      <PublicationShowcase
        id={content.publicationShowcaseReference}
        allPosts={allPosts}
        language={language}
      />
      <Contact id={content.contactReference} language={language} />
      <Footer language={language} />
    </>
  );

  return <NoSSR onSSR={noSSRContent}>{clientContent}</NoSSR>;
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
