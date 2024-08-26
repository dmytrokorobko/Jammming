import { Link } from "react-router-dom"

export const UserAccountCorner = ({user}) => {
   return (
      <div className="username">
         <p><Link to='/logout'>Logout</Link></p>
         <h2>Hello, {user.name ? (<Link to={user.urlSpotify} target="_blank">{user.name}<img src={user.avatar} alt="avatar"/></Link>) : 'guest'}</h2>
      </div>
   )
}