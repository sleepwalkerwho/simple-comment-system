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
                <TextField label="Имя"
                value={this.state.author}
                onChange={(event)=>this.changeName(event.target.value)}/>
                <TextField label="Комментарий"
                value={this.state.comment}
                onChange={(event)=>this.changeComment(event.target.value)}/>
                <Button onClick={()=> {this.handleSubmit()}}>Send Comment</Button>
            </div>
        )
    }
    //валидация поля Имя, устанавливаем в поле Имя значение, введённое пользователем
    private changeName(value:string){
        this.validateName(value)
        this.setState({author:value})
    }
    //валидация поля Имя, устанавливаем в поле Имя значение, введённое пользователем
    private changeComment(value:string){
        this.validateComment(value)
        this.setState({comment:value})
    }
    //для валидации поля Имя
    private validateName(name:string){
        if(name.length>0 && name.length<=300){
            this.setState({validName: true});
            return true
        }
        else if (name.length===0){
            return false
        }
       
    }
    //для валидации поля Комментарий
    private validateComment(comment:string){
        if(comment.length>0 && comment.length <=1000 ){
            this.setState({validComment: true});
            return true
        }
        else if (comment.length===0) {
            return false
        }
    }
    //сообщение об ошибке при валидации
    handleSubmit() {
        if(this.state.validName === false){
            console.log("NOT Validated")
            alert("Поле Имя не должно быть пустым и не превышать 300 символов")
        }
        if(this.state.validComment===false){
            console.log("NOT Validated")
            alert("Поле Комменатрий не должно быть пустым и не превышать 1000 символов")
        }

    }
}