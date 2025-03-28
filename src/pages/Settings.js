import React, {useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import UserService from '../services/UserService'
import a from "../css/settings.module.css"

export default class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            status: false
        }
    }
    componentDidMount(){
        try{
            UserService.info(localStorage.getItem('email'))
            .then((resp) => {
                this.setState({
                    name: resp.data.fullName,
                    email: resp.data.email
                })
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                console.log("Personal information succeeded");
            })
        }catch{

        }
    }
    logout = () => {
        localStorage.clear()
        window.location.href = '/'
      }
    
    render(){
        return (
            <div className={a.outside_layer}>
            <ul className={a.ul123}>
                <li className={a.li123}><a className={a.li123a}href="/">Home</a></li>
                <li className={a.li123}><a className={a.li123a} href="/dashboard">Library</a></li>
                <li className={a.li123}><a className={a.li123a} href="/playlists">Playlist</a></li>
                <li className={a.li123}><a className={a.li123a} href="/settings">Settings</a></li>
            </ul>
            <div>
                <header className={a.div123}>Personal information</header>
            </div>
            <div>
                <h1 className={a.h1123}>Name: </h1><p className={a.p123}>{this.state.name}</p>
                <h1 className={a.h2123}>Email: </h1><p className={a.p1234}>{this.state.email}</p>
            </div>
            <Link to="/" className={a.goback1}>Go back</Link>
            <button to="/" onClick={() => this.logout()} className={a.button3214}>Logout</button>
        </div>
        )
    }
}