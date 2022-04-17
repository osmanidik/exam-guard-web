import React from "react";
import YouTube from "react-youtube";
//import "./styles/youtubeStyles.css";
export default class YoutubeEmbed extends React.Component {
  state = {
    ready: false,
    playing: null,
    player: null,
    opts: {},
  };
  componentDidMount() {
    this.setState({
      const: {
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          cc_load_policy: 0, //alt yazıları kapat
          rel: 0, //
          // start: this.props.clickedVideoTime,
          mute: 1,
          autoplay: 1,
          //noNeed: this.props.clickCount, //for same word clicks
        },
      },
    });
  }
  onTimeChanges = (time) => {
    this.state.player.seekTo(time);
  };


  loadVideoById = (videoId, timestamp) => {
    this.state.player.loadVideoById(videoId, timestamp);
  };
  _onReady = (event) => {
    this.setState({ player: event.target });
    this.setState({ ready: true });
    event.target.playVideo();
    //event.target.mute();
    this.props.onPlayerReady();
    // access to player in all event handlers via event.target
  };
  _onEnd = (event) => {};
  _onPlay = (event) => {};
  _onPause = (event) => {
    this.setState({ playing: false });
  };
  render() {
    return (
      <YouTube
        videoId={this.props.embedId}
        containerClassName={"youtubeContainer"}
        opts={this.state.opts}
        loading="eager"
        onPlay={this._onPlay}
        onReady={this._onReady}
        onPause={this._onPause}
       // noNeed={this.props.clickedVideoTime}
      />
    );
  }
}
