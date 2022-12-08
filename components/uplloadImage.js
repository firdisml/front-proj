import React, { useState } from "react";

const UploadAndDisplayImage = (props) => {
  //   const [selectedImage, setSelectedImage] = useState(null);

  const { selectedImage, setSelectedImage, name, accept } = props


  return (
    <div>
      {selectedImage && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={() => setSelectedImage({ name: name, value: null })}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        accept={accept}
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage({ name: name, value: event.target.files[0] });

        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;