import React from "react";
import "./BoxComponent.css";

const BoxComponent = ({ title1, title2, title3, githubLink, vercelLink }) => {
  return (
    <div className="box">
      <h1>{title1}</h1>
      <a href={githubLink} target="_blank" rel="noopener noreferrer">
        GitHub Repo
      </a>
      <a href={vercelLink} target="_blank" rel="noopener noreferrer">
        Vercel Site
      </a>
    </div>
  );
};

export default BoxComponent;
