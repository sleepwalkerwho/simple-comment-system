import axios from "axios"

interface ServerData{
    author:string;
    comment:string;
}

export class Services {
    public async getComments(): Promise<ServerData[]> {
        let response = await axios.get<ServerData[]>("http://localhost:8080/allComments");
        return response.data;
    }
}