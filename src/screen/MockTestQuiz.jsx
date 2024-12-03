  import React, { useEffect, useState } from "react";
  import MainLayout from "../components/MainLayout";
  import { Link } from "react-router-dom";
  import axios from "axios";
  import parse from "html-react-parser";
  import { toast, ToastContainer } from "react-toastify";
  import "../assets/styles/MockTest.css";
  let mockTest_id = "67000a073f382a89862e47cb";
  function MockTestQuiz() {
    const [subId, setSubId] = useState(null);
    const [qusetionId,setQusetionId] = useState('');
    const [data, setData] = useState([]);
    const [subjectQuestions, setSubjectQuestion] = useState([]);
    const [subSelectedOption, setSubSelectedOption] = useState([]);
    const [currentQue, setCurrentQue] = useState(0);
    const [currentSub, setCurrentSub] = useState(0);
    const [questionNum, setQuestionNum] = useState(0);
    const [allQuestions, setAllQuestions] = useState([]);
    const [viewQuestion, setVeiwQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [timeLeft, setTimeLeft] = useState(45 * 60);

    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjY3MjA5NDQ0OWVlYTA2YTc4OTlmMDU1NSIsImVtYWlsIjoiZG9sbG9wLnlhc2hAZ21haWwuY29tIiwiaWF0IjoxNzMzMjA1MzcwLCJleHAiOjE3MzMyOTE3NzB9.GkrBr4jaYbQuzrwt8j1SfxV7CFrs6A66QWtRosy0Uw4";

    const handleData = () => {
      const array={
        mockTestId: "671b2c6f0383db0a5cdd90a7",
        mockTestName: "English Mock Test",
        durationInMinutes: 10,
        subjects: [
          {
            subjectId: "671b2a580383db0a5cdd8b36",
            subjectName: "English",
            numberOfQuestions: 3,
          },
          {
            subjectId: "671a4c79dd870c2153936814",
            subjectName: "Hindi",
            numberOfQuestions: 3,
          },
        ],
        subjectQuestions: [
          {
            subjectId: "671b2a580383db0a5cdd8b36",
            questions: [
              {
                questionId: "671b2b8f0383db0a5cdd8f30",
                subjectId: "671b2a580383db0a5cdd8b36",
                question:
                  '<p>Once upon a time, in a dense forest, there was a huge, old banyan tree that was home to many birds and animals. The tree provided shelter, food, and protection for all its inhabitants. The birds built nests in its branches, and the animals found safety in its shade. One day, a great storm swept through the forest, shaking the tree to its roots. The birds clung to the branches, and the animals huddled together under the tree, hoping it would survive the storm.</p><p>&nbsp;</p><figure className="media"><oembed url="https://youtu.be/W0CLcHqtQ_s?si=mw54nagfL6Zs6pH9"></oembed></figure>',
                options: [],
                questionType: "Question Bank",
                typeOfQuestion: "Comprehensive",
                subQuestions: [
                  {
                    subQuestionId: "671b2bda0383db0a5cdd8f89",
                    questionId: "671b2b8f0383db0a5cdd8f30",
                    question:
                      '<p>What was the banyan tree a home to?</p><figure className="image"><img style="aspect-ratio:225/225;" src="http://192.168.0.13:5003/uploads/ckFinder/1729834341628.jfif" width="225" height="225"></figure>',
                    options: [
                      "<p>Only birds</p>",
                      "<p>Only animals</p>",
                      "<p>Both birds and animals</p>",
                      "<p>None of the above</p>",
                    ],
                  },
                  {
                    subQuestionId: "671b2c090383db0a5cdd8fb6",
                    questionId: "671b2b8f0383db0a5cdd8f30",
                    question:
                      '<p>What did the tree provide to its inhabitants?</p><figure className="image"><img style="aspect-ratio:300/168;" src="http://192.168.0.13:5003/uploads/ckFinder/1729834368526.jfif" width="300" height="168"></figure>',
                    options: [
                      "<p>Shelter and food</p>",
                      "<p>Water and shelter</p>",
                      "<p>Food and water</p>",
                      "<p>None of the above</p>",
                    ],
                  },
                  {
                    subQuestionId: "671b2c3c0383db0a5cdd8fe3",
                    questionId: "671b2b8f0383db0a5cdd8f30",
                    question:
                      '<figure className="image"><img style="aspect-ratio:320/157;" src="http://192.168.0.13:5003/uploads/ckFinder/1729834381989.jfif" width="320" height="157"></figure><p>What happened to the banyan tree during the storm?</p>',
                    options: [
                      "<p>It was uprooted</p>",
                      "<p>It caught fire</p>",
                      "<p>It shook to its roots</p>",
                      "<p>It fell</p>",
                    ],
                  },
                ],
              },
              {
                questionId: "671b2b6c0383db0a5cdd8eba",
                subjectId: "671b2a580383db0a5cdd8b36",
                question:
                  '<p>In Shakespeare’s play <i>Julius Caesar</i>, who warns Caesar to "Beware the Ides of March"?</p><figure className="media"><oembed url="https://youtu.be/W0CLcHqtQ_s?si=mw54nagfL6Zs6pH9"></oembed></figure>',
                options: [
                  "<p>Brutus</p>",
                  "<p>Mark Antony</p>",
                  "<p>Soothsayer</p>",
                  "<p>Cassius</p>",
                ],
                questionType: "Question Bank",
                typeOfQuestion: "General",
                subQuestions: [],
              },
              {
                questionId: "671b2b250383db0a5cdd8e44",
                subjectId: "671b2a580383db0a5cdd8b36",
                question:
                  '<p>Who is the author of the poem "The Road Not Taken"?</p><figure className="image"><img style="aspect-ratio:283/178;" src="http://192.168.0.13:5003/uploads/ckFinder/1729834439073.jfif" width="283" height="178"></figure>',
                options: [
                  "<p>William Wordsworth</p>",
                  "<p>Robert Frost</p>",
                  "<p>John Keats</p>",
                  "<p>Walt Whitman</p>",
                ],
                questionType: "Question Bank",
                typeOfQuestion: "General",
                subQuestions: [],
              },
            ],
          },
         
          {
            subjectId: "671a4c79dd870c2153936814",
            questions: [
              {
                questionId: "671b30110383db0a5cdd96a8",
                subjectId: "671a4c79dd870c2153936814",
                question:
                  '<p>प्रकृति हमारे जीवन का अभिन्न अंग है। यह हमें न केवल जीवन प्रदान करती है, बल्कि हमारे अस्तित्व को बनाए रखने में भी अहम भूमिका निभाती है। प्रकृति की गोद में शांति और सुकून मिलता है। हरियाली से घिरे पहाड़, शांत झीलें, बहती नदियाँ, और सुंदर वनस्पतियाँ हमारे मन को शांति प्रदान करती हैं। लेकिन आधुनिक युग में मानव ने अपने स्वार्थ के कारण प्रकृति का दोहन करना शुरू कर दिया है। वृक्षों की अंधाधुंध कटाई, जल प्रदूषण, वायु प्रदूषण और धरती का क्षरण हमारी प्राकृतिक धरोहर को नष्ट कर रहा है। अगर हम समय रहते नहीं संभले, तो इसका दुष्परिणाम आने वाली पीढ़ियों को भुगतना पड़ेगा। इसलिए, यह हमारी ज़िम्मेदारी है कि हम प्रकृति का संरक्षण करें और इसे फिर से हरा-भरा बनाएं।&nbsp;</p><figure className="media"><oembed url="https://youtu.be/tcdqfenq0Bo?si=2ouCWneryXQQPeyx"></oembed></figure>',
                options: [],
                questionType: "Question Bank",
                typeOfQuestion: "Comprehensive",
                subQuestions: [
                  {
                    subQuestionId: "671b30470383db0a5cdd9714",
                    questionId: "671b30110383db0a5cdd96a8",
                    question:
                      "<p>गद्यांश के अनुसार प्रकृति का क्या महत्त्व है?</p>",
                    options: [
                      "<p>यह हमारे जीवन को मुश्किल बनाती है।</p>",
                      "<p>यह हमें जीवन प्रदान करती है और शांति देती है।</p>",
                      "<p>यह केवल पेड़-पौधे उगाने के लिए है।</p>",
                      "<p>इसका कोई खास महत्त्व नहीं है।</p>",
                    ],
                  },
                  {
                    subQuestionId: "671b307e0383db0a5cdd9769",
                    questionId: "671b30110383db0a5cdd96a8",
                    question: "<p>मनुष्य किस प्रकार प्रकृति का दोहन कर रहा है?</p>",
                    options: [
                      '<figure className="image"><img style="aspect-ratio:300/168;" src="http://192.168.0.13:5003/uploads/ckFinder/1729835153608.jfif" width="300" height="168"></figure><p>पेड़ लगा कर</p>',
                      "<p>प्रदूषण फैलाकर और वृक्षों की कटाई से</p>",
                      "<p>अधिक भोजन करके</p>",
                      "<p>जल संरक्षण करके</p>",
                    ],
                  },
                ],
              },
              {
                questionId: "671b2f190383db0a5cdd9598",
                subjectId: "671a4c79dd870c2153936814",
                question: '<p>अंधे के हाथ बटेर लगना" का सही अर्थ क्या है?</p>',
                options: [
                  "<p>मेहनत करने से सफलता मिलना</p>",
                  "<p>बिना परिश्रम के कुछ प्राप्त होना</p>",
                  "<p>कठिन परिश्रम करना</p>",
                  "<p>असंभव को संभव करना</p>",
                ],
                questionType: "Question Bank",
                typeOfQuestion: "General",
                subQuestions: [],
              },
              {
                questionId: "671b2fc70383db0a5cdd962a",
                subjectId: "671a4c79dd870c2153936814",
                question: "<p>इनमें से कौन-सा शब्द सही लिखा गया है</p>",
                options: [
                  "<p>संपती</p>",
                  "<p>संपत्ति</p>",
                  "<p>संपति</p>",
                  "<p>संम्पत्ति</p>",
                ],
                questionType: "Question Bank",
                typeOfQuestion: "General",
                subQuestions: [],
              },
            ],
          },
          
        ]}
      setData(array);
      //set active subject
      setSubId( array.subjects[0]?.subjectId);
      //set current question ID
      setQusetionId(qusetionId?qusetionId:array.subjectQuestions[0].questions[0].questionId)
      // set all subjects questions
      setSubjectQuestion( array.subjectQuestions);
      const flat =  array.subjectQuestions?.flatMap((item, mainIndex) =>
        item.questions.map((value, index) => value)
      );
      setAllQuestions(flat);
    };
    const handleQuizQuestions = async () => {
      try {
        const result = await axios.get(
          "http://192.168.0.22:5003/mockTest/getAllQuestionById?",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              mockTest_id: mockTest_id,
              subject_id: subId,
            },
          }
        );
        if (result.status === 200) {
          setData(result.data.data);
          //set active subject
          setSubId(subId ? subId : result.data.data.subjects[0]?.subjectId);   
          setQusetionId(qusetionId?qusetionId:result.data.data.subjectQuestions[0].questions[0].questionId)
          setSubjectQuestion(result.data.data.subjectQuestions);
          const flat = result.data.data.subjectQuestions?.flatMap(
            (item) => item.questions.map((value) => value)
          );
          setAllQuestions(flat);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    useEffect(() => {
      if (mockTest_id) {
        handleData(); //static data
        // handleQuizQuestions(); // api data fetching
      }
    }, []);
    // show active subject 
    const handleClickSubject = (sub, i) => {
      setSubId(sub.subjectId);
      setCurrentSub(i);
      setCurrentQue(0);
      const id=subjectQuestions[i].questions[0].questionId
      handleViewNum(id)
      setQusetionId(id)
      handleViewQuestion(qusetionId)
    };
    // set next and previous question data  
    const handleSubAndQue = (i) => {
      try {
        if (
          subjectQuestions[currentSub].questions.length === i &&
          currentSub === data.subjects.length - 1
        ) {
          toast.error("No Questions");
        } else if (subjectQuestions[currentSub].questions.length - 1 < i) {
          setCurrentSub(currentSub + 1);
          setCurrentQue(0);
          setSubId(subjectQuestions[currentSub + 1].subjectId);
          const questionId=subjectQuestions[currentSub+1].questions[0].questionId
          handleViewNum(questionId)
          setQusetionId(questionId)
          handleViewQuestion(qusetionId)     
        } else if (i < 0) {
          setCurrentSub(currentSub - 1);
          setCurrentQue(subjectQuestions[currentSub - 1].questions.length - 1);
          setSubId(subjectQuestions[currentSub - 1].subjectId);
          const questionId=subjectQuestions[currentSub-1].questions[subjectQuestions[currentSub - 1].questions.length-1].questionId
          setQusetionId(questionId)
          handleViewNum(questionId)
          handleViewQuestion(qusetionId)  
        } else if(currentQue<i){
          setCurrentQue(i);
          const questionId=subjectQuestions[currentSub].questions[i-1].questionId
          setQusetionId(subjectQuestions[currentSub].questions[i].questionId)
          handleViewNum(subjectQuestions[currentSub].questions[i].questionId)
          handleViewQuestion(questionId)
        }else{
          setCurrentQue(i);
          const questionId=subjectQuestions[currentSub].questions[i+1].questionId
          setQusetionId(subjectQuestions[currentSub].questions[i].questionId)
          handleViewNum(subjectQuestions[currentSub].questions[i].questionId)
          handleViewQuestion(questionId)
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleSubmit=()=>{

    }
    //replace any tag using html parser 
    const options = {
      replace: (domNode) => {
        // Handle <img> tags
        if (domNode.name === "img") {
          const { src } = domNode.attribs;
          return (
            <img
              src={src}
              width={500}
              height={400}
              className="img-fluid"
              alt="Content Thumbnail"
            />
          );
        }
        // Handle <oembed> for videos
        if (domNode.name === "oembed") {
          const videoUrl = domNode.attribs.url;
          const embedUrl = videoUrl.replace("youtu.be/", "youtube.com/embed/");
          return (
            <iframe
              className="emded1"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        }
      },
    };
    const handleClickQues=(id,index)=>{
      setQuestionNum(index)
      setQusetionId(id);
      const questionIn=subjectQuestions[currentSub].questions.findIndex((item,index)=>item.questionId===id)
      setCurrentQue(questionIn)
      if(qusetionId!==id){
        handleViewQuestion(qusetionId)
      }
      console.log(index,questionNum);
    }
    const handleViewNum=(id)=>{
      allQuestions.map((item,index)=>{
        if(item.questionId===id){
          setQuestionNum(index);
        }
      })
    }
    const handleViewQuestion=(id)=>{
      const showQuestion=viewQuestion.some((item)=>item.id===id)
      if(!showQuestion){
        setVeiwQuestions([
          ...viewQuestion,
        {id:id}
        ])}
    }

    const handleOptions = (questionId, i) => {
      // console.log(selectedOption);
      const selIndex = selectedOption.findIndex(
        (option) => option.questionId === questionId
      );
      if (selIndex !== -1) {
        if (selectedOption[selIndex].index === i) {
          const updatedOption = selectedOption.filter(
            (option, index) => index !== selIndex
          );
          setSelectedOption(updatedOption);
        } else {
          const updatedOption = [...selectedOption];
          updatedOption[selIndex].index = i;
          setSelectedOption(updatedOption);
        }
      } else {
        setSelectedOption([
          ...selectedOption,
          { questionId: questionId, index: i },
        ]);
      }
    };
    const handleSubOptions = (questionId, subQuestionId, optIndex) => {
      const selIndex = subSelectedOption.findIndex(
        (option) =>
          option.questionId === questionId &&
          option.subQuestionId === subQuestionId
      );
      if (selIndex !== -1) {
        if (subSelectedOption[selIndex].index === optIndex) {
          const updatedOption = subSelectedOption.filter(
            (_, index) => index !== selIndex
          );
          setSubSelectedOption(updatedOption);
        } else {
          const updatedOption = [...subSelectedOption];
          updatedOption[selIndex].index = optIndex;
          setSubSelectedOption(updatedOption);
        }
      } else {
        setSubSelectedOption([
          ...subSelectedOption,
          {
            questionId: questionId,
            subQuestionId: subQuestionId,
            index: optIndex,
          },
        ]);
      }
    };
       
    useEffect(() => {
      setInterval(() => {
         if (timeLeft > 0) {
           setTimeLeft(timeLeft - 1);
         } 
       }, 1000);
     }, [timeLeft]);
 
     const formatTime = (seconds) => {
       const hours = Math.floor(seconds / 3600);
       const minutes = Math.floor((seconds % 3600) / 60);
       const remainingSeconds = seconds % 60;
 
       return { hours, minutes, remainingSeconds };
     };
     const time = formatTime(timeLeft);
 
    return (
      <MainLayout>
        <div className="row">
          <div className="text-start fs-5 fw-bold ">{data.mockTestName}</div>
          <div className="col-sm-7 col-md-8 col-lg-8 ">
            <nav className="navbar navbar-expand navbar-light py-3 overflow-x-auto">
              <div className="">
                <div>
                  <ul className="navbar-nav fw-medium ">
                    {data?.subjects?.map((sub, index) => {
                      return (
                        <li className="nav-item p-2" key={index}>
                          <Link
                            className={`nav-link rounded-2 p-2 ${
                              subId === sub.subjectId ? "active" : ""
                            }`}
                            aria-current="page"
                            to=""
                            onClick={() => handleClickSubject(sub, index)}
                          >
                            {sub.subjectName}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </nav>
            <div className=" text-start fw-bold">Question {questionNum +1}</div>
            <hr />
            {subjectQuestions?.map((item, index) => (
              <div>
                {item.questions?.map((que, qIndex) => (
                  <div className="text-start">
                    {/* main question */}
                    {subId === que.subjectId && qIndex === currentQue
                      ? parse(que.question, options)
                      : ""}
                    {/* main Option */}
                    {subId === que.subjectId && qIndex === currentQue
                      ? que.options?.map((option, optIndex) => (
                          <div
                            className="form-check py-1 d-flex justify-content -start"
                            key={optIndex}
                          >
                            <label className="form-check-label d-flex align-items-start">
                              <label className="checkbox-wrapper ">
                                <input
                                  type="checkbox"
                                  checked={selectedOption.some(
                                    (option) =>
                                      option.questionId === que.questionId &&
                                      option.index === optIndex
                                  )}
                                  onChange={() =>
                                    handleOptions(que.questionId, optIndex)
                                  }
                                />
                              </label>
                              {
                                <label className="d-flex justify-content-start align-items-start text-start">
                                  <div className="">
                                    {String.fromCharCode(65 + optIndex)}.
                                  </div>
                                  &nbsp;
                                  {option
                                    .replace(/<[^>]*>/g, "")
                                    .replace(/&nbsp;/g, "")}
                                </label>
                              }
                            </label>
                          </div>
                        ))
                      : ""}
                    {/* print sub question  */}
                    {subId === que.subjectId && qIndex === currentQue
                      ? que.subQuestions?.map((sub, subIndex) => {
                          return (
                            <div key={subIndex}>
                              <div className="d-flex justify-content-start">
                                <label className="fw-bold">
                                  {" "}
                                  {subIndex + 1}.
                                </label>
                                <div className=" text-start">
                                  {parse(sub.question, options)}
                                </div>
                              </div>
                              {/* sub Options */}
                              {sub.options?.map((option, optIndex) => (
                                <div
                                  className="form-check py-1 d-flex justify-content -start"
                                  key={optIndex}
                                >
                                  <label className="form-check-label d-flex align-items-start">
                                    <label className="checkbox-wrapper ">
                                      <input
                                        type="checkbox"
                                        checked={subSelectedOption.some(
                                          (option) =>
                                            option.questionId ===
                                              que.questionId &&
                                            sub.subQuestionId ===
                                              option.subQuestionId &&
                                            option.index === optIndex
                                        )}
                                        onClick={() =>
                                          handleSubOptions(
                                            que.questionId,
                                            sub.subQuestionId,
                                            optIndex
                                          )
                                        }
                                      />
                                    </label>
                                    {
                                      <label className="d-flex justify-content-start align-items-start text-start">
                                        <div className="">
                                          {String.fromCharCode(65 + optIndex)}.
                                        </div>
                                        &nbsp;
                                        {option
                                          .replace(/<[^>]*>/g, "")
                                          .replace(/&nbsp;/g, "")}
                                      </label>
                                    }
                                  </label>
                                </div>
                              ))}
                            </div>
                          );
                        })
                      : ""}
                  </div>
                ))}
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <button
                className=" btn active"
                disabled={currentQue === 0 && currentSub === 0}
                onClick={() => handleSubAndQue(currentQue - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className=" btn active"
                onClick={() => handleSubAndQue(currentQue + 1)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-sm-5 col-md-4 col-lg-4 pt-4">
            <div className=" text-start p-3 bg-secondary-subtle right-side rounded-4 h-100">
              <div
                className="rounded-4 p-2 text-light"
                style={{ backgroundColor: "#1a1a97" }}
              >
                <i className="fa-regular fa-clock"></i>{" "}
                <label className=" fw-medium">Time Left </label>
                <div className="d-flex gap-4 time ">
                  <div>
                    <div className="fs-2 fw-medium time">
                      {10 > time.hours ? "0" + time.hours : time.hours}
                    </div>
                    <span>Hours</span>
                  </div>
                  <div>
                    <div className="fs-2 fw-medium time">
                      {10 > time.minutes ? "0" + time.minutes : time.minutes}
                    </div>
                    <span>Minute</span>
                  </div>
                  <div>
                    <div className="fs-2 fw-medium time">
                      {10 > time.remainingSeconds
                        ? "0" + time.remainingSeconds
                        : time.remainingSeconds}
                    </div>
                    <span>Seconds</span>
                  </div>
                </div>
              </div>

              <div className="py-4 d-flex justify-content-start align-items-center flex-wrap gap-3">
                {allQuestions?.map((item, index) => {
                  return subId === item.subjectId ? (
                    item.typeOfQuestion === "Comprehensive" ||
                    item.typeOfQuestion === "Poem" ? (
                      <button
                        className={`${
                          item.subQuestions.every((val) =>
                            subSelectedOption.some(
                              (option) =>(
                                option.subQuestionId === val.subQuestionId)
                            )
                          )
                            ?"btn-success":viewQuestion?.some((val,index)=>val.id===item.questionId)?'active'
                            : "not-view"
                        } btn question-btn text-center`}
                        onClick={()=>handleClickQues(item.questionId,index)}
                        key={index}
                      >
                        {index + 1}
                      </button>
                    ) : (
                      <button
                        className={`${
                          selectedOption.some(
                            (option) => option.questionId === item.questionId
                          )
                            ? "btn-success"
                            : viewQuestion?.some((val,index)=>val.id===item.questionId)?"active":"not-view"
                        } btn question-btn text-center `}
                        key={index}
                        onClick={()=>handleClickQues(item.questionId,index)}
                      >
                        {index + 1}
                      </button>
                    )
                  ) : (
                    ""
                  );
                })}
              </div>
              <hr />
              <div className="py-2">
                <span className="badge bg-success rounded-5 ">&nbsp;</span> &nbsp;
                Answered
              </div>
              <div className="py-2">
                <span className="badge active rounded-5 ">&nbsp;</span> &nbsp; 
                Not Answered
              </div>
              <div className="py-2 pb-5"> 
                <span className="badge bg-secondary rounded-5 ">&nbsp;</span>{" "}
                &nbsp; Not View
              </div>
              <div className="text-end submit-test">
                <button className="btn btn-success" onClick={handleSubmit}>Submit Test</button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </MainLayout>
    );
  }
  export default MockTestQuiz;