import axios from "axios"
import React, {useState, useEffect, MouseEvent, setState} from 'react'
import { Link } from "react-router-dom";
import s from "../css/dashboard.module.css"
import Button from "../Buttons/Button";
import SongService from "../services/SongService";
import PlaylistService from "../services/PlaylistService";
import deleteSong from "../components/Functions";
export default class Dashboard extends React.Component{
    constructor(){
        super();
        this.state = {
            email: localStorage.getItem('email'),
            songs: [],
            filename: ''
            
        }
        axios.get(`${process.env.REACT_APP_API_URL}/songs/all`,
            {
                params: {email: this.state.email },
                headers: { 
                    'Content-Type': "application/json"
                }
            })
            .then((response => {
                console.log(response.data)
                for(let i = 0; i < response.data.length ; i++){
                    this.state.songs.push(response.data[i]);
                    
                }
                for(let i = 0 ; i < response.data.length; i++){
                    //console.log("NOT ENCODED " + response.data[i].fileDownloadUri)
                    const encoded = encodeURI(response.data[i].fileDownloadUri)
                    //console.log("ENCODED " + encoded)
                    this.state.songs[i].fileDownloadUri = encoded;
                        
                }
                this.setState({
                    songs: this.state.songs
                })
                console.log(this.state.songs)
        }))
        
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/songs/all`,
            {
                params: {email: this.state.email },
                headers: { 
                    'Content-Type': "application/json"
                }
            })
            .then((response => {
                console.log(response);
            })
        )
        
    }
    
    
    download = (data) => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/songs/download/` + data.fileDownloadUri,
        {
            headers: {
                'Content-Type': "audio/mp3"
            }
        })
        .then((response => {
            console.log(response.request.responseURL)
            console.log(response)
            window.location.href = response.request.responseURL
        }))}
    
     addToPlaylist = (song) => {
        console.log(song)
        try{
            PlaylistService.addSongToPlaylist(song)
            .then((resp) => {
                console.log(resp)
            }).catch((err) => {
                console.log(err)
            })
        }catch{
            console.log("Failed");
        }
     }
     handleClick = (element) => {
        console.log(element)
        try{
            axios.delete(`${process.env.REACT_APP_API_URL}/songs/deleteSong/` + element ,{
                params: {email: this.state.email }
            }).then((resp) => {
                console.log(resp)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                window.location.reload();
            })
        }catch{
            console.log("Failed")
            
        }
        
       
    }
    logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

        
    
        
       // window.location.href = '/'
    
    
   
       
    

    render(){
        
        return (
            <div className={s.outside2}>
                <ul>
                    <li className={s.li123_}><a className={s.li123_a} href="/home">Home</a></li>
                    <li className={s.li123_}><a className={s.li123_a} href="/dashboard">Library</a></li>
                    <li className={s.li123_}><a className={s.li123_a} href="/playlists">Playlists</a></li>
                    <li className={s.li123_}><a className={s.li123_a} href="/settings">Settings</a></li>
                </ul>
                <div>
                    <header className={s.centeredheader2}>
                        Welcome to Spotify
                    </header>
                </div>
                <table className={s.table_1}>
                    <thead className={s.thead123}>
                        <tr className={s.tablerows}>
                            <th>id</th>
                            <th>title</th>
                            <th>artist</th>
                            <th>Filename</th>
                            <th>Links</th>
                            <th>Song</th>
                            <th>Functions</th>
                        </tr>
                    </thead>
                    <tbody className={s.Table2}>
                        {this.state.songs.map((songs,index) => (
                                
                                <tr className="table-rows2" key={songs.id} onClick={this.fetchSongDetails}><th className={s.tablecolumns2}>{songs.id}</th>
                                    <th data-title="Title" className={s.tablecolumns2}>{songs.title}</th>
                                    <th data-title="Artist" className={s.tablecolumns2}>{songs.artist}</th>
                                    <th data-title="Filename" className={s.tablecolumns2}>{songs.fileName}</th> 
                                    <th data-title="FileDownloadUri" className={s.tablecolumns2}><a className={s.link1} href={songs.fileDownloadUri}>Download me</a></th>    
                                    {/* <button className="button123" onClick={() => this.download(songs.fileDownloadUri)}>Download</button>                           */}
                                    <audio controls>
                                        <source className={s.mySong} src={songs.fileDownloadUri} type="audio/mp3" />
                                    
                                    </audio>
                                    
                                    <th className={s.tablecolumns2}><button className="button-combo" onClick={() => this.handleClick(songs.id)}>Delete Me</button> <button className="button-combo" onClick={() => this.addToPlaylist(songs.id)}>Add to playlist</button>  </th>
                                     
                                </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
                <bink to="/" onClick={() => this.logout()}className={s.button321}>Logout</bink>
                
                <button to="/" onClick={() => window.location.href = "/addMusic"} className={s.buttonforever}>Add a song</button>
    
                </div>
        )
    }
    
}

