"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Header } from "../(components)/header";
import { TaskCard } from "../(components)/taskCard/TaskCard";
import { ProjectCard } from "../(components)/projectCard/ProjectCard";
import { UserCard } from "../(components)/userCard/UserCard";
import { LoadingError } from "../(components)/loadingError/LoadingError";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);
  return (
    <section aria-labelledby="search-page" className="p-8">
      <Header name="Search" />
      <div>
        <label className="sr-only" htmlFor="search-input">
          Search somethig
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow bg-gray-100 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-600 dark:text-white dark:placeholder-white"
          onChange={handleSearch}
        />
      </div>
      <div className="pt-5 flex gap-5">

        <LoadingError isLoading={isLoading} isError={isError} errorMessage="Error occurred while fetching search results."/>
  
        {!isLoading && !isError && searchResults && (
            <div>
                {searchResults.tasks && searchResults.tasks?.length > 0 && (
                    <h2 className="pb-3 text-lg pl-1 font-semibold dark:text-white">Tasks</h2>
                )}
                <div className="flex flex-wrap gap-y-1 gap-x-4">
                {searchResults.tasks?.map((task)=>(
                    <TaskCard key={task.id} task={task}/>
                ))}
                </div>
                

                {searchResults.projects && searchResults.projects?.length > 0 && (
                    <h2 className="pb-3 text-lg pl-1 font-semibold dark:text-white">Projects</h2>
                )}
                <div className="flex flex-wrap gap-4 flex-1 ">
                {searchResults.projects?.map((project)=>(
                    <ProjectCard key={project.id} project={project}/>
                ))}
                </div>
                

                {searchResults.users && searchResults.users?.length > 0 && (
                    <h2 className="pb-3 text-lg pl-1 font-semibold dark:text-white">Users</h2>
                )}
                <div className="flex flex-wrap gap-4 flex-1">
                {searchResults.users?.map((user)=>(
                    <UserCard key={user.userId} user={user}/>
                ))}
                </div>
                
            </div>
        ) }
      </div>
    </section>
  );
};

export default Search;
