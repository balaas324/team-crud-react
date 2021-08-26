import React, { useState, useEffect } from "react";
import TeamServices from "../services/TeamServices";

const Team =(props)=>{
    const initialTeamState = {
        id: null,
        name: "",
        nation: ""
    }
    const [currentTeam, setCurrentTeam] = useState(initialTeamState)
    const [message, setMessage] = useState("")

    const getTeam = id => {
        TeamServices.get(id)
            .then(res =>{
                setCurrentTeam(res.data)
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }    

    useEffect(()=>{
        getTeam(props.match.params.id)
    }, [props.match.params.id])

    const handleInputChange = event =>{
        const { name, value }=event.target
        setCurrentTeam({ ...currentTeam, [name]: value})
    }

    const updateTeam=()=>{
        TeamServices.update(currentTeam.id, currentTeam)
            .then(res=>{
                console.log(res.data);
                setMessage("team was updated successfully")
                props.history.push("/teams")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const deleteTeam =()=>{
        TeamServices.remove(currentTeam.id)
            .then(res=> {
                console.log(res.data);
                props.history.push("/teams")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    return(
        <div>
            {currentTeam ? (
                <div className="edit-form">
                    <h4>Team</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                            type="text" 
                            className="form-control"
                            id="name"
                            name="name"
                            value={currentTeam.name}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nation">Nation</label>
                            <input 
                            type="text" 
                            className="form-control"
                            id="nation"
                            name="nation"
                            value={currentTeam.nation}
                            onChange={handleInputChange}
                            />
                        </div>

                    </form>

                    
                    <br />
                    <br />

                    <button 
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={updateTeam}
                    >
                        Update
                    </button>

                    <button 
                    className="btn btn-danger btn-sm"
                    onClick={deleteTeam}
                    >
                        Delete
                    </button>
                    <p>{message}</p>
                </div>
            ):(
                <div>
                    <br />
                    <p>Please click on a team</p>
                </div>
            )}
        </div>
    )

}

export default Team;