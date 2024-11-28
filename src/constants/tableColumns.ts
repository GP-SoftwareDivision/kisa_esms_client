// 알림 내역 테이블 컬럼 정의

export const AlertColumns = [
  {
    header: '발송시간',
    accessorKey: 'senddate',
  },
  {
    header: '발송내용',
    accessorKey: 'contents',
  },
  {
    header: '발송 그룹',
    accessorKey: 'groupname',
  },
  {
    header: '대상 채널',
    accessorKey: 'target',
  },
]

// 메인 대시보드 테이블 컬럼 정의
export const dashBoardColumns = [
  {
    header: '구분',
    accessorKey: 'type',
  },
  {
    header: '카테고리',
    accessorKey: 'category',
  },
  {
    header: '키워드',
    accessorKey: 'keyword',
  },
  {
    header: 'URL',
    accessorKey: 'url',
  },
  {
    header: '제목/채팅방명',
    accessorKey: 'title',
  },
  {
    header: '내용',
    accessorKey: 'content',
  },
  {
    header: '작성일시',
    accessorKey: 'writeTime',
  },
]

// 침해 정보 판별 테이블 컬럼 정의
export const InfringementColumns = [
  {
    header: '파일형식',
    accessorKey: 'filetype',
  },
  {
    header: '파일명',
    accessorKey: 'filename',
  },
  {
    header: '업로드 날짜',
    accessorKey: 'uploaddate',
  },
  {
    header: '담당자',
    accessorKey: 'uploader',
  },
  {
    header: '신규 총 개수',
    accessorKey: 'all_new_cnt',
  },
  {
    header: '총 개수',
    accessorKey: 'total_count',
  },
  {
    header: '대응 여부',
    accessorKey: 'responsestatus',
  },
  {
    header: '최초 인지',
    accessorKey: 'firstrecognition',
  },
]

// 이슈 대응 이력 테이블 컬럼 정의
export const issueTrackingColumns = [
  {
    header: 'API 타입',
    accessorKey: 'api_type',
  },
  {
    header: '제목',
    accessorKey: 'header',
  },
  {
    header: '인지날짜',
    accessorKey: 'write_time',
  },
  {
    header: '피해기관',
    accessorKey: 'hacked_organization',
  },
  {
    header: '사고유형',
    accessorKey: 'incident_type',
  },
  {
    header: '상태',
    accessorKey: 'response_status',
  },
  {
    header: '유출정보',
    accessorKey: 'leaked_data',
  },
  {
    header: '대상구분',
    accessorKey: 'target_type',
  },
]

// 유저 관리 테이블 컬럼 정의
export const UserColumns = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: '이름',
    accessorKey: 'name',
  },
  {
    header: '권한',
    accessorKey: 'usertype',
  },
  {
    header: '번호',
    accessorKey: 'phonenum',
  },
  {
    header: '이메일',
    accessorKey: 'email',
  },
  {
    header: '그룹명',
    accessorKey: 'groupname',
  },
]

// 그룹 관리 테이블 컬럼 정의
export const GroupColumns = [
  {
    header: '그룹명',
    accessorKey: 'groupname',
  },
  {
    header: '설명',
    accessorKey: 'comment',
  },
  {
    header: '알람방식',
    accessorKey: 'alram',
  },
]

// 다크웹 테이블 컬럼 정의
export const DarkWebColumns = [
  {
    header: '카테고리',
    accessorKey: 'category',
  },
  {
    header: '수집 키워드',
    accessorKey: 'keyword',
  },
  {
    header: 'URL',
    accessorKey: 'url',
  },
  {
    header: '제목',
    accessorKey: 'title',
  },
  {
    header: '작성자',
    accessorKey: 'title',
  },
  {
    header: '작성시간',
    accessorKey: 'write_time',
  },
  {
    header: '내용',
    accessorKey: 'contents',
  },
  {
    header: '분석여부',
    accessorKey: 'analysis_flag',
  },
  {
    header: '해킹여부',
    accessorKey: 'threat_flag',
  },
  {
    header: '대응여부',
    accessorKey: 'response_flag',
  },
  {
    header: '분석로그',
    accessorKey: 'threat_log',
  },
]

export const TelegramColumns = [
  {
    header: '수집 키워드',
    accessorKey: 'keyword',
  },
  {
    header: '채팅방명',
    accessorKey: 'channel',
  },
  {
    header: '작성시간',
    accessorKey: 'write_time',
  },
  {
    header: '채팅방 URL',
    accessorKey: 'url',
  },
  {
    header: '작성자',
    accessorKey: 'user_name',
  },
  {
    header: '메시지',
    accessorKey: 'content',
  },
  {
    header: '분석여부',
    accessorKey: 'analysis_flag',
  },
  {
    header: '해킹여부',
    accessorKey: 'threat_flag',
  },
  {
    header: '대응여부',
    accessorKey: 'response_flag',
  },
  {
    header: '분석로그',
    accessorKey: 'threat_log',
  },
]
