import postcardDefaults from './postcardContent.json'

const homeContent = {
  zh: {
    name: '路晨曦',
    heroBadge: '个人展示',
    heroHeadline: '走在探索世界的路上',
    heroDescription: '我是一名海南大学本科生，聚焦国际联络、流程优化与跨文化项目执行，用设计思维推进组织协同与内容表达。',
    ctaPrimary: '查看简历',
    ctaSecondary: '联系我',
    profileLabel: '个人简介',
    profileTagline: '协作型行动者，擅长将复杂展览流程、对外交接与校园项目转化为可执行方案。',
    education: '海南大学 · 学士（在读）',
    contact: {
      email: 'chenxi_lu@qq.com',
      phone: '18589573791',
      location: '海南，中国',
    },
    labels: {
      email: '邮箱',
      phone: '电话',
      location: '地点',
      school: '学校',
    },
    stats: [
      { label: '民族', value: '汉族' },
      { label: '出生', value: '2005年4月' },
      { label: '学校', value: '海南大学' },
      { label: '学位', value: '学士（在读）' },
    ],
    cards: [
      { title: '国际联络实习', text: '在海南国际经发局国际联络部，支撑加拿大、爱尔兰、捷克、瑞士等国嘉宾的接待与沟通工作。', detail: '2026.02-2026.04             海南国际经济发展局                    国际联络处实践生 \n项目简介：由于消博会各展馆展位讲解内容冗长、巡馆动线复杂，且外宾接待涉及多使领馆协调，传统静态文案无法满足政要巡馆的即时性与精准性要求。基于上述需要，在海南国际经济发展局国际联络处实践期间，负责展馆讲解词与巡馆方案的优化。积累了问题解决、流程优化与跨部门协作的实战经验。 \n职责描述： \n展馆讲解词撰写与优化:  负责第六届消博会主宾国（加拿大）及意大利、瑞士、韩国等重要国家馆的展馆介绍文案撰写，突出各国展团亮点与首发新品。参与巡馆方案设计，根据领导层级与巡馆动线，将展馆介绍浓缩为简洁、生动的解说词，确保政要巡馆流程顺畅、信息精准。 \n外宾联络与接待支持:  协助对接加拿大、爱尔兰、捷克、瑞士、以色列、泰国等多国驻华使领馆及贸易部长级代表团，参与拟邀请人员名单整理、接待函件起草及证件信息整合制作。跟进主宾国加拿大相关活动，包括开馆仪式、美食节、新品发布会等，协助保障外方代表团在琼行程。' },
      { title: '跨文化活动', text: '联合发起 THRIC 2026 国际明信片项目，助力中爱跨文化传播与纪念品落地。', detail: '2025.11-2026.03      THRIC 2026  国际明信片项目            学生协创人 \n项目简介：本专业缺乏由学生自主发起、跨越课堂边界的真实跨文化创作与实物落地项目。且与爱尔兰都柏林理工大学无太多交流，与教师共同发起THRIC 2026 国际明信片项目。 \n职责描述：作为学生协创人，协助教师完成活动整体策划与落地执行，该活动为爱尔兰举办的THRIC 2026 国际会议重要组成部分。负责活动协调与中爱双方沟通，推动最佳设计量产为纪念帆布包，分发给全体同学并作为之后举办活动赠予中外嘉宾的纪念品，实现跨文化合作成果落地。' },
      { title: '校友会创办', text: '发起 HD-ICE 校友协会，设计品牌徽标并规划可持续的校友联系与职业支持网络。', detail: ' 项目简介：HD-ICE  项目自创办以来从未有过正式的校友组织，毕业生之间、毕业生与在校生之间缺少稳定的联络渠道和职业互助平台。我们将从零发起首个校友会，计划在  2026  届毕业典礼上正式推出，致力于搭建一个连接校友、赋能职业、延续情谊的可持续社区。 \n职责描述：作为联合创始人之一，参与筹备  HD-ICE  项目首个校友会，负责在毕业典礼上首次推出校友会概念与初步规划。负责活动主视觉设计与品牌形象统筹，独立完成校友会徽章设计（含磁吸方案）。协调设计落地，应用于现场物料、数字宣传及纪念品。规划校友数据库初步架构，并设计针对应届毕业生的联络问卷，用于收集首批会员信息与参与意愿。' },
    ],
    sections: {
      resume: { label: '精选经历', title: '近期项目与实习', cta: '发邮件联系' },
      summary: { label: '自我评价', title: '', text: '跨境协作、内容优化与流程执行是我的核心能力；我善于倾听、梳理信息，并将复杂目标转化为清晰落地方案。' },
      tools: { label: '工具与能力', title: '', items: ['CET-4 / CET-6', 'IELTS 7.0', 'ChatGPT / LLMs', 'Midjourney / Doubao', 'Canva / 剪映'] },
    },
    experience: [
      { period: '2026年2月 – 2026年4月', role: '国际联络部实习生', company: '海南省国际经济发展局', location: '海南，中国', description: '优化 CICPE 展会脚本与路线，协助加拿大、意大利、瑞士、韩国等国嘉宾接待，参与邀请函与证明材料整理，提高现场接待与沟通效率。', detail: '2026.02-2026.04             海南国际经济发展局                    国际联络处实践生 \n项目简介：由于消博会各展馆展位讲解内容冗长、巡馆动线复杂，且外宾接待涉及多使领馆协调，传统静态文案无法满足政要巡馆的即时性与精准性要求。基于上述需要，在海南国际经济发展局国际联络处实践期间，负责展馆讲解词与巡馆方案的优化。积累了问题解决、流程优化与跨部门协作的实战经验。 \n职责描述： \n展馆讲解词撰写与优化:  负责第六届消博会主宾国（加拿大）及意大利、瑞士、韩国等重要国家馆的展馆介绍文案撰写，突出各国展团亮点与首发新品。参与巡馆方案设计，根据领导层级与巡馆动线，将展馆介绍浓缩为简洁、生动的解说词，确保政要巡馆流程顺畅、信息精准。 \n外宾联络与接待支持:  协助对接加拿大、爱尔兰、捷克、瑞士、以色列、泰国等多国驻华使领馆及贸易部长级代表团，参与拟邀请人员名单整理、接待函件起草及证件信息整合制作。跟进主宾国加拿大相关活动，包括开馆仪式、美食节、新品发布会等，协助保障外方代表团在琼行程。' },
      { period: '2025年9月 – 至今', role: '学生助理', company: '海南大学 – 都柏林理工联合项目', location: '海南，中国', description: '协助 7 名国际教师管理 12 门本科课程，处理教学材料、课程协调与学生平台支持，保障学生教学流程顺利。', detail: '025.09 至今                    海南大学  –  都柏林理工大学联合项目                  学生助理 \n职责描述：协助7 位外教管理12 门本科课程（共90 名学生），负责课程协调、材料准备及Brightspace 平台支持；组织跨文化活动（圣帕特里克节），完成行政事务（打印整理课堂材料、更新分组名单、预订酒店等），减少外教非教学事务负担，保障90 名学生课程运行顺畅。' },
      { period: '2025年11月 – 2026年3月', role: '学生联合创作人', company: 'THRIC 2026 国际明信片项目', location: '爱尔兰 / 中国', description: '参与中爱跨文化项目规划与执行，负责活动统筹、设计落地与纪念品生产，实现学生成果展示。', detail: '2025.11-2026.03      THRIC 2026  国际明信片项目            学生协创人 \n项目简介：本专业缺乏由学生自主发起、跨越课堂边界的真实跨文化创作与实物落地项目。且与爱尔兰都柏林理工大学无太多交流，与教师共同发起THRIC 2026 国际明信片项目。 \n职责描述：作为学生协创人，协助教师完成活动整体策划与落地执行，该活动为爱尔兰举办的THRIC 2026 国际会议重要组成部分。负责活动协调与中爱双方沟通，推动最佳设计量产为纪念帆布包，分发给全体同学并作为之后举办活动赠予中外嘉宾的纪念品，实现跨文化合作成果落地。' },
      { period: '2026年3月 – 至今', role: '联合创始人 / 发起人', company: 'HD-ICE 校友会', location: '海南大学', description: '发起 HD-ICE 校友会，负责品牌视觉、活动材料与校友数据库规划，搭建可持续的校友支持平台。', detail: '2026.03 至今          HD-ICE  校友会              联合创始人/学生发起人 \n项目简介：HD-ICE  项目自创办以来从未有过正式的校友组织，毕业生之间、毕业生与在校生之间缺少稳定的联络渠道和职业互助平台。我们将从零发起首个校友会，计划在  2026  届毕业典礼上正式推出，致力于搭建一个连接校友、赋能职业、延续情谊的可持续社区。 \n职责描述：作为联合创始人之一，参与筹备  HD-ICE  项目首个校友会，负责在毕业典礼上首次推出校友会概念与初步规划。负责活动主视觉设计与品牌形象统筹，独立完成校友会徽章设计（含磁吸方案）。协调设计落地，应用于现场物料、数字宣传及纪念品。规划校友数据库初步架构，并设计针对应届毕业生的联络问卷，用于收集首批会员信息与参与意愿。' },
    ],
    controls: {
      edit: '编辑模式',
      editing: '关闭编辑',
      editPanelTitle: '页面内编辑',
      editPanelSubtitle: '实时更新页面内容',
      labels: { headline: '首页主标题', description: '首页描述', profilePhoto: '上传头像' },
    },
  },
  en: {
    name: 'Chenxi Lu',
    heroBadge: 'Portfolio',
    heroHeadline: 'Walking the beautiful path of discovery',
    heroDescription: 'I am a Hainan University undergraduate studying Exhibition Economics & Management, focused on international liaison, process optimization, and cross-cultural project delivery.',
    ctaPrimary: 'View Resume',
    ctaSecondary: 'Contact Me',
    profileLabel: 'Profile',
    profileTagline: 'I study Exhibition Economics & Management at Hainan University. Core courses include Digital Marketing, Principles of Management, Probability & Statistics, Project Management, Tourism Consumer Behavior, Microeconomics, Management Accounting, Linear Algebra, Event/Leisure/Tourism Enterprise Development, Event Risk Management, and Finance.',
    education: 'Hainan University · Exhibition Economics & Management (Sep 2023 – Present)',
    contact: {
      email: 'chenxi_lu@qq.com',
      phone: '18589573791',
      location: 'Hainan, China',
    },
    labels: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      school: 'School',
    },
    stats: [
      { label: 'Ethnicity', value: 'Han' },
      { label: 'DOB', value: 'April 2005' },
      { label: 'University', value: 'Hainan University' },
      { label: 'Degree', value: 'Bachelor' },
    ],
    cards: [
      { title: 'International Liaison', text: 'Optimized exhibition scripts and VIP routes for CICPE, coordinating embassy logistics and reception support for senior foreign guests.', detail: 'Feb  2026  –  Apr  2026|  Hainan  International  Economic  Development  Bureau|  International Liaison Department Trainee   \nProject Background：Due to the lengthy exhibition scripts, complex routes, and the need to coordinate multiple embassies/consulates for foreign VIP receptions at CICPE, static materials could not meet the demands of real-time accuracy during guests\' visit. Gained hands-on experience in problem-solving, process  optimization,  and  cross-departmental  coordination  while  optimizing  exhibition  scripts  and route plans. \nResponsibilities： \nWriting & Optimizing Exhibition Scripts: Responsible for drafting exhibition scripts for pavilions of Canada, the Guest Country of Honor and Italy, Switzerland, Korea, etc., highlighting key exhibits and  new  product  launches.  Participated  in  tour  route  design,  condensing  exhibition  information  into concise, lively scripts tailored to leadership levels and tour sequences to ensure smooth VIP tours and accurate messaging. \nLiaison & Reception Support for Foreign Guests: Assisted in connecting with embassies/consulates and  trade  minister-level  delegations  from  Canada,  Ireland,  Czech  Republic,  Switzerland,  Israel, Thailand,  etc.  Participated  in  drafting  invitation  lists,  composing  official  letters,  and  consolidating credential information. Supported Canada, the Guest Country of Honor, in its related events, including the  pavilion  opening  ceremony,  food  festival,  new  product  launches,  and  assisted  with  delegation logistics in Hainan.' },
      { title: 'Cultural Project', text: 'Co-launched the THRIC 2026 International Postcard Project, bringing cross-cultural art to production and event gifts.', detail: 'Sep 2025 – Present| Hainan University – TU Dublin Joint Program| Student Assistant \nResponsibilities：Assisted 7 international faculty members in managing 12 undergraduate courses (90 students total), handling course coordination, materials preparation, and Brightspace platform support. Organized cross-cultural events (St. Patrick\'s Day). Managed administrative tasks (printing and sorting out class materials, updating group lists, hotel bookings, etc.), reducing non-teaching burdens on faculty and ensuring smooth course operations for 90 students.' },
      { title: 'Alumni Initiative', text: 'Launched the first HD-ICE alumni association, creating a sustainable network for graduates and current students.', detail: 'Mar 2026 – Present| HD-ICE Alumni Association| Co-Founder / Student Initiator \nProject Background: The HD-ICE program has never had a formal alumni organization. Graduates lacked stable connections with each other and with current students, and a career support platform. We are launching the first alumni association from scratch, planning a formal debut at the 2026 graduation ceremony, aiming to build a sustainable community connecting alumni, empowering careers, and preserving relationships. \nResponsibilities ：As a co-founder, involved in preparing the first HD-ICE alumni association. Responsible for introducing the concept and initial plans at the graduation ceremony. Led the visual identity and brand coordination, independently designing the alumni association badge (including a magnetic version). Coordinated design production for on-site materials, digital promotion, and souvenirs. Planned the initial alumni database structure and designed a contact questionnaire targeting graduating students to collect initial member information and interest.' },
    ],
    sections: {
      resume: { label: 'Featured Work', title: 'Recent Experience', cta: 'Send an Email' },
      summary: { label: 'Self Evaluation', title: 'Self-Evaluation', text: 'In internships, student assistant roles, and cross-cultural projects, I have repeatedly taken on responsibilities in coordination, documentation optimization, and end-to-end execution. Highly responsible and results-driven. Skilled in cross-cultural communication and teamwork. Detail-oriented, patient, and good at analyzing and solving complex problems. Quick to adapt to new environments and systems. Continuously seeking to optimize workflows.' },
      tools: { label: 'Skills & Tools', title: 'Capabilities', items: ['Languages: CET-4/6, IELTS 7.0 – strong listening, speaking, reading, and writing skills; able to quickly read English professional documents and books.', 'AI Tools: Proficient in ChatGPT and other LLMs for drafting, information synthesis, and translation; using Midjourney / Doubao for brand visual concept ideation.', 'Other Tools: Canva, CapCut, Keling AI.'] },
    },
    experience: [
      { period: 'Feb 2026 – Apr 2026', role: 'International Liaison Department Trainee', company: 'Hainan International Economic Development Bureau', location: 'Hainan, China', description: 'Optimized CICPE exhibition scripts and routes, supported embassy coordination and VIP reception logistics, and improved real-time accuracy for international guests.', detail: 'Feb  2026  –  Apr  2026|  Hainan  International  Economic  Development  Bureau|  International Liaison Department Trainee   \nProject Background：Due to the lengthy exhibition scripts, complex routes, and the need to coordinate multiple embassies/consulates for foreign VIP receptions at CICPE, static materials could not meet the demands of real-time accuracy during guests\' visit. Gained hands-on experience in problem-solving, process  optimization,  and  cross-departmental  coordination  while  optimizing  exhibition  scripts  and route plans. \nResponsibilities： \nWriting & Optimizing Exhibition Scripts: Responsible for drafting exhibition scripts for pavilions of Canada, the Guest Country of Honor and Italy, Switzerland, Korea, etc., highlighting key exhibits and  new  product  launches.  Participated  in  tour  route  design,  condensing  exhibition  information  into concise, lively scripts tailored to leadership levels and tour sequences to ensure smooth VIP tours and accurate messaging. \nLiaison & Reception Support for Foreign Guests: Assisted in connecting with embassies/consulates and  trade  minister-level  delegations  from  Canada,  Ireland,  Czech  Republic,  Switzerland,  Israel, Thailand,  etc.  Participated  in  drafting  invitation  lists,  composing  official  letters,  and  consolidating credential information. Supported Canada, the Guest Country of Honor, in its related events, including the  pavilion  opening  ceremony,  food  festival,  new  product  launches,  and  assisted  with  delegation logistics in Hainan.' },
      { period: 'Sep 2025 – Present', role: 'Student Assistant', company: 'Hainan University – TU Dublin Joint Program', location: 'Hainan, China', description: 'Assisted 7 international faculty members in managing 12 undergraduate courses (90 students total), handling course coordination, materials preparation, and Brightspace platform support.', detail: 'Sep 2025 – Present| Hainan University – TU Dublin Joint Program| Student Assistant \nResponsibilities：Assisted 7 international faculty members in managing 12 undergraduate courses (90 students total), handling course coordination, materials preparation, and Brightspace platform support. Organized cross-cultural events (St. Patrick\'s Day). Managed administrative tasks (printing and sorting out class materials, updating group lists, hotel bookings, etc.), reducing non-teaching burdens on faculty and ensuring smooth course operations for 90 students.' },
      { period: 'Nov 2025 – Mar 2026', role: 'Student Co-Creator', company: 'THRIC 2026 International Postcard Project', location: 'Ireland / China', description: 'As student co-creator, assisted faculty with overall planning and execution of a cross-cultural project, coordinating China-Ireland communications and commemorative product production.', detail: 'Nov 2025 – Mar 2026| THRIC 2026 International Postcard Project| Student Co-Creator \nProject Background: The program lacked student-initiated, real cross-cultural creative projects with tangible outputs. Moreover, there was limited interaction with TU Dublin. Co-launched the THRIC 2026 International Postcard Project with the faculty. \nResponsibilities：As student co-creator, assisted the faculty with overall planning and execution. The project was a key component of the THRIC 2026 international conference held in Ireland. Responsible for activity coordination and cross-cultural communication (China-Ireland). Helped bring the best design into mass production as commemorative canvas bags, distributed to all students and later used as gifts for Chinese and international guests, and achieved a tangible cross-cultural outcome.' },
      { period: 'Mar 2026 – Present', role: 'Co-Founder / Student Initiator', company: 'HD-ICE Alumni Association', location: 'Hainan University', description: 'As co-founder, led visual identity and brand coordination for HD-ICE alumni association, planned alumni database architecture, and designed graduate contact questionnaires.', detail: 'Mar 2026 – Present| HD-ICE Alumni Association| Co-Founder / Student Initiator \nProject Background: The HD-ICE program has never had a formal alumni organization. Graduates lacked stable connections with each other and with current students, and a career support platform. We are launching the first alumni association from scratch, planning a formal debut at the 2026 graduation ceremony, aiming to build a sustainable community connecting alumni, empowering careers, and preserving relationships. \nResponsibilities ：As a co-founder, involved in preparing the first HD-ICE alumni association. Responsible for introducing the concept and initial plans at the graduation ceremony. Led the visual identity and brand coordination, independently designing the alumni association badge (including a magnetic version). Coordinated design production for on-site materials, digital promotion, and souvenirs. Planned the initial alumni database structure and designed a contact questionnaire targeting graduating students to collect initial member information and interest.' },
    ],
    controls: {
      edit: 'Edit Mode',
      editing: 'Close Edit',
      editPanelTitle: 'Inline Editing',
      editPanelSubtitle: 'Update the homepage content live',
      labels: { headline: 'Hero Headline', description: 'Hero Description', profilePhoto: 'Upload Photo' },
    },
  },
}

export default homeContent