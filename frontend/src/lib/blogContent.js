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

const parseInlineMarkdown = (text = "") => {
  let result = text;

  // Escape HTML tags to prevent raw html injection in plain text mode
  result = result
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold (**text** or __text__)
  result = result.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // Italic (*text* or _text_)
  result = result.replace(/\*(.*?)\*/g, "<em>$1</em>");
  result = result.replace(/_(.*?)_/g, "<em>$1</em>");

  // Inline code (`code`)
  result = result.replace(/`(.*?)`/g, `<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>`);

  // Links ([text](url))
  result = result.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#023e7d] hover:underline font-semibold">$1</a>`);

  return result;
};

export const parseMarkdownToHtml = (markdown = "") => {
  const lines = String(markdown || "")
    .split(/\r?\n/)
    .map(line => line.trimEnd());

  const htmlResult = [];
  let inList = false;
  let listType = null; // "ul" or "ol"

  const closeListIfOpen = () => {
    if (inList) {
      htmlResult.push(`</${listType}>`);
      inList = false;
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // 1. Handle Empty Lines
    if (!trimmed) {
      closeListIfOpen();
      continue;
    }

    // 2. Check if Bullet List Item (supports unicode bullets: •, ●, ○, ■, ▪, or standard -, *)
    const bulletMatch = trimmed.match(/^([-*•●○■▪]|&bull;|&#8226;)\s+(.*)$/);
    if (bulletMatch) {
      if (inList && listType !== "ul") {
        closeListIfOpen();
      }
      if (!inList) {
        htmlResult.push(`<ul class="my-5 space-y-2 pl-4">`);
        inList = true;
        listType = "ul";
      }
      htmlResult.push(`<li class="leading-7 list-disc ml-5">${parseInlineMarkdown(bulletMatch[2])}</li>`);
      continue;
    }

    // 3. Check if Numbered List Item
    const numberMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (numberMatch) {
      if (inList && listType !== "ol") {
        closeListIfOpen();
      }
      if (!inList) {
        htmlResult.push(`<ol class="my-5 space-y-2 pl-4">`);
        inList = true;
        listType = "ol";
      }
      htmlResult.push(`<li class="leading-7 list-decimal ml-5">${parseInlineMarkdown(numberMatch[2])}</li>`);
      continue;
    }

    // Since it's not a list item, close list if open
    closeListIfOpen();

    // 4. Check if Blockquote
    if (trimmed.startsWith("> ")) {
      htmlResult.push(`<blockquote class="border-l-4 border-[#023e7d] bg-[#F4FAF9] pl-4 py-2 my-5 text-slate-700 italic">${parseInlineMarkdown(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    // 5. Check if Heading
    // Standard Markdown Headings
    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const headingClasses = {
          1: "text-3xl font-black text-slate-900 mt-10 mb-4",
          2: "text-2xl font-bold text-slate-900 mt-8 mb-4",
          3: "text-xl font-bold text-slate-900 mt-6 mb-3",
          4: "text-lg font-bold text-slate-900 mt-5 mb-2",
        };
        const hClass = headingClasses[level] || headingClasses[3];
        htmlResult.push(`<h${level} class="${hClass}">${parseInlineMarkdown(text)}</h${level}>`);
        continue;
      }
    }

    // Heuristic Heading detection for copied plain text from Google Docs
    const isLineHeading = 
      trimmed.length < 85 && // reasonably short
      !/[.,;:!?]$/.test(trimmed) && // doesn't end in sentence-ending punctuation
      (i === 0 || // first line is usually a title/heading
       trimmed.length < 45 || // very short lines are almost always headers
       /^(Introduction|Conclusion|Summary|Section\s+\d+|Step\s+\d+|What is|Why|How to)\b/i.test(trimmed));

    if (isLineHeading) {
      // Determine header level (first header = h2, others = h3)
      const isFirstHeader = htmlResult.filter(line => line.startsWith("<h")).length === 0;
      const level = isFirstHeader ? 2 : 3;
      const headingClasses = {
        2: "text-2xl font-bold text-slate-900 mt-8 mb-4",
        3: "text-xl font-bold text-slate-900 mt-6 mb-3",
      };
      const hClass = headingClasses[level];
      htmlResult.push(`<h${level} class="${hClass}">${parseInlineMarkdown(trimmed)}</h${level}>`);
      continue;
    }

    // 6. Regular Paragraph
    htmlResult.push(`<p class="mt-4 text-base leading-8 text-slate-700 whitespace-pre-wrap">${parseInlineMarkdown(trimmed)}</p>`);
  }

  closeListIfOpen();

  return htmlResult.join("\n");
};

