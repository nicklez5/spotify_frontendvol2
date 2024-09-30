import axios from "axios"
export default function deleteSong(element){
    axios.delete(`${process.env.REACT_APP_API_URL}/songs/deleteSong/` + element,{
        params: {email: localStorage.getItem("email")},
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
    .then((resp  => {
        console.log(resp)
        
    })
    .catch( function (error) {
        console.log(error)
    })
    .finally(console.log("It succeeded")));
}
