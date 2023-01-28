import React from 'react'
import { Link } from "react-router-dom"
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from 'axios'
// import { CgProfile } from "react-icons/cg"
// import Switcher from './Switcher'
// import Logout from "../supertokens_home/Logout"
// import MobileMenu from './MobileMenu'
// import { useSessionContext } from "supertokens-auth-react/recipe/session";
// import { signOut } from "supertokens-auth-react/recipe/session";

function Navbar({ arrowDirection, setArrowDirection }) {


  //const sessionContext = useSessionContext()
  const sessionContext = { userId: "123" }

  // const [data, setData] = useState([])
  // const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"

  // useEffect(() => {
  //   axios.get(url)
  //     .then((response) => {
  //       setData(response.data)
  //     })
  // }, [url])

  /* 
    const navigate = useNavigate()
  
    const handleSignOut = async () => {
      try {
        await signOut()
        navigate("/")
      } catch (error) {
        console.log(error.message);
  
      }
    } */

  return (
    <div className='navbar'>
      <div className="company-logo">
        <Link to="/" >
          <h1 className='text-2xl'>Alphy</h1>
        </Link>
      </div>
      <div>
        <div className='hidden navbar-right-section md:block'>

          {sessionContext.userId ? (
            <div className='signed-in-navbar'>
              <div className='hidden lg:block'>
                <Link to="/article/new-article" className="navbar-link"> User Hub </Link>
              </div>
              <div onClick={()=>setArrowDirection(arrowDirection == "left" ? "right" : "left")}  className='block lg:hidden'>
              <i className="text-2xl ri-menu-line text-mainText"></i>
              </div>
              {/* <button onClick={handleSignOut} className="navbar-link">Log Out</button> */}
            </div>

          ) : (
            <Link to="/auth">
              Sign In
            </Link>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar