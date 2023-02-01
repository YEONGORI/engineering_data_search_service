import Search from "./Search";
import Description from "./Description";
import Output from "./Output";
import { useState } from "react";
function SearchPage() {
  const [searchIndex, setSearchIndex] = useState("");

  const [output, setOutput] = useState([]);

  return (
    <div class="flex flex-col  w-[100vw] h-[80vh]">
      <Description />
      <Search
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        setOutput={setOutput}
        output={output}
      />
      <Output output={output} setOutput={setOutput} />
    </div>
  );
}

export default SearchPage;
