import Marquee from "react-fast-marquee";

const Title = ({content}) => {
  return (
    <div
      onMouseEnter={(e)=>{console.dir(e.target.children);}}
      className="w-full h-16"
    >
      <Marquee>
        {content}
      </Marquee>
    </div>
  );
};

export default Title;
