import React, {Component, ReactNode} from "react";
import { Button, TextField } from "@material-ui/core";
//import "./CommentPage.scss"

interface States{
    //name:ServerData[];
    author:string;
    comment:string;
    validName:boolean;
    validComment:boolean;
}


export class CommentPage extends Component <{},States> {
    constructor(props:any) {
        super(props);
        this.state = {author: "", comment: "", validName:false,validComment:false}
    }

    public render(): ReactNode {
        return (
            <div className="div-comments-page" style={{display:"inline-grid"}}>
                <TextField label="Nickname"
                value={this.state.author}
                onChange={(event)=>this.changeName(event.target.value)}/>
                <TextField label="Comment"
                value={this.state.comment}
                onChange={(event)=>this.changeComment(event.target.value)}/>
                <Button onClick={()=> {this.handleSubmit()}}>Send Comment</Button>
            </div>
        )
    }
    private changeName(value:string){
        this.validateName(value)
        this.setState({author:value})
    }

    private changeComment(value:string){
        this.validateComment(value)
        this.setState({comment:value})
    }

    private validateName(name:string){
        if(name.length>2){
            this.setState({validName: true});
            return true
        }
        else if (name.length===0){
            return false
        }
       
    }
    private validateComment(comment:string){
        if(comment.length>2){
            this.setState({validComment: true});
            return true
        }
        else if (comment.length===0) {
            return false
        }
    }

    handleSubmit() {
        if(this.state.validName === false){
            console.log("NOT Veryficated")
            alert("Поле имя не должно быть пустым и не превышать 300 символов")
        }
        if(this.state.validComment===false){
            console.log("NOT Veryficated")
            alert("Поле комменатрий не должно быть пустым и не превышать 1000 символов")
        }

    }
}