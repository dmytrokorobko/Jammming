import { Link } from "react-router-dom"

export const Home = () => {
   return (
      <section>
         <h1>Welcome to music project</h1>
         <Link to='/login'>Connect to Spotify</Link>
      </section>
   )
}