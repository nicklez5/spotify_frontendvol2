import s from "./../css/HomePage.module.css"
import Signup from "./Signup"
import React from "react"
export default class HomePage extends React.Component {
logout = () => {
    localStorage.clear()
    window.location.href = "/"
}
render(){
  return (
    <>
    <div className={s.outside}>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/dashboard">Library</a></li>
            <li><a href="/playlists">Playlists</a></li>
            <li style={{marginRight: 10}}><a href="/settings">Settings</a></li>
        </ul>
    
        <div className={s.center_div}>
        <h1>Welcome to Spotify</h1>
            <header className={s.header}>
                Hello
            </header>
            <p className={s.p}>{localStorage.getItem('email')}</p>
            
        </div>
        <button to="/" onClick={() => this.logout()} className={s.button321}>Logout</button>
    </div>
    </>
)
 }
}
