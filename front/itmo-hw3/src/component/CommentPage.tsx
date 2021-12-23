import React, {Component, ReactNode} from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Services } from "./Services";
import "./CommentPage.scss"

interface ServerData{
    author:string;
    comment:string;
}

interface States{
    name:ServerData[];
    author:string;
    comment:string;
    validName:boolean;
    validComment:boolean;
}


export class CommentPage extends Component <{},States> {
    constructor(props:any) {
        super(props);
        this.state = {name: [], author: "", comment: "", validName:false,validComment:false}
    }

    async componentDidMount():Promise<void>{

        setInterval(() => {
            new Services().getComments().then((res)=>{this.setState({name:(res)})}).catch(err=>{console.error(err)})
          }, 5000)
        for (var i = 0; i < this.state.name.length; i++) {
            console.log(this.state.name[i].author);
            console.log(this.state.name[i].comment);

    }
}


    public render(): ReactNode {
        let res = this.state.name.map(function(item) {
            return <div>
               <li>Author: {item.author}</li>
               <li>Comment: {item.comment}</li>
               </div>
         });
        return (
            <div className="div-comments-page" style={{display:"inline-grid"}}>
                <TextField label="Имя"
                value={this.state.author}
                onChange={(event)=>this.changeName(event.target.value)}/>
                <TextField 
                variant="outlined" rows={5}
                label="Комментарий"
                value={this.state.comment}
                onChange={(event)=>this.changeComment(event.target.value)}/>
                <Button onClick={()=> {this.handleSubmit()}}>Отправить комменатрий</Button>
                <div>{res}</div>
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
        else
            {
                this.postRequest()
            }

    }
    async postRequest(){
        await axios.post("http://localhost:8080/addComment", {author: this.state.author, comment: this.state.comment}).then(res=>console.log(res))
    }
}