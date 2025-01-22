import React from 'react'
import './Vision.css'

const Vision = () => {
  return (
    <>
    <div style={{marginTop:'8rem'}}> 
    <h1 className="text-center">VISION & MISSION</h1>
 <div className='vm-box'> 
      <div className='vision-back'>
          <b className='vision-head'> Vision </b>
          <div>
            <span style={{ marginLeft: '2rem' }}> </span>To nourish humanity with wholesome food and spread the joy of well-being.
            Our brand vision is to become the leading platform for healthy homemade food, where customers can trust and rely on us to understand and care for their needs while making a deeper social impact in the communities we serve. We strive to be an inclusive brand, promoting healthy eating lifestyles and equal opportunities for all.
          </div>
        </div>
        <br />
        <div className='vision-back'>
          <b className='vision-head'> Mission </b>
          <div>
            <span style={{ marginLeft: '2rem' }}> </span>Empowering communities with accessible and nutritious mom-food through technology and home kitchens.
            Our mission is to enable homemade food to be accessible to everyone, to improve well-being through the power of technology, and to unlock 100,000 home kitchens to create a better India in 2 years.
          </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default Vision