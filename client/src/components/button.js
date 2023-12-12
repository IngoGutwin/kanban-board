export function button({ cssClass, id, dataAttribute, innerHtml }) {
  const buttonAttributes = {
    cssClass: cssClass,
    id: id,
    dataAttribute: dataAttribute,
    innerHtml: innerHtml,
  };
  return `
    <button 
      class="${buttonAttributes?.cssClass}" 
      id="${buttonAttributes?.id}" 
      ${buttonAttributes?.dataAttribute === undefined ? '' : `${dataAttribute}`}
    >
      ${innerHtml}
    </button>  
  `;
}
