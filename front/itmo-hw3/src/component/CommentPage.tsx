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
    ServerData:ServerData[];
    author:string;
    comment:string;
    timer:any;
}


export class CommentPage extends Component <{},States> {
    readonly service: Services = new Services()
    constructor(props:any) {
        super(props);
        this.state = {ServerData: [], author: "", comment: "", timer:""}
    }
    private interval:any
    async componentDidMount():Promise<void>{
    //todo
        this.service.getComments().then((res)=>{this.setState({ServerData:(res)})}).catch(err=>{console.error(err)})
        this.interval = setInterval(() => {
            this.service.getComments().then((res)=>{this.setState({ServerData:(res)})}).catch(err=>{console.error(err)})
          }, 5000)
        }
        
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    public render(): ReactNode {
        let res = this.state.ServerData.map(function(item) {
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
        this.setState({author:value})
    }
    //валидация поля Имя, устанавливаем в поле Имя значение, введённое пользователем
    private changeComment(value:string){
        this.setState({comment:value})
    }
    //для валидации поля Имя
    private validateName(name:string){
        if(name.length>0 && name.length<=300){
            return true
        }
        else {
            return false
        }
       
    }
    //для валидации поля Комментарий
    private validateComment(comment:string){
        if(comment.length>0 && comment.length <=1000 ){
            return true
        }
        else {
            return false
        }
    }
    //сообщение об ошибке при валидации
    handleSubmit() {
        if(!this.validateName(this.state.author)){
            console.log("NOT Validated")
            alert("Поле Имя не должно быть пустым и не превышать 300 символов")
        }
        if(this.validateComment(this.state.comment)===false){
            console.log("NOT Validated")
            alert("Поле Комменатрий не должно быть пустым и не превышать 1000 символов")
        }
        else
        { 
            this.postRequest()
            this.setState({author:"",comment:""})
        }

    }
    async postRequest(){
        await axios.post("http://localhost:8080/addComment", {author: this.state.author, comment: this.state.comment}).then(res=>console.log(res))
    }

}