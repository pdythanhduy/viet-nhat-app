import type { AdminGuide } from '../../../../types/content';

const policeQuestioningRightsJapan: AdminGuide = {
  id: 'police-questioning-rights-japan',
  category: 'daily-law',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Khi cảnh sát hỏi / triệu tập / bắt giữ — quyền của bạn',
  titleJp: '警察に呼ばれた・取り調べを受けたとき',
  icon: 'shield-outline',
  color: '#34495E',
  description:
    'Khi tiếp xúc với cảnh sát Nhật, có 3 mức cần phân biệt: 職務質問 (kiểm tra giấy tờ ngẫu nhiên), 任意聴取 (mời nói chuyện tự nguyện), 逮捕 (bắt giữ chính thức). Người nước ngoài có một số quyền cơ bản theo luật Nhật + công ước quốc tế: quyền yêu cầu thông dịch, quyền giữ im lặng (黙秘権), quyền liên hệ luật sư, quyền liên hệ Đại sứ quán. Đây là tài liệu tham khảo — KHÔNG phải tư vấn pháp lý cá nhân. Trường hợp cụ thể cần luật sư.',
  searchKeywords: [
    'cảnh sát hỏi',
    'cảnh sát triệu tập',
    'bị bắt',
    'bị thẩm vấn',
    'quyền im lặng',
    'luật sư miễn phí',
    'kiểm tra giấy tờ',
    '職務質問',
    '任意聴取',
    '逮捕',
    '黙秘権',
    '取り調べ',
    '弁護士',
    '法テラス',
    'lãnh sự',
    'đại sứ quán',
    '当番弁護士',
    'thẻ cư trú',
    '在留カード',
  ],
  legalScope: {
    jurisdiction: 'national',
    jurisdictionNote:
      'Quyền cơ bản của người bị nghi vấn (黙秘権, 弁護士接見権, v.v.) do 刑事訴訟法 (Bộ luật Tố tụng hình sự) quy định toàn quốc. 警察庁 + 都道府県警察 thực thi. Quyền liên hệ Đại sứ quán dựa trên Vienna Convention on Consular Relations 1963. Đây là TÀI LIỆU THAM KHẢO — không phải tư vấn pháp lý cá nhân. Trường hợp cụ thể cần luật sư.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'high',
    whenToAskExpert: [
      'Bị giữ tại 警察署 quá vài giờ — yêu cầu liên hệ luật sư + Đại sứ quán Việt Nam ngay.',
      'Bị yêu cầu ký 供述調書 (biên bản lời khai) mà chưa hiểu — KHÔNG ký, yêu cầu luật sư đọc trước.',
      'Cảnh sát đe dọa visa / công việc / gia đình — luật sư chuyên về 入管 + hình sự cùng lúc.',
      'Nghi ngờ vô tội nhưng bị buộc tội — yêu cầu 当番弁護士 (luật sư trực) ngay.',
    ],
  },
  quickAction: {
    deadline:
      'Khi cảnh sát tiếp cận: bình tĩnh trong vài phút đầu. Khi bị giữ: trong 48–72 giờ đầu, tình huống có thể thay đổi nhanh — cần luật sư + Đại sứ quán càng sớm càng tốt.',
    office:
      '交番 (đồn cảnh sát địa phương) hoặc 警察署 (sở cảnh sát). 当番弁護士 = luật sư trực miễn phí lần đầu, gọi qua 弁護士会 (Bar Association) của 都道府県. 法テラス = trung tâm hỗ trợ pháp lý cho người không có tiền. Đại sứ quán Việt Nam tại Tokyo / lãnh sự Osaka / Fukuoka — quyền theo công ước Vienna.',
    doNow: [
      'Bình tĩnh. KHÔNG chạy. KHÔNG cãi nhau / giơ tay đẩy cảnh sát — có thể bị thêm tội 公務執行妨害.',
      'Hỏi rõ: "私は何の容疑ですか?" (Tôi bị nghi gì?) + "任意ですか、逮捕ですか?" (Là tự nguyện hay bị bắt?).',
      'Xuất trình 在留カード khi được yêu cầu — luật Nhật bắt buộc người nước ngoài mang theo và xuất trình.',
      'Yêu cầu thông dịch: "通訳をお願いします" hoặc "ベトナム語の通訳をお願いします". Phía cảnh sát có nghĩa vụ cung cấp.',
      'Yêu cầu luật sư: "弁護士に連絡したいです" — quyền cơ bản. Yêu cầu liên hệ Đại sứ quán: "領事館に連絡したいです".',
      'KHÔNG ký 供述調書 hoặc bất kỳ giấy gì trước khi luật sư đọc + giải thích.',
    ],
    bring: [
      '在留カード (luôn mang theo theo luật)',
      'Hộ chiếu (nếu có)',
      'Số điện thoại Đại sứ quán Việt Nam Tokyo / lãnh sự Osaka / Fukuoka (lưu sẵn)',
      'Số 当番弁護士 / 弁護士会 都道府県 (tra Google trước khi cần)',
      'Bình tĩnh + ý thức về quyền của mình',
    ],
    ifLate:
      'Đã ký giấy / đã cung cấp thông tin mà giờ thấy bất lợi: liên hệ luật sư NGAY. Lời khai có thể thu hồi / phản bác trong tòa nhưng cần luật sư hỗ trợ. Đại sứ quán có thể giúp tìm luật sư có tiếng Việt.',
    officialSourceLabels: ['日本弁護士連合会 (JFBA)', '法テラス'],
  },
  whoIsThisFor: [
    'Người Việt sống / làm việc / du học tại Nhật.',
    'Người vừa bị 職務質問 (kiểm tra giấy tờ) — không phạm tội nhưng muốn biết quyền.',
    'Người bị mời 任意聴取 — muốn biết có bắt buộc đi không + chuẩn bị thế nào.',
    'Người nhà / bạn bè bị giữ — cần biết bước tiếp theo.',
    'Mọi người sống tại Nhật — đọc trước khi cần để khỏi hoảng.',
  ],
  whenToDo: [
    'Đọc TRƯỚC khi tiếp xúc với cảnh sát — biết quyền giúp giữ bình tĩnh.',
    'Khi đang bị 職務質問 / 任意聴取 / 逮捕 — áp dụng các bước.',
    'Khi người thân bị giữ — yêu cầu thăm + thông tin.',
    'Sau khi tình huống kết thúc — lưu giấy tờ + xem có cần khiếu nại không.',
  ],
  whereToDo: [
    '交番 (đồn nhỏ) hoặc 警察署 (sở chính quận / thành phố) — nơi tiếp xúc.',
    '弁護士会 mỗi 都道府県 — hệ thống 当番弁護士 + tư vấn pháp lý.',
    '法テラス (Japan Legal Support Center) — toàn quốc, tư vấn miễn phí cho người thu nhập thấp.',
    'Đại sứ quán Việt Nam tại Tokyo + Tổng lãnh sự quán tại Osaka, Fukuoka — quyền lãnh sự theo công ước Vienna.',
  ],
  estimatedTime:
    '職務質問 thường 5–30 phút. 任意聴取 vài giờ trong cùng ngày. 逮捕: có thể 48–72 giờ trước khi quyết định 起訴 hay 釈放. Tình huống phức tạp có thể kéo dài tuần / tháng — cần luật sư.',
  fees: [
    '当番弁護士 lần đầu: thường MIỄN PHÍ (1 lần gặp ngắn).',
    '法テラス tư vấn 30 phút: thường miễn phí cho thu nhập đủ điều kiện.',
    'Luật sư riêng tiếp theo: phí thay đổi tùy vụ + tùy luật sư. Có 国選弁護人 (luật sư do tòa chỉ định) cho người không có tiền — áp dụng khi đã 起訴.',
    'Phí Đại sứ quán giúp đỡ: thường MIỄN PHÍ cho công dân Việt Nam.',
    'Phí thay đổi — kiểm tra với luật sư / 弁護士会 cụ thể trước.',
  ],
  documentsChecklist: [
    { label: '在留カード', required: true, note: 'Luật bắt buộc mang theo. Thiếu = vi phạm 入管法.' },
    { label: 'Hộ chiếu', required: false, note: 'Backup nếu thẻ bị giữ.' },
    { label: 'Số điện thoại Đại sứ quán Việt Nam', required: false, note: 'Lưu trong điện thoại trước. Tra trên trang chính thức Đại sứ quán.' },
    { label: 'Số 弁護士会 都道府県 mình ở', required: false, note: 'Tra Google trước. Nhiều 弁護士会 có hotline 当番弁護士.' },
    { label: 'Số 法テラス: 0570-078374', required: false, note: 'Trung tâm tư vấn pháp lý quốc gia (sapo-dial). Multilingual.' },
  ],
  commonMistakes: [
    'Chạy khi cảnh sát gọi → bị nghi ngờ + có thể bị thêm tội 公務執行妨害.',
    'Cãi nhau / la hét / giơ tay → căng thẳng leo thang, không có lợi.',
    'Ký 供述調書 mà chưa hiểu → khó rút lại sau, có thể thành bằng chứng chính.',
    'Không yêu cầu thông dịch vì sợ "phiền" → hiểu nhầm có thể dẫn đến lời khai sai.',
    'Không yêu cầu luật sư vì nghĩ "tôi vô tội thì không cần" → sai. Luật sư bảo vệ ngay cả khi vô tội.',
    'Không liên hệ Đại sứ quán → mất quyền cơ bản theo công ước Vienna.',
    'Không mang 在留カード → vi phạm 入管法, có thể bị thêm tội độc lập.',
    'Tin "im lặng = thừa nhận tội" → SAI. 黙秘権 là quyền hợp pháp, không thể dùng làm bằng chứng.',
  ],
  faq: [
    {
      question: 'Cảnh sát đứng ở ga, hỏi giấy tờ tôi — tôi phải làm gì?',
      answer:
        'Đây là 職務質問 — kiểm tra giấy tờ ngẫu nhiên. Bình tĩnh. Đưa 在留カード khi được yêu cầu (luật bắt buộc). Có thể hỏi: "私は何かしましたか?" (Tôi đã làm gì sao?). Nếu cảnh sát chỉ kiểm tra danh tính + để bạn đi → kết thúc nhanh. Nếu họ yêu cầu mở túi / lên xe / đi cùng đến 交番 — đây là 任意 (tự nguyện), bạn CÓ QUYỀN từ chối lịch sự nếu không có 逮捕状 (lệnh bắt) hoặc 捜索差押令状 (lệnh khám xét). Câu nói: "任意ですか?" — nếu họ trả lời "はい (yes)", bạn có thể từ chối + đi tiếp.',
    },
    {
      question: 'Cảnh sát mời tôi lên 警察署 nói chuyện — có bắt buộc đi không?',
      answer:
        '任意聴取 (mời nói chuyện tự nguyện) — về luật KHÔNG bắt buộc đi. Bạn có thể nói: "今日は都合が悪いので、後日にしたいです" (Hôm nay tôi bận, xin lùi lại) hoặc "弁護士に相談してから決めます" (Tôi muốn hỏi luật sư trước khi quyết định). Cảnh sát có thể nài nỉ / áp lực — vẫn không bắt buộc trừ khi có 逮捕状. Tuy nhiên trên thực tế, từ chối có thể làm họ tăng cường điều tra hoặc xin 逮捕状. Cân nhắc với luật sư trước khi quyết định.',
    },
    {
      question: 'Tôi bị bắt — bao lâu thì biết kết quả?',
      answer:
        'Theo 刑事訴訟法 Nhật:\n\n• Cảnh sát có thể giữ tối đa 48 giờ.\n• Sau đó chuyển đến 検察 — 検察 có thêm 24 giờ để quyết định.\n• Tổng tối đa **72 giờ** trước khi tòa xét 勾留 (giam giữ tiếp).\n• Tòa cho 勾留 thì thêm 10 ngày, có thể gia hạn 10 ngày nữa = tối đa **23 ngày** trước khi 起訴 (truy tố) hoặc 釈放 (thả).\n\nTrong khoảng này: yêu cầu 当番弁護士 ngay từ ngày đầu. Đại sứ quán Việt Nam có quyền thăm theo công ước Vienna.',
    },
    {
      question: 'Tôi không nói được tiếng Nhật giỏi — có quyền thông dịch không?',
      answer:
        'Có. Theo Hiến pháp Nhật điều 31 + 刑事訴訟法, người bị tình nghi không hiểu tiếng Nhật có quyền được thông dịch trong thẩm vấn. Cảnh sát có nghĩa vụ cung cấp thông dịch viên — thường là nhà nước mời, không phải bạn trả phí. Câu nói cần thiết: "通訳をお願いします" hoặc "ベトナム語の通訳が必要です". KHÔNG ký bất cứ giấy gì khi không có thông dịch.',
    },
    {
      question: 'Tôi bị nói "nếu khai nhanh sẽ ra sớm" — có nên tin không?',
      answer:
        'KHÔNG NÊN dựa vào hứa hẹn miệng của cảnh sát/検察. Lời khai bằng văn bản có giá trị pháp lý CAO HƠN nhiều so với hứa hẹn miệng. "Khai nhanh" thường = thừa nhận tội → bị 起訴 + có tiền án.\n\nQuy tắc vàng: KHÔNG ký 供述調書 trước khi luật sư đọc + giải thích. Quyền 黙秘権 (im lặng) là hợp pháp + không bị dùng làm bằng chứng buộc tội. Liên hệ 当番弁護士 ngay.',
    },
  ],
  counterPhrases: [
    {
      jp: '通訳をお願いします。',
      romaji: 'Tsuuyaku o onegai shimasu.',
      vn: 'Xin cho tôi thông dịch viên.',
      note: 'Câu cơ bản nhất. Yêu cầu thông dịch tiếng Việt nếu cụ thể: "ベトナム語の通訳をお願いします".',
    },
    {
      jp: '弁護士に連絡したいです。',
      romaji: 'Bengoshi ni renraku shitai desu.',
      vn: 'Tôi muốn liên hệ luật sư.',
      note: 'Quyền cơ bản. Cảnh sát phải tạo điều kiện. Có thể xin 当番弁護士 nếu chưa có luật sư riêng.',
    },
    {
      jp: '領事館に連絡したいです。',
      romaji: 'Ryoujikan ni renraku shitai desu.',
      vn: 'Tôi muốn liên hệ lãnh sự quán.',
      note: 'Quyền theo công ước Vienna 1963. Yêu cầu liên hệ Đại sứ quán Việt Nam tại Tokyo / lãnh sự Osaka, Fukuoka.',
    },
    {
      jp: '任意ですか、逮捕ですか。',
      romaji: 'Nin\'i desu ka, taiho desu ka.',
      vn: 'Là tự nguyện hay bị bắt?',
      note: 'Câu quan trọng — biết là 任意 thì có thể từ chối, là 逮捕 thì bắt buộc theo cảnh sát.',
    },
    {
      jp: '私は何の容疑ですか。',
      romaji: 'Watashi wa nan no yougi desu ka.',
      vn: 'Tôi bị nghi gì?',
      note: 'Quyền được biết lý do. Cảnh sát phải trả lời rõ.',
    },
    {
      jp: '黙秘権を行使します。',
      romaji: 'Mokuhiken o koushi shimasu.',
      vn: 'Tôi thực hiện quyền giữ im lặng.',
      note: 'Quyền hợp pháp theo 刑事訴訟法. KHÔNG bị dùng làm bằng chứng buộc tội.',
    },
    {
      jp: '署名はできません。弁護士に確認してから決めます。',
      romaji: 'Shomei wa dekimasen. Bengoshi ni kakunin shite kara kimemasu.',
      vn: 'Tôi không ký được. Tôi quyết định sau khi hỏi luật sư.',
      note: 'Câu cứu mạng — KHÔNG ký 供述調書 trước khi luật sư đọc.',
    },
    {
      jp: '今日は都合が悪いので、後日にしたいです。',
      romaji: 'Kyou wa tsugou ga warui node, gojitsu ni shitai desu.',
      vn: 'Hôm nay tôi bận, xin lùi lại ngày khác.',
      note: 'Câu lịch sự để từ chối 任意聴取 ngay. Không vi phạm gì cả.',
    },
  ],
  officialLinks: [
    { label: '日本弁護士連合会 (JFBA)', url: 'https://www.nichibenren.or.jp/' },
    { label: '法テラス', url: 'https://www.houterasu.or.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'TRƯỚC khi tiếp xúc — biết quyền cơ bản',
      description:
        'Đọc + lưu trong điện thoại:\n\n**Quyền của bạn (theo luật Nhật)**:\n• Quyền yêu cầu thông dịch (nếu không hiểu tiếng Nhật).\n• Quyền giữ im lặng (黙秘権) — không bị dùng làm bằng chứng buộc tội.\n• Quyền liên hệ luật sư.\n• Quyền liên hệ lãnh sự / Đại sứ quán (công ước Vienna 1963).\n• Quyền KHÔNG ký giấy chưa hiểu.\n\n**Nghĩa vụ của bạn (theo 入管法)**:\n• Mang theo 在留カード mọi lúc.\n• Xuất trình khi cảnh sát yêu cầu.\n\n**Số điện thoại cần lưu trong điện thoại**:\n• 法テラス: 0570-078374 (sapo-dial), multilingual\n• 弁護士会 都道府県 mình ở (tra Google: "Tên 都道府県 + 弁護士会 + 当番弁護士")\n• Đại sứ quán Việt Nam Tokyo / lãnh sự Osaka, Fukuoka (tra trang chính thức)',
      documents: [
        '在留カード (luôn mang theo)',
      ],
      tip: 'Lưu sẵn ảnh chụp 在留カード + hộ chiếu trong điện thoại + cloud — phòng khi mất bản gốc.',
    },
    {
      step: 2,
      title: 'Khi cảnh sát tiếp cận — phân biệt 3 mức',
      description:
        '**Mức 1: 職務質問 (kiểm tra giấy tờ)**\n• Cảnh sát có thể đến gần ngẫu nhiên, đặc biệt ở ga / khu vui chơi đêm / sau sự kiện.\n• Yêu cầu giấy tờ → đưa 在留カード (bắt buộc).\n• Có thể hỏi tên / địa chỉ / nơi đến.\n• Thường 5–30 phút, sau đó cho đi.\n\n**Mức 2: 任意聴取 (mời nói chuyện tự nguyện)**\n• Cảnh sát mời lên 交番 / 警察署 nói chuyện.\n• KHÔNG bắt buộc đi (về luật).\n• Có thể từ chối lịch sự: "今日は都合が悪いです" hoặc "弁護士に相談してから決めます".\n• Nếu đi: vẫn có thể đứng lên + về bất kỳ lúc nào.\n\n**Mức 3: 逮捕 (bắt giữ)**\n• Cảnh sát đưa 逮捕状 (lệnh bắt) hoặc bắt khẩn cấp (現行犯逮捕).\n• Bắt buộc theo cảnh sát.\n• Trong 48 giờ phải có quyết định rõ ràng (chuyển 検察 hoặc thả).\n\nHỏi rõ: "任意ですか、逮捕ですか?" để biết mình ở mức nào.',
      documents: [
        '在留カード',
      ],
      tip: 'Bình tĩnh = quyền lực lớn nhất. KHÔNG chạy, KHÔNG cãi nhau. Câu trung tính: "わかりました. 通訳をお願いします."',
    },
    {
      step: 3,
      title: 'Yêu cầu thông dịch + luật sư + Đại sứ quán',
      description:
        'Ngay khi vào 交番 / 警察署 (mức 2 hoặc 3):\n\n1. **Thông dịch**: "通訳をお願いします. ベトナム語の通訳が必要です." Cảnh sát phải cung cấp.\n\n2. **Luật sư**: "弁護士に連絡したいです." Có 3 lựa chọn:\n• Luật sư riêng (nếu có)\n• 当番弁護士 (luật sư trực miễn phí lần đầu) — gọi qua 弁護士会 都道府県\n• 法テラス (cho thu nhập thấp) — 0570-078374\n\n3. **Đại sứ quán** (theo công ước Vienna): "領事館に連絡したいです." Quyền cơ bản — cảnh sát phải tạo điều kiện. Đại sứ quán có thể giúp: tìm luật sư có tiếng Việt, thăm tù nhân, liên hệ gia đình.\n\n**KHÔNG nói gì** về vụ việc trước khi:\n• Có thông dịch viên đáng tin\n• Luật sư đã đến + giải thích.\n\nCâu trung tính trong khi chờ: "弁護士が来るまで、何も話しません" (Tôi không nói gì cho đến khi luật sư đến).',
      documents: [
        '在留カード',
      ],
      tip: 'Một số 弁護士会 có hệ thống 当番弁護士 24/7. Yêu cầu cảnh sát gọi giúp — họ có nghĩa vụ.',
    },
    {
      step: 4,
      title: 'Trong thẩm vấn (取り調べ) — KHÔNG ký giấy chưa hiểu',
      description:
        'Khi vào phòng 取り調べ:\n\n1. **Có thông dịch + luật sư trước khi nói**.\n\n2. **黙秘権** (quyền im lặng): câu "黙秘権を行使します" — quyền hợp pháp, không bị dùng làm bằng chứng buộc tội. Có thể nói chỉ về danh tính + im lặng phần còn lại.\n\n3. **供述調書** (biên bản lời khai): cảnh sát viết lời khai bạn → đưa bạn ký + 押印.\n• KHÔNG ký trước khi luật sư đọc kỹ.\n• Có quyền yêu cầu sửa nếu sai nội dung.\n• Câu: "署名はできません. 弁護士に確認してから決めます."\n\n4. **Đe dọa / dụ dỗ** ("khai nhanh sẽ ra sớm" / "nếu không hợp tác sẽ ảnh hưởng visa"):\n• Cảnh sát KHÔNG được dùng cưỡng ép / hứa hẹn để lấy lời khai.\n• Lời khai do cưỡng ép có thể bị tòa loại bỏ.\n• Ghi nhớ + báo luật sư.\n\n5. **Quyền nghỉ + ăn + đi vệ sinh**: cảnh sát phải cho phép. Yêu cầu nếu cần.',
      documents: [],
      tip: 'Nếu không có luật sư đến trong 6–12 giờ — yêu cầu cảnh sát gọi lại 弁護士会. Đây là quyền cơ bản, KHÔNG được từ chối.',
    },
    {
      step: 5,
      title: 'Sau khi được thả / sau khi 起訴 — bước tiếp',
      description:
        '**Nếu được thả (釈放)**:\n• Lấy lại đồ cá nhân.\n• Yêu cầu giấy chứng nhận đã được thả nếu cần (cho công ty / trường / 入管).\n• Cập nhật với luật sư về tình hình.\n• Lưu mọi giấy tờ + biên bản.\n\n**Nếu bị 起訴 (truy tố)**:\n• Có quyền 国選弁護人 (luật sư do tòa chỉ định, miễn phí cho thu nhập thấp).\n• Đại sứ quán có thể tiếp tục hỗ trợ.\n• Tham khảo luật sư về 保釈 (bảo lãnh tại ngoại) — có thể được nếu nộp tiền 保釈金.\n\n**Ảnh hưởng visa**:\n• Bị 起訴 hoặc kết tội nặng có thể ảnh hưởng visa / 永住 / 帰化.\n• Cần luật sư chuyên về 入管 + hình sự cùng lúc.\n• KHÔNG quyết định visa (gia hạn / thay đổi) một mình — hỏi luật sư.\n\n**Khiếu nại**:\n• Nếu cảnh sát có hành vi sai (đánh / đe dọa / không cho liên hệ luật sư) — báo 公安委員会 + luật sư + báo chí nếu nghiêm trọng.',
      documents: [
        '在留カード',
        'Giấy tờ liên quan vụ việc (bản photo)',
      ],
      tip: 'Đa số trường hợp người Việt liên quan: vi phạm giao thông nhỏ, ẩu đả, mất giấy tờ — thường được giải quyết nhanh. Trường hợp phức tạp (ma túy, lừa đảo, bạo lực) cần luật sư chuyên môn.',
    },
  ],
};

export default policeQuestioningRightsJapan;
