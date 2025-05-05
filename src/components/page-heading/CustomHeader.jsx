import React from "react";

const CustomHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
      {actions && actions}
    </div>
  );
};

export default CustomHeader;
