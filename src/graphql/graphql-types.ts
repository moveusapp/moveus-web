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

/** An enumeration. */
export enum AcquaintancePreference {
  Everyone = 'EVERYONE',
  Nobody = 'NOBODY',
  One = 'ONE',
  ThreePlus = 'THREE_PLUS',
  Two = 'TWO'
}

/** An enumeration. */
export enum ActivityKind {
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

export type ActivityModelType = {
  __typename?: 'ActivityModelType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type AddChatMember = {
  __typename?: 'AddChatMember';
  chat?: Maybe<ChatType>;
};

export type AlterAllPrivacySettingsMutation = {
  __typename?: 'AlterAllPrivacySettingsMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AlterBasicInfoMutation = {
  __typename?: 'AlterBasicInfoMutation';
  myProfile?: Maybe<ProfileType>;
};

export type AlterEventLocation = {
  __typename?: 'AlterEventLocation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AlterEventMutation = {
  __typename?: 'AlterEventMutation';
  event?: Maybe<EventType>;
};

export type AlterMaxTravelDistanceMutation = {
  __typename?: 'AlterMaxTravelDistanceMutation';
  myProfile?: Maybe<ProfileType>;
};

export type AlterPreferencesMutation = {
  __typename?: 'AlterPreferencesMutation';
  myProfile?: Maybe<ProfileType>;
};

export type AlterPrivacySettingMutation = {
  __typename?: 'AlterPrivacySettingMutation';
  privacySetting?: Maybe<PrivacySettingType>;
};

export type AlterProfileLocation = {
  __typename?: 'AlterProfileLocation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type AttachmentType = {
  __typename?: 'AttachmentType';
  id?: Maybe<Scalars['String']['output']>;
  upload?: Maybe<UploadTicketType>;
};

export type AvailabilityInput = {
  dayOfWeek: DayOfWeek;
  timeOfDay: TimeOfTheDay;
};

export type BaseNotificationType = {
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationKind>;
  time?: Maybe<Scalars['DateTime']['output']>;
};

export type BlockUserMutation = {
  __typename?: 'BlockUserMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CancelEventMutation = {
  __typename?: 'CancelEventMutation';
  event?: Maybe<EventType>;
};

/** An enumeration. */
export enum ChatKind {
  Direct = 'DIRECT',
  Group = 'GROUP'
}

export type ChatMemberType = {
  __typename?: 'ChatMemberType';
  chat: ChatType;
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<ChatNotifications>;
  user: UserType;
};

/** An enumeration. */
export enum ChatMessageKind {
  MemberAdded = 'MEMBER_ADDED',
  MemberRemoved = 'MEMBER_REMOVED',
  NicknameChanged = 'NICKNAME_CHANGED',
  Text = 'TEXT'
}

export type ChatMessageType = {
  __typename?: 'ChatMessageType';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<ChatMessageKind>;
  targetUser?: Maybe<UserType>;
  textContent?: Maybe<Scalars['String']['output']>;
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
  groupName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<ChatKind>;
  lastMessage?: Maybe<ChatMessageType>;
  members: Array<Maybe<ChatMemberType>>;
  messages: Array<ChatMessageType>;
  notifications?: Maybe<ChatNotifications>;
  timeCreated: Scalars['DateTime']['output'];
};


export type ChatTypeMembersArgs = {
  includeFormer?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentOnEventMutation = {
  __typename?: 'CommentOnEventMutation';
  comment?: Maybe<CommentType>;
};

export type CommentOnPostMutation = {
  __typename?: 'CommentOnPostMutation';
  comment?: Maybe<CommentType>;
};

export type CommentType = {
  __typename?: 'CommentType';
  event?: Maybe<CreateEventType>;
  hasReplies?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  parent?: Maybe<CommentType>;
  post?: Maybe<PostType>;
  replies: Array<CommentType>;
  text: Scalars['String']['output'];
  timePosted: Scalars['DateTime']['output'];
  user: UserType;
};

export type ConfirmEmailMutation = {
  __typename?: 'ConfirmEmailMutation';
  myProfile?: Maybe<ProfileType>;
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

export type CreateDirectChat = {
  __typename?: 'CreateDirectChat';
  chat?: Maybe<ChatType>;
};

export type CreateEventMutation = {
  __typename?: 'CreateEventMutation';
  event?: Maybe<CreateEventType>;
};

export type CreateEventType = {
  __typename?: 'CreateEventType';
  acceptedGenders?: Maybe<Scalars['JSONString']['output']>;
  activity?: Maybe<ActivityKind>;
  allowSpectators: Scalars['Boolean']['output'];
  comments?: Maybe<Array<Maybe<CommentType>>>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  imageUpload?: Maybe<UploadTicketType>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  location: LocationType;
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  members: Array<EventMemberType>;
  minAge?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<Maybe<EventMemberType>>>;
  organizer?: Maybe<EventMemberType>;
  participantCount?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Maybe<EventMemberType>>>;
  phase: EventPhase;
  posts: Array<PostType>;
  role?: Maybe<MemberRole>;
  score?: Maybe<Scalars['Float']['output']>;
  skillLevel?: Maybe<SkillLevel>;
  socialComments: Array<CommentType>;
  spectators?: Maybe<Array<Maybe<EventMemberType>>>;
  startTime: Scalars['DateTime']['output'];
  timeCreated: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};


export type CreateEventTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type CreateEventTypeImageUploadArgs = {
  contentType: Scalars['String']['input'];
};

export type CreateGroupChat = {
  __typename?: 'CreateGroupChat';
  chat?: Maybe<ChatType>;
};

export type CreatePostMutation = {
  __typename?: 'CreatePostMutation';
  post?: Maybe<CreatePostType>;
};

export type CreatePostType = {
  __typename?: 'CreatePostType';
  author?: Maybe<UserType>;
  comments?: Maybe<Array<Maybe<CommentType>>>;
  content: Scalars['String']['output'];
  event?: Maybe<CreateEventType>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUpload?: Maybe<UploadTicketType>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likedBy: Array<UserType>;
  likes?: Maybe<Scalars['Int']['output']>;
  timePosted: Scalars['DateTime']['output'];
};


export type CreatePostTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};


export type CreatePostTypeImageUploadArgs = {
  contentType: Scalars['String']['input'];
};

/** An enumeration. */
export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type DeleteAccountMutation = {
  __typename?: 'DeleteAccountMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteEventMutation = {
  __typename?: 'DeleteEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EventMemberType = {
  __typename?: 'EventMemberType';
  comment?: Maybe<Scalars['String']['output']>;
  hasParticipated: Scalars['Boolean']['output'];
  participates: Scalars['Boolean']['output'];
  role?: Maybe<MemberRole>;
  score?: Maybe<EventRating>;
  user: UserType;
};

export type EventNotificationType = BaseNotificationType & {
  __typename?: 'EventNotificationType';
  event?: Maybe<EventType>;
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationKind>;
  time?: Maybe<Scalars['DateTime']['output']>;
};

/** An enumeration. */
export enum EventPhase {
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Scheduled = 'SCHEDULED'
}

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
  activity?: Maybe<ActivityKind>;
  allowSpectators: Scalars['Boolean']['output'];
  comments?: Maybe<Array<Maybe<CommentType>>>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  location: LocationType;
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  members: Array<EventMemberType>;
  minAge?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<Maybe<EventMemberType>>>;
  organizer?: Maybe<EventMemberType>;
  participantCount?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Maybe<EventMemberType>>>;
  phase: EventPhase;
  posts: Array<PostType>;
  role?: Maybe<MemberRole>;
  score?: Maybe<Scalars['Float']['output']>;
  skillLevel?: Maybe<SkillLevel>;
  socialComments: Array<CommentType>;
  spectators?: Maybe<Array<Maybe<EventMemberType>>>;
  startTime: Scalars['DateTime']['output'];
  timeCreated: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};


export type EventTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type FeedItemUnion = EventType | PostType;

export type FinishEventMutation = {
  __typename?: 'FinishEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type FollowType = {
  __typename?: 'FollowType';
  timeCreated: Scalars['DateTime']['output'];
  user?: Maybe<UserType>;
};

export type FollowUserMutation = {
  __typename?: 'FollowUserMutation';
  follow?: Maybe<FollowType>;
};

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

export type HttpHeaderType = {
  __typename?: 'HttpHeaderType';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type JoinEventMutation = {
  __typename?: 'JoinEventMutation';
  event?: Maybe<EventType>;
  member?: Maybe<EventMemberType>;
};

export type KickEventMemberMutation = {
  __typename?: 'KickEventMemberMutation';
  event?: Maybe<EventType>;
};

export type LeaveChat = {
  __typename?: 'LeaveChat';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LeaveEventMutation = {
  __typename?: 'LeaveEventMutation';
  event?: Maybe<EventType>;
};

export type LikeCommentMutation = {
  __typename?: 'LikeCommentMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
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
  countryCode?: Maybe<CountryCode>;
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

export type MarkChatRead = {
  __typename?: 'MarkChatRead';
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
};

/** An enumeration. */
export enum MemberRole {
  Moderator = 'MODERATOR',
  Organizer = 'ORGANIZER',
  Participant = 'PARTICIPANT',
  Spectator = 'SPECTATOR'
}

export type Mutations = {
  __typename?: 'Mutations';
  addChatMember?: Maybe<AddChatMember>;
  alterAllPrivacySettings?: Maybe<AlterAllPrivacySettingsMutation>;
  alterBasicInfo?: Maybe<AlterBasicInfoMutation>;
  alterEvent?: Maybe<AlterEventMutation>;
  alterEventLocation?: Maybe<AlterEventLocation>;
  alterMaxTravelDistance?: Maybe<AlterMaxTravelDistanceMutation>;
  alterPrivacySetting?: Maybe<AlterPrivacySettingMutation>;
  alterProfileLocation?: Maybe<AlterProfileLocation>;
  alterSurveyInfo?: Maybe<AlterPreferencesMutation>;
  blockUser?: Maybe<BlockUserMutation>;
  cancelEvent?: Maybe<CancelEventMutation>;
  commentOnEvent?: Maybe<CommentOnEventMutation>;
  commentOnPost?: Maybe<CommentOnPostMutation>;
  confirmEmail?: Maybe<ConfirmEmailMutation>;
  confirmMemberParticipation?: Maybe<ConfirmMemberParticipationMutation>;
  createDirectChat?: Maybe<CreateDirectChat>;
  createEvent?: Maybe<CreateEventMutation>;
  createGroupChat?: Maybe<CreateGroupChat>;
  createPost?: Maybe<CreatePostMutation>;
  deleteAccount?: Maybe<DeleteAccountMutation>;
  deleteEvent?: Maybe<DeleteEventMutation>;
  finishEvent?: Maybe<FinishEventMutation>;
  followUser?: Maybe<FollowUserMutation>;
  joinEvent?: Maybe<JoinEventMutation>;
  kickEventMember?: Maybe<KickEventMemberMutation>;
  leaveChat?: Maybe<LeaveChat>;
  leaveEvent?: Maybe<LeaveEventMutation>;
  likeComment?: Maybe<LikeCommentMutation>;
  likeEventMember?: Maybe<LikeEventMemberMutation>;
  likePost?: Maybe<LikePostMutation>;
  login?: Maybe<LoginMutation>;
  logout?: Maybe<LogoutMutation>;
  markChatRead?: Maybe<MarkChatRead>;
  rateEvent?: Maybe<RateEventMutation>;
  removePreferredActivity?: Maybe<RemovePreferredActivity>;
  replyOnComment?: Maybe<ReplyOnCommentMutation>;
  reportEventMutation?: Maybe<ReportEventMutation>;
  reportUserMutation?: Maybe<ReportUserMutation>;
  resendVerificationCode?: Maybe<ResendVerificationCodeMutation>;
  sendChatMessage?: Maybe<SendChatMessage>;
  setChatNickname?: Maybe<SetChatNickname>;
  setChatNotifications?: Maybe<SetChatNotifications>;
  setPreferredActivity?: Maybe<SetPreferredActivity>;
  signUp?: Maybe<SignUpMutation>;
  spectateEvent?: Maybe<SpectateEventMutation>;
  unblockUser?: Maybe<UnblockUserMutation>;
  unfollowUser?: Maybe<UnfollowUserMutation>;
  unlikeComment?: Maybe<UnlikeCommentMutation>;
  unlikePost?: Maybe<UnlikePostMutation>;
};


export type MutationsAddChatMemberArgs = {
  chatId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsAlterAllPrivacySettingsArgs = {
  scope: PrivacyScope;
};


export type MutationsAlterBasicInfoArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsAlterEventArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  eventId: Scalars['Int']['input'];
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
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


export type MutationsAlterMaxTravelDistanceArgs = {
  distance?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsAlterPrivacySettingArgs = {
  scope: PrivacyScope;
  setting: PrivacySetting;
};


export type MutationsAlterProfileLocationArgs = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationsAlterSurveyInfoArgs = {
  acquaintancePreference?: InputMaybe<AcquaintancePreference>;
  activityVsSocial?: InputMaybe<Scalars['Int']['input']>;
  availabilities?: InputMaybe<Array<InputMaybe<AvailabilityInput>>>;
  enjoysMeetingNewPeople?: InputMaybe<Scalars['Int']['input']>;
  feelsLikeBurden?: InputMaybe<Scalars['Int']['input']>;
  leadershipInclination?: InputMaybe<Scalars['Int']['input']>;
  maxTravelDistance?: InputMaybe<Scalars['Int']['input']>;
  motivatedByCompetition?: InputMaybe<Scalars['Int']['input']>;
  organizingOpenness?: InputMaybe<OrganizingOpenness>;
  participationGroups?: InputMaybe<Array<InputMaybe<ParticipationGroupKind>>>;
  planningHorizon?: InputMaybe<Scalars['Int']['input']>;
  preferredActivities?: InputMaybe<Array<InputMaybe<PreferredActivityInput>>>;
  preferredGroupSize?: InputMaybe<Scalars['Int']['input']>;
  preferredSessionDuration?: InputMaybe<Scalars['Int']['input']>;
  pushesThroughDiscomfort?: InputMaybe<Scalars['Int']['input']>;
  weeklyActivityTarget?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsBlockUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsCancelEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsCommentOnEventArgs = {
  eventId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationsCommentOnPostArgs = {
  postId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};


export type MutationsConfirmEmailArgs = {
  code: Scalars['String']['input'];
};


export type MutationsConfirmMemberParticipationArgs = {
  eventId: Scalars['Int']['input'];
  participated: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsCreateDirectChatArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationsCreateEventArgs = {
  acceptedGenders?: InputMaybe<Array<InputMaybe<GenderNoPnts>>>;
  activity: ActivityKind;
  allowSpectators?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  locationAddressLine1?: InputMaybe<Scalars['String']['input']>;
  locationAddressLine2?: InputMaybe<Scalars['String']['input']>;
  locationCountryCode?: InputMaybe<CountryCode>;
  locationLatitude?: InputMaybe<Scalars['Float']['input']>;
  locationLongitude?: InputMaybe<Scalars['Float']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationRegion?: InputMaybe<Scalars['String']['input']>;
  locationZipCode?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  skillLevel: SkillLevel;
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};


export type MutationsCreateGroupChatArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  userIds: Array<InputMaybe<Scalars['Int']['input']>>;
};


export type MutationsCreatePostArgs = {
  content: Scalars['String']['input'];
  eventId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsDeleteEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsFinishEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsFollowUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsJoinEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsKickEventMemberArgs = {
  eventId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationsLeaveChatArgs = {
  chatId: Scalars['Int']['input'];
};


export type MutationsLeaveEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsLikeCommentArgs = {
  commentId: Scalars['Int']['input'];
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
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  user: Scalars['String']['input'];
};


export type MutationsMarkChatReadArgs = {
  chatId: Scalars['Int']['input'];
};


export type MutationsRateEventArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['Int']['input'];
  score: EventRating;
};


export type MutationsRemovePreferredActivityArgs = {
  activity?: InputMaybe<ActivityKind>;
};


export type MutationsReplyOnCommentArgs = {
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


export type MutationsResendVerificationCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationsSendChatMessageArgs = {
  attachmentId?: InputMaybe<Scalars['String']['input']>;
  chatId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
};


export type MutationsSetChatNicknameArgs = {
  chatId: Scalars['Int']['input'];
  nickname: Scalars['String']['input'];
};


export type MutationsSetChatNotificationsArgs = {
  chatId: Scalars['Int']['input'];
  notifications: ChatNotifications;
};


export type MutationsSetPreferredActivityArgs = {
  activity?: InputMaybe<ActivityKind>;
  skillLevel?: InputMaybe<SkillLevel>;
};


export type MutationsSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};


export type MutationsSpectateEventArgs = {
  eventId: Scalars['Int']['input'];
};


export type MutationsUnblockUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsUnfollowUserArgs = {
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationsUnlikeCommentArgs = {
  commentId: Scalars['Int']['input'];
};


export type MutationsUnlikePostArgs = {
  postId: Scalars['Int']['input'];
};

/** An enumeration. */
export enum NotificationKind {
  EventCancelled = 'EVENT_CANCELLED',
  EventFinished = 'EVENT_FINISHED',
  EventStarted = 'EVENT_STARTED',
  NewFollower = 'NEW_FOLLOWER'
}

/** An enumeration. */
export enum OrganizingOpenness {
  No = 'NO',
  Sometimes = 'SOMETIMES',
  Yes = 'YES'
}

/** An enumeration. */
export enum ParticipationGroupKind {
  CommonInterests = 'COMMON_INTERESTS',
  FirstHand = 'FIRST_HAND',
  RomanticGroup = 'ROMANTIC_GROUP',
  RomanticOneOnOne = 'ROMANTIC_ONE_ON_ONE',
  SecondHand = 'SECOND_HAND'
}

export type PostType = {
  __typename?: 'PostType';
  author?: Maybe<UserType>;
  comments?: Maybe<Array<Maybe<CommentType>>>;
  content: Scalars['String']['output'];
  event?: Maybe<CreateEventType>;
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likedBy: Array<UserType>;
  likes?: Maybe<Scalars['Int']['output']>;
  timePosted: Scalars['DateTime']['output'];
};


export type PostTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type PreferredActivityInput = {
  activity: ActivityKind;
  skillLevel: SkillLevel;
};

export type PreferredActivityType = {
  __typename?: 'PreferredActivityType';
  activity?: Maybe<ActivityKind>;
  skillLevel?: Maybe<SkillLevel>;
};

/** An enumeration. */
export enum PrivacyScope {
  Everyone = 'EVERYONE',
  Followers = 'FOLLOWERS',
  Mutuals = 'MUTUALS',
  Noone = 'NOONE'
}

/** An enumeration. */
export enum PrivacySetting {
  Age = 'AGE',
  Followers = 'FOLLOWERS',
  Gender = 'GENDER',
  Location = 'LOCATION',
  Messages = 'MESSAGES',
  Posts = 'POSTS'
}

export type PrivacySettingType = {
  __typename?: 'PrivacySettingType';
  scope?: Maybe<PrivacyScope>;
  setting?: Maybe<PrivacySetting>;
};

export type ProfileType = {
  __typename?: 'ProfileType';
  attendingEvents?: Maybe<Array<Maybe<EventType>>>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  badge?: Maybe<UserBadge>;
  bio: Scalars['String']['output'];
  chatmemberSet: Array<ChatMemberType>;
  chatmessageSet: Array<ChatMessageType>;
  dateJoined: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  dislikes?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  eventmemberSet: Array<EventMemberType>;
  firstName: Scalars['String']['output'];
  followerCount?: Maybe<Scalars['Int']['output']>;
  followers?: Maybe<Array<Maybe<UserType>>>;
  following?: Maybe<Array<Maybe<UserType>>>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  likes?: Maybe<Scalars['Int']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  organizingEvents?: Maybe<Array<Maybe<EventType>>>;
  password: Scalars['String']['output'];
  postSet: Array<PostType>;
  posts?: Maybe<Array<Maybe<PostType>>>;
  preferences?: Maybe<UserPreferencesType>;
  preferredActivities?: Maybe<Array<Maybe<PreferredActivityType>>>;
  privacySettings: Array<PrivacySettingType>;
  tier?: Maybe<UserTier>;
  username: Scalars['String']['output'];
  xp: Scalars['Int']['output'];
};


export type ProfileTypePostsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Queries = {
  __typename?: 'Queries';
  allActivities?: Maybe<Array<Maybe<ActivityModelType>>>;
  anonymousUserEvents?: Maybe<Array<Maybe<EventType>>>;
  avatarUpload?: Maybe<UploadTicketType>;
  chat?: Maybe<ChatType>;
  event?: Maybe<EventType>;
  eventImageUpload?: Maybe<UploadTicketType>;
  followerCount?: Maybe<Scalars['Int']['output']>;
  followers?: Maybe<Array<Maybe<FollowType>>>;
  following?: Maybe<Array<Maybe<FollowType>>>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  futureJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  isLoggedIn?: Maybe<Scalars['Boolean']['output']>;
  joinedEvents?: Maybe<Array<Maybe<EventType>>>;
  myFeed?: Maybe<Array<Maybe<FeedItemUnion>>>;
  myNotifications?: Maybe<Array<Maybe<BaseNotificationType>>>;
  myProfile?: Maybe<ProfileType>;
  newAttachment?: Maybe<AttachmentType>;
  ongoingJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  ownedEvents?: Maybe<Array<Maybe<EventType>>>;
  pastJoinedEvents?: Maybe<Array<Maybe<EventType>>>;
  post?: Maybe<PostType>;
  search?: Maybe<Array<Maybe<SearchUnion>>>;
  unfinishedEvents?: Maybe<Array<Maybe<UnfinishedEventType>>>;
  unratedEvents?: Maybe<Array<Maybe<EventType>>>;
  user?: Maybe<UserType>;
};


export type QueriesAvatarUploadArgs = {
  contentType: Scalars['String']['input'];
};


export type QueriesChatArgs = {
  chatId: Scalars['Int']['input'];
};


export type QueriesEventArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueriesEventImageUploadArgs = {
  contentType: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
};


export type QueriesMyFeedArgs = {
  end: Scalars['Int']['input'];
  start: Scalars['Int']['input'];
};


export type QueriesMyNotificationsArgs = {
  lastFetch: Scalars['DateTime']['input'];
};


export type QueriesNewAttachmentArgs = {
  contentType: Scalars['String']['input'];
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
  username?: InputMaybe<Scalars['String']['input']>;
};

export type RateEventMutation = {
  __typename?: 'RateEventMutation';
  event?: Maybe<EventType>;
};

export type RemovePreferredActivity = {
  __typename?: 'RemovePreferredActivity';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReplyOnCommentMutation = {
  __typename?: 'ReplyOnCommentMutation';
  comment?: Maybe<CommentType>;
};

export type ReportEventMutation = {
  __typename?: 'ReportEventMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ReportUserMutation = {
  __typename?: 'ReportUserMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type ResendVerificationCodeMutation = {
  __typename?: 'ResendVerificationCodeMutation';
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

export type SetChatNickname = {
  __typename?: 'SetChatNickname';
  chatMember?: Maybe<ChatMemberType>;
};

export type SetChatNotifications = {
  __typename?: 'SetChatNotifications';
  chatMember?: Maybe<ChatMemberType>;
};

export type SetPreferredActivity = {
  __typename?: 'SetPreferredActivity';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type SignUpMutation = {
  __typename?: 'SignUpMutation';
  myProfile?: Maybe<ProfileType>;
};

/** An enumeration. */
export enum SkillLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE'
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
  myChats?: Maybe<Array<Maybe<WsMyChatUpdateType>>>;
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

export type UnblockUserMutation = {
  __typename?: 'UnblockUserMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnfinishedEventType = {
  __typename?: 'UnfinishedEventType';
  acceptedGenders?: Maybe<Scalars['JSONString']['output']>;
  activity?: Maybe<ActivityKind>;
  allowSpectators: Scalars['Boolean']['output'];
  comments?: Maybe<Array<Maybe<CommentType>>>;
  description?: Maybe<Scalars['String']['output']>;
  endTime: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  location: LocationType;
  maxAge?: Maybe<Scalars['Int']['output']>;
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  members: Array<EventMemberType>;
  minAge?: Maybe<Scalars['Int']['output']>;
  moderators?: Maybe<Array<Maybe<EventMemberType>>>;
  organizer?: Maybe<EventMemberType>;
  participantCount?: Maybe<Scalars['Int']['output']>;
  participants?: Maybe<Array<Maybe<EventMemberType>>>;
  phase: EventPhase;
  posts: Array<PostType>;
  role?: Maybe<MemberRole>;
  score?: Maybe<Scalars['Float']['output']>;
  skillLevel?: Maybe<SkillLevel>;
  socialComments: Array<CommentType>;
  spectators?: Maybe<Array<Maybe<EventMemberType>>>;
  startTime: Scalars['DateTime']['output'];
  timeCreated: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  unconfirmedParticipants?: Maybe<Array<Maybe<EventMemberType>>>;
};


export type UnfinishedEventTypeCommentsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type UnfollowUserMutation = {
  __typename?: 'UnfollowUserMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnlikeCommentMutation = {
  __typename?: 'UnlikeCommentMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UnlikePostMutation = {
  __typename?: 'UnlikePostMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UploadTicketType = {
  __typename?: 'UploadTicketType';
  expiresAt: Scalars['DateTime']['output'];
  headers: Array<Maybe<HttpHeaderType>>;
  method: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UserAvailabilityType = {
  __typename?: 'UserAvailabilityType';
  dayOfWeek?: Maybe<DayOfWeek>;
  timeOfDay?: Maybe<TimeOfTheDay>;
};

/** An enumeration. */
export enum UserBadge {
  Employee = 'EMPLOYEE',
  None = 'NONE',
  Verified = 'VERIFIED'
}

export type UserNotificationType = BaseNotificationType & {
  __typename?: 'UserNotificationType';
  id?: Maybe<Scalars['Int']['output']>;
  notificationType?: Maybe<NotificationKind>;
  time?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UserType>;
};

export type UserPreferencesType = {
  __typename?: 'UserPreferencesType';
  acquaintancePreference?: Maybe<AcquaintancePreference>;
  activityVsSocial?: Maybe<Scalars['Int']['output']>;
  availabilities?: Maybe<Array<Maybe<UserAvailabilityType>>>;
  enjoysMeetingNewPeople?: Maybe<Scalars['Int']['output']>;
  feelsLikeBurden?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  leadershipInclination?: Maybe<Scalars['Int']['output']>;
  maxTravelDistance?: Maybe<Scalars['Int']['output']>;
  motivatedByCompetition?: Maybe<Scalars['Int']['output']>;
  organizingOpenness?: Maybe<OrganizingOpenness>;
  participationGroups?: Maybe<Array<Maybe<ParticipationGroupKind>>>;
  planningHorizon?: Maybe<Scalars['Int']['output']>;
  preferredActivities: Array<PreferredActivityType>;
  preferredGroupSize?: Maybe<Scalars['Int']['output']>;
  preferredSessionDuration?: Maybe<Scalars['Int']['output']>;
  pushesThroughDiscomfort?: Maybe<Scalars['Int']['output']>;
  weeklyActivityTarget?: Maybe<Scalars['Int']['output']>;
};

/** An enumeration. */
export enum UserTier {
  Premium = 'PREMIUM',
  Standard = 'STANDARD'
}

export type UserType = {
  __typename?: 'UserType';
  attendingEvents?: Maybe<Array<Maybe<EventType>>>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  badge?: Maybe<UserBadge>;
  bio: Scalars['String']['output'];
  canMessage?: Maybe<Scalars['Boolean']['output']>;
  dateJoined: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  dislikes?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  followerCount?: Maybe<Scalars['Int']['output']>;
  followers?: Maybe<Array<Maybe<UserType>>>;
  following?: Maybe<Array<Maybe<UserType>>>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Int']['output']>;
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  isFollowedBy?: Maybe<Scalars['Boolean']['output']>;
  isFollowing?: Maybe<Scalars['Boolean']['output']>;
  lastName: Scalars['String']['output'];
  likes?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<LocationType>;
  organizingEvents?: Maybe<Array<Maybe<EventType>>>;
  posts?: Maybe<Array<Maybe<PostType>>>;
  preferredActivities?: Maybe<Array<Maybe<PreferredActivityType>>>;
  tier?: Maybe<UserTier>;
  username: Scalars['String']['output'];
  xp: Scalars['Int']['output'];
};


export type UserTypePostsArgs = {
  end?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type WsChatMemberType = {
  __typename?: 'WSChatMemberType';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  badge?: Maybe<UserBadge>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type WsChatMessageType = {
  __typename?: 'WSChatMessageType';
  attachmentUrl?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  targetUserId?: Maybe<Scalars['Int']['output']>;
  textContent?: Maybe<Scalars['String']['output']>;
  timeSent?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type WsChatType = {
  __typename?: 'WSChatType';
  groupName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lastMessage?: Maybe<WsChatMessageType>;
  members?: Maybe<Array<Maybe<WsChatMemberType>>>;
  timeCreated?: Maybe<Scalars['DateTime']['output']>;
};

export type WsLastOpenType = {
  __typename?: 'WSLastOpenType';
  lastOpen?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type WsMyChatUpdateType = {
  __typename?: 'WSMyChatUpdateType';
  chat?: Maybe<WsChatType>;
  chatId?: Maybe<Scalars['Int']['output']>;
  eventType?: Maybe<Scalars['String']['output']>;
  lastMessage?: Maybe<WsChatMessageType>;
  member?: Maybe<WsChatMemberType>;
  removedUserId?: Maybe<Scalars['Int']['output']>;
};

export type ChatMemberFragment = { __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null } };

export type ChatMessageFragment = { __typename?: 'ChatMessageType', id?: number | null, kind?: ChatMessageKind | null, textContent?: string | null, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null }, targetUser?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } | null };

export type ChatFragment = { __typename?: 'ChatType', id?: number | null, kind?: ChatKind | null, groupName?: string | null, lastMessage?: { __typename?: 'ChatMessageType', id?: number | null, kind?: ChatMessageKind | null, textContent?: string | null, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null }, targetUser?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } | null } | null, members: Array<{ __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null } } | null>, allMembers: Array<{ __typename?: 'ChatMemberType', lastOpen?: any | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null } } | null> };

export type WsChatMessageFragment = { __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, kind?: string | null, targetUserId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null };

export type EventMemberFragment = { __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } };

export type EventOrganizerFragment = { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } };

export type EventFragment = { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null };

export type EventCardFragment = { __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } };

export type CommentFragment = { __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> };

export type PostCardFragment = { __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null };

export type UploadTicketFragment = { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> };

export type UserPreferencesFragment = { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null };

export type SurveyFragment = { __typename?: 'ProfileType', preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null };

export type BasicInfoFragment = { __typename?: 'ProfileType', firstName: string, lastName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null };

export type ContextProfileFragment = { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null };

export type UserFragment = { __typename?: 'UserType', id?: number | null, username: string, bio: string, gender?: Gender | null, firstName: string, lastName: string, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, dateOfBirth?: any | null, followerCount?: number | null, followingCount?: number | null, badge?: UserBadge | null, isFollowing?: boolean | null, isFollowedBy?: boolean | null, canMessage?: boolean | null, location?: { __typename?: 'LocationType', city?: string | null, region?: string | null, name?: string | null } | null, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, posts?: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null> | null };

export type UserCardFragment = { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null };

export type LoginMutationVariables = Exact<{
  user: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type LoginMutationResult = { __typename?: 'Mutations', login?: { __typename?: 'LoginMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null } | null };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
}>;


export type SignUpMutationResult = { __typename?: 'Mutations', signUp?: { __typename?: 'SignUpMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null } | null };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutationResult = { __typename?: 'Mutations', logout?: { __typename?: 'LogoutMutation', success?: boolean | null } | null };

export type ConfirmEmailMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConfirmEmailMutationResult = { __typename?: 'Mutations', confirmEmail?: { __typename?: 'ConfirmEmailMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null } | null };

export type ResendVerificationCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendVerificationCodeMutationResult = { __typename?: 'Mutations', resendVerificationCode?: { __typename?: 'ResendVerificationCodeMutation', success?: boolean | null } | null };

export type CreateGroupChatMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type CreateGroupChatMutationResult = { __typename?: 'Mutations', createGroupChat?: { __typename?: 'CreateGroupChat', chat?: { __typename?: 'ChatType', id?: number | null } | null } | null };

export type CreateDirectChatMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type CreateDirectChatMutationResult = { __typename?: 'Mutations', createDirectChat?: { __typename?: 'CreateDirectChat', chat?: { __typename?: 'ChatType', id?: number | null, kind?: ChatKind | null, groupName?: string | null, lastMessage?: { __typename?: 'ChatMessageType', id?: number | null } | null, members: Array<{ __typename?: 'ChatMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null> } | null } | null };

export type SetChatNicknameMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
  nickname: Scalars['String']['input'];
}>;


export type SetChatNicknameMutationResult = { __typename?: 'Mutations', setChatNickname?: { __typename?: 'SetChatNickname', chatMember?: { __typename?: 'ChatMemberType', nickname?: string | null, user: { __typename?: 'UserType', id?: number | null } } | null } | null };

export type AddChatMemberMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type AddChatMemberMutationResult = { __typename?: 'Mutations', addChatMember?: { __typename?: 'AddChatMember', chat?: { __typename?: 'ChatType', id?: number | null, members: Array<{ __typename?: 'ChatMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null> } | null } | null };

export type LeaveChatMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type LeaveChatMutationResult = { __typename?: 'Mutations', leaveChat?: { __typename?: 'LeaveChat', success?: boolean | null } | null };

export type MarkChatReadMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type MarkChatReadMutationResult = { __typename?: 'Mutations', markChatRead?: { __typename?: 'MarkChatRead', lastOpen?: any | null } | null };

export type SendChatMessageMutationVariables = Exact<{
  chatId: Scalars['Int']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  attachmentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type SendChatMessageMutationResult = { __typename?: 'Mutations', sendChatMessage?: { __typename?: 'SendChatMessage', chatMessage?: { __typename?: 'ChatMessageType', id?: number | null, kind?: ChatMessageKind | null, textContent?: string | null, timeSent: any, attachmentUrl?: string | null, user: { __typename?: 'UserType', id?: number | null }, targetUser?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } | null } | null } | null };

export type CreateEventMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  locationName?: InputMaybe<Scalars['String']['input']>;
  locationAddressLine1?: InputMaybe<Scalars['String']['input']>;
  locationAddressLine2?: InputMaybe<Scalars['String']['input']>;
  locationCountryCode?: InputMaybe<CountryCode>;
  locationRegion?: InputMaybe<Scalars['String']['input']>;
  locationZipCode?: InputMaybe<Scalars['Int']['input']>;
  locationLatitude?: InputMaybe<Scalars['Float']['input']>;
  locationLongitude?: InputMaybe<Scalars['Float']['input']>;
  activity: ActivityKind;
  skillLevel: SkillLevel;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  allowSpectators?: InputMaybe<Scalars['Boolean']['input']>;
  minAge?: InputMaybe<Scalars['Int']['input']>;
  maxAge?: InputMaybe<Scalars['Int']['input']>;
  acceptedGenders?: InputMaybe<Array<GenderNoPnts> | GenderNoPnts>;
  withPicture: Scalars['Boolean']['input'];
  contentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateEventMutationResult = { __typename?: 'Mutations', createEvent?: { __typename?: 'CreateEventMutation', event?: { __typename?: 'CreateEventType', id?: number | null, imageUpload?: { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> } | null } | null } | null };

export type JoinEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type JoinEventMutationResult = { __typename?: 'Mutations', joinEvent?: { __typename?: 'JoinEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null, member?: { __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null } | null };

export type LeaveEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type LeaveEventMutationResult = { __typename?: 'Mutations', leaveEvent?: { __typename?: 'LeaveEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null } | null };

export type AlterEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AlterEventMutationResult = { __typename?: 'Mutations', alterEvent?: { __typename?: 'AlterEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type DeleteEventMutationResult = { __typename?: 'Mutations', deleteEvent?: { __typename?: 'DeleteEventMutation', success?: boolean | null } | null };

export type FinishEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type FinishEventMutationResult = { __typename?: 'Mutations', finishEvent?: { __typename?: 'FinishEventMutation', success?: boolean | null } | null };

export type CancelEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type CancelEventMutationResult = { __typename?: 'Mutations', cancelEvent?: { __typename?: 'CancelEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null } | null };

export type RateEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  score: EventRating;
}>;


export type RateEventMutationResult = { __typename?: 'Mutations', rateEvent?: { __typename?: 'RateEventMutation', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null } | null };

export type AlterLocationMutationVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
}>;


export type AlterLocationMutationResult = { __typename?: 'Mutations', alterProfileLocation?: { __typename?: 'AlterProfileLocation', success?: boolean | null } | null };

export type AlterProfileBasicInfoMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Gender>;
}>;


export type AlterProfileBasicInfoMutationResult = { __typename?: 'Mutations', alterBasicInfo?: { __typename?: 'AlterBasicInfoMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null } | null };

export type AlterProfileSurveyInfoMutationVariables = Exact<{
  preferredActivities?: InputMaybe<Array<InputMaybe<PreferredActivityInput>> | InputMaybe<PreferredActivityInput>>;
  preferredSessionDuration?: InputMaybe<Scalars['Int']['input']>;
  organizingOpenness?: InputMaybe<OrganizingOpenness>;
  leadershipInclination?: InputMaybe<Scalars['Int']['input']>;
  availabilities?: InputMaybe<Array<InputMaybe<AvailabilityInput>> | InputMaybe<AvailabilityInput>>;
  maxTravelDistance?: InputMaybe<Scalars['Int']['input']>;
  weeklyActivityTarget?: InputMaybe<Scalars['Int']['input']>;
  pushesThroughDiscomfort?: InputMaybe<Scalars['Int']['input']>;
  preferredGroupSize?: InputMaybe<Scalars['Int']['input']>;
  participationGroups?: InputMaybe<Array<InputMaybe<ParticipationGroupKind>> | InputMaybe<ParticipationGroupKind>>;
  acquaintancePreference?: InputMaybe<AcquaintancePreference>;
  enjoysMeetingNewPeople?: InputMaybe<Scalars['Int']['input']>;
  activityVsSocial?: InputMaybe<Scalars['Int']['input']>;
  motivatedByCompetition?: InputMaybe<Scalars['Int']['input']>;
  planningHorizon?: InputMaybe<Scalars['Int']['input']>;
  feelsLikeBurden?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AlterProfileSurveyInfoMutationResult = { __typename?: 'Mutations', alterSurveyInfo?: { __typename?: 'AlterPreferencesMutation', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null } | null };

export type AlterAllPrivacySettingsMutationVariables = Exact<{
  scope: PrivacyScope;
}>;


export type AlterAllPrivacySettingsMutationResult = { __typename?: 'Mutations', alterAllPrivacySettings?: { __typename?: 'AlterAllPrivacySettingsMutation', success?: boolean | null } | null };

export type AlterPrivacySettingMutationVariables = Exact<{
  setting: PrivacySetting;
  scope: PrivacyScope;
}>;


export type AlterPrivacySettingMutationResult = { __typename?: 'Mutations', alterPrivacySetting?: { __typename?: 'AlterPrivacySettingMutation', privacySetting?: { __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null } | null } | null };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutationResult = { __typename?: 'Mutations', deleteAccount?: { __typename?: 'DeleteAccountMutation', success?: boolean | null } | null };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FollowUserMutationResult = { __typename?: 'Mutations', followUser?: { __typename?: 'FollowUserMutation', follow?: { __typename?: 'FollowType', timeCreated: any, user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null } | null } | null };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UnfollowUserMutationResult = { __typename?: 'Mutations', unfollowUser?: { __typename?: 'UnfollowUserMutation', success?: boolean | null } | null };

export type CreatePostMutationVariables = Exact<{
  content: Scalars['String']['input'];
  eventId?: InputMaybe<Scalars['Int']['input']>;
  withPicture: Scalars['Boolean']['input'];
  contentType?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreatePostMutationResult = { __typename?: 'Mutations', createPost?: { __typename?: 'CreatePostMutation', post?: { __typename?: 'CreatePostType', id?: number | null, imageUpload?: { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> } | null } | null } | null };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type LikePostMutationResult = { __typename?: 'Mutations', likePost?: { __typename?: 'LikePostMutation', success?: boolean | null } | null };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
}>;


export type UnlikePostMutationResult = { __typename?: 'Mutations', unlikePost?: { __typename?: 'UnlikePostMutation', success?: boolean | null } | null };

export type CommentOnPostMutationVariables = Exact<{
  postId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
}>;


export type CommentOnPostMutationResult = { __typename?: 'Mutations', commentOnPost?: { __typename?: 'CommentOnPostMutation', comment?: { __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null } | null };

export type CommentOnEventMutationVariables = Exact<{
  eventId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
}>;


export type CommentOnEventMutationResult = { __typename?: 'Mutations', commentOnEvent?: { __typename?: 'CommentOnEventMutation', comment?: { __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null } | null };

export type ReplyOnCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
}>;


export type ReplyOnCommentMutationResult = { __typename?: 'Mutations', replyOnComment?: { __typename?: 'ReplyOnCommentMutation', comment?: { __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null } | null };

export type LikeCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;


export type LikeCommentMutationResult = { __typename?: 'Mutations', likeComment?: { __typename?: 'LikeCommentMutation', success?: boolean | null } | null };

export type UnlikeCommentMutationVariables = Exact<{
  commentId: Scalars['Int']['input'];
}>;


export type UnlikeCommentMutationResult = { __typename?: 'Mutations', unlikeComment?: { __typename?: 'UnlikeCommentMutation', success?: boolean | null } | null };

export type GetChatQueryVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type GetChatQueryResult = { __typename?: 'Queries', chat?: { __typename?: 'ChatType', id?: number | null, kind?: ChatKind | null, groupName?: string | null, lastMessage?: { __typename?: 'ChatMessageType', id?: number | null } | null, members: Array<{ __typename?: 'ChatMemberType', nickname?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null, badge?: UserBadge | null } } | null>, allMembers: Array<{ __typename?: 'ChatMemberType', nickname?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null, badge?: UserBadge | null } } | null> } | null };

export type GetAttachmentUploadQueryVariables = Exact<{
  contentType: Scalars['String']['input'];
}>;


export type GetAttachmentUploadQueryResult = { __typename?: 'Queries', newAttachment?: { __typename?: 'AttachmentType', id?: string | null, upload?: { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> } | null } | null };

export type GetEventQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetEventQueryResult = { __typename?: 'Queries', event?: { __typename?: 'EventType', id?: number | null, title: string, description?: string | null, startTime: any, endTime: any, activity?: ActivityKind | null, skillLevel?: SkillLevel | null, maxParticipants?: number | null, allowSpectators: boolean, acceptedGenders?: any | null, minAge?: number | null, maxAge?: number | null, phase: EventPhase, role?: MemberRole | null, score?: number | null, imageUrl?: string | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number }, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', canMessage?: boolean | null, id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, members: Array<{ __typename?: 'EventMemberType', role?: MemberRole | null, score?: EventRating | null, comment?: string | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }>, posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null };

export type GetAnonymousUserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnonymousUserEventsQueryResult = { __typename?: 'Queries', anonymousUserEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null };

export type GetEventImageUploadQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
  contentType: Scalars['String']['input'];
}>;


export type GetEventImageUploadQueryResult = { __typename?: 'Queries', eventImageUpload?: { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> } | null };

export type GetUnratedEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnratedEventsQueryResult = { __typename?: 'Queries', unratedEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, endTime: any, activity?: ActivityKind | null } | null> | null };

export type GetMyFeedQueryVariables = Exact<{
  start: Scalars['Int']['input'];
  end: Scalars['Int']['input'];
}>;


export type GetMyFeedQueryResult = { __typename?: 'Queries', myFeed?: Array<
    | { __typename: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } }
    | { __typename: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }
   | null> | null };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQueryResult = { __typename?: 'Queries', myProfile?: { __typename?: 'ProfileType', id?: number | null, username: string, email: string, emailVerified?: boolean | null, lastLogin?: any | null, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, followerCount?: number | null, followingCount?: number | null, firstName: string, bio: string, dateOfBirth?: any | null, gender?: Gender | null, privacySettings: Array<{ __typename?: 'PrivacySettingType', setting?: PrivacySetting | null, scope?: PrivacyScope | null }>, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, preferences?: { __typename?: 'UserPreferencesType', preferredSessionDuration?: number | null, organizingOpenness?: OrganizingOpenness | null, leadershipInclination?: number | null, maxTravelDistance?: number | null, weeklyActivityTarget?: number | null, pushesThroughDiscomfort?: number | null, preferredGroupSize?: number | null, acquaintancePreference?: AcquaintancePreference | null, enjoysMeetingNewPeople?: number | null, activityVsSocial?: number | null, motivatedByCompetition?: number | null, planningHorizon?: number | null, feelsLikeBurden?: number | null, participationGroups?: Array<ParticipationGroupKind | null> | null, availabilities?: Array<{ __typename?: 'UserAvailabilityType', dayOfWeek?: DayOfWeek | null, timeOfDay?: TimeOfTheDay | null } | null> | null } | null, preferredActivities?: Array<{ __typename?: 'PreferredActivityType', activity?: ActivityKind | null, skillLevel?: SkillLevel | null } | null> | null } | null };

export type GetAvatarUploadQueryVariables = Exact<{
  contentType: Scalars['String']['input'];
}>;


export type GetAvatarUploadQueryResult = { __typename?: 'Queries', avatarUpload?: { __typename?: 'UploadTicketType', url: string, method: string, headers: Array<{ __typename?: 'HttpHeaderType', name: string, value: string } | null> } | null };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQueryResult = { __typename?: 'Queries', myNotifications?: Array<
    | { __typename?: 'EventNotificationType', id?: number | null, time?: any | null, notificationType?: NotificationKind | null, event?: { __typename?: 'EventType', id?: number | null, title: string } | null }
    | { __typename?: 'UserNotificationType', id?: number | null, time?: any | null, notificationType?: NotificationKind | null, user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, avatarUrl?: string | null, badge?: UserBadge | null } | null }
   | null> | null };

export type SearchItemsQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
  categories?: InputMaybe<Array<InputMaybe<SearchCategory>> | InputMaybe<SearchCategory>>;
}>;


export type SearchItemsQueryResult = { __typename?: 'Queries', search?: Array<
    | { __typename: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } }
    | { __typename: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }
    | { __typename: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }
   | null> | null };

export type GetMyFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFollowersQueryResult = { __typename?: 'Queries', followers?: Array<{ __typename?: 'FollowType', timeCreated: any, user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null } | null> | null };

export type GetMyFollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFollowingQueryResult = { __typename?: 'Queries', following?: Array<{ __typename?: 'FollowType', timeCreated: any, user?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null } | null> | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostQueryResult = { __typename?: 'Queries', post?: { __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null };

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQueryResult = { __typename?: 'Queries', joinedEvents?: Array<{ __typename?: 'EventType', posts: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null }>, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string } } | null } | null> | null };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserByIdQueryResult = { __typename?: 'Queries', user?: { __typename?: 'UserType', id?: number | null, username: string, bio: string, gender?: Gender | null, firstName: string, lastName: string, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, dateOfBirth?: any | null, followerCount?: number | null, followingCount?: number | null, badge?: UserBadge | null, isFollowing?: boolean | null, isFollowedBy?: boolean | null, canMessage?: boolean | null, location?: { __typename?: 'LocationType', city?: string | null, region?: string | null, name?: string | null } | null, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, posts?: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null> | null } | null };

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserByUsernameQueryResult = { __typename?: 'Queries', user?: { __typename?: 'UserType', id?: number | null, username: string, bio: string, gender?: Gender | null, firstName: string, lastName: string, avatarUrl?: string | null, likes?: number | null, dislikes?: number | null, dateOfBirth?: any | null, followerCount?: number | null, followingCount?: number | null, badge?: UserBadge | null, isFollowing?: boolean | null, isFollowedBy?: boolean | null, canMessage?: boolean | null, location?: { __typename?: 'LocationType', city?: string | null, region?: string | null, name?: string | null } | null, attendingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, organizingEvents?: Array<{ __typename?: 'EventType', id?: number | null, title: string, activity?: ActivityKind | null, startTime: any, description?: string | null, participantCount?: number | null, maxParticipants?: number | null, phase: EventPhase, imageUrl?: string | null, organizer?: { __typename?: 'EventMemberType', user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } } | null, location: { __typename?: 'LocationType', name?: string | null, longitude: number, latitude: number } } | null> | null, posts?: Array<{ __typename?: 'PostType', id?: number | null, content: string, imageUrl?: string | null, timePosted: any, likes?: number | null, isLiked?: boolean | null, author?: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } | null, event?: { __typename?: 'CreateEventType', id?: number | null, title: string } | null, comments?: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, hasReplies?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null }, replies: Array<{ __typename?: 'CommentType', id?: number | null, text: string, timePosted: any, likes?: number | null, isLiked?: boolean | null, user: { __typename?: 'UserType', id?: number | null, username: string, firstName: string, lastName: string, badge?: UserBadge | null, avatarUrl?: string | null } }> } | null> | null } | null> | null } | null };

export type ChatMessagesSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type ChatMessagesSubscriptionResult = { __typename?: 'Subscriptions', chatMessages?: Array<{ __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, kind?: string | null, targetUserId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null } | null> | null };

export type LastOpenSubscriptionVariables = Exact<{
  chatId: Scalars['Int']['input'];
}>;


export type LastOpenSubscriptionResult = { __typename?: 'Subscriptions', chatLastOpen?: Array<{ __typename?: 'WSLastOpenType', userId?: number | null, lastOpen?: any | null } | null> | null };

export type MyChatsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MyChatsSubscriptionResult = { __typename?: 'Subscriptions', myChats?: Array<{ __typename?: 'WSMyChatUpdateType', eventType?: string | null, chatId?: number | null, removedUserId?: number | null, lastMessage?: { __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, kind?: string | null, targetUserId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null } | null, chat?: { __typename?: 'WSChatType', id?: number | null, kind?: string | null, groupName?: string | null, timeCreated?: any | null, members?: Array<{ __typename?: 'WSChatMemberType', userId?: number | null, username?: string | null, firstName?: string | null, lastName?: string | null, nickname?: string | null, lastOpen?: any | null, avatarUrl?: string | null, badge?: UserBadge | null } | null> | null, lastMessage?: { __typename?: 'WSChatMessageType', id?: number | null, userId?: number | null, kind?: string | null, targetUserId?: number | null, textContent?: string | null, timeSent?: any | null, attachmentUrl?: string | null } | null } | null, member?: { __typename?: 'WSChatMemberType', userId?: number | null, username?: string | null, firstName?: string | null, lastName?: string | null, nickname?: string | null, lastOpen?: any | null, avatarUrl?: string | null, badge?: UserBadge | null } | null } | null> | null };

export const ChatMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<ChatMessageFragment, unknown>;
export const ChatMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]} as unknown as DocumentNode<ChatMemberFragment, unknown>;
export const ChatFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Chat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMember"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"allMembers"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeFormer"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMember"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]} as unknown as DocumentNode<ChatFragment, unknown>;
export const WsChatMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WSChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WSChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUserId"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<WsChatMessageFragment, unknown>;
export const UserCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserCardFragment, unknown>;
export const EventOrganizerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<EventOrganizerFragment, unknown>;
export const EventMemberFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<EventMemberFragment, unknown>;
export const CommentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<CommentFragment, unknown>;
export const PostCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<PostCardFragment, unknown>;
export const EventFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<EventFragment, unknown>;
export const UploadTicketFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<UploadTicketFragment, unknown>;
export const BasicInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]} as unknown as DocumentNode<BasicInfoFragment, unknown>;
export const UserPreferencesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}}]} as unknown as DocumentNode<UserPreferencesFragment, unknown>;
export const SurveyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}}]} as unknown as DocumentNode<SurveyFragment, unknown>;
export const EventCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<EventCardFragment, unknown>;
export const ContextProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<ContextProfileFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<LoginMutationResult, LoginMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"rememberMe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rememberMe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationResult, SignUpMutationVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogOutMutationResult, LogOutMutationVariables>;
export const ConfirmEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<ConfirmEmailMutationResult, ConfirmEmailMutationVariables>;
export const ResendVerificationCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendVerificationCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendVerificationCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResendVerificationCodeMutationResult, ResendVerificationCodeMutationVariables>;
export const CreateGroupChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroupChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupChatMutationResult, CreateGroupChatMutationVariables>;
export const CreateDirectChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDirectChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDirectChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateDirectChatMutationResult, CreateDirectChatMutationVariables>;
export const SetChatNicknameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetChatNickname"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setChatNickname"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMember"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SetChatNicknameMutationResult, SetChatNicknameMutationVariables>;
export const AddChatMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddChatMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addChatMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddChatMemberMutationResult, AddChatMemberMutationVariables>;
export const LeaveChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LeaveChatMutationResult, LeaveChatMutationVariables>;
export const MarkChatReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkChatRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markChatRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]}}]} as unknown as DocumentNode<MarkChatReadMutationResult, MarkChatReadMutationVariables>;
export const SendChatMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChatMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendChatMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"Argument","name":{"kind":"Name","value":"attachmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attachmentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<SendChatMessageMutationResult, SendChatMessageMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationAddressLine1"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationAddressLine2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationCountryCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CountryCode"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationRegion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationZipCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationLatitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationLongitude"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivityKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skillLevel"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SkillLevel"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowSpectators"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAge"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxAge"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acceptedGenders"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenderNoPNTS"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"withPicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationName"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationAddressLine1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationAddressLine1"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationAddressLine2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationAddressLine2"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationCountryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationCountryCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationRegion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationRegion"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationZipCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationZipCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationLatitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationLatitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"locationLongitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationLongitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"activity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activity"}}},{"kind":"Argument","name":{"kind":"Name","value":"skillLevel"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skillLevel"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxParticipants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowSpectators"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowSpectators"}}},{"kind":"Argument","name":{"kind":"Name","value":"minAge"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAge"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxAge"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxAge"}}},{"kind":"Argument","name":{"kind":"Name","value":"acceptedGenders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acceptedGenders"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"withPicture"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UploadTicket"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutationResult, CreateEventMutationVariables>;
export const JoinEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<JoinEventMutationResult, JoinEventMutationVariables>;
export const LeaveEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<LeaveEventMutationResult, LeaveEventMutationVariables>;
export const AlterEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"startTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"endTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxParticipants"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxParticipants"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<AlterEventMutationResult, AlterEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutationResult, DeleteEventMutationVariables>;
export const FinishEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<FinishEventMutationResult, FinishEventMutationVariables>;
export const CancelEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<CancelEventMutationResult, CancelEventMutationVariables>;
export const RateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"score"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventRating"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"score"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<RateEventMutationResult, RateEventMutationVariables>;
export const AlterLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterProfileLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"latitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"latitude"}}},{"kind":"Argument","name":{"kind":"Name","value":"longitude"},"value":{"kind":"Variable","name":{"kind":"Name","value":"longitude"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AlterLocationMutationResult, AlterLocationMutationVariables>;
export const AlterProfileBasicInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterProfileBasicInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gender"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Gender"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterBasicInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateOfBirth"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateOfBirth"}}},{"kind":"Argument","name":{"kind":"Name","value":"gender"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gender"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<AlterProfileBasicInfoMutationResult, AlterProfileBasicInfoMutationVariables>;
export const AlterProfileSurveyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterProfileSurveyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredActivities"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreferredActivityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredSessionDuration"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizingOpenness"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrganizingOpenness"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leadershipInclination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"availabilities"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AvailabilityInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxTravelDistance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weeklyActivityTarget"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"preferredGroupSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participationGroups"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ParticipationGroupKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acquaintancePreference"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AcquaintancePreference"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activityVsSocial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"motivatedByCompetition"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planningHorizon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feelsLikeBurden"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterSurveyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"preferredActivities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredActivities"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredSessionDuration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredSessionDuration"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizingOpenness"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizingOpenness"}}},{"kind":"Argument","name":{"kind":"Name","value":"leadershipInclination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leadershipInclination"}}},{"kind":"Argument","name":{"kind":"Name","value":"availabilities"},"value":{"kind":"Variable","name":{"kind":"Name","value":"availabilities"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxTravelDistance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxTravelDistance"}}},{"kind":"Argument","name":{"kind":"Name","value":"weeklyActivityTarget"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weeklyActivityTarget"}}},{"kind":"Argument","name":{"kind":"Name","value":"pushesThroughDiscomfort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pushesThroughDiscomfort"}}},{"kind":"Argument","name":{"kind":"Name","value":"preferredGroupSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"preferredGroupSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"participationGroups"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participationGroups"}}},{"kind":"Argument","name":{"kind":"Name","value":"acquaintancePreference"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acquaintancePreference"}}},{"kind":"Argument","name":{"kind":"Name","value":"enjoysMeetingNewPeople"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}}},{"kind":"Argument","name":{"kind":"Name","value":"activityVsSocial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activityVsSocial"}}},{"kind":"Argument","name":{"kind":"Name","value":"motivatedByCompetition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"motivatedByCompetition"}}},{"kind":"Argument","name":{"kind":"Name","value":"planningHorizon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planningHorizon"}}},{"kind":"Argument","name":{"kind":"Name","value":"feelsLikeBurden"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feelsLikeBurden"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<AlterProfileSurveyInfoMutationResult, AlterProfileSurveyInfoMutationVariables>;
export const AlterAllPrivacySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterAllPrivacySettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scope"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrivacyScope"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterAllPrivacySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"scope"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scope"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AlterAllPrivacySettingsMutationResult, AlterAllPrivacySettingsMutationVariables>;
export const AlterPrivacySettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AlterPrivacySetting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"setting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrivacySetting"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scope"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PrivacyScope"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alterPrivacySetting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"setting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"setting"}}},{"kind":"Argument","name":{"kind":"Name","value":"scope"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scope"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privacySetting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}}]}}]}}]} as unknown as DocumentNode<AlterPrivacySettingMutationResult, AlterPrivacySettingMutationVariables>;
export const DeleteAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteAccountMutationResult, DeleteAccountMutationVariables>;
export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeCreated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<FollowUserMutationResult, FollowUserMutationVariables>;
export const UnfollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnfollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnfollowUserMutationResult, UnfollowUserMutationVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"withPicture"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"withPicture"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UploadTicket"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutationResult, CreatePostMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LikePostMutationResult, LikePostMutationVariables>;
export const UnlikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnlikePostMutationResult, UnlikePostMutationVariables>;
export const CommentOnPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommentOnPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentOnPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<CommentOnPostMutationResult, CommentOnPostMutationVariables>;
export const CommentOnEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommentOnEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentOnEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<CommentOnEventMutationResult, CommentOnEventMutationVariables>;
export const ReplyOnCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReplyOnComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replyOnComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<ReplyOnCommentMutationResult, ReplyOnCommentMutationVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LikeCommentMutationResult, LikeCommentMutationVariables>;
export const UnlikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnlikeCommentMutationResult, UnlikeCommentMutationVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"allMembers"},"name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"includeFormer"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQueryResult, GetChatQueryVariables>;
export const GetAttachmentUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAttachmentUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newAttachment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"upload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UploadTicket"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetAttachmentUploadQueryResult, GetAttachmentUploadQueryVariables>;
export const GetEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventOrganizer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventMember"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventMemberType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"allowSpectators"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedGenders"}},{"kind":"Field","name":{"kind":"Name","value":"minAge"}},{"kind":"Field","name":{"kind":"Name","value":"maxAge"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventOrganizer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventMember"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<GetEventQueryResult, GetEventQueryVariables>;
export const GetAnonymousUserEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAnonymousUserEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anonymousUserEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]} as unknown as DocumentNode<GetAnonymousUserEventsQueryResult, GetAnonymousUserEventsQueryVariables>;
export const GetEventImageUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventImageUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventImageUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UploadTicket"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetEventImageUploadQueryResult, GetEventImageUploadQueryVariables>;
export const GetUnratedEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnratedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unratedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}}]}}]}}]} as unknown as DocumentNode<GetUnratedEventsQueryResult, GetUnratedEventsQueryVariables>;
export const GetMyFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<GetMyFeedQueryResult, GetMyFeedQueryVariables>;
export const GetMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContextProfile"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreferences"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserPreferencesType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferredSessionDuration"}},{"kind":"Field","name":{"kind":"Name","value":"organizingOpenness"}},{"kind":"Field","name":{"kind":"Name","value":"leadershipInclination"}},{"kind":"Field","name":{"kind":"Name","value":"maxTravelDistance"}},{"kind":"Field","name":{"kind":"Name","value":"weeklyActivityTarget"}},{"kind":"Field","name":{"kind":"Name","value":"pushesThroughDiscomfort"}},{"kind":"Field","name":{"kind":"Name","value":"preferredGroupSize"}},{"kind":"Field","name":{"kind":"Name","value":"acquaintancePreference"}},{"kind":"Field","name":{"kind":"Name","value":"enjoysMeetingNewPeople"}},{"kind":"Field","name":{"kind":"Name","value":"activityVsSocial"}},{"kind":"Field","name":{"kind":"Name","value":"motivatedByCompetition"}},{"kind":"Field","name":{"kind":"Name","value":"planningHorizon"}},{"kind":"Field","name":{"kind":"Name","value":"feelsLikeBurden"}},{"kind":"Field","name":{"kind":"Name","value":"participationGroups"}},{"kind":"Field","name":{"kind":"Name","value":"availabilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"timeOfDay"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Survey"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preferences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreferences"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preferredActivities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"skillLevel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContextProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProfileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicInfo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Survey"}},{"kind":"Field","name":{"kind":"Name","value":"privacySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}}]}}]} as unknown as DocumentNode<GetMyProfileQueryResult, GetMyProfileQueryVariables>;
export const GetAvatarUploadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAvatarUpload"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUpload"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contentType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contentType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UploadTicket"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UploadTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UploadTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"headers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetAvatarUploadQueryResult, GetAvatarUploadQueryVariables>;
export const GetNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lastFetch"},"value":{"kind":"StringValue","value":"1971-01-01","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"notificationType"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserNotificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventNotificationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetNotificationsQueryResult, GetNotificationsQueryVariables>;
export const SearchItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchCategory"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}},{"kind":"Argument","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<SearchItemsQueryResult, SearchItemsQueryVariables>;
export const GetMyFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeCreated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<GetMyFollowersQueryResult, GetMyFollowersQueryVariables>;
export const GetMyFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyFollowing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeCreated"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<GetMyFollowingQueryResult, GetMyFollowingQueryVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<GetPostQueryResult, GetPostQueryVariables>;
export const GetFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinedEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}}]} as unknown as DocumentNode<GetFeedQueryResult, GetFeedQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQueryResult, GetUserByIdQueryVariables>;
export const GetUserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"activity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"hasReplies"}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PostType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timePosted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"end"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"}},{"kind":"Field","name":{"kind":"Name","value":"canMessage"}},{"kind":"Field","name":{"kind":"Name","value":"attendingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizingEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventCard"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostCard"}}]}}]}}]} as unknown as DocumentNode<GetUserByUsernameQueryResult, GetUserByUsernameQueryVariables>;
export const ChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WSChatMessage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WSChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WSChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUserId"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<ChatMessagesSubscriptionResult, ChatMessagesSubscriptionVariables>;
export const LastOpenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LastOpen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatLastOpen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}}]}}]}}]} as unknown as DocumentNode<LastOpenSubscriptionResult, LastOpenSubscriptionVariables>;
export const MyChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MyChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WSChatMessage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"timeCreated"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WSChatMessage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"lastOpen"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"badge"}}]}},{"kind":"Field","name":{"kind":"Name","value":"removedUserId"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WSChatMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WSChatMessageType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"targetUserId"}},{"kind":"Field","name":{"kind":"Name","value":"textContent"}},{"kind":"Field","name":{"kind":"Name","value":"timeSent"}},{"kind":"Field","name":{"kind":"Name","value":"attachmentUrl"}}]}}]} as unknown as DocumentNode<MyChatsSubscriptionResult, MyChatsSubscriptionVariables>;