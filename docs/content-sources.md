# Question Bank Source Inventory

This app uses public sources to write original practice questions. Do not copy certification exam questions or course quiz questions verbatim unless the licence explicitly allows reuse.

## Canonical Anthropic Sources

- Claude API docs home: https://platform.claude.com/docs/en/home
- Messages API: https://platform.claude.com/docs/en/api/messages
- Tool use overview: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
- Define tools: https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools
- Strict tool use: https://platform.claude.com/docs/en/agents-and-tools/tool-use/strict-tool-use
- Structured outputs: https://platform.claude.com/docs/en/build-with-claude/structured-outputs
- Prompt engineering overview: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
- Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-best-practices
- Define success and build evaluations: https://platform.claude.com/docs/en/build-with-claude/test-and-evaluate/define-success
- Context windows: https://platform.claude.com/docs/en/build-with-claude/context-windows
- Prompt caching: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- Rate limits and errors: https://platform.claude.com/docs/en/api/rate-limits
- Claude Code memory: https://code.claude.com/docs/en/memory
- Claude Code overview: https://code.claude.com/docs/en/overview
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Code hooks: https://code.claude.com/docs/en/hooks

## Public Learning Sources

- Anthropic Academy course catalogue: https://anthropic.skilljar.com/
- Anthropic prompt engineering tutorial: https://github.com/anthropics/prompt-eng-interactive-tutorial
- Anthropic Claude cookbooks: https://github.com/anthropics/claude-cookbooks
- Community study guide: https://github.com/paullarionov/claude-certified-architect

## Additional Provider And Standards Sources

Use these sources to keep the bank balanced across provider-specific implementation details and provider-neutral architecture principles.

### OpenAI

- Agents SDK: https://developers.openai.com/api/docs/guides/agents
- Function calling: https://developers.openai.com/api/docs/guides/function-calling
- Structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Prompt engineering: https://developers.openai.com/api/docs/guides/prompt-engineering
- Working with evals: https://developers.openai.com/api/docs/guides/evals
- OpenAI Cookbook: https://cookbook.openai.com/
- Cookbook agents topic: https://developers.openai.com/cookbook/topic/agents
- Cookbook evals topic: https://developers.openai.com/cookbook/topic/evals
- Cookbook guardrails topic: https://developers.openai.com/cookbook/topic/guardrails
- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- Codex subagents: https://developers.openai.com/codex/concepts/subagents
- Codex MCP: https://developers.openai.com/codex/mcp

### Google

- Gemini function calling: https://ai.google.dev/gemini-api/docs/function-calling
- Gemini structured outputs: https://ai.google.dev/gemini-api/docs/structured-output
- Gemini grounding with Google Search: https://ai.google.dev/gemini-api/docs/google-search

### Microsoft

- AI agent orchestration patterns: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
- Microsoft Foundry Agent Service: https://learn.microsoft.com/en-us/azure/foundry/agents/overview
- Semantic Kernel Agent Framework: https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/

### AWS

- Amazon Bedrock Agents: https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html
- Amazon Bedrock Guardrails: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html

### Standards, Frameworks, And Security

- Agent Skills overview: https://agentskills.io/home
- Agent Skills specification: https://agentskills.io/specification
- Agent Skills quickstart: https://agentskills.io/skill-creation/quickstart
- Agent Skills best practices: https://agentskills.io/skill-creation/best-practices
- Agent Skills optimizing descriptions: https://agentskills.io/skill-creation/optimizing-descriptions
- Agent Skills evaluating skills: https://agentskills.io/skill-creation/evaluating-skills
- Model Context Protocol introduction: https://modelcontextprotocol.io/docs/getting-started/intro
- Model Context Protocol tools specification: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
- LangGraph overview: https://docs.langchain.com/oss/python/langgraph/overview
- OWASP Top 10 for LLMs and Gen AI Apps 2025: https://genai.owasp.org/llm-top-10/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

## Authoring Rules

- Each question must cite at least one public source.
- Explanations should teach the design principle, not only name the correct answer.
- Distractors should be plausible architect mistakes.
- Prefer scenario questions for applied and scenario difficulty.
- Prefer provider-neutral principles when a topic appears in multiple ecosystems, then cite provider docs as concrete implementations.
- Keep provider-specific facts in questions only when the source is stable enough for learners to inspect later.
- Keep all question content original to this repository.
