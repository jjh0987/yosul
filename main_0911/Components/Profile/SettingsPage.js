import React, { useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, Text, Platform, UIManager, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import firebase from "../../firebase";


const window = Dimensions.get('screen')

const handleSignOut = async () => {
  Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
    // 버튼 배열
    {
      text: "아니요",
      style: "cancel",
    },
    {
      text: "네",
      onPress: async () => {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Signed Out !!");
          });
      },
    },
  ]);
};

const SettingsPage = ({ navigation }) => {
  const data = [
    {
      id: 3,
      title: '버전 정보',
      body: "0.0.1"},
    {
      id: 2,
      title: '언어 정보',
      body: "한국어"},
    
    {  
      id: 1,
      title: '개인정보 처리 방침',
      body: "여술램프(이하 `여술램프`)은(는)「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.○ 이 개인정보처리방침은 2022년 9월 10부터 적용됩니다. 제1조(개인정보의 처리 목적) 여술램프 (이하 '여술램프')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다. 1. 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원자격 유지·관리 목적으로 개인정보를 처리합니다. 제2조(개인정보의 처리 및 보유 기간) ① 여술램프 은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.1와 관련한 개인정보는 수집.이용에 관한 동의일로부터까지 위 이용목적을 위하여 보유.이용됩니다. 보유근거 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록: 3년 제3조(처리하는 개인정보의 항목)① 여술램프 은(는) 다음의 개인정보 항목을 처리하고 있습니다. 1 홈페이지 회원가입 및 관리 필수항목 : 이메일, 로그인ID, 이름, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보 선택항목 :제4조(개인정보의 제3자 제공에 관한 사항) ①  여술램프 은(는) 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.②  여술램프 은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.1.  Firebase 개인정보를 제공받는 자 : Firebase 제공받는 자의 개인정보 이용목적 : 데이터 관리 제공받는 자의 보유.이용기간: 지체없이 파기 제5조(개인정보처리의 위탁에 관한 사항) ①  여술램프 은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.1위탁받는 자 (수탁자) : 위탁하는 업무의 내용 : 위탁기간 : ②  여술램프 은(는) 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다. 제6조(개인정보의 파기절차 및 파기방법)①  여술램프  은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. 1. 법령 근거 : 2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜 ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다. 1. 파기절차 여술램프  은(는) 파기 사유가 발생한 개인정보를 선정하고,  여술램프  의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다. 2. 파기방법 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다 제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항) ① 정보주체는 여술램프에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. ② 제1항에 따른 권리 행사는여술램프에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 여술램프은(는) 이에 대해 지체 없이 조치하겠습니다. ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다. ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다. ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다. ⑥ 여술램프은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다. 제8조(개인정보의 안전성 확보조치에 관한 사항)여술램프 은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.1. 내부관리계획의 수립 및 시행 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.2. 해킹 등에 대비한 기술적 대책 여술램프('여술램프')은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다. 제9조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항) ① 여술램프 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구인터넷 옵션개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다. 제10조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)행태정보의 수집·이용·제공 및 거부등에 관한 사항 은(는) 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다. 제11조(추가적인 이용·제공 판단기준) 여술램프  은(는) ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다. 이에 따라  여술램프  가(이) 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다. ▶ 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부 ▶ 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부 ▶ 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부 ▶ 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부 ※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함 제12조(가명정보를 처리하는 경우 가명정보 처리에 관한 사항) 여술램프  은(는) 다음과 같은 목적으로 가명정보를 처리하고 있습니다.▶ 가명정보의 처리 목적 - 직접작성 가능합니다.▶ 가명정보의 처리 및 보유기간 - 직접작성 가능합니다. ▶ 가명정보의 제3자 제공에 관한 사항(해당되는 경우에만 작성) - 직접작성 가능합니다. ▶ 가명정보 처리의 위탁에 관한 사항(해당되는 경우에만 작성) - 직접작성 가능합니다. ▶ 가명처리하는 개인정보의 항목 - 직접작성 가능합니다. ▶ 법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한 사항 - 직접작성 가능합니다. 제13조 (개인정보 보호책임자에 관한 사항) ① 여술램프 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.▶ 개인정보 보호책임자 성명 :전준호 직책 :팀장 직급 :임원 연락처 :01039031993, jjh0987@yonsei.ac.kr, -※ 개인정보 보호 담당부서로 연결됩니다. ▶ 개인정보 보호 담당부서 부서명 : 담당자 :연락처 :, ,② 정보주체께서는 여술램프 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 여술램프 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다. 제14조(국내대리인의 지정) 정보주체는 ｢개인정보 보호법｣ 제39조의11에 따라 지정된  여술램프 의 국내대리인에게 개인정보 관련 고충처리 등의 업무를 위하여 연락을 취할 수 있습니다.  여술램프 은(는) 정보주체의 개인정보 관련 고충처리 등 개인정보 보호책임자의 업무 등을 신속하게 처리할 수 있도록 노력하겠습니다. ▶  여술램프  은(는) ｢개인정보 보호법｣ 제39조의11에 따라 국내대리인을 지정하였습니다. - 국내대리인의 성명 : [대리인 성명_직접입력] (법인의 경우 법인명, 대표자의 성명) - 국내대리인의 주소 : [대리인 주소_직접입력] (법인의 경우 영업소 소재지) - 국내대리인의 전화번호 : [대리인 전화번호_직접입력] - 국내대리인의 전자우편 주소 : [대리인 전자우편_직접입력] 제15조(개인정보의 열람청구를 접수·처리하는 부서) 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 여술램프 은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.  ▶ 개인정보 열람청구 접수·처리 부서 부서명 : 개발팀 담당자 : 전준호 연락처 : jjh0987@yonsei.ac.kr, 01039031993, - 제16조(정보주체의 권익침해에 대한 구제방법) 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다. 1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr) 2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr) 3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr) 4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다. ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다. 제17조(영상정보처리기기 운영·관리에 관한 사항) ①  여술램프 은(는) 아래와 같이 영상정보처리기기를 설치·운영하고 있습니다. 1.영상정보처리기기 설치근거·목적 :  여술램프 의 2.설치 대수, 설치 위치, 촬영 범위 : 설치대수 : 대 설치위치 : 촬영범위 : 3.관리책임자, 담당부서 및 영상정보에 대한 접근권한자 : 4.영상정보 촬영시간, 보관기간, 보관장소, 처리방법 촬영시간 : 시간 보관기간 : 촬영시부터 보관장소 및 처리방법 : 5.영상정보 확인 방법 및 장소 : 6.정보주체의 영상정보 열람 등 요구에 대한 조치 : 개인영상정보 열람.존재확인 청구서로 신청하여야 하며, 정보주체 자신이 촬영된 경우 또는 명백히 정보주체의 생명.신체.재산 이익을 위해 필요한 경우에 한해 열람을 허용함 7.영상정보 보호를 위한 기술적.관리적.물리적 조치 : 제18조(개인정보 처리방침 변경) ① 이 개인정보처리방침은 2022년 9월 10부터 적용됩니다. ② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다."
    },

    {  
      id: 0,
      title: '이용약관',
      body: "제 1 조 (목적) 이 약관은 여술램프 (`회사` 또는 `여술램프`)이 제공하는 여술램프 및 여술램프 관련 제반 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다. 제 2 조 (정의) 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. `서비스`라 함은 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 `회원`이 이용할 수 있는 여술램프 및 여술램프 관련 제반 서비스를 의미합니다. `회원`이라 함은 회사의 `서비스`에 접속하여 이 약관에 따라 `회사`와 이용계약을 체결하고 `회사`가 제공하는 `서비스`를 이용하는 고객을 말합니다. `아이디(ID)`라 함은 `회원`의 식별과 `서비스` 이용을 위하여 `회원`이 정하고 `회사`가 승인하는 이메일 주소를 의미합니다. `비밀번호`라 함은 `회원`이 부여 받은 `아이디와 일치되는 `회원`임을 확인하고 비밀보호를 위해 `회원` 자신이 정한 문자 또는 숫자의 조합을 의미합니다. `유료 서비스`이라 함은 `회사`가 제공하는 숙박업소 예약 등 기타 유료로 이용할 수 있는 상품 및 제반서비스를 의미합니다. `콘텐츠`라함은 `회사`, 에디터 또는 회원이 동영상, 이미지, 음원, 텍스트 등을 편집하여 `회사`가 운영하는 `서비스`에 업로드 할 목적으로 제작되는 창작물을 의미합니다. `에디터`라함은 `회사`와 고용계약, 업무위탁계약 또는 업무제휴계약 등을 체결하여 `서비스`에 업로드 할 목적으로 `콘텐츠`를 제작 및 공급하는 개인 또는 기업을 의미합니다. “게시물”이라 함은 “서비스”에 업로드 된 “콘텐츠” 및 “콘텐츠”를 구성하는 각종 파일과 링크, “회원”들의 댓글 등을 포함하는 정보를 의미합니다. “포인트”라 함은 “서비스”의 효율적 이용을 위해 “회사”가 임의로 책정 또는 지급, 조정할 수 있는 재산적 가치가 없는 “서비스” 상의 가상 데이터를 의미합니다. “쿠폰”이라 함은 “회원”이 “서비스”에서 결제 시 표시된 금액 또는 비율만큼 결제 금액을 할인받을 수 있는 할인권을 의미합니다. “캐시”라 함은 “서비스” 또는 제휴사 적립 이벤트 등을 통해 지급 받은 적립금을 의미합니다. 제 3 조 (약관의 게시와 개정) “회사”는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함),전화번호,팩스번호,전자우편 주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자등을 “회원”이 쉽게 알 수 있도록 “서비스”의 화면 내 또는 별도의 연결화면에 게시하거나, 팝업화면 등으로 제공합니다. “회사”는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. “회사”가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 제 1항의 방식에 따라 그 재정약관을 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, “회원”에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 `회사`는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 `회원`이 알기 쉽도록 표시합니다. `회사`가 전항에 따라 개정약관을 공지 또는 통지하면서 회원에게 30일 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에 동의한 것으로 봅니다. `회원`이 개정약관의 적용에 동의하지 않는 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있습니다. `회사`가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 “회원”이 개정약관 조항의 적용을 받기를 원하는 뜻을 제4항에 의한 개정약관의 공지기간 내에 “회사”에 송신하여 “회사”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다. 제 4 조 (이용계약 체결) 이용계약은 “회원”이 되고자 하는 자(이하 “가입신청자”)가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고  “회사”가 이러한 신청에 대하여 승낙함으로써 체결됩니다. “회사”는 “가입신청자”의 신청에 대하여 “서비스” 이용을 승낙함을 원칙으로 합니다. 다만, “회사”는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다. ① 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 단 “회사”의 회원 재가입 승낙을 얻은 경우에는 예외로 함. ② 타인의 명의를 이용한 경우 ③ 허위의 정보를 기재하거나, “회사”가 제시하는 내용을 기재하지 않은 경우 ④ 14세 미만 아동이 가입 신청을 하는 경우 ⑤ 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우 ⑥ 기타 회원으로 등록하는 것이 “회사”의 기술상 현저히 지장이 있다고 판단되는 경우 제1항에 따른 신청에 있어 “회사”는 “회원”의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다. “회사”는 서비스관련설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다. 제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, “회사”는 원칙적으로 이를 가입신청자에 게 알리도록 합니다. 이용계약의 성립 시기는 “회사”가 가입완료를 신청절차 상에서 표시한 시점으로 합니다. “회원”은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “회사”에 대하여 그 변경사항을 알려야 합니다. “회사”는 “회원”에 대해 회사정책에 따라 등급별로 구분하여 이용시간, 이용횟수, 서비스 메뉴 등을 세분하여 이용에 차등을 둘 수  있습니다. “회사”는 “회원”에 대하여“청소년보호법”등에 따른 등급 및 연령 준수를 위해 이용제한이나 등급별 제한을 할 수 있습니다. 제 5 조 (회원정보의 변경) “회원”은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디 등은 수정이 불가능합니다. “회원”은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 “회사”에 대하여 그 변경사항을 알려야 합니다. 제2항의 변경사항을 “회사”에  알리지 않아 발생한 불이익에 대하여 “회사”는 책임지지 않습니다. 제 6 조 (개인정보보호 의무) “회사”는 “정보통신망법” 등 관계 법령이 정하는 바에 따라 “회원”의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법 및 “회사”의 개인정보처리방침이 적용됩니다. 다만, “회사”의 공식 사이트 이외의 링크된 사이트에서는 “회사”의 개인정보처리방침이 적용되지 않습니다. 제 7 조 (“회원”의 “아이디” 및 “비밀번호”의 관리에 대한 의무) “회원”의 “아이디”와 “비밀번호”에 관한 관리책임은 “회원”에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다. “회사”는 “회원”의 “아이디”가 개인정보 유출 우려가 있거나, 반사회적 또는 미풍양속에 어긋나거나 “회사” 및 “회사”의 운영자로 오인한 우려가 있는 경우, 해당 “아이디”의 이용을 제한할 수 있습니다. “회원”은 “아이디” 및 “비밀번호”가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 “회사”에 통지하고 “회사”의 안내에 따라야 합니다. 제3항의 경우에 해당 “회원”이 “회사”에 그 사실을 통지하지 않거나, 통지한 경우에도 “회사”의 안내에 따르지 않아 발생한 불이익에 대하여 “회사”는 책임지지 않습니다. 제 8 조 (“회원”에 대한 통지) “회사”가 “회원”에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 서비스 내 전자우편주소, 전자쪽지 등으로 할 수  있습니다. “회사”는 불특정다수 “회원”에 대한 통지의 경우 7일 이상 “서비스”의 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다. 제 9 조 (“회사”의 의무) “회사”는 관련법과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 “서비스”를 제공하기 위하여 최선을 다하여 노력합니다. “회사”는 “회원”이 안전하게 “서비스”를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다. “회사”는 서비스이용과 관련하여 발생하는 이용자의 불만 또는  피해구제요청을 적절하게 처리할 수 있도록 필요한 인력 및 시스템을 구비합니다. “회사”는 서비스이용과 관련하여 “회원”으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. “회원”이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 “회원”에게 처리과정 및 결과를 전달합니다. 제 10 조 (“회원”의 의무) “회원”은 관련법령, 이 약관의 규정, 이용안내 및 “서비스”와 관련하여 공지한 주의사항, “회사”가 통지하는 사항 등을 준수하여야 하며, 기타 “회사”의 업무에 방해되는 행위를 하여서는 안 됩니다. “회원”은 상품 등을 구매하기 전에 반드시 회사가 제공하는 상품 등의 상세 내용과 거래의 조건을 정확하게 확인한 후 구매를 신청하여야 합니다. 구매하려는 상품 등의 상세내용과 거래의 조건을 확인하지 않고 구매하여 발생하는 손해에 대하여 회원이 책임을 부담합니다. “회원”은 이 약관 및 회사가 서비스와 관련하여 고지하는 내용을 준수하여야 하며, 약관 및 고지내용을 위반하거나 이행하지 아니하여 발생하는 손해에 대하여 책임을 부담합니다. “회원”은 “회사”가 서비스를 안전하게 제공할 수 있도록 “회사”에 협조하여야 하며, “회사”가 “회원”의 이 약관 위반행위를 발견하여 “회원”에게 해당 위반행위에 대하여 소명을 요청할 경우 “회원”은 “회사”의 요청에 적극 응하여야 합니다. 미성년자인 “회원”이 서비스를 이용하여 상품 등을 구매 시 법정대리인이 해당 계약에 대하여 동의를 하여야 정상적인 상품 등의 구매계약이 체결될 수 있습니다. 만약, 미성년자인 “회원”이 법정대리인의 동의 없이 상품 등을 구매하는 경우 본인 또는 법정대리인이 이를 취소할 수 있습니다. “회원”은 상품의 구매 시 반드시 본인 명의의 결제수단을 사용하여야 하며, 타인의 결제수단의 임의사용을 하여서는 안됩니다. 타인의 결제수단을 임의 사용함으로써 발생하는 회사, 결제수단의 적법한 소유자, 전자결제대행 또는 중개서비스 사업자 판매자회원의 손실과 손해에 대한 모든 책임은 “회원”에게 있습니다. 상품의 결제와 관련하여 “회원”이 입력한 정보 및 그 정보와 관련하여 발생한 책임과 불이익은 전적으로 “회원”이 부담하여야 합니다. “회원”은 결제 시 정당하고, 적법한 사용권한을 가지고 있는 결제수단을 사용하여야 하며, “회사”는 그 여부를 확인할 수 있습니다. 또한 “회사”는 회원 결제수단의 적법성 등에 대한 확인이 완료될 때까지 거래진행을 중지하거나 해당 거래를 취소할 수 있습니다. 회사가 회원의 서비스 이용 편의를 위해 제휴업체로부터 정보를 제공받아 게재하거나 제3자가 제공하는 방식으로 서비스 사이트 내 또는 링크 방식으로 참조용 정보나 콘텐츠를 제공하는 경우라도, 회원은 자신의 판단과 책임으로 결정하여 상품을 구매하여야 하며 회사는 어떠한 경우에도 회원의 구매결정에 대하여 책임을 부담하지 않습니다. 제 11 조 (“회원”의 금지행위) “회원”은 다음 각호의 행위를 하여서는 안됩니다. ① “회사”가 제공하는 서비스 이용방법에 의하지 아니하고 비정상적인 방법으로 서비스를 이용하거나 시스템에 접근하는 행위 ② 타인의 명의, 카드정보, 계좌정보 등의 정보를 도용하거나 허위 내용을 등록하여 회사가 제공하는 서비스를 이용하는 행위 ③ “회사”가 정하지 않은 비정상적인 방법으로 포인트, 캐시, 쿠폰 등을 취득하거나 사용하는 행위 ④ “회사”가 게시하는 정보의 무단, 변경 또는 회사가 정한 정보 이외의 정보(컴퓨터프로그램 등) 등을 송신 또는 게시하는 행위 ⑤ “회사” 및 기타 제3자의 저작권 등 지적재산권에 대한 침해행위 ⑥ “회사” 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 ⑦ 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서 양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위 ⑧ 구매의사 없이 반복적인 구매행위를 하는 행위 ⑨ “회사”의 동의 없이 영리를 목적으로 “서비스”를 사용하는 행위 ⑩ 기타 불법적이거나 부당한 행위 “회사”는 “회원”이 본 조의 금지행위를 행하는 경우 서비스의 일부 또는 전부를 이용 정지 하거나 서비스 이용계약을 임의로 해지할 수 있으며, 이 경우 발생하는 손해에 대한 책임은 “회원”이 부담합니다. “회사”는 필요한 경우 “회원”의 금지행위 사실을 관련 정부기관 또는 사법기관에 통지할 수  있습니다. 제 12 조 (“서비스”의 제공 등) 회사는 회원에게 아래와 같은 서비스를 제공합니다. 콘텐츠 제공 서비스 게시판형 서비스 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결에 관한 서비스 기타 “회사”가 추가 개발하거나  다른 회사와의 제휴계약 등을 통해 “회원”에게 제공하는 일체의 서비스 기타  “회사”가 정하는 업무 회사는 “서비스”를 일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있습니다. 다만, 이러한 경우에는 그 내용을 사전에 공지합니다. “서비스”는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. “회사”는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 “서비스”의 제공을 일시적으로 중단할 수 있습니다. 이 경우 “회사”는 제8조[“회원”에 대한 통지]에 정한 방법으로 “회원”에게 통지합니다. 다만, “회사”가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다. “회사”는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다. 제 13 조 (“서비스”의 변경) “회사”는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 “서비스”를 변경할 수 있습니다. “서비스”의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등은 그 변경 전에 해당 서비스 초기화면 또는 연결화면 등에 게시하여야 합니다. “회사”는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 “회원”에게 별도의 보상을 하지 않습니다. “회사”는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다. “회사”가 제공하기로 “회원”과 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 회원에게 통지 가능한 주소로 즉시 통지합니다. 전항의 경우 “회사”는 이로 인하여 회원이 입은 손해를 배상합니다. 다만, “회사”의 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다. 제 14 조 (정보의 제공 및 광고의 게재) “회사”는 “회원”이 “서비스” 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로 “회원”에게 제공할 수 있습니다. 다만, “회원”은 관련법에 따른 거래관련 정보 및 고객문의 등에 대한 답변 등을 제외하고는 언제든지 전자우편에 대해서 수신 거절을 할 수 있습니다. 제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 “회원”의 사전 동의를 받아서 전송합니다. 다만, “회원”의 거래관련 정보 및 고객문의 등에 대한 회신에 있어서는 제외됩니다. “회사”는 “서비스”의 운영과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고를 게재할 수 있습니다. 광고가 게재된 전자우편을 수신한 “회원”은 수신거절을 “회사”에게 할 수 있습니다. “이용자(회원, 비회원 포함)”는 회사가 제공하는 서비스와 관련하여 게시물 또는 기타 정보를 변경, 수정, 제한하는 등의 조치를 취하지 않습니다.  제 15 조 (“게시물”의 저작권) “회원”이 “서비스” 내에 게시한 “게시물”의 저작권은 해당 게시물의 저작자에게 귀속됩니다. “회원”이 “서비스” 내에 게시하는 “게시물”은 검색결과 또는 “서비스” 및 관련 프로모션 또는 상품  등의 연구개발, 판촉, 홍보 등의 목적으로 회사가 제휴한 타사에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, “회원”은 언제든지 고객센터 또는 “서비스” 내 관리기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다. `회사`가 `서비스` 내 게재 이외의 목적으로 게시물을 사용할 경우 `게시물`에 대한 게시자를 반드시 명시해야 합니다. 단, 게시자를 알 수 없는 익명 게시물 등의 경우에는 그러하지 아니합니다. `회사`는 제2항 이외의 방법으로 `회원`의 `게시물`을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 `회원`의 동의를 얻어야 합니다. `회사`와 상품구매 및 서비스이용 계약을 체결하지 않고 회원이 `회사`에 게시된 정보를 사용으로 인한 피해는 전적으로 회원에게 있습니다. 제 16 조 (“게시물”의 관리) “회원”은 서비스를 통해 접근한 게시물에 관한 모든 법적 책임으로부터 회사를 면책하여야 하며, “회사”는 “서비스”를 통해 제공되는 게시물에 관해 아무런 책임을 지지 않습니다. “회원”의 “게시물”이 「정보통신망법」 및 「저작권법」등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 “게시물”의 게시중단 및 삭제 등을 요청할 수 있으며, “회사”는 관련법에 따라 조치를 취하여야 합니다. “회사”는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 “게시물”에 대해 임시조치 등을 취할 수 있습니다. 본 조에 따른 세부절차는 「정보통신망법」 및 「저작권법」이 규정한 범위 내에서 “회사”가 정한 게시중단요청서비스에 따릅니다. 게시중단요청서비스 : jjh0987@yonsei.ac.kr 제 17 조 (권리의 귀속) “서비스”에 대한 저작권 및 지적재산권은 “회사”에 귀속됩니다. 단, “회원”의 “게시물” 및 제휴계약에 따라 제공된 저작물 등은 제외합니다. “회사”는 서비스와 관련하여 “회원”에게 “회사”가 정한 이용조건에 따라 계정, “아이디”, “콘텐츠”, “캐시” 등을 이용할 수 있는 이용권만을 부여하며, “회원”은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다. 제 18 조 (구매신청) “회원”은 “서비스”상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, “회사”는 “회원”이 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다. 단, “회원”인 경우 제2호 내지 제4호의 적용을 제외할 수 있습니다. ① 재화등의 검색 및 선택 ② 이름, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력 ③ 각 상품별 약관내용, 청약철회권이 제한되는 서비스, 배송료,설치비 등의 비용부담과 관련한 내용에 대확인 ④ 이 약관에 동의하고 위 3.호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭) ⑤ 재화등의 구매신청 및 이에 관한 확인 또는 `회사`의 확인에 대한 동의 ⑥ 결제방법의 선택 `회사`가 제3자에게 구매자 개인정보를 제공할 필요가 있는 경우 1.개인정보를 제공받는 자, 2.개인정보를 제공받는 자의 개인정보 이용목적, 3.제공하는 개인정보의 항목, 4.개인정보를 제공받는 자의 개인정보 보유 및 이용기간을 구매자에게 알리고 동의를 받아야 합니다.(동의를 받은 사항이 변경되는 경우에도 같습니다.) `회사`가 제3자에게 구매자의 개인정보를 취급할 수 있도록 업무를 위탁하는 경우에는 1.개인정보 취급위탁을 받는 자, 2.개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고 동의를 받아야 합니다.(동의를 받은 사항이 변경되는 경우에도 같습니다.) 단, 서비스제공에 관한 계약이행을 위해 필요하고 구매자의 편의증진과 관련된 경우에는 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』에서 정하고 있는 방법으로 개인정보 취급방침을 통해 알림으로써 고지절차를 거치지 않아도 됩니다. 제 19 조 (계약의 성립) `회사`는 제18조와 같은 구매신청에 대하여 다음 각호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다. ① 신청 내용에 허위, 기재누락, 오기가 있는 경우 ② 미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우 ③ 기타 구매신청에 승낙하는 것이 `회사` 기술상 현저히 지장이 있다고 판단하는 경우 ④ 기타 제반 법령 및 정부의 가이드라인에 위반되는 경우 `회원`의 구매계약 성립시기는 `회사`가 구매완료를 구매절차 상에서 표시한 시점으로 합니다. `회사`의 승낙의 의사표시에는 `회원`의 구매 신청에 대한 확인 및 판매가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다. 제 20 조 (지급방법) `서비스`에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각호의 방법 중 가용한 방법으로 할 수 있습니다. 단, `회사`는 `회원`의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체 선불카드, 직불카드, 신용카드 등의 각종 카드 결제 온라인무통장입금 전자화폐에 의한 결제 수령 시 대금지급 마일리지 등 `회사`가 지급한 캐시에 의한 결제 `회사`와 계약을 맺었거나 `회사`가 인정한 상품권에 의한 결제 기타 전자적 지급 방법에 의한 대금 지급 등 제 21 조 (수신확인통지, 구매신청 변경 및 취소) `회사`는 `회원`의 구매신청이 있는 경우 `회원`에게 수신확인통지를 합니다. 수신확인통지를 받은 `회원`은 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 `회사`는 배송전에 `회원`의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제24조의 청약철회 등에 관한 규정에 따릅니다. 제 22 조 (재화 등의 공급) `회사`는 이용자와 재화등의 공급시기에 관하여 별도의 약정이 없는 이상, `회원`이 청약을 한 날부터 7일이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다. 다만, `회사`가 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 2영업일 이내에 조치를 취합니다. 이때 `회사`는 `회원`이 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다. 다만, 여행상품(항공, 숙박, 투어, 티켓 등) 등과 같은 무형의 재화 공급은 해당 상품에 적용되는 별도의 약관을 `서비스`를 통해 제공하고 차질 없이 출발할 수 있도록 일련의 조치를 하여야 합니다. 제1항에도 불구하고 `회원`과 `회사`간 재화 등의 공급 시기에 관하여 별도의 약정 이 있는 경우에는 그에 따릅니다. 이때 “회사”는 “회원”이 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다 “회사”는 “회원”이 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 “회사”가 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 “회사”가 고의,과실이 없음을 입증한 경우에는 그러하지 아니합니다. 여행상품(항공, 숙박, 투어, 티켓 등)등과 같은 무형의 재화 공급은 예약한 상품에 대한 별도의 확인서  등을 제공하여 회원이 상기 상품에 대해 이용할 수 있도록 하여야 합니다. 제 23 조 (환급) “회사”는 “회원”이 구매 신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 “회원”에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터  2영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다. 단, 여행상품(항공, 숙박, 투어, 티켓 등) 등의 경우 상품의 특성상 회원이 출발일전 모든 예약이 완료된 이후 계약을 해지할 경우 계약 체결 시 계약한 특별약관과 국내(외) 여행표준약관 및 국내(외) 소비자 피해보상규정에 의거 손해 배상액을 공제하고 환불하며, 기타 상품의 상품이용 계약체결 시 계약한 특별약관 등의 규정에 의거한 상품의 취소 및 환불 수수료를 공제하고 환불해 드립니다. 제 24 조 (청약철회 등) “회사”와 재화 등의 구매에 관한 계약을 체결한 “회원”은 「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 제2항에  따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다. 다만, 청약철회에 관하여 「전자상거래 등에서의 소비자보호에 관한 법률」에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다. 단, 여행상품(항공, 숙박 , 투어, 티켓 등)의 경우 상품 이용 계약시 체결한 특별약관, 국외,국내여행 표준약관에 의한 환급기준에 따라 별도의 취소수수료가 부가될 수 있습니다. “회원”은 재화 등을 배송 받은 경우 다음 각호에 해당하는 경우에는 반품 및 교환을 할 수 없습니다. ① 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다) ② 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우 ③ 시간의 경과에 의하여 재판매가 곤란할 정도로 재화 등의 가치가 현저히 감소한 경우  ④ 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우 제2항 제2호 내지 제4호의 경우에 “회사”가 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회등이 제한되지 않습니다. “회원”은 제1항 및 제2항의 규정에 불구하고 재화 등의 내용이 표시되어 광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화등을 공급받은 날부터 3월이내, 그 사실을 안 날 또는 알 수 있었던  날부터 30일 이내에 청약철회 등을 할 수 있습니다. 제1항에도 불구하고, 여행상품(항공, 숙박, 투어, 티켓 등)의 경우에는 예약 및 그에 따른 여행서비스 준비 등의 특수한 사정이 있는 관계로 별도의 특별약관이 우선하여 적용되며 개별판매 조건에 명시된 유효기간 및 조건에 한하여 서비스가 제공되며, 별도의 취소/환불 규정을 따릅니다. “회원”은 “서비스”에 명시된 내용 및 개별 주의사항(사용정보 등)을 확인하여야 할 책임이 있습니다. 제 25 조 (청약철회 등의 효과) “회사”는 이용자로부터 재화 등을 반환 받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이 경우 “회사”가 이용자에게 재화 등의 환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 정한 지연이자를 지급합니다. “회사”는 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다. 청약철회 등의 경우 공급받은 재화등의 반환에 필요한 비용은 이용자가 부담합니다. “회사”는 이용자에게 청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만 재화 등의 내용이 표시광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화등 의 반환에 필요한 비용은 “회사”가 부담합니다. 이용자가 재화 등을 제공받을때 발송비를 부담한 경우에 “회사”는 청약철회 시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다. 제 26 조 (포인트) “회사”는 서비스의 효율적 이용 및 운영을 위해 사전 공지 후 “포인트”의 일부 또는 전부를 조정할 수 있으며, “포인트”는 회사가 정한 기간에 따라 주기적으로 소멸할 수 있습니다. 제 27 조 (쿠폰) “쿠폰”은 “회사”가 “회원”에게 유상 또는 무상으로 발행하는 “쿠폰”으로 “서비스”에서 결제하는 여행상품을 일정 금액 또는 일정 비율로 할인받을 수 있습니다. “쿠폰”의 사용대상, 사용방법, 사용기간, 할인 금액 등은 “회사”의 정책에 따르며, 쿠폰의 정책은 “서비스” 화면에 게시하거나 통지합니다. “쿠폰”은 현금 가치가 없으며, 쿠폰의 사용기한이 지나거나“회원” 탈퇴 및 자격이 상실된 경우 회수됩니다. “쿠폰”이 사용된 예약이 취소된 경우 회사의 정책에 따라 “쿠폰”의 환원 여부가 결정됩니다. “쿠폰”은 타인에게 양도할 수 없으며, 유상으로 거래하거나 현금 또는 “캐시”로 전환될 수 없습니다. “회사”가 정하지 않은 방법으로 “쿠폰”을 발급/사용한 사실이 확인될 경우 “회사”는 발급된 “쿠폰”을 회수하거나 부정 발급된 “쿠폰”을 사용한 예약을 취소할 수 있습니다. 제 28 조 (캐시) “캐시`는 `회사`의 캐시 적립 정책에 따라 `회원`에게 적립되며, `캐시`의 적립 정책 및 사용방법, 사용기한과 같은 제반 사항은 `서비스` 화면에 게시하거나 통지합니다. `회원`은 여술램프 앱에서 결제하는 여행상품 중 `캐시` 사용이 가능한 일부 상품 예약 시 `캐시`를 사용할 수 있습니다. `캐시`는 사용기한이 지나거나 `회원` 탈퇴 및 자격이 상실된 경우 자동으로 소멸되며, 탈퇴 이후 재가입하더라도 소멸된 `캐시`는 복구되지 않습니다. `캐시`는 타인에게 양도할 수 없으며, 현금 및 현금화되는 수단으로 환급될 수 없습니다. `회사`가 정하지 않은 방법으로 `캐시`를 적립/사용한 사실이 확인될 경우 `회사`는 적립된 `캐시`를 환수하거나 부정 적립된 `캐시`를 사용한 예약을 취소할 수 있습니다. 제 29 조 (계약해제, 해지 등) `회원`은 언제든지 서비스초기화면의 고객센터 또는 내 정보 관리 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있으며, `회사`는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다. 다만, 해지의사를 통지하기 전에 모든 재화의 판매 및 구매 절차를 완료, 철회 또는 취소해야만 합니다. 이 경우 판매 및 구매의 철회 또는 취소로 인한 불이익은 회원 본인이 부담하여야 합니다. `회원`이 계약을 해지할 경우, 관련법 및 개인정보처리방침에 따라 `회사`가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 `회원`의 모든 데이터는 소멸됩니다. `회원`이 계약을 해지하는 경우, `회원`이 작성한 `게시물` 중 본인 계정에 등록된 게시물 일체는 삭제됩니다. 다만, 타인의 게시물 또는 공용게시판에 등록된 `게시물` 등은 삭제되지 않으니 사전에 삭제 후 탈퇴해야합니다. 이용계약 해지로 인해 발생한 불이익에 대한 책임은 회원 본인이 부담하여야 하며, 이용계약이 종료되면 `회사`는 회원에게 부가적으로 제공한 각종 무상혜택을 회수할 수 있습니다. 회원이 다음 각 호의 사유에 해당하는 경우, `회사`는 이용계약을 해지할 수 있습니다. 가입 신 시에 허위 내용을 등록한 경우 “서비스”를 이용하여 구입한 재화 등의 대금, 기타 “서비스”이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 다른 사람의 “서비스” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 “서비스”를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우 “회사”가 회원 자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우  “회사”는 이용계약을 해지할 수 있습니다. “회사”가 이용계약을 해지하는 경우 “회사”는 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다. 다만, 이 약관 및 운영정책에서 정하는 사유가 있을 경우에는 별도의 이의 신청 기간을 부여하지 않을 수 있습니다. 이용계약이 종료됨으로써 발생한 손해는 이용계약 종료사유에 대해 귀책사유가 있는 회원이 책임을 부담하여야 하고, “회사”는 관련 법령에 규정이 없는 한 책임을 지지 않습니다. 제 30 조 (이용제한 등) “회사”는 “회원”이 이 약관의 의무를 위반하거나 “서비스”의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 “서비스” 이용을 단계적으로 제한할 수 있습니다. “회사”는 전항에도 불구하고, “주민등록법”을 위반한 명의도용 및 결제도용, “저작권법” 및 “컴퓨터프로그램보호법”을 위반한 불법프로그램의 제공 및 운영방해,“정보통신망법”을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다. 본 항에 따른 영구이용정지 시 “서비스” 이용을 통해 획득한 “캐시” 및 기타 혜택 등도 모두 소멸되며, “회사”는 이에 대해 별도로 보상하지 않습니다. “회사”는 “회원”이 계속해서 3개월 이상 로그인하지 않는 경우, 회원정보의 보호 및 운영의 효율성을 위해 이용을 제한할 수 있습니다. “회사”는 본 조 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 및 개별 서비스상의 운영정책에서 정하는 바에 의합니다. 본 조에 따라 “서비스” 이용을 제한하거나 계약을 해지하는 경우에는 “회사”는  제9조[“회원”에 대한 통지]에 따라 통지합니다. “회원”은 본 조에 따른  이용제한 등에 대해 “회사”가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 “회사”가 인정하는 경우 “회사”는 즉시 “서비스”의  이용을 재개합니다. 제 31 조 (책임제한) “회사”는 천재지변 또는 이에 준하는 불가항력으로 인하여 “서비스”를 제공할 수 없는 경우에는 “서비스” 제공에 관한 책임이 면제됩니다. “회사”는 “회원”의 귀책사유로 인한 “서비스” 이용의 장애에 대하여는 책임을 지지 않습니다. “회사”는 “회원”이 “서비스”와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다. “회사”는 “회원” 간 또는 “회원”과 제3자 상호간에 “서비스”를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다. “회사”는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다. 제 32 조 (연결“회사”와 피연결“회사” 간의 관계) 상위 “회사”과 하위 “회사”는 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “회사”(웹 사이트)이라고 하고 후자를 피연결 “회사”(웹사이트)이라고 합니다. 연결“회사”는 피연결”회사”가 독자적으로 제공하는 재화 등에 의하여 회원과 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결“회사”의 초기화면 또는 연결되는 시점에 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다. 제 33 조 (분쟁해결) “회사”는 회원이 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치․운영합니다. “회사”는 회원으로부터 제출되는 불만사항 및 의견 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 회원에게 그 사유와 처리일정을 즉시 통보해 드립니다. “회사”와 회원 간에 발생한 전자상거래 분쟁과 관련하여 회원의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시•도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.제 34 조 (준거법 판관할) “회사”와 “회원” 간 제기된 소송은 대한민국법을 준거법으로 합니다. “회사”와 “회원”간 발생한 분쟁에 관한 소송은 제소 당시의 “회원”의 주소에 의하고, 주소가 없는 경우 거소를 관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 “회원”의 주소 또는 거소가 명확하지 아니한 경우의 관할법원은 민사소송법에 따라 정합니다. 해외에 주소나 거소가 있는 “회원”의 경우 “회사”와 “회원”간 발생한 분쟁에 관한 소송은 전항에도 불구하고 대한민국 서울중앙지방법원을 관할법원으로 합니다. “회사”와 회원 간에 제기된 전자상거래 소송에는 한국법을 적용합니다. 제 35 조 (특별규정) 당 약관에 명시되지 않은 사항은 전자거래기본법, 전자서명법, 전자상거래등에서의 소비자보호에 관한 법률 기타 관련법령의 규정 및 국내외 여행표준약관 등에 의합니다.부칙 이 약관은 2021년 09월 10일부터 적용됩니다."
    },
    ];

  useEffect(() => {
  if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {UIManager.setLayoutAnimationEnabledExperimental(true);}}}, []);
    return (
    <SafeAreaView>
      <View style={styles.container}>
        <AccordionList
          data={data}
          customTitle={item => 
          <Text style={{fontSize: RFPercentage(2), marginLeft:10}}>
            {item.title}</Text>}
            customBody={item => 
          <Text style={{fontSize: RFPercentage(1.8)}}>{item.body}</Text>}
            animationDuration={400}/>
      </View>
          <View style={{flexDirection: "row", height: 450, justifyContent: 'space-evenly'}}>
            <TouchableOpacity 
              onPress={handleSignOut}
              style={styles.buttonContainer}>
              <Text style={styles.question}>로그아웃</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  };

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: window.height *0.75,
    borderColor: "#C0E8E0",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height:window.height *0.06,
    width:window.width * 0.9,
    marginBottom: 1,
    borderColor: "#C0E8E0",
    borderWidth: 3,
    backgroundColor: "#C0E8E0",
    borderRadius: 5
  },
  question: {
    fontSize: RFPercentage(2.5),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 2,
    color: "white",
  },
});
