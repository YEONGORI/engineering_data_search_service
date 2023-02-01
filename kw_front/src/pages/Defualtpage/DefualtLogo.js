import image from "./광운대로고.jpg";
import ance from "./안세기술로고.jpg";

function DefualtLogo() {
  return (
    <div>
      <div class="flex flex-row justify-center">
        <img src={image} class="kwlogosize" />
        <img src={ance} />
      </div>
    </div>
  );
}

export default DefualtLogo;
