import React, {FC} from 'react'
import AboutCard from './AboutCard'

import slider from '../../assets/about-us-slider.png'
import aboutWaves from '../../assets/icons/about waves.svg'
import vision from '../../assets/icons/vision.svg'
import mission from '../../assets/icons/mission.svg'
import theStory from '../../assets/icons/the story.svg'



const aboutCards = [
  {
    id : 1,
    title: "About Waves",
    description : 'In Waves Seasons we design an amazing getaway for our audience to become the most anticipated destination for them and their families to create memorable moments and live the best experience ever that could be tailored specially for them. Every season of our journey will carry a new surprising story behind it.' ,
    logo: aboutWaves
  },
  {
    id : 2,
    title: "The Story",
    description : 'We live in an era that is fast paced and changes in trends happen on a daily basis. What’s the next big thing is always the most asked question!       We created a concept that will have the answer, so join us and lets all ride the trendy “WAVES”' ,
    logo: theStory
  },
  {
    id : 3,
    title: "Vision",
    description : 'To become one of the most sought out seasonal events in Dubai.' ,
    logo: vision
  },
  {
    id : 4,
    title: "Mission",
    description : 'To offer our clients an amazing experience that will create memorable moments at the best gathering destination in Dubai.' ,
    logo: mission
  },

  {
    id : 5,
    title: "Our Values",
    points : ['- Joy', '- Loyalty', '- Atmosphere'],
    logo: theStory
    // description : '- Joy - Loyalty - Atmosphere' 
  },
  
]
const AboutUs:FC = () => {
  return (
    <div className='bg-white w-full flex flex-col items-center justify-center'>
      <div style={{backgroundImage : `url(${slider})`}}
        className="main__slider relative w-full h-[35vh] bg-primary bg-no-repeat bg-cover" 
        > 
      <h2 className='absolute  text-6xl md:text-8xl font-bold text-white max-md:w-full max-md:text-center md:right-[15%] top-[25%]'>About Us</h2>
      </div>
      <div className="cards w-full py-8 px-4 md:px-14 flex max-xl:flex-col gap-6 flex-wrap justify-evenly items-center">
      {aboutCards?.map(el=> <AboutCard 
      key={el.id}
      title={el.title}
      description={el.description}
      points={el.points}
      logo={el.logo}
      />
      )}
      </div>
    </div>
  )
}

export default AboutUs