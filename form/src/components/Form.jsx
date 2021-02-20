import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Country from "../resources/currency.json"
import "./Form.css"

class Form extends Component {
    constructor(){
        super()
        this.Forms= {
            FirstPage : { Personal : ["First Name","Last Name","Email","Phone Number"],
                          Business : ["Business Name","Email","Phone Number"] },
            SecondPage : ["Country","Currency","Bank Details Format","ACH Routing Number","Account Number","Account Type"]
            }
        this.CurrentForm = []
        this.Currency = ""
        this.userinput = {}
    }
    OnClickPersonalHandler = () => {
        this.CurrentForm = this.Forms.FirstPage.Personal;
        this.renderOutput()
    }
    
    OnClickBusinessHandler = () =>{
        this.CurrentForm = this.Forms.FirstPage.Business;
        this.renderOutput()
    }

    OnChangeOptionHandler = (event) =>{
        let country = event.target.value;
        Country.map(item=>{
            if(item.country == country)
                this.Currency= item.currency
        })
        this.userinput["Country"]= country 
        this.userinput["Currency"]= this.Currency
        ReactDOM.render(<p className="Currency">{this.Currency}&nbsp; Currency</p>,document.getElementById("currency"))
    }

    OnChangeInputHandler = (event) =>{
        this.userinput[event.target.placeholder] = event.target.value
    }

    OnRadioClickHandler =  (event) =>{
        this.userinput["Bank Details Format"] = event.target.value
    }

    renderOutput(){
        const mapRows = this.CurrentForm.map(item=>{
            if (item == "Country"){
                const Options = Country.map(countryitem=>{
                    return <option id={countryitem.country} value={countryitem.country} >{countryitem.country}</option>
                })
                return <select id="Country" onChange={this.OnChangeOptionHandler}>{Options}</select>
            }
            else if (item == "Currency")
                return <div id="currency"></div>
            else if (item == "Bank Details Format"){
                return <div className="radiobutton">
                            <label className="labelheader">Bank Details Format</label>
                            <div className="radiosubcontainer">
                                <input type="radio" className="radio" value="Local Bank Details" id="Local Bank Details" onClick={this.OnRadioClickHandler}/>
                                <label>Local Bank Details</label>
                            </div>
                            <div className="radiosubcontainer">
                                <input type="radio" className="radio" value="SWIFT Code" id="SWIFT Code" onClick={this.OnRadioClickHandler}/>
                                <label>SWIFT Code</label>
                            </div>
                        </div>
            }
            return <input key={item} type="text" placeholder={item} onChange={this.OnChangeInputHandler}></input>
        }) 
        ReactDOM.render(mapRows,document.getElementById("displaycontents"))
    }

    OnClickNextHandler = () =>{
        let ElementChangerArray=[
            {id:"previousbutton",class:"previousbuttonactive previousbutton"},
            {id:"button1",class:"hidebutton"},
            {id:"button2",class:"hidebutton"},
            {id:"line1",class:"horizontalline activehorizontalline"},
            {id:"box2",class:"box activebox"},
            {id:"text2",class:"activetext"}
        ]
        ElementChangerArray.map(item=>{
            let variable=document.getElementById(item.id);
            variable.setAttribute("class",item.class)
        })
        this.CurrentForm = this.Forms.SecondPage;
        this.renderOutput()
    }

    OnClickPreviousHandler = () =>{
        let ElementChangerArray=[
            {id:"previousbutton",class:"previousbutton"},
            {id:"button1",class:"button"},
            {id:"button2",class:"button"},
            {id:"line1",class:"horizontalline"},
            {id:"box2",class:"box"},
            {id:"text2",class:" "}
        ]
        ElementChangerArray.map(item=>{
            let variable=document.getElementById(item.id);
            variable.setAttribute("class",item.class)
        })
        this.CurrentForm = [];
        this.renderOutput()
    }

    onClickDisplayHandler = () =>{
        let mapRows=[]
        for(const key in this.userinput){
            if (key != "")
                mapRows.push(<li>{key} : {this.userinput[key]}</li>)
        }
        let variable = <ul class="displaycontainer">{mapRows}</ul>
        ReactDOM.render(variable,document.getElementById("display"))
    } 

    render() {
        return (
            <div className="container">
                <div className="subconatiner">
                    <div className="Number">
                        <p className="box activebox" id="box1">1</p>
                        <div className="horizontalline" id="line1" ></div>
                        <p className="box" id="box2">2</p>
                        <div className="horizontalline" id="line2"></div>
                        <p className="box" id="box3">3</p>
                    </div>
                    <div className="names">
                        <p className="activetext" id="text1">Beneficiary</p>
                        <div className="horizontalline white"></div>
                        <p id="text2">Bank Details</p>
                        <div className="horizontalline white"></div>
                        <p id="text3">Address</p>
                    </div>
                    <div className="buttoncontainer">
                        <button className="button" id="button1" onClick={this.OnClickPersonalHandler}>PERSONAL</button>
                        <button className="button" id="button2" onClick={this.OnClickBusinessHandler}>BUSINESS</button>
                    </div>
                    <div id="displaycontents"></div>
                    <div className="buttoncontainer2">
                        <button id="previousbutton" className="previousbutton" onClick={this.OnClickPreviousHandler}>Previous</button>
                        <button className="nextbutton" onClick={this.OnClickNextHandler}>Next</button>
                        <button className="displaybutton" onClick={this.onClickDisplayHandler}>Display</button>
                    </div>
                </div>
                <div id="display"></div>
            </div>
        );
    }
}

export default Form;