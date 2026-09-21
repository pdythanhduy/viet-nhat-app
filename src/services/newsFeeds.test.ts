import { NEWS_FEEDS, formatTimeAgo, parseRss } from './newsFeeds';

const feed = (id: string) => NEWS_FEEDS.find((f) => f.id === id)!;

describe('parseRss', () => {
  it('parses Dân trí items (CDATA description with image)', () => {
    const xml = `<rss><channel><item>
      <title>Tiêu đề &amp; thử</title>
      <pubDate>Mon, 21 Sep 2026 08:34:29 +0700</pubDate>
      <link>https://dantri.com.vn/a.htm</link>
      <description><![CDATA[<a href='x'/><img src='https://icdn.dantri.com.vn/a.jpg'/></a></br>(Dân trí) - Nội dung tóm tắt.]]></description>
    </item></channel></rss>`;
    const [item] = parseRss(xml, feed('dantri'));
    expect(item.title).toBe('Tiêu đề & thử');
    expect(item.link).toBe('https://dantri.com.vn/a.htm');
    expect(item.imageUrl).toBe('https://icdn.dantri.com.vn/a.jpg');
    expect(item.summary).toContain('Nội dung tóm tắt.');
    expect(item.publishedAt).toBe(Date.parse('2026-09-21T08:34:29+07:00'));
  });

  it('maps Yahoo pickup links to the full article URL via <comments>', () => {
    const xml = `<rss><channel><item>
      <title>台風が関東接近</title>
      <link>https://news.yahoo.co.jp/pickup/6595997?source=rss</link>
      <pubDate>Mon, 21 Sep 2026 02:35:48 GMT</pubDate>
      <comments>https://news.yahoo.co.jp/articles/f96fd3c424dec4889b3059990f1de24fad21a6fd/comments</comments>
    </item></channel></rss>`;
    const [item] = parseRss(xml, feed('yahoo-top'));
    expect(item.link).toBe('https://news.yahoo.co.jp/articles/f96fd3c424dec4889b3059990f1de24fad21a6fd');
    expect(item.summary).toBeNull();
  });

  it('skips items without title or link', () => {
    const xml = '<rss><channel><item><title>Only title</title></item></channel></rss>';
    expect(parseRss(xml, feed('24h'))).toEqual([]);
  });
});

describe('formatTimeAgo', () => {
  const now = Date.parse('2026-09-21T12:00:00Z');
  it('formats minutes, hours and days', () => {
    expect(formatTimeAgo(now - 5 * 60000, now)).toBe('5 phút trước');
    expect(formatTimeAgo(now - 3 * 3600000, now)).toBe('3 giờ trước');
    expect(formatTimeAgo(now - 50 * 3600000, now)).toBe('2 ngày trước');
    expect(formatTimeAgo(null, now)).toBe('');
  });
});
