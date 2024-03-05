import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { useState } from "react";
import DormSwapForm from '@/components/forms/DormSwapForm.tsx'

import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Home = () => {
  // const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('Home');
  const [desiredDorm, setDesiredDorm] = useState('');
  
  const handleFormSubmit = (formData) => {
    setDesiredDorm(formData.desiredDormName);
    setSelectedTab('Dorm Swap'); // Keeps the user on the Dorm Swap tab after submitting the form
  };

  const tabNames = ['Home', 'Furniture', 'Dorm Swap', 'Roommate Post'];


  const renderTabs = () => (
    <div className="tabs-container">
      {tabNames.map((name) => (
        <button
          key={name}
          className={`tab-item ${selectedTab === name ? 'active' : ''}`}
          onClick={() => setSelectedTab(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );

  const getFilteredPosts = () => {
    if (selectedTab === 'Home') {
      return posts?.documents;
    }
    // For 'Dorm Swap', we return posts based on the desiredDorm, if set.
    if (selectedTab === 'Dorm Swap') {
      return desiredDorm
        ? posts?.documents.filter(post => post.desiredDormName === desiredDorm)
        : [];
    }
    // For other tabs, filter posts by category
    return posts?.documents.filter(post => post.category === selectedTab)
  };

  const isDormSwapSelected = () => selectedTab === 'Dorm Swap';

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-dark-1 dark:text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-dark-1 dark:text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="home-img-container">
        <img
          className="w-full h-auto object-cover transition-all duration-200 ease-in-out"
          src={"/assets/images/home-img.jpg"}
          alt="Descriptive alt text for the image"
        />
      </div>

      <div className="home-posts-container-container">
        <h2 className="h3-bold md:h2-bold text-left w-full text-light-1">Home Feed</h2>
        {renderTabs()}

          {selectedTab === 'Home' && (
            <div className='home-posts-container'>
              {isPostLoading ? (
                <Loader />
              ) : (
                <ul className="flex flex-col gap-9 w-full">
                  {getFilteredPosts()?.map((post: Models.Document) => (
                    <li key={post.$id} className="flex justify-center w-full">
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {selectedTab === 'Dorm Swap' && (
            <div className="dorm-swap-form-container ml-4 w-1/3">
              <DormSwapForm onSubmit={handleFormSubmit} />
            </div>
          )}
      </div>
    </div>
  );
};

export default Home;
