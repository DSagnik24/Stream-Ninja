import React, { useState } from "react";
import VideoLogo from '../assets/video-img.png';
import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [meta, setMeta] = useState({
    title: "",
    description: ""
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }
  function formFieldChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value
    })
  }

  function handleForm(formEvent) {
    formEvent.preventDefault(); 
    if(!selectedFile){
      alert("No file selected");
      return;
    }
    console.log(meta);  

    //submit file to server
    saveVideoToServer(selectedFile,meta);
  }
  //submit file to server
  async function saveVideoToServer(video,videoMetaData){
    setUploading(true);
    //api call

   try {
    let formData = new FormData();
    formData.append("title",videoMetaData.title);
    formData.append("description",videoMetaData.description);
    formData.append("file",selectedFile);
    
    let response =await axios.post(`http://localhost:8080/api/v1/videos`,formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent);
      },
    });
    console.log(response);
    
    setMessage("Video uploaded successfully");

   } catch (error) {
    console.log(error); 
   }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center space-y-6 justify-center p-6">
        <h1>
          Upload Videos
        </h1>
        <div>
          <form noValidate className="flex flex-col space-y-6" onSubmit={handleForm}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
              </div>
              <TextInput onChange={formFieldChange} name="title" placeholder="Video Title" />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
              onChange={formFieldChange}  
              name="description" id="comment" placeholder="Write Video Description..." required rows={4} />
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <div className="shrink-0">
                <img className="h-16 w-16 object-cover"
                  src={VideoLogo} alt="Current profile photo" />
              </div>
              <label className="block">
                <span className="sr-only">Choose Video file</span>
                <input
                  name=""
                  onChange={handleFileChange}
                  type="file" className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100
                " />
              </label>
            </div>
            <div className="flex justify-center">
            <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;
