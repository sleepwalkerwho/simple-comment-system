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
        new Services().getComments().then((res)=>{this.setState({name:(res)})}).catch(err=>{console.error(err)})
        setInterval(() => {
            new Services().getComments().then((res)=>{this.setState({name:(res)})}).catch(err=>{console.error(err)})
          }, 5000)
        }


    public render(): ReactNode {
        let res = this.state.name.map(function(item) {
            return <ul>
               <li className="list-01">{item.author}</li>
               <li className="list-02">{item.comment}</li>
               </ul>
         });
        return (
            <div className="div-comments-page" style={{display:"inline-grid"}}>
                <span style={{textAlign:"center"}}><h1>Comment System</h1></span>
                <TextField label="Имя"
                margin="normal"
                value={this.state.author}
                onChange={(event)=>this.changeName(event.target.value)}/>
                <TextField 
                label="Комментарий"
                variant="outlined" placeholder="Введите комментарий. . ." multiline rows={5} rowsMax={10}
                margin="normal"
                value={this.state.comment}
                onChange={(event)=>this.changeComment(event.target.value)}/>
                <Button onClick={()=> {this.handleSubmit()}}
                color="inherit">Отправить комментарий</Button>
                <div style={{textAlign:"center"}}><h2>Комментарии:</h2></div>
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