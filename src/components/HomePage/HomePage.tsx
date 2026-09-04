import Hero from "./Hero/Hero";
import WebPlans from "./WebPlans/WebPlans";

const HomePage = () => {
  console.log("Home Page is Called");
  return (
    <div>
      <Hero />
      <WebPlans />
    </div>
  );
};

export default HomePage;
