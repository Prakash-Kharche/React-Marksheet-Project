import React from 'react'
import Marksheet from './Marksheet';

export default class MarksheetData extends React.Component {

    render() {
        var list = ["English", "Hindi", "Maths", "Sanskrit", "So Science", "Science"];
     
        return (
            <div> <Marksheet subject = {list}/> </div>
        )
    }
}
