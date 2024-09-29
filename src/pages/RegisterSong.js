import React, {useState} from 'react'
import axios from "axios";
import { Link } from "react-router-dom"
import SongService from '../services/SongService';
import s from '../css/addMusic.module.css';
export default function AddMusic(){
    const [status,setStatus] = useState('');
    const [title,setTitle] = useState('')
    const [artist,setArtist] = useState('')
    const [file,setFile] = useState('')
    const email = localStorage.getItem('email')
    async function handleMusic(e){
        console.log(e);
        e.preventDefault();
        try{
            SongService.upload(email,title,artist,file).then((resp) => {
                setStatus('success')
            
            })
        }catch(error){
            setStatus('error');
        }
    }
    return (
        <div className={s.outside}>
            <ul>
                <li className={s.li123_}><a className={s.li123_a} href="/">Home</a></li>
                <li className={s.li123_}><a className={s.li123_a} href="/dashboard">Library</a></li>
                <li className={s.li123_}><a className={s.li123_a} href="/playlists">Playlists</a></li>
                <li className={s.li123_}><a className={s.li123_a} href="/about">Settings</a></li>
            </ul>
            
                <header className={s.header1}>Add a song</header>
            <Link to="/dashboard" className={s.goback}>Go back?</Link>
            <div className={s.background123}>
                <form className={s.addMusicForm} onSubmit={handleMusic}>
                    <div className={s.title1}>
                        <label htmlFor="title">Title:</label>
                        <input onChange={e => {setTitle(e.target.value)}} type="title" placeholder="Enter your title"/> 
                    </div>
                    <div className={s.artist}>
                        <label htmlFor="artist">Artist:</label>
                        <input onChange={e => {setArtist(e.target.value)}} type="title" placeholder="Enter your artist"/> 
                    </div>
                    <div className={s.file}>
                        <label htmlFor="file">File:</label>
                        <input type="file" onChange={e => {setFile(e.target.files[0])}} placeholder="Submit the file"/>
                    </div>
                    <button className={s.button1} type="submit">Submit</button>
                    {status === 'success' && (<p className={s.textsuccess}>Successfully uploaded</p>)}
                    {status === 'error' && <p>Fail to upload</p>}
                </form>
            </div>
        </div>
        
    )
}