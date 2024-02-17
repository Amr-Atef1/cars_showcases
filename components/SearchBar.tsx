"use client";

import { useState } from "react";
import { SearchButton, SearchManufacturer } from ".";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const Router=useRouter()
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manufacturer === "" || model === "")
      return alert("please fill the search bar");
      updateSearchParams(model.toLocaleLowerCase(),manufacturer.toLocaleLowerCase())
  };

  const updateSearchParams= (model:string,manufacturer:string)=>{
    
    
    const searchParams=new URLSearchParams(window.location.search)
    if(model){
      searchParams.set('model', model)
    }else{
      searchParams.delete('model')
    }

    if(manufacturer){
      searchParams.set('manufacturer', manufacturer)
    }else{
      searchParams.delete('manufacturer')
    }
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    Router.push(newPathname, {scroll: false})
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
