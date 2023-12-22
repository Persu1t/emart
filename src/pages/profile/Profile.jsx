import React, {useEffect, useState} from "react";
import { storage } from "../../firebaseinit";
import { ref, uploadBytes } from "firebase/storage"
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/signupReducer";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [fileUpload, setFileUpload] = useState(null)
  const [fileIsUploaded, setFileUploaded] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const {user} = useSelector(userSelect)
  const navigate = useNavigate()

  useEffect(()=>{
    let isFileUploded = localStorage.getItem("fileUpload")
    if(isFileUploded){
      setDisabled(true)
    }
  },[fileIsUploaded])

  function handleFileUpload(){
    if(fileUpload == null){
      return
    }
    const imageRef = ref(storage, `${user.uid}/${fileUpload.name + v4()}`);
    uploadBytes(imageRef, fileUpload).then(()=>{
      toast.success("Image uploaded successfully")
      setFileUploaded(true)
      localStorage.setItem("fileUpload", fileIsUploaded)
      navigate("/")
    })
  }

  return (
    <div className="login-form">
      <div class="mt-2">
        <label for="formFile" class="form-label">
         Upload Image
        </label>
        <input class="form-control" type="file" id="formFile" onChange={(e)=> setFileUpload(e.target.files[0])}/>
      </div>
      <button className="btn  btn-primary mt-2" onClick={handleFileUpload} disabled={disabled}>Upload Image</button>
    </div>
  );
};

export default Profile;
