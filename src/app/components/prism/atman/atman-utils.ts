export function addClassToHtml(
    html: string,
    className: string,
    tagName: string
): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
        el.classList.add(className);
    });
    return doc.documentElement.innerHTML;
}
