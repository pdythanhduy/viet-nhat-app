import type { AdminGuide } from '../../../../types/content';

const garbageSortingRules: AdminGuide = {
    id: 'garbage-sorting-rules',
    category: 'daily-law',
    lastVerified: '2026-05-16',
    priority: 'normal',
    title: 'Phân loại rác đúng cách tại Nhật',
    titleJp: 'ごみの分け方・出し方',
    icon: 'leaf-outline',
    color: '#27AE60',
    description: 'Nhật Bản có quy định phân loại rác nghiêm ngặt và khác nhau theo từng địa phương. Bỏ rác sai loại hoặc sai ngày có thể bị từ chối thu gom và ảnh hưởng quan hệ hàng xóm.',
    heroImage: require('../../../../../assets/content/daily-life/ag_garbage-sorting_hero.jpg'),
    heroImageCaption: 'ごみ分別 — phân loại rác đúng cách theo quy định địa phương tại Nhật',
    whoIsThisFor: [
      'Người mới sang Nhật và chưa quen quy tắc phân loại rác.',
      'Người vừa chuyển nhà sang địa phương mới — quy định rác khác nhau hoàn toàn giữa các quận/thành phố.',
      'Người chuẩn bị chuyển ra khỏi nhà và cần xử lý đồ đạc lớn (粗大ゴミ) đúng cách.',
    ],
    whenToDo: [
      'Ngay khi dọn vào nhà mới: lấy lịch phân loại rác (ゴミカレンダー) của khu vực tại municipal office, tòa nhà, hoặc app của thành phố.',
      'Trước khi chuyển nhà: đăng ký thu gom 粗大ゴミ ít nhất 1–2 tuần trước ngày chuyển.',
    ],
    whereToDo: [
      'Municipal office hoặc website/app của địa phương: lấy ゴミカレンダー và quy định phân loại chính thức.',
      'Quản lý tòa nhà/ký túc xá: xác nhận điểm đặt rác, giờ bỏ rác và loại túi được dùng.',
      'Convenience store/siêu thị: mua 指定ゴミ袋 hoặc 粗大ゴミシール nếu địa phương yêu cầu.',
      'Cổng 粗大ゴミ của địa phương: đặt lịch thu gom đồ lớn trước khi chuyển nhà.',
    ],
    documentsChecklist: [
      { label: 'ゴミカレンダー của khu vực', required: true },
      { label: '指定ゴミ袋 nếu địa phương yêu cầu', required: false },
      { label: '粗大ゴミ受付番号 hoặc giấy hẹn thu gom', required: false, note: 'Cần khi đã đăng ký đồ đạc lớn.' },
      { label: '粗大ゴミシール', required: false, note: 'Mua và dán đúng món đồ theo mức phí được thông báo.' },
      { label: 'Nội quy tòa nhà/ký túc xá', required: false, note: 'Dùng để biết điểm tập kết rác và giờ được bỏ rác.' },
    ],
    commonMistakes: [
      'Dùng lịch rác của thành phố cũ sau khi đã chuyển nhà.',
      'Bỏ rác tối hôm trước dù tòa nhà/khu phố yêu cầu chỉ bỏ buổi sáng ngày thu gom.',
      'Không rửa chai/lon/hộp trước khi bỏ vào 資源ゴミ.',
      'Bỏ đồ lớn như giường, tủ, xe đạp ra điểm rác thường mà không đăng ký 粗大ゴミ.',
      'Vứt TV, tủ lạnh, máy giặt, điều hòa như 粗大ゴミ thường dù thuộc nhóm cần xử lý theo リサイクル法.',
    ],
    faq: [
      {
        question: 'Rác bị dán giấy và không được thu thì làm sao?',
        answer: 'Mang rác về, đọc lý do trên giấy, phân loại lại hoặc đổi túi/ngày bỏ theo hướng dẫn. Không để nguyên ở điểm tập kết vì có thể gây rắc rối với hàng xóm hoặc quản lý tòa nhà.',
      },
      {
        question: 'Có được bỏ rác tối hôm trước không?',
        answer: 'Tùy địa phương và tòa nhà. Nhiều nơi yêu cầu bỏ trước giờ thu gom buổi sáng, không bỏ tối hôm trước để tránh mùi và vấn đề vệ sinh. Hãy theo ゴミカレンダー và nội quy tòa nhà.',
      },
      {
        question: 'Đồ lớn khi chuyển nhà xử lý thế nào?',
        answer: 'Đăng ký 粗大ゴミ với địa phương, mua 粗大ゴミシール đúng mức phí, dán lên đồ và đặt ra đúng ngày hẹn. Thiết bị như TV, tủ lạnh, máy giặt, điều hòa thường phải theo kênh tái chế riêng.',
      },
    ],
    counterPhrases: [
      {
        jp: 'ごみの分け方について教えていただけますか。',
        romaji: 'Gomi no wakekata ni tsuite oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết cách phân loại rác được không?',
        note: 'Câu mở đầu tại quầy môi trường của 市役所/区役所.',
      },
      {
        jp: 'ごみカレンダーはどこでもらえますか。',
        romaji: 'Gomi karendaa wa doko de moraemasu ka.',
        vn: 'Lịch rác lấy ở đâu ạ?',
      },
      {
        jp: '粗大ごみを出したいんですが、どうすればいいですか。',
        romaji: 'Sodai gomi o dashitai n desu ga, dou sureba ii desu ka.',
        vn: 'Tôi muốn vứt rác cồng kềnh, làm thế nào ạ?',
      },
      {
        jp: '粗大ごみシール（処理券）はどこで買えますか。',
        romaji: 'Sodai gomi shiiru (shoriken) wa doko de kaemasu ka.',
        vn: 'Tem 粗大ごみ (phiếu xử lý) mua ở đâu ạ?',
        note: 'Thường bán ở konbini hoặc 市役所.',
      },
      {
        jp: '間違って違うごみを出してしまったら、どうすればいいですか。',
        romaji: 'Machigatte chigau gomi o dashite shimattara, dou sureba ii desu ka.',
        vn: 'Nếu lỡ vứt sai loại rác thì phải làm sao?',
      },
      {
        jp: '外国語版のごみ分別ガイドはありますか。',
        romaji: 'Gaikokugo-ban no gomi bunbetsu gaido wa arimasu ka.',
        vn: 'Có hướng dẫn phân loại rác bằng tiếng nước ngoài không?',
      },
    ],
    keyTerms: [
      {
        term: '燃えるゴミ',
        reading: 'もえるゴミ',
        meaningVi: 'rác cháy được (rác hữu cơ + giấy bẩn)',
        noteVi: 'Rác bếp, giấy ăn, lá cây, tã, đồ ăn thừa. Túi rác chuyên dụng theo 市町村. Đổ 2-3 lần/tuần, lịch in trong sổ phân loại.',
      },
      {
        term: '燃えないゴミ',
        reading: 'もえないゴミ',
        meaningVi: 'rác không cháy (kim loại, sứ, thủy tinh)',
        noteVi: 'Nồi chảo nhỏ, dao cùn, ly vỡ, bóng đèn. Bọc giấy báo đồ sắc nhọn + ghi chữ "キケン" (nguy hiểm). Đổ 1-2 lần/tháng.',
      },
      {
        term: '資源ゴミ',
        reading: 'しげんゴミ',
        meaningVi: 'rác tái chế',
        noteVi: 'Chai nhựa (PET), lon nhôm/sắt, chai thủy tinh, giấy báo, bìa carton. Rửa sạch + tháo nhãn trước khi đổ. Mỗi loại 1 ngày riêng.',
      },
      {
        term: '粗大ごみ',
        reading: 'そだいごみ',
        meaningVi: 'rác cồng kềnh',
        noteVi: 'Đồ to (ghế sofa, tủ, xe đạp...) trên 30cm. PHẢI ĐẶT LỊCH trước với 市役所 + mua tem (300-3000円 tùy đồ). KHÔNG được vứt tự do.',
      },
      {
        term: 'ゴミ収集日',
        reading: 'ゴミしゅうしゅうび',
        meaningVi: 'ngày thu rác',
        noteVi: 'Lịch in trong sổ phân loại 市役所 phát khi bạn 転入届. Phải đem rác ra trước 8 giờ sáng đúng ngày — sai ngày = rác bị bỏ lại, có thể bị nhắc nhở.',
      },
    ],
    officialLinks: [
      { label: '廃棄物等の処理 — 環境省', url: 'https://www.env.go.jp/recycle/waste/index.html' },
      { label: '家電製品の正しいリユース・リサイクル — 環境省', url: 'https://www.env.go.jp/recycle/kaden/tvrecycle.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nắm 4 loại rác cơ bản',
        description: '燃えるゴミ (rác đốt được): thức ăn thừa, giấy bẩn, vải cũ, rác nhà bếp thông thường. Đây là loại thu gom thường xuyên nhất (2–3 lần/tuần).\n\n燃えないゴミ (rác không đốt được): đồ thủy tinh, gốm sứ, đồ kim loại nhỏ, đồ nhựa cứng (tùy địa phương có thể tách riêng). Thu gom ít thường xuyên hơn, thường 2 lần/tháng.\n\n資源ゴミ (rác tái chế): chai PET, lon nhôm/sắt, hộp giấy, chai thủy tinh, báo/tạp chí. Nhiều nơi yêu cầu rửa sạch trước khi bỏ.\n\n粗大ゴミ (đồ đạc cồng kềnh): nội thất, xe đạp, thiết bị gia dụng lớn — phải đăng ký riêng, không bỏ tự do ra điểm rác thường.',
        documents: [],
        tip: 'Tải app "ごみ分別アプリ" của thành phố nơi bạn sống (ví dụ: Tokyo là "東京ごみ分別案内", Osaka là "大阪市ごみ分別アプリ") — nhập tên đồ vật để biết bỏ loại nào và ngày nào.',
        image: require('../../../../../assets/content/daily-life/ag_garbage-sorting_s1.jpg'),
        imageCaption: 'ごみ分別 — 4 loại rác cơ bản tại Nhật, quy định khác nhau theo từng địa phương',
      },
      {
        step: 2,
        title: 'Đọc và tuân thủ lịch rác khu vực',
        description: 'Mỗi khu vực (町丁目) có lịch riêng quy định ngày thu gom từng loại rác trong tuần. Ví dụ: 月・木 = thứ 2 và thứ 5 là 燃えるゴミ; 火 = thứ 3 là 資源ゴミ. Rác phải đặt ra điểm tập kết (集積所) của khu phố trước 8h sáng ngày thu gom, không bỏ tối hôm trước.\n\nKhông đặt rác sai điểm — mỗi tòa nhà hoặc khu phố có điểm quy định riêng.',
        documents: [
          'ゴミカレンダー (lịch rác khu vực — nhận từ municipal office hoặc tòa nhà khi dọn vào)',
        ],
        tip: 'Nếu rác bị để lại (không được thu), thường có tờ giấy ghi lý do đính vào túi. Mang rác về, phân loại lại và bỏ đúng ngày tiếp theo.',
        image: require('../../../../../assets/content/daily-life/ag_garbage-sorting_s2.jpg'),
        imageCaption: 'ゴミカレンダー — lịch thu gom rác theo khu vực, nhận khi dọn vào nhà mới',
      },
      {
        step: 3,
        title: 'Quy tắc đóng gói và túi rác',
        description: 'Nhiều địa phương yêu cầu dùng túi rác có màu hoặc có logo của thành phố (指定ゴミ袋) — bán tại convenience store và siêu thị. Bỏ rác bằng túi thường có thể bị từ chối.\n\nChai PET: tháo nắp và nhãn (bỏ vào 燃えるゴミ), bẹp chai trước khi bỏ vào thùng 資源.\nLon và hộp: rửa sạch, bẹp nếu được.\nThùng các-tông: tháo dỡ phẳng, buộc thành bó bằng dây.',
        documents: [],
        tip: 'Hỏi quản lý tòa nhà (管理人) hoặc hàng xóm về loại túi và điểm bỏ rác ngay khi dọn vào — đây là điều đầu tiên nên hỏi để tránh mâu thuẫn.',
      },
      {
        step: 4,
        title: 'Xử lý đồ đạc lớn (粗大ゴミ) khi chuyển nhà',
        description: 'Đồ vật lớn như giường, tủ, xe đạp, máy giặt, TV, tủ lạnh không được bỏ vào rác thường. Có 3 cách:\n\n1. Đăng ký 粗大ゴミ thu gom: gọi điện hoặc đặt online qua cổng municipal office, mua tem 粗大ゴミシール tại convenience store theo mức phí được thông báo (thường 400–2,000 yên/món), dán lên đồ và đặt ra đúng ngày hẹn.\n\n2. Thiết bị gia dụng 4 loại (TV, tủ lạnh, máy giặt, máy điều hòa): theo luật リサイクル法, phải trả qua nhà bán lẻ hoặc công ty thu hồi có phép — không thể đặt làm 粗大ゴミ thông thường.\n\n3. Tặng/bán: Junk Mail, Mercari, Facebook Marketplace nhóm người Việt tại Nhật.',
        documents: [],
        tip: 'Tuyệt đối không vứt đồ đạc lớn ra vỉa hè hoặc điểm rác không đăng ký (不法投棄) — vi phạm Luật Xử lý Chất thải Nhật Bản, có thể bị phạt tiền hoặc truy cứu hình sự.',
      },
    ],
  };

export default garbageSortingRules;
