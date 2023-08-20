import React from "react";
import Button from "../../Common/Button";

function EpisodesDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div>
      <h1 style={{ textAlign: "left", marginBottom: "0" }}>{index}. {title}</h1>
      <p className="podcast-description" style={{ textAlign: "left"}}>{description}</p>
      <Button text={"Play"} onClick={() => onClick(audioFile)} width={'100px'}/>
    </div>
  );
}

export default EpisodesDetails;
