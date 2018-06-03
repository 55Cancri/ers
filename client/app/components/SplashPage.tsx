import React from 'react'
import { Link } from 'react-router-dom'

export const SplashPage = () => (
  <div>
    <header>
      <nav className="splash-nav">
        <Link to="#" className="hook item">
          Pricing
        </Link>
        <Link to="/login" className="item">
          Login
        </Link>
        <Link to="/signup" className="item">
          Signup
        </Link>
      </nav>
    </header>
    <main className="splash-body">
      <section className="block -top">
        <h1 className="title">Take Control of Your Money</h1>
        <p className="subtitle">Remove the guesswork from financial planning</p>
        <Link to="/signup" className="cta">
          Try for Free
        </Link>
      </section>
      <section className="block -middle">
        <h2 className="title">Proactively manage income and spending</h2>
        <ul className="list">
          <li>Create accounts that define where your money goes</li>
          <li>assign accounts to a liercentage of your income</li>
          <li>seperate income into accounts based on your percentage</li>
        </ul>
      </section>
      <section className="block -bottom">
        <h2 className="title">Budget with friends and family</h2>
        <p className="text">
          Create shared accounts with others and budget together
        </p>
      </section>
    </main>
    <footer>
      <div>
        <ul>
          <li>About</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div>
        {/* <Link to="https://www.facebook.com">Facebook</Link> */}
        {/* <Link to="https://www.twitter.com">Twitter</Link> */}
      </div>
    </footer>
  </div>
)

export default SplashPage
