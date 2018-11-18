let visibilities = [];

function byID(id) {
  return document.getElementById(id);
}

function byClass(className) {
  return document.getElementsByClassName(className);
}

function onExpandableClick(index, elem) {
  visibilities[index] = !visibilities[index];
  setExpandableVisibility(elem, visibilities[index]);
}

function setExpandableVisibility(elem, visible) {
  let display;
  if (!visible) {
    display = 'none';
  } else {
    display = '';
  }

  elem.style.display = display;
}

function onLoad() {
  let clickables = byClass('u-expandable-clickable');
  let expandables = byClass('u-expandable');
  
  const INIT_VISIBLE = false;
  for (let x = 0; x < expandables.length; x++) {
    let expandable = expandables[x];
    let clickable = clickables[x];

    visibilities.push(INIT_VISIBLE);
    setExpandableVisibility(expandable, INIT_VISIBLE);

    clickable.addEventListener('click', () => {
      onExpandableClick(x, expandable);
    });
  }
}

window.addEventListener('load', onLoad);