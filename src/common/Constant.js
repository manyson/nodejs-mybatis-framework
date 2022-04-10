/**
 *  데이터 베이스 컬렉션 명
 *  @constant {object}
 */
const DB_COLLECTION_NAME = {
  DESIGN            : 'DESIGN'              ,
  DESIGN_OBJECTIVE  : 'DESIGN_OBJECTIVE'    ,
  DESIGN_CONFIG     : 'DESIGN_CONFIG'       ,
  DESIGN_IP         : 'DESIGN_IP'           ,
  DESIGN_STRUCTURE  : 'DESIGN_STRUCTURE'    ,
  DESIGN_CRITERIA   : 'DESIGN_CRITERIA'     ,
};


/**
 *  데이터 베이스 필드명
 *  @constant {object}
 */
const DB_FIELD_NAME = {

  // A
  ASTERISK              :     '*'                   ,
  ACCOUNT_ID            :     'accountID'           ,
  ACTIVE                :     'active'              ,
  ACTIVITY_ID           :     'activityID'          ,
  ACTIVITY_IDS          :     'activityIDs'         ,
  ACTIVITY              :     'activity'            ,
  ACTIVITY_KR           :     'activity_kr'         ,
  ACTIVITIES            :     'activities'          ,
  ACTIVITY_NAME         :     'activityName'        ,
  ACTIVITY_LIST         :     'activityList'        ,
  AMOUNT                :     'amount'              ,
  ARM                   :     'arm'                 ,
  ARMCAPITAL            :     'ARM'                 ,
  ARM_ASSOCIATION_TYPE  :     'armAssociationType'  ,
  ARM_ID                :     'armID'               ,
  ARM_IDS               :     'armIDs'              ,
  ARM_STUDY_EVENT       :     'armStudyEvent'       ,
  ARM_LIST              :     'armList'       ,
  ASSESSMENT            :     'assessment'          ,
  ASSESSMENTS           :     'assessments'         ,
  ASSESSMENT_ID         :     'assessmentID'        ,
  ASSESSMENT_NAME       :     'assessmentName'      ,
  ASSESSMENT_List       :     'assessmentList'      ,
  ADDRESS               :     'address'             ,
  APPLY_LIST            :     'applyList'           ,
  ARMCD                 :     'ARMCD'               ,
  ANSWER                :     'answer'              ,
  ACRONYMS_LIST         :     'acronymsList'        ,
  ACRONYMS              :     'acronyms'            ,
  ADJUDICATION          :     'adjudication'        ,
  ADDITIONAL            :     'additional'          ,
  ADDITIONAL_CONTENT    :     'additionalContent'   ,
  ANNOTATED             :     'annotated'           ,
  AGREEMENT_MUST        :     'agreementMust'       ,
  AGREEMENT_DATE        :     'agreementDate'       ,
  ALL_VISIT             :     'allVisit'            ,

  // B
  BLINDING              :     'blinding'            ,
  BRIEF_STUDY_TITLE     :     'briefStudyTitle'     ,
  BRIEF_STUDY_TITLE_ID  :     'briefStudyTitleID'   ,
  BUILD_LOG_ID          :     'buildlogID'          ,

  // C
  CATEGORY              :     'category'            ,
  CDATE                 :     'cdate'               ,
  CELL                  :     'cell'                ,
  CELL_ID               :     'cellID'              ,
  CHECKED               :     'checked'             ,
  CHECK_ADMINISTRATION  :     'checkAdministration' ,
  CHECK_OTHERS          :     'checkOthers'         ,
  CHECK_PRETREATMENT    :     'checkPretreatment'   ,
  CLASS                 :     'class'               ,
  CLASS_NAME            :     'className'           ,
  CODE                  :     'code'                ,
  CODE_KR               :     'code_kr'             ,
  COLLECT               :     'collect'             ,
  COMMENT               :     'comment'             ,
  COMMENT_ID            :     'commentID'           ,
  COMMON                :     'common'              ,
  COMPONENT_TYPE        :     'componentType'       ,
  CONCEPT_ID            :     'conceptID'           ,
  CONCOMITANT           :     'concomitant'         ,
  CONDITION_OR_DISEASE  :     'conditionOrDisease'  ,
  CONFIGURATION         :     'configuration'       ,
  CONTENT               :     'content'             ,
  CONTENTS              :     'contents'            ,
  CONTROL_TYPE          :     'controlType'         ,
  COUNT                 :     'cnt'                 ,
  COUNTRY               :     'country'             ,
  CREATE_END_TIME       :     'createEndTime'       ,
  CREATE_START_TIME     :     'createStartTime'     ,
  CREATE_TIME           :     'create_Time'         ,
  CRITERIA              :     'criteria'            ,

  CODE_GROUP_ID         :     'codeGroupID'         ,
  CODE_ID               :     'codeID'              ,
  CODE_LIST             :     'codeList'            ,
  CODE_LISTS            :     'codeLists'           ,
  CODE_LIST_CODE        :     'codeListCode'        ,
  CODE_LIST_ID          :     'codeListID'          ,
  CODE_LIST_NAME        :     'codeListName'        ,
  CODE_LIST_TYPE        :     'codeListType'        ,
  CODE_NAME             :     'codeName'            ,
  CODE_TYPE             :     'codeType'            ,
  CONDITION             :     'condition'           ,
  CONDITION_VARIABLE    :     'conditionVariable'   ,

  CLINICAL_ID           :     'clinicalID'          ,

  CERTIFICATE_ID        :     'certificateID'       ,
  CERTIFICATE_NUMBER    :     'certificateNumber'   ,
  CREATED_TIME          :     'createdTime'         ,
  CREATED_YYYYMMDD      :     'createdYYYYMMDD'     ,

  CORE                  :     'core'                ,

  // D
  DATA_SET              :     'dataSet'             ,
  DATA_TYPE             :     'dataType'            ,
  DEF                   :     'def'                 ,
  DEFAULT_VALUE         :     'defaultValue'        ,
  DEFINE_VERSION        :     'defineVersion'       ,
  DEFINITION            :     'definition'          ,
  DEF_ID                :     'defID'               ,
  DEPARTMENT            :     'department'          ,
  DESCRIPTION           :     'description'         ,
  DESCRIPTION_ID        :     'description_id'      ,
  DESCRIPTION_KR        :     'description_kr'      ,
  DESIGN                :     'design'              ,
  DESIGN_ID             :     'designID'            ,
  DESIGN_NAME           :     'designName'          ,
  DOMAIN                :     'domain'              ,
  DOSE                  :     'dose'                ,
  DOSE_FINDING          :     'doseFinding'         ,
  DURATION              :     'duration'            ,
  DEFINE_GEN_STATE      :     'defineGenState'      ,
  DEFINE_VAL_STATE      :     'defineValState'      ,
  DIAGRAM               :     'diagram'             ,
  DATA_FIELD            :     'dataField'           ,
  DATASETS              :     'datasets'            ,
  DEFINE                :     'define'              ,
  DICTIONARY_INFO       :     'dictionaryInfo'      ,
  DOCUMENTATION         :     'documentation'       ,
  DRAFT_VERSION         :     'draftVersion'        ,
  DRAFT                 :     'draft'               ,

  // E
  EDC                   :     `edc`                 ,
  ENABLE                :     'enable'              ,
  ENABLED               :     'enabled'             ,
  ENDPOINT              :     'endpoint'            ,
  ENDPOINTS             :     'endpoints'           ,
  EPOCH                 :     'epoch'               ,
  EPOCH_ID              :     'epochID'             ,
  EPOCH_NAME            :     'epochName'           ,
  EPOCH_LIST            :     'epochList'           ,
  EXCLUSION             :     'exclusion'           ,
  END_TIME              :     'endTime'             ,
  END_DATE              :     'endDate'             ,
  END                   :     'end'                 ,
  ELEMENT               :     'element'             ,
  ELEMENT_ID            :     'elementID'           ,
  ELEMENT_NAME          :     'elementName'         ,
  EVENT_ID              :     'eventID'             ,
  EVENT_NAME            :     'eventName'           ,
  EVENT_LIST            :     'eventList'           ,
  EVENT_CHECK           :     'eventCheck'          ,
  ELAPSED_TIME          :     'elapsedTime'         ,
  ETCD                  :     'ETCD'                ,
  EFFICACY              :     'efficacy'            ,
  EXAMPLE               :     'example'             ,
  EPOCHCAPITAL          :     'EPOCH'               ,
  ELEMENTCAPITAL        :     'ELEMENT'             ,
  EXPLANATION           :     'explanation'         ,


  // F
  FIELD_ALIAS           :     'fieldAlias'          ,
  FILE_NAME             :     'fileName'            ,
  FILE_PATH             :     'filePath'            ,
  FIRST_LOGIN           :     'firstLogIn'          ,
  FORMAT                :     'format'              ,
  FORM_ID               :     'formID'              ,
  FUNCTION_ID           :     'functionID'          ,
  FUNCTION_NAME         :     'functionName'        ,
  FORM_NAME             :     'formName'            ,
  FORM_ORDER            :     'formOrder'           ,
  FUNCTION_STRING       :     'functionString'      ,
  FUNCTION_CHECK        :     'functionCheck'       ,
  FULL_NAME             :     'fullName'            ,

  // G
  GROUP_ID              :     'groupID'             ,

  // H
  HEALTHY_INDICATION    :     'healthyIndication'   ,
  HTML_DEFINE           :     'htmlDefine'          ,

  // I
  ID                    :     'ID'                  ,
  ID_PREFIX             :     'ID_PREFIX'           ,
  IG_VERSION            :     'igVersion'           ,
  INCLUSION             :     'inclusion'           ,
  INTERVENTION          :     'intervention'        ,
  INVESTIGATION         :     'investigation'       ,
  IP                    :     'ip'                  ,
  IP_ID                 :     'ipID'                ,
  INDICATION            :     'indication'          ,
  INDICATION_ID         :     'indicationID'        ,
  INDICATION_IDS        :     'indicationIDs'       ,
  IN                    :     'IN'                  ,
  INDICATION_DATA       :     'indicationData'      ,
  IG_VARIABLES          :     'igVariables'         ,
  IG_ID                 :     'igID'                ,
  INDICATION_KR         :     'indicationName_kr'   ,
  ITEM_ID               :     'itemID'              ,
  ITEM_GROUP_ID         :     'itemGroupID'         ,
  IDVAR                 :     'IDVAR'               ,
  ITEM_GROUP_NAME       :     'itemGroupName'       ,
  ITEM_GROUP_ORDER      :     'itemGroupOrder'      ,
  INDEX                 :     'index'               ,
  ITEM_OID              :     'itemOid'             ,

  // J
  JSON_DEFINE           :     'jsonDefine'          ,

  // K
  KEYS                  :     'keys'                ,

  // L
  LANGUAGE              :     'language'            ,
  LOCK_REASON           :     'lockReason'          ,
  LANGUAGE_ID           :     'languageID'          ,
  LOCK                  :     'lock'                ,
  LDATE                 :     'ldate'               ,
  LOCK_TIME             :     'lockTime'            ,
  LOCK_START_TIME       :     'lockStartTime'       ,
  LOCK_END_TIME         :     'lockEndTime'         ,
  LABEL                 :     'label'               ,
  LABEL_KR              :     'label_kr'            ,
  LABELKR               :     'labelKr'             ,
  LATEST_VERSION        :     'latestVersion'       ,
  LOCAL_TIME            :     'localTime'           ,
  LINK                  :     'link'                ,
  LOGIN_FAIL_COUNT      :     'loginFailCount'      ,

  // M
  EXCEL_DATA            :     'excelData'           ,
  MANAGEMENT_NO         :     'managementNo'        ,
  MANAGER               :     'manager'             ,
  MAP_DESIGN_OBJECTIVE_ID:    'mapDesignObjectiveID',
  MAP                   :     'map'                 ,
  MAPPING               :     'mapping'             ,
  MAPPING_ID            :     'mappingID'           ,
  MAP_ID                :     'mapID'               ,
  MAP_NAME              :     'mapName'             ,
  MEDICAL_EVENT         :     'medicalEvent'        ,
  MEDICATION_DICTIONARY :     'medicationDictionary',
  MIDSTYPE              :     'MIDSTYPE'            ,
  MNO                   :     'mno'                 ,
  MULTIPLE_TIMEPOINTS   :     'multiTimePoints'     ,
  MULTI_CENTER          :     'multiCenter'         ,
  META_VERSION          :     'metaVersion'         ,
  META_ID               :     'metaID'              ,

  // N
  NAME                  :     'name'                ,
  NAME_ID               :     'name_id'             ,
  NAME_KR               :     'name_kr'             ,
  NO                    :     'no'                  ,
  NUMBER                :     'number'              ,
  NEW_ACTIVITY_ID       :     'newActivityID'       ,

  // O
  OBJECT_ID             :     '_id'                 ,
  OBJECTIVE             :     'objective'           ,
  OBJECTIVES            :     'objectives'          ,
  OBJECTIVE_ID          :     'objectiveID'         ,
  OBJECTIVE_IDS         :     'objectiveIDs'        ,
  ODM                   :     'odm'                 ,
  ORDER                 :     'order'               ,
  OTHERS                :     'others'              ,
  OUT                   :     'OUT'                 ,
  OUTCOME_MEASURES      :     'outcomeMeasures'     ,
  ORIGIN_ACTIVITY_ID    :     'originActivityID'    ,
  ORIGIN_ID             :     'originID'            ,
  ORIGIN_NAME           :     'originName'          ,
  OTHER                 :     'other'               ,
  OPERATOR              :     'operator'            ,
  OID                   :     'OID'                 ,
  ORIGIN_CONCEPT_ID     :     'originConceptID'     ,

  // P
  PACKAGE_ID            :     'packageID'           ,
  PACKAGE_NAME          :     'packageName'         ,
  PARENT_ID             :     'parentID'            ,
  PARTNER               :     'partner'             ,
  PARTNER_CODE          :     'partnerCode'         ,
  PARTNER_ID            :     'partnerID'           ,
  PASSWORD              :     'password'            ,
  PASSWORD_EXPIRE       :     'passwordExpire'      ,
  PASSWORD_LOG          :     'passwordLog'         ,
  PASSWORD_NEW          :     'passwordNew'         ,
  PERIOD                :     'period'              ,
  PHASE                 :     'phase'               ,
  PHONE                 :     'phone'               ,
  PNO                   :     'pno'                 ,
  PRETREATMENT          :     'pretreatment'        ,
  PROMPT                :     'prompt'              ,
  PROTOCOL_NO           :     'protocolNo'          ,
  PUBLIC_ID             :     'publicID'            ,
  PUBLIC_ID_NEW         :     'publicIDNew'         ,
  PACKAGE_STATE         :     'packageState'        ,
  PLANNED               :     'planned'             ,
  PAGE                  :     'page'                ,
  PLACEBO               :     'placebo'             ,
  PREFIX                :     'prefix'              ,
  PROTOCOL_VERSION      :     'protocolVersion'     ,

  // Q
  QUESTION              :     'question'            ,
  QUESTION_KR           :     'question_kr'         ,
  QUESTION_ID           :     'questionID'          ,

  // R
  RANDOMIZATION         :     'randomization'       ,
  RIGHTS                :     'rights'              ,
  ROLE                  :     'role'                ,
  REFERENCE_ID          :     'referenceID'         ,
  REPEATING             :     'repeating'           ,
  REFERENCE             :     'reference'           ,
  RANDOM                :     'random'              ,
  RESULT                :     'result'              ,
  RELREC_ID             :     'relrecID'            ,
  RELREC                :     'RELREC'              ,
  ROW_ID                :     'rowID'               ,
  RULES                 :     'rules'               ,
  RULES_CONTENT         :     'rulesContent'        ,
  REFKEY                :     'REFKEY'              ,

  // S
  SAFETY                :     'safety'              ,
  SALT                  :     'salt'                ,
  SCENARIO              :     'scenario'            ,
  SDRG_TEMPLATE         :     'SDRGTemplate'        ,
  SDTM_DOMAIN           :     'sdtmDomain'          ,
  SDTM_IG_VERSION       :     'SDTMIGVersion'       ,
  SDTM_VARIABLE         :     'sdtmVariable'        ,
  SEGMENT               :     'segment'             ,
  SEGMENT_NAME          :     'segmentName'         ,
  SHAPE                 :     'shape'               ,
  SITE_ID               :     'SiteID'              ,
  SITE_LIST             :     'siteList'            ,
  SOURCE                :     'source'              ,
  SPONSOR               :     'sponsor'             ,
  SPONSOR_DATA          :     'sponsorData'         ,
  SPONSOR_ID            :     'sponsorID'           ,
  SPONSOR_IDS           :     'sponsorIDs'          ,
  STANDARD_CODE         :     'standardCode'        ,
  STANDARD_SOURCE       :     'standardSource'      ,
  START                 :     'start'               ,
  START_TIME            :     'startTime'           ,
  STATE                 :     'state'               ,
  STATUS                :     'status'              ,
  STRUCTURE             :     'structure'           ,
  STUDYID               :     'STUDYID'             ,
  STUDY_EVENT           :     'studyEvent'          ,
  STUDY_EVENT_ID        :     'studyEventID'        ,
  STUDY_EVENT_IDS       :     'studyEventIDs'       ,
  STUDY_ID              :     'studyID'             ,
  STUDY_TITLE           :     'studyTitle'          ,
  STUDY_TITLE_ID        :     'studyTitleID'        ,
  SUBJECT               :     'subject'             ,
  SUBJECT_ID            :     'SubjectID'           ,
  SUPP                  :     'SUPP'                ,
  SYNOPSIS              :     'synopsis'            ,
  SCHEMA                :     'schema'              ,
  SUBMIT                :     'submit'              ,
  SUBMIT_CONTENT        :     'submitContent'       ,
  SCREEN                :     'screen'              ,
  SCREEN_CONTENT        :     'screenContent'       ,
  SUBSET                :     'subset'              ,
  STANDARD              :     'standard'            ,
  STUDY_LOCK            :     'studyLock'           ,

  // T
  TA                    :     'ta'                  ,
  TA_MAP                :     'taMap'               ,
  TEXT                  :     'text'                ,
  TEXT_ID               :     'textID'              ,
  TM_VERSION            :     'tmVersion'           ,
  TYPE                  :     'type'                ,
  TIME_ZONE             :     'timeZone'            ,
  TIME_POINT_CHECK      :     'timePointCheck'      ,
  TRAINING_COMPLETE     :     'trainingComplete'    ,
  TITLE                 :     'title'               ,
  TA_DATA               :     'taData'              ,
  TERM_ID               :     'termID'              ,
  TERM_NAME             :     'termName'            ,
  TERMINOLOGY           :     'terminology'         ,
  TA_ACTIVITY           :     'taActivity'          ,
  TIME_POINT            :     'timePoint'           ,
  TIME                  :     'time'                ,
  TAETORD               :     'TAETORD'             ,
  TABRANCH              :     'TABRANCH'            ,
  TATRANS               :     'TATRANS'             ,
  TRAINING_ID           :     'trainingID'          ,
  TRAINING_USER_ID      :     'trainingUserID'      ,
  TRAINING_TITLE        :     'name'                ,
  TEID                  :     'TEID'                ,
  TVID                  :     'TVID'                ,
  TMID                  :     'TMID'                ,
  TSGRPID               :     'TSGRPID'             ,
  TSPARMCD              :     'TSPARMCD'            ,
  TSPARM                :     'TSPARM'              ,
  TSVAL                 :     'TSVAL'               ,
  TSVALNF               :     'TSVALNF'             ,
  TSVALCD               :     'TSVALCD'             ,
  TSVCDREF              :     'TSVCDREF'            ,
  TSVCDVER              :     'TSVCDVER'            ,
  TESTRL                :     'TESTRL'              ,
  TEENRL                :     'TEENRL'              ,
  TEDUR                 :     'TEDUR'               ,
  TVSTRL                :     'TVSTRL'              ,
  TVENRL                :     'TVENRL'              ,
  TMDEF                 :     'TMDEF'               ,
  TMRPT                 :     'TMRPT'               ,
  TIME_DATA             :     'timeData'            ,
  TABLE                 :     'table'               ,
  TRANSLATION           :     'translation'         ,
  TIME_POINT_ORDER      :     'timePointOrder'      ,

  // U
  UNIT                  :     'unit'                ,
  UPDATE_TIME           :     'lastUpdated'         ,
  USED                  :     'used'                ,
  USER_ID               :     'userID'              ,
  USER_NAME             :     'userName'            ,
  UPLOAD_DATE           :     'uploadDate'          ,
  UN_SCHEDULED_VISIT    :     'unscheduledVisit'    ,

  // V
  VERSION               :     'version'             ,
  VERSION_PREFIX        :     'versionPrefix'       ,
  VALUE                 :     'value'               ,
  VALUE_KR              :     'value_kr'            ,
  VALUEKR               :     'valueKr'             ,
  VARIABLE              :     'variable'            ,
  VARIABLE_ID           :     'variableID'          ,
  VARIABLE_IDS          :     'variableIDs'         ,
  VARIABLE_NAME         :     'variableName'        ,
  VERSIONS              :     'versions'            ,
  VERSION_ID            :     'versionID'           ,
  VISITNUM              :     'VISITNUM'            ,
  VISIT_ID              :     'visitID'             ,
  VISIT                 :     'visit'               ,
  VISIT_LIST            :     'visitList'           ,
  VALIDATOR             :     'validator'           ,
  VALIDATOR_CONTENT     :     'validatorContent'    ,

  // W
  WHERE                 :     'where'               ,
  WINDOW                :     'window'              ,
  WINDOW_MINUS          :     'windowMinus'         ,
  WINDOW_PLUS           :     'windowPlus'          ,
  WRITER                :     'writer'              ,

  // X
  XML_DEFINE            :     'xmlDefine'           ,
};

