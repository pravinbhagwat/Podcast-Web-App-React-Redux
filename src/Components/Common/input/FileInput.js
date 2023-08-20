import React, { useState } from "react";
import "./style.css"

function FileInput({ accept, id, fileHandleFnc, text}) {
  const [fileSelected, setFileSelected] = useState(false);

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0])
  };

  return (
    <>
      <label className={`custom-input dot ${!fileSelected ? 'label-input' : 'active'}`} htmlFor={id}>
        {fileSelected ? `The File ${fileSelected} Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default FileInput;
