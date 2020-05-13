import React, { Component } from 'react';
import YouTube from 'react-youtube';
import axios from "axios";
import M from 'materialize-css'

import './styles/app/App.css'

const baseApiUrl = "http://localhost:5000"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        axios.get(`${baseApiUrl}/getVideos`)
            .then(res => {
                this.setState({
                    videos: res.data
                })
            })
            .then(() => {
                console.log(this.state.videos)
            })
    }

    render() {
        const options = {
            height: "480",
            width: "854"
        }

        return (
            <div>
                <div className="page-main">
                    <div className="page-title-collection">
                        <div className="container">
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="col s6">
                                    {this.state.videos.map((video, key) => (
                                        <div className={"video-" + video.videoId} key={video.videoId}>
                                            <h3>{video.title}</h3>
                                            <YouTube videoId={video.videoId} opts={options} />
                                        </div>
                                    ))}
                                </div>
                                <div className="col-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
