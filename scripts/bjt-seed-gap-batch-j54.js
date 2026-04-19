const fs = require('fs');
const path = require('path');

const TARGET = path.join(
  'docs',
  'bjt',
  'document',
  'partitioned',
  'legacy_runtime_practice_questions.json'
);

const NEW_ITEMS = [
  {
    id: 'j5_phone_007',
    level: 'J5',
    skill: 'listening',
    difficulty: 'basic',
    title: '電話メモの確認 (J5)',
    situation:
      '先輩から電話の伝言を受けました。内容は「田中様から13時に折り返し電話がほしい。担当は佐藤さん宛て」です。',
    prompt: 'あなたが最初に行うべきことはどれですか？',
    options: [
      '佐藤さんに伝言内容を正確に伝える',
      '田中様へすぐ自分で謝罪メールを送る',
      '13時を過ぎるまで何もしない',
      '伝言を削除して後で思い出す',
    ],
    correctIndex: 0,
    explanation:
      '伝言は担当者（佐藤さん）への連絡依頼なので、まず内容を正確に引き継ぐのが最優先です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j5_reporting_007',
    level: 'J5',
    skill: 'reading',
    difficulty: 'basic',
    title: '日次報告の期限 (J5)',
    situation: '社内ルール: 「日次報告は毎日17:00までに提出。遅れる場合は16:30までに上司へ連絡。」',
    prompt: '16:40時点で報告が間に合わないと分かった場合、適切な行動はどれですか？',
    options: [
      'すぐ上司に遅延連絡を入れ、可能な提出時刻を伝える',
      '17:00を過ぎてから黙って提出する',
      '翌日にまとめて2日分を提出する',
      '同僚の報告をコピーして提出する',
    ],
    correctIndex: 0,
    explanation:
      '遅延が見えた時点で上司連絡が必要です。ルール上は16:30までですが、遅れに気付いたら即連絡して影響を最小化します。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j5_compliance_007',
    level: 'J5',
    skill: 'reading',
    difficulty: 'basic',
    title: '個人情報の取り扱い (J5)',
    situation: '社内通知: 「顧客の氏名・電話番号は個人情報。社外チャットへ転送禁止。必要時は社内承認を得ること。」',
    prompt: '取引先に急ぎで共有したいと言われたとき、正しい対応はどれですか？',
    options: [
      '上司承認を取ったうえで、許可された方法で共有する',
      '急ぎなので個人チャットでそのまま送る',
      'SNSのDMで先に送ってから報告する',
      '顧客情報を加工せずに全件転送する',
    ],
    correctIndex: 0,
    explanation:
      '個人情報は承認と所定手順が必要です。急ぎでも無承認共有はコンプライアンス違反になります。Can xu ly dung pham vi tham quyen theo vai tro duoc giao.',
  },
  {
    id: 'j5_legal_007',
    level: 'J5',
    skill: 'reading',
    difficulty: 'basic',
    title: '契約書ドラフト送付前確認 (J5)',
    situation: 'チームルール: 「契約書ドラフトは法務確認後に外部送付。未確認版の送付禁止。」',
    prompt: '営業担当として最も適切な行動はどれですか？',
    options: [
      '法務確認完了を待ってから先方へ送付する',
      '先方が急ぐので未確認版を先に送る',
      '口頭合意があるので確認を省略する',
      '社内承認なしで条文を変更して送る',
    ],
    correctIndex: 0,
    explanation:
      '法務確認前の外部送付は禁止です。期限が厳しい場合も、確認プロセスを飛ばさず進める必要があります。Can xu ly dung pham vi tham quyen theo vai tro duoc giao.',
  },
  {
    id: 'j5_finance_007',
    level: 'J5',
    skill: 'reading',
    difficulty: 'basic',
    title: '経費精算の証憑不備 (J5)',
    situation:
      '経理ルール: 「領収書の宛名・日付・金額が不備の場合は差し戻し。締切は毎月25日17:00。」',
    prompt: '25日16:20に領収書の日付が欠けていることに気づいた場合の対応はどれですか？',
    options: [
      'すぐ修正可能か確認し、間に合わない場合は経理へ事前相談する',
      '不備のまま提出し、後で説明する',
      '日付を推測して自分で書き足す',
      '提出をやめて翌月にまとめる',
    ],
    correctIndex: 0,
    explanation:
      '証憑不備は差し戻し対象です。締切前に修正可否確認と事前相談を行うのが実務的に正しい対応です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j5_incident_007',
    level: 'J5',
    skill: 'listening',
    difficulty: 'basic',
    title: '軽微な障害の一次報告 (J5)',
    situation:
      '朝会で「印刷システムが10分停止。現在は復旧。原因は調査中。まず上司へ一次報告を入れて」と指示されました。',
    prompt: '最初の行動として適切なのはどれですか？',
    options: [
      '上司へ停止時間・復旧状況・調査中である点を簡潔に報告する',
      '原因が確定するまで報告を待つ',
      '社外に障害情報を先に公開する',
      '復旧したので記録せず終了する',
    ],
    correctIndex: 0,
    explanation:
      '軽微でも障害は一次報告が必要です。確定情報と未確定情報を分けて短く報告するのが正しい対応です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao.',
  },
  {
    id: 'j4_reporting_007',
    level: 'J4',
    skill: 'reading',
    difficulty: 'intermediate',
    title: '週次報告の優先順位 (J4)',
    situation:
      '部長メール: 「週次報告は金曜16:00締切。売上未達項目は原因と次週対策を必ず添付。未達が3項目以上なら先に口頭報告。」',
    prompt: '未達が4項目ある場合、最も適切な対応はどれですか？',
    options: [
      '先に口頭報告し、その後に原因・対策付きで週次報告を提出する',
      '週次報告だけ提出し、口頭報告は省略する',
      '原因だけ書いて対策は来週提出する',
      '締切後にまとめて報告する',
    ],
    correctIndex: 0,
    explanation:
      '条件分岐で「未達3項目以上」は先に口頭報告が必要です。そのうえで締切までに正式報告を提出します。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j4_compliance_007',
    level: 'J4',
    skill: 'listening-reading',
    difficulty: 'intermediate',
    title: '持ち出し申請の例外判断 (J4)',
    situation:
      '【規程】社外持ち出し媒体は申請必須。緊急対応時のみ課長の口頭承認で先行対応可、当日中に申請書提出。\n【電話】「今すぐ現場でログ確認が必要。課長が口頭承認したので先に対応してください」',
    prompt: '担当者の行動として正しいものはどれですか？',
    options: [
      '先行対応しつつ、当日中に申請書を提出する',
      '口頭承認があるので申請書は不要と判断する',
      '規程を無視して私物USBで持ち出す',
      '緊急でも翌週まで対応を延期する',
    ],
    correctIndex: 0,
    explanation:
      '規程の例外条件は「先行対応可＋当日中申請」のセットです。どちらか一方だけでは不十分です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j4_legal_007',
    level: 'J4',
    skill: 'reading',
    difficulty: 'intermediate',
    title: '利用規約改定の告知タイミング (J4)',
    situation:
      '法務通知: 「利用規約改定は施行日の7日前までに告知。施行日当日の告知は不可。告知文は法務最終確認後に公開。」',
    prompt: '施行日が30日の場合、正しい運用はどれですか？',
    options: [
      '23日までに法務確認済み告知文を公開する',
      '30日に公開して同日施行する',
      '法務確認前に先に公開し、後で修正する',
      '施行後にメールで事後通知する',
    ],
    correctIndex: 0,
    explanation:
      '7日前ルールと法務最終確認の両方を満たす必要があります。施行日当日告知は規程違反です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
  {
    id: 'j4_incident_007',
    level: 'J4',
    skill: 'listening',
    difficulty: 'intermediate',
    title: '障害対応の連絡順序 (J4)',
    situation:
      'チームリーダーの指示: 「決済エラーが発生。一次切り分け担当は山本。顧客連絡は私が行う。山本さんは15分以内に影響範囲を報告して」',
    prompt: '山本さんの最初の行動として最適なのはどれですか？',
    options: [
      '15分以内に影響範囲を切り分けてリーダーへ報告する',
      '顧客へ直接謝罪メールを送る',
      'SNSで障害状況を公開する',
      '原因確定まで連絡を止める',
    ],
    correctIndex: 0,
    explanation:
      '指示では役割分担が明確です。山本さんは切り分けと報告が担当で、顧客連絡はリーダー担当です。Can xu ly dung pham vi tham quyen theo vai tro duoc giao. Luon bam dung deadline va thu tu thoi gian neu de bai da neu moc.',
  },
];

function main() {
  const target = path.resolve(process.cwd(), TARGET);
  if (!fs.existsSync(target)) {
    console.error(`File not found: ${target}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, ''));
  if (!Array.isArray(payload)) {
    console.error('Expected array runtime questions');
    process.exit(1);
  }

  const idSet = new Set(payload.map((item) => item.id));
  const toAppend = NEW_ITEMS.filter((item) => !idSet.has(item.id));

  if (toAppend.length === 0) {
    console.log('No new items appended (already exists).');
    return;
  }

  payload.push(...toAppend);
  fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Appended ${toAppend.length} items to runtime bank.`);
}

main();

