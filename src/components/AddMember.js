import React, { useState } from "react";
import MemberService from "../services/MemberServices";

const AddMember =(props)=>{
    const initialMemberState = {
        id: null,
        name: "",
        teamName: "",
        birthYear: "",
        injury: true
    }
    const [member, setMember] = useState(initialMemberState)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = event => {
        const { name, value } = event.target
        setMember({ ...member, [name]: value})
    }

    const saveMember = () => {
        const data  = {
            name: member.name,
            teamName: member.teamName,
            birthYear: member.birthYear,
            injury: member.injury
        }

        MemberService.create(data)
            .then(res => {
                setMember({
                    id: res.data.id,
                    name: res.data.name,
                    teamName: res.data.teamName,
                    birthYear: res.data.birthYear,
                    injury: res.data.injury
                })
                setSubmitted(true)
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }
    
    const newMember = ()=>{
        setMember(initialMemberState)
        setSubmitted(false)
    }

    const mainMembers =()=>{
        props.history.push("/members")
    }

    return (
        <div className="submit-form">
            <h4>Add Member</h4>
            { submitted ? (
                <div>
                    <h4>you submitted succesfully</h4>
                    <button className="btn btn-success" onClick={newMember}>
                        Add
                    </button>
                    <button className="btn btn-primary" onClick={mainMembers}>
                        All Members
                    </button>
                </div>
            ):(
                <div>
                    <div className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        required 
                        value={member.name} 
                        onChange={handleInputChange} 
                        name="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="teamName">Team Name</label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="teamName"
                        required
                        value={member.teamName}
                        onChange={handleInputChange}
                        name="teamName"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthYear">Birth Year</label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="birthYear"
                        required
                        value={member.birthYear}
                        onChange={handleInputChange}
                        name="birthYear"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="injury">Ready to play</label>
                        <select 
                        name="injury" 
                        id="injury" 
                        className="form-control"
                        value={member.injury}
                        onChange={handleInputChange}
                        >
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <br />
                    <button onClick={saveMember} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddMember