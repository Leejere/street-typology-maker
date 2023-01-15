import React, { useRef, useState } from 'react';
import './Panel.css';
import { viewportWidth } from '../index';

function Panel() {
  // Initial state
  const shouldExpandOnLoad = viewportWidth > 900 ? true : false;
  const initDisplay = shouldExpandOnLoad ? 'flex' : 'none';
  const initToggleIcon = shouldExpandOnLoad ? 'expand_less' : 'expand_more';
  const initToggleText = shouldExpandOnLoad ? 'Collapse' : 'Expand';
  const initState = {
    expanded: shouldExpandOnLoad,
    display: initDisplay,
    toggleIcon: initToggleIcon,
    toggleText: initToggleText,
  };

  // Set state
  const [panelState, setPanelState] = useState(initState);

  const onPanelToggle = () => {
    if(panelState.expanded) {
      setPanelState({
        expanded: false,
        display: 'none',
        toggleIcon: 'expand_more',
        toggleText: 'Expand',
      });
    } else {
        setPanelState({
        expanded: true,
        display: 'flex',
        toggleIcon: 'expand_less',
        toggleText: 'Collapse',
      });
    }
  };

  return (
    <div className="panel-container">
      {/* Toggle button */}
      <button
        className="panel-toggle"
        onClick={onPanelToggle}
      >
        <span className="material-symbols-outlined">
          {panelState.toggleIcon}
        </span>
        <span>{panelState.toggleText}</span>
      </button>

      {/* Panel section */}
      <section
        className="panel"
        style={{ display: panelState.display }}
      ></section>
    </div>
  );
}

export default Panel;
