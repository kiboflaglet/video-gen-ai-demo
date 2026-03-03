import { Link } from 'react-router'

const Home = () => {
  return (
    <div>
      <button><Link to={'/login'}> Sign in</Link></button>
      <button><Link to={'/register'}> Sign up</Link></button>
      <button><Link to={'/dashboard'}> Dashboard</Link></button>
    </div>
  )
}

export default Home
