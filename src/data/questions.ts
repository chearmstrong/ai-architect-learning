import type { Question } from "../domain/types";

export const questions: Question[] = [
  {
    id: "agent-architecture-001",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt:
      "A coordinator delegates document analysis to three specialised subagents. What is the safest way to give each subagent the context it needs?",
    choices: [
      {
        id: "a",
        text: "Pass the relevant document text, prior findings, and output requirements explicitly in each subagent task.",
      },
      { id: "b", text: "Assume every subagent can read the coordinator's full conversation history." },
      { id: "c", text: "Ask subagents to infer missing requirements from their names." },
      { id: "d", text: "Store hidden shared state outside the task prompts." },
    ],
    correctChoiceId: "a",
    explanation:
      "Subagents should receive the context they need explicitly. That keeps delegation observable and avoids relying on hidden or unavailable state.",
    choiceExplanations: {
      a: "Correct. Explicit context passing makes the task reproducible and auditable.",
      b: "Incorrect. Isolated agent contexts should not be assumed to inherit the coordinator history.",
      c: "Incorrect. Agent names are not a reliable substitute for task requirements.",
      d: "Incorrect. Hidden shared state makes behaviour harder to test and review.",
    },
    sources: [
      {
        title: "Claude docs: Intro to Claude",
        url: "https://platform.claude.com/docs/en/intro",
      },
    ],
  },
  {
    id: "tool-mcp-001",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A Claude integration has two similar tools, `search_customer` and `lookup_order`. What most directly reduces incorrect tool selection?",
    choices: [
      {
        id: "a",
        text: "Write distinct tool descriptions that explain when each tool should be used and what it returns.",
      },
      { id: "b", text: "Give both tools short descriptions so the model has less context to process." },
      { id: "c", text: "Hide input constraints and validate only after execution." },
      { id: "d", text: "Use the same schema for every tool so selection is uniform." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tool descriptions are a primary signal for tool choice. Distinct descriptions with usage guidance reduce ambiguity between overlapping tools.",
    choiceExplanations: {
      a: "Correct. Clear descriptions help the model choose the right tool.",
      b: "Incorrect. Overly terse descriptions increase ambiguity.",
      c: "Incorrect. Input constraints should be visible before the tool call.",
      d: "Incorrect. Uniform schemas do not explain semantic differences between tools.",
    },
    sources: [
      {
        title: "Claude docs: Tool use",
        url: "https://platform.claude.com/docs/en/build-with-claude/tool-use",
      },
    ],
  },
  {
    id: "structured-output-001",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt:
      "For an extraction workflow where some fields may be absent, which schema design best reduces fabrication?",
    choices: [
      { id: "a", text: "Make absent fields nullable and reserve required fields for data that is always available." },
      { id: "b", text: "Mark every field required so the model always returns complete JSON." },
      { id: "c", text: "Avoid schemas and ask for JSON in prose." },
      { id: "d", text: "Use free-text fields for all values." },
    ],
    correctChoiceId: "a",
    explanation:
      "Nullable fields allow the model to represent missing information directly instead of guessing. Required fields should be used only when the data is always present.",
    choiceExplanations: {
      a: "Correct. Nullable optional data supports honest absence.",
      b: "Incorrect. Required unavailable fields pressure the model to invent values.",
      c: "Incorrect. Prose JSON instructions are weaker than schema-constrained output.",
      d: "Incorrect. Free-text fields lose validation and increase ambiguity.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "context-reliability-001",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A long-running support conversation accumulates large tool results. What should the architect do first to reduce context pressure?",
    choices: [
      { id: "a", text: "Return only fields the model needs and summarise older conversation state carefully." },
      { id: "b", text: "Append every raw API response forever." },
      { id: "c", text: "Remove the system prompt after the first turn." },
      { id: "d", text: "Ask the user to repeat all key facts each time." },
    ],
    correctChoiceId: "a",
    explanation:
      "Context includes tool results, system instructions, and message history. Reducing unnecessary tool output and carefully preserving important state lowers context pressure.",
    choiceExplanations: {
      a: "Correct. Smaller tool results and careful summarisation preserve useful context.",
      b: "Incorrect. Raw responses can quickly waste context.",
      c: "Incorrect. System instructions remain important across turns.",
      d: "Incorrect. The app should manage context rather than shifting that burden to the user.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "claude-code-001",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "A team wants shared Claude Code instructions for a repository. Where should those instructions live?",
    choices: [
      {
        id: "a",
        text: "In a repository-level CLAUDE.md or project Claude configuration committed with the code.",
      },
      { id: "b", text: "Only in one developer's home-directory configuration." },
      { id: "c", text: "Only in the pull request description." },
      { id: "d", text: "In an untracked local note." },
    ],
    correctChoiceId: "a",
    explanation:
      "Shared project instructions should live with the repository so all contributors and agent sessions can use the same guidance.",
    choiceExplanations: {
      a: "Correct. Repository-level instructions are shared and reviewable.",
      b: "Incorrect. User-level configuration is personal and not shared with the team.",
      c: "Incorrect. Pull request descriptions are not persistent project instructions.",
      d: "Incorrect. Untracked notes are invisible to other contributors.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "agent-architecture-002",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A customer-support agent can search tickets, update accounts, and issue refunds. Which architecture best reduces risk before allowing refund actions?",
    choices: [
      { id: "a", text: "Separate read-only lookup tools from state-changing tools and require explicit confirmation for refund execution." },
      { id: "b", text: "Expose one broad `manage_customer` tool that can perform every support action." },
      { id: "c", text: "Let the model decide whether refunds are sensitive based only on the user's tone." },
      { id: "d", text: "Hide refund capability inside the ticket search tool to simplify the tool list." },
    ],
    correctChoiceId: "a",
    explanation:
      "Architectures should make sensitive actions explicit, constrained, and reviewable. Separating read and write capabilities reduces accidental or over-broad tool use.",
    choiceExplanations: {
      a: "Correct. Clear capability boundaries and confirmation points reduce the blast radius of state-changing tools.",
      b: "Incorrect. A broad tool hides risk and gives the model more authority than the task requires.",
      c: "Incorrect. Sensitivity should be designed into the workflow, not inferred from sentiment.",
      d: "Incorrect. Hidden side effects make tool behaviour harder to audit and test.",
    },
    sources: [
      {
        title: "Claude docs: Tool use overview",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
      },
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "agent-architecture-003",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "A planner agent delegates research and drafting to subagents. What should the planner preserve to make the final answer auditable?",
    choices: [
      { id: "a", text: "The task given to each subagent, the evidence returned, and how those findings affected the final answer." },
      { id: "b", text: "Only the final answer, because intermediate work is implementation detail." },
      { id: "c", text: "Only the names of the subagents, because their names describe their responsibilities." },
      { id: "d", text: "A private scratchpad that cannot be shown to users or developers." },
    ],
    correctChoiceId: "a",
    explanation:
      "Delegated workflows are easier to review when the coordinator records task boundaries, evidence, and synthesis decisions.",
    choiceExplanations: {
      a: "Correct. This preserves enough traceability to inspect whether delegation was appropriate.",
      b: "Incorrect. The final answer alone does not show whether the workflow used reliable evidence.",
      c: "Incorrect. Names are not a substitute for concrete task instructions and outputs.",
      d: "Incorrect. Unavailable private state weakens observability and reproducibility.",
    },
    sources: [
      {
        title: "Claude Code docs: Subagents",
        url: "https://code.claude.com/docs/en/sub-agents",
      },
    ],
  },
  {
    id: "agent-architecture-004",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A document-review workflow often exceeds context limits after many tool calls. Which design is most appropriate?",
    choices: [
      { id: "a", text: "Summarise durable findings, clear or compact stale tool results, and keep source references for claims." },
      { id: "b", text: "Keep every raw tool result in context so no information is ever removed." },
      { id: "c", text: "Drop the oldest user requirements first because tool output is always more reliable." },
      { id: "d", text: "Increase max output tokens and leave input context unchanged." },
    ],
    correctChoiceId: "a",
    explanation:
      "Long-running agent workflows need context curation. Durable summaries and source references preserve useful state while reducing token pressure.",
    choiceExplanations: {
      a: "Correct. It keeps important state while removing low-value context.",
      b: "Incorrect. Raw accumulation increases context pressure and can reduce recall quality.",
      c: "Incorrect. User requirements are often the highest-priority context.",
      d: "Incorrect. Output budget does not solve an overloaded input context.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "agent-architecture-005",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "A team wants an agent to decide when it has enough information to act. Which behaviour should the architect encourage for ambiguous requests?",
    choices: [
      { id: "a", text: "Ask a focused clarification question before using tools or making irreversible changes." },
      { id: "b", text: "Guess the missing parameters to keep the workflow fast." },
      { id: "c", text: "Call every available tool and infer the user's intent afterward." },
      { id: "d", text: "Return a refusal whenever any detail is missing." },
    ],
    correctChoiceId: "a",
    explanation:
      "Clarification is the right response when missing information materially affects the action. It avoids unsafe guesses without blocking valid work.",
    choiceExplanations: {
      a: "Correct. Targeted clarification improves reliability and user control.",
      b: "Incorrect. Guessing can produce incorrect or unsafe actions.",
      c: "Incorrect. Broad tool use can waste context, increase latency, and leak unnecessary data.",
      d: "Incorrect. Missing details usually call for clarification, not a blanket refusal.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "agent-architecture-006",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt:
      "Why is a narrow tool interface usually better than a general-purpose tool for an agentic workflow?",
    choices: [
      { id: "a", text: "It makes valid actions clearer and limits unintended behaviour." },
      { id: "b", text: "It prevents the model from needing any system prompt." },
      { id: "c", text: "It guarantees the model will never make a reasoning error." },
      { id: "d", text: "It removes the need to validate tool inputs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Narrow tools express intent and constraints directly. They do not remove the need for prompts, validation, or evaluation, but they reduce ambiguity.",
    choiceExplanations: {
      a: "Correct. Tool boundaries are part of the workflow's safety and reliability design.",
      b: "Incorrect. System and developer instructions still matter.",
      c: "Incorrect. Interface design reduces risk but cannot guarantee perfect reasoning.",
      d: "Incorrect. Inputs still need schema validation and application checks.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "tool-mcp-002",
    domain: "tool-mcp",
    difficulty: "foundation",
    prompt: "In MCP terminology, which primitive should expose an action Claude can choose to invoke?",
    choices: [
      { id: "a", text: "A tool." },
      { id: "b", text: "A resource." },
      { id: "c", text: "A prompt." },
      { id: "d", text: "A transcript." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP tools represent callable actions. Resources expose contextual data, and prompts provide reusable prompt templates.",
    choiceExplanations: {
      a: "Correct. Tools are the MCP primitive for actions.",
      b: "Incorrect. Resources provide data or context rather than executable actions.",
      c: "Incorrect. Prompts package reusable instructions, not arbitrary actions.",
      d: "Incorrect. A transcript is conversation history, not an MCP primitive.",
    },
    sources: [
      {
        title: "Anthropic Academy: Intro to Model Context Protocol",
        url: "https://anthropic.skilljar.com/",
      },
    ],
  },
  {
    id: "tool-mcp-003",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A tool requires `customer_id` and an optional `include_orders` flag. Which schema design is best?",
    choices: [
      { id: "a", text: "Declare `customer_id` as required, type the flag as boolean, and describe the flag's effect." },
      { id: "b", text: "Accept one free-form string and parse both values from it later." },
      { id: "c", text: "Mark every field optional so the model has maximum flexibility." },
      { id: "d", text: "Use vague property names like `value1` and `value2` to keep the schema generic." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tool input schemas should expose the parameters the tool needs, with accurate types and descriptions that help Claude provide valid inputs.",
    choiceExplanations: {
      a: "Correct. Required fields, precise types, and descriptions improve tool-call reliability.",
      b: "Incorrect. Free-form parsing weakens validation and increases ambiguity.",
      c: "Incorrect. Required fields should be marked required when the tool cannot run without them.",
      d: "Incorrect. Generic names make it harder for the model to map user intent to inputs.",
    },
    sources: [
      {
        title: "Claude docs: Define tools",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools",
      },
    ],
  },
  {
    id: "tool-mcp-004",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A travel assistant needs flight search and hotel search. What is the best reason to keep these as separate tools?",
    choices: [
      { id: "a", text: "The required inputs, returned data, and invocation conditions differ." },
      { id: "b", text: "Claude can only use one tool per application." },
      { id: "c", text: "Separate tools remove the need for source citations." },
      { id: "d", text: "Tool names are ignored, so separation is only cosmetic." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tools should map to distinct capabilities with clear descriptions and schemas. Different actions usually deserve separate interfaces.",
    choiceExplanations: {
      a: "Correct. Distinct capabilities are easier for Claude to select and call correctly.",
      b: "Incorrect. Claude can work with multiple tools.",
      c: "Incorrect. Tool design does not remove evidence or citation requirements.",
      d: "Incorrect. Tool names and descriptions are important selection signals.",
    },
    sources: [
      {
        title: "Claude docs: Tool use overview",
        url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview",
      },
    ],
  },
  {
    id: "tool-mcp-005",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "When should an architect consider strict tool use or structured output constraints?",
    choices: [
      { id: "a", text: "When downstream code depends on valid JSON or schema-compliant tool inputs." },
      { id: "b", text: "Only when the app has no automated tests." },
      { id: "c", text: "Whenever prose output would be more readable to a human." },
      { id: "d", text: "Only for prompts that do not use tools." },
    ],
    correctChoiceId: "a",
    explanation:
      "Strict schemas are useful when application code needs reliable structure. They complement tests and tool design rather than replacing them.",
    choiceExplanations: {
      a: "Correct. Schema constraints protect downstream parsing and tool execution paths.",
      b: "Incorrect. Tests are still needed even with schema constraints.",
      c: "Incorrect. Human readability is not the primary reason for strict schemas.",
      d: "Incorrect. Structured outputs and strict tool use can be used in agentic workflows.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "tool-mcp-006",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A filesystem MCP server exposes file reads and writes. Which production concern should be handled first?",
    choices: [
      { id: "a", text: "Restrict accessible paths and require clear authorization for write operations." },
      { id: "b", text: "Let the model read any path so it can discover context automatically." },
      { id: "c", text: "Combine read and write into one unconstrained tool for speed." },
      { id: "d", text: "Disable tool descriptions so users cannot see capabilities." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP servers that touch local or external systems need explicit capability boundaries, especially around destructive or sensitive operations.",
    choiceExplanations: {
      a: "Correct. Path scoping and write authorization reduce security and reliability risk.",
      b: "Incorrect. Broad file access can expose unrelated or sensitive data.",
      c: "Incorrect. Combining capabilities obscures risk and weakens control.",
      d: "Incorrect. Hidden capabilities make review and correct tool selection harder.",
    },
    sources: [
      {
        title: "Anthropic Academy: Model Context Protocol advanced topics",
        url: "https://anthropic.skilljar.com/",
      },
    ],
  },
  {
    id: "claude-code-002",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A repository has repeated build and test instructions that every Claude Code session should know. What is the best place to document them?",
    choices: [
      { id: "a", text: "A project-level `CLAUDE.md` committed with the repository." },
      { id: "b", text: "A private chat message in one previous session." },
      { id: "c", text: "A local-only file that is intentionally untracked." },
      { id: "d", text: "The package lockfile." },
    ],
    correctChoiceId: "a",
    explanation:
      "Project-level Claude Code memory gives future sessions shared, reviewable instructions such as commands, conventions, and layout notes.",
    choiceExplanations: {
      a: "Correct. Shared repository instructions are visible to the team and loaded for the project.",
      b: "Incorrect. Prior chat context is not a reliable project instruction source.",
      c: "Incorrect. Local-only notes are not shared with collaborators.",
      d: "Incorrect. Lockfiles are dependency metadata, not agent instructions.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "claude-code-003",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A large codebase has independent frontend, backend, and data-model investigation tasks. How can Claude Code keep the main conversation focused?",
    choices: [
      { id: "a", text: "Delegate independent investigations to specialised subagents with explicit tasks and expected outputs." },
      { id: "b", text: "Ask one subagent to inspect everything without a task boundary." },
      { id: "c", text: "Paste every file into the main conversation before deciding what matters." },
      { id: "d", text: "Avoid subagents because they cannot be given instructions." },
    ],
    correctChoiceId: "a",
    explanation:
      "Subagents are useful for scoped, independent work. Clear task prompts and expected outputs help preserve focus and reduce context overload.",
    choiceExplanations: {
      a: "Correct. Scoped delegation keeps the coordinator focused while preserving useful findings.",
      b: "Incorrect. Unbounded delegation makes findings noisy and harder to trust.",
      c: "Incorrect. Loading everything into the main context wastes tokens.",
      d: "Incorrect. Subagents can be given explicit task instructions.",
    },
    sources: [
      {
        title: "Claude Code docs: Subagents",
        url: "https://code.claude.com/docs/en/sub-agents",
      },
    ],
  },
  {
    id: "claude-code-004",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "What type of content belongs in a project `CLAUDE.md`?",
    choices: [
      { id: "a", text: "Stable project facts such as build commands, test commands, conventions, and architecture notes." },
      { id: "b", text: "Temporary credentials for the current developer." },
      { id: "c", text: "Large generated logs from every previous task." },
      { id: "d", text: "One-off instructions that only applied to a single command yesterday." },
    ],
    correctChoiceId: "a",
    explanation:
      "Claude Code memory should contain concise, stable instructions that future sessions and teammates benefit from.",
    choiceExplanations: {
      a: "Correct. Stable project guidance is exactly what shared memory is for.",
      b: "Incorrect. Secrets should not be committed to project memory.",
      c: "Incorrect. Large logs waste context and are not stable instructions.",
      d: "Incorrect. One-off instructions should stay in the task conversation, not persistent memory.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "claude-code-005",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A team wants Claude Code to run formatting after edits but never auto-deploy. Which extension point best fits this kind of local automation?",
    choices: [
      { id: "a", text: "Use hooks for bounded local commands and keep deployment as an explicit human-controlled step." },
      { id: "b", text: "Put deployment credentials in `CLAUDE.md` so Claude can decide when to deploy." },
      { id: "c", text: "Ask Claude to remember the rule from a previous chat only." },
      { id: "d", text: "Disable all verification because hooks replace tests." },
    ],
    correctChoiceId: "a",
    explanation:
      "Hooks can automate predictable local workflow steps. Sensitive actions such as deployment should remain explicit and controlled.",
    choiceExplanations: {
      a: "Correct. This automates low-risk checks without granting broad production authority.",
      b: "Incorrect. Secrets and deployment authority should not be placed in shared instructions.",
      c: "Incorrect. Previous chat memory is not a reliable team control.",
      d: "Incorrect. Hooks can run checks, but they do not replace verification discipline.",
    },
    sources: [
      {
        title: "Claude Code docs: Hooks",
        url: "https://code.claude.com/docs/en/hooks",
      },
    ],
  },
  {
    id: "claude-code-006",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "Claude Code repeatedly makes the same incorrect assumption about a repository's test command. What should the team do?",
    choices: [
      { id: "a", text: "Add the correct command and context to shared project memory." },
      { id: "b", text: "Rely on each developer to correct Claude manually every time." },
      { id: "c", text: "Remove tests from the workflow to avoid confusion." },
      { id: "d", text: "Put the command only in a private local note." },
    ],
    correctChoiceId: "a",
    explanation:
      "Repeated corrections are a signal that the information should become durable project guidance.",
    choiceExplanations: {
      a: "Correct. Shared memory prevents repeated correction and helps all sessions use the right command.",
      b: "Incorrect. Manual repetition wastes time and invites inconsistency.",
      c: "Incorrect. Removing tests weakens engineering quality.",
      d: "Incorrect. Private notes do not help the team or future shared sessions.",
    },
    sources: [
      {
        title: "Claude Code docs: Memory",
        url: "https://code.claude.com/docs/en/memory",
      },
    ],
  },
  {
    id: "prompt-structured-output-002",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "Before improving a prompt, what should an architect define first?",
    choices: [
      { id: "a", text: "Success criteria and a way to evaluate whether the output meets them." },
      { id: "b", text: "The longest possible prompt so Claude has maximum text." },
      { id: "c", text: "A fixed model response that should be copied every time." },
      { id: "d", text: "A plan to remove all examples from the prompt." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompt engineering should start from clear success criteria and empirical checks. Otherwise changes cannot be judged reliably.",
    choiceExplanations: {
      a: "Correct. Evaluation criteria make prompt changes measurable.",
      b: "Incorrect. More prompt text is not automatically better.",
      c: "Incorrect. A fixed response does not handle varied inputs.",
      d: "Incorrect. Examples are often useful when chosen carefully.",
    },
    sources: [
      {
        title: "Claude docs: Prompt engineering overview",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      },
    ],
  },
  {
    id: "prompt-structured-output-003",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "A classifier must return one of three labels for downstream routing. Which output design is strongest?",
    choices: [
      { id: "a", text: "Use a structured schema with an enum-like label field and a short rationale field." },
      { id: "b", text: "Ask for a paragraph and parse the label with string contains checks." },
      { id: "c", text: "Let the model invent labels when none fit exactly." },
      { id: "d", text: "Return Markdown headings because they look clean to users." },
    ],
    correctChoiceId: "a",
    explanation:
      "Downstream routing benefits from constrained, parseable output. A rationale can help debugging without weakening the label contract.",
    choiceExplanations: {
      a: "Correct. It gives application code a reliable field to consume.",
      b: "Incorrect. String parsing prose is brittle.",
      c: "Incorrect. Invented labels break routing contracts.",
      d: "Incorrect. Markdown presentation is not a reliable machine interface.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-004",
    domain: "prompt-structured-output",
    difficulty: "scenario",
    prompt:
      "A summarisation prompt gives inconsistent formats across runs. What should the architect try before changing models?",
    choices: [
      { id: "a", text: "Clarify the required structure, add representative examples, and evaluate outputs against the target format." },
      { id: "b", text: "Remove all formatting instructions to avoid constraining Claude." },
      { id: "c", text: "Increase temperature so the model explores more formats." },
      { id: "d", text: "Ask users to manually reformat every answer." },
    ],
    correctChoiceId: "a",
    explanation:
      "Clear instructions, examples, and evaluation are prompt-level controls for consistency. Model changes may help, but should not be the first lever for a vague prompt.",
    choiceExplanations: {
      a: "Correct. It directly addresses ambiguity and measures whether the fix works.",
      b: "Incorrect. Less structure usually increases format variance.",
      c: "Incorrect. Higher randomness can make consistency worse.",
      d: "Incorrect. The workflow should produce usable output without manual repair.",
    },
    sources: [
      {
        title: "Claude docs: Prompting best practices",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-best-practices",
      },
    ],
  },
  {
    id: "prompt-structured-output-005",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "For a prompt that asks Claude to extract facts from a policy document, which instruction helps reduce hallucinated fields?",
    choices: [
      { id: "a", text: "Tell Claude to use `null` for missing values and only extract information supported by the document." },
      { id: "b", text: "Require every field to be filled with a confident-looking answer." },
      { id: "c", text: "Ask Claude to infer missing policy details from industry norms." },
      { id: "d", text: "Remove the source document after the first example." },
    ],
    correctChoiceId: "a",
    explanation:
      "Allowing explicit absence and grounding extraction in the provided document reduces pressure to fabricate missing information.",
    choiceExplanations: {
      a: "Correct. It gives the model a valid way to represent missing evidence.",
      b: "Incorrect. Required unsupported fields encourage fabrication.",
      c: "Incorrect. External norms are not evidence from the provided document.",
      d: "Incorrect. The source is necessary grounding context.",
    },
    sources: [
      {
        title: "Claude docs: Structured outputs",
        url: "https://platform.claude.com/docs/en/build-with-claude/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-006",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "Why include examples in a prompt?",
    choices: [
      { id: "a", text: "They show the desired style, structure, and decision boundary more concretely than prose alone." },
      { id: "b", text: "They guarantee the model will ignore all system instructions." },
      { id: "c", text: "They remove the need for evaluation." },
      { id: "d", text: "They are only useful for image inputs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Examples can demonstrate expected behaviour and reduce misinterpretation, especially when the output format or classification boundary matters.",
    choiceExplanations: {
      a: "Correct. Good examples make requirements concrete.",
      b: "Incorrect. Examples do not override higher-priority instructions.",
      c: "Incorrect. Examples and evaluations solve different problems.",
      d: "Incorrect. Examples are useful across many text workflows.",
    },
    sources: [
      {
        title: "Anthropic prompt engineering tutorial",
        url: "https://github.com/anthropics/prompt-eng-interactive-tutorial",
      },
    ],
  },
  {
    id: "context-reliability-002",
    domain: "context-reliability",
    difficulty: "foundation",
    prompt: "What does the context window represent in a Claude API workflow?",
    choices: [
      { id: "a", text: "The working text Claude can reference for the current generation, including conversation and tool context." },
      { id: "b", text: "The full training dataset used to create Claude." },
      { id: "c", text: "Only the user's latest message." },
      { id: "d", text: "Only the maximum number of output tokens." },
    ],
    correctChoiceId: "a",
    explanation:
      "The context window is Claude's working memory for a request. It is separate from training data and includes more than just output budget.",
    choiceExplanations: {
      a: "Correct. Context is the request-time working memory available to the model.",
      b: "Incorrect. Training data is not the same as request context.",
      c: "Incorrect. Prior messages, instructions, and tool results can also be in context.",
      d: "Incorrect. Output token budget is only part of request sizing.",
    },
    sources: [
      {
        title: "Claude docs: Context windows",
        url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
      },
    ],
  },
  {
    id: "context-reliability-003",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A workflow repeatedly sends the same large system instructions and reference material. Which feature may reduce latency and cost?",
    choices: [
      { id: "a", text: "Prompt caching for stable reusable context." },
      { id: "b", text: "Increasing output tokens on every request." },
      { id: "c", text: "Removing all instructions after the first request." },
      { id: "d", text: "Turning every instruction into a user message." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompt caching is designed for stable repeated context. It does not replace good context design, but it can improve repeated-request economics.",
    choiceExplanations: {
      a: "Correct. Stable shared prefixes are a good fit for caching.",
      b: "Incorrect. More output budget does not reduce repeated input cost.",
      c: "Incorrect. Required instructions still need to be present or otherwise managed.",
      d: "Incorrect. Message role changes do not solve repeated context cost.",
    },
    sources: [
      {
        title: "Claude docs: Prompt caching",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
      },
    ],
  },
  {
    id: "context-reliability-004",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "An app starts failing under high load with rate-limit errors. What is the most appropriate architectural response?",
    choices: [
      { id: "a", text: "Add backoff, queueing or throttling, and design user-visible retry behaviour." },
      { id: "b", text: "Immediately retry every failed request in a tight loop." },
      { id: "c", text: "Increase prompt length so each request contains more detail." },
      { id: "d", text: "Ignore the error because rate limits are unrelated to architecture." },
    ],
    correctChoiceId: "a",
    explanation:
      "Production Claude integrations should handle rate limits and transient failures deliberately with retry and traffic-shaping strategies.",
    choiceExplanations: {
      a: "Correct. Backoff and queueing protect both the app and upstream service.",
      b: "Incorrect. Tight retry loops worsen load and can extend outages.",
      c: "Incorrect. Larger prompts increase pressure rather than addressing rate limits.",
      d: "Incorrect. Error handling is a core reliability concern.",
    },
    sources: [
      {
        title: "Claude docs: Rate limits",
        url: "https://platform.claude.com/docs/en/api/rate-limits",
      },
    ],
  },
  {
    id: "context-reliability-005",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A RAG answer cites snippets that do not support its claims. Which evaluation should be added?",
    choices: [
      { id: "a", text: "Check whether each generated claim is supported by retrieved evidence." },
      { id: "b", text: "Only count whether the answer is written in a friendly tone." },
      { id: "c", text: "Measure the number of tokens in the answer and ignore source quality." },
      { id: "d", text: "Accept any answer if it includes at least one URL." },
    ],
    correctChoiceId: "a",
    explanation:
      "For grounded workflows, reliability depends on claim support, not just citation presence or style.",
    choiceExplanations: {
      a: "Correct. Evidence support is the relevant quality criterion.",
      b: "Incorrect. Tone does not prove factual grounding.",
      c: "Incorrect. Token length is not evidence quality.",
      d: "Incorrect. A URL alone does not show that claims are supported.",
    },
    sources: [
      {
        title: "Claude docs: Define success and build evaluations",
        url: "https://platform.claude.com/docs/en/build-with-claude/test-and-evaluate/define-success",
      },
    ],
  },
  {
    id: "context-reliability-006",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "A workflow can answer either from current user-provided documents or from general model knowledge. Which instruction improves reliability when documents are required?",
    choices: [
      { id: "a", text: "Require answers to be grounded in the provided documents and state when the documents do not contain enough information." },
      { id: "b", text: "Tell Claude to always answer confidently even when documents are incomplete." },
      { id: "c", text: "Remove document references from the prompt to reduce token usage." },
      { id: "d", text: "Ask Claude to prefer plausible answers over source-backed answers." },
    ],
    correctChoiceId: "a",
    explanation:
      "Grounded workflows need an explicit policy for missing evidence. Allowing uncertainty is safer than forcing unsupported answers.",
    choiceExplanations: {
      a: "Correct. It aligns the response with available evidence and permits honest uncertainty.",
      b: "Incorrect. Forced confidence increases hallucination risk.",
      c: "Incorrect. Removing the documents removes the grounding source.",
      d: "Incorrect. Plausibility is weaker than source support.",
    },
    sources: [
      {
        title: "Claude docs: Reduce hallucinations",
        url: "https://platform.claude.com/docs/en/build-with-claude/strengthen-guardrails/reduce-hallucinations",
      },
    ],
  },
  {
    id: "agent-architecture-007",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt: "When should an architect avoid introducing a multi-agent orchestration?",
    choices: [
      { id: "a", text: "When a direct model call or a single tool-using agent reliably meets the requirement." },
      { id: "b", text: "Whenever a task has any business value." },
      { id: "c", text: "Only when the application has no user interface." },
      { id: "d", text: "When the team wants to reduce all testing effort." },
    ],
    correctChoiceId: "a",
    explanation:
      "Multi-agent systems add coordination overhead, latency, cost, and failure modes. Start with the simplest architecture that meets the requirement reliably.",
    choiceExplanations: {
      a: "Correct. Simpler architectures are easier to debug, test, and operate when they are sufficient.",
      b: "Incorrect. Business value does not automatically require multiple agents.",
      c: "Incorrect. User interface shape is not the main decision criterion.",
      d: "Incorrect. Multi-agent orchestration increases the need for testing rather than reducing it.",
    },
    sources: [
      {
        title: "Microsoft Learn: AI agent orchestration patterns",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns",
      },
    ],
  },
  {
    id: "agent-architecture-008",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "A workflow needs one model call plus a database lookup and application-owned business logic. Which architecture is the best starting point?",
    choices: [
      { id: "a", text: "A single agent or model call with explicit tools and application-controlled orchestration." },
      { id: "b", text: "A group chat of many agents because every tool call requires debate." },
      { id: "c", text: "A fully autonomous agent that can create new tools at runtime." },
      { id: "d", text: "A separate specialist agent for every database column." },
    ],
    correctChoiceId: "a",
    explanation:
      "When the app can own the control flow and only needs model reasoning plus tools, a single-agent or Responses-style design is usually enough.",
    choiceExplanations: {
      a: "Correct. It keeps orchestration explicit while still giving the model access to needed data.",
      b: "Incorrect. Agent debate adds overhead without a requirement for collaboration.",
      c: "Incorrect. Runtime tool creation expands risk and is unnecessary here.",
      d: "Incorrect. Excessive decomposition makes the system harder to operate.",
    },
    sources: [
      {
        title: "OpenAI docs: Agents SDK",
        url: "https://developers.openai.com/api/docs/guides/agents",
      },
      {
        title: "Microsoft Learn: AI agent orchestration patterns",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns",
      },
    ],
  },
  {
    id: "agent-architecture-009",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A contract workflow must select a template, customise clauses, check compliance, and then assess risk in that order. Which orchestration pattern best fits?",
    choices: [
      { id: "a", text: "Sequential orchestration, where each stage receives the previous stage's output." },
      { id: "b", text: "Concurrent orchestration, where all stages edit the contract independently at the same time." },
      { id: "c", text: "Random handoff, where any agent decides the next step without constraints." },
      { id: "d", text: "No orchestration, because ordered dependencies cannot be represented in agent systems." },
    ],
    correctChoiceId: "a",
    explanation:
      "Sequential orchestration fits workflows with clear ordered dependencies. Each stage can build on validated output from the previous stage.",
    choiceExplanations: {
      a: "Correct. The task has a predictable pipeline with dependencies between steps.",
      b: "Incorrect. Parallel edits would create coordination and consistency problems.",
      c: "Incorrect. Random routing undermines the required order.",
      d: "Incorrect. Ordered agent workflows are a common orchestration pattern.",
    },
    sources: [
      {
        title: "Microsoft Learn: AI agent orchestration patterns",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns",
      },
    ],
  },
  {
    id: "agent-architecture-010",
    domain: "agent-architecture",
    difficulty: "scenario",
    prompt:
      "A risk review benefits from independent legal, technical, and operational perspectives. What is the main design requirement for concurrent agents?",
    choices: [
      { id: "a", text: "Give each agent a bounded task and define how their results will be aggregated." },
      { id: "b", text: "Let every agent update the same production record without coordination." },
      { id: "c", text: "Remove specialist roles so every agent produces the same answer." },
      { id: "d", text: "Skip aggregation because parallel outputs are automatically consistent." },
    ],
    correctChoiceId: "a",
    explanation:
      "Concurrent orchestration is useful for independent perspectives, but it needs task boundaries and a conflict or aggregation strategy.",
    choiceExplanations: {
      a: "Correct. Parallel work needs scoped inputs and an explicit synthesis step.",
      b: "Incorrect. Shared-state writes create conflicts and audit risk.",
      c: "Incorrect. Specialist perspectives are the reason to use this pattern.",
      d: "Incorrect. Independent outputs can conflict and must be reconciled.",
    },
    sources: [
      {
        title: "Microsoft Learn: AI agent orchestration patterns",
        url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns",
      },
      {
        title: "OpenAI Codex docs: Subagents",
        url: "https://developers.openai.com/codex/concepts/subagents",
      },
    ],
  },
  {
    id: "agent-architecture-011",
    domain: "agent-architecture",
    difficulty: "applied",
    prompt:
      "An agent may issue refunds after reviewing support history. Which control should the architect add before the refund tool executes?",
    choices: [
      { id: "a", text: "A human approval or confirmation step that shows the proposed action and inputs." },
      { id: "b", text: "A hidden system instruction telling the model to be careful." },
      { id: "c", text: "A broader refund tool that accepts any free-form text." },
      { id: "d", text: "A rule that retries refunds until one succeeds." },
    ],
    correctChoiceId: "a",
    explanation:
      "State-changing and sensitive operations should be explicit, reviewable, and interruptible before execution.",
    choiceExplanations: {
      a: "Correct. Human approval keeps sensitive tool use visible and controllable.",
      b: "Incorrect. Hidden caution is weaker than an explicit approval gate.",
      c: "Incorrect. Broad free-form inputs reduce validation and increase risk.",
      d: "Incorrect. Blind retries can multiply harmful side effects.",
    },
    sources: [
      {
        title: "MCP specification: Tools",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools",
      },
      {
        title: "OWASP Top 10 for LLMs 2025",
        url: "https://genai.owasp.org/llm-top-10/",
      },
    ],
  },
  {
    id: "agent-architecture-012",
    domain: "agent-architecture",
    difficulty: "foundation",
    prompt: "What is a practical reason to keep agent state and run results observable?",
    choices: [
      { id: "a", text: "It supports debugging, evaluation, resumability, and review of multi-step work." },
      { id: "b", text: "It guarantees that no prompt injection can occur." },
      { id: "c", text: "It removes the need to design tool schemas." },
      { id: "d", text: "It lets developers skip user-facing error handling." },
    ],
    correctChoiceId: "a",
    explanation:
      "Agent workflows are easier to operate when intermediate state, outputs, and decisions can be inspected and evaluated.",
    choiceExplanations: {
      a: "Correct. Observability makes complex workflows debuggable and auditable.",
      b: "Incorrect. Observability helps investigation, but it is not a security guarantee.",
      c: "Incorrect. Tool schemas are still part of the contract.",
      d: "Incorrect. Users still need clear failure and recovery paths.",
    },
    sources: [
      {
        title: "OpenAI docs: Agents SDK",
        url: "https://developers.openai.com/api/docs/guides/agents",
      },
      {
        title: "LangGraph docs: Overview",
        url: "https://docs.langchain.com/oss/python/langgraph/overview",
      },
    ],
  },
  {
    id: "tool-mcp-007",
    domain: "tool-mcp",
    difficulty: "foundation",
    prompt: "What is the core purpose of function calling in a model application?",
    choices: [
      { id: "a", text: "To let the model request external data or actions through defined interfaces." },
      { id: "b", text: "To give the model unrestricted access to every backend system." },
      { id: "c", text: "To replace application-side authorization checks." },
      { id: "d", text: "To force every response to be a user-visible paragraph." },
    ],
    correctChoiceId: "a",
    explanation:
      "Function calling connects model reasoning to application capabilities through named tools, schemas, and application execution logic.",
    choiceExplanations: {
      a: "Correct. Tools bridge natural language intent to external systems and data.",
      b: "Incorrect. Tool access should be deliberately scoped.",
      c: "Incorrect. Authorization remains an application responsibility.",
      d: "Incorrect. Function calling is about tool requests, not prose formatting.",
    },
    sources: [
      {
        title: "OpenAI docs: Function calling",
        url: "https://developers.openai.com/api/docs/guides/function-calling",
      },
      {
        title: "Gemini API docs: Function calling",
        url: "https://ai.google.dev/gemini-api/docs/function-calling",
      },
    ],
  },
  {
    id: "tool-mcp-008",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "An OpenAI function uses strict mode and has an optional `delivery_date`. How should the schema represent that optional field?",
    choices: [
      { id: "a", text: "Include the field in `required` and allow `null` as a valid type." },
      { id: "b", text: "Omit the field from the schema and ask for it in prose." },
      { id: "c", text: "Use an untyped string field called `misc` for all optional values." },
      { id: "d", text: "Mark the whole parameters object as free-form." },
    ],
    correctChoiceId: "a",
    explanation:
      "Strict schemas require all fields to be listed as required, while optional semantics can be represented by allowing `null`.",
    choiceExplanations: {
      a: "Correct. This preserves schema strictness while representing absence explicitly.",
      b: "Incorrect. Prose-only fields are not reliably validated.",
      c: "Incorrect. A generic field weakens the tool contract.",
      d: "Incorrect. Free-form parameters defeat strict schema validation.",
    },
    sources: [
      {
        title: "OpenAI docs: Function calling",
        url: "https://developers.openai.com/api/docs/guides/function-calling",
      },
    ],
  },
  {
    id: "tool-mcp-009",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A production assistant has many tools, but one request should only be allowed to search docs and fetch records. What should the application do?",
    choices: [
      { id: "a", text: "Restrict the callable tool set for that turn to the allowed tools." },
      { id: "b", text: "Expose every tool and trust the model to avoid risky ones." },
      { id: "c", text: "Rename risky tools so the model is less likely to notice them." },
      { id: "d", text: "Move all tool descriptions into private logs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Tool availability should reflect the workflow's current permissions and intent. Restricting tools reduces accidental or unauthorized actions.",
    choiceExplanations: {
      a: "Correct. The app should make only appropriate capabilities available.",
      b: "Incorrect. Broad availability increases the blast radius of mistakes.",
      c: "Incorrect. Obscurity is not a reliable control.",
      d: "Incorrect. The model and users need clear tool descriptions.",
    },
    sources: [
      {
        title: "OpenAI docs: Function calling",
        url: "https://developers.openai.com/api/docs/guides/function-calling",
      },
      {
        title: "OWASP Top 10 for LLMs 2025",
        url: "https://genai.owasp.org/llm-top-10/",
      },
    ],
  },
  {
    id: "tool-mcp-010",
    domain: "tool-mcp",
    difficulty: "foundation",
    prompt: "In MCP, what information should a tool definition include so a model can use it correctly?",
    choices: [
      { id: "a", text: "A unique name, description, and input schema for expected parameters." },
      { id: "b", text: "Only a hidden implementation file path." },
      { id: "c", text: "Only an example output with no input contract." },
      { id: "d", text: "A natural-language promise that validation happens somewhere else." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP tools are discoverable capabilities. Names, descriptions, and schemas help clients and models choose and call them correctly.",
    choiceExplanations: {
      a: "Correct. These fields form the model-facing tool contract.",
      b: "Incorrect. Implementation paths are not enough for safe tool use.",
      c: "Incorrect. Inputs need an explicit schema.",
      d: "Incorrect. Validation should be reflected in the contract and enforced by the server.",
    },
    sources: [
      {
        title: "MCP specification: Tools",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools",
      },
    ],
  },
  {
    id: "tool-mcp-011",
    domain: "tool-mcp",
    difficulty: "applied",
    prompt:
      "A tool returns structured order data that downstream code will consume. Which server behaviour is most reliable?",
    choices: [
      { id: "a", text: "Return structured content that conforms to an output schema and validate it before use." },
      { id: "b", text: "Return a friendly paragraph and let clients scrape values with regular expressions." },
      { id: "c", text: "Return whatever the upstream API sent without sanitising it." },
      { id: "d", text: "Hide tool errors by returning empty successful results." },
    ],
    correctChoiceId: "a",
    explanation:
      "Structured tool output with schema validation gives clients a safer contract than scraping prose or passing raw upstream responses through unchecked.",
    choiceExplanations: {
      a: "Correct. It makes the output machine-readable and enforceable.",
      b: "Incorrect. Scraping prose is brittle.",
      c: "Incorrect. Raw outputs can contain unsafe or irrelevant data.",
      d: "Incorrect. Hidden failures make recovery and debugging harder.",
    },
    sources: [
      {
        title: "MCP specification: Tools",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools",
      },
      {
        title: "OWASP Top 10 for LLMs 2025",
        url: "https://genai.owasp.org/llm-top-10/",
      },
    ],
  },
  {
    id: "tool-mcp-012",
    domain: "tool-mcp",
    difficulty: "scenario",
    prompt:
      "A product assistant needs to fetch live inventory before answering, then return a typed final summary to the UI. Which design separates responsibilities best?",
    choices: [
      { id: "a", text: "Use function calling for the inventory lookup and structured output for the final UI response." },
      { id: "b", text: "Use structured output to secretly execute the inventory lookup." },
      { id: "c", text: "Use a tool call for the final display format and no schema for the lookup." },
      { id: "d", text: "Avoid schemas because both steps are related to products." },
    ],
    correctChoiceId: "a",
    explanation:
      "Function calling is for requesting external actions or data. Structured output is best for constraining the model's final response shape.",
    choiceExplanations: {
      a: "Correct. Each mechanism is used for the part it controls best.",
      b: "Incorrect. Structured output formats responses; it does not execute tools.",
      c: "Incorrect. The external lookup needs a tool contract.",
      d: "Incorrect. Related domain concepts still need separate contracts.",
    },
    sources: [
      {
        title: "OpenAI docs: Structured outputs",
        url: "https://developers.openai.com/api/docs/guides/structured-outputs",
      },
      {
        title: "Gemini API docs: Structured outputs",
        url: "https://ai.google.dev/gemini-api/docs/structured-output",
      },
    ],
  },
  {
    id: "claude-code-007",
    domain: "claude-code",
    difficulty: "foundation",
    prompt:
      "For a coding-agent task, which prompt structure gives the agent the clearest starting point?",
    choices: [
      { id: "a", text: "Goal, relevant context, constraints, and what should be true when the task is done." },
      { id: "b", text: "A vague instruction to improve the repository however it wants." },
      { id: "c", text: "Only the desired branch name." },
      { id: "d", text: "Only a screenshot with no explanation of expected behaviour." },
    ],
    correctChoiceId: "a",
    explanation:
      "Coding agents work more reliably when task prompts define the goal, context, constraints, and completion criteria.",
    choiceExplanations: {
      a: "Correct. These elements scope the work and make verification concrete.",
      b: "Incorrect. Vague goals invite unrelated or risky changes.",
      c: "Incorrect. A branch name does not describe the work.",
      d: "Incorrect. Screenshots can help, but they are not a complete task contract.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "claude-code-008",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A coding agent repeatedly needs the same repository test command, lint command, and review expectations. Where should a Codex team put this durable guidance?",
    choices: [
      { id: "a", text: "In a repository-level `AGENTS.md` or equivalent project instruction file." },
      { id: "b", text: "Only in one user's terminal history." },
      { id: "c", text: "Only in generated test output." },
      { id: "d", text: "In a dependency lockfile comment." },
    ],
    correctChoiceId: "a",
    explanation:
      "Durable repository guidance belongs in a shared instruction file so future agent sessions load the same expectations.",
    choiceExplanations: {
      a: "Correct. Shared instructions make conventions visible and repeatable.",
      b: "Incorrect. Terminal history is local, unstable, and invisible to other sessions.",
      c: "Incorrect. Test output is not a source of project guidance.",
      d: "Incorrect. Lockfiles should not carry workflow instructions.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: AGENTS.md",
        url: "https://developers.openai.com/codex/guides/agents-md",
      },
    ],
  },
  {
    id: "claude-code-009",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A coding agent is about to start an ambiguous, multi-file refactor. What should the user ask for before implementation?",
    choices: [
      { id: "a", text: "A short plan that identifies affected areas, assumptions, and verification steps." },
      { id: "b", text: "Immediate edits across the whole repository with no context gathering." },
      { id: "c", text: "A promise that no tests will be needed." },
      { id: "d", text: "A list of unrelated packages to upgrade first." },
    ],
    correctChoiceId: "a",
    explanation:
      "Planning first is useful for complex or ambiguous coding-agent tasks because it surfaces scope, assumptions, and checks before edits begin.",
    choiceExplanations: {
      a: "Correct. A plan makes the work reviewable before changes are made.",
      b: "Incorrect. Immediate broad edits increase the chance of drift.",
      c: "Incorrect. Multi-file refactors need verification.",
      d: "Incorrect. Unrelated upgrades add risk and noise.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: Best practices",
        url: "https://developers.openai.com/codex/learn/best-practices",
      },
    ],
  },
  {
    id: "claude-code-010",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A coding agent can split work across subagents. Which task is the best first candidate for parallel subagents?",
    choices: [
      { id: "a", text: "Read-heavy exploration of independent areas, with each subagent returning a concise summary." },
      { id: "b", text: "Several agents editing the same file at the same time." },
      { id: "c", text: "A production deployment requiring one accountable operator." },
      { id: "d", text: "A tiny typo fix in one obvious line." },
    ],
    correctChoiceId: "a",
    explanation:
      "Parallel subagents are strongest for independent read-heavy exploration, triage, testing, or summarisation. Write-heavy overlap creates coordination overhead.",
    choiceExplanations: {
      a: "Correct. It uses parallelism without causing edit conflicts.",
      b: "Incorrect. Concurrent edits to the same file are conflict-prone.",
      c: "Incorrect. Sensitive deployments should have clear control and approval.",
      d: "Incorrect. A trivial edit does not justify subagent overhead.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: Subagents",
        url: "https://developers.openai.com/codex/concepts/subagents",
      },
    ],
  },
  {
    id: "claude-code-011",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "Why should subagents return distilled findings instead of dumping every command log into the main coding-agent thread?",
    choices: [
      { id: "a", text: "It keeps the main thread focused on requirements, decisions, and final synthesis." },
      { id: "b", text: "It prevents subagents from using any tools." },
      { id: "c", text: "It makes verification unnecessary." },
      { id: "d", text: "It hides evidence from the coordinator." },
    ],
    correctChoiceId: "a",
    explanation:
      "Subagent summaries reduce context pollution while still preserving the findings the coordinator needs to decide and act.",
    choiceExplanations: {
      a: "Correct. The coordinator needs signal, not every intermediate detail.",
      b: "Incorrect. Subagents can still use tools for their scoped work.",
      c: "Incorrect. Summaries do not replace verification.",
      d: "Incorrect. Good summaries include enough evidence to be useful.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: Subagents",
        url: "https://developers.openai.com/codex/concepts/subagents",
      },
    ],
  },
  {
    id: "claude-code-012",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "What is the role of MCP in a coding-agent environment such as Codex?",
    choices: [
      { id: "a", text: "It connects the agent to external tools and context such as documentation, browsers, or design files." },
      { id: "b", text: "It replaces the repository's build system." },
      { id: "c", text: "It guarantees generated code is correct without tests." },
      { id: "d", text: "It stores all project source code inside the model weights." },
    ],
    correctChoiceId: "a",
    explanation:
      "MCP is an integration protocol for connecting agents to tools and context. It extends what the agent can inspect or invoke, but it does not replace project verification.",
    choiceExplanations: {
      a: "Correct. MCP provides a standard integration path for external capabilities.",
      b: "Incorrect. Build systems still run outside the protocol.",
      c: "Incorrect. Tool access does not prove code correctness.",
      d: "Incorrect. MCP provides runtime access, not model training.",
    },
    sources: [
      {
        title: "OpenAI Codex docs: Model Context Protocol",
        url: "https://developers.openai.com/codex/mcp",
      },
      {
        title: "MCP docs: What is MCP?",
        url: "https://modelcontextprotocol.io/docs/getting-started/intro",
      },
    ],
  },
  {
    id: "claude-code-013",
    domain: "claude-code",
    difficulty: "foundation",
    prompt: "What is the minimum required structure for an Agent Skill?",
    choices: [
      { id: "a", text: "A directory containing a `SKILL.md` file with required frontmatter and instructions." },
      { id: "b", text: "A running MCP server plus a production database." },
      { id: "c", text: "A browser extension installed separately for every repository." },
      { id: "d", text: "A hidden prompt stored only in one user's chat history." },
    ],
    correctChoiceId: "a",
    explanation:
      "Agent Skills are portable folders. The required core is a `SKILL.md` file with metadata such as `name` and `description`, plus the instructions the agent should follow.",
    choiceExplanations: {
      a: "Correct. The skill directory and `SKILL.md` are the required portable unit.",
      b: "Incorrect. Skills may call tools or scripts, but they do not require an MCP server or database.",
      c: "Incorrect. Client support varies, but the skill format itself is file-based.",
      d: "Incorrect. Chat history is not a portable, version-controlled skill.",
    },
    sources: [
      {
        title: "Agent Skills: Specification",
        url: "https://agentskills.io/specification",
      },
    ],
  },
  {
    id: "claude-code-014",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A team writes a skill for handling release notes. Which `description` best helps an agent activate it at the right time?",
    choices: [
      {
        id: "a",
        text: "Generate, edit, and verify release notes from changelogs and merged PRs. Use when asked for release notes, changelog summaries, or release announcements.",
      },
      { id: "b", text: "Helps with writing." },
      { id: "c", text: "Always use this skill for every task in the repository." },
      { id: "d", text: "Internal process details are intentionally omitted." },
    ],
    correctChoiceId: "a",
    explanation:
      "A useful skill description says what the skill does and when to use it. Specific trigger phrases help discovery without causing unrelated tasks to load the skill.",
    choiceExplanations: {
      a: "Correct. It combines capability, inputs, and clear activation cues.",
      b: "Incorrect. This is too vague to distinguish release-note work from other writing.",
      c: "Incorrect. Over-broad activation wastes context and can conflict with unrelated tasks.",
      d: "Incorrect. The description is the agent's main discovery signal.",
    },
    sources: [
      {
        title: "Agent Skills: Specification",
        url: "https://agentskills.io/specification",
      },
      {
        title: "Agent Skills: Optimizing skill descriptions",
        url: "https://agentskills.io/skill-creation/optimizing-descriptions",
      },
    ],
  },
  {
    id: "claude-code-015",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A repository has twenty specialised Agent Skills. What makes this practical without loading every instruction into the model at startup?",
    choices: [
      { id: "a", text: "Progressive disclosure: load names and descriptions first, then full skill instructions only when relevant." },
      { id: "b", text: "Concatenate every `SKILL.md` into the system prompt for every task." },
      { id: "c", text: "Remove descriptions so the agent has fewer tokens to read." },
      { id: "d", text: "Store all skill reference files in generated build output." },
    ],
    correctChoiceId: "a",
    explanation:
      "Progressive disclosure keeps many skills available with a small discovery footprint. The agent loads more detail only after a task matches a skill.",
    choiceExplanations: {
      a: "Correct. Discovery metadata is cheap, while full instructions are loaded on demand.",
      b: "Incorrect. Loading every full skill wastes context and can distract the agent.",
      c: "Incorrect. Descriptions are needed for accurate activation.",
      d: "Incorrect. Generated output is not the right source of durable skill context.",
    },
    sources: [
      {
        title: "Agent Skills: Overview",
        url: "https://agentskills.io/home",
      },
      {
        title: "Agent Skills: Specification",
        url: "https://agentskills.io/specification",
      },
    ],
  },
  {
    id: "claude-code-016",
    domain: "claude-code",
    difficulty: "applied",
    prompt:
      "A skill needs detailed API tables and a reusable report template, but the core procedure is short. How should the skill be organised?",
    choices: [
      {
        id: "a",
        text: "Keep the main `SKILL.md` concise and place detailed documentation or templates in referenced `references/` and `assets/` files.",
      },
      { id: "b", text: "Paste every table and template into the main instructions so they always load." },
      { id: "c", text: "Hide the files outside the skill directory so the agent cannot find them." },
      { id: "d", text: "Replace the instructions with a single link and no task procedure." },
    ],
    correctChoiceId: "a",
    explanation:
      "Skills can bundle optional resources. Keeping the core instructions concise and loading references or assets only when needed preserves context while retaining reusable material.",
    choiceExplanations: {
      a: "Correct. This follows progressive disclosure and keeps the skill maintainable.",
      b: "Incorrect. Always loading large reference material wastes context.",
      c: "Incorrect. Resources should be reachable from the skill when needed.",
      d: "Incorrect. A skill should still provide actionable procedure, not just a pointer.",
    },
    sources: [
      {
        title: "Agent Skills: Specification",
        url: "https://agentskills.io/specification",
      },
      {
        title: "Agent Skills: Best practices",
        url: "https://agentskills.io/skill-creation/best-practices",
      },
    ],
  },
  {
    id: "claude-code-017",
    domain: "claude-code",
    difficulty: "scenario",
    prompt:
      "A team is deciding whether to create a new Agent Skill after repeatedly correcting agents during incident-summary work. What is the strongest reason to add one?",
    choices: [
      {
        id: "a",
        text: "The corrections reveal a repeatable, project-specific workflow with edge cases that agents do not reliably infer.",
      },
      { id: "b", text: "The task can already be completed reliably without extra instructions." },
      { id: "c", text: "The team wants to add generic advice such as 'be careful' to every task." },
      { id: "d", text: "The skill will remove the need to verify incident summaries." },
    ],
    correctChoiceId: "a",
    explanation:
      "Skills are most valuable when they capture reusable expertise, concrete procedures, and project-specific gotchas that improve repeated agent work.",
    choiceExplanations: {
      a: "Correct. Real repeated corrections are strong source material for a useful skill.",
      b: "Incorrect. If the agent already handles the work well, a skill may add little value.",
      c: "Incorrect. Generic advice is usually too vague to improve execution.",
      d: "Incorrect. Skills guide work; they do not replace review or verification.",
    },
    sources: [
      {
        title: "Agent Skills: Best practices",
        url: "https://agentskills.io/skill-creation/best-practices",
      },
      {
        title: "Agent Skills: Evaluating skill output quality",
        url: "https://agentskills.io/skill-creation/evaluating-skills",
      },
    ],
  },
  {
    id: "prompt-structured-output-007",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "What is the main advantage of schema-based structured outputs over basic JSON mode?",
    choices: [
      { id: "a", text: "The output is constrained to match a declared schema, not merely valid JSON syntax." },
      { id: "b", text: "The model no longer needs any task instructions." },
      { id: "c", text: "The application can skip semantic validation of values." },
      { id: "d", text: "The model can call external APIs without tools." },
    ],
    correctChoiceId: "a",
    explanation:
      "Structured outputs provide a stronger contract than valid JSON alone by constraining fields, types, and allowed values.",
    choiceExplanations: {
      a: "Correct. Schema adherence is the key reliability improvement.",
      b: "Incorrect. The task still needs clear instructions.",
      c: "Incorrect. Schema-valid values can still be semantically wrong.",
      d: "Incorrect. External actions require tool or application logic.",
    },
    sources: [
      {
        title: "OpenAI docs: Structured outputs",
        url: "https://developers.openai.com/api/docs/guides/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-008",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "A sentiment classifier should return only `positive`, `neutral`, or `negative`. Which schema choice best supports that requirement?",
    choices: [
      { id: "a", text: "Use a string field with an enum of the three allowed labels." },
      { id: "b", text: "Use an unrestricted paragraph field and parse whichever label appears first." },
      { id: "c", text: "Use a number field because numbers are easier to validate." },
      { id: "d", text: "Leave the label out of the schema and ask for it in Markdown." },
    ],
    correctChoiceId: "a",
    explanation:
      "An enum captures the allowed label set directly and makes invalid labels easier to reject.",
    choiceExplanations: {
      a: "Correct. Strong typing and enums reduce routing ambiguity.",
      b: "Incorrect. Parsing prose is brittle and can produce invalid labels.",
      c: "Incorrect. A number does not express the domain labels clearly.",
      d: "Incorrect. Markdown is presentation, not a strict classification contract.",
    },
    sources: [
      {
        title: "Gemini API docs: Structured outputs",
        url: "https://ai.google.dev/gemini-api/docs/structured-output",
      },
    ],
  },
  {
    id: "prompt-structured-output-009",
    domain: "prompt-structured-output",
    difficulty: "scenario",
    prompt:
      "A schema-compliant extraction returns a valid date field, but the date is not present in the source document. What should the application do?",
    choices: [
      { id: "a", text: "Treat this as a semantic validation failure and handle it in application logic or evaluation." },
      { id: "b", text: "Accept it because valid JSON means the value is true." },
      { id: "c", text: "Remove the source document from future prompts." },
      { id: "d", text: "Switch to prose output so incorrect facts are harder to detect." },
    ],
    correctChoiceId: "a",
    explanation:
      "Structured outputs can enforce format, but the application still needs to validate whether values are supported by source evidence and business rules.",
    choiceExplanations: {
      a: "Correct. Format validation and factual validation are different checks.",
      b: "Incorrect. Schema validity does not prove source support.",
      c: "Incorrect. Removing evidence worsens grounding.",
      d: "Incorrect. Prose makes validation less reliable.",
    },
    sources: [
      {
        title: "Gemini API docs: Structured outputs",
        url: "https://ai.google.dev/gemini-api/docs/structured-output",
      },
      {
        title: "OpenAI docs: Structured outputs",
        url: "https://developers.openai.com/api/docs/guides/structured-outputs",
      },
    ],
  },
  {
    id: "prompt-structured-output-010",
    domain: "prompt-structured-output",
    difficulty: "foundation",
    prompt: "What should a prompt evaluation define before comparing prompt variants?",
    choices: [
      { id: "a", text: "The task, test inputs, and criteria that make an output acceptable." },
      { id: "b", text: "Only the model name and the longest prompt." },
      { id: "c", text: "A single favourite output that should be copied exactly for all inputs." },
      { id: "d", text: "A rule that every prompt change is automatically better." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompt changes should be judged against explicit examples and acceptance criteria, especially when changing models or instructions.",
    choiceExplanations: {
      a: "Correct. Evals make prompt quality observable rather than anecdotal.",
      b: "Incorrect. Model and prompt length do not define success.",
      c: "Incorrect. Varied inputs need criteria, not one fixed answer.",
      d: "Incorrect. Prompt changes can regress behaviour.",
    },
    sources: [
      {
        title: "OpenAI docs: Working with evals",
        url: "https://developers.openai.com/api/docs/guides/evals",
      },
    ],
  },
  {
    id: "prompt-structured-output-011",
    domain: "prompt-structured-output",
    difficulty: "applied",
    prompt:
      "A reasoning model receives a highly detailed prompt that specifies every micro-step. It performs worse on varied tasks. What adjustment is most appropriate?",
    choices: [
      { id: "a", text: "State the goal, constraints, and output expectations more clearly, while avoiding unnecessary step-by-step overconstraint." },
      { id: "b", text: "Remove the goal and provide only examples." },
      { id: "c", text: "Add contradictory instructions so the model has more options." },
      { id: "d", text: "Tell the model that any answer is acceptable." },
    ],
    correctChoiceId: "a",
    explanation:
      "Prompting should give enough direction for the task without overfitting the model to brittle procedural instructions.",
    choiceExplanations: {
      a: "Correct. Clear goals and constraints preserve flexibility where the model should reason.",
      b: "Incorrect. Examples alone may not define the task or constraints.",
      c: "Incorrect. Contradictions reduce reliability.",
      d: "Incorrect. Acceptance criteria are necessary for useful output.",
    },
    sources: [
      {
        title: "OpenAI docs: Prompt engineering",
        url: "https://developers.openai.com/api/docs/guides/prompt-engineering",
      },
    ],
  },
  {
    id: "prompt-structured-output-012",
    domain: "prompt-structured-output",
    difficulty: "scenario",
    prompt:
      "A UI needs a model response with separate fields for `summary`, `risk_level`, and `next_action`. The model does not need to call any external system. Which mechanism fits best?",
    choices: [
      { id: "a", text: "Structured output for the final response shape." },
      { id: "b", text: "Function calling, even though no external action is needed." },
      { id: "c", text: "A hidden database write tool." },
      { id: "d", text: "Plain text with headings parsed by CSS." },
    ],
    correctChoiceId: "a",
    explanation:
      "When the goal is to shape the model's final answer for application consumption, structured output is the natural fit.",
    choiceExplanations: {
      a: "Correct. The response needs a typed final format, not a tool call.",
      b: "Incorrect. Function calling is for requesting external data or actions.",
      c: "Incorrect. A hidden side-effecting tool is unnecessary and risky.",
      d: "Incorrect. CSS cannot provide a reliable data contract.",
    },
    sources: [
      {
        title: "OpenAI docs: Structured outputs",
        url: "https://developers.openai.com/api/docs/guides/structured-outputs",
      },
      {
        title: "Gemini API docs: Structured outputs",
        url: "https://ai.google.dev/gemini-api/docs/structured-output",
      },
    ],
  },
  {
    id: "context-reliability-007",
    domain: "context-reliability",
    difficulty: "foundation",
    prompt: "Why should teams run evaluations before upgrading the model used by an LLM application?",
    choices: [
      { id: "a", text: "To detect behavioural regressions against representative tasks and acceptance criteria." },
      { id: "b", text: "To prove the new model will never make mistakes." },
      { id: "c", text: "To avoid writing any application tests." },
      { id: "d", text: "To make prompts longer before every release." },
    ],
    correctChoiceId: "a",
    explanation:
      "Model changes can improve some behaviours while regressing others. Evaluations give teams evidence before rollout.",
    choiceExplanations: {
      a: "Correct. Representative evals catch regressions and guide iteration.",
      b: "Incorrect. Evals reduce risk but cannot prove perfection.",
      c: "Incorrect. Application tests and model evaluations complement each other.",
      d: "Incorrect. Prompt length is not the goal.",
    },
    sources: [
      {
        title: "OpenAI docs: Working with evals",
        url: "https://developers.openai.com/api/docs/guides/evals",
      },
    ],
  },
  {
    id: "context-reliability-008",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A user asks for current regulatory information that may have changed recently. Which architecture best improves answer reliability?",
    choices: [
      { id: "a", text: "Ground the response in a current search or trusted retrieval source and expose supporting evidence." },
      { id: "b", text: "Force the model to answer only from its training data." },
      { id: "c", text: "Ask the model to sound confident and omit uncertainty." },
      { id: "d", text: "Disable citations because they make answers longer." },
    ],
    correctChoiceId: "a",
    explanation:
      "Fresh or changing topics need runtime grounding in current sources. Evidence also lets users and evaluators inspect support for claims.",
    choiceExplanations: {
      a: "Correct. Retrieval or search grounds the answer in current evidence.",
      b: "Incorrect. Training data may be stale.",
      c: "Incorrect. Confidence is not a substitute for current evidence.",
      d: "Incorrect. Citations are useful for verification.",
    },
    sources: [
      {
        title: "Gemini API docs: Google Search grounding",
        url: "https://ai.google.dev/gemini-api/docs/google-search",
      },
    ],
  },
  {
    id: "context-reliability-009",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "A banking assistant must avoid illegal investment advice and redact personally identifiable information. What should the architecture include?",
    choices: [
      { id: "a", text: "Configurable guardrails or policy checks around both user input and model responses." },
      { id: "b", text: "Only a friendly system prompt asking the model to be safe." },
      { id: "c", text: "A tool that publishes every conversation transcript for audit." },
      { id: "d", text: "No filtering so the model has maximum context." },
    ],
    correctChoiceId: "a",
    explanation:
      "High-risk applications need explicit safeguards for harmful content, denied topics, sensitive information, and response handling.",
    choiceExplanations: {
      a: "Correct. Guardrails make safety policy enforceable and testable.",
      b: "Incorrect. A prompt alone is a weak control for regulated workflows.",
      c: "Incorrect. Publishing transcripts can create privacy violations.",
      d: "Incorrect. Unfiltered context can expose users and the organisation to risk.",
    },
    sources: [
      {
        title: "AWS docs: Amazon Bedrock Guardrails",
        url: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html",
      },
      {
        title: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
  {
    id: "context-reliability-010",
    domain: "context-reliability",
    difficulty: "applied",
    prompt:
      "A support agent reads customer-provided webpages before deciding whether to call internal tools. What is the main security concern?",
    choices: [
      { id: "a", text: "Untrusted content may contain prompt injection instructions that try to change the agent's behaviour." },
      { id: "b", text: "Webpages are always more reliable than system instructions." },
      { id: "c", text: "Prompt injection only matters for image generation." },
      { id: "d", text: "Internal tools become safe automatically if the user is polite." },
    ],
    correctChoiceId: "a",
    explanation:
      "Retrieved or user-controlled content should be treated as untrusted data, especially before tool use or sensitive decisions.",
    choiceExplanations: {
      a: "Correct. Prompt injection can target the model's instructions and tool choices.",
      b: "Incorrect. Untrusted content must not override trusted instructions.",
      c: "Incorrect. Prompt injection affects text and agentic workflows too.",
      d: "Incorrect. User tone is not an access-control mechanism.",
    },
    sources: [
      {
        title: "OWASP Top 10 for LLMs 2025",
        url: "https://genai.owasp.org/llm-top-10/",
      },
    ],
  },
  {
    id: "context-reliability-011",
    domain: "context-reliability",
    difficulty: "scenario",
    prompt:
      "An agent can read private documents, send emails, and delete records. Which risk does this most directly create if permissions are too broad?",
    choices: [
      { id: "a", text: "Excessive agency, where the agent can take actions beyond the user's intent or safe scope." },
      { id: "b", text: "A harmless increase in model creativity." },
      { id: "c", text: "A guarantee that all tasks complete faster." },
      { id: "d", text: "A reduction in the need for audit logs." },
    ],
    correctChoiceId: "a",
    explanation:
      "Agents should receive the least privilege needed for the task. Broad read and write powers increase the blast radius of mistakes or attacks.",
    choiceExplanations: {
      a: "Correct. Excessive permissions are a core agentic application risk.",
      b: "Incorrect. This is an authorization and safety issue, not creativity.",
      c: "Incorrect. More authority can increase risk and operational complexity.",
      d: "Incorrect. Powerful agents need stronger auditability.",
    },
    sources: [
      {
        title: "OWASP Top 10 for LLMs 2025",
        url: "https://genai.owasp.org/llm-top-10/",
      },
      {
        title: "MCP specification: Tools",
        url: "https://modelcontextprotocol.io/specification/2025-06-18/server/tools",
      },
    ],
  },
  {
    id: "context-reliability-012",
    domain: "context-reliability",
    difficulty: "foundation",
    prompt: "What is the role of an AI risk management framework in an LLM application programme?",
    choices: [
      { id: "a", text: "To guide how teams identify, measure, manage, and monitor trustworthy AI risks." },
      { id: "b", text: "To replace all product-specific testing." },
      { id: "c", text: "To guarantee that any chosen model is unbiased." },
      { id: "d", text: "To remove the need for human accountability." },
    ],
    correctChoiceId: "a",
    explanation:
      "Risk management frameworks provide a governance structure for trustworthy AI work, but they do not replace implementation-specific tests or accountability.",
    choiceExplanations: {
      a: "Correct. Frameworks help teams reason systematically about risk across the lifecycle.",
      b: "Incorrect. Product-specific verification is still required.",
      c: "Incorrect. Frameworks guide risk work; they do not guarantee model properties.",
      d: "Incorrect. Human accountability remains central to responsible AI systems.",
    },
    sources: [
      {
        title: "NIST AI Risk Management Framework",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
    ],
  },
];
