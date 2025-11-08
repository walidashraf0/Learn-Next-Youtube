import Image from "next/image";
import HeroImage from "../../../../public/mylogo.png";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-16">
      <div className="flex flex-col items-center md:items-start gap-8">
        <h2 className="text-8xl font-bold text-blue-500 text-center md:text-left">Hero Page</h2>
        <p className="text-gray-700 max-w-2xl text-center md:text-left">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
          excepturi fugit eligendi tenetur dolorem quae est aliquid dignissimos
          minus quis!
        </p>
      </div>
      <div>
        {/* Image */}
        <Image src={HeroImage} alt="hero" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;
