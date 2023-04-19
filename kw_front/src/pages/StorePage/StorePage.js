import Description from "./Description";
import Project from "./Project";
import Path from "./Path";
function StorePage({ auth }) {
  return (
    <div class="flex flex-col w-[100vw] h-[90vh]">
      <Description class="w-[100vw] h-[85vh]" />
      <div class="flex space-x-4 w-[100vw] h-[80vh]">
        <Path />
        <Project />
      </div>
    </div>
  );
}

export default StorePage;
