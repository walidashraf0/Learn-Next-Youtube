import Hero from "./Hero/Hero"
import WebPlans from "./WebPlans/WebPlans"

const HomePage = () => {
  console.log("HomePage is rendering");
  return (
    <div>
        <Hero />
        <WebPlans />
    </div>
  )
}

export default HomePage