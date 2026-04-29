import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  accentColor?: string;
}

type Block =
  | { type: 'text'; content: string }
  | { type: 'table'; rows: string[][] };

function parseBlocks(text: string): Block[] {
  const lines = text.split('\n');
  const blocks: Block[] = [];
  let textLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('|')) {
      if (textLines.length > 0) {
        const joined = textLines.join('\n').trimEnd();
        if (joined) blocks.push({ type: 'text', content: joined });
        textLines = [];
      }
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const last = blocks[blocks.length - 1];
      if (last?.type === 'table') {
        last.rows.push(cells);
      } else {
        blocks.push({ type: 'table', rows: [cells] });
      }
    } else {
      textLines.push(line);
    }
  }
  if (textLines.length > 0) {
    const joined = textLines.join('\n').trimEnd();
    if (joined) blocks.push({ type: 'text', content: joined });
  }
  return blocks;
}

function isSeparator(cells: string[]): boolean {
  return cells.every((c) => /^:?-+:?$/.test(c));
}

export function RichInline({ text, style }: { text: string; style?: StyleProp<TextStyle> }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) {
    return <Text style={style}>{text}</Text>;
  }
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <Text key={i} style={styles.bold}>
            {part.slice(2, -2)}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}

export default function RichText({ text, textStyle, containerStyle, accentColor }: Props) {
  const blocks = parseBlocks(text);
  const headerColor = accentColor ?? Colors.primary;

  return (
    <View style={containerStyle}>
      {blocks.map((block, i) => {
        if (block.type === 'text') {
          return (
            <RichInline
              key={i}
              text={block.content}
              style={[styles.defaultText, textStyle, i > 0 && styles.blockSpacing]}
            />
          );
        }

        const dataRows = block.rows.filter((row) => !isSeparator(row));
        if (dataRows.length === 0) return null;
        const [header, ...body] = dataRows;
        const colCount = header.length;

        return (
          <View key={i} style={[styles.table, i > 0 && styles.blockSpacing]}>
            <View style={[styles.tableRow, { backgroundColor: headerColor + '12' }]}>
              {header.map((cell, j) => (
                <View
                  key={j}
                  style={[styles.tableCell, j < colCount - 1 && styles.cellDivider]}
                >
                  <Text style={[styles.headerCell, { color: headerColor }]}>{cell}</Text>
                </View>
              ))}
            </View>
            {body.map((row, ri) => (
              <View
                key={ri}
                style={[styles.tableRow, styles.tableBodyRow]}
              >
                {row.map((cell, ci) => (
                  <View
                    key={ci}
                    style={[styles.tableCell, ci < colCount - 1 && styles.cellDivider]}
                  >
                    <Text style={styles.bodyCell}>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  blockSpacing: {
    marginTop: 8,
  },
  bold: {
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  table: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableBodyRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cellDivider: {
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'BeVietnamPro_700Bold',
    lineHeight: 16,
  },
  bodyCell: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
