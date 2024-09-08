"use client";
import React, { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard
          key={index}
          post={post}
          handleTagClick={handleTagClick}
        ></PromptCard>
      ))}
    </div>
  );
};
const Feed = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const inputRef = useRef(null);

  const search = (searchText) => {
    console.log(searchText);
    return posts.filter(
      (post) =>
        post.creator.username
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.tags.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const newSearchText = e.target.value;
    setSearchText(newSearchText); // update the state with the new search text
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const searchRes = search(newSearchText); // use the new search text directly
        setSearchResults(searchRes);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);


  const handleTagClick = (tag)=>{
    const event = { target: { value: tag } };
    handleSearchChange(event);
  }
  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input
          ref={inputRef} 
          type="text"
          placeholder="Search for a tag or user"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText === "" ? (
        <PromptCardList data={posts} handleTagClick={handleTagClick}></PromptCardList>
      ) : (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        ></PromptCardList>
      )}
    </div>
  );
};

export default Feed;
