import React from 'react'
import ParallaxSlider from '../parallaxSlider/ParallaxSlider'
import Link from 'next/link'

const InstallmentsSlider = () => {
  return (
    <div className="installment_slider">

      <div className="installment_slider_container">
        <ParallaxSlider baseVelocity={-0.5}>
          <Link href="/payment-methods" className='installment_slider_item'> Easy payment<span>. . .</span>Easy installment / +15 collaborators all over egypt </Link>
          <Link href="/payment-methods" className='installment_slider_item'> Easy payment<span>. . .</span>Easy installment / +15 collaborators all over egypt </Link>
          <Link href="/payment-methods" className='installment_slider_item'> Easy payment<span>. . .</span>Easy installment / +15 collaborators all over egypt </Link>
        </ParallaxSlider>
      </div>
    </div>
  )
}

export default InstallmentsSlider