import React, {Component, ReactNode} from "react";
import { Button, TextField } from "@material-ui/core";
import "./CommentPage.scss"

export class CommentPage extends Component {

    public render(): ReactNode {
        return (
            <div className="div-comments-page">
                <TextField label="Nickname"/>
                <TextField label="Comment"/>
                <Button>Send Comment</Button>
            </div>
        )
    }
}