/**
 *  capital field
 *  @constant {object}
 */
const CAPITAL_FIELD = {
  ARM     : 'ARM'    ,
  EPOCH   : 'EPOCH'  ,
}

/**
 *  front end request type
 *  @constant {object}
 */
const REQUEST_QUERY = {
  TYPE    : 'type'    ,
  SEARCH  : 'search'  ,
  USER    : 'user'    ,
  EDIT    : 'edit'    ,
  RESET   : 'reset'   ,
  PWD     : 'pwd'     ,
}

/**
 *  필드 값 분리 기호
 *  @constant {string}
 */
const VALUE_SEPARATOR  = '####'    ;

/**
 *  필드 값 조합 기호
 *  @constant {object}
 */
const CHAR_SYMBOL = {
  COMMA                   : ','   ,
  SPACE                   : ' '   ,
  COLON                   : ':'   ,
  SEMI_COLON              : ';'   ,
  DASH                    : '-'   ,
  SLASH                   : '/'   ,
  EMPTY                   : ''    ,
  UNDERSCORE              : '_'   ,
  LEFT_BRACKET            : '('   ,
  RIGHT_BRACKET           : ')'   ,
  DOT                     : '.'   ,
  ASTERISK                : '*'   ,
  SHARP                   : '#'   ,
  LEFT_ANGEL_BRACKET      : '<'   ,
  RIGHT_ANGEL_BRACKET     : '>'   ,
  QUESTION                : '?'   ,
  DOUBLE_QUOT             : '"'   ,
  SIGNEL_QUOT             : "'"   ,
  EQUAL                   : '='   ,
};

