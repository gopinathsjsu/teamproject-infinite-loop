'use client'

import React, { useState } from "react";
import InnerPageContainer from "@/src/app/components/dashboard/common/InnerPageContainer";
import { string } from "zod";

export interface movie{
  movieName: string,
  AboutTheMovie: string,
  banner: string,
  movieTrailerLink: string,
  Runtime: string,
  genre :string[],
  format: string,
  endDate: string,
  releaseDate: string,
  cast: string,
  crew: string,
  certificate: string,
  languages: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    movieName: "",
    AboutTheMovie: "",
    banner: "",
    movieTrailerLink: "",
    Runtime: "",
    genre : [],
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

  const handleInput = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleGenre = (event: any) => {
    const selectedGenre  = event.target.value;
    let newGenres;
    if (formData.genre.includes(selectedGenre)) {
      // Remove the genre from the array if it's already included
      newGenres = formData.genre.filter(genre => genre !== selectedGenre);
    } else {
      // Add the genre to the array if it's not already included
      newGenres = [...formData.genre, selectedGenre];
    }
    setFormData({ ...formData, genre: newGenres });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedFile(file); // Store the selected file in state
  };

  const submitForm = (e:any) => {
    e.preventDefault();
    console.log(formData); // Here, add logic to handle form submission
    // POST the data to the URL of the form
    const formURL = e.target.action
    fetch(formURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
        'accept': 'application/json',
        },
    }).then((response) => response.json())
    .then((data) => {
        setFormData({ 
            movieName: "",
            AboutTheMovie: "",
            banner: "",
            movieTrailerLink: "",
            Runtime: "",
            genre: [],
            format: "",
            endDate: "",
            releaseDate: "",
            cast: "",
            crew: "",
            certificate: "",
            languages: ""
        })
    // Simulating a successful form submission response
    setFormSuccess(true);
    setIsEditable(false); // Make form read-only again after submission
    })
}

  return (
    <div>
        <form method="POST" action="movie/addMovie" onSubmit={submitForm}>
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
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Movie Poster</label>
                    <input
                        type="file" // Change input type to "file"
                        name="banner"
                        accept="image/*" // Specify accepted file types (e.g., images)
                        onChange={handleFileUpload} // Add a new onChange handler for file uploads
                        className="hidden" // Hide the file input (you can style the button to look like an input)
                        id="moviePosterInput" // Add an ID to the input for associating with the label/button
                    />
                    <label
                        htmlFor="moviePosterInput" // Associate the label with the file input using htmlFor
                        className="cursor-pointer border p-2 rounded w-full">
                        Upload Movie Poster
                    </label>
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
      )
    </div>
  );
}
function setSelectedFile(file: any) {
    throw new Error("Function not implemented.");
}

