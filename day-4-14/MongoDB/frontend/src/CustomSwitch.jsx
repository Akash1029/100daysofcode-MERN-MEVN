import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import TopBarProgress from "react-topbar-progress-indicator"

const CustomSwitch = ({ children }) => {
   const [progress, setProgress] = useState(false)
   const [prevLoc, setPrevLoc] = useState("")
   const location = useLocation()

   useEffect(() => {
      setPrevLoc(location.pathname)
      setProgress(true)
      if(location.pathname===prevLoc){
          setPrevLoc('')
          //thanks to ankit sahu
      }
   }, [location])

   useEffect(() => {
      setProgress(false)
   }, [prevLoc])

   return (
      <>
         {progress && <TopBarProgress />}
         {children}
      </>
   )
}

export default CustomSwitch
