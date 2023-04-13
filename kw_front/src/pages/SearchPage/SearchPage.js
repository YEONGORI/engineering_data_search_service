import Search from "./Search";
import Description from "./Description";
import Output from "./Output";
import DetailModal from "./DetailModal";

import { useState } from "react";
import DeleteModal from "./DeleteModal";
function SearchPage({ auth }) {
  const [searchIndex, setSearchIndex] = useState("");
  const [highlightIndex, setHighlightIndex] = useState("");
  const [image, setImage] = useState();
  const [index, setIndex] = useState();
  const [title, setTitle] = useState();
  const [path, setPath] = useState();
  const [author, setAuthor] = useState();
  const [date, setDate] = useState();
  const [fileURL, setFileURL] = useState();

  //////////////////////////////////////////////////////////
  const [detailModal, setDetailModal] = useState(false);
  /////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////
  const [deleteModal, setDeleteModal] = useState(false); //삭제 할 경우를 위한 모달
  const [deleteList, setDeleteList] = useState([]); // 삭제할 경우 백서버로 보낼 리스트
  ///////////////////////////////////////////////////////////////////////////////////////////

  console.log(highlightIndex);
  const [output, setOutput] = useState([]);

  return (
    <div class="flex flex-col  w-[100vw] h-[80vh]">
      <Description />
      <Search
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
        setOutput={setOutput}
        output={output}
        setHighlightIndex={setHighlightIndex}
      />
      <Output
        output={output}
        setOutput={setOutput}
        highlightIndex={highlightIndex}
        setDetailModal={setDetailModal}
        setImage={setImage}
        setIndex={setIndex}
        setTitle={setTitle}
        setPath={setPath}
        setAuthor={setAuthor}
        setDate={setDate}
        setFileURL={setFileURL}
        deleteList={deleteList}
        setDeleteList={setDeleteList}
        setDeleteModal={setDeleteModal}
      />
      <DetailModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
        image={image}
        index={index}
        title={title}
        path={path}
        author={author}
        date={date}
        fileURL={fileURL}
      />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        auth={auth}
        deleteList={deleteList}
      />
    </div>
  );
}

export default SearchPage;
