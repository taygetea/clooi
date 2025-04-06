import ChatClient from './ChatClient.js';

const GEMINI_MODEL_INFO = {
    default: {
        contextLength: 1000000,
        vision: true,
        maxResponseTokens: 10000,
    },
    'gemini-2.5-pro-exp-03-25': {
        contextLength:1000000,
        vision: true,
        maxResponseTokens: 10000
    }
};

const GEMINI_PARTICIPANTS = {
    bot: {
        display: 'Gemini',
        author: 'assistant',
        defaultMessageType: 'message',
    },
};

const GEMINI_DEFAULT_MODEL_OPTIONS = {
    model: 'gemini-2.5-pro-exp-03-25',
    max_tokens: 4096,
    temperature: 1,
    stream: true,
};

export default class GeminiClient extends ChatClient {
    constructor(options = {}) {
        // options.cache.namespace = options.cache.namespace || options.modelOptions?.model || 'claude';
        super(options);
        this.apiKey = process.env.GEMINI_API_KEY || '';
        this.completionsUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
        this.isChatGptModel = true;
        this.modelOptions = GEMINI_DEFAULT_MODEL_OPTIONS;
        this.participants = GEMINI_PARTICIPANTS;
        this.modelInfo = GEMINI_MODEL_INFO;
        this.setOptions(options);
    }

    buildApiParams(userMessage = null, previousMessages = [], systemMessage = null) {
        const history = [
            ...systemMessage ? [systemMessage] : [],
            ...previousMessages,
            ...userMessage ? [userMessage] : [],
        ];
        const messages = history.map(msg => this.toAPImessage(msg));
        return {
            messages,
        };
    }
}