/**
 *  database query 결과 정보
 *  @constant {object}
 */
const DB_RESULT       = {
  ROW_FIRST       :  0   ,              // 첫번째 레코드
  AFFECTED_ROWS   : 'affectedRows'  ,   // 영향을 받은 record
  INSERT_ID       : 'insertId'      ,   // insert id
  WARNING_STATUS  : 'warningStatus' ,   // warning
  ONE             : 1               ,   // 결과 1건
};

/**
 *  database 처리 타입 결과 정보
 *  @constant {object}
 */
const DB_PROCESS_TYPE       = {
  TYPE         : 'TYPE'       ,   // TYPE
  INSERT       : 'INSERT'     ,   // INSERT
  UPDATE       : 'UPDATE'     ,   // UPDATE
  DELETE       : 'DELETE'     ,   // DELETE
  HOLD         : 'HOLD'       ,   // 기존 유지
};

/**
 *  작업 `type` 정보
 *  @constant {object}
 */
const UPSERT_FLAG = {
  IN            : "IN",
  OUT           : "OUT",
  CHANGE        : "CHANGE",

  TO_DELETE     : 'toDelete'        ,
  TO_UPDATE     : 'toUpdate'        ,
  TO_UPSERT     : 'toUpsert'        ,
  TO_INSERT     : 'toInsert'        ,
};

/**
 *  데이터 상태 정보
 *  @constant {object}
 */
const DB_STATE       = {
  CLOSE        :  0    ,          // Close
  OPEN         :  1    ,          // 정상
  LOCK         :  2    ,          // 잠김
  DELETE       :  3    ,          // 삭제

  YES          : 'Y'   ,
  NO           : 'N'   ,
};

/**
 *  API 연동 응답 코드
 *  @constant {object}
 */
const API_RESPONSE_CODE           = {
  SUCCESS        :  1             ,  // 정상
  FAIL           :  0             ,  // 실패

  SUCCESS_MSG    :  'success'     ,  // 정상
  FAIL_MSG       :  'fail'        ,  // 정상
};


/**
 *  숫자 상수
 *  @constant {object}
 */
const NUMERIC          = {
  ZERO                          : 0   ,
  POINT_ONE                     : 0.1 ,
  ONE                           : 1   ,
  TWO                           : 2   ,
  TWO_POINT_ONE                 : 2.1 ,
  THREE                         : 3   ,
  FOUR                          : 4   ,
  FIVE                          : 5   ,
  SIX                           : 6   ,
  EIGHT                         : 8   ,
  NINE                          : 9   ,
  TEN                           : 10  ,
  ELEVEN                        : 11  ,
  TWELVE                        : 12  ,
  THIRTEEN                      : 13  ,
  FOURTEEN                      : 14  ,
  FIFTEEN                       : 15  ,
  EIGHTEEN                      : 18  ,
  NINETEEN                      : 19  ,
  TWENTY                        : 20  ,
  TWENTY_EIGHT                  : 28  ,
  FORTY                         : 40  ,
  FORTY_THREE                   : 43  ,
  FIFTY                         : 50  ,
  EIGHTY                        : 80  ,
  NINETY                        : 90  ,
  ONE_HUNDRED                   : 100 ,
  ONE_HUNDRED_TEN               : 110 ,
  ONE_HUNDRED_TWENTY            : 120 ,
  ONE_HUNDRED_SEVENTY           : 170 ,
  ONE_HUNDRED_EIGHTY_FIVE       : 185 ,
  TWO_HUNDRED                   : 200 ,
  TWO_HUNDRED_TEN               : 210 ,
  TWO_HUNDRED_SEVENTY           : 270 ,
  THREE_HUNDRED_TWENTY          : 320 ,
  THREE_HUNDRED_FORTY_SEVEN     : 347 ,
  THREE_HUNDRED_SIXTY_EIGHT     : 368 ,
  THREE_HUNDRED_EIGHTY          : 380 ,
  FOUR_HUNDRED                  : 400 ,
  FOUR_HUNDRED_TEN              : 410 ,
  FOUR_HUNDRED_TWENTY           : 420 ,
  FOUR_HUNDRED_FORTY            : 440 ,
  FOUR_HUNDRED_FIFTY            : 450 ,
  FIVE_HUNDRED                  : 500 ,
  SEVEN_HUNDRED                 : 700 ,
};

/**
 *  local data에서 사용하는 필드 상수
 *  @constant {object}
 */
