import React, { Component } from "react";
import axios from "axios";
import Timer from "./timer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./takeExam.css";

class TakeExam extends Component {
  state = {
    startTime: "",
    endTime: "",
    examDuration: 0,
    examId: "",
    answerText: "",
    exam: [],
    questions: [],
    answers: [],
    values: [],
    questionId: "",
    tabIndex: 0,
  };
  //     "https://run.mocky.io/v3/1efb72d8-0bcc-4b1c-af64-94d2170516e4"
  async componentDidMount() {
    const { data: examsDetails } = await axios.get(
      "https://run.mocky.io/v3/5978cc53-7e27-40ca-a07d-e0e18061fad2"
    );

    const examDetails = examsDetails.find(
      (obj) => obj.examId === this.props.match.params.examId
    );

    const questions = examDetails.questions;
    const startTime = examDetails.startTime;
    const endTime = examDetails.endTime;
    this.setState({ startTime });
    this.setState({ endTime });
    this.setState({ examId: this.props.match.params.examId });
    this.setState({ exam: examDetails });
    this.setState({ questions });

    let onedayStartTime = new Date(startTime);
    let onedayEndTime = new Date(endTime);
    let today = new Date();
    console.log("today", today);
    let st =
      onedayStartTime.getFullYear() +
      "-" +
      (onedayStartTime.getMonth() + 1) +
      "-" +
      onedayStartTime.getDay();

    // let et =
    //   onedayEndTime.getFullYear() +
    //   "-" +
    //   (onedayEndTime.getMonth() + 1) +
    //   "-" +
    //   onedayEndTime.getDay();

    let td =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay();

    console.log("onedayEndTime.getTime()", onedayEndTime.getTime());
    console.log(
      "today.getTime() - onedayStartTime.getTime()",
      today.getTime() - onedayStartTime.getTime()
    );
    console.log("st-td", st - td);
    let examDuration = 0; //in seconds
    //first we check if today is the day of exam then we check if today time >= start time
    if (st === td) {
      if (today.getTime() - onedayStartTime.getTime() >= 0) {
        examDuration = Math.floor(
          (onedayEndTime.getTime() - today.getTime()) / 1000
        );
        console.log("duration", examDuration);
      }
    }
    this.setState({ examDuration });
    //console.log("c", date);

    // console.log(typeof this.state.examId);
    // console.log(questions);
  }

  handelChange = (q, event) => {
    const value = event.target.value;

    const answer = {
      examId: this.props.examId,
      questionId: q.questionNum,
      answerText: value,
    };
    console.log(answer);
    const answers = [...this.state.answers];
    const index = answers.findIndex((ans) => {
      return ans.questionId === answer.questionId;
    });
    console.log(index);
    if (answers.length === 0 || index < 0) {
      answers.push(answer);
    } else {
      answers[index] = answer;
    }

    let values = [...this.state.values];
    let tIndex = this.state.tabIndex;

    values[tIndex] = answer.answerText;

    this.setState({ values });
    this.setState({ answers });

    console.log("value", values);
    console.log("answer???");
    console.log(this.state.answers);
  };

  showValue = (questionId) => {
    const answers = [...this.state.answers];
    const index = answers.findIndex((ans) => {
      return ans.questionId === questionId;
    });
    console.log(index);
    if (answers.length === 0 || index < 0) {
      return "";
    } else {
      return answers[index].answerText;
    }
  };

  handleSubmit = () => {
    //validation needed
    this.doSubmit();
  };

  doSubmit = async () => {
    //call the server
    console.log("calling server...");
    const { data } = await axios.put(
      "https://run.mocky.io/v3/0c12d192-aaff-4622-91e5-031f977be9dc",
      this.answers
    );
    console.log(data);
    this.props.history.replace("/my-exams");
  };

  handleRadioChange = (e) => {
    let values = [...this.state.values];
    let tIndex = this.state.tabIndex;

    values[tIndex] = e.target.value;

    this.setState({ values });
  };

  render() {
    if (this.state.examDuration <= 0)
      return (
        <div className="container main_exam">
          <h1>exam time{this.state.endTime}is passed!</h1>
        </div>
      );
    return (
      <div className="container main_exam">
        <h1>exam title: {this.state.exam.examName}</h1>
        <p class="timer">
          <Timer
            seconds={this.state.examDuration}
            history={this.props.history}
          />
        </p>
        <h2>
          class name:
          <br />
          {this.state.exam.className}
        </h2>
        <br />
        <br />
        <Tabs
          defaultIndex={0}
          onSelect={(i) => {
            console.log(i);
            this.setState({ tabIndex: i });
            console.log("tabindex", this.state.tabIndex);
          }}
        >
          <TabList>
            {this.state.questions.map((q, index) => {
              return <Tab key={q.questionNum}>{index + 1}</Tab>;
            })}
            <Tab key={this.state.questions.length}>Submit</Tab>
          </TabList>
          {this.state.questions.map((q, index) => {
            return (
              <TabPanel key={q.questionNum}>
                {`${index + 1}. `}
                {q.questionDescription}
                {q.questionTypeId === 2 ? (
                  <div>
                    <input
                      type="text"
                      onChange={this.handelChange.bind(this, q)}
                      value={this.state.values[this.state.tabIndex]}
                    />
                    <br />
                  </div>
                ) : q.questionTypeId === 1 ? (
                  <div onChange={this.handelChange.bind(this, q)}>
                    {q.choices.map((c, index) => {
                      return (
                        <label key={index + 1}>
                          <input
                            type="radio"
                            value={c.choiceDescription}
                            name="questionTypes"
                            checked={
                              c.choiceDescription ===
                              this.state.values[this.state.tabIndex]
                            }
                            onChange={this.handleRadioChange.bind(this)}
                          />
                          {c.choiceDescription}
                          <br />
                        </label>
                      );
                    })}
                  </div>
                ) : null}
              </TabPanel>
            );
          })}
          <TabPanel key={this.state.questions.length}>
            Submit once finished
            <br />
            <button onClick={this.handleSubmit}>submit answers</button>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default TakeExam;
