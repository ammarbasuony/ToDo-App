import React from "react";

const TabPanel = (props) => {
  const { children, value, className, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={className}>{children}</div>}
    </div>
  );
};

export default TabPanel;
