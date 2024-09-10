export default function toogleMobMenu({ mobMenu, mobMenuButton }) {
  console.log(mobMenu);
  mobMenu.classList.toggle('is-open');
  mobMenu.classList.contains('is-open')
    ? mobMenuButton.classList.add('close')
    : mobMenuButton.classList.remove('close');
}
