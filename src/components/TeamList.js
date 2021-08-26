import React, { useState, useEffect, useMemo, useRef } from "react"
import TeamServices from "../services/TeamServices";
import { useTable } from "react-table"

const TeamList =(props)=>{
    const [teams, setTeams] = useState([])
    const [searchName, setSearchName] = useState("")
    const teamsRef = useRef();

    teamsRef.current = teams

    useEffect(()=>{
        retrieveTeams()
    }, [])

    const onChangeSearchName = (e) =>{
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const retrieveTeams =()=>{
        TeamServices.getAll()
            .then((res)=>{
                setTeams(res.data)
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const refreshList =()=>{
        retrieveTeams()
    }

    const findByTitle =()=>{
        TeamServices.findByTitle(searchName)
            .then((res)=>{
                setTeams(res.data)
                setSearchName("")
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const openTeam = (rowIndex)=>{
        const id = teamsRef.current[rowIndex].id;

        props.history.push("/team/" + id)
    }

    const deleteTeam =(rowIndex)=>{
        const id = teamsRef.current[rowIndex].id;

        TeamServices.remove(id)
            .then((res)=>{
                props.history.push("/teams")

                let newTeams = [...teamsRef.current]
                newTeams.splice(rowIndex, 1)

                setTeams(newTeams)
                console.log(res.data);
                refreshList();
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const createNewMember = ()=>{
        props.history.push("/addmember")
    }

    const columns = useMemo(
        ()=>[
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Nation",
                accessor: "nation"
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props)=>{
                    const rowIdx = props.row.id
                    return (
                        <div>
                            <span onClick={(()=>createNewMember())}>
                                <i class="fas fa-plus-circle action"></i>
                            </span>
                            <span onClick={()=>openTeam(rowIdx)}>
                                <i className="far fa-edit action mr-2"></i>
                            </span>
                            <span onClick={()=>deleteTeam(rowIdx)}>
                                <i className="fas fa-trash action"></i>
                            </span>
                        </div>
                    )
                },
            },
            
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data: teams
    })

    return (
        <div className="list row"> 
        <h4>All Teams</h4>
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control"
                    placeholder="search by name"
                    value={searchName}
                    onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>  
            <div className="col-md-12 list">
                <table 
                className="table table-striped table-bordered"
                {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup)=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column)=>(
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i)=>{
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell)=>{
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


        </div>
    )

}

export default TeamList;