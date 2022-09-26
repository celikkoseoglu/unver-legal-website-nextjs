import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavbarItem from "./NavbarItem";
import {
  brand,
  brandSmall,
  brandTransition,
  customNavbar,
  mobileNavbar,
  mobileNavbarLinksCollapsed,
  mobileNavbarLinksExpanded,
  navbarContainer,
  navbarLinks,
  navbarToggle,
  noLeftPadding,
  topNavCollapse,
  topNavExpand,
  verticalRuler,
  whiteLink,
} from "../../stylesheets/components/Navbar/NavigationBar.module.sass";
import Container from "../Util/Container";
import NavbarToggle from "./NavbarToggle";
import { debounce, throttle } from "../../utils/Limitors";
import { getLanguageFile } from "../../utils/LanguageSwitcher";
import LanguageToggle from "../LanguageToggle";

const NavigationBar = ({ language, languageSwitchFunction }) => {
  const [navbarExpanded, setNavbarExpanded] = useState(true);
  const [mobileNavbarCollapsed, setMobileNavbarCollapsed] = useState(true);
  const [transparency, setTransparency] = useState(0.0);

  const content = getLanguageFile("navbar", language);

  function handleScroll() {
    if (window.scrollY > 50) {
      setNavbarExpanded(false);
    } else if (window.scrollY < 50) {
      setNavbarExpanded(true);
    }

    if (window.scrollY > 250) {
      setTransparency(1);
    } else {
      setTransparency(window.scrollY / 250.0);
    }

    setMobileNavbarCollapsed(true);
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", throttle(debounce(handleScroll)));
    return () =>
      window.removeEventListener("scroll", throttle(debounce(handleScroll)));
  }, []);

  return (
    <nav
      style={
        mobileNavbarCollapsed
          ? {
              backgroundColor: `rgba(27, 27, 27, ${transparency * 0.85})`,
              backdropFilter: `blur(${transparency * 5}px)`,
            }
          : {
              backgroundColor: `rgba(27, 27, 27, 0.85)`,
              backdropFilter: `blur(${transparency * 5}px)`,
            }
      }
      className={`${customNavbar} ${
        navbarExpanded ? topNavExpand : topNavCollapse
      }`}
    >
      <Container className={navbarContainer}>
        <div className={mobileNavbar}>
          <NavbarItem
            className={noLeftPadding}
            reference={content.landingReference}
          >
            <img
              alt="logo"
              className={`${brandTransition} ${
                navbarExpanded ? brand : brandSmall
              }`}
              src="/images/unverLegalLogo.svg"
            />
          </NavbarItem>
          <NavbarToggle
            onClickMethod={setMobileNavbarCollapsed}
            collapsed={mobileNavbarCollapsed}
            className={navbarToggle}
          />
        </div>
        <div
          className={`${navbarLinks} ${
            mobileNavbarCollapsed
              ? mobileNavbarLinksCollapsed
              : mobileNavbarLinksExpanded
          }`}
        >
          {content.items.map((item) => (
            <NavbarItem
              reference={item.reference}
              href={item.href}
              className={whiteLink}
              key={item.title}
            >
              {item.title}
            </NavbarItem>
          ))}

          <div className={verticalRuler} />

          <LanguageToggle
            languageSwitchFunction={languageSwitchFunction}
            text="TR - EN"
            language={language}
          />
        </div>
      </Container>
    </nav>
  );
};

NavigationBar.propTypes = {
  language: PropTypes.string.isRequired,
  languageSwitchFunction: PropTypes.func.isRequired,
};

export default NavigationBar;
