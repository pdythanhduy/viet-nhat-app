import type { AdminGuide } from '../../../../types/content';

const overstayingIllegalStayProcedures: AdminGuide = {
    id: 'overstaying-illegal-stay-procedures',
    category: 'immigration',
    lastVerified: '2026-05-04',
    priority: 'normal',
    title: 'Overstay / Không hợp pháp — cách phát hiện và xử lý ngay',
    titleJp: 'オーバーステイ（不法滞在）への対応と救済手続き',
    icon: 'warning',
    color: '#E74C3C',
    description: 'Thủ tục khi bạn ở lại Nhật quá hạn visa. Không có thời gian "đệm" tự động — chỉ cần quá 1 ngày = bất hợp pháp. Tuy nhiên có 3 cách xử lý tùy tình huống.',
    whoIsThisFor: [
      'Người vừa phát hiện visa mình hết hạn rồi.',
      'Người nhập viện hoặc gặp sự cố nên quên gia hạn trong 2 tháng.',
      'Người muốn biết hậu quả và cách xử lý ngay để giảm thiệt hại.',
      'Người muốn hiểu quyền lợi và lựa chọn nếu bị bắt gặp.',
    ],
    whenToDo: [
      'Ngay khi phát hiện visa hết hạn — đừng chờ thêm ngày nào.',
      'Nếu nhập viện hoặc bệnh nặng: trong vòng 2 tháng từ ngày hết hạn, có thể xin biện pháp cứu trợ (救済措置).',
      'Nếu đã quá 2 tháng: hãy liên hệ ISA để hỏi xem có tùy chọn khác không.',
    ],
    whereToDo: [
      'ISA — cục công an nhập cảnh (出入国在留管理庁). Tìm cục gần nhất tại moj.go.jp.',
      'Gọi điện hoặc đến trực tiếp — nên đi trực tiếp để tìm hiểu tùy chọn.',
      'Không nên chờ sang ngày mai — hành động ngay hôm nay sẽ có lợi hơn.',
    ],
    estimatedTime: 'Nếu xin cứu trợ (救済措置): 1-4 tuần để xét duyệt (có thể được phép ở lại). Nếu tự ra nước ngoài qua 出国命令: ~1 tuần xử lý tại ISA, sau đó cấm nhập cảnh 1 năm.',
    commonMistakes: [
      'Chờ quá lâu mới tự khai báo — thay vì cấm nhập cảnh 1 năm, có thể bị 5 năm hoặc lâu hơn nếu bị bắt.',
      'Không biết có 救済措置 (rescue) nên vội tự rời Nhật mà không cần.',
      'Tiếp tục làm việc khi đã overstay — đây là vi phạm pháp luật thêm, bị phạt và xử lý nặng hơn.',
      'Che giấu tình trạng overstay từ bảo hiểm/ngân hàng — khi được phát hiện sẽ bị xử lý kép.',
      'Không hiểu sự khác biệt giữa 出国命令 (tự rời Nhật) và bị buộc rời — vội đi tự nguyện sai cách có thể mất lợi thế.',
    ],
    faq: [
      {
        question: 'Overstay 1 ngày cũng bị tính không?',
        answer: 'Đúng. Luật Nhật không có thời gian "đệm" — chỉ cần quá 1 ngày hết hạn = bất hợp pháp (不法滞在). Không có ngoại lệ trừ biện pháp cứu trợ (救済措置).',
      },
      {
        question: 'Biện pháp cứu trợ (救済措置) là gì?',
        answer: 'Là cơ chế cứu trợ: nếu bạn **quên** làm gia hạn lần cuối (最後の更新を忘れた) hoặc **nhập viện** khiến vượt quá hạn, trong vòng **2 tháng từ ngày hết hạn**, bạn có thể nộp đơn xin cứu trợ. ISA sẽ xem xét và có thể cấp phép ở lại hoặc gia hạn. Phải nộp trong 2 tháng — quá thời hạn này không được cứu trợ.',
      },
      {
        question: '出国命令 là gì? Có phải tốt không?',
        answer: '出国命令 (lệnh tự rời Nhật) là: nếu bạn **tự nguyện** ra nước ngoài sau khi bị overstay, ISA cho phép bạn rời Nhật một cách "tự nguyện" thay vì bị buộc đi. Khi đó, lệnh cấm nhập cảnh là 1 năm thay vì 5-10 năm (nếu bị bắt). Đây là lựa chọn tốt hơn nếu bạn phải rời Nhật.',
      },
      {
        question: 'Nếu overstay rồi bị bắt thì sao?',
        answer: 'Sẽ có: (1) cảnh báo / phạt tiền, (2) cấm nhập cảnh 5-10 năm hoặc lâu hơn, (3) bị buộc ra nước ngoài, (4) ghi vào hồ sơ pháp lý. Quá trình rất khó chịu và tốn kém. Vì vậy nên xử lý chủ động sớm.',
      },
      {
        question: 'Nếu quá 2 tháng rồi mới phát hiện thì sao?',
        answer: 'Liên hệ ISA ngay để hỏi. Biện pháp cứu trợ không áp dụng nữa, nhưng bạn vẫn có thể xin 出国命令 để rời Nhật tự nguyện với cấm nhập cảnh 1 năm. Tốt hơn là bị bắt rồi bị cấm 5-10 năm.',
      },
      {
        question: 'Tôi vừa phát hiện overstay hôm qua — bây giờ mới nộp rescue, có được không?',
        answer: 'Bạn vẫn có cơ hội vì mới phát hiện. Nộp ngay hôm nay (chưa quá 2 tháng từ ngày visa hết hạn), kèm bằng chứng tại sao quên (giấy xác nhận nhập viện, hóa đơn bệnh viện hoặc lý do chính đáng khác). ISA sẽ xem xét.',
      },
    ],
    officialLinks: [
      { label: 'ISA — Overstay & Rescue Measure', url: 'https://www.moj.go.jp/isa/' },
      { label: '出国命令制度 — Deportation Order System', url: 'https://www.moj.go.jp/isa/applications/procedures/' },
      { label: '在留特別許可 — Special Humanitarian Permission', url: 'https://www.moj.go.jp/isa/applications/procedures/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Phát hiện overstay — kiểm tra ngay visa hạn của bạn',
        description: 'Mở thẻ cư trú (在留カード) hoặc certificate of eligibility (COE) và kiểm tra **有効期限** (ngày hết hạn).\n\n**Nếu hôm nay sau ngày đó = overstay.**\n\nVí dụ:\n- Visa hết hạn: 2026-05-10\n- Hôm nay: 2026-05-15\n- Overstay: 5 ngày\n\nDù chỉ 1 ngày hay 100 ngày đều là **illegal**. Không có grace period.\n\n**Bây giờ có 3 tùy chọn:**\n1. Apply rescue measure (救済措置) — trong 2 tháng từ ngày hết hạn\n2. Apply 出国命令 (tự rời Nhật với entry ban 1 năm)\n3. Tiếp tục ở (rủi ro cao — có thể bị bắt)',
        documents: ['Thẻ cư trú hoặc COE để kiểm tra ngày hết hạn'],
        tip: 'Nếu không chắc ngày nào, kiểm tra 2 lần. Một khi xác nhận overstay, hành động ngay — không nên chờ thêm.',
      },
      {
        step: 2,
        title: 'Lựa chọn 1: Apply Rescue Measure (Nếu hợp đủ điều kiện)',
        description: '**Điều kiện để apply rescue:**\n- Quên làm gia hạn lần cuối (最後の更新を忘れた)\n- Hoặc bệnh nặng/nhập viện khiến không kịp làm gia hạn\n- Hoặc sự cố lớn (tai nạn, thảm họa, v.v.)\n- **Trong vòng 2 tháng từ ngày hết hạn**\n\n**Nộp tại ISA:**\n- Đơn xin rescue (在留期間更新許可申請) — tải từ ISA website\n- Hộ chiếu + thẻ cư trú\n- Giấy chứng minh lý do (ví dụ: giấy xác nhận từ bệnh viện, hóa đơn, lý do giải trình)\n- Lý do giải trình rõ ràng (理由書) — viết tay: \"Tôi quên không nhận ra visa hết hạn vì [lý do]. Tôi xin cứu trợ.\"\n\n**Kết quả:**\n- Nếu được phê duyệt: gia hạn được cấp phép, bạn ở lại Nhật bình thường\n- Nếu từ chối: sẽ được thông báo, lúc đó bạn chuyển sang tùy chọn 2',
        documents: ['Đơn xin rescue (in từ ISA website)', 'Hộ chiếu', 'Thẻ cư trú', 'Giấy chứng minh lý do', 'Lý do giải trình (理由書)'],
        tip: 'Rescue measure là cứu cánh — nộp ngay nếu hợp điều kiện. Không nên chờ quá 2 tháng vì quá hạn sẽ không còn tùy chọn tốt này.',
      },
      {
        step: 3,
        title: 'Lựa chọn 2: Apply 出国命令 (Tự rời Nhật)',
        description: '**Điều kiện:**\n- Đã overstay (dù quá 2 tháng hay không)\n- Muốn tự rời Nhật để giảm hình phạt\n\n**Nộp tại ISA:**\n- Bút điều trần (陳述) hoặc nói chuyện trực tiếp với ISA\n- Hộ chiếu + thẻ cư trú\n- Nói rõ: \"Tôi biết tôi overstay. Tôi muốn áp dụng 出国命令 để tự rời Nhật\"\n\n**Quá trình:**\n- ISA sẽ xác nhận tình trạng overstay và hồ sơ\n- Cấp thẻ 出国準備期間 (chuẩn bị rời Nhật) — thường 4-8 tuần\n- Trong thời gian này, bạn chuẩn bị rời (xin thôi việc, trả nhà, v.v.)\n- Khi sẵn sàng, đến sân bay hoặc cảng, nộp giấy tờ ra nước ngoài\n- Entry ban: **1 năm** (短期入国禁止)\n\n**Hậu quả:**\n- Cấm nhập cảnh 1 năm (có thể xin miễn lệnh sau 1 năm)\n- Không có hình phạt tiền hoặc tù\n- Tốt hơn bị bắt (5-10 năm ban)',
        documents: ['Hộ chiếu', 'Thẻ cư trú', 'Giấy xác nhận overstay từ ISA hoặc xác nhận từ người phát hiện'],
        tip: 'Nếu đã quá 2 tháng hoặc rescue bị từ chối, 出国命令 là tùy chọn tốt nhất — tự rời sẽ nhẹ hơn bị bắt nhiều.',
      },
      {
        step: 4,
        title: 'Lựa chọn 3: 在留特別許可 (Ở lại với phép đặc biệt — hiếm)',
        description: '**Điều kiện rất khắt khe:**\n- Kết hôn với người Nhật hoặc có con Nhật\n- Hoặc bệnh nặng cần chữa trị dài hạn tại Nhật\n- Hoặc sự cố nhân đạo lớn (ví dụ: vợ/chồng mất, gia đình phụ thuộc)\n\n**Quy trình:**\n- Không phải \"apply\" bình thường — ISA xem xét từng trường hợp riêng\n- Nộp đơn kèm bằng chứng nhân đạo (giấy kết hôn, hóa đơn bệnh viện, hành chứng gia đình)\n- ISA sẽ phỏng vấn, điều tra tính chân thực\n- Quyết định rất khó — chỉ được duyệt nếu ISA thống nhất\n\n**Không nên coi 在留特別許可 là cứu cánh** — tỷ lệ duyệt rất thấp ngoài những trường hợp lý do cực kỳ nhân đạo.',
        documents: ['Giấy chứng minh nhân đạo (kết hôn, con, bệnh, v.v.)', 'Bằng chứng ISA có thể xác minh'],
        tip: 'Đừng chọn tùy chọn này trừ khi bạn thực sự có lý do nhân đạo mạnh mẽ. ISA sẽ xem xét rất kỹ lưỡng.',
      },
      {
        step: 5,
        title: 'Sau khi xử lý — chuẩn bị cho tương lai',
        description: '**Nếu được rescue (tùy chọn 1):**\n- Bạn ở lại Nhật bình thường\n- Cần chuẩn bị tài liệu để gia hạn lần tiếp theo (không nên quên lần nữa!)\n- Set alarm hoặc lịch nhắc nhở 3 tháng trước ngày hết hạn\n\n**Nếu apply 出国命令 (tùy chọn 2):**\n- Chuẩn bị rời Nhật trong 出国準備期間 (4-8 tuần)\n- Xin thôi việc, trả nhà, chuyển hàng\n- Thanh toán thuế, bảo hiểm, tài khoản ngân hàng cuối cùng\n- Sau khi về Việt Nam, ban 1 năm sẽ được gỡ bỏ tự động — có thể quay lại Nhật sau 1 năm nếu muốn\n\n**Nếu apply 在留特別許可 (tùy chọn 3):**\n- Đợi ISA xét duyệt — có thể mất vài tháng\n- Chuẩn bị cho khả năng bị từ chối (lên kế hoạch B)',
        documents: [],
        tip: 'Bất kể xử lý bằng cách nào, sau này nếu muốn quay lại Nhật, hãy tuân thủ quy định một cách nghiêm túc — không muốn lặp lại overstay.',
      },
    ],
  };

export default overstayingIllegalStayProcedures;
