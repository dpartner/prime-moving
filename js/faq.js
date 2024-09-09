export default function shownFaqAnswer(ev, { faqAnswer }) {
  ev.preventDefault();
  if (ev.target.classList.contains('faq-list-item-question')) {
    const neighbors = ev.target.parentElement.children;
    for (const neighbor of neighbors) {
      if (neighbor.classList.contains('faq-list-item-answer-wrap')) {
        neighbor.classList.toggle('is-show');
      }
      if (neighbor.classList.contains('faq-button')) {
        neighbor.firstElementChild.classList.toggle('rotate');
      }
    }
  }
  if (ev.target.classList.contains('faq-button')) {
    ev.target.nextElementSibling.classList.toggle('is-show');
    ev.target.firstElementChild.classList.toggle('rotate');
  }
}
