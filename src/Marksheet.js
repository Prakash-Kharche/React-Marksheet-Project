import React from 'react'
import "./Marksheet.css"

class Marksheet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            REnglish: "",
            RHindi: "",
            RMaths: "",
            RSanskrit: "",
            RSoScience: "",
            RScience: "",

            Result: "",
            Percentage: "",
            Division: "",
            Grace: "",
            GSubject: "",
            Dictention: [],
            Marks: [90, 88, 86, 85, 95, 80],
            SupplySub: [],
            GrandT: ""
        }

        this.Submit = this.Submit.bind(this);
    }


    Submit() {
        let { Grace: G, GSubject: GSub, Percentage, Marks: M, SupplySub: SSub, Dictention: D} = this.state;
        let sum = 0;
        let S = this.props.subject;
        let c = 0;
        let num = 0;

        Main: for (let i = 0; i < 1; i++) {

            for (let l = 0; l < S.length; l++) {

                if (M[l] < 0 || M[l] > 100) {

                    alert("Please input Valid Number")
                    break Main;

                } if (M[l] < 33) {
                    c++
                    SSub[0] = S[l];
                    num = M[l];
                }

            } if (c >= 2) {
                this.setState({ Result: "Fail" })
                break Main;
            }

            for (let k = 0; k < S.length; k++) {
                if (c === 1 && num < 28) {
                    this.setState({ Result: "Supply" })
                    break Main;
                }
                if (c === 0 || c === 1) {

                    if (M[k] < 33 && M[k] >= 28) {
                        G = 33 - M[k]
                        M[k] = M[k] + G
                        this.setState({ Grace: `${G}` })

                        GSub = S[k]
                        this.setState({ GSubject: `${GSub}` })

                    }
                }
            }
            if (G >= 0 && (c === 0 || c === 1)) {
                let Z = 0;
                for (let j = 0; j < S.length; j++) {
                    sum = sum + M[j];
                    if (M[j] >= 75) {
                        D[Z] = S[j]
                        Z++
                    }
                }

                Percentage = sum / S.length

                if (!Number.isInteger(Percentage)) {
                    Percentage = Percentage.toFixed(2);
                }

                this.setState({ GrandT: `${sum}`});
                this.setState({ Result: "Pass" })
                this.setState({ Percentage: `${Percentage}%` })
            }
            if ((Percentage) >= 33 && (Percentage) <= 45) {
                this.setState({ Division: "3 rd" })

            } else if ((Percentage) > 45 && (Percentage) <= 60) {
                this.setState({ Division: "2 nd" })

            } else if ((Percentage) > 60 && (Percentage) <= 100) {
                this.setState({ Division: "1 st" })
            }
        }

    }

    render() {
        let x = this.props.subject;
        let remark = "";
        let newList = x.map((item) => {

            if (this.state.Dictention.includes(item)) {
                remark = "D"
            }
            else if (this.state.GSubject === item) {
                remark = `# ${this.state.Grace} No Grace`
            }
            else if (this.state.Result === "Fail") {
                remark = "F"
            }
            else if (this.state.SupplySub.includes(item)) {
                remark = "# Supply"
            }
            else {
                remark = ""
            }
            return (

                <tr>
                    <th scope="row"> {x.indexOf(item) + 1} </th>
                    <td> {item}</td>
                    <td> 100 </td>
                    <td> {this.state.Marks[x.indexOf(item)]}</td>
                    <td> {remark} </td>
                </tr>

            )
        })

        return (
            <div className="container-fluid m-0">
                <div className='row justify-content-evenly'>

                    <div className='col col-md-12 bg-dark p-4 h1 text-center m-0'>
                        <span className='text-warning'>MARK ~</span>  <span className='text-light'>SHEET </span>
                    </div>

                </div>

                <div className='row justify-content-evenly'>
                    <div className='col col-md-12 p-0'>
                        <table className="table table-warning table-hover">
                            <thead>
                                <tr>
                                    <th scope="col"> S. No </th>
                                    <th scope="col"> Subject</th>
                                    <th scope="col"> Total Marks </th>
                                    <th scope="col"> Marks Obtained </th>
                                    <th scope="col"> Remarks </th>
                                </tr>
                            </thead>
                            <tbody>
                                {newList}
                                <tr>
                                    <td colSpan={3} className="text-center">
                                        Total Marks 600
                                    </td>
                                    <td colSpan={2}>
                                        {this.state.GrandT}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='row justify-content-evenly bg-dark p-4'>

                    <div className='col-12 m-2 col-lg-3 p-3 bg-warning border rounded d-flex '>
                        <p className='text-light h4'> Result : </p>
                        <p className='h5'> {this.state.Result} </p>
                    </div>

                    <div className='col-12 m-2 col-lg-3 p-3 bg-warning border rounded d-flex '>
                        <p className='text-light h4'> Division :</p>
                        <p className='h5'> {this.state.Division} </p>
                    </div>

                    <div className='col-12 m-2 col-lg-3 p-3 bg-warning border rounded d-flex '>
                        <p className='text-light h4'> Percentage : </p>
                        <p className='h5'> {this.state.Percentage} </p>
                    </div>

                </div>

                <div className='row justify-content-evenly bg-dark text-center'>
                    <div className='col col-md-12 p-2'>
                        <button type="button" className="btn btn-outline-light col-5" onClick={this.Submit}>SUBMIT</button>
                    </div>
                </div>


            </div>
        )
    }

}

export default Marksheet