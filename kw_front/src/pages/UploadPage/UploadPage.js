import Upload from "./Upload";
import Description from "./Description";
function UploadPage({ myUserName }) {
  return (
    <div class="flex flex-col w-[100vw] h-[80vh]">
      <Description />
      <Upload myUserName={myUserName} />
    </div>
  );
}

export default UploadPage;
