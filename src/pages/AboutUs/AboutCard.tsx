import React, { FC } from 'react'

type propsType = {
  title : string,
  description ?: string,
  points ? : string[] ,
  logo : any
}
const AboutCard:FC<propsType> = props => {
  return (
    <div className='slider relative min-h-[275px] md:w-[600px] max-md:w-[80vw] max-md:cursor-pointer'>

    <div 
      className="slider_front absolute top-0 left-0 right-0 bottom-0 md:relative w-full h-full max-md:p-4 max-md:rounded-2xl max-md:border-[3px] max-md:border-[#98b0d2]
      max-md:bg-[#9bb0d217] max-md:cursor-pointer"
      >
      <div 
        className="max-md:hidden absolute right-[0%] top-[15%]
                  h-[170px] w-[250px] bg-[#8fb3d5] rounded-3xl
                  before:content-[''] before:absolute
                  before:border-t-[transparent] before:border-l-[transparent] before:border-b-[transparent] 
                  before:border-r-[#8fb3d5] before:rounded-br-lg before:border-[75px]
                  before:-left-[57%] before:top-[6.5%]
                  before:bg-transparent
                  ">
        <img src={props.logo} alt={props.title} className="max-w-[170px] mx-auto"/>
      </div>
      <h2 className="relative max-md:text-center max-md:w-full title w-max text-primary text-3xl mb-6 before:content-[''] before:bg-secondary before:w-[110px] before:h-2 before:left-0 max-md:before:left-[30%] before:-bottom-3 before:absolute ">{props.title}</h2>
      {props.description && <p className='max-md:hidden text-[#6f6e6e] max-w-[275px]'>{props.description}</p>}
      {props?.points?.map(el=> <p className='max-md:hidden text-[#6f6e6e] max-w-[275px]'>{el}</p>)}
      <img src={props.logo} alt={props.title} className="md:hidden max-w-[125px] max-md:mt-8 mx-auto"/>
    </div>

    <div className="backface absolute top-0 left-0 right-0 bottom-0  md:hidden min-h-[275px] md:w-[600px] max-md:w-[80vw] max-md:p-4 max-md:rounded-2xl max-md:border-[3px] max-md:border-[#98b0d2]
      max-md:bg-[#9bb0d217] max-md:cursor-pointer rotate slider_backface flex flex-col justify-center items-center">
              {props.description && <p className=' text-[#6f6e6e] max-w-[100%] text-center'>{props.description}</p>}
      {props?.points?.map(el=> <p className=' text-[#6f6e6e] max-w-[100%] text-center'>{el}</p>)}
    </div>
    </div>
  )
}

export default AboutCard