const DATA_FIELD_NAME = {
  AUTHORIZATION       : 'authorization'         ,
  BEARER_TOKEN        : 'Bearer '               ,
  ACCESS_TOKEN        : 'accessToken'           ,
  KEY_PREFIX          : 'AT:'                   ,
  UNIQUE_KEY_PREFIX   : 'UT:'                   ,
  PAGE                : 'page'                  ,
  PAGE_SIZE           : 'pageSize'              ,  // Items per page
  LIMIT               : 'pageLimit'             ,
  LIST                : 'list'                  ,
  SKIP                : 'pageSkip'              ,
  UNLOCK              : 'unlock'                ,
  EMAIL_DELIMITER     : '@'                     ,
  DEFAULT_TIME_ZONE   : 'Asia/Seoul'            ,
  DEFAULT_LANGUAGE    : 'en'                    ,
  FILE                : 'file'                  ,
  FILENAME            : 'filename'              ,
  FILES               : 'files'                 ,
  FORM                : 'form'                  ,
  FORMAT              : 'format'                ,
  FORM_INFO           : 'formInfo'              ,
  FORM_LIST           : 'formList'              ,
  FORM_NAME           : 'formName'              ,
  SIZE                : 'size'                  ,
  PATH                : 'path'                  ,
  GET                 : 'GET'                   ,
  DATA_COLLECTION     : 'data-collection'       ,
  CDASH               : 'CDASH'                 ,
  CDASHIG             : 'CDASHIG '              ,
  CODE                : 'code'                  ,
  CODE_LIST           : 'codeList'              ,
  ELEMENT             : 'element'               ,
  PROPERTY            : 'property'              ,
  CHILDREN            : 'children'              ,
  EXPR                : 'expr'                  ,
  EXTENSION           : 'extension'             ,
  TAR                 : '.tar.gz'               ,
  DOT                 : '.'                     ,
  DATA                : 'data'                  ,
  ITEM                : 'item'                  ,
  ITEM_GROUP          : 'itemGroup'             ,
  ITEM_GROUP_LIST     : 'itemGroupList'         ,
  ITEM_GROUP_NAME     : 'itemGroupName'         ,
  ORIGIN              : 'origin'                ,
  CREATE_MTP_CMT      : 'createdMTPCmt'         ,
  UPDATE_MTP_CMT      : 'updatedMTPCmt'         ,
  CREATE_STUDY_EVENT  : 'createEventList'       ,
  UPDATE_STUDY_EVENT  : 'updateEventList'       ,
  EXCEL               : '.xlsx'                 ,
  EXCEL_SHORT         : '.xls'                  ,
  CHECK               : 'check'                 ,
  URL                 : 'url'                   ,
  MEASUREMENT_UNIT    : 'measurementUnit'       ,
  FIVE_ZERO_ONE       : '000001'                ,
  TIME_FORMAT_CERTI   : 'MMM DD YYYY'           ,
  RESULT              : 'result'                ,
  PASS                : 'Pass'                  ,
  FAIL                : 'Fail'                  ,
  EXIST               : 'exist'                 ,
  ID                  : 'id'                    ,
  PW                  : 'pw'                    ,
  RAVE                : 'rave'                  ,
  SITE_EN             : 'Site'                  ,
  PERSON_EN           : 'Person(s)'             ,
  FORM_OID            : 'formOid'               ,
  STATUS_MSG          : 'statusMsg'             ,
  USE_MAP             : 'useMap'                ,
  XML                 : '.xml'                  ,
  TIME_POINT          : 'TIME_POINT'            ,
  CHECK_SIGN          : 'checkSign'             ,
  TAB                 : 'tab'                   ,
  FIRST_ID            : 'firstID'               ,
  SECOND_ID           : 'secondID'              ,
  FIRST_DATA          : 'firstData'             ,
  SECOND_DATA         : 'secondData'            ,
  DIFFER_KEY          : 'differKey'             ,
  HTML                : '.html'                 ,
  DEFINE              : 'define'                ,
  UTF_8               : 'utf-8'                 ,
  SECTION             : 'section'               ,
  T_DOMAIN            : 'tDomain'               ,
  DOMAIN_LIST         : 'domainList'            ,
  DOMAIN_DESCRIPTION  : 'domainDescription'     ,
  SUBJECT_INFO        : 'subjectInfo'           ,
  ACRF_LIST           : 'acrfList'              ,
  CONFIRM_INFO        : 'confirmInfo'           ,
  SUMMARY_LIST        : 'summaryList'           ,
  DETAIL_LIST         : 'detailList'            ,
  LOCATION            : 'location'              ,
  ISSUE_SUMMARY       : 'Issue Summary'         ,
  DETAILS             : 'Details'               ,
  TAGS                : 'tags'                  ,
  SDRG                : 'SDRG'                  ,
  ZIP                 : 'zip'                   ,
  PACKAGE             : 'PACKAGE'               ,
  DEFINE_XML          : 'DefineXML'             ,
  ACTION              : 'action'                ,
  DOWNLOAD            : 'download'              ,
  SUBJECT_ID          : 'subjectID'             ,
  STUDY_INFO          : 'studyInfo'             ,
  STANDARD_INFO       : 'standardInfo'          ,
  ITEM_REFS           : 'itemRefs'              ,
  ACRF                : 'acrf'                  ,
  PDF                 : '.pdf'                  ,
  EPOCH_INFO          : 'epochInfo'             ,
  EVENT_INFO          : 'eventInfo'             ,
  QUERY               : 'query'                 ,
  PLAIN_PASSWORD      : 'plainPassword'         ,
  STYLE_SHEET         : 'styleSheet'            ,
  SDTMIG              : 'SDTMIG'                ,
  CDISC_NCI_SDTM      : 'CDISC/NCI SDTM'        ,
  IG                  : 'IG'                    ,
  CT                  : 'CT'                    ,
  REGISTRATION_STATUS : 'registrationStatus'    ,
  SUCCESS_FAIL        : 'success/fail'          ,
  QUESTION_ORDER      : 'questionOrder'         ,
  EXAMPLE_ORDER       : 'exampleOrder'          ,
  EXAMPLE_ID          : 'exampleID'             ,
  EXAMPLE_IDS         : 'exampleIDs'            ,
  DELETE_QUESTIONS    : 'deleteQuestions'       ,
  INSERT_QUESTIONS    : 'insertQuestions'       ,
  INSERT_EXAMPLES     : 'insertExamples'        ,
  UPDATE_QUESTIONS    : 'updateQuestions'       ,
  UPDATE_EXAMPLES     : 'updateExamples'        ,
  METADATA            : 'metaData'              ,
  ODM                 : 'ODM'                   ,
  CLINICAL_DATA       : 'ClinicalData'          ,
  SITE_NAME           : 'siteName'              ,
  SUBJECT_NAME_LIST   : 'subjectNameList'       ,
  SUBJECT_DATA        : 'SubjectData'           ,
  SITE_REF            : 'SiteRef'               ,
  LOCATION_OID        : 'LocationOID'           ,
  SUBJECT_KEY         : 'SubjectKey'            ,
  STUDY_EVENT_DATA    : 'StudyEventData'        ,
  STUDY_EVENT_DATA_TABLE : 'studyEventDataTable',
  STUDY_EVENT_OID     : 'StudyEventOID'         ,
  SUBJECT_NAME        : 'subjectName'           ,
  STUDY_ID            : 'StudyID'               ,
  STUDY_OID           : 'StudyOID'              ,
  METADATA_VERSION_ID : 'MetaDataVersionID'     ,
  METADATA_VERSION_OID: 'MetaDataVersionOID'    ,
  DATA_SET            : 'DataSet'               ,
  FORM_DATA           : 'FormData'              ,
  ITEM_GROUP_DATA     : 'ItemGroupData'         ,
  ITEM_DATA           : 'ItemData'              ,
  ITEM_TABLE          : 'itemTable'             ,
  ITEM_GROUP_OID      : 'ItemGroupOID'          ,
  FORMOID             : 'FormOID'               ,
  ITEM_OID            : 'ItemOID'               ,
  VALUE               : 'Value'                 ,
  IS_NULL             : 'IsNull'                ,
  IS_UPDATED          : 'isUpdated'             ,
  SORT_TYPE           : 'sortType'              ,
  DATE                : 'date'                  ,
  PRIME               : 'prime'                 ,
  IS_EMPTY            : 'isEmpty'               ,
  NOT_FOUND           : 'NotFound'              ,
  DESIGN_VERSION      : 'designVersion'         ,
  RAVE_STUDY          : 'raveStudy'             ,
  RAVE_VERSION        : 'raveVersion'           ,
  SEQUENCE            : 'sequence'              ,
  DRAFT               : 'draft'                 ,
};

/**
 *  페이징 default value
 *  @constant {object}
 */
const DEFVAL_QUERYSTRING = {
  [DATA_FIELD_NAME.PAGE]      : 1 ,
  [DATA_FIELD_NAME.PAGE_SIZE] : 10,
};

/**
 *  mongo db에서 사용하는 상수 정의
 *  @constant {object}
 */
const MONGO_CONST = {
  ON_FILTER   : 1 ,
  OFF_FILTER  : 0 ,
};

/**
 *  정규식에서 사용하는 패턴 정의
 *  @constant {object}
 */
const REGEX_PATTERN = {
  RANDOM_CHAR                 : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=?/'  ,
  INDICATION_NAME             : /]name$/                                                                          ,
  TAR                         : /tar.gz$/                                                                         ,
  NULL_JSON_ARRAY             : "[\"null\"]"                                                                      ,
  EMPTY_JSON_ARRAY            : "[]"                                                                              ,
  READ_ME                     : /Read$/i                                                                          ,
  ALPHA_NUMERIC               : /[^-A-Za-z0-9_]/g                                                                 ,
  RANDOM                      : /^Random$/ig                                                                      ,
  REFERENCE                   : /^Reference$/ig                                                                   ,
  LNR                         : /^LNR$/ig                                                                         ,
  CRF_FORM_PREFIX             : /CRFM/                                                                            ,
  DEFINE_XML                  : /Define.xml/                                                                      ,
  STYLE_TAG                   : /<\?xml-stylesheet.*.\?>/                                                         ,
  EXTERNAL                    : /class="external"/                                                                ,
  DEFINE_IG_DEF               : /<ItemGroupDef /                                                                  ,
  DEFINE_IG_OID               : /OID=".*." Domain="/                                                              ,
  DEFINE_DOMAIN               : /Domain=".*." Name/                                                               ,
  DEFINE_IT_REF               : /<ItemRef ItemOID=".*." Mandatory/gm                                              ,
  DEFINE_IT_DEF               : /<ItemDef /m                                                                      ,
  DEFINE_IT_OID               : /OID=".*." Name="/                                                                ,
  DOT                         : /\./g                                                                             ,
  IGNORE_FILES                : /(.xlsx)|(.xlx)|(.xpt)|(.pdf)|(.txt)/ig                                           ,
  FORBIDDEN_QUERY             : /(INSERT)|(UPDATE)|(DELETE)|(DESC)|(SHOW)|(GRANT)|(CREATE)|(DROP)|(FLUSH)/ig      ,
  SDTMIG                      : /sdtmig\/[0-9]-[0-9]/                                                             ,
  SDTMCT                      : /sdtmct-/                                                                         ,
  ALL_DASH                    : /-/g                                                                              ,
  DOUBLE_QUOT                 : /"/g                                                                              ,
  LINE_SEPARATE_BLANKS        : /\n +/g                                                                           ,  // \n and any following white spaces
  DEV                         : /dev/                                                                             ,
  QA                          : /qa/                                                                              ,
  APP                         : /app/                                                                             ,
  GS                          : /gs/                                                                              ,
  ACTION_CODE                 : /actionCode=insert|actionCode=update|actionCode=delete/                           ,
};

/**
 *  사용자 역할 상수
 *  @constant {object}
 */
const USER_ROLE = {
  MASTER  : 'Master'  ,
  ADMIN   : 'Admin'   ,
  MEDICAL : 'Medical' ,
  DM      : 'DM'      ,
  STAT    : 'STAT'    ,
};

/**
 *  권한 타입
 *  @constant {object}
 */
const RIGHT_TYPE = {
  GRANT : 'grant'   ,
  LOSS  : 'loss'    ,
};

/**
 *  code list type
 *  @constant {object}
 */
const CODE_LIST_TYPE = {
  STANDARD : 'STANDARD',
  CUSTOM   : 'CUSTOM'  ,
};

/**
 *  파일 경로 상수
 *  @constant {object}
 */
const FILE_DIR = {
  SEPARATOR         : '/'                                                                   ,

  RAN_TEMPLATE      : 'common/template/clinical/random/Random_Template.xlsx'                ,
  REF_TEMPLATE      : 'common/template/clinical/reference/Reference_Template.xlsx'          ,
  CLINICALDATA      : 'sdtm/clinical/clinicalDataXML/'                                      ,

  CRITERIA_TEMPLATE : 'common/template/design/synopsis/criteria/Criteria_Template.xlsx'     ,

  ACRF              : 'files/design/acrf/'                                                  ,
  PACKAGE           : 'files/package/tar'                                                   ,
  CONTENTS          : 'contents'                                                            ,

  PACKAGE_DEFINE    : 'sdtm/define/'                                                        ,
};

/**
 *  데이터 처리 액션 상수
 *  @constant {object}
 */
const DATA_ACTION = {
  NEW : "new"   ,
  HOLD: "hold"  ,
};

/**
 *  이벤트 핸들러 상수
 *  @constant {object}
 */
const EVENT_HANDLER = {
  ERROR   : 'error'                   ,   // fs error
  DATA    : 'data'                    ,   // fs data
  FINISH  : 'finish'                  ,   // fs.createWriteStream.on('finish')
  END     : 'end'                     ,   // fs.createReadStream.on('end')
  CLOSE   : 'close'                   ,   // fs.close
};

/**
 *  IG Model Type 상수
 *  @constant {object}
 */
const IG_TYPE = {
  CDASH   : 'CDASH'   ,
  CUSTOM  : 'CUSTOM'  ,
};

/**
 *  CDASH Domain 상수
 *  @constant {object}
 */
const CDASH_DOMAIN = {
  DA_FULL   : 'Drug Accountability'               ,
  DA_SHORT  : 'DA'                                ,
  DD_FULL   : 'Death Details'                     ,
  DD_SHORT  : 'DD'                                ,
  EG_FULL   : 'ECG'                               ,
  EG_SHORT  : 'EG'                                ,
  LB_FULL   : 'Labs'                              ,
  LB_SHORT  : 'LB'                                ,
  MB_FULL   : 'Microbiology Specimen'             ,
  MB_SHORT  : 'MB'                                ,
  MI_FULL   : 'Microscopic Findings'              ,
  MI_SHORT  : 'MI'                                ,
  MS_FULL   : 'Microbiology Susceptibility Test'  ,
  MS_SHORT  : 'MS'                                ,
  PC_FULL   : 'Pharmacokinetic Concentrations'    ,
  PC_SHORT  : 'PC'                                ,
  PE_FULL   : 'Physical Examination'              ,
  PE_SHORT  : 'PE'                                ,
  SC_FULL   : 'Subject Characteristics'           ,
  SC_SHORT  : 'SC'                                ,
  VS_FULL   : 'Vital Signs'                       ,
  VS_SHORT  : 'VS'                                ,
  SKIN      : 'Skin Response Findings'            ,
  SKIN_SHORT: 'SR'                                ,
  PHYS      : 'Physical Exam'                     ,
  PHAR      : 'Pharmacokinetics'                  ,
  LABO_F    : 'Laboratory Test Findings'          ,
  LABO_T    : 'Laboratory Test Results'           ,
  ECG       : 'ECG Test Results'                  ,

};

/**
 *  SEQUENCE 에 사용할 PREFIX 상수
 *  @constant {object}
 */
const ID_PREFIX = {

  TB_DESIGN                               :   'DEGN',         //  TB_DESIGN
  TB_DESIGN_CONFIGURATION                 :   'DECF',         //  TB_DESIGN_CONFIGURATION
  TB_DESIGN_CRITERIA                      :   'DECR',         //  TB_DESIGN_CRITERIA
  TB_DESIGN_ENDPOINT                      :   'DEEP',         //  TB_DESIGN_ENDPOINT
  TB_DESIGN_IP                            :   'DEIP',         //  TB_DESIGN_IP
  TB_DESIGN_IP_ITEM                       :   'DEIT',         //  TB_DESIGN_IP_ITEM
  TB_DESIGN_OBJECTIVE                     :   'DEOB',         //  TB_DESIGN_OBJECTIVE
  TB_DESIGN_LANGUAGE                      :   'DELG',         //  TB_DESIGN_LANGUAGE

  TB_DESIGN_SOA                           :   'DGSA',         //  TB_DESIGN_SOA
  TB_DESIGN_SOA_INFO                      :   'DGSI',         //  TB_DESIGN_SOA_INFO
  TB_DESIGN_MAP_TA                        :   'DGMT',         //  TB_DESIGN_MAP_TA

  TB_MAP_CONCEPT                          :   'MPCE',         //  TB_MAP_CONCEPT
  TB_MAP_CONCEPT_CODELIST                 :   'MPCO',         //  TB_MAP_CONCEPT_CODELIST
  TB_MAP_CONCEPT_VARIABLE                 :   'MPVA',         //  TB_MAP_CONCEPT_VARIABLE
  TB_MAP_CONCEPT_VERSION                  :   'MPVE',         //  TB_MAP_CONCEPT_VERSION

  TB_MAP_DESIGN                           :   'MDGN',         //  TB_MAP_DESIGN
  TB_MAP_DESIGN_ENDPOINT                  :   'MDEP',         //  TB_MAP_DESIGN_ENDPOINT
  TB_MAP_DESIGN_OBJECTIVE                 :   'MDOB',         //  TB_MAP_DESIGN_OBJECTIVE

  TB_MAP_TA                               :   'TMMP',         //  TB_MAP_TA
  TB_MAP_TA_ACTIVITY                      :   'TMAC',         //  TB_MAP_TA_ACTIVITY
  TB_MAP_TA_CONCEPT                       :   'TMCP',         //  TB_MAP_TA_CONCEPT
  TB_MAP_TA_CODELIST                      :   'TMCL',         //  TB_MAP_TA_CODELIST
  TB_MAP_TA_VARIABLE                      :   'TMVA',         //  TB_MAP_TA_VARIABLE

  TB_MAP_TA_PUBLIC                        :   'TMPP',         //  TB_MAP_TA_PUBLIC
  TB_MAP_TA_ACTIVITY_PUBLIC               :   'TACP',         //  TB_MAP_TA_ACTIVITY_PUBLIC
  TB_MAP_TA_CONCEPT_PUBLIC                :   'TCTP',         //  TB_MAP_TA_CONCEPT_PUBLIC
  TB_MAP_TA_CONCEPT_VERSION_PUBLIC        :   'TTCP',         //  TB_MAP_TA_CONCEPT_VERSION_PUBLIC
  TB_MAP_TA_CODELIST_PUBLIC               :   'TCLP',         //  TB_MAP_TA_CODELIST_PUBLIC
  TB_MAP_TA_VARIABLE_PUBLIC               :   'TVAP',         //  TB_MAP_TA_VARIABLE_PUBLIC

  TB_METADATA_ACTIVITY                    :   'MTAC',         //  TB_METADATA_ACTIVITY
  TB_METADATA_ASSESSMENT                  :   'MTAS',         //  TB_METADATA_ASSESSMENT
  TB_METADATA_CRITERIA                    :   'MTCR',         //  TB_METADATA_CRITERIA
  TB_METADATA_ENDPOINT                    :   'MTEP',         //  TB_METADATA_ENDPOINT
  TB_METADATA_INDICATION                  :   'MTIC',         //  TB_METADATA_INDICATION
  TB_METADATA_OBJECTIVE                   :   'MTOB',         //  TB_METADATA_OBJECTIVE
  TB_METADATA_TA                          :   'MTTA',         //  TB_METADATA_TA
  TB_METADATA_FUNCTION                    :   'MTFN',         //  TB_METADATA_FUNCTION

  TB_PARTNER                              :   'PATR',         //  TB_PARTNER
  TB_SPONSOR                              :   'SPON',         //  TB_SPONSOR

  TB_STANDARD_CODE_LIST                   :   'SDCL',         //  TB_STANDARD_CODELIST
  TB_STANDARD_IG                          :   'SDIG',         //  TB_STANDARD_IG
  TB_STANDARD_IG_VARIABLE                 :   'SDIV',         //  TB_STANDARD_IG_VARIABLE
  TB_STANDARD_TERMINOLOGY                 :   'SDTE',         //  TB_STANDARD_TERMINOLOGY
  TB_STANDARD_TERMINOLOGY_VERSION         :   'SDTV',         //  TB_STANDARD_TERMINOLOGY_VERSION
  TB_STANDARD_TERM_CODE                   :   'SDTC',         //  TB_STANDARD_TERM_CODE

  TB_STRUCTURE_ARM                        :   'STAM',         //  TB_STRUCTURE_ARM
  TB_STRUCTURE_CELL                       :   'STCE',         //  TB_STRUCTURE_CELL
  TB_STRUCTURE_CELL_IP                    :   'STCI',         //  TB_STRUCTURE_CELL_IP
  TB_STRUCTURE_EPOCH                      :   'STEP',         //  TB_STRUCTURE_EPOCH
  TB_STRUCTURE_SEGMENT                    :   'STSG',         //  TB_STRUCTURE_SEGMENT
  TB_STRUCTURE_SEGMENT_IP                 :   'STSI',         //  TB_STRUCTURE_SEGMENT_IP

  TB_STUDY                                :   'SUDY',         //  TB_STUDY
  TB_STUDY_INDICATION                     :   'SUID',         //  TB_STUDY_INDICATION
  TB_STUDY_SPONSOR                        :   'SUSP',         //  TB_STUDY_SPONSOR
  TB_STUDY_COUNTRY                        :   'SUCN',         //  TB_STUDY_COUNTRY
  TB_STUDY_LANGUAGE                       :   'SULG',         //  TB_STUDY_LANGUAGE
  TB_STUDY_EVENT                          :   'SUEV',         //  TB_STUDY_EVENT
  TB_STUDY_RIGHT                          :   'SURT',         //  TB_STUDY_RIGHT

  TB_SUPPORT_NOTICE                       :   'SPNO',         //  TB_SUPPORT_NOTICE

  TB_LANG                                 :   'LANG',         //  TB_LANG

  TB_USER                                 :   'USER',         //  TB_USER
  TB_USER_PASSWORD_LOG                    :   'PWDL',         //  TB_USER_PASSWORD_LOG

  TB_REFERENCE                            :   'RFNC',         // TB_REFERENCE
  TB_REFERENCE_INDICATION                 :   'RFIN',         // TB_REFERENCE_INDICATION

  TB_CRF                                  :   'CRFT',         //  TB_CRF
  TB_CRF_FORM                             :   'CRFM',         //  TB_CRF_FORM
  TB_CRF_ITEM_GROUP                       :   'CRIG',         //  TB_CRF_ITEM_GROUP
  TB_CRF_ITEM_GROUP_REF                   :   'CRGR',         //  TB_CRF_ITEM_GROUP_REF
  TB_CRF_ITEM                             :   'CRIT',         //  TB_CRF_ITEM
  TB_CRF_ITEM_REF                         :   'CRIR',         //  TB_CRF_ITEM_REF
  TB_CRF_CODELIST                         :   'CRCL',         //  TB_CRF_CODELIST
  TB_CRF_CODELIST_REF                     :   'CRCR',         //  TB_CRF_CODELIST_REF
  TB_CRF_CODELIST_GROUP                   :   'CRCG',         //  TB_CRF_CODELIST_GROUP
  TB_CRF_BUILD_LOG                        :   'CRBL',         //  TB_CRF_BUILD_LOG

  TB_SDTM_IG_VARIABLE                     :   'SMIV',         //  TB_SDTM_IG_VARIABLE

  TB_SDTM_CLINICAL                        :   'SMCL',         //  TB_SDTM_CLINICAL
  TB_SDTM_CLINICAL_DATASET                :   'SMCD',         //  TB_SDTM_CLINICAL_DATASET
  TB_SDTM_CLINICAL_LNR                    :   'SMLR',         //  TB_SDTM_CLINICAL_LNR
  TB_SDTM_CLINICAL_LNR_DATASET            :   'SMLD',         //  TB_SDTM_CLINICAL_LNR_DATASET
  TB_SDTM_CLINICAL_RANDOM                 :   'SMRM',         //  TB_SDTM_CLINICAL_RANDOM
  TB_SDTM_CLINICAL_RANDOM_DATASET         :   'SMRD',         //  TB_SDTM_CLINICAL_RANDOM_DATASET
  TB_SDTM_CLINICAL_REFERENCE              :   'SMFN',         //  TB_SDTM_CLINICAL_REFERENCE
  TB_SDTM_CLINICAL_REFERENCE_DATASET      :   'SMFD',         //  TB_SDTM_CLINICAL_REFERENCE_DATASET
  TB_SDTM_CLINICAL_IMPORT                 :   'SMIP',         //  TB_SDTM_CLINICAL_IMPORT
  TB_SDTM_CLINICAL_SUBJECT                :   'SMCS',         //  TB_SDTM_CLINICAL_SUBJECT

  TB_SDTM_MAPPING_CODELIST                :   'SMPC',         //  TB_SDTM_MAPPING_CODELIST

  TB_SDTM_MAPPING                         :   'SMMP',         //  TB_SDTM_MAPPING
  TB_SDTM_MAPPING_HISTORY                 :   'SMHT',         //  TB_SDTM_MAPPING_HISTORY
  TB_SDTM_MAPPING_VARIABLE                :   'SMVB',         //  TB_SDTM_MAPPING_VARIABLE
  TB_SDTM_MAPPING_DOMAIN                  :   'SMMD',         //  TB_SDTM_MAPPING_DOMAIN
  TB_SDTM_MAPPING_TA                      :   'SMTA',         //  TB_SDTM_MAPPING_TA
  TB_SDTM_MAPPING_TE                      :   'SMTE',         //  TB_SDTM_MAPPING_TE
  TB_SDTM_MAPPING_TV                      :   'SMTV',         //  TB_SDTM_MAPPING_TV

  TB_SDTM_PACKAGE                         :   'SMPK',         //  TB_SDTM_PACKAGE

  TB_TRAINING                             :   'TRAN',         //  TB_TRAINING
  TB_TRAINING_PAGE                        :   'TRPG',         //  TB_TRAINING_PAGE
  TB_TRAINING_QUESTION                    :   'TRQS',         //  TB_TRAINING_QUESTION
  TB_TRAINING_EXAMPLE                     :   'TREX',         //  TB_TRAINING_EXAMPLE
  TB_TRAINING_USER                        :   'TRUS',         //  TB_TRAINING_USER
  TB_TRAINING_CERTIFICATE                 :   'TRCT',         //  TB_TRAINING_CERTIFICATE

  TB_SDTM_MAPPING_TS                      :   'SMTS',         //  TB_SDTM_MAPPING_TS
  TB_SDTM_MAPPING_TM                      :   'SMTM',         //  TB_SDTM_MAPPING_TM

  TB_SDTM_TE_VISIT                        :   'SMTV',         //  TB_SDTM_TE_VISIT
  TB_SDTM_TE_CONDITION                    :   'SMTC',         //  TB_SDTM_TE_CONDITION

  TB_SDTM_TV_VISIT                        :   'SMTT',         //  TB_SDTM_TV_VISIT
  TB_SDTM_TV_CONDITION                    :   'SMTN',         //  TB_SDTM_TV_CONDITION

  TB_SDTM_TM_DEF                          :   'SMTD',         //  TB_SDTM_TM_DEF
  TB_SDTM_TM_CONDITION                    :   'SMTO',         //  TB_SDTM_TM_CONDITION

  TB_SDTM_MAPPING_RELREC                  :   'SMRR',         //  TB_SDTM_MAPPING_RELREC
  TB_SDTM_RELREC_CONDITION                :   'SMRC',         //  TB_SDTM_RELREC_CONDITION

  TB_SDTM_MAPPING_DESCRIPTION             :   'SMDE',         //  TB_SDTM_MAPPING_DESCRIPTION
  TB_SDTM_MAPPING_ITEMGROUP               :   'SMIG',         //  TB_SDTM_MAPPING_ITEMGROUP
  TB_SDTM_MAPPING_ITEMGROUP_DESCRIPTION   :   'SMID',         //  TB_SDTM_MAPPING_ITEMGROUP_DESCRIPTION

  TB_SDTM_MAPPING_DEFINE                  :   'DEFN',         //  TB_SDTM_MAPPING_DEFINE
  TB_SDTM_MAPPING_DEFINE_DESCRIPTION      :   'DEFD',         //  TB_SDTM_MAPPING_DEFINE_DESCRIPTION

  TB_SDRG_ACRONYMS                        :   'SRAC',         //  TB_SDRG_ACRONYMS
  TB_SDRG_SUBJECT                         :   'SRSJ',         //  TB_SDRG_SUBJECT
  TB_SDRG_ACRF_PAGE                       :   'SRAP',         //  TB_SDRG_ACRF_PAGE

  TB_SDRG_CONFORM                         :   'SRCF',         //  TB_SDRG_CONFORM
  TB_SDRG_ISSUE_SUMMARY                   :   'SRIS',         //  TB_SDRG_ISSUE_SUMMARY
  TB_SDRG_ISSUE_DETAIL                    :   'SRID',         //  TB_SDRG_ISSUE_DETAIL

  TB_SDTM_PACKAGE_FORMAT                  :   'SPFM',         // TB_SDTM_PACKAGE_FORMAT
  TB_SDTM_PACKAGE_DATASET                 :   'SPDS',         // TB_SDTM_PACKAGE_DATASET

  TB_SDTM_STANDARD                        :   'SDSD',         // TB_SDTM_STANDARD
};

