// create object with screen breakpoints
const rootPropery = getComputedStyle(document.querySelector(':root'));
window.screenBreakPoints = {
  desktop: rootPropery.getPropertyValue('--desktop').replace('px', ''),
  desktopLow: rootPropery.getPropertyValue('--desktop-low').replace('px', ''),
  laptop: rootPropery.getPropertyValue('--laptop').replace('px', ''),
  tablet: rootPropery.getPropertyValue('--tablet').replace('px', ''),
  mobile: rootPropery.getPropertyValue('--mobile').replace('px', '')
}