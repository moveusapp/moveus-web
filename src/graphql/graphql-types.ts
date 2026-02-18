import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSONString: { input: any; output: any; }
};

export type AcceptFriendRequestMutation = {
  __typename?: 'AcceptFriendRequestMutation';
  relationship?: Maybe<RelationshipType>;
};

/** An enumeration. */
export enum Activity {
  Aerobics = 'AEROBICS',
  Badminton = 'BADMINTON',
  Baseball = 'BASEBALL',
  Basketball = 'BASKETBALL',
  Biking = 'BIKING',
  Boxing = 'BOXING',
  Climbing = 'CLIMBING',
  Cricket = 'CRICKET',
  Crossfit = 'CROSSFIT',
  Dancing = 'DANCING',
  Football = 'FOOTBALL',
  Golf = 'GOLF',
  Gym = 'GYM',
  Handball = 'HANDBALL',
  Hiking = 'HIKING',
  Kayaking = 'KAYAKING',
  MartialArts = 'MARTIAL_ARTS',
  Pilates = 'PILATES',
  Rugby = 'RUGBY',
  Running = 'RUNNING',
  Sailing = 'SAILING',
  Skateboarding = 'SKATEBOARDING',
  Skiing = 'SKIING',
  Snowboarding = 'SNOWBOARDING',
  Soccer = 'SOCCER',
  Surfing = 'SURFING',
  Swimming = 'SWIMMING',
  Tennis = 'TENNIS',
  Volleyball = 'VOLLEYBALL',
  Walking = 'WALKING',
  Yoga = 'YOGA'
}

