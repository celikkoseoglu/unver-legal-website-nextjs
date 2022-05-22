import {
  fontColorTransition,
  blogDark,
  blogItemMargin,
  blogNavbarMargin,
  blogStyle,
  footerStyle,
} from "../../stylesheets/Blog.module.sass";
import BlogFooter from "../../components/Footer/BlogFooter";
import HorizontalRuler from "../../components/Util/HorizontalRuler";
import BlogNavbar from "../../components/Navbar/BlogNavbar";
import GrowingCircleAnimation from "../../components/Animations/GrowingCircleAnimation";
import { useState } from "react";
import { getInitialTheme } from "../../utils/FileManager.utils";
import NoSSR from "react-no-ssr";
import getMeta from "../../components/Util/MetaGenerator";
import { getAllPosts } from "../../lib/api";
import {
  getInitialLanguage,
  getLanguageFile,
} from "../../utils/LanguageSwitcher";
import BlogItem from "../../components/Blog/BlogItem";

const formatDate = (date) => {
  const dateObject = new Date(date);
  const curr_date = dateObject.getDate();
  const curr_month = dateObject.getMonth() + 1; //Months are zero based
  const curr_year = dateObject.getFullYear();
  return curr_date + "." + curr_month + "." + curr_year;
};

export default function Blog({ allPosts }) {
  const [isDark, setIsDark] = useState(getInitialTheme());
  const [language, setLanguage] = useState(getInitialLanguage());

  const blog = getLanguageFile("blog", language);
  const blogNavbar = getLanguageFile("blogNavbar", language);
  const footer = getLanguageFile("footer", language);

  const meta = getMeta(
    blog.title.page,
    blog.pageDescription,
    "/images/meta/blog.png",
    blog.metaImageAlt
  );

  const noSSRContent = <div></div>;

  const content = (
    <div>
      {meta}
      <GrowingCircleAnimation isDark={isDark} />
      <div className={blogStyle}>
        <BlogNavbar
          headerText={blogNavbar.blogBranding}
          brandingLink={blogNavbar.homeLink}
          className={blogNavbarMargin}
          isDark={isDark}
          setIsDark={setIsDark}
          language={language}
          languageSwitchFunction={setLanguage}
        />
        {allPosts
          .filter((post) => post.language === language)
          .map((post) => (
            <BlogItem
              className={blogItemMargin}
              title={post.title.post}
              date={formatDate(post.date)}
              minutes={post.readTime}
              subtitle={post.description}
              blogPost={post.slug}
              isDark={isDark}
              key={post.title.post}
            />
          ))}

        <HorizontalRuler isDark={isDark} />
      </div>
      <div className={footerStyle}>
        <BlogFooter content={footer} isDark={isDark} />
      </div>
    </div>
  );

  return <NoSSR onSSR={noSSRContent}>{content}</NoSSR>;
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "description",
    "date",
    "readTime",
    "cover",
    "author",
    "language",
    "slug",
  ]);

  return {
    props: { allPosts },
  };
}
