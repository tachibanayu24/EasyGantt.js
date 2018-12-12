let task = [
  // 1日目
  [
    // 1日目のタスクその1
    {
      name: "勉強会",
      startTime: 1000,
      endTime: 1045,
      category: "event"
    },
    // 1日目のタスクその2
    {
      name: "企画会議",
      startTime: 1300,
      endTime: 1340,
      category: "meeting"
    },
    // 1日目のタスクその3
    {
      name: "アプリ開発",
      startTime: 1400,
      endTime: 1730,
      category: "dev"
    },
    // 1日目のタスクその4
    {
      name: "クラウド研修応募締切",
      startTime: 1500,
      endTime: 1500,
      category: "milestone"
    },
    // 1日目のタスクその5
    {
      name: "課長不在",
      startTime: 1300,
      endTime: 1730,
      category: "absence"
    },
    // 1日目のタスクその6 時系列順である必要はありません
    {
      name: "ビジュアルコミュニケーションセミナー",
      startTime: 1100,
      endTime: 1200,
      category: "lecture"
    },
    // 1日目のタスクその7
    {
      name: "部のランチ会",
      startTime: 1200,
      endTime: 1300,
      category: "other"
    },
  ],
  // 2日目 タスクがない場合は配列はからのまま
  [],
  // 3日目
  [
    {
      name: "品川出張",
      startTime: 1100,
      endTime: 1730,
      category: "other"
    },
    {
      name: "A社と打ち合わせ",
      startTime: 1300,
      endTime: 1500,
      category: "meeting"
    },
    {
      name: "提案書締切",
      startTime: 1700,
      endTime: 1700,
      category: "milestone"
    }
  ]
]