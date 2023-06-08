import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IoCaretBackOutline, IoCaretForwardOutline } from 'react-icons/io5';


import { contentArray } from './contentArray';

const buttonStyles = "w-[5vw] h-[5vw] rounded-full bg-white bg-opacity-50 absolute z-40 top-1/2 flex items-center justify-center "

function Slideshow() {
    const [focusedPicIndex, setFocusedPicIndex] = useState(0);
  
  useEffect(() => {
    console.log(focusedPicIndex)
  },[focusedPicIndex])
    
  // useEffect(() => {
  //     console.log(focusedPicIndex+ "/"+(contentArray.length-1))
  //       setTimeout(() => {
  //           if (focusedPicIndex === contentArray.length - 1) {setFocusedPicIndex(0)
  //       }
  //       else{setFocusedPicIndex(focusedPicIndex+1)}
  //       },3000)
        
  //   },[focusedPicIndex])

  const handleNavClick = (incr) => {
    if (incr > 0) {
      if (focusedPicIndex === contentArray.length - 1) { setFocusedPicIndex(0) }
      else {setFocusedPicIndex(focusedPicIndex+1)}
    }

    if (incr < 0) {
      if (focusedPicIndex === 0) { setFocusedPicIndex(contentArray.length - 1) }
      else {setFocusedPicIndex(focusedPicIndex-1)}
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden relative">
      <div className='relative w-full h-full'>
        <motion.div
          className={buttonStyles + "left-5"}
          whileTap={{scale: 0.8}}
          onClick={() => { handleNavClick(-1)}}><IoCaretBackOutline/></motion.div>
        <motion.div
          className={buttonStyles + "right-5"}
          whileTap={{scale: 0.8}}
          onClick={()=>{handleNavClick(+1)}}><IoCaretForwardOutline/></motion.div>
      </div>
      {contentArray.map((entry, index) => {
        const isFocused = focusedPicIndex === index;
        const shiftedIndex = (index + (contentArray.length - 1) - focusedPicIndex) % contentArray.length;

        const isWaitingPicture = focusedPicIndex === (index + 1) % (contentArray.length);
        
        const isLastPicture = index === (focusedPicIndex + contentArray.length-2) % (contentArray.length)
        

        
        

        return (
          <motion.div
            key={entry.pic}
            className={`absolute w-screen h-full bg-center bg-no-repeat bg-cover`}
            style={{ backgroundImage: `url(${entry.pic})` }}
            
            animate={
              isFocused || isWaitingPicture ?
                    
                {
                      
                  zIndex: isWaitingPicture ? 5 : 10,
                  width: "100%",
                  height: "100%"
                }
                    
                :

                {
                  scale: 0.2,
                  zIndex: shiftedIndex + 20,
                  x: shiftedIndex * 5 + "vw",
                  y: shiftedIndex*5 + "%",
                  right: "-30vw",
                  top: "0vh",
                  width: "1000px",
                  height: "1200px",
                  boxShadow: "80px 80px 100px",
                  borderRadius: "20px",
                  transition: isLastPicture?{duration: 0}:{duration: 0.5, ease:"anticipate"} 
                  
                        
                    }
        }
            transition={{duration: 0.5, ease:"anticipate"}}
          />
          
        );
      })}
      <AnimatePresence>
        <motion.div
          className='absolute z-50 -translate-y-1/2 max-w-[800px] left-[10vw] w-[50%] p-4 rounded-md text-white bg-gray-1000'
          key={focusedPicIndex}
          initial={{ scale: 0}}
          animate={{ scale: 1}}
          exit={{ scale: 0}}
          transition={{delay: 0.2}}>
          <div>
            <p className='text-5xl font-semibold mb-5'>{contentArray[focusedPicIndex].header}</p>
            <p className='text-xl'>{contentArray[focusedPicIndex].text}</p>
          </div>
              </motion.div>
          </AnimatePresence>

    </div>
  );
}

export default Slideshow;
