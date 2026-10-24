# Syntiox Guard Test Repository

This repository is used to test **Syntiox Guard** (`https://git.syntiox.top`) autonomous GitHub App features:
- Smart PR Summarizer & Labeler
- Secret & API Key Guardian
- Auto-Doc & README Updater
- First-Time Contributor Welcomer

## Features & Modules

- **Webhook Verifier (`src/webhookVerifier.js`)**: Provides timing-safe HMAC-SHA256 payload verification to securely authenticate incoming webhook requests.
- **Event Dispatcher (src/eventDispatcher.js)**: Webhook event router.
