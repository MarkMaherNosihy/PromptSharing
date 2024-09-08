'use client'
import Profile from "@components/Profile";
import Dialog from "@components/dialog";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

const MyProfile = () => {
    const router = useRouter();
    const {data: session} = useSession(); 
    const [posts, setPosts] = useState([]);
    const [postToDelete, setPostToDelete] = useState();
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/user/${session?.user.id}/posts`);
          const data = await response.json();
          console.log(data);
          setPosts(data)
        }
        if(session?.user.id){
            fetchPosts();
        }
      }, [session])
    
    const handleEdit = (post)=>{
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post)=>{
      setOpen(true);
      setPostToDelete(post);
    }
    const confirmDelete =  async ()=>{
      try {
        await fetch(`/api/prompt/${postToDelete._id}`, {
          method: 'DELETE'
        }) 
        const filteredPosts = posts.filter((post)=>{
          return post._id !== postToDelete._id;
        })
        setPosts(filteredPosts);
        
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
    <Profile
    name="My"
    desc="Welcome to your profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    ></Profile>
    <Dialog
    title="Delete Prompt"
    desc="Are you sure you want to delete this prompt?"
    confirm="Yes"
    cancel="Cancel"
    open={open}
    setOpen={setOpen}
    onConfirm={confirmDelete}>
    </Dialog>
    </>
    
  )
};

export default MyProfile;
