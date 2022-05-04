import React from "react";
import PropTypes from "prop-types";
import { celikkBranding } from "../stylesheets/components/BrandingLogos.module.sass";
import BlogBrandingLogo from "./Animations/BlogBrandingLogo";
const darkLogoPath = "/images/unverLegalLogo.svg";
const lightLogoPath = "/images/unverLegalLogoLight.svg";

const BrandingLogos = ({ className, isDark }) => (
  <div className={className}>
    <a href="/">
      <img
        border="0"
        alt="logo"
        src={isDark ? darkLogoPath : lightLogoPath}
        width="auto"
        height="20"
      />
    </a>
    <a href="https://www.celikk.me">
      <BlogBrandingLogo className={`${celikkBranding}`} isDark />
    </a>
  </div>
);

BrandingLogos.propTypes = {
  className: PropTypes.string,
  isDark: PropTypes.bool.isRequired,
};

BrandingLogos.defaultProps = {
  className: null,
};

export default BrandingLogos;
