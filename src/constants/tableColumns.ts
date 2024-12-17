// 메인 대시보드 테이블 컬럼 정의
export const responseListColumns = [
  {
    header: '등록일시',
    accessorKey: 'regdate',
  },
  {
    header: '대상구분',
    accessorKey: 'targettype',
  },
  {
    header: '피해기관',
    accessorKey: 'hackedorganization',
  },
  {
    header: '사고유형',
    accessorKey: 'incidenttype',
  },
  {
    header: '채널구분',
    accessorKey: 'channeltype',
  },
  {
    header: '채널명',
    accessorKey: 'darktelegramname',
  },
  {
    header: '최초인지',
    accessorKey: 'firstrecogition',
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

// 도메인 관리 테이블 컬럼 정의
export const DomainColumns = [
  {
    header: '사이트(도메인)',
    accessorKey: 'domain',
  },
  {
    header: '최초 수집일',
    accessorKey: 'firstcrawl',
  },
  {
    header: '최근 수집일',
    accessorKey: 'lastcrawl',
  },
  {
    header: '구분',
    accessorKey: 'type',
  },
  {
    header: '채널명',
    accessorKey: 'sitename',
  },
  {
    header: '해커그룹(특정시)',
    accessorKey: 'hacked_organization',
  },
  {
    header: '비고',
    accessorKey: 'comment',
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
