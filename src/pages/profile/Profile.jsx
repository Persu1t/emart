import React, { useEffect, useState } from "react";
import { storage } from "../../firebaseinit";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/signupReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileIsUploaded, setFileUploaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { user } = useSelector(userSelect);
  const navigate = useNavigate();

  useEffect(() => {
    let isFileUploded = localStorage.getItem("imageName");
    if (isFileUploded) {
      setDisabled(true);
    }
  }, [fileIsUploaded]);

  function handleFileUpload() {
    if (fileUpload == null) {
      return;
    }
    const imageRef = ref(storage, `${user.uid}/${fileUpload.name}`);
    uploadBytes(imageRef, fileUpload).then(() => {
      setFileUploaded(true);
      toast.success("Image uploaded successfully");
      console.log(fileUpload.name);
      setFileUploaded(true);
      localStorage.setItem("fileUploaded", fileIsUploaded);
      localStorage.setItem("imageName", fileUpload.name);
      navigate("/");
    });
  }

  function deleteUploadedFile() {
      console.log("delete button is clicked");
      let nameOfImage = localStorage.getItem("imageName");
      const deleteRef = ref(storage, `${user.uid}/${nameOfImage}`);
      deleteObject(deleteRef).then(() =>{
        setFileUpload(false);
        localStorage.removeItem("imageName");
        localStorage.removeItem("fileUploaded");
        window.location.reload();
        toast.success("Image deleted successfully");
      }).catch((error) => {
        toast.error("Something went wrong :(")
      });
    

  }

  return (
    <>
         <div className="login-form">
      <div className="mt-2">
        <label htmlFor="formFile" className="form-label">
          Upload Image
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={(e) => setFileUpload(e.target.files[0])}
        />
      </div>
      <button
        className="btn  btn-primary mt-2"
        onClick={handleFileUpload}
        disabled={disabled}
      >
        Upload Image
      </button>
      <button
        className="btn  btn-danger mt-2 mx-3"
        onClick={deleteUploadedFile}
      >
        Delete Image
      </button>
    </div>
    </>

  );
};

export default Profile;
