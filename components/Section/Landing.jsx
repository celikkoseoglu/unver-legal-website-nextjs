import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  heroContainer,
  heroBackground,
} from "../../stylesheets/components/Section/Landing.module.sass";
import Container from "../Util/Container";
import Hero from "../Hero";
import { debounce } from "../../utils/Limitors";
import { isIPad13 } from "react-device-detect";
import { getLanguageFile } from "../../utils/LanguageSwitcher";

const landingImageUrl = "/images/hero/hero.jpg";

let windowInnerWidth = 0;

const Landing = ({ id, language }) => {
  const hero = getLanguageFile("hero", language);

  const handleResize = () => {
    const currentWindowInnerWidth = window.innerWidth;
    if (currentWindowInnerWidth !== windowInnerWidth) {
      windowInnerWidth = currentWindowInnerWidth;
      const windowInnerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        "--windowInnerHeight",
        `${windowInnerHeight}px`
      );
    }
  };

  if (isIPad13) {
    handleResize();
  }

  useEffect(() => {
    if (isIPad13) {
      window.addEventListener("resize", debounce(handleResize));
    }

    return () => {
      if (isIPad13) {
        window.removeEventListener("resize", debounce(handleResize));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <header
      id={id}
      style={{
        backgroundImage: `linear-gradient(to bottom, black, transparent 20%, transparent 80%, black 100%), url(${landingImageUrl})`,
      }}
      className={`${heroBackground}`}
    >
      <Container className={heroContainer}>
        <Hero
          introHeading={hero.introHeading}
          introLeadIn={hero.introLeadIn}
          introLeadOut={hero.introLeadOut}
          resumeButtonText={hero.resumeButtonText}
          resumeLink={hero.resumeButtonLink}
        />
      </Container>
    </header>
  );
};

Landing.propTypes = {
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Landing;
