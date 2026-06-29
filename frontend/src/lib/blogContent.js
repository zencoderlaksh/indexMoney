const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "i",
  "li",
  "ol",
  "p",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

export const looksLikeHtmlContent = (content = "") => {
  const value = String(content || "");
  return /<(h[1-6]|p|ul|ol|li|table|tr|td|th|blockquote|br|div)\b/i.test(value);
};

export const sanitizeBlogHtml = (content = "") => {
  const value = String(content || "").trim();
  if (!value || !looksLikeHtmlContent(value)) {
    return value;
  }

  if (typeof window === "undefined" || !window.DOMParser) {
    return value;
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(
    value.replace(/<(\/)?div\b/gi, "<$1p"),
    "text/html",
  );

  const sanitizeNode = (node) => {
    if (!node || node.nodeType !== 1) return;

    const tagName = node.tagName?.toLowerCase();
    if (!tagName || !ALLOWED_TAGS.has(tagName)) {
      const fragment = doc.createDocumentFragment();
      while (node.firstChild) {
        fragment.appendChild(node.firstChild);
      }
      node.parentNode?.replaceChild(fragment, node);
      return;
    }

    Array.from(node.attributes || []).forEach((attr) => {
      if (attr.name === "style" || attr.name === "class") {
        node.removeAttribute(attr.name);
        return;
      }

      if (attr.name === "href") {
        const href = attr.value.trim();
        if (
          !href ||
          (!href.startsWith("http://") &&
            !href.startsWith("https://") &&
            !href.startsWith("mailto:"))
        ) {
          node.removeAttribute("href");
          return;
        }
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
        return;
      }

      if (attr.name === "target" || attr.name === "rel") {
        node.removeAttribute(attr.name);
      }
    });

    Array.from(node.children || []).forEach(sanitizeNode);
  };

  Array.from(doc.body.children || []).forEach(sanitizeNode);

  return doc.body.innerHTML.trim();
};