/**
 *  design sql mapper 를 사용하기 위한  namespace
 *  @constant {object}
 */
const NAMESPACE = {
  ACCOUNT             :   'ACCOUNT'             ,
  ADMIN_USER          :   'ADMIN_USER'          ,
  AUTH                :   'AUTH'                ,
  CDISCIG             :   'CDISCIG'             ,
  CDISCTM             :   'CDISCTM'             ,
  CLINICAL            :   'CLINICAL'            ,
  CODE_LIST           :   'CODE_LIST'           ,
  COMMON              :   'COMMON'              ,
  CONCEPT             :   'CONCEPT'             ,
  CRF                 :   'CRF'                 ,
  DEFINE              :   'DEFINE'              ,
  DESIGN              :   'DESIGN'              ,
  IG                  :   'IG'                  ,
  MAPPING             :   'MAPPING'             ,
  MAPPING_VERSION     :   'MAPPING_VERSION'     ,
  MDR_DESIGN          :   'MDR_DESIGN'          ,
  METADATA            :   'METADATA'            ,
  PACKAGE             :   'PACKAGE'             ,
  PARTNER             :   'PARTNER'             ,
  PRM                 :   'PRM'                 ,
  REFERENCE           :   'REFERENCE'           ,
  SOA                 :   'SOA'                 ,
  STUDY               :   'STUDY'               ,
  SUPPORT             :   'SUPPORT'             ,
  USER_SUPPORT        :   'USER_SUPPORT'        ,
  SYNOPSIS            :   'SYNOPSIS'            ,
  TA                  :   'TA'                  ,
  TERMINOLOGY         :   'TERMINOLOGY'         ,
  TRAINING_MASTER     :   'TRAINING_MASTER'     ,
  TRAINING_USER       :   'TRAINING_USER'       ,
  USER                :   'USER'                ,
  SDTM_INFO           :   'SDTM_INFO'           ,
  SQL                 :   'SQL'                 ,
  STANDARD_SDTM       :   'STANDARD_SDTM'       ,
  SDTM_IG             :   'SDTM_IG'             ,
  ADMIN_LOG           :   'ADMIN_LOG'           ,

};

/**
 *  언어
 *  @constant {object}
 */
const LANGUAGE = {
  KR : 'kr',
  EN : 'en'
}

/**
 * 시간 형태
 *  @constant {object}
 */
const DATE_FORMAT = {
  YYYY_MM_DD          : 'YYYY-MM-DD',
  YYYY_MM_DD_H_MM_SS  : 'YYYY-MM-DD h:mm:ss',
}

/**
 * 버전 Major/Minor 구분
 */
const VERSION_LEVEL = {
  FIELD : "level",

  MAJOR : "major",
  MINOR : "minor",
};


/**
 *  design intervention type
 *  @constant {object}
 */
const INTERVENTION_TYPE = {
  CROSS_OVER    : 'CROSS-OVER'    ,
  PARALLEL      : 'PARALLEL'      ,
  SINGLE_GROUP  : 'SINGLE GROUP'  ,
  FACTORIAL     : 'Factorial'     ,
};


/**
 *  epoch name
 *  @constant {object}
 */
const EPOCH_NAME = {
  SCREENING    : 'Screening'    ,
  TREATMENT    : 'Treatment'    ,
};

/**
 *  arm default info
 *  @constant {object}
 */
const ARM_NAME = {
  FIRST_NAME   : 'Group A'  ,
  SECOND_NAME  : 'Group B'  ,
};


/**
 *  Element name object
 *  @constant {object}
 */
const ELEMENT_NAME ={

  TPT       : 'TPT'       ,
  TPTREF    : 'TPTREF'    ,

  IECAT     : 'IECAT'     ,
  IESPID    : 'IESPID'    ,
  IETESTCD  : 'IETESTCD'  ,
  IETEST    : 'IETEST'    ,
  IEORRES   : 'IEORRES'   ,

}


/**
 *  origin name
 *  @constant {object}
 */
const ORIGIN_NAME ={
  CRITERIA  : 'Criteria'  ,
  INCLUSION : 'Inclusion' ,
  EXCLUSION : 'Exclusion' ,
};

/**
 *  item source type
 *  @constant {object}
 */
const SOURCE_TYPE ={
  CRF  : 'CRF'  ,
};


/**
 *  crf item type
 *  @constant {object}
 */
const CRF_ITEM_TYPE ={
  ASSIGN        : 'Assign'   ,
  COLLECTED     : 'Collected',
  COLLECTED_EDT : 'Collected_eDT'
};


/**
 *  crf component type
 *  @constant {object}
 */
const CRF_COMPONENT_TYPE ={
  RADIO     : 'Radio'     ,
  TEXT      : 'Text'      ,
};

/**
 *  crf generate type
 *  @constant {object}
 */
const CRF_GEN_TYPE ={
  DESIGN     : 'design'     ,
  ODM        : 'ODM'        ,
};




/**
 *  criteria domain
 *  @constant {string}
 */
const CRITERIA_DOMAIN = 'IE';


/**
 *  time point add variable
 *  @constant {array}
 */
const TIME_POINT_ADD_ELEMENT = [
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.TPT    ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'    ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Text'    ,
  },
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.TPTREF   ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'    ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Text'    ,
  }
];


/**
 *  criteria add item
 *  @constant {array}
 */
