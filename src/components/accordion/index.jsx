//스타일 시트, 자바스크립트 데이터를 import
/*
./ : 지금 여기
../ : 한번 나가서
/ : 프로젝트 경로 (나중 추가 설명)
/src : src폴더로 들어가서
*/
import { useState } from 'react'
import data from './data'  // 이 파일 옆에있는 data 파일을 data란 키워드로 가져오기
import './styles.css'  //이 파일 옆에 있는 styles.css를 갖다 쓰겠다.

export default function Accordion() {
  //선택된 title의 번호를 저장할 state (UI와 연결된 변수)
  let [selected, setSelected] = useState (null)
  //선택되면 setSelected를 통해서 id를 넣어주기
  //플래그 (댠일선택 // 다중선택)
  let [enableMultiSelection, setEnableMultiSelection] = useState (false)
  // fasle면 단일선택, true면 다중선택
  let [selectedList, setSelectedList] = useState([])

  function clickTitle(id) {
    console.log(id);
    // 아이디를 selected에 넣는다 ==> setSelected(값)
    // useState의 값을 갱신하려면 두번째 있는 것을 사용
    // setSelected(id)
    
    //조건체크 : 이미 눌린애네? 그럼 없애
    // selected가 null이면 눌렀을 때 나오게
    // selected가 1이면 1 또 눌렀으면 null 로
    // selected가 id와 다르면 id값을 넣고
    // 같으면 null 넣고
    selected === id ? setSelected(null) : setSelected(id)
    console.log(selectedList.indexOf(selectedList))
  }

  //다중선택일 때는 선택된 애들을 모두 보관 => 배열

  function clickBtn() {
    console.log(enableMultiSelection)
    enableMultiSelection === false ? setEnableMultiSelection(true) : setEnableMultiSelection(false)
  }

  function multiSelectTitle(id) {
    // 배열의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 []로 감싼다
    // 객체의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 {}로 감싼다
    let copyList = [...selectedList]
    console.log(selectedList.indexOf(id))  //다중 선택배열에서 id값을 검사 (indexOf() : 만약 배열 안에서 id를 찾을 수 없다면 -1)
    
    //있는지 검사 => 없으면 추가
    let findIndexOfId = selectedList.indexOf(id)  //아이디 이미 있으면 그 위치
    //jsx 가 아닌 js문법이니깐 if-else 써도 됨
    if(findIndexOfId === -1) { //없었다
      copyList.push(id)
    }
    else {
      //있었으면 배열 제거 splice(인덱스, 몇개 없앨건지)
      copyList.splice(findIndexOfId, 1)  //찾은 인덱스로부터 1개 없앰(닫기)
    }
    setSelectedList(copyList)
    console.log(selectedList)
  }


  return(
    <div className = "wrapper">
      <button onClick = {()=>{clickBtn()}}>다중 선택 ON/OFF</button>
      {/* clickBtn()함수 대신 setEnableMultiSelection(!enableMultiSelection) 도 가능*/}
      <div className = "accordion">
        {
          data.map((element, idx)=>{
            return(
              <div className = "item" key = {idx}>
                <div className = "title" onClick = {()=>{
                  enableMultiSelection === true ? multiSelectTitle(element.id)
                  : clickTitle(element.id)
                  }}>
                  <h3>{element.title}</h3>
                  <span>▼</span>
                </div>

                  {
                    /*
                    && : 그리고
                    true && true : true
                    true && false : false
                    false && true : false
                    false && false : false

                    && : 앞에꺼 틀렸으면 어차피 false니깐 뒤에꺼 검사 안함
                    || : 앞에꺼 맞았으면 어차피 true니깐 뒤에꺼 검사 안함
                    */
                    enableMultiSelection === true ? 
                    selectedList.indexOf(element.id) !== -1 && <div class = "content">{element.content}</div>: 
                    selected === element.id && <div class = "content">{element.content}</div>
                  }

                  {
                    //selected 값이 id와 같은 부분만 content 생성
                    //selected === element.id && enableMultiSelection === false? <div class = "content">{element.content}</div>: null
                    
                  }

                
              </div>
            )
          })
        }
        {/* <div className = "item">
          <div className = "title">
            <h3>{data[0].title}</h3>
            <span>+</span>
          </div>
        </div> */}

      </div>
    </div>
  )
}