import React from "react";

/**
 * Couple of things to note:
 * - width and height is set to 1em
 * - fill is `currentColor` - this will ensure that the icon looks uniform and
 *   that the hover/active state works. You can of course render anything you
 *   would like here, but for plugins that are to be used in more than one
 *   studio, we suggest these rules are followed
 **/
export default () => (
  <svg
    data-sanity-icon="publish"
    width="1em"
    height="1em"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.99997 5.50005H20M7.5 14L12.5 9.00003L17.5 14"
      stroke="currentColor"
      stroke-width="1.2"
    ></path>
    <path d="M12.5 9.00003V20" stroke="currentColor" stroke-width="1.2"></path>
  </svg>
);
