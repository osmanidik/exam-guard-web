import "../App.css";
import { initializeApp } from "firebase/app";
import { Container, Row, Col } from "react-grid-system";
import React, { Component } from "react";
import { TreeTable } from "primereact/treetable";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { NodeService } from "../service/NodeService";
import { NodeService2 } from "../service/NodeService2";
import YoutubeEmbed from "./YouTubeEmbed";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import { Image } from 'primereact/image';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Button } from "primereact/button";
const firebaseConfig = {
  apiKey: "AIzaSyCl6GmEgISrQQu7t6n-WbqBOplfluy5rVE",
  authDomain: "exam-guard.firebaseapp.com",
  projectId: "exam-guard",
  storageBucket: "exam-guard.appspot.com",
  messagingSenderId: "507674917189",
  appId: "1:507674917189:web:b82b760d8b768b0f30262c",
  measurementId: "G-EVR4HQ4JW1",
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage(firebaseApp);
// Only loads the YouTube player
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selectedNodeKey: null,
      exam: "",
      course: "",
      user: JSON.parse(localStorage.getItem('user')),
    };

    this.nodeservice = new NodeService();
    this.onSelect = this.onSelect.bind(this);
    this.rowClassName = this.rowClassName.bind(this);
  }

  onSelect(event) {
    let course = event.node.data.parent;
    let exam = event.node.data.name;
    this.toast.show({
      severity: "info",
      summary: "Exam Selected",
      detail: course + " " + exam,
    });
    this.setState({ exam: exam });
    this.setState({ course: course });
  }

  componentDidMount() {
    this.nodeservice
      .getTreeTableNodes()
      .then((data) => this.setState({ nodes: data }));
  }

  rowClassName(node) {
    return { "p-highlight": !node.children };
  }

  // Set the configuration for your app
  // TODO: Replace with your app's config object

  render() {
    return (
      <div>
        <Toast ref={(el) => (this.toast = el)} />
        <div className="card CourseTable">
          <TreeTable
            value={this.state.nodes}
            rowClassName={this.rowClassName}
            selectionMode="single"
            selectionKeys={this.state.selectedNodeKey}
            onSelectionChange={(e) =>
              this.setState({ selectedNodeKey: e.value })
            }
            onSelect={this.onSelect}
          >
            <Column field="name" header="Courses" expander></Column>
          </TreeTable>
        </div>
        <div>
          <Exam exam={this.state.exam} course={this.state.course}></Exam>
        </div>
      </div>
    );
  }
}

