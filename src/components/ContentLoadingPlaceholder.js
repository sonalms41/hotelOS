import React from "react";

function ContentLoadingPlaceholder({ isLoading }) {
  if (isLoading)
    return (
      <main className="page">
        {/*Content*/}
        <div className="page-content">
          {/*Placeholder Content*/}
          <div className="placeholder-content">
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
            <div className="placeholder-content_item" />
          </div>
        </div>
      </main>
    );
  else return <></>;
}

export default ContentLoadingPlaceholder;
