import React, { useState } from "react"
import TeamServices from "../services/TeamServices";

const AddTeam =(props)=>{
    const initialTeamState = {
        id: null,
        name: "",
        nation: ""
    }
    const [team, setTeam] = useState(initialTeamState)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const { name, value } = event.target
        setTeam({ ...team, [name]: value})
    }

    const saveTeam = () => {
        const data  = {
            name: team.name,
            nation: team.nation
        }

        TeamServices.create(data)
            .then(res => {
                setTeam({
                    id: res.data.id,
                    name: res.data.name,
                    nation: res.data.nation
                })
                setSubmitted(true)
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const newTeam = ()=>{
        setTeam(initialTeamState)
        setSubmitted(false)
    }

    const mainTeam =()=>{
        props.history.push("/teams")
    }

    return (
        <div className="submit-form">
            <h4>Add Team</h4>
            { submitted ? (
                <div>
                    <h4>you submitted succesfully</h4>
                    <button className="btn btn-success" onClick={newTeam}>
                        Add
                    </button>
                    <button className="btn btn-primary" onClick={mainTeam}>
                        All Teams
                    </button>
                </div>
            ):(
                <div>
                    <div className="form-group">
                        <label htmlFor="name">
                            Name of the Team
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        required 
                        value={team.name} 
                        onChange={handleInputChange} 
                        name="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="teamName">Nationality of the Team</label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="nation"
                        required
                        value={team.nation}
                        onChange={handleInputChange}
                        name="nation"
                        />
                    </div>

                    <br />
                    <button onClick={saveTeam} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddTeam;
