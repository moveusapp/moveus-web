import { FormEvent, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";

function GlobalSearchWidget() {
  const [searchFocused, setSearchFocused] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams.get("q") ?? "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchString.trim()) return;
    
    navigate(`/search?q=${encodeURIComponent(searchString)}`, { replace: true });
  };
    
  return (
    <form onSubmit={handleSearch}
      className={`relative rounded-xl border transition-all ${
        searchFocused
          ? "border-primary bg-base-200 shadow-sm"
          : "border-base-300 bg-base-200"
      }`}
    >
      <HiSearch
        size={16}
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
          searchFocused ? "text-primary" : "text-neutral"
        }`}
      />
      <input
        type="text"
        value={searchString}
        placeholder="Search events, people, posts..."
        className="input w-full pl-10 pr-4 h-10 rounded-xl bg-transparent border-none focus:outline-none text-sm"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </form>
  );
}

export default GlobalSearchWidget;
