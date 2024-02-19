import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  // const { toast } = useToast();

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
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="home-img-container">
        <img
          className="w-full h-auto object-cover transition-all duration-200 ease-in-out" /* This will ensure the image covers the container, is fully responsive, and maintains its aspect ratio */
          src={"/assets/images/home-img.jpg"}
          alt="Descriptive alt text for the image"
          /> 
      </div>

      <div className="home-posts-container-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
        <div className="home-posts-container">
          <div className="home-posts">
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {posts?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
