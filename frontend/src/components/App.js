import React from "react"
import { useState, useEffect } from "react"
import { Typography, Button, FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'


export default function App(){
    const [wordToAdd, setWordToAdd] = useState("")
    const [definitionToAdd, setDefinitionToAdd] = useState("")
    const [posesToAdd, setPosesToAdd] = useState("")
    const [words, setWords] = useState([])
    const [definitions, setDefinitions] = useState([])
    const [poses, setPoses] = useState([])

    var csrftoken = getCookie('csrftoken');

    useEffect(() => {
        fetchWords()
    }, []);

    // useEffect(() => {
    //     console.log(words)
    //     console.log(definitions)
    //     console.log(poses)
    // }, [words, definitions, poses])

    function fetchWords(){
        // console.log("Fetching words...")
        fetch("api/get-words")
        .then(response => response.json())
        .then(data => {
            // console.log("data: ")
            // console.log(data.info)
            setWords(data.info.words)
            setDefinitions(data.info.definitions)
            setPoses(data.info.poses)
        })
    }

    function handleWordChange(e){
        setWordToAdd(e.target.value)
    }
    
    function handleDefinitionChange(e){
        setDefinitionToAdd(e.target.value)
    }

    function handlePosesChange(e){
        setPosesToAdd(e.target.value)
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function handleSubmit(){
        const body = {
            word: wordToAdd,
            definition: definitionToAdd,
            part_of_speech: posesToAdd
        }

        const payload = {
			method: "post",
			headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(body)
		}

        fetch("api/add-word", payload)
        .then(response => response.json())
        .then(data => {
            // console.log("Word added!")
            fetchWords()
        })
    }

    function handleDelete(e){
        let word = e.target.value
        const body = {
            word: word,
        }

        const payload = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch("api/delete-word", payload)
        .then(response => response.json())
        .then(data => {
            fetchWords()
        })
    }

    return(
        <div>
            <div className="text-field">
                <Typography variant="h1">Vocabulary Now!</Typography>
                <Typography variant="h5">Add a word to the database to get started!</Typography>
            </div>
            <div className="text-field">
                <FormControl  className="text-field">
                    <InputLabel htmlFor="component-outlined">Word</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={wordToAdd}
                    onChange={handleWordChange}
                    label="Word"
                    />
                </FormControl>
            </div>
            <div className="text-field">
                <FormControl className="text-field">
                    <InputLabel htmlFor="component-outlined">Definition</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={definitionToAdd}
                    onChange={handleDefinitionChange}
                    label="Definition"
                    />
                </FormControl>
            </div>
            <div className="text-field">
                <FormControl className="text-field">
                    <InputLabel htmlFor="component-outlined">Poses</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={posesToAdd}
                    onChange={handlePosesChange}
                    label="Part of speech"
                    />
                </FormControl>
            </div>
            <div className="text-field">
                <Button className="text-field" id="add-button" color="secondary" variant="contained" onClick={handleSubmit} disableElevation>Add</Button>
            </div>
            <br />
            <div className="text-field">
                {(words.length > 0) ? words.map((word, index) => {
                    return(
                    <div key={index}>
                        <Button id="add-button" value={words[index]} color="error" variant="outlined" onClick={handleDelete} disableElevation>Delete {words[index]}</Button>
                        <br />
                        <h1>{words[index]}</h1>
                        <h1>{definitions[index]}</h1>
                        <h1>{poses[index]}</h1>
                        <br />
                    </div>
                )
                }) : <h2>No words</h2>}
            </div>
        </div>
    )
}