const CRITERIA_ADD_ITEM = [
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.IECAT      ,
    [DB_FIELD_NAME.FIELD_ALIAS]     : ''          ,
    [DB_FIELD_NAME.QUESTION]        : ''          ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Text'      ,
    [DB_FIELD_NAME.ENABLED]         : '1'         ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'      ,
    [DB_FIELD_NAME.TYPE]            : 'Assign'    ,
    [DB_FIELD_NAME.COLLECT]         : ''          ,
    [DB_FIELD_NAME.SOURCE]          : ''          ,
    [DB_FIELD_NAME.SDTM_DOMAIN]     : 'IE'        ,
    [DB_FIELD_NAME.SDTM_VARIABLE]   : ELEMENT_NAME.IECAT      ,
  },
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.IESPID     ,
    [DB_FIELD_NAME.FIELD_ALIAS]     : ''          ,
    [DB_FIELD_NAME.QUESTION]        : ''          ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Integer'   ,
    [DB_FIELD_NAME.ENABLED]         : '1'         ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Integer'   ,
    [DB_FIELD_NAME.TYPE]            : 'Assign'    ,
    [DB_FIELD_NAME.COLLECT]         : ''          ,
    [DB_FIELD_NAME.SOURCE]          : ''          ,
    [DB_FIELD_NAME.SDTM_DOMAIN]     : 'IE'        ,
    [DB_FIELD_NAME.SDTM_VARIABLE]   : ELEMENT_NAME.IESPID      ,
  },
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.IETESTCD   ,
    [DB_FIELD_NAME.FIELD_ALIAS]     : ''          ,
    [DB_FIELD_NAME.QUESTION]        : ''          ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Text'      ,
    [DB_FIELD_NAME.ENABLED]         : '1'         ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'      ,
    [DB_FIELD_NAME.TYPE]            : 'Assign'    ,
    [DB_FIELD_NAME.COLLECT]         : ''          ,
    [DB_FIELD_NAME.SOURCE]          : ''          ,
    [DB_FIELD_NAME.SDTM_DOMAIN]     : 'IE'        ,
    [DB_FIELD_NAME.SDTM_VARIABLE]   : ELEMENT_NAME.IETESTCD      ,
  },
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.IETEST     ,
    [DB_FIELD_NAME.FIELD_ALIAS]     : ''          ,
    [DB_FIELD_NAME.QUESTION]        : ''          ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Text'      ,
    [DB_FIELD_NAME.DEFAULT_VALUE]   : ''          ,
    [DB_FIELD_NAME.ENABLED]         : '1'         ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'      ,
    [DB_FIELD_NAME.TYPE]            : 'Assign'    ,
    [DB_FIELD_NAME.COLLECT]         : ''          ,
    [DB_FIELD_NAME.SOURCE]          : ''          ,
    [DB_FIELD_NAME.SDTM_DOMAIN]     : 'IE'        ,
    [DB_FIELD_NAME.SDTM_VARIABLE]   : ELEMENT_NAME.IETEST     ,
  },
  {
    [DB_FIELD_NAME.ELEMENT]         : ELEMENT_NAME.IEORRES    ,
    [DB_FIELD_NAME.FIELD_ALIAS]     : ''          ,
    [DB_FIELD_NAME.QUESTION]        : ''          ,
    [DB_FIELD_NAME.COMPONENT_TYPE]  : 'Radio'     ,
    [DB_FIELD_NAME.DEFAULT_VALUE]   : ''          ,
    [DB_FIELD_NAME.ENABLED]         : '1'         ,
    [DB_FIELD_NAME.DATA_TYPE]       : 'Text'      ,
    [DB_FIELD_NAME.TYPE]            : 'Collected' ,
    [DB_FIELD_NAME.COLLECT]         : 'CRF'       ,
    [DB_FIELD_NAME.SOURCE]          : 'CRF'       ,
    [DB_FIELD_NAME.SDTM_DOMAIN]     : 'IE'        ,
    [DB_FIELD_NAME.SDTM_VARIABLE]   : ELEMENT_NAME.IEORRES     ,
  }
];

// Criteria ORRES Term ID
const CRITERIA_ORRES_TERM_ID    = 'SDTE000000000021'
// Criteria ORRES Term NAME
const CRITERIA_ORRES_TERM_NAME  = 'NY_YN'

/**
 *  default SDTM Domain
 *  @constant {array}
 */
const DEFAULT_SUMMARY_DOMAIN =[
  'TS','TA','TE','TV','TM'
];

/**
 *  Certificate PDF
 *  @constant {object}
 */
const CERTIFICATE ={
  BASE_IMG      : 'common/certificate/K-244.png'                                                          ,
  TEXT_PART_ONE : 'The person above has successfully completed the training –\n"'                         ,
  TEXT_PART_TWO : '".\nHence, he or she has conferred with the certificate issued by imtrial.'            ,
  LEFT          : 'left'                                                                                  ,
  FILL_COLOR    : '#C5B358'                                                                               ,
  BLACK         : '#000000'                                                                               ,
  EXT_PDF       : '.pdf'                                                                                  ,
  UPLOAD_DIR    : 'training/certificate/'                                                                 ,
};

/**
 *  Position
 *  @constant {object}
 */
const POSITION ={
  LEFT          : 'left'     ,
};

/**
 *  Font
 *  @constant {object}
 */
const FONT ={
  TIMES_ROMAN          : 'Times-Roman'                ,
  TIMES_BOLD_ITALIC    : 'Times-BoldItalic'           ,
  NANUM_MJ_EXT_BOLD    : 'NanumMyeongjoExtraBold'     ,
  NANUM_MJ_BOLD        : 'NanumMyeongjoBold'          ,
  NANUM_MJ             : 'NanumMyeongjo'              ,
  NANUM                : 'nanumfont'                  ,
  TTF                  : '.ttf'                       ,
};

/**
 *  default TX Domain
 *  @constant {object}
 */
const T_DOMAIN = {
  TS  : 'TS' ,
  TA  : 'TA' ,
  TE  : 'TE' ,
  TV  : 'TV' ,
  TM  : 'TM'
};

/**
 *  S3
 *  @constant {object}
 */
const S3 = {
  STORAGE                 : 'storage'                           ,
  S3                      : 's3'                                ,
  BUCKET                  : 'bucket'                            ,
  BUCKET_CAPITAL          : 'Bucket'                            ,
  KEY                     : 'key'                               ,
  KEY_CAPITAL             : 'Key'                               ,
  ACL                     : 'acl'                               ,
  ACL_CAPITAL             : 'ACL'                               ,
  PUBLIC_READ             : 'public-read'                       ,
  CONTENT_TYPE            : 'contentType'                       ,
  ACCESS_KEY              : 'accessKeyId'                       ,
  SECRET_KEY              : 'secretAccessKey'                   ,
  REGION                  : 'region'                            ,
  BODY                    : 'Body'                              ,
  CONTENT_TYPE_CAPITAL    : 'ContentType'                       ,
  XML                     : 'xml'                               ,
  HTTPS                   : 'https://'                          ,
  S3_ADDR                 : '.s3.ap-northeast-2.amazonaws.com'  ,
  TAR                     : '.tar.gz'                           ,
  PDF                     : 'pdf'                               ,
  HTML                    : '.html'                             ,
  DELETE                  : 'Delete'                            ,
  OBJECTS                 : 'Objects'                           ,
  COPY_SOURCE             : 'CopySource'                        ,
  PLAIN_TEXT              : 'text/plain'                        ,
  PREFIX                  : 'Prefix'                            ,
  DATA_LOG_FOLDER         : '/data/'                            ,
};

/**
 *  Table Name
 *  @constant {object}
 */
const TABLE = {
  TB_DESIGN_OBJECTIVE         : 'TB_DESIGN_OBJECTIVE'         ,
  TB_DESIGN_ENDPOINT          : 'TB_DESIGN_ENDPOINT'          ,
  TB_DESIGN_CRITERIA          : 'TB_DESIGN_CRITERIA'          ,
  TB_DESIGN_IP_ITEM           : 'TB_DESIGN_IP_ITEM'           ,

};


/**
 *  Criteria label
 *  @constant {object}
 */
const CRITERIA_LABEL = {
  [LANGUAGE.KR] : {
    'Yes' : '예',
    'No'  : '아니오',
  },
  [LANGUAGE.EN] : {
    'Yes' : 'Yes',
    'No'  : 'No',
  }
};


/**
 *  Compare tab
 *  @constant {object}
 */
const COMPARE_TAB = {
  SYNOPSIS : 'SYNOPSIS',
  SOA      : 'SOA',
  CRF      : 'CRF',
};

/**
 *  SDRG PAGE
 *  @constant {object}
 */
const SDRG_PAGE = {
  COVER         : 'cover',
  CONTENTS      : 'contents',
  INTRODUCTION  : 'introduction',
  PROTOCOL      : 'protocol',
  SUBJECT       : 'subject',
  CONFORMANCE   : 'conformance',
  APPENDIX      : 'appendix',
};


/**
 *  Define xml OID type
 *  @constant {object}
 */
const DEFINE_OID_TYPE = {
  IG       : 'IG.'     ,
  IT       : 'IT.'
};

/**
 *  Define xml 관련 태그 속성
 *  @constant {object}
 */
const DEFINE_XML_TAG = {
  MAPPING_XSL_LOCATION: '<?xml-stylesheet type="text/xsl" href="https://imtrial-backend.s3.ap-northeast-2.amazonaws.com/common/define/2.1/define2-1_custom_v1_6.xsl"?>'  ,
  PACKAGE_XSL_LOCATION: '<?xml-stylesheet type="text/xsl" href="https://imtrial-backend.s3.ap-northeast-2.amazonaws.com/common/define/2.1/define2-1.xsl"?>'              ,
  DEFINE_XSL          : 'define2-1.xsl'                               ,
  DEFINE_XML          : 'Define.xml'                                  ,
  TABLE_ROWS          : 'tr.tablerowodd, tr.tableroweven'             ,
  USER_COMMENT_ID     : 'userCommentCell'                             ,
  P_TAG               : 'p'                                           ,
  LINE_BREAK          : 'linebreakcell'                               ,
  LINE_BREAK_CELL     : 'class="linebreakcell"'                       ,
  COMMENT_TAG         : '<p class="linebreakcell">'                   ,
  A_TAG               : 'a'                                           ,
  ITEM_ID_PRE         : 'id="'                                        ,
  ITEM_ID_POST        : '"'                                           ,
  RAW_TAG_NAME        : 'rawTagName'                                  ,
  RAW_ATTRIBUTE       : 'rawAttrs'                                    ,
  RAW_TEXT            : '_rawText'                                    ,
  TD_TAG              : 'td'                                          ,
  ID_PERIOD           : '\\.'                                         ,
  TEMPLATE_HTML       : 'common/define/2.1/defineTemplate.html'       ,
  TEMPLATE_XML        : 'common/define/2.1/defineTemplate.xml'        ,
};

/**
 *  package engine 관련 job state
 *  @constant {object}
 */