export type ActivityType = {
  __typename?: 'ActivityType';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AlterEventLocation = {
  __typename?: 'AlterEventLocation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AlterEventMutation = {
  __typename?: 'AlterEventMutation';
  event?: Maybe<EventType>;
};

export type AttachmentType = {
  __typename?: 'AttachmentType';
  id?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type BaseNotificationType = {
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationEnum>;
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type CancelFriendRequestMutation = {
  __typename?: 'CancelFriendRequestMutation';
  relationship?: Maybe<RelationshipType>;
};

export type ChatMemberType = {
  __typename?: 'ChatMemberType';
  chat: ChatType;
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
  nickname: Scalars['String']['output'];
  notifications?: Maybe<ChatNotifications>;
  user: UserType;
};

export type ChatMessageType = {
  __typename?: 'ChatMessageType';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  textContent: Scalars['String']['output'];
  timeSent: Scalars['DateTime']['output'];
  user: UserType;
};

/** An enumeration. */
export enum ChatNotifications {
  All = 'ALL',
  MentionsOnly = 'MENTIONS_ONLY',
  None = 'NONE'
}

export type ChatType = {
  __typename?: 'ChatType';
  id?: Maybe<Scalars['Int']['output']>;
  lastMessage?: Maybe<ChatMessageType>;
  members: Array<Maybe<ChatMemberType>>;
  messages: Array<ChatMessageType>;
  notifications?: Maybe<ChatNotifications>;
  timeCreated: Scalars['DateTime']['output'];
};

export type CommentOnPostMutation = {
  __typename?: 'CommentOnPostMutation';
  comment?: Maybe<PostCommentType>;
};

export type ConfirmMemberParticipationMutation = {
  __typename?: 'ConfirmMemberParticipationMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** An enumeration. */
export enum CountryCode {
  Ad = 'AD',
  Ae = 'AE',
  Af = 'AF',
  Ag = 'AG',
  Ai = 'AI',
  Al = 'AL',
  Am = 'AM',
  Ao = 'AO',
  Aq = 'AQ',
  Ar = 'AR',
  As = 'AS',
  At = 'AT',
  Au = 'AU',
  Aw = 'AW',
  Az = 'AZ',
  Ba = 'BA',
  Bb = 'BB',
  Bd = 'BD',
  Be = 'BE',
  Bf = 'BF',
  Bg = 'BG',
  Bh = 'BH',
  Bi = 'BI',
  Bj = 'BJ',
  Bm = 'BM',
  Bn = 'BN',
  Bo = 'BO',
  Br = 'BR',
  Bs = 'BS',
  Bt = 'BT',
  Bw = 'BW',
  By = 'BY',
  Bz = 'BZ',
  Ca = 'CA',
  Cd = 'CD',
  Cf = 'CF',
  Cg = 'CG',
  Ch = 'CH',
  Ci = 'CI',
  Ck = 'CK',
  Cl = 'CL',
  Cm = 'CM',
  Cn = 'CN',
  Co = 'CO',
  Cr = 'CR',
  Cu = 'CU',
  Cv = 'CV',
  Cy = 'CY',
  Cz = 'CZ',
  De = 'DE',
  Dj = 'DJ',
  Dk = 'DK',
  Dm = 'DM',
  Do = 'DO',
  Dz = 'DZ',
  Ec = 'EC',
  Ee = 'EE',
  Eg = 'EG',
  Er = 'ER',
  Es = 'ES',
  Et = 'ET',
  Fi = 'FI',
  Fj = 'FJ',
  Fm = 'FM',
  Fr = 'FR',
  Ga = 'GA',
  Gb = 'GB',
  Gd = 'GD',
  Ge = 'GE',
  Gh = 'GH',
  Gm = 'GM',
  Gn = 'GN',
  Gq = 'GQ',
  Gr = 'GR',
  Gt = 'GT',
  Gw = 'GW',
  Gy = 'GY',
  Hn = 'HN',
  Hr = 'HR',
  Ht = 'HT',
  Hu = 'HU',
  Id = 'ID',
  Ie = 'IE',
  Il = 'IL',
  In = 'IN',
  Io = 'IO',
  Iq = 'IQ',
  Ir = 'IR',
  Is = 'IS',
  It = 'IT',
  Jm = 'JM',
  Jo = 'JO',
  Jp = 'JP',
  Ke = 'KE',
  Kg = 'KG',
  Kh = 'KH',
  Ki = 'KI',
  Km = 'KM',
  Kn = 'KN',
  Kp = 'KP',
  Kr = 'KR',
  Kw = 'KW',
  Ky = 'KY',
  Kz = 'KZ',
  La = 'LA',
  Lb = 'LB',
  Lc = 'LC',
  Li = 'LI',
  Lk = 'LK',
  Lr = 'LR',
  Ls = 'LS',
  Lt = 'LT',
  Lu = 'LU',
  Lv = 'LV',
  Ly = 'LY',
  Ma = 'MA',
  Mc = 'MC',
  Md = 'MD',
  Me = 'ME',
  Mg = 'MG',
  Mh = 'MH',
  Mk = 'MK',
  Ml = 'ML',
  Mm = 'MM',
  Mn = 'MN',
  Mr = 'MR',
  Mt = 'MT',
  Mu = 'MU',
  Mv = 'MV',
  Mw = 'MW',
  Mx = 'MX',
  My = 'MY',
  Mz = 'MZ',
  Na = 'NA',
  Ne = 'NE',
  Ng = 'NG',
  Ni = 'NI',
  Nl = 'NL',
  No = 'NO',
  Np = 'NP',
  Nr = 'NR',
  Nz = 'NZ',
  Om = 'OM',
  Pa = 'PA',
  Pe = 'PE',
  Pg = 'PG',
  Ph = 'PH',
  Pk = 'PK',
  Pl = 'PL',
  Ps = 'PS',
  Pt = 'PT',
  Pw = 'PW',
  Py = 'PY',
  Qa = 'QA',
  Ro = 'RO',
  Rs = 'RS',
  Ru = 'RU',
  Rw = 'RW',
  Sa = 'SA',
  Sb = 'SB',
  Sc = 'SC',
  Sd = 'SD',
  Se = 'SE',
  Sg = 'SG',
  Si = 'SI',
  Sk = 'SK',
  Sl = 'SL',
  Sm = 'SM',
  Sn = 'SN',
  So = 'SO',
  Sr = 'SR',
  Ss = 'SS',
  St = 'ST',
  Sv = 'SV',
  Sy = 'SY',
  Sz = 'SZ',
  Td = 'TD',
  Tg = 'TG',
  Th = 'TH',
  Tj = 'TJ',
  Tl = 'TL',
  Tm = 'TM',
  Tn = 'TN',
  To = 'TO',
  Tr = 'TR',
  Tt = 'TT',
  Tv = 'TV',
  Tw = 'TW',
  Tz = 'TZ',
  Ua = 'UA',
  Ug = 'UG',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Vc = 'VC',
  Ve = 'VE',
  Vn = 'VN',
  Vu = 'VU',
  Ws = 'WS',
  Ye = 'YE',
  Za = 'ZA',
  Zm = 'ZM',
  Zw = 'ZW'
}

export type CreateEventMutation = {
  __typename?: 'CreateEventMutation';
  event?: Maybe<EventType>;
};

export type CreatePostMutation = {
  __typename?: 'CreatePostMutation';
  post?: Maybe<CreatePostType>;
};

export type CreatePostType = {
  __typename?: 'CreatePostType';
  comments?: Maybe<Array<Maybe<PostCommentType>>>;
  content: Scalars['String']['output'];
  event?: Maybe<EventType>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUploadUrl?: Maybe<Scalars['String']['output']>;
  likedBy: Array<UserType>;
  likes?: Maybe<Scalars['Int']['output']>;
  timePosted: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};


export type CreatePostTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteAccountMutation = {
  __typename?: 'DeleteAccountMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteEventMutation = {
  __typename?: 'DeleteEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EventCommentType = {
  __typename?: 'EventCommentType';
  comment?: Maybe<Scalars['String']['output']>;
  member?: Maybe<EventMemberType>;
};

export type EventMemberType = {
  __typename?: 'EventMemberType';
  comment?: Maybe<Scalars['String']['output']>;
  hasParticipated?: Maybe<Scalars['Boolean']['output']>;
  participates: Scalars['Boolean']['output'];
  role?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['String']['output']>;
  user: UserType;
};

export type EventNotificationType = BaseNotificationType & {
  __typename?: 'EventNotificationType';
  event?: Maybe<EventType>;
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationEnum>;
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** An enumeration. */
export enum EventRating {
  Bad = 'BAD',
  Good = 'GOOD',
  Great = 'GREAT',
  Neutral = 'NEUTRAL',
  VeryBad = 'VERY_BAD'
}

export type EventType = {
  __typename?: 'EventType';
  acceptedGenders?: Maybe<Scalars['JSONString']['output']>;
  activity: ActivityType;
  allowSpectators: Scalars['Boolean']['output'];
  averageScore?: Maybe<Scalars['Float']['output']>;
  chat?: Maybe<ChatType>;
  comments?: Maybe<Array<Maybe<EventCommentType>>>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  finished: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  location: LocationType;
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  members: Array<EventMemberType>;
  minAge?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<Maybe<EventMemberType>>>;
  organizer?: Maybe<EventMemberType>;
  participantCount?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Maybe<EventMemberType>>>;
  posts: Array<PostType>;
  requirements?: Maybe<Scalars['JSONString']['output']>;
  role?: Maybe<MemberRole>;
  skillLevel?: Maybe<Scalars['String']['output']>;
  spectators?: Maybe<Array<Maybe<EventMemberType>>>;
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type FinishEventMutation = {
  __typename?: 'FinishEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** An enumeration. */
export enum FormedRelationshipsType {
  Acquaintances = 'ACQUAINTANCES',
  Friends = 'FRIENDS',
  RomanticRelationships = 'ROMANTIC_RELATIONSHIPS'
}

/** An enumeration. */
export enum FrequencyOfPhycicalActivity {
  Daily = 'DAILY',
  FewTimesAWeek = 'FEW_TIMES_A_WEEK',
  Occasionally = 'OCCASIONALLY',
  OnceAWeek = 'ONCE_A_WEEK',
  Rarely = 'RARELY'
}

/** An enumeration. */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
  PreferNotToSay = 'PREFER_NOT_TO_SAY'
}

/** An enumeration. */
export enum GenderNoPnts {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY'
}

export type JoinEventMutation = {
  __typename?: 'JoinEventMutation';
  event?: Maybe<EventType>;
  member?: Maybe<EventMemberType>;
};

export type KickEventMemberMutation = {
  __typename?: 'KickEventMemberMutation';
  event?: Maybe<EventType>;
};

export type LeaveEventMutation = {
  __typename?: 'LeaveEventMutation';
  event?: Maybe<EventType>;
};

export type LikeEventMemberMutation = {
  __typename?: 'LikeEventMemberMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LikePostMutation = {
  __typename?: 'LikePostMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LocationType = {
  __typename?: 'LocationType';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['Int']['output']>;
};

export type LoginMutation = {
  __typename?: 'LoginMutation';
  myProfile?: Maybe<ProfileType>;
};

export type LogoutMutation = {
  __typename?: 'LogoutMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** An enumeration. */
export enum MainInterest {
  Fun = 'FUN',
  Socialize = 'SOCIALIZE',
  Sport = 'SPORT'
}

/** An enumeration. */
export enum MatchedParticipationLikelihood {
  Likely = 'LIKELY',
  Neutral = 'NEUTRAL',
  Unlikely = 'UNLIKELY',
  VeryLikely = 'VERY_LIKELY',
  VeryUnlikely = 'VERY_UNLIKELY'
}

/** An enumeration. */
export enum MemberRole {
  Moderator = 'MODERATOR',
  Organizer = 'ORGANIZER',
  Participant = 'PARTICIPANT',
  Spectator = 'SPECTATOR'
}

export type Mutations = {
  __typename?: 'Mutations';
  acceptFriendRequest?: Maybe<AcceptFriendRequestMutation>;
  alterEvent?: Maybe<AlterEventMutation>;
  alterEventLocation?: Maybe<AlterEventLocation>;
  cancelFriendRequest?: Maybe<CancelFriendRequestMutation>;
  commentOnPost?: Maybe<CommentOnPostMutation>;
  confirmMemberParticipation?: Maybe<ConfirmMemberParticipationMutation>;
  createEvent?: Maybe<CreateEventMutation>;
  createPost?: Maybe<CreatePostMutation>;
  deleteAccount?: Maybe<DeleteAccountMutation>;
  deleteEvent?: Maybe<DeleteEventMutation>;
  finishEvent?: Maybe<FinishEventMutation>;
  joinEvent?: Maybe<JoinEventMutation>;
  kickEventMember?: Maybe<KickEventMemberMutation>;
  leaveEvent?: Maybe<LeaveEventMutation>;
  likeEventMember?: Maybe<LikeEventMemberMutation>;
  likePost?: Maybe<LikePostMutation>;
  login?: Maybe<LoginMutation>;
  logout?: Maybe<LogoutMutation>;
  rateEvent?: Maybe<RateEventMutation>;
  rejectFriendRequest?: Maybe<RejectFriendRequestMutation>;
  removeFriend?: Maybe<RemoveFriendMutation>;
  removePreferredActivity?: Maybe<RemovePreferredActivity>;
  replyOnPostComment?: Maybe<ReplyOnPostCommentMutation>;
  reportEventMutation?: Maybe<ReportEventMutation>;
  reportUserMutation?: Maybe<ReportUserMutation>;
  sendChatMessage?: Maybe<SendChatMessage>;
  sendConfirmationEmail?: Maybe<SendConfirmationEmailMutation>;
  sendFriendRequest?: Maybe<SendFriendRequestMutation>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailMutation>;
  setChatNickname?: Maybe<SetChatNickname>;
  setChatNotifications?: Maybe<SetChatNotifications>;
  setEventLocation?: Maybe<SetEventLocation>;
  setPreferredActivity?: Maybe<SetPreferredActivity>;
  signup?: Maybe<SignupMutation>;
  spectateEvent?: Maybe<SpectateEventMutation>;
  unlikePost?: Maybe<UnlikePostMutation>;
  updateAllPrivacySettings?: Maybe<UpdateAllPrviacySettingsMutation>;
  updateBasicInfo?: Maybe<UpdateBasicInfoMutation>;
  updateMaxTravelDistance?: Maybe<UpdateMaxTravelDistanceMutation>;
  updateProfileLocation?: Maybe<UpdateProfileLocation>;
  updateSurveyInfo?: Maybe<UpdateSurveyInfoMutation>;
};


export type MutationsAcceptFriendRequestArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsAlterEventArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  eventId: Scalars['Int']['input'];
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsAlterEventLocationArgs = {
  eventId?: InputMaybe<Scalars['Int']['input']>;
  locationAddressLine1?: InputMaybe<Scalars['String']['input']>;
  locationAddressLine2?: InputMaybe<Scalars['String']['input']>;
  locationCountryCode?: InputMaybe<CountryCode>;
  locationLatitude?: InputMaybe<Scalars['Float']['input']>;
  locationLongitude?: InputMaybe<Scalars['Float']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationRegion?: InputMaybe<Scalars['String']['input']>;
  locationZipCode?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsCancelFriendRequestArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsCommentOnPostArgs = {
  postId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationsConfirmMemberParticipationArgs = {
  eventId: Scalars['Int']['input'];
  participated: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsCreateEventArgs = {
  acceptedGenders?: InputMaybe<Array<InputMaybe<GenderNoPnts>>>;
  activity: Activity;
  allowSpectators?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime: Scalars['DateTime']['input'];
  locationAddressLine1?: InputMaybe<Scalars['String']['input']>;
  locationAddressLine2?: InputMaybe<Scalars['String']['input']>;
  locationCountryCode?: InputMaybe<CountryCode>;
  locationId?: InputMaybe<Scalars['Int']['input']>;
  locationLatitude?: InputMaybe<Scalars['Float']['input']>;
  locationLongitude?: InputMaybe<Scalars['Float']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationRegion?: InputMaybe<Scalars['String']['input']>;
  locationZipCode?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  requirements?: InputMaybe<Scalars['String']['input']>;
  skillLevel: SkillLevel;
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationsCreatePostArgs = {
  content: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};


export type MutationsDeleteEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsFinishEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsJoinEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsKickEventMemberArgs = {
  eventId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsLeaveEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsLikeEventMemberArgs = {
  eventId: Scalars['Int']['input'];
  like: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsLikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationsLoginArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsRateEventArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  score: EventRating;
};


export type MutationsRejectFriendRequestArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsRemoveFriendArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsRemovePreferredActivityArgs = {
  activity?: InputMaybe<Activity>;
};


export type MutationsReplyOnPostCommentArgs = {
  commentId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationsReportEventMutationArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
};


export type MutationsReportUserMutationArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};


export type MutationsSendChatMessageArgs = {
  attachmentId?: InputMaybe<Scalars['String']['input']>;
  chatId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsSendFriendRequestArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsSetChatNicknameArgs = {
  chatId: Scalars['Int']['input'];
  nickname: Scalars['String']['input'];
};


export type MutationsSetChatNotificationsArgs = {
  chatId: Scalars['Int']['input'];
  notifications: ChatNotifications;
};


export type MutationsSetEventLocationArgs = {
  eventId?: InputMaybe<Scalars['Int']['input']>;
  locationId?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationsSetPreferredActivityArgs = {
  activity?: InputMaybe<Activity>;
  skillLevel?: InputMaybe<SkillLevel>;
};


export type MutationsSignupArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationsSpectateEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsUnlikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationsUpdateAllPrivacySettingsArgs = {
  scope: PrivacyScope;
};


export type MutationsUpdateBasicInfoArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsUpdateMaxTravelDistanceArgs = {
  distance?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsUpdateProfileLocationArgs = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationsUpdateSurveyInfoArgs = {
  formedRelationshipTypes?: InputMaybe<Array<InputMaybe<FormedRelationshipsType>>>;
  frequencyOfPhysicalActivity?: InputMaybe<FrequencyOfPhycicalActivity>;
  genderPreference?: InputMaybe<Array<InputMaybe<GenderNoPnts>>>;
  mainInterest?: InputMaybe<MainInterest>;
  matchedParticipationLikelihood?: InputMaybe<MatchedParticipationLikelihood>;
  physicalActivitySatisfaction?: InputMaybe<PhysicalActivitySatisfaction>;
  preferredEventDuration?: InputMaybe<Scalars['Int']['input']>;
  preferredPartnerCharacteristics?: InputMaybe<Array<InputMaybe<PreferredPartnerCharacteristics>>>;
  preferredPartySize?: InputMaybe<PreferredPartySize>;
  preferredTimeOfTheDay?: InputMaybe<Array<InputMaybe<TimeOfTheDay>>>;
  socialInteractionImportance?: InputMaybe<SocialInteractionImportance>;
};

/** An enumeration. */
export enum NotificationEnum {
  EventFinished = 'EVENT_FINISHED',
  FriendAccepted = 'FRIEND_ACCEPTED',
  FriendRequest = 'FRIEND_REQUEST'
}

/** An enumeration. */
export enum PhysicalActivitySatisfaction {
  Dissatisfied = 'DISSATISFIED',
  Neutral = 'NEUTRAL',
  Satisfied = 'SATISFIED',
  VeryDissatisfied = 'VERY_DISSATISFIED',
  VerySatisfied = 'VERY_SATISFIED'
}

export type PostCommentType = {
  __typename?: 'PostCommentType';
  hasReplies?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isReplyTo?: Maybe<PostCommentType>;
  post: PostType;
  replies: Array<PostCommentType>;
  text: Scalars['String']['output'];
  timePosted: Scalars['DateTime']['output'];
  user: UserType;
};

export type PostType = {
  __typename?: 'PostType';
  comments?: Maybe<Array<Maybe<PostCommentType>>>;
  content: Scalars['String']['output'];
  event?: Maybe<EventType>;
  id?: Maybe<Scalars['Int']['output']>;
  likedBy: Array<UserType>;
  likes?: Maybe<Scalars['Int']['output']>;
  timePosted: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};


export type PostTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PreferredActivityType = {
  __typename?: 'PreferredActivityType';
  activity: ActivityType;
  skillLevel?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum PreferredPartnerCharacteristics {
  Proximity = 'PROXIMITY',
  SameGender = 'SAME_GENDER',
  SimilarAge = 'SIMILAR_AGE',
  SimilarHealthGoals = 'SIMILAR_HEALTH_GOALS',
  SimilarHobbies = 'SIMILAR_HOBBIES',
  SimilarInterests = 'SIMILAR_INTERESTS',
  SimilarSkillLevel = 'SIMILAR_SKILL_LEVEL'
}

/** An enumeration. */
export enum PreferredPartySize {
  Alone = 'ALONE',
  LargeGroup = 'LARGE_GROUP',
  SmallGroup = 'SMALL_GROUP'
}

/** An enumeration. */
export enum PrivacyScope {
  Everyone = 'EVERYONE',
  Friends = 'FRIENDS',
  Noone = 'NOONE'
}

export type PrivacySettingType = {
  __typename?: 'PrivacySettingType';
  scope?: Maybe<Scalars['String']['output']>;
  setting?: Maybe<Scalars['String']['output']>;
};

export type ProfileType = {
  __typename?: 'ProfileType';
  bio: Scalars['String']['output'];
  chatmemberSet: Array<ChatMemberType>;
  chatmessageSet: Array<ChatMessageType>;
  dateJoined: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  dislikes?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  eventmemberSet: Array<EventMemberType>;
  firstName: Scalars['String']['output'];
  formedRelationshipTypes?: Maybe<Array<Maybe<FormedRelationshipsType>>>;
  frequencyOfPhysicalActivity?: Maybe<FrequencyOfPhycicalActivity>;
  friendCount?: Maybe<Scalars['Int']['output']>;
  friends?: Maybe<Array<Maybe<UserType>>>;
  gender?: Maybe<Scalars['String']['output']>;
  genderPreference?: Maybe<Array<Maybe<GenderNoPnts>>>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  isCapeable: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  mainInterest?: Maybe<MainInterest>;
  matchedParticipationLikelihood?: Maybe<MatchedParticipationLikelihood>;
  maxTravelDistance?: Maybe<Scalars['Int']['output']>;
  organizes?: Maybe<Array<Maybe<EventType>>>;
  password: Scalars['String']['output'];
  physicalActivitySatisfaction?: Maybe<PhysicalActivitySatisfaction>;
  preferredActivities: Array<PreferredActivityType>;
  preferredEventDuration?: Maybe<Scalars['Int']['output']>;
  preferredPartnerCharacteristics?: Maybe<Array<Maybe<PreferredPartnerCharacteristics>>>;
  preferredPartySize?: Maybe<PreferredPartySize>;
  preferredTimeOfTheDay?: Maybe<Array<Maybe<TimeOfTheDay>>>;
  privacySettings: Array<PrivacySettingType>;
  socialInteractionImportance?: Maybe<SocialInteractionImportance>;
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  xp: Scalars['Int']['output'];
};

export type Queries = {
  __typename?: 'Queries';
  allActivities?: Maybe<Array<Maybe<ActivityType>>>;
  chat?: Maybe<ChatType>;
  countFriends?: Maybe<Scalars['Int']['output']>;
  countRequestsPending?: Maybe<Scalars['Int']['output']>;
  countRequestsSent?: Maybe<Scalars['Int']['output']>;
  emailTaken: Scalars['Boolean']['output'];
  event?: Maybe<EventType>;
  eventPictureGcloudUrl?: Maybe<Scalars['String']['output']>;
  eventPosts?: Maybe<Array<Maybe<PostType>>>;
  friends?: Maybe<Array<Maybe<RelationshipType>>>;
  futureJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  globalPosts?: Maybe<Array<Maybe<PostType>>>;
  isLoggedIn?: Maybe<Scalars['Boolean']['output']>;
  joinedEvents?: Maybe<Array<Maybe<EventType>>>;
  myChats?: Maybe<Array<Maybe<ChatType>>>;
  myNotifications?: Maybe<Array<Maybe<BaseNotificationType>>>;
  myProfile?: Maybe<ProfileType>;
  myRecommendedEvents?: Maybe<Array<Maybe<EventType>>>;
  newAttachment?: Maybe<AttachmentType>;
  ongoingJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  ownedEvents?: Maybe<Array<Maybe<EventType>>>;
  pastJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  post?: Maybe<PostType>;
  profilePictureGcloudUrl?: Maybe<Scalars['String']['output']>;
  requestsPending?: Maybe<Array<Maybe<RelationshipType>>>;
  requestsSent?: Maybe<Array<Maybe<RelationshipType>>>;
  search?: Maybe<Array<Maybe<SearchUnion>>>;
  unfinishedEvents?: Maybe<Array<Maybe<UnfinishedEventType>>>;
  unratedEvents?: Maybe<Array<Maybe<EventType>>>;
  user?: Maybe<UserType>;
  userChat?: Maybe<ChatType>;
  usernameTaken: Scalars['Boolean']['output'];
};


export type QueriesChatArgs = {
  chatId: Scalars['Int']['input'];
};


export type QueriesEmailTakenArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type QueriesEventArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesEventPictureGcloudUrlArgs = {
  eventId: Scalars['Int']['input'];
};


export type QueriesEventPostsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  eventId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesGlobalPostsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesMyNotificationsArgs = {
  lastFetch: Scalars['DateTime']['input'];
};


export type QueriesPostArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesSearchArgs = {
  categories?: InputMaybe<Array<InputMaybe<SearchCategory>>>;
  searchString: Scalars['String']['input'];
};


export type QueriesUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesUserChatArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesUsernameTakenArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RateEventMutation = {
  __typename?: 'RateEventMutation';
  event?: Maybe<EventType>;
};

export type RejectFriendRequestMutation = {
  __typename?: 'RejectFriendRequestMutation';
  relationship?: Maybe<RelationshipType>;
};

/** An enumeration. */
export enum RelationshipStatus {
  BlockedByBoth = 'BLOCKED_BY_BOTH',
  BlockedByOne = 'BLOCKED_BY_ONE',
  Friends = 'FRIENDS',
  None = 'NONE',
  Pending = 'PENDING',
  RequestReceived = 'REQUEST_RECEIVED',
  RequestSent = 'REQUEST_SENT'
}

export type RelationshipType = {
  __typename?: 'RelationshipType';
  chat?: Maybe<ChatType>;
  lastUpdate: Scalars['DateTime']['output'];
  status?: Maybe<RelationshipStatus>;
  user?: Maybe<UserType>;
};

export type RemoveFriendMutation = {
  __typename?: 'RemoveFriendMutation';
  relationship?: Maybe<RelationshipType>;
};

export type RemovePreferredActivity = {
  __typename?: 'RemovePreferredActivity';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReplyOnPostCommentMutation = {
  __typename?: 'ReplyOnPostCommentMutation';
  comment?: Maybe<PostCommentType>;
};

export type ReportEventMutation = {
  __typename?: 'ReportEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReportUserMutation = {
  __typename?: 'ReportUserMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** An enumeration. */
export enum SearchCategory {
  Events = 'EVENTS',
  Posts = 'POSTS',
  Users = 'USERS'
}

export type SearchUnion = EventType | PostType | UserType;

export type SendChatMessage = {
  __typename?: 'SendChatMessage';
  chatMessage?: Maybe<ChatMessageType>;
};

export type SendConfirmationEmailMutation = {
  __typename?: 'SendConfirmationEmailMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SendFriendRequestMutation = {
  __typename?: 'SendFriendRequestMutation';
  relationship?: Maybe<RelationshipType>;
};

export type SendPasswordResetEmailMutation = {
  __typename?: 'SendPasswordResetEmailMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetChatNickname = {
  __typename?: 'SetChatNickname';
  chatMember?: Maybe<ChatMemberType>;
};

export type SetChatNotifications = {
  __typename?: 'SetChatNotifications';
  chatMember?: Maybe<ChatMemberType>;
};

export type SetEventLocation = {
  __typename?: 'SetEventLocation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SetPreferredActivity = {
  __typename?: 'SetPreferredActivity';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SignupMutation = {
  __typename?: 'SignupMutation';
  myProfile?: Maybe<ProfileType>;
};

/** An enumeration. */
export enum SkillLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
}

/** An enumeration. */
export enum SocialInteractionImportance {
  Neutral = 'NEUTRAL',
  NotImportantAtAll = 'NOT_IMPORTANT_AT_ALL',
  NotVeryImportant = 'NOT_VERY_IMPORTANT',
  SomewhatImportant = 'SOMEWHAT_IMPORTANT',
  VeryImportant = 'VERY_IMPORTANT'
}

export type SpectateEventMutation = {
  __typename?: 'SpectateEventMutation';
  event?: Maybe<EventType>;
  member?: Maybe<EventMemberType>;
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  chatLastOpen?: Maybe<Array<Maybe<WsLastOpenType>>>;
  chatMessages?: Maybe<Array<Maybe<WsChatMessageType>>>;
};


export type SubscriptionsChatLastOpenArgs = {
  chatId: Scalars['Int']['input'];
};


export type SubscriptionsChatMessagesArgs = {
  chatId: Scalars['Int']['input'];
};

/** An enumeration. */
export enum TimeOfTheDay {
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  Morning = 'MORNING',
  Night = 'NIGHT'
}

export type UnfinishedEventType = {
  __typename?: 'UnfinishedEventType';
  acceptedGenders?: Maybe<Scalars['JSONString']['output']>;
  activity: ActivityType;
  allowSpectators: Scalars['Boolean']['output'];
  averageScore?: Maybe<Scalars['Float']['output']>;
  chat?: Maybe<ChatType>;
  comments?: Maybe<Array<Maybe<EventCommentType>>>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  finished: Scalars['Boolean']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  location: LocationType;
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  members: Array<EventMemberType>;
  minAge?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<Maybe<EventMemberType>>>;
  organizer?: Maybe<EventMemberType>;
  participantCount?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Maybe<EventMemberType>>>;
  posts: Array<PostType>;
  requirements?: Maybe<Scalars['JSONString']['output']>;
  role?: Maybe<MemberRole>;
  skillLevel?: Maybe<Scalars['String']['output']>;
  spectators?: Maybe<Array<Maybe<EventMemberType>>>;
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  unconfirmedParticipants?: Maybe<Array<Maybe<EventMemberType>>>;
};

export type UnlikePostMutation = {
  __typename?: 'UnlikePostMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateAllPrviacySettingsMutation = {
  __typename?: 'UpdateAllPrviacySettingsMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateBasicInfoMutation = {
  __typename?: 'UpdateBasicInfoMutation';
  myProfile?: Maybe<ProfileType>;
};

export type UpdateMaxTravelDistanceMutation = {
  __typename?: 'UpdateMaxTravelDistanceMutation';
  myProfile?: Maybe<ProfileType>;
};

export type UpdateProfileLocation = {
  __typename?: 'UpdateProfileLocation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateSurveyInfoMutation = {
  __typename?: 'UpdateSurveyInfoMutation';
  myProfile?: Maybe<ProfileType>;
};

export type UserNotificationType = BaseNotificationType & {
  __typename?: 'UserNotificationType';
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationEnum>;
  time?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  bio: Scalars['String']['output'];
  dateJoined: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  dislikes?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  frequencyOfPhysicalActivity?: Maybe<Scalars['String']['output']>;
  friendCount?: Maybe<Scalars['Int']['output']>;
  friends?: Maybe<Array<Maybe<UserType>>>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<LocationType>;
  mainInterest?: Maybe<Scalars['String']['output']>;
  matchedParticipationLikelihood?: Maybe<Scalars['String']['output']>;
  organizes?: Maybe<Array<Maybe<EventType>>>;
  physicalActivitySatisfaction?: Maybe<Scalars['String']['output']>;
  preferredActivities: Array<PreferredActivityType>;
  preferredPartySize?: Maybe<Scalars['String']['output']>;
  relationship?: Maybe<RelationshipType>;
  socialInteractionImportance?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
  xp: Scalars['Int']['output'];
};

export type WsChatMessageType = {
  __typename?: 'WSChatMessageType';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  textContent?: Maybe<Scalars['String']['output']>;
  timeSent?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type WsLastOpenType = {
  __typename?: 'WSLastOpenType';
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type ChatMemberFragment = { __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } };

export type ChatMessageFragment = { __typename?: 'ChatMessageType', id?: number | null, textContent: string, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null } };

export type ChatFragment = { __typename?: 'ChatType', id?: number | null, lastMessage?: { __typename?: 'ChatMessageType', id?: number | null, textContent: string, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null } } | null, members: Array<{ __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null> };

export type WsChatMessageFragment = { __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null };

export type EventMemberFragment = { __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } };

export type PostCardFragment = { __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null };

export type EventOrganizerFragment = { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } };

export type EventFragment = { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, skillLevel?: string | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, finished: boolean, role?: MemberRole | null, location: { __typename?: 'LocationType', longitude: number, latitude: number }, activity: { __typename?: 'ActivityType', id?: number | null, name?: string | null }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null, members: Array<{ __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }> };

export type EventCardFragment = { __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } };

export type SurveyFragment = { __typename?: 'ProfileType', frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null };

export type BasicInfoFragment = { __typename?: 'ProfileType', firstName: string, lastName: string, bio: string, dateOfBirth?: any | null, gender?: string | null };

export type ContextProfileFragment = { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null };

export type UserFragment = { __typename?: 'UserType', id?: number | null, username: string, bio: string, gender?: Gender | null, firstName: string, lastName: string, likes?: number | null, dislikes?: number | null, dateOfBirth?: any | null, friendCount?: number | null, relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null, chat?: { __typename?: 'ChatType', id?: number | null } | null } | null, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null };

export type UserCardFragment = { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string };

export type LoginMutationVariables = Exact<{
  user: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationResult = { __typename?: 'Mutations', login?: { __typename?: 'LoginMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null } | null };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type SignUpMutationResult = { __typename?: 'Mutations', signup?: { __typename?: 'SignupMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutationResult = { __typename?: 'Mutations', logout?: { __typename?: 'LogoutMutation', success?: boolean | null } | null };

export type SendChatMessageMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  attachmentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendChatMessageMutationResult = { __typename?: 'Mutations', sendChatMessage?: { __typename?: 'SendChatMessage', chatMessage?: { __typename?: 'ChatMessageType', id?: number | null, textContent: string, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null } } | null } | null };

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
  requirements?: InputMaybe<Scalars['String']['input']>;
  locationLongitude?: InputMaybe<Scalars['Float']['input']>;
  locationLatitude?: InputMaybe<Scalars['Float']['input']>;
  activity: Activity;
  skillLevel: SkillLevel;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  allowSpectators?: InputMaybe<Scalars['Boolean']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  acceptedGenders?: InputMaybe<Array<GenderNoPnts> | GenderNoPnts>;
}>;


export type CreateEventMutationResult = { __typename?: 'Mutations', createEvent?: { __typename?: 'CreateEventMutation', event?: { __typename?: 'EventType', id?: number | null } | null } | null };

export type JoinEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type JoinEventMutationResult = { __typename?: 'Mutations', joinEvent?: { __typename?: 'JoinEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, skillLevel?: string | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, finished: boolean, role?: MemberRole | null, location: { __typename?: 'LocationType', longitude: number, latitude: number }, activity: { __typename?: 'ActivityType', id?: number | null, name?: string | null }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null, members: Array<{ __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }> } | null, member?: { __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null };

export type LeaveEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type LeaveEventMutationResult = { __typename?: 'Mutations', leaveEvent?: { __typename?: 'LeaveEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, skillLevel?: string | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, finished: boolean, role?: MemberRole | null, location: { __typename?: 'LocationType', longitude: number, latitude: number }, activity: { __typename?: 'ActivityType', id?: number | null, name?: string | null }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null, members: Array<{ __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }> } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type DeleteEventMutationResult = { __typename?: 'Mutations', deleteEvent?: { __typename?: 'DeleteEventMutation', success?: boolean | null } | null };

export type CreatePostMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreatePostMutationResult = { __typename?: 'Mutations', createPost?: { __typename?: 'CreatePostMutation', post?: { __typename?: 'CreatePostType', imageUploadUrl?: string | null } | null } | null };

export type UpdateLocationMutationVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}>;


export type UpdateLocationMutationResult = { __typename?: 'Mutations', updateProfileLocation?: { __typename?: 'UpdateProfileLocation', success?: boolean | null } | null };

export type UpdateProfileBasicInfoMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Gender>;
}>;


export type UpdateProfileBasicInfoMutationResult = { __typename?: 'Mutations', updateBasicInfo?: { __typename?: 'UpdateBasicInfoMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null } | null };

export type UpdateProfileSurveyInfoMutationVariables = Exact<{
  frequencyOfPhysicalActivity?: InputMaybe<FrequencyOfPhycicalActivity>;
  socialInteractionImportance?: InputMaybe<SocialInteractionImportance>;
  preferredPartySize?: InputMaybe<PreferredPartySize>;
  formedRelationshipTypes?: InputMaybe<Array<InputMaybe<FormedRelationshipsType>> | InputMaybe<FormedRelationshipsType>>;
  physicalActivitySatisfaction?: InputMaybe<PhysicalActivitySatisfaction>;
  preferredPartnerCharacteristics?: InputMaybe<Array<InputMaybe<PreferredPartnerCharacteristics>> | InputMaybe<PreferredPartnerCharacteristics>>;
  matchedParticipationLikelihood?: InputMaybe<MatchedParticipationLikelihood>;
  genderPreference?: InputMaybe<Array<InputMaybe<GenderNoPnts>> | InputMaybe<GenderNoPnts>>;
  mainInterest?: InputMaybe<MainInterest>;
  preferredTimeOfTheDay?: InputMaybe<Array<InputMaybe<TimeOfTheDay>> | InputMaybe<TimeOfTheDay>>;
}>;


export type UpdateProfileSurveyInfoMutationResult = { __typename?: 'Mutations', updateSurveyInfo?: { __typename?: 'UpdateSurveyInfoMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null } | null };

export type UpdateAllPrivacySettingsMutationVariables = Exact<{
  scope: PrivacyScope;
}>;


export type UpdateAllPrivacySettingsMutationResult = { __typename?: 'Mutations', updateAllPrivacySettings?: { __typename?: 'UpdateAllPrviacySettingsMutation', success?: boolean | null } | null };

export type SendFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type SendFriendRequestMutationResult = { __typename?: 'Mutations', sendFriendRequest?: { __typename?: 'SendFriendRequestMutation', relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null } | null } | null };

export type AcceptFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type AcceptFriendRequestMutationResult = { __typename?: 'Mutations', acceptFriendRequest?: { __typename?: 'AcceptFriendRequestMutation', relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null } | null } | null };

export type CancelFriendRequestMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type CancelFriendRequestMutationResult = { __typename?: 'Mutations', cancelFriendRequest?: { __typename?: 'CancelFriendRequestMutation', relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null } | null } | null };

export type RemoveFriendMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type RemoveFriendMutationResult = { __typename?: 'Mutations', removeFriend?: { __typename?: 'RemoveFriendMutation', relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null } | null } | null };

export type UsernameTakenQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UsernameTakenQueryResult = { __typename?: 'Queries', usernameTaken: boolean };

export type EmailTakenQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type EmailTakenQueryResult = { __typename?: 'Queries', emailTaken: boolean };

export type GetUserChatQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserChatQueryResult = { __typename?: 'Queries', userChat?: { __typename?: 'ChatType', id?: number | null, members: Array<{ __typename?: 'ChatMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null> } | null };

export type GetMyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyChatsQueryResult = { __typename?: 'Queries', myChats?: Array<{ __typename?: 'ChatType', id?: number | null, lastMessage?: { __typename?: 'ChatMessageType', id?: number | null, textContent: string, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null } } | null, members: Array<{ __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null> } | null> | null };

export type GetAttachmentUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAttachmentUploadUrlQueryResult = { __typename?: 'Queries', newAttachment?: { __typename?: 'AttachmentType', id?: string | null, url?: string | null } | null };

export type GetEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetEventQueryResult = { __typename?: 'Queries', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, skillLevel?: string | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, finished: boolean, role?: MemberRole | null, location: { __typename?: 'LocationType', longitude: number, latitude: number }, activity: { __typename?: 'ActivityType', id?: number | null, name?: string | null }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null, members: Array<{ __typename?: 'EventMemberType', role?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }> } | null };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQueryResult = { __typename?: 'Queries', joinedEvents?: Array<{ __typename?: 'EventType', posts: Array<{ __typename?: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }>, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null> | null };

export type GetHomeEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomeEventsQueryResult = { __typename?: 'Queries', futureJoinedEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null, ongoingJoinedEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQueryResult = { __typename?: 'Queries', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, lastLogin?: any | null, maxTravelDistance?: number | null, isCapeable: boolean, lastName: string, verified: boolean, likes?: number | null, dislikes?: number | null, friendCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: string | null, frequencyOfPhysicalActivity?: FrequencyOfPhycicalActivity | null, socialInteractionImportance?: SocialInteractionImportance | null, preferredPartySize?: PreferredPartySize | null, formedRelationshipTypes?: Array<FormedRelationshipsType | null> | null, physicalActivitySatisfaction?: PhysicalActivitySatisfaction | null, preferredPartnerCharacteristics?: Array<PreferredPartnerCharacteristics | null> | null, matchedParticipationLikelihood?: MatchedParticipationLikelihood | null, preferredTimeOfTheDay?: Array<TimeOfTheDay | null> | null, genderPreference?: Array<GenderNoPnts | null> | null, mainInterest?: MainInterest | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: string | null, scope?: string | null }>, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null };

export type GetProfilePictureUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfilePictureUploadUrlQueryResult = { __typename?: 'Queries', profilePictureGcloudUrl?: string | null };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQueryResult = { __typename?: 'Queries', myNotifications?: Array<
    | { __typename?: 'EventNotificationType', id?: number | null, time?: any | null, notificationType?: NotificationEnum | null }
    | { __typename?: 'UserNotificationType', id?: number | null, time?: any | null, notificationType?: NotificationEnum | null, user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } | null }
   | null> | null };

export type SearchItemsQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
  categories?: InputMaybe<Array<InputMaybe<SearchCategory>> | InputMaybe<SearchCategory>>;
}>;


export type SearchItemsQueryResult = { __typename?: 'Queries', search?: Array<
    | { __typename: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } }
    | { __typename: 'PostType', id?: number | null, title: string, content: string, timePosted: any, likes?: number | null, event?: { __typename?: 'EventType', id?: number | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null }
    | { __typename: 'UserType', id?: number | null, username: string, firstName: string, lastName: string }
   | null> | null };

export type GetMyFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFriendsQueryResult = { __typename?: 'Queries', friends?: Array<{ __typename?: 'RelationshipType', user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } | null } | null> | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserQueryResult = { __typename?: 'Queries', user?: { __typename?: 'UserType', id?: number | null, username: string, bio: string, gender?: Gender | null, firstName: string, lastName: string, likes?: number | null, dislikes?: number | null, dateOfBirth?: any | null, friendCount?: number | null, relationship?: { __typename?: 'RelationshipType', status?: RelationshipStatus | null, chat?: { __typename?: 'ChatType', id?: number | null } | null } | null, organizes?: Array<{ __typename?: 'EventType', id?: number | null, title: string, startTime: any, description?: string | null, participantCount?: number | null, location: { __typename?: 'LocationType', longitude: number, latitude: number } } | null> | null } | null };

export type ChatMessagesSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type ChatMessagesSubscriptionResult = { __typename?: 'Subscriptions', chatMessages?: Array<{ __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null } | null> | null };

export type LastOpenSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type LastOpenSubscriptionResult = { __typename?: 'Subscriptions', chatLastOpen?: Array<{ __typename?: 'WSLastOpenType', userId?: number | null, lastOpen?: any | null } | null> | null };

export const ChatMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<ChatMessageFragment, unknown>;
export const ChatMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]} as unknown as DocumentNode<ChatMemberFragment, unknown>;
export const ChatFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]} as unknown as DocumentNode<ChatFragment, unknown>;
export const WsChatMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WSChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WSChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<WsChatMessageFragment, unknown>;
export const UserCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<UserCardFragment, unknown>;
export const EventOrganizerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<EventOrganizerFragment, unknown>;
export const EventMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<EventMemberFragment, unknown>;
export const PostCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<PostCardFragment, unknown>;
export const EventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventFragment, unknown>;
export const BasicInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<BasicInfoFragment, unknown>;
export const SurveyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}}]} as unknown as DocumentNode<SurveyFragment, unknown>;
export const EventCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]} as unknown as DocumentNode<EventCardFragment, unknown>;
export const ContextProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]} as unknown as DocumentNode<ContextProfileFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<LoginMutationResult, LoginMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationResult, SignUpMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogOutMutationResult, LogOutMutationVariables>;
export const SendChatMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChatMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendChatMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"attachmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<SendChatMessageMutationResult, SendChatMessageMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requirements"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationLongitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationLatitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Activity"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillLevel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SkillLevel"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowSpectators"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAge"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAge"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acceptedGenders"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenderNoPNTS"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"requirements"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requirements"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationLongitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationLongitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationLatitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationLatitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"activity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activity"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillLevel"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxParticipants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowSpectators"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowSpectators"}}},{"kind":"Argument","name":{"kind":"Name","value":"minAge"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAge"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxAge"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAge"}}},{"kind":"Argument","name":{"kind":"Name","value":"acceptedGenders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acceptedGenders"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateEventMutationResult, CreateEventMutationVariables>;
export const JoinEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<JoinEventMutationResult, JoinEventMutationVariables>;
export const LeaveEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<LeaveEventMutationResult, LeaveEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutationResult, DeleteEventMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageUploadUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePostMutationResult, CreatePostMutationVariables>;
export const UpdateLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfileLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateLocationMutationResult, UpdateLocationMutationVariables>;
export const UpdateProfileBasicInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfileBasicInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Gender"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBasicInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateOfBirth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}}},{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileBasicInfoMutationResult, UpdateProfileBasicInfoMutationVariables>;
export const UpdateProfileSurveyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfileSurveyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FrequencyOfPhycicalActivity"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"socialInteractionImportance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SocialInteractionImportance"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredPartySize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferredPartySize"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formedRelationshipTypes"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FormedRelationshipsType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PhysicalActivitySatisfaction"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferredPartnerCharacteristics"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchedParticipationLikelihood"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genderPreference"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenderNoPNTS"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mainInterest"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MainInterest"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TimeOfTheDay"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSurveyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}}},{"kind":"Argument","name":{"kind":"Name","value":"socialInteractionImportance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"socialInteractionImportance"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredPartySize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredPartySize"}}},{"kind":"Argument","name":{"kind":"Name","value":"formedRelationshipTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formedRelationshipTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"physicalActivitySatisfaction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"physicalActivitySatisfaction"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredPartnerCharacteristics"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}}},{"kind":"Argument","name":{"kind":"Name","value":"matchedParticipationLikelihood"},"value":{"kind":"Variable","name":{"kind":"Name","value":"matchedParticipationLikelihood"}}},{"kind":"Argument","name":{"kind":"Name","value":"genderPreference"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genderPreference"}}},{"kind":"Argument","name":{"kind":"Name","value":"mainInterest"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mainInterest"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredTimeOfTheDay"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredTimeOfTheDay"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<UpdateProfileSurveyInfoMutationResult, UpdateProfileSurveyInfoMutationVariables>;
export const UpdateAllPrivacySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAllPrivacySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scope"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrivacyScope"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAllPrivacySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scope"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scope"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateAllPrivacySettingsMutationResult, UpdateAllPrivacySettingsMutationVariables>;
export const SendFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<SendFriendRequestMutationResult, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<AcceptFriendRequestMutationResult, AcceptFriendRequestMutationVariables>;
export const CancelFriendRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelFriendRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelFriendRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<CancelFriendRequestMutationResult, CancelFriendRequestMutationVariables>;
export const RemoveFriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFriend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFriend"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveFriendMutationResult, RemoveFriendMutationVariables>;
export const UsernameTakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsernameTaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usernameTaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UsernameTakenQueryResult, UsernameTakenQueryVariables>;
export const EmailTakenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailTaken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailTaken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<EmailTakenQueryResult, EmailTakenQueryVariables>;
export const GetUserChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserChatQueryResult, GetUserChatQueryVariables>;
export const GetMyChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Chat"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMember"}}]}}]}}]} as unknown as DocumentNode<GetMyChatsQueryResult, GetMyChatsQueryVariables>;
export const GetAttachmentUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAttachmentUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newAttachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetAttachmentUploadUrlQueryResult, GetAttachmentUploadUrlQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finished"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<GetEventQueryResult, GetEventQueryVariables>;
export const GetFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFeedQueryResult, GetFeedQueryVariables>;
export const GetHomeEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomeEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"futureJoinedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ongoingJoinedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]} as unknown as DocumentNode<GetHomeEventsQueryResult, GetHomeEventsQueryVariables>;
export const GetMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frequencyOfPhysicalActivity"}},{"kind":"Field","name":{"kind":"Name","value":"socialInteractionImportance"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartySize"}},{"kind":"Field","name":{"kind":"Name","value":"formedRelationshipTypes"}},{"kind":"Field","name":{"kind":"Name","value":"physicalActivitySatisfaction"}},{"kind":"Field","name":{"kind":"Name","value":"preferredPartnerCharacteristics"}},{"kind":"Field","name":{"kind":"Name","value":"matchedParticipationLikelihood"}},{"kind":"Field","name":{"kind":"Name","value":"preferredTimeOfTheDay"}},{"kind":"Field","name":{"kind":"Name","value":"genderPreference"}},{"kind":"Field","name":{"kind":"Name","value":"mainInterest"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"isCapeable"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<GetMyProfileQueryResult, GetMyProfileQueryVariables>;
export const GetProfilePictureUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProfilePictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profilePictureGcloudUrl"}}]}}]} as unknown as DocumentNode<GetProfilePictureUploadUrlQueryResult, GetProfilePictureUploadUrlQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lastFetch"},"value":{"kind":"StringValue","value":"1971-01-01","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"notificationType"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserNotificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQueryResult, GetNotificationsQueryVariables>;
export const SearchItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchCategory"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}},{"kind":"Argument","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchItemsQueryResult, SearchItemsQueryVariables>;
export const GetMyFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]} as unknown as DocumentNode<GetMyFriendsQueryResult, GetMyFriendsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"friendCount"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<GetUserQueryResult, GetUserQueryVariables>;
export const ChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WSChatMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WSChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WSChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<ChatMessagesSubscriptionResult, ChatMessagesSubscriptionVariables>;
export const LastOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LastOpen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatLastOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]}}]} as unknown as DocumentNode<LastOpenSubscriptionResult, LastOpenSubscriptionVariables>;