'use client'

import React, { ChangeEvent, useState } from "react";
import InnerPageContainer from "@/src/app/components/dashboard/common/InnerPageContainer";
import { any, string } from "zod";
import { getDataFromEndPoint } from "@/src/lib/backend-api";

export default function Contact() {
  const [formData, setFormData] = useState({
    movieName: "",
    AboutTheMovie: "",
    movieposter: "",
    movieTrailerLink: "",
    Runtime: "",
    genre :[] as string[],
    format: "",
    endDate: "",
    releaseDate: "",
    cast: "",
    crew: "",
    certificate: "",
    languages: ""
  });


  const languageOptions = [
    "Select a Language",
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin Chinese",
    "Hindi",
    "Japanese",
    "Korean",
    "Italian",
    "Russian",
    "Portuguese",
    "Arabic",
    "Turkish",
    "Persian",
    "Swedish",
    "Danish",
    "Norwegian",
    "Finnish",
    "Dutch",
    "Greek",
    "Polish",
    "Hungarian",
    "Czech",
    "Thai",
    "Hebrew",
    "Tamil",
    "Telugu",
    "Bengali",
  ];
  const [formSuccess, setFormSuccess] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };



  const handleGenre = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = event.target.value;
  
    setFormData(prevFormData => {
      // Check if the genre is already selected
      const isGenreSelected = prevFormData.genre.includes(selectedGenre);
      
      // If the genre is already selected, filter it out; otherwise, add it to the genres array
      const newGenres = isGenreSelected
        ? prevFormData.genre.filter(genre => genre !== selectedGenre)
        : [...prevFormData.genre, selectedGenre];
  
      // Return the updated form data with the new genre array
      return {
        ...prevFormData,
        genre: newGenres,
      };
    });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };


  const submitForm = (e: any) => {
    e.preventDefault();
  
    // Create a new FormData object
    const data = new FormData();
  
    // Iterate over formData and append to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values (like 'genre')
        value.forEach((item, index) => {
          // Append each item of the array separately
          data.append(`${key}[${index}]`, item);
        });
      } else {
        // Append non-array values normally
        data.append(key, value as string | Blob);
      }
    });
  
    // If there's a file selected, append it to FormData
    if (selectedFile) {
      data.append("movieposter", selectedFile);
    }
  
    // POST the FormData to the URL of the form
    const formURL = e.currentTarget.action; // Use currentTarget for form's action
    fetch(formURL, {
      method: "POST",
      body: data,
      // Do not set the Content-Type header when using FormData
    })
    .then(response => response.json())
    .then(data => {
      // Handle form submission success
      setFormSuccess(true);
      setIsEditable(false);
      setFormSuccessMessage("Movie added successfully!"); // Optional: Set a success message
      setFormData({ 
        // Reset formData to initial state
        movieName: "",
        AboutTheMovie: "",
        movieposter: "",
        movieTrailerLink: "",
        Runtime: "",
        genre: [] as string[],
        format: "",
        endDate: "",
        releaseDate: "",
        cast: "",
        crew: "",
        certificate: "",
        languages: ""
      });
    }).catch(error => {
      // Handle errors if any
      console.error("Error submitting form:", error);
    });
  };
  
  
  

const handleFileUpload = (e: any) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    setSelectedFile(file); // This should be the state updater function from useState
  }
};

const handleFileChange = (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  setSelectedFile(file);
};

  return (
    <div>
        <form method="POST" action="movie/add" onSubmit={submitForm}>
          <InnerPageContainer title={`Movie -> ${formData.movieName}`}>
            <div className="bg-white p-8 rounded-lg shadow">
              {!isEditable && (
                <button type="button" onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Click here to add movie
                </button>
              )}
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Movie Name</label>
                    <input type="text" name="movieName" placeholder="Movie Name" readOnly={!isEditable} onChange={handleInput} value={formData.movieName} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">About the Movie</label>
                    <input type="text" name="AboutTheMovie" placeholder="About the Movie" readOnly={!isEditable} onChange={handleInput} value={formData.AboutTheMovie} className="border p-2 rounded w-full"/>
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Movie Poster
                    </label>
                    <input
                      type="file"
                      name="movieposter"
                      onChange={handleInput}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Movie Trailer Link</label>
                        <input
                            type="text"
                            name="movieTrailerLink" // Change the name to something relevant
                            placeholder="Enter Movie Trailer URL"
                            onChange={handleInput}
                            value={formData.movieTrailerLink} // Update the value and name as needed
                            className="border p-2 rounded w-full"
                        />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Movie Run Time</label>
                            <input type="text" name="Runtime" placeholder="Movie Run Time" readOnly={!isEditable} onChange={handleInput} value={formData.Runtime} className="border p-2 rounded w-full"/>
                        </div>
                     </div>
                 </div>

              <div className="mb-6">
                <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Action", "Drama", "Comedy", "Science Fiction", "Horror", "Romance", "Fantasy", "Thriller", "Adventure", "Mystery"].map((genre) => (
                            <div key={genre} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    value={genre}
                                    onChange={handleGenre}
                                    checked={formData.genre.includes(genre)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <label className="ml-2 text-gray-700">{genre}</label>
                            </div>
                        ))}
                    </div>
                </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Movie Format</label>
                        <select
                            name="format"
                            onChange={handleInput}
                            value={formData.format}
                            className="border p-2 rounded w-full"
                        >
                            <option value=""></option>
                            <option value="IMAX">IMAX</option>
                            <option value="IMAX 70mm">IMAX 70mm</option>
                            <option value="XD">XD</option>
                            <option value="SD">SD</option>
                        </select>
                        </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="grid grid-cols-1 gap-4">
                <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                        <input
                        type="date" // Use type="date" for date picker
                        name="endDate"
                        onChange={handleInput}
                        value={formData.endDate}
                        className="border p-2 rounded w-full"
                        />
                </div>
                <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Release Date</label>
                        <input
                        type="date" // Use type="date" for date picker
                        name="releaseDate"
                        onChange={handleInput}
                        value={formData.releaseDate}
                        className="border p-2 rounded w-full"
                        />
                </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Cast</label>
                    <input type="text" name="cast" placeholder="Cast" onChange={handleInput} readOnly={!isEditable} value={formData.cast} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Crew</label>
                    <input type="text" name="crew" placeholder="Crew" onChange={handleInput} readOnly={!isEditable} value={formData.crew} className="border p-2 rounded w-full"/>
                  </div>
                  <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Certificate</label>
                        <select
                            name="certificate"
                            onChange={handleInput}
                            value={formData.certificate}
                            className="border p-2 rounded w-full"
                        >
                            <option value=""></option>                            
                            <option value="U">U</option>
                            <option value="U/A">U/A</option>
                            <option value="A">A</option>
                        </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Languages</label>
                            <select
                            name="languages"
                            onChange={handleInput}
                            value={formData.languages}
                            className="border p-2 rounded w-full"
                            >
                            {languageOptions.map((language, index) => (
                                <option key={index} value={language}>
                                {language}
                                </option>
                            ))}
                            </select>
                        </div>
                </div>
              </div>

              {isEditable ? (
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              ) : (
                <button type="button" onClick={toggleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Movie
                </button>
              )}
            </div>
          </InnerPageContainer>
        </form>
    </div>
  );
}
function setSelectedFile(file: any) {
    throw new Error("Function not implemented.");
}

