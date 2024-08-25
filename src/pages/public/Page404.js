import { Link } from "react-router-dom"

export const Page404 = () => {
   return (
      <>
         <h1>Ooops! Page not found</h1>      
         <Link to={'/'}>Return to Home</Link>
      </>
   )
}