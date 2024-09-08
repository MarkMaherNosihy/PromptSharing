'use client'
import Profile from "@components/Profile";
import Dialog from "@components/dialog";

import { usePathname, useRouter, useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react"

const UserProfile = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const userName = searchParams.get('username');
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/user/${params.id}/posts`);
          const data = await response.json();
          console.log(data);
          setPosts(data)
        }
        fetchPosts();
      }, [])  
  return (
    <>
    <Profile
    name={userName}
    desc={`Welcome to ${userName} profile page`}
    data={posts}
    ></Profile>
    </>
    
  )
};

export default UserProfile;