const PACKAGE_STATE       = {
  OPEN         :  1    ,          // 대기
  ON_PROCESS   :  2    ,          // 작업중
  DONE         :  3    ,          // 완료
  CONVERTING   :  4    ,          // CONVERTING 중
};

/**
 *  validation 관련 필드
 *  @constant {object}
 */
const VALIDATION_FIELD       = {

  SHEET_NAMES    : 'SheetNames'        ,

  SOURCE         :  'Source'          ,
  MESSAGE        :  'Message'         ,
  SEVERITY       :  'Severity'        ,
  FOUND          :  'Found'           ,
  EXPLANATION    :  'Explanation'     ,

  DOMAIN         :  'Domain'
};

/**
 *  puppeteer 관련 필드
 *  @constant {object}
 */
const PUPPETEER_OPTION       = {
  NO_SANDBOX     :    '--no-sandbox'          ,
  NETWORD_IDLE0  :    'networkidle0'          ,
  NETWORD_IDLE2  :    'networkidle2'
};

/**
 *  Clinical Data 관련 필드
 *  @constant {object}
 */
const CLINICAL_FILE_COLUMN       = {
  // 공통
  DOMAIN    :    'DOMAIN'        ,
  SITEID    :    'SITEID'        ,

  // Random File
  RANDOMNO  :    'RANDOMNO'      ,
  ARM       :    'ARM'           ,
  ARMCD     :    'ARMCD'         ,
  ACTARM    :    'ACTARM'        ,
  ACTARMCD  :    'ACTARMCD'      ,
  ACTARMUD  :    'ACTARMUD'      ,

  // Reference File
  SUBJID    :    'SUBJID'        ,
  VISIT     :    'VISIT'         ,
  SPID      :    'SPID'          ,
  REFID     :    'REFID'         ,

  // LNR File
  LBSPID    :    'LBSPID'        ,
  LBCAT     :    'LBCAT'         ,
  LBTESTCD  :    'LBTESTCD'      ,
  LBSPEC    :    'LBSPEC'        ,
  LBMETHOD  :    'LBMETHOD'      ,
  LBORNRLO  :    'LBORNRLO'      ,
  LBORNRHI  :    'LBORNRHI'      ,
  LBORRESU  :    'LBORRESU'      ,
  SEX       :    'SEX'           ,
  DATE_MIN  :    'Date_min'      ,
  DATE_MAX  :    'Date_max'      ,
  AGE_MIN   :    'Age_min'       ,
  AGE_MAX   :    'Age_max'       ,
};

/**
 *  CDISC Library API 관련 필드
 *  @constant {object}
 */
const CDISC_LIBRARY       = {
  ACCEPT              :    'accept'                                         ,
  ACCEPT_FORMAT       :    'application/json'                               ,
  API_KEY             :    'api-key'                                        ,
  URL                 :    'url'                                            ,
  METHOD              :    'method'                                         ,
  HEADERS             :    'headers'                                        ,
  PRODUCT_INFO_URL    :    'https://library.cdisc.org/api/mdr/products'     ,
  CDASH_IG_URL        :    'https://library.cdisc.org/api/mdr/cdashig/'     ,
  SDTM_IG_URL         :    'https://library.cdisc.org/api/mdr/sdtmig/'      ,
  SDTM_CT_URL         :    'https://library.cdisc.org/api/mdr/ct/packages/' ,
  LINKS               :    '_links'                                         ,
  TERMINOLOGY         :    'terminology'                                    ,
  PACKAGES            :    'packages'                                       ,
  DATA_TABULATION     :    'data-tabulation'                                ,
  SDTM_IG             :    'sdtmig'                                         ,
  HREF                :    'href'                                           ,
  TITLE               :    'title'                                          ,
};

/**
 *  Server Environment 관련 필드
 *  @constant {object}
 */
const ENVIRONMENT       = {
  DEVELOPMENT      :    'dev'   ,
  QA               :    'qa'    ,
  PRODUCTION       :    'app'   ,
  GS               :    'gs'    ,

  // engine prod 환경
  PROD             :    'prod'  ,
};

/**
 *  CRF_VISIT
 *  @constant {object}
 */
const CRF_VISIT = {
  DESIGN_SOA_ID_ALL_VISIT   : 'DGSA_ALLVISIT',
  DESIGN_SOA_ID_UNSCHEDULED : 'DGSA_UNSCHEDULED',

  STUDY_EVENT_ID_ALL_VISIT : 'SUEV_ALLVISIT',
  STUDY_EVENT_IDS_ALL_VISIT : '["SUEV_ALLVISIT"]',

  STUDY_EVENT_ID_UNSCHEDULED : 'SUEV_UNSCHEDULED',
  STUDY_EVENT_IDS_UNSCHEDULED : '["SUEV_UNSCHEDULED"]',

  STUDY_EVENT_ALL_VISIT_NO : 998 ,
  STUDY_EVENT_UNSCHEDULED_NO : 999 ,

  STUDY_EVENT_ALL_VISIT_NAME :  'All' ,
  STUDY_EVENT_UNSCHEDULED_NAME : 'Unscheduled' ,

  STUDY_EVENT_ALL_VISIT_TYPE :  'Common' ,
  STUDY_EVENT_UNSCHEDULED_TYPE : 'Unscheduled' ,

  STUDY_EVENT_ALL_VISIT_REPEAT :  'No' ,
  STUDY_EVENT_UNSCHEDULED_REPEAT : 'Yes' ,
};

/**
 *  Rave 관련 Comment 상수
 *  @constant {object}
 */
const RAVE_FORM_COMMENT = {
  PREFIX_ID : 'COMT',
  ELEMENT_POSTFIX : '_GL',
  DATA_TYPE : '',
  CONTROL_TYPE: 'Comment',
  FORMAT : '',
  COLLECT : '0'
};

/**
 *  Type 검사 상수
 *  @constant {object}
 */
const TYPE_CHECK = {
  OBJECT      : 'object'      ,
  NUMBER      : 'number'      ,
  STRING      : 'string'      ,
  BOOLEAN     : 'boolean'     ,
  SYMBOL      : 'symbol'      ,
  FUNCTION    : 'function'    ,
  UNDEFINED   : 'undefined'   ,
  BIGINT      : 'bigint'      ,
};

/**
 *  Elasticsearch 필드 상수
 *  @constant {object}
 */
const ES_FIELDS = {
  ENV             : 'fields.env'          ,
  PARTNER         : 'partner'             ,
  ACCOUNT_ID      : 'accountID'           ,
  ACCOUNT_ID_KEY  : 'accountID.keyword'   ,
  PARTNER_KEY     : 'partner.keyword'     ,
  VIEW_CODE       : 'viewCode'            ,
  ACTION          : 'actionCode'          ,
  REQUEST_TIME    : 'requestTime'         ,
  REQUEST_TIME_KEY: 'requestTime.keyword' ,

  SOURCE          : '_source'             ,
  FIELDS          : 'fields'              ,
  DOC             : 'doc'                 ,
  DATA            : 'data'                ,
  TIME_STAMP      : '@timestamp'          ,
  DESC            : 'desc'                ,
  MENU            : 'menu'                ,

  INVALID_ACCOUNT : '%{[doc][accountID]}' ,
  INVALID_PARTNER : '%{[doc][partner]}'   ,
};

/**
 *  SDTM MAPPING 상수
 *  @constant {object}
 */
const DB_SDTM_VALUE= {
  ENDTC     : 'ENDTC',
  STDTC     : 'STDTC',
  DTC       : 'DTC',
  ENDY      : 'ENDY',
  STDY      : 'STDY',
  DY        : 'DY',
};

/**
 *  Field Alias 특이 규칙
 *  @constant {object}
 */
const FIELD_ALIAS_EXCEPTION= {
  ADVERSE_EVENT           : 'Adverse Event'              ,
  VIOLATION_OF_PROTOCOL   : 'Violation of Protocol'      ,
  IP_ADMINISTRATION_ORAL  : 'IP Administration [Oral]'   ,
  COVAL                   : 'COVAL'                      ,
};

module.exports = {
  DB_COLLECTION_NAME        ,
  DB_FIELD_NAME             ,
  DB_PROCESS_TYPE           ,
  REQUEST_QUERY             ,
  VALUE_SEPARATOR           ,
  CHAR_SYMBOL               ,
  MONGO_CONST               ,
  DATA_FIELD_NAME           ,
  DEFVAL_QUERYSTRING        ,
  DB_RESULT                 ,
  ID_PREFIX                 ,
  NUMERIC                   ,
  DB_STATE                  ,
  PACKAGE_STATE             ,
  REGEX_PATTERN             ,
  USER_ROLE                 ,
  RIGHT_TYPE                ,
  FILE_DIR                  ,
  EVENT_HANDLER             ,
  CODE_LIST_TYPE            ,
  CDASH_DOMAIN              ,
  DATA_ACTION               ,
  IG_TYPE                   ,
  NAMESPACE                 ,
  LANGUAGE                  ,
  DATE_FORMAT               ,
  UPSERT_FLAG               ,
  VERSION_LEVEL             ,
  INTERVENTION_TYPE         ,
  EPOCH_NAME                ,
  ARM_NAME                  ,
  ELEMENT_NAME              ,
  TIME_POINT_ADD_ELEMENT    ,
  ORIGIN_NAME               ,
  CRITERIA_DOMAIN           ,
  CRITERIA_ADD_ITEM         ,
  SOURCE_TYPE               ,
  DEFAULT_SUMMARY_DOMAIN    ,
  CRF_ITEM_TYPE             ,
  CRF_COMPONENT_TYPE        ,
  CRF_GEN_TYPE              ,
  CERTIFICATE               ,
  POSITION                  ,
  FONT                      ,
  T_DOMAIN                  ,
  CAPITAL_FIELD             ,
  S3                        ,
  CRITERIA_ORRES_TERM_ID    ,
  CRITERIA_ORRES_TERM_NAME  ,
  TABLE                     ,
  CRITERIA_LABEL            ,
  COMPARE_TAB               ,
  DEFINE_OID_TYPE           ,
  SDRG_PAGE                 ,
  DEFINE_XML_TAG            ,
  VALIDATION_FIELD          ,
  PUPPETEER_OPTION          ,
  API_RESPONSE_CODE         ,
  CLINICAL_FILE_COLUMN      ,
  CDISC_LIBRARY             ,
  ENVIRONMENT               ,
  CRF_VISIT                 ,
  RAVE_FORM_COMMENT         ,
  TYPE_CHECK                ,
  ES_FIELDS                 ,
  DB_SDTM_VALUE             ,
  FIELD_ALIAS_EXCEPTION     ,
};
