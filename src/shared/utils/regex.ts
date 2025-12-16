export const REGEX = {
    OTP: /^[0-9]{6}$/,

    EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    NICKNAME: /^[a-zA-Zㄱ-ㅎ가-힣 ]{3,20}$/,
    INTRODUCTION: /^[\s\S]{0,40}$/,

    FAN_NAME: /^[a-zA-Zㄱ-ㅎ가-힣ぁ-ゔァ-ヴー々〆〤 ]{3,20}$/,
    FAN_INTRODUCTION: /^[\s\S]{0,60}$/,
    FAN_CHARACTERISTIC: /^[\s\S]{2,12}$/,

    COMMUNITY_CATEGORY: /^[\s\S]{3,20}$/,
    COMMUNITY_TITLE: /^[\s\S]{2,40}$/,
    COMMUNITY_CONTENT: /^[\s\S]{3,600}$/,

    MOMENT_TITLE: /^[\s\S]{2,40}$/,
    MOMENT_DESCRIPTION: /^[\s\S]{0,60}$/,
};
