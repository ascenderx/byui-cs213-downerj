const INIT_VISIBLE = false;
const ICON_EXPAND = "+ ";
const ICON_COLLAPSE = "— ";

let visibilities = [];
let clickables;
let expandables;
let icons;

function byID(id) {
  return document.getElementById(id);
}

function byClass(className) {
  return document.getElementsByClassName(className);
}

function onExpandableClick(index, elem, icon) {
  visibilities[index] = !visibilities[index];
  setExpandableVisibility(index, elem, icon);
}

function setExpandableVisibility(index, elem, icon) {
  let display;
  let iconText;
  if (!visibilities[index]) {
    display = 'none';
    iconText = ICON_EXPAND;
  } else {
    iconText = ICON_COLLAPSE;
    display = '';
  }

  elem.style.display = display;
  icon.innerText = iconText;
}

function onLoad() {
  clickables = byClass('u-expandable-clickable');
  expandables = byClass('u-expandable');
  icons = byClass('u-expandable-icon');
  
  for (let x = 0; x < expandables.length; x++) {
    let expandable = expandables[x];
    let clickable = clickables[x];
    let icon = icons[x];

    visibilities.push(INIT_VISIBLE);
    setExpandableVisibility(x, expandable, icon);

    clickable.addEventListener('click', () => {
      onExpandableClick(x, expandable, icon);
    });

    icon.addEventListener('click', () => {
      onExpandableClick(x, expandable, icon);
    });
  }
}

function expandAll() {
  applyAllVisibilities(true);
}

function collapseAll() {
  applyAllVisibilities(false);
}

function applyAllVisibilities(visible) {
  for (let x = 0; x < expandables.length; x++) {
    let expandable = expandables[x];
    let icon = icons[x];
    visibilities[x] = visible;
    setExpandableVisibility(x, expandable, icon);
  }
}

window.addEventListener('load', onLoad);