// 패스워드 유효성 검사
export const isValidPassword = (password: string): boolean => {
  // ^: 문자열의 시작
  // (?=.*[a-zA-Z]): 적어도 하나의 영문자 포함
  // (?=.*\d): 적어도 하나의 숫자 포함
  // (?=.*[!@#$%^&*(),.?":{}|<>]): 적어도 하나의 특수기호 포함
  // .{8,}: 최소 8자리 이상
  // $: 문자열의 끝
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

  return regex.test(password)
}

// 이메일 유효성 검사
export const isValidEmail = (password: string): boolean => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return regex.test(password)
}

// 전화번호 정규식
export const formatPhoneNumber = (phoneNumber: string): string => {
  // 숫자만 추출
  const cleaned = phoneNumber.replace(/\D/g, '')

  // 전화번호 길이에 따라 다르게 포맷팅
  if (cleaned.length === 8) {
    // 지역번호 없는 일반전화 (예: 1234-5678)
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2')
  } else if (cleaned.length === 9) {
    // 서울 지역번호 또는 휴대폰 번호 (예: 02-123-4567 또는 010-123-4567)
    return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
  } else if (cleaned.length === 10) {
    // 지역번호 포함 일반전화 또는 휴대폰 번호 (예: 031-123-4567 또는 010-1234-5678)
    if (cleaned.startsWith('02')) {
      // 서울 지역번호 (02-1234-5678)
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
    }
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  } else if (cleaned.length === 11) {
    // 휴대폰 번호 (010-1234-5678)
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  // 그 외의 경우 원래 입력을 반환
  return phoneNumber
}
