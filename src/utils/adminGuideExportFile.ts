import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';

export interface AdminGuideExportFileResult {
  uri: string;
  sharedAsFile: boolean;
}

export async function saveAndShareAdminGuideHtml(
  fileName: string,
  html: string
): Promise<AdminGuideExportFileResult> {
  const file = new File(Paths.cache, fileName);
  file.create({ overwrite: true });
  file.write(html);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, {
      mimeType: 'text/html',
      UTI: 'public.html',
      dialogTitle: 'Lưu file thủ tục',
    });
    return { uri: file.uri, sharedAsFile: true };
  }

  await Share.share({
    title: fileName,
    message: html,
  });

  return { uri: file.uri, sharedAsFile: false };
}
