import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files); // Capture the selected files
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select images to upload!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]); // Append each image to 'images'
    }

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Images uploaded successfully!');
      console.log(response.data); // Logs the uploaded image URLs
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images!');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploadForm;