export class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selectedNodeKey: null,
      selectedRecord: "",
      videoId: "",
    };

    this.nodeservice2 = new NodeService2(this.props.exam);
    this.rowClassName = this.rowClassName.bind(this);
  }

  onSelect(event) {
    //window.open("/record", "_self")
    this.setState({ selectedRecord: event });
  }

  componentDidUpdate() {
    this.nodeservice2
      .getTreeTableNodes(this.props.course, this.props.exam)
      .then((data) => this.setState({ nodes: data }));
  }

  rowClassName(node) {
    return { "p-highlight": !node.children };
  }

  render() {
    return (
      <div>
        <h3>
          {this.props.course} {this.props.exam}
        </h3>
        <div className="card CourseTable">
          <TreeTable
            value={this.state.nodes}
            rowClassName={this.rowClassName}
            selectionMode="single"
            selectionKeys={this.state.selectedNodeKey}
            onSelectionChange={(e) =>
              this.setState({ selectedNodeKey: e.value })
            }
            onSelect={this.onSelect}
          >
            <Column field="name" header="Students" expander></Column>
          </TreeTable>
        </div>
        <div>
          <Record record={this.state.selectedRecord}></Record>
        </div>
      </div>
    );
  }
}
export class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      riskyMomentCounter: 0,
      stepByStepMode: "on",
      timestampButtons: [],
      firstPaperControl: null,
      idControl: null,
      lastPaperControl: null,
      lastPaperControl2: null,
    };
  }

  componentDidMount() {
    const storage = getStorage(firebaseApp);

    getDownloadURL(ref(storage, "BIL421/20212022SpringFirstExam/161101024/examVideo/ogrenciKayit161101024.mp4"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        this.setState({ video: url });
        console.log(this.state.url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });

      getDownloadURL(ref(storage, "BIL421/20212022SpringFirstExam/161101024/firstPaperCheck/firstpapercontrol_161101024.jpg"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        this.setState({ firstPaperControl: url });
        console.log(this.state.url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
      getDownloadURL(ref(storage, "BIL421/20212022SpringFirstExam/161101024/lastPaperCheck/dosya_161101024.jpg"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        this.setState({ lastPaperControl: url });
        console.log(this.state.url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
      getDownloadURL(ref(storage, "BIL421/20212022SpringFirstExam/161101024/lastPaperCheck/lastpaper_161101024.jpg"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        this.setState({ lastPaperControl2: url });
        console.log(this.state.url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
      getDownloadURL(ref(storage, "BIL421/20212022SpringFirstExam/161101024/idCheck/id_161101024.jpg"))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        this.setState({ idControl: url });
        console.log(this.state.url);
        // Or inserted into an <img> element
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  //<video controls onClick={console.log("aaaa")} autoPlay={true} src="https://firebasestorage.googleapis.com/v0/b/exam-guard.appspot.com/o/BIL421%2Fexam1%2F161101024%2FexamVideo%2FogrenciKayit161101024.mp4?alt=media&token=f7f9c1ae-f0f4-4e82-94f5-28df7f0678f0">
  //</video>
  timestampArray = [
    1798, 5808, 8093, 10490, 11797, 12424, 13527, 14400, 15465, 17465, 17686,
    23523,
  ];
  arrCounter = 0;
  handleStepByStepNext = () => {
    this.setState({ stepByStepMode: "on" });
    if (this.state.riskyMomentCounter + 2 < this.timestampArray.length) {
      this.setState(
        { riskyMomentCounter: this.state.riskyMomentCounter + 2 },
        () => {
          this.handleStepByStepNext2();
        }
      );
    }
  };
  handleStepByStepNext2 = () => {
    this.p.currentTime =
      this.timestampArray[this.state.riskyMomentCounter] / 1000;
    this.p.play();
  };
  handleStepByStepPrevious = () => {
    this.setState({ stepByStepMode: "on" });
    if (this.state.riskyMomentCounter > 1) {
      this.setState(
        {
          riskyMomentCounter: Math.max(0, this.state.riskyMomentCounter - 2),
        },
        () => {
          this.handleStepByStepPrevious2();
        }
      );
    }
  };
  handleStepByStepPrevious2 = () => {
    this.p.currentTime =
      this.timestampArray[this.state.riskyMomentCounter] / 1000;
    this.p.play();
  };

  replayLastRiskyMoment = () => {
    this.setState({ stepByStepMode: "on" });
    this.p.currentTime =
      this.timestampArray[this.state.riskyMomentCounter] / 1000;
    this.p.play();
  };

  goToRiskyMoment = (time) => {
    console.log(time);
      this.p.currentTime = time / 1000;
      console.log(this.p.currentTime);
      this.p.play();
  };
  handlePlaying = () => {
    this.setState({ stepByStepMode: "off" });

    this.arrCounter = 0;
    this.setState({ riskyMomentCounter: 0 });
    this.p.currentTime = this.timestampArray[this.arrCounter] / 1000;
    this.p.play();
  };
  onTimeChange = () => {
    if (
      this.state.stepByStepMode === "off" &&
      this.arrCounter < this.timestampArray.length - 1
    ) {
      if (
        Math.abs(
          this.p.currentTime - this.timestampArray[this.arrCounter + 1] / 1000
        ) < 0.4
      ) {
        this.arrCounter = this.arrCounter + 2;
        this.setState({ riskyMomentCounter: this.arrCounter });
        this.p.currentTime = this.timestampArray[this.arrCounter] / 1000;
        this.p.play();
      }
    } else {

      if (
        Math.abs(
          this.p.currentTime -
            this.timestampArray[this.state.riskyMomentCounter + 1] / 1000
        ) < 0.4
      ) {
        this.p.pause();
      }
    }
  };
  handlePlayerLoad = () => {
    let arr = [];
    this.timestampArray.forEach((element, index) => {
      if (index % 2 == 0) {
        let elem = (
          <Button id={index} onClick={()=>{this.goToRiskyMoment(element)}}>
            {element / 1000}. saniye
          </Button>
        );
        arr.push(elem);
      }
      this.setState({
        timestampButtons: arr,
      });
    });
  };
  render() {
    return (
      <div className="GridCont">
        <Container fluid>
          <Row>
            <Col debug>
              <p>Video</p>
              <video
                onLoadStart={this.handlePlayerLoad}
                onTimeUpdate={this.onTimeChange}
                ref={(p) => {
                  this.p = p;
                }}
                controls
                src={this.state.video}
                width="100%"
                allowFullScreen
              ></video>
              {this.state.stepByStepMode && (
                <p>Riskli An: {this.state.riskyMomentCounter / 2 + 1}</p>
              )}
              <div>
                <Button
                  style={{ backgroundColor: "red" }}
                  onClick={this.handlePlaying}
                >
                  Riskli anlar klibini oynat
                </Button>
              </div>

              <div>
                <Button
                  style={{ backgroundColor: "blue", color:"white" }}
                  onClick={this.handleStepByStepPrevious}
                >
                  Önceki Riskli Anı Oynat: Riskli An{" "}
                  {0 < this.state.riskyMomentCounter ?this.state.riskyMomentCounter / 2 : "YOK" }
                </Button>
                <Button
                  style={{ backgroundColor: "blue", color:"white" }}
                  onClick={this.handleStepByStepNext}
                >
                  Sıradaki Riskli Ana Geç: Riskli An{" "}
                  {this.timestampArray.length > this.state.riskyMomentCounter + 2 ?this.state.riskyMomentCounter / 2 + 2: "YOK" }
                </Button>
              </div>
              <div>
                <Button onClick={this.replayLastRiskyMoment}>
                  Son riskli anı tekrar oynat: Riskli An{" "}
                  {this.state.riskyMomentCounter / 2 + 1}
                </Button>
              </div>
            </Col>
            <Col debug>
                <p style={{marginBottom:0, marginTop:0}}>Loaded Exam Paper</p>
                <Image src={this.state.lastPaperControl} alt="Image" width="250" height="150" preview />
                <p style={{marginBottom:0, marginTop:0}}>ID Check</p>
                <Image src={this.state.idControl} alt="Image" width="250" height="150" preview />
                <p style={{marginBottom:0, marginTop:0}}>Empty Paper Check</p>
                <Image src={this.state.firstPaperControl} alt="Image" width="250" height="150" preview />
                <p style={{marginBottom:0, marginTop:0}}>Preloaded Exam Paper</p>
                <Image src={this.state.lastPaperControl2} alt="Image" width="250" height="150" preview />
            </Col>
          </Row>
          <br></br>
          <Row debug style={{ height: "35vmin" }}>
            <Col debug>
              <p>Riskli Anlar</p>
              {this.state.timestampButtons}
            </Col>
            <Col debug>Menü</Col>
          </Row>
        </Container>
      </div>
    );
  }
}
