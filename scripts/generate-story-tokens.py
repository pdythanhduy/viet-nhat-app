#!/usr/bin/env python3
# Simple script to generate token data for story sentences
# This is a minimal version - for production, use kuromoji or similar

import json
from datetime import datetime

# Hardcoded vocabulary mapping (subset)
VOCAB = {
    '私': {'reading': 'わたし', 'meaning': 'tôi'},
    'は': {'reading': 'は', 'meaning': '(particle)'},
    '毎日': {'reading': 'まいにち', 'meaning': 'mỗi ngày'},
    '学校': {'reading': 'がっこう', 'meaning': 'trường học'},
    'に': {'reading': 'に', 'meaning': '(particle)'},
    '行きます': {'reading': 'いきます', 'meaning': 'đi'},
    '友達': {'reading': 'ともだち', 'meaning': 'bạn bè'},
    'と': {'reading': 'と', 'meaning': '(particle)'},
    '一緒': {'reading': 'いっしょ', 'meaning': 'cùng nhau'},
    '勉強': {'reading': 'べんきょう', 'meaning': 'học tập'},
    'します': {'reading': 'します', 'meaning': 'làm'},
    '。': {'reading': '', 'meaning': '(punctuation)'},
}

def create_token(word, token_id, sent_id, order):
    vocab = VOCAB.get(word, {'reading': '', 'meaning': word})
    return {
        'id': token_id,
        'sentenceId': sent_id,
        'order': order,
        'word': word,
        'reading': vocab['reading'],
        'pos': 'NOUN' if word in ['私', '友達', '学校'] else 'PARTICLE' if word in ['は', 'に', 'と', '。'] else 'VERB',
        'meaning': vocab['meaning'],
        'jlptLevel': 'N5'
    }

# Simple tokenization (split on characters/words)
def tokenize_simple(text):
    # This is very basic - just split by spaces or use a simple list
    # Example for "私は毎日学校に行きます。"
    words = ['私', 'は', '毎日', '学校', 'に', '行きます', '。']
    return words

# Example output
print("Script for generating story tokens - manual process for demo")
print("For production use, integrate kuromoji or similar tokenizer")

# Save example token structure
example = {
    'id': 'sent-002-001',
    'paragraphId': 'para-002-001',
    'order': 1,
    'text': '私は毎日学校に行きます。',
    'translation': 'Tôi đi học mỗi ngày.',
    'tokens': [
        create_token('私', 't1', 'sent-002-001', 1),
        create_token('は', 't2', 'sent-002-001', 2),
        create_token('毎日', 't3', 'sent-002-001', 3),
        create_token('学校', 't4', 'sent-002-001', 4),
        create_token('に', 't5', 'sent-002-001', 5),
        create_token('行きます', 't6', 'sent-002-001', 6),
        create_token('。', 't7', 'sent-002-001', 7),
    ]
}

print(json.dumps(example, ensure_ascii=False, indent=2))
