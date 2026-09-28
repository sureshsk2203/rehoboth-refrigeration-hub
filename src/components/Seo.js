import { useEffect } from "react";

const SITE = "https://rehobothrefrigerationhub.netlify.app";

// Update the tag if it exists in <head>, otherwise create it
function upsert(tag, attrs, key) {
  let el = document.head.querySelector(`${tag}[${key}="${attrs[key]}"]`);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const url = SITE + (path === "/" ? "/" : path);

    document.title = title;
    upsert("meta", { name: "description", content: description }, "name");
    upsert("link", { rel: "canonical", href: url }, "rel");

    upsert("meta", { property: "og:title", content: title }, "property");
    upsert("meta", { property: "og:description", content: description }, "property");
    upsert("meta", { property: "og:url", content: url }, "property");

    upsert("meta", { name: "twitter:title", content: title }, "name");
    upsert("meta", { name: "twitter:description", content: description }, "name");
  }, [title, description, path]);

  return null;
}