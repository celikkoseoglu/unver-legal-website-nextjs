import React from "react";
import PropTypes from "prop-types";
import storage from "local-storage-fallback";
import { switchLanguage } from "../utils/LanguageSwitcher";
import {
  languageToggle,
  languageBorder,
  darkLanguageToggle,
} from "../stylesheets/components/LanguageToggle.module.sass";

const onClickWrapper = (language) => {
  const newLanguage = switchLanguage(language);
  storage.setItem("language", newLanguage);
  return newLanguage;
};

const LanguageToggle = ({
  className,
  supportedLanguages,
  selectedLanguage,
  languageSwitchFunction,
  isDark,
}) => (
  <button
    type="button"
    aria-label="Language Toggle"
    onClick={() => {
      languageSwitchFunction(onClickWrapper(selectedLanguage));
    }}
    className={`${languageToggle} ${isDark && darkLanguageToggle}`}
  >
    {supportedLanguages.map((language, index) => {
      let innerText = language.toUpperCase();
      return (
        <span key={innerText}>
          <span
            className={selectedLanguage == language ? languageBorder : null}
            key={language.toString()}
          >
            {innerText}
          </span>
          {index < supportedLanguages.length - 1 && <span> - </span>}
        </span>
      );
    })}
  </button>
);

LanguageToggle.propTypes = {
  supportedLanguages: PropTypes.array.isRequired,
  className: PropTypes.string,
  selectedLanguage: PropTypes.string.isRequired,
  languageSwitchFunction: PropTypes.func.isRequired,
  isDark: PropTypes.bool,
};

LanguageToggle.defaultProps = {
  className: null,
  isDark: true,
};

export default LanguageToggle;
