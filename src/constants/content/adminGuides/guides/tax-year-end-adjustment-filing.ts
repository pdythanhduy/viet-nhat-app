import type { AdminGuide } from '../../../../types/content';

const taxYearEndAdjustmentFiling: AdminGuide = {
    id: 'tax-year-end-adjustment-filing',
    category: 'money',
    lastVerified: '2026-05-16',
    priority: 'high',
    title: 'Thuế, 年末調整, 確定申告 và 扶養',
    titleJp: '税金・年末調整・確定申告・扶養の基本',
    icon: 'receipt',
    color: '#8E44AD',
    description: 'Guide thực tế cho người đi làm ở Nhật: khi nào công ty làm 年末調整, khi nào phải tự làm 確定申告, cách hiểu 扶養 và hồ sơ扶養 thân nhân ở Việt Nam, cùng các thay đổi lớn áp dụng trong mùa khai 2026.',
    heroImage: require('../../../../../assets/content/daily-life/ag_tax-filing_hero.jpg'),
    heroImageCaption: 'Thuế cuối năm - phân biệt 年末調整, 確定申告 và hồ sơ 扶養',
    whoIsThisFor: [
      'Người đi làm ở Nhật có lương, có thể có 1 hoặc nhiều nguồn thu.',
      'Người muốn khai 扶養 cho vợ/chồng, con hoặc cha mẹ ở Việt Nam.',
      'Người nghe nói “công ty làm thuế hết rồi” nhưng chưa chắc mình có còn phải tự đi 確定申告 hay không.',
    ],
    whenToDo: [
      'Trong năm: nộp 扶養控除等申告書 cho công ty chính và cập nhật khi gia đình thay đổi.',
      'Cuối năm: làm 年末調整 với công ty nếu đủ điều kiện.',
      'Mùa khai năm 2026 cho thu nhập năm 2025: về nguyên tắc từ ngày 16/02/2026 đến 16/03/2026 để nộp 確定申告 theo thông báo của NTA.',
      'Bất kỳ lúc nào nếu bạn có nhiều nguồn thu, không được công ty 年末調整 đầy đủ, hoặc muốn xin hoàn thuế.',
    ],
    whereToDo: [
      'Công ty nơi bạn làm chính: 年末調整, các mẫu扶養, 基礎控除, 配偶者控除, 保険料控除, 住宅ローン控除 năm sau đầu tiên nếu đủ điều kiện.',
      '国税庁/e-Tax hoặc tax office: 確定申告 khi bạn phải tự khai hoặc muốn xin hoàn.',
      'Nếu khai扶養 cho thân nhân ở Việt Nam: công ty hoặc tax filing sẽ yêu cầu bộ giấy chứng minh quan hệ và chứng minh chuyển tiền đúng chuẩn của NTA.',
    ],
    estimatedTime: 'Nếu hồ sơ đơn giản và chỉ có một công ty làm 年末調整, bạn chủ yếu phải nộp giấy cho công ty vào cuối năm. Nếu phải tự làm 確定申告, thời gian thực tế phụ thuộc vào việc bạn đã gom đủ源泉徴収票, chứng từ bảo hiểm, chứng từ chuyển tiền cho thân nhân ở nước ngoài và các khoản thu khác hay chưa.',
    fees: [
      '年末調整 tại công ty không phải là dịch vụ thu phí riêng cho người lao động.',
      'Nộp 確定申告 trực tiếp qua e-Tax hoặc tax office về nguyên tắc không có “phí nộp hồ sơ”, nhưng có thể phát sinh chi phí in ấn, dịch thuật, gửi hồ sơ hoặc phí dịch vụ nếu thuê người làm hộ.',
      'Khai扶養 thân nhân ở nước ngoài thường phát sinh chi phí dịch thuật và chuyển tiền quốc tế, đây là phần nhiều người bỏ quên khi tính toán lợi ích thực tế.',
    ],
    documentsChecklist: [
      { label: '源泉徴収票 từ công ty chính và công ty phụ (nếu có)', required: true },
      { label: 'Các mẫu 年末調整 công ty yêu cầu: 扶養控除等申告書, 基礎控除申告書, 配偶者控除等申告書, 保険料控除申告書...', required: false },
      { label: 'Chứng từ bảo hiểm, iDeCo, bảo hiểm nhân thọ hoặc các khoản được控除 khác', required: false },
      { label: 'Nếu khai扶養 cho thân nhân ở Việt Nam: giấy tờ chứng minh quan hệ thân nhân', required: false, note: 'Giấy khai sinh, kết hôn, sổ hộ khẩu/các giấy tương đương, kèm bản dịch nếu là tiếng nước ngoài.' },
      { label: 'Nếu khai扶養 cho thân nhân ở nước ngoài: giấy tờ chuyển tiền', required: false, note: 'NTA yêu cầu送金関係書類 hoặc 38万円送金書類 tùy trường hợp.' },
      { label: 'Nếu phải tự làm 確定申告: toàn bộ chứng từ thu nhập khác ngoài lương', required: false },
    ],
    commonMistakes: [
      'Nghĩ 年末調整 và 確定申告 là một việc duy nhất.',
      'Tưởng công ty làm 年末調整 thì chắc chắn bản thân không còn nghĩa vụ khai thuế gì nữa.',
      'Khai扶養 thân nhân ở Việt Nam nhưng không có bộ giấy chứng minh quan hệ và chuyển tiền đúng chuẩn NTA.',
      'Không biết quy tắc 30-70 tuổi đối với国外居住親族, dẫn tới khai扶養 sai cho cha mẹ hoặc anh chị em ở Việt Nam.',
      'Có 2 nơi làm việc hoặc có thu nhập phụ mà vẫn nghĩ “dưới 20 man là khỏi quan tâm gì”.',
      'Nhầm giữa thuế thu nhập quốc gia và住民税 của địa phương.',
    ],
    faq: [
      {
        question: '年末調整 là gì và ai được công ty làm?',
        answer: 'NTA giải thích 年末調整 là thủ tục công ty dùng để quyết toán lại thuế thu nhập đã khấu trừ trong năm. Người được làm thường là người đã nộp 扶養控除等申告書 cho công ty và thuộc nhóm đủ điều kiện. Ví dụ, người có lương trên 2,000万円 thì không thuộc đối tượng 年末調整.',
      },
      {
        question: 'Khi nào phải tự làm 確定申告 dù đã đi làm công ty?',
        answer: 'NTA nêu một số trường hợp điển hình: lương năm trên 2,000万円; có thêm thu nhập ngoài lương/退職所得 vượt 20万円; có từ 2 nơi trả lương và phần chưa 年末調整 cộng với thu nhập khác vượt ngưỡng; hoặc công ty không thể làm 年末調整 đầy đủ cho bạn. Ngoài ra, nếu muốn xin hoàn thuế thì bạn cũng có thể phải tự khai.',
      },
      {
        question: 'Khai扶養 cho cha mẹ ở Việt Nam có được không?',
        answer: 'Có thể trong một số trường hợp, nhưng không chỉ cần “gửi tiền về nhà” là đủ. NTA yêu cầu bộ chứng minh quan hệ thân nhân và chứng minh chuyển tiền. Với国外居住親族 từ 30 đến 70 tuổi, quy tắc hiện hành chặt hơn: chỉ một số nhóm mới đủ điều kiện, như du học, người khuyết tật hoặc người được bạn chuyển ít nhất 38万円/năm cho chi phí sinh hoạt hoặc học tập.',
      },
      {
        question: 'Mùa khai năm 2026 có gì mới đáng chú ý?',
        answer: 'Có. NTA đã công bố các thay đổi áp dụng cho thu nhập năm 2025: sửa đổi 基礎控除, 見直し給与所得控除, thay đổi điều kiện所得 của扶養親族 và tạo mới 特定親族特別控除. Những thay đổi này ảnh hưởng trực tiếp đến 年末調整 từ cuối năm 2025 và 確定申告 mùa 2026.',
      },
      {
        question: 'Ngưỡng 20万円 thu nhập phụ nghĩa là khỏi khai hết mọi thứ đúng không?',
        answer: 'Không nên hiểu vậy. NTA giải thích quy tắc 20万円 chỉ là quy định trong một số trường hợp để không phải nộp 確定申告 bắt buộc. Nhưng nếu bạn đã đi khai để xin hoàn thuế hoặc vì lý do khác, các khoản thu nhập liên quan vẫn phải khai đầy đủ. Ngoài ra,住民税 có logic riêng.',
      },
    ],
    officialLinks: [
      { label: '令和7年分 年末調整のしかた — 国税庁', url: 'https://www.nta.go.jp/publication/pamph/gensen/nencho2025/01.htm' },
      { label: '年末調整の対象となる人 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2665.htm' },
      { label: '年末調整のしかた — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2662.htm' },
      { label: '給与所得者で確定申告が必要な人 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1900.htm' },
      { label: '令和7年分確定申告期の確定申告会場のお知らせ — 国税庁', url: 'https://www.nta.go.jp/information/other/data/r07/kakushin_kaijo/index.htm' },
      { label: '国外居住親族に係る扶養控除等の適用について — 国税庁', url: 'https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/gensen/kokugai/' },
      { label: '扶養控除 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1180.htm' },
      { label: '配偶者控除 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1191.htm' },
      { label: '基礎控除 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1199.htm' },
      { label: '特定親族特別控除 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1177.htm' },
      { label: '令和7年度税制改正による所得税の基礎控除の見直し等について — 国税庁', url: 'https://www.nta.go.jp/users/gensen/2025kiso/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Đầu tiên: xác định bạn đang ở nhánh nào',
        description: 'Hãy tự hỏi 3 câu: bạn chỉ có một công ty hay nhiều nơi trả lương? Công ty có làm 年末調整 cho bạn không? Bạn có thu nhập ngoài lương hoặc muốn xin thêm控除/hoàn thuế không? Trả lời ba câu này sẽ quyết định bạn dừng ở 年末調整 hay phải đi tiếp sang 確定申告.',
        documents: [
          'Nguồn thu trong năm',
          'Danh sách công ty đã trả lương',
          'Nguồn thu nhập phụ nếu có',
        ],
        tip: 'Nếu không phân nhánh từ đầu, bạn rất dễ hoặc khai thừa, hoặc tưởng không cần khai nhưng thực ra vẫn phải làm.',
      },
      {
        step: 2,
        title: 'Hiểu đúng 年末調整: công ty đang làm gì cho bạn',
        description: 'NTA nêu rõ 年末調整 là việc công ty đối chiếu số thuế đã khấu trừ trong năm với số thuế thực phải nộp của bạn. Điều kiện cơ bản là bạn đã nộp 扶養控除等申告書 cho công ty đó và thuộc nhóm được làm 年末調整. Đây là lý do một người chỉ nên có một “công ty chính” cho bộ hồ sơ扶養 này.',
        documents: [
          '扶養控除等申告書',
          'Các mẫu 年末調整 công ty phát cuối năm',
          '源泉徴収票 của công ty cũ nếu chuyển việc giữa năm',
        ],
        tip: 'Nếu chuyển việc giữa năm mà không nộp源泉徴収票 của công ty cũ cho công ty mới, công ty mới có thể không 年末調整 đúng và bạn sẽ phải tự đi sửa bằng 確定申告.',
      },
      {
        step: 3,
        title: 'Khi nào phải tự làm 確定申告',
        description: 'NTA liệt kê rõ các trường hợp điển hình: lương năm trên 2,000万円; một nơi trả lương nhưng có thêm thu nhập ngoài lương/退職所得 trên 20万円; nhiều nơi trả lương và phần chưa 年末調整 cộng với thu nhập khác vượt ngưỡng; hoặc công ty không thể年末調整 cho bạn. Ngoài ra, nếu bạn muốn xin hoàn thuế vì thiếu控除 hoặc chưa 年末調整, bạn cũng có thể tự khai.',
        documents: [
          '源泉徴収票 của tất cả nơi trả lương',
          'Chứng từ thu nhập phụ',
          'Chứng từ控除 muốn xin thêm',
        ],
        tip: 'Ngưỡng 20万円 không phải “vé miễn thuế” cho mọi tình huống. Đó chỉ là một điều kiện trong bài toán có phải nộp確定申告 bắt buộc hay không.',
      },
      {
        step: 4,
        title: '扶養: hiểu cho đúng trước khi khai cho gia đình ở Việt Nam',
        description: '扶養 trong thuế không đơn giản là “có gửi tiền về nhà”. Bạn phải xem người đó có thuộc nhóm đủ điều kiện hay không, mức thu nhập của họ, độ tuổi, nơi cư trú và bộ giấy tờ chứng minh quan hệ/chuyển tiền. Đặc biệt với国外居住親族, NTA yêu cầu hồ sơ rất cụ thể.',
        documents: [
          'Giấy tờ chứng minh quan hệ thân nhân',
          'Giấy chuyển tiền',
          'Bản dịch tiếng Nhật nếu giấy tờ là tiếng Việt',
        ],
        tip: 'Đừng nộp giấy tờ photo mờ hoặc giấy tờ quan hệ không khớp tên/phiên âm với hộ chiếu và thẻ cư trú. Đây là lỗi rất hay gặp.',
      },
      {
        step: 5,
        title: 'Điểm khó nhất:扶養 thân nhân ở nước ngoài từ 30 đến 70 tuổi',
        description: 'Theo NTA, từ 30 đến 70 tuổi thì国外居住親族 không đương nhiên được tính扶養. Họ phải thuộc một trong các nhóm được phép, ví dụ người đi du học, người khuyết tật hoặc người mà bạn chuyển ít nhất 38万円/năm cho sinh hoạt/học tập. Nếu không rơi vào các nhóm này thì không được áp dụng扶養控除.',
        documents: [
          '親族関係書類',
          '送金関係書類 hoặc 38万円送金書類',
          '留学ビザ等書類 nếu khai theo diện留学',
        ],
        tip: 'Đây là chỗ nhiều người Việt bị bác扶養 vì chỉ gửi tiền nhỏ lẻ hoặc gửi không đứng tên đúng người nhận.',
      },
      {
        step: 6,
        title: 'Những thay đổi lớn đang áp dụng trong mùa khai 2026',
        description: 'NTA đã công bố các thay đổi cho thu nhập năm 2025 và mùa khai 2026: 基礎控除 được sửa lại, có mức tối đa 95万円 ở nhóm thu nhập thấp; điều kiện所得 của扶養親族 thay đổi; và xuất hiện 特定親族特別控除 cho nhóm thân nhân 19-23 tuổi có所得 vượt ngưỡng扶養 thường nhưng vẫn trong phạm vi nhất định. Nếu bạn dùng kinh nghiệm từ 2024 hoặc sớm hơn để tự ước tính thuế 2026, rất dễ sai.',
        documents: [
          'Tài liệu 年末調整 năm 2025',
          'Bảng控除 mới của NTA',
          'Thông tin thu nhập của người thân nếu khai配偶者控除 hoặc 特定親族特別控除',
        ],
        tip: 'Một thay đổi nhỏ trên giấy có thể làm lệch cả việc bạn được hoàn hay phải nộp thêm. Đừng ước lượng theo “năm ngoái chắc giống năm nay”.',
      },
    ],
  };

export default taxYearEndAdjustmentFiling